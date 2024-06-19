import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import checkAvailability from '../../utils/checkAvailability';

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
        type,
      } = req.body as Appointment

      const hasConflict = await checkAvailability(professionalId, startTime, endTime);
      
      const { data, error  } = await supabase.from("appointments")
      .insert([{
        patientId,
        professionalId,
        startTime,
        endTime,
        service,
        agreement,
        type,
        eventStatus: 1,
        hasConflict,
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