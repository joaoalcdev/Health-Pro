import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const GetAppointmentsFrom = async (app: FastifyInstance) => {
  app.get("/appointments/:professionalId", async (req: FastifyRequest, res: FastifyReply) => {
    
    const { professionalId } = req.params as { professionalId: string }

    var currentTime = new Date().toISOString();
    try {
      let { data, error } = await supabase
        .from("view_appointments")
        .select("*")
        .eq("professionalId", professionalId)
        .gte("startTime", currentTime)
        .order("startTime", { ascending: true })
      
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