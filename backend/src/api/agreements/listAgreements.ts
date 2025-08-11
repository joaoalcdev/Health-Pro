import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";


export const ListAgreements = async (app: FastifyInstance) => {
  app.get("/agreements",
    {preHandler: auth},
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
        let { data, error } = await supabase
          .from("agreements")
          .select("*")
          .order("id")
        
        if (error) {
          throw error
        }
        return res.status(200).send(data ? data : null)
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}