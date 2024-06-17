import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdateSpecialty = async (app: FastifyInstance) => {
  app.put("/specialties/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as { id: string }

      const {
        name,
        status,
      } = req.body as Specialty

      const { data, error } = await supabase
      .from("specialties")
      .update([{
        name,
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