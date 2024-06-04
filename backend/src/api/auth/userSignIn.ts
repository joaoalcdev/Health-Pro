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
        const { data: User, error } = await supabase.from("users")
        .select("*")
        .eq("id", data.user?.id)
        .single()

        if(User.deletedAt) {
          await supabase.auth.signOut()
          return res.status(401).send({ message: "Usuário Deletado!" })
        }
        
       return res.status(200).send(data ? {session: data, userData: User} : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}