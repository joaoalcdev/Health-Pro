import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

import 'moment/locale/pt-br';

export const EventCheckIn = async (app: FastifyInstance) => {
  app.put("/checkIn/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: string}
      const {
        checkInName
      } = req.body as ScheduleEvent;

      const {data, error} = await supabase
        .from('eventInstances')
        .update({
          checkInName,
          checkInDate: moment.tz(new Date(), "America/Fortaleza"),
          eventStatus: 3
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
    catch(error){
      res.status(500).send(error)
    }
  })
}