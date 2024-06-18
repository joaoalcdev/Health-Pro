import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdateService = async (app: FastifyInstance) => {
  app.put("/services/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as { id: string }

      const {
        name,
        status,
        specialtyId,
        initialPrice,
        recurringPrice,
      } = req.body as Service

      const { data, error } = await supabase
      .from("services")
      .update([{
        name,
        specialtyId,
        initialPrice,
        recurringPrice,
        deletedAt: status === true ? null : new Date(), 
      }])
      .eq("id", id)
      .select()

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