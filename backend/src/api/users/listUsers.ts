import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListUsers = async (app: FastifyInstance) => {
  app.get("/users", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("firstName", { ascending: true })
      
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