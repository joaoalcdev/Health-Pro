import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";


export const GetAppointmentsByProfessionalId = async (app: FastifyInstance) => {
  app.get("/appointments/get",
    {preHandler: auth}, 
    async (req: FastifyRequest, res: FastifyReply) => {
    
    var { professional } = req.query as { professional: string };
    var {patient} = req.query as {patient: string};
    professional = professional ? professional : "0"; 
    patient = patient ? patient : "0";  


    var currentTime = new Date().toISOString();
    try {
      let { data, error } = await supabase
        .from("view_appointments")
        .select("*")
        .or(`professionalId.eq.${professional},patientId.eq.${patient}`) 
        .order("startTime", { ascending: true })
      
      if (error) {
        throw error
      } else {
        const appointments = data?.map((appointment: any) => {
          return {
            id: appointment.id,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            title: `${appointment.patientFullName} | ${appointment.service} | ${appointment.professionalFirstName} ${appointment.professionalLastName}`,
            type: appointment.type,
            hasConflict: appointment.hasConflict,
            ...appointment
          }
        })
        return res.status(200).send(appointments ? appointments : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}