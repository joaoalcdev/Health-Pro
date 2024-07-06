import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

import 'moment/locale/pt-br';

export const UpdateEvents = async (app: FastifyInstance) => {
  app.put("/eventInstance/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: string}
      const {
        agreementId,
        agAuthCode,
        agAuthDate,
        agPreCode,
        agPreCodeDate,
      } = req.body as ScheduleEvent;

      const {data, error} = await supabase
        .from('eventInstances')
        .update({
          agreementId,
          agAuthCode,
          agAuthDate: moment.tz(agAuthDate, "America/Fortaleza"),
          agPreCode,
          agPreCodeDate: moment.tz(agPreCodeDate, "America/Fortaleza") 
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