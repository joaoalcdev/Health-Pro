import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import { createRecurringEvents, updateSingleEvent } from './eventsController';
import moment from 'moment-timezone';
import auth from "../../middlewares/auth";
import 'moment/locale/pt-br';

export const RescheduleEvents = async (app: FastifyInstance) => {
  app.put("/event/reschedule/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: string}
      var {
        eventInstanceId,
        eventType,
        startDate,
        agreementId,
        eventsPerWeek,
        eventsQty,
        timecodes
      } = req.body as ScheduleEvent & { timecodes: {  day: number, time: object}}

      //convert timecodes to moment objects
      timecodes.forEach((item) => {
        item.time = moment.tz(item.time, "America/Fortaleza")
      })

    switch (eventType) {
      case 1: //Recorrência Infinita
      case 2: //Recorrência finita
      {
        let { data, error } = await supabase
          .from("eventInstances")
          .update(
            {
              eventStatus: 5,
              canceledAt: moment.tz("America/Fortaleza").format()
            }
          )
          .eq("eventId", id)
          .eq("eventStatus", 1)
          .gte("startTime", startDate)
          .select()

        if (error) {
          throw error
        } else {
          const {data: eventInstances, error: eventInstancesError} = await createRecurringEvents(parseInt(id), moment.tz(startDate, "America/Fortaleza"), timecodes, agreementId, data?.length || 1)

          await supabase
          .from("events")
          .update(
            {
              timecodes: timecodes
            }
          )
          .eq("id",id)

          if (eventInstancesError) {
            throw eventInstancesError
          } else {
            return res.status(200).send(eventInstances ? eventInstances : null)
          }
        }
      }

      default:
        {
          const {data: eventInstances, error: eventInstancesError} = await updateSingleEvent(parseInt(id), moment.tz(startDate, "America/Fortaleza"))

          await supabase
          .from("events")
          .update(
            {
              startDate
            }
          )
          .eq("id",id)

          if (eventInstancesError) {
            throw eventInstancesError
          } else {
            return res.status(200).send(eventInstances ? eventInstances : null)
          }
        }
    }
      
    }
    catch(error){
      res.status(500).send(error)
    }
  })
}