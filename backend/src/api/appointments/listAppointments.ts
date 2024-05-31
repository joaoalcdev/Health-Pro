import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import { title } from 'process';

export const ListAppointments = async (app: FastifyInstance) => {
  app.get("/appointments", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      let { data, error } = await supabase
        .from("view_appointments")
        .select("*")
        .order("startTime", { ascending: true })
      
      if (error) {
        throw error
      } else {
        const appointments = data?.map((appointment: any) => {
          return {
            id: appointment.id,
            startTime: appointment.startTime,
            color: '#FFC107',
            endTime: appointment.endTime,
            title: `${appointment.patientFullName} | ${appointment.service} | ${appointment.professionalFirstName} ${appointment.professionalLastName}`,
            //...appointment
          }
        })

        return res.status(200).send(appointments ? appointments : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}