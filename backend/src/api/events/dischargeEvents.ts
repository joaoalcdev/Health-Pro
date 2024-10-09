import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

import 'moment/locale/pt-br';

export const DischargeEvents = async (app: FastifyInstance) => {
  app.put("/discharge/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: string}
      const {
        dischargedDate
      } = req.body as ScheduleEvent;

      const {data, error} = await supabase
        .from('eventInstances')
        .update({
          eventStatus: 5,
          canceledAt: moment.tz("America/Fortaleza").format()
        })
        .eq('eventId', id)
        .eq('eventStatus', 1)
        .gte('startTime', moment.tz(dischargedDate, "America/Fortaleza").format())
        .select()

      if(error){  
        throw error
      }
      else{
        const {data, error} = await supabase
          .from('events')
          .update({
            dischargedDate: moment.tz(dischargedDate, "America/Fortaleza")
          })
          .eq('id', id)
          .select()
          
        
        if(error){
          throw error
        }else{
          if(data){
            res.status(200).send({data})
          }else{
            res.status(404).send({error: 'Event not found'})
          }
        }
      }

    }
    catch(error){
      res.status(500).send(error)
    }
  })
}