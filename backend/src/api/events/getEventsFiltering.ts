import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";
import moment from 'moment-timezone';

export const GetEventsFiltering = async (app: FastifyInstance) => {
  app.get("/events/get",
    {preHandler: auth}, 
    async (req: FastifyRequest, res: FastifyReply) => {
    
    var { 
      professionalId,
      patientId,
      start,
      end
     } = req.query as { 
      professionalId: number,
      patientId: number,
      start: string,
      end: string  
    };



    try {
      let query = supabase
        .from("view_events")
        .select("*")
        .order("startTime", { ascending: true })

      if (professionalId) {
        query = query.eq("professionalId", professionalId)
      }
      if (patientId) {
        query = query.eq("patientId", patientId)
      }
      if (start && end) {
        start = moment(start,"DD/MM/YYYY").format()
        end = moment(end,"DD/MM/YYYY").endOf('day').format()
        query = query.gte("startTime", start).lte("startTime", end)
      }
      start = moment(start,"DD/MM/YYYY").format()
      end = moment(end,"DD/MM/YYYY").format()
      query = query.in("eventStatus", [1,3])

      const { data, error } = await query
      
      if (error) {
        throw error
      } else {
        const events = data?.map((item: any) => {
          return {
            id: item.eventInstanceId,
            startTime: item.startTime,
            endTime: item.endTime,
            title: `${item.eventType === 4 ? 'Consulta' :  (item.eventType === 5? 'Retorno':  item.serviceName) } | ${item.professionalFirstName} | ${item.patientFullName} | ${item.agreementName}`,
            type: item.eventType,
            hasConflict: false,
            ...item
          }
        })
        return res.send({
          status: 200,
          message: "Events retrieved successfully",
          data: events
        })
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}