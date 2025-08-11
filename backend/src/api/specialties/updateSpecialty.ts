import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const UpdateSpecialty = async (app: FastifyInstance) => {
  app.put("/specialties/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as { id: string }

      const {
        name,
        status,
        prices,
      } = req.body as Specialty & { prices: Price[] }

      const { data, error } = await supabase
      .from("specialties")
      .update([{
        name,
        deletedAt: status === true ? null : new Date(), 
      }])
      .eq("id", id)
      .select()

      const { data: regularPrices, error: regularPricesError } = await supabase
      .from("regularPrices")
      .select('*')
      .eq("specialtyId", id)

      if ( regularPricesError) {
        throw regularPricesError
      }
      
      let addPrices = [] as Price[]
      let updatedPrices = [] as Price[]

      if(regularPrices && regularPrices.length > 0) {
        prices.forEach(async (price: Price) => {
          const priceIndex = regularPrices.findIndex((regularPrice) => regularPrice.agreementId === price.agreementId)
          if(priceIndex >= 0) {
            await supabase
            .from("regularPrices")
            .update({
              price: price.price, 
              professionalPayment: price.professionalPayment ? price.professionalPayment : 0,
            })
            .eq("id", regularPrices[priceIndex].id)
          }else {
            addPrices.push({ 
              specialtyId: Number(id),
              price: price.price,
              agreementId: price.agreementId,
              professionalPayment: price.professionalPayment ? price.professionalPayment : 0, 
            })
          }
        }
        )
        }else {
          prices.forEach((price: Price) => {
            addPrices.push({ 
              specialtyId: Number(id),
              price: price.price,
              agreementId: price.agreementId, 
              professionalPayment: price.professionalPayment ? price.professionalPayment : 0,
            })
          })
        }
        if(addPrices.length > 0) {
          const { data: regularPrices, error: regularPricesError } = await supabase
          .from("regularPrices")
          .insert(addPrices)
          .select()
          if (regularPricesError) {
            throw regularPricesError
          }
        }
        return res.status(200).send(data ? data : null)

    } catch (error) {
      return res.status(400).send(error)
    }
  })
  

}