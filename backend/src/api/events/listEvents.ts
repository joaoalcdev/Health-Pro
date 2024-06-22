import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListEvents = async (app: FastifyInstance) => {
  app.get("/events", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      let { data, error } = await supabase
        .from("view_events")
        .select("*")
        .order("startTime", { ascending: true })
      
      if (error) {
        throw error
      } else {
        const events = data?.map((item: any) => {
          return {
            id: item.eventInstanceId,
            startTime: item.startTime,
            endTime: new Date(
              new Date(item.startTime).getFullYear(),
              new Date(item.startTime).getMonth(),
              new Date(item.startTime).getDate(),
              new Date(item.startTime).getHours(),
              new Date(item.startTime).getMinutes() + 30,
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