import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListServices = async (app: FastifyInstance) => {
  app.get("/services",
  async (req: FastifyRequest, res: FastifyReply) => {
   
    try {
      let { data, error } = await supabase
        .from("view_services")
        .select("*")
        .order("specialtyId")
      
      if (error) {
        throw error
      }
      return res.status(200).send(data ? data : null)

    } catch (error) {
      return res.status(400).send(error)
    }
  })
}