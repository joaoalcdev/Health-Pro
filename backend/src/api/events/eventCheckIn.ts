import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';
import Jimp from 'jimp';
import { createOngoingEvents } from '../events/eventsController';

import 'moment/locale/pt-br';

export const EventCheckIn = async (app: FastifyInstance) => {
  app.post("/checkIn/:id", async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };  
    let {
      eventId,
      eventType,
      checkInName,
      checkInSignature,
    } = req.body as {eventId: number, eventType: number, checkInName: string, checkInSignature: string};

    //Convert base64 to buffer
    const buffer = Buffer.from(checkInSignature, "base64");
    Jimp.read(buffer, (err, res) => {
      if (err) throw new Error(err.message);
      res.quality(5);
    });
    
    try {
      //Upload signature to storage
      const { data: fileData, error } = await supabase
      .storage
      .from('cedejom')
      .upload(`signatures/sign${id}.png`, buffer as Buffer , { 
        cacheControl: '3600', 
        upsert: true, 
        contentType: "image/png",
      });

      if (error) {
        console.log('ERROR', error);
        throw error;
      }

      //get EventInstance data
      const { data: eventInstance, error: eventInstanceError } = await supabase
      .from('view_events')
      .select()
      .eq('eventInstanceId', id)

      if(eventInstanceError){
        console.log('ERROR', eventInstanceError);
        throw eventInstanceError;
      }

      if(eventInstance){

        var grossValue = 0 as number;
        var professionalRate = 0 as number;
        var tax = 0 as number;
        var profit = 0 as number;

        console.log(eventInstance);

        if(eventInstance[0].eventType in [1,2,3]){
           // Check event type is 1,2 or 3
          const servicePrice = await getServicePrice(eventInstance[0].specialtyId, eventInstance[0].agreementId, eventInstance[0].serviceId).then((servicePrice) => {
            return servicePrice;
          });  
          if (servicePrice) {
            grossValue = servicePrice.price;
            console.log('GROSS', grossValue);
            
            if(servicePrice.professionalPayment > 0){
              professionalRate = servicePrice.professionalPayment;
              console.log('PROF', professionalRate);
            }else{
              const fee = await getFee(eventInstance[0].agreementId, eventInstance[0].professionalId).then((fee) => {
                return fee;
              });
              if(fee){
                professionalRate = Math.round(grossValue - grossValue * (fee.fee/100));
                console.log('PROF', professionalRate);
              }
            }
          }
          const taxData = await getTax(eventInstance[0].agreementId).then((taxData) => {
            return taxData;
          });
          if(taxData){
            tax = grossValue * (taxData.tax/100);
            console.log('TAX', tax);
            
          }
          profit = grossValue - professionalRate - tax;
          console.log('PROFIT', profit);

        }

        // Check event type is 4
        if(eventInstance[0].eventType === 4){
          const regularPrice = await getRegularPrice(eventInstance[0].specialtyId, eventInstance[0].agreementId).then((regularPrice) => {
            return regularPrice;
          });
          if(regularPrice){
            grossValue = regularPrice.price;
            console.log('GROSS', grossValue);

            if(regularPrice.professionalPayment > 0){
              professionalRate = regularPrice.professionalPayment;
              console.log('PROF', professionalRate);

            }else{
              const fee = await getFee(eventInstance[0].agreementId, eventInstance[0].professionalId).then((fee) => {
                return fee;
              });
              if(fee){
                professionalRate = Math.round(grossValue - grossValue * (fee.fee/100));
                console.log('PROF', professionalRate);

              }
            }
          }
          const taxData = await getTax(eventInstance[0].agreementId).then((taxData) => {
            return taxData;
          });
          if(taxData){
            tax =  grossValue * (taxData.tax/100);
            console.log('TAX', tax);

          }
          profit = grossValue - professionalRate - tax;
          console.log('PROFIT', profit);

        }

        // Check event type is 5 CONTINUE

        //Update event instance
        const { data, error: insertError } = await supabase
        .from('eventInstances')
        .update({
          checkInName,
          checkInSignature: fileData.path,
          checkInDate: moment().tz('America/Sao_Paulo').format(),
          eventStatus: 3,
          grossValue,
          professionalRate,
          tax,
          profit,
        })
        .eq('id', id)
        .select()

        //Verificar o envent type antes de criar ongoing events
        if(eventType === 1){
            await createOngoingEvents(eventId);
        }

        if (insertError) {
          return res.status(500).send({ error: insertError });
        }

        return res.status(200).send({data});
      }
    } catch (error) {
      res.send({ error });
    }
  })

}

const getRegularPrice = async (specialtyId: number, agreementId: number) => {
  const { data: regularPrices, error: regularPricesError } = await supabase
        .from('regularPrices')
        .select()
        .eq('specialtyId', specialtyId)
        .eq('agreementId', agreementId)

  if(regularPricesError){
    throw regularPricesError;
  }
  return regularPrices[0];
};

const getServicePrice = async (specialtyId: number, agreementId: number, serviceId: number) => {
  const { data: servicePrices, error: servicePricesError } = await supabase
  .from('servicePrices')
  .select()
  .eq('specialtyId', specialtyId)
  .eq('agreementId', agreementId)
  .eq('serviceId', serviceId)

  if(servicePricesError){
    throw servicePricesError;
  }
  return servicePrices[0] as ServicePrice;
};

const getFee = async (agreementId: number, professionalId: number) => {
  const { data: fees, error: feesError } = await supabase
  .from('fees')
  .select()
  .eq('agreementId', agreementId)
  .eq('professionalId', professionalId)

  if(feesError){
    throw feesError;
  }
  return fees[0];
};

const getTax = async (agreementId: number) => {
  const { data: tax, error: taxesError } = await supabase
  .from('agreements')
  .select()
  .eq('id', agreementId)

  if(taxesError){
    throw taxesError;
  }
  return tax[0];
}

