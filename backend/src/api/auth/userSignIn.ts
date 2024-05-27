import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UserSignIn = async (app: FastifyInstance) => {
  app.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        email,
        password
      } = req.body as Users

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

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