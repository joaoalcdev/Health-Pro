import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const GetEventsFiltering = async (app: FastifyInstance) => {
  app.get("/events/get",async (req: FastifyRequest, res: FastifyReply) => {
    
    var { professional } = req.query as { professional: string };
    var {patient} = req.query as {patient: string};
    professional = professional ? professional : "0"; 
    patient = patient ? patient : "0";  


    var currentTime = new Date().toISOString();
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
            endTime: new Date(
              item.startTime.getFullYear(),
              item.startTime.getMonth(),
              item.startTime.getDate(),
              item.startTime.getHours(),
              item.startTime.getMinutes() + 30,
            ),
            title: `${item.patientFullName} |  | ${item.professionalFirstName} ${item.professionalLastName}`,
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