import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddService = async (app: FastifyInstance) => {
  app.post("/services", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        name,
        status,
        specialtyId,
        prices,
      } = req.body as Service & { prices: Price[] }

      const { data, error } = await supabase
      .from("services")
      .insert([{
        name,
        specialtyId,
        deletedAt: status === true ? null : new Date(), 
      }]).select()

      if (error) {
        throw error
      } 
      
      if(data){
        const  pricesArray = prices.map((price: Price) => {
          return {
            serviceId: data[0].id,
            specialtyId: specialtyId,
            price: price.price,
            professionalPayment: price.professionalPayment ? price.professionalPayment : 0,
            agreementId: price.agreementId, 
          }
        })
        const { data: servicePrices, error: servicePricesError } = await supabase
        .from("servicePrices")
        .insert(pricesArray).select()

        if (servicePricesError) {
          throw servicePricesError
        } else {
          return res.status(200).send(data ? data : null)
        }
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}