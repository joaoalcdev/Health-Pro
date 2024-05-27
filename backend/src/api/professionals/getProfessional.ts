import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const getProfessional = async (app: FastifyInstance) => {
  app.get("/professional/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {

      const { id } = req.params as { id: string }

      let { data, error } = await supabase
        .from("view_professionals")
        .select("*").eq("id", id)
      
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