import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment';
import checkAvailability from '../../utils/checkAvailability';

import 'moment/locale/pt-br';


export const AddEvents = async (app: FastifyInstance) => {
  app.post("/events", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        patientId,
        professionalId,
        startDate,
        serviceId,
        agreementId,
        eventType,
      } = req.body as ScheduleEvent

      console.log(startDate)

      //const hasConflict = await checkAvailability(professionalId, startTime, endTime);

      if(eventType === 3 || eventType === 4 || eventType === 5) {
        
        const { data, error  } = await supabase.from("events")
        .insert([{
          patientId,
          professionalId,
          //startDate,
          startDate: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
          serviceId,
          agreementId,
          eventType,
        }]).select()

        if (error) {
          throw error
        } else {
          console.log(data)
          if(data) {
            const { data: instance , error: instanceError  } = await supabase.from("eventInstances")
            .insert([{
              eventId: data[0].id,
              startTime: startDate,
              //startTime: new Date(startDate),
              agreementId,
            }]).select()
            
            if (instanceError) {
              throw error
            } else {
              return res.status(200).send(instance ? instance : null)
            }
          }
        }
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}