import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const DeleteExternalService = async (app: FastifyInstance) => {
  app.delete("/external-service/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as Company

      const { data, error } = await supabase
      .from("externalServices")
      .update({
        deletedAt: new Date()
      })
      .eq("id", id)
      .select()

      if (error) {
        throw error
      } 
      if(data) {
        return res.send({
          status: 200,
          data: data,
          messsage: "External service deleted successfully"
        })
      }      
    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })
}