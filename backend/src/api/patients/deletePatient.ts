import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase, supabaseAdmin } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

interface RequestParams {
  id: string;
}

export const DeletePatient = async (app: FastifyInstance) => {
  app.delete("/patients/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as { id: string }

      const { data, error } = await supabase
        .from("patients")
        .update({
          deletedAt: new Date()
        }).eq("id", id).select()

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