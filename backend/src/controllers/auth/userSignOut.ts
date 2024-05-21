import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UserSignOut = async (app: FastifyInstance) => {
  app.post("/logout", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      } else {
        return res.status(200).send("User signed out")
      }
    } catch (error) {
      return res.status(400).send("Couldn't sign out user!")
    }
  })
  
}