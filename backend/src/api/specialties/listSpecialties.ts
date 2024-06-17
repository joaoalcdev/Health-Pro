import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListSpecialties = async (app: FastifyInstance) => {
  app.get("/specialties",
  async (req: FastifyRequest, res: FastifyReply) => {
   
    try {
      let { data, error } = await supabase
        .from("specialties")
        .select("*")
      
      if (error) {
        throw error
      }
      return res.status(200).send(data ? data : null)

    } catch (error) {
      return res.status(400).send(error)
    }
  })
}