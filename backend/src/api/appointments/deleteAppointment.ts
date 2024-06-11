import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const DeleteAppointment = async (app: FastifyInstance) => {
  app.delete("/appointment/delete/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      
      const { id } = req.params as { id: string }
      async function checkIsCompleted(id: string) {
        const { data, error } = await supabase.from("appointments")
          .select()
          .eq("id", id)
          .single()

        if (error) {
          return true
        } else {
          if (data?.eventStatus === 3) {
            return true
          }
          return false
        }
      }
      
      const isCompleted = await checkIsCompleted(id)
      if (isCompleted) {
        return res.status(400).send({error: 1})
      }
      const { data, error  } = await supabase.from("appointments")
      .delete()
      .eq("id", id)
      .select()

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