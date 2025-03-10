import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const ListEvents = async (app: FastifyInstance) => {
  app.get("/events", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      let { data, error } = await supabase
        .from("view_events")
        .select("*")
        .is("canceledAt", null)
        .order("startTime", { ascending: true })

      
      if (error) {
        throw error
      } else {
        const events = data?.map( (item: any) => {
          return {
            id: item.eventInstanceId,
            startTime: item.startTime,
            endTime: item.endTime,
            title: `${item.eventType === 4 ? 'Consulta' :  (item.eventType === 5? 'Retorno':  item.serviceName) } | ${item.professionalFirstName} | ${item.patientFullName} | ${item.agreementName}`,
            type: item.eventType,
            eventStatus: item.eventStatus,
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


