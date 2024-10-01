import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

export const createEvent = (patientId: number, professionalId: number, startDate: string,  eventType: number, agreementId: number,serviceId?: number, timecodes?:{ day: number, time: object }, eventsQty?: number ) => {
  const finalAgreementId = agreementId === 0 ? null : agreementId;
  return supabase
    .from("events")
    .insert({
      patientId,
      professionalId,
      startDate,
      serviceId,
      agreementId: finalAgreementId,
      eventType,
      timecodes,
      eventsQty
    }).select()
}

export const createInfinityEvents = ( eventId: number, startDate: moment.Moment, timecodes: { time: object, day: number }[], agreementId: number) => {

  const maxEventInstancesQty = 10; //default number of events
  let currentDay = moment(startDate);
  let createdEventsQty = 0;
  let createdEvents: SingleEvent[] = [];
  
  while (createdEventsQty < maxEventInstancesQty){
    timecodes.forEach((item: {
      day: number; time: object 
    }) => {
      if (item.day === currentDay.day()){
        
        currentDay.set('hour', moment(item.time).get('hour')).set('minute',moment(item.time).get('minute')).format()
        
        let instance = {
          eventId: eventId,
          startTime: moment(currentDay).format(),
          endTime: moment(currentDay).add(30, 'm').format(),
          agreementId,
          timecodes: currentDay.day()
        }
        createdEventsQty++;
        createdEvents.push(instance)
      }
    })
    currentDay.add(1, 'days');
  }
  console.log(createdEvents)
  
  return supabase
    .from("eventInstances")
    .insert(createdEvents)
    .select()
}

export const createRecurringEvents = ( eventId: number, startDate: moment.Moment, timecodes: { time: object, day: number }[], agreementId: number, eventQty: number) => {

  const maxEventInstancesQty = eventQty; 
  let currentDay = moment(startDate);
  let createdEventsQty = 0;
  let createdEvents: SingleEvent[] = [];
  
  while (createdEventsQty < maxEventInstancesQty){
    timecodes.forEach((item: {
      day: number; time: object 
    }) => {
      if (item.day === currentDay.day() && createdEventsQty < maxEventInstancesQty){
        
        currentDay.set('hour', moment(item.time).get('hour')).set('minute',moment(item.time).get('minute')).format()
        
        let instance = {
          eventId: eventId,
          startTime: moment(currentDay).format(),
          endTime: moment(currentDay).add(30, 'm').format(),
          agreementId,
          timecodes: currentDay.day()
        }
        createdEventsQty++;
        createdEvents.push(instance)
      }
    })
    currentDay.add(1, 'days');
  }
  
  return supabase
    .from("eventInstances")
    .insert(createdEvents)
    .select()
}

export const createSingleEvent = ( eventId: number, startDate: moment.Moment,  agreementId: number) => {
  const finalAgreementId = agreementId === 0 ? null : agreementId;
  let currentDay = moment(startDate);
  let createdEvent = {
    eventId: eventId,
    startTime: moment(currentDay).format(),
    endTime: moment(currentDay).add(30, 'm').format(),
    agreementId: finalAgreementId,
    timecodes: currentDay.day()
  }
  
  return supabase
    .from("eventInstances")
    .insert(createdEvent)
    .select()
}

export const updateSingleEvent = ( eventId: number, startDate: moment.Moment) => {
  let currentDay = moment(startDate);
  let updatedEvent = {
    startTime: moment(currentDay).format(),
    endTime: moment(currentDay).add(30, 'm').format(),
    timecodes: currentDay.day()
  }
  
  return supabase
    .from("eventInstances")
    .update(updatedEvent)
    .eq("eventId", eventId)
    .select()
}

