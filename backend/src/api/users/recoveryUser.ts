import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const RecoveryUser = async (app: FastifyInstance) => {
  app.put("/user/recovery/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {

      const { id } = req.params as { id: string }
    
        const { data: User, error } = await supabase
        .from("users")
        .update({
          deletedAt: null
        }).eq("id", id).select()

        console.log(User? User[0].id : null)

        if(error) {
          throw error
        } else if((User[0] as unknown as { roleId: number }).roleId === 3){
          const { data: professional, error: pError } = await supabase
          .from("professionals")
          .update({
            deletedAt: null
          }).eq("userId", User[0].id).select()
        }
        
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