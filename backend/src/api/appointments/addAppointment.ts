import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddAppointment = async (app: FastifyInstance) => {
  app.post("/appointments", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        patientId,
        professionalId,
        startTime,
        endTime,
        service,
        agreement,
      } = req.body as Appointment

      const status = 1;

      const { data, error  } = await supabase.from("appointments").insert([{
        patientId,
        professionalId,
        startTime,
        endTime,
        status,
        service,
        agreement,
      }]).select()

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