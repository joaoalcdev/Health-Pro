import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListProfessionals = async (app: FastifyInstance) => {
  app.get("/professionals", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      let { data, error } = await supabase
        .from("view_professionals")
        .select("*")
        .order("first_name", { ascending: true })
      
      if (error) {
        throw error
      } else {
        return res.status(200).send(data ? data : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}