import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

import 'moment/locale/pt-br';

interface SingleEvent {
  eventId: number; 
  startTime: string;
  endTime: string;
  agreementId: number;
}


export const AddEvents = async (app: FastifyInstance) => {
  app.post("/events", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        patientId,
        professionalId,
        startDate,
        //endTime,
        serviceId,
        agreementId,
        eventType,
        eventsPerWeek,
        eventsQty,
      } = req.body as ScheduleEvent

      //types 1,2 - Multiple events like recurring
      if (eventType === 2 || eventType === 1) {
        
        const qty = eventType === 1 ? 10 : (eventsQty?? 1);

        let createdEventsQty = 0;
        let createdEvents = [];

        var start = moment.tz(startDate[0], "America/Fortaleza");
        var end = moment.tz(startDate[0], "America/Fortaleza");
        end.add(30, 'minutes');

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
          if (eventData) {
            
            for (let i = 0; createdEventsQty< qty ; i++) {
              for (let j = 0; j < (eventsPerWeek ?? 0); j++) {

                start = moment.tz(startDate[j], "America/Fortaleza");
                end = moment.tz(startDate[j], "America/Fortaleza");
                end.add(30, 'minutes');
                
              let instance = { 
                eventId: eventData[0].id,
                startTime: start.add(i * 7,'days').format(),
                endTime: end.add(i * 7,'days').format(),
                agreementId
              }
              createdEventsQty++;
              createdEvents.push(instance)
              }
            }
            let arraytEvents = createdEvents.filter((item, index)=>{
              if (index < qty) {
                return item
              }
            })

            let lastEvents = arraytEvents.filter ((item, index) => {
              //return last eventsPerWeek items
              if (eventsPerWeek && index >= arraytEvents.length - eventsPerWeek) {
                return item
                }
               })
            console.log(arraytEvents)
            const {data: lastEventsData, error: lastEventsError} = await includeLastDays2ParentEvent(eventData[0].id, lastEvents as SingleEvent[])
            const { data: instances , error: instanceError  } = await createMultipleEventsInstaces(arraytEvents as SingleEvent[])
            
            if (instanceError) {
              throw error
            } else {
              return res.status(200).send(instances ? instances : null)
            }
          }
        }
      }

      //types 3,4,5 - Single events like Simple Sceduling, Appointment and Return
      if(eventType === 3 || eventType === 4 || eventType === 5) {

        var start = moment.tz(startDate[0], "America/Fortaleza");
        var end = moment.tz(startDate[0], "America/Fortaleza");
        
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
              end.add(30, 'minutes').format(),
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

function createMultipleEventsInstaces(eventsArray: SingleEvent[]){

  return supabase
  .from("eventInstances")
  .insert(eventsArray)
  .select()

}

function includeLastDays2ParentEvent(eventId: number, eventsArray: SingleEvent[]){
  return supabase
  .from("events")
  .update({
    timecodes: eventsArray
  })
  .eq('id', eventId)
  .select()
}