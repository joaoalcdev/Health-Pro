import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

export const GetEventsFiltering = async (app: FastifyInstance) => {
  app.get("/events/get",async (req: FastifyRequest, res: FastifyReply) => {
    
    var { professional } = req.query as { professional: string };
    var {patient} = req.query as {patient: string};
    professional = professional ? professional : "0"; 
    patient = patient ? patient : "0";  


    try {
      let { data, error } = await supabase
        .from("view_events")
        .select("*")
        .or(`professionalId.eq.${professional},patientId.eq.${patient}`) 
        .order("startTime", { ascending: true })
      
      if (error) {
        throw error
      } else {
        const events = data?.map((item: any) => {
          return {
            id: item.eventInstanceId,
            startTime: item.startTime,
            endTime: item.endTime,
            title: `${item.patientFullName} | ${
              item.eventType === 4 ? 'Consulta' :  (item.eventType === 5? 'Retorno': item.serviceName) } | ${item.professionalFirstName} ${item.professionalLastName}`,
            type: item.eventType,
            hasConflict: false,
            ...item
          }
        })
        return res.status(200).send(events ? events : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}