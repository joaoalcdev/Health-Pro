import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';
import checkAvailability from '../../utils/checkAvailability';

import 'moment/locale/pt-br';


export const AddEvents = async (app: FastifyInstance) => {
  app.post("/events", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        patientId,
        professionalId,
        startDate,
        endTime,
        serviceId,
        agreementId,
        eventType,
      } = req.body as ScheduleEvent

      var start = moment.tz(startDate, "America/Fortaleza");
      var end = moment.tz(endTime, "America/Fortaleza");

      //const hasConflict = await checkAvailability(professionalId, startTime, endTime);

      //types 3,4,5 - Single events like Simple Sceduling, Appointment and Return
      if(eventType === 3 || eventType === 4 || eventType === 5) {
        
        const { data: eventData, error } = await 
        createEvent(
          patientId,
          professionalId,
          start.format(),
          serviceId,
          agreementId,
          eventType,
        )

        if (error) {
          throw error
        } else {
          if(eventData) {
            const { data: instance , error: instanceError  } = await createEventInstance(
              eventData[0].id,
              start.format(),
              end.format(),
              agreementId
            ) 
            
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

async function singleEvent(
  patientId: number,
  professionalId: number,
  startDate: string,
  serviceId: number,
  agreementId: number,
  eventType:number) {
    try {
      const { data, error  } = await createEvent(
      patientId,
      professionalId,
      startDate,
      serviceId,
      agreementId,
      eventType,
    )

    if (error) {
      throw error
    } else {
      if(data) {
        const { data: instance , error: instanceError  } = await createEventInstance(
          data[0].id,
          startDate,
          agreementId
        ) 
        
        if (instanceError) {
          throw error
        } else {
          return instance ? instance : null
        }
      }
    }

  }catch (error) {
    return error
  }
}

function createEvent( 
  patientId: number,
  professionalId: number,
  startDate: string,
  serviceId: number,
  agreementId: number,
  eventType:number) {

  return supabase
  .from("events")
  .insert([{
    patientId,
    professionalId,
    startDate,
    serviceId,
    agreementId,
    eventType,
  }]).select()
}

function createEventInstance(
  eventId: number, 
  startTime: string,
  endTime: string, 
  agreementId: number) {

  return supabase
  .from("eventInstances")
  .insert([{
    eventId,
    startTime,
    endTime,
    agreementId,
  }]).select()
}