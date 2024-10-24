import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import { spec } from 'node:test/reporters';

export const AddSpecialty = async (app: FastifyInstance) => {
  app.post("/specialties", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        name,
        status,
        prices,
      } = req.body as Specialty & { prices: Price[] }
      
      const { data, error } = await supabase
      .from("specialties")
      .insert([{
        name,
        deletedAt: status === true ? null : new Date(), 
      }]).select()

      if (error) {
        throw error
      }
      
      if(data) {
        console.log(data)
        const  pricesArray = prices.map((price: Price) => {
          return {
            specialtyId: data[0].id,
            price: price.price,
            agreementId: price.agreementId, 
          }
        })
        const { data: regularPrices, error: regularPricesError } = await supabase
        .from("regularPrices")
        .insert(pricesArray).select()

        if (regularPricesError) {
          throw regularPricesError
        } else {
          return res.status(200).send(data ? data : null)
        }
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}