import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddService = async (app: FastifyInstance) => {
  app.post("/services", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        name,
        status,
        specialtyId,
        initialPrice,
        recurringPrice,
      } = req.body as Service

      const { data, error } = await supabase
      .from("services")
      .insert([{
        name,
        specialtyId,
        initialPrice,
        recurringPrice,
        deletedAt: status === true ? null : new Date(), 
      }]).select()

      if (error) {
        throw error
      } 
        else {
          return res.status(200).send(data ? data : null)
        }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}