import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const UpdateService = async (app: FastifyInstance) => {
  app.put("/services/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as { id: string }

      const {
        name,
        status,
        specialtyId,
        prices,
        duration 
      } = req.body as Service & { prices: Price[] }	

      const { data, error } = await supabase
      .from("services")
      .update([{
        name,
        customDuration: duration,
        deletedAt: status === true ? null : new Date(), 
      }])
      .eq("id", id)
      .select()

      const { data: servicePrices, error: servicePricesError } = await supabase
      .from("servicePrices")
      .select('*')
      .eq("serviceId", id)

      if ( servicePricesError) {
        throw servicePricesError
      }

      let addPrices = [] as Price[]

      if(servicePrices && servicePrices.length > 0) {
        prices.forEach(async (price: Price) => {
          const priceIndex = servicePrices.findIndex((servicePrice) => servicePrice.agreementId === price.agreementId)
          if(priceIndex >= 0) {
            await supabase
            .from("servicePrices")
            .update({
              price: price.price,
              professionalPayment: price.professionalPayment ? price.professionalPayment : 0,
            })
            .eq("id", servicePrices[priceIndex].id)
          }else {
            addPrices.push({ 
              specialtyId: specialtyId,
              serviceId: Number(id),
              price: price.price,
              professionalPayment: price.professionalPayment ? price.professionalPayment : 0,
              agreementId: price.agreementId, 
            })
          }
        })
      }else {
        prices.forEach((price: Price) => {
          addPrices.push({ 
            specialtyId: specialtyId,
            serviceId: Number(id),
            price: price.price,
            professionalPayment: price.professionalPayment ? price.professionalPayment : 0,
            agreementId: price.agreementId, 
          })
        })
      }
      if(addPrices.length > 0) {
        const { data: servicePrices, error: servicePricesError } = await supabase
        .from("servicePrices")
        .insert(addPrices)
        .select()
        if (servicePricesError) {
          throw servicePricesError
        }
      }
      return res.status(200).send(data ? data : null)

    } catch (error) {
      return res.status(400).send(error)
    }
  })
}