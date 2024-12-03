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
        if(User.roleId === 3) { 
          const { data:professionalData, error: errorProfessionalData } = await supabase
          .from('professionals')
          .select('*')
          .eq('userId', User.id)
          .single()

          if (errorProfessionalData) {
            throw errorProfessionalData
          }
          if(professionalData) {
            return res.status(200).send(data ? {session: data, userData: {...User, professionalId: professionalData.id}} : null)
          }
        }
       return res.status(200).send(data ? {session: data, userData: User} : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}