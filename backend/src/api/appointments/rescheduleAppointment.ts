import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import checkAvailability from '../../utils/checkAvailability';

export const RescheduleAppointment = async (app: FastifyInstance) => {
  app.put("/appointment/reschedule/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        professionalId,
        startTime,
        endTime,
      } = req.body as Appointment

      const { id } = req.params as { id: string }
        
      const hasConflict = await checkAvailability(professionalId, startTime, endTime);
      
      const { data, error  } = await supabase.from("appointments")
      .update([{
        startTime,
        endTime,
        hasConflict,
      }])
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