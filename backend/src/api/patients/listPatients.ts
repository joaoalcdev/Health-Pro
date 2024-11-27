import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const ListPatients = async (app: FastifyInstance) => {
  app.get("/patients/:deleted", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    const { deleted } = req.params as { deleted: string }
    try {
      if (deleted === "true") {
        let { data, error } = await supabase
          .from("patients")
          .select("*")
          .not("deletedAt", "is", null)
          .order("fullName", { ascending: true })
        if (error) {
          throw error
        } else {
          return res.status(200).send(data ? data : null)
        }
      } else {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .filter("deletedAt", "is", null)
          .order("fullName", { ascending: true })
        if (error) {
          throw error
        } else {
          return res.status(200).send(data ? data : null)
        }
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}