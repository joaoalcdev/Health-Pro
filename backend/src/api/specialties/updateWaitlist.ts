import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const UpdateWaitlist = async (app: FastifyInstance) => {
  app.put("/waitlist/:id",
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {

    const { id } = req.params as { id: number }
    const {waitlistItems} = req.body as {waitlistItems: WaitlistItem[]}
    
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .upsert(waitlistItems)
        .select()
      
        if (error){
          throw error
        }
        if(data){
          return res.send({
            status: 200,
            data: data,
            message: "Waitlist updated successfully"
          })
        }
      
    } catch (error) {
      return res.send(
        {
          status: 400,
          message: error
        }
      )
    }
  })
}