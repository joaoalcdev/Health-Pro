import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const RecoveryPatient = async (app: FastifyInstance) => {
  app.get("/patients/recovery/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {

      const { id } = req.params as { id: string }
      const { data: Patient, error } = await supabase
        .from("patients")
        .update({
          deletedAt: null
        }).eq("id", id).select()

      if (error) {
        throw error
      } else {
        return res.status(200).send(Patient ? Patient : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}