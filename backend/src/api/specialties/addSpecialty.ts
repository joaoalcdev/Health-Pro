import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddSpecialty = async (app: FastifyInstance) => {
  app.post("/specialties", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        name,
        status,
        price,
      } = req.body as Specialty

      const { data, error } = await supabase
      .from("specialties")
      .insert([{
        name,
        deletedAt: status === true ? null : new Date(), 
        price,
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