import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

import 'moment/locale/pt-br';

export const CancelEvents = async (app: FastifyInstance) => {
  app.put("/cancelEvent/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: number}
      const {
        eventId,
        cancelType,
        eventStartTime
      } = req.body as {eventId: number, cancelType: number, eventStartTime: string}
           
      if(cancelType === 1){
        const {data, error} = await supabase
          .from("eventInstances")
          .update({
            eventStatus: 5,
            canceledAt: moment.tz("America/Fortaleza").format()
          })
          .eq("id", id)
          .select()

          if(error){
            res.status(500).send(error)
          }
          else{
            res.status(200).send(data)
          }
        }
      else if(cancelType === 2){
        const {data, error} = await supabase
          .from("eventInstances")
          .update({
            eventStatus: 5,
            canceledAt: moment.tz("America/Fortaleza").format()
          })
          .eq("eventId", eventId)
          .eq("eventStatus", 1)
          .gte('startTime', eventStartTime)
          .select()
        
        if(error){
          res.status(500).send(error)
        }
        else{
          await supabase
          .from("events")
          .update(
            {
              dischargedDate: moment.tz("America/Fortaleza").format()
            }
          )
          .eq("id",eventId)

          res.status(200).send(data)
        }
      } 
    }
    catch(error){
      res.status(500).send(error)
    }
  })
}