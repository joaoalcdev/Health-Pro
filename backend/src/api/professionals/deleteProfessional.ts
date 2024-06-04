import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const DeleteProfessional = async (app: FastifyInstance) => {
  app.delete("/professional/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {

      const { id } = req.params as { id: string }

    
        const { data: User, error } = await supabase
        .from("users")
        .update({
          deletedAt: new Date()
        }).eq("id", id).select()
        
        const { data: professional, error: pError } = await supabase
        .from("professionals")
        .update({
          deletedAt: new Date()
        }).eq("userId", id).select()
      
      if (error) {
        throw error
      } else {
        //test NoData
        //return res.status(200).send([])
        return res.status(200).send(User ? User : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}