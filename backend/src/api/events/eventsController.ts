import { create } from "domain";
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
  
  return supabase
    .from("eventInstances")
    .insert(createdEvents)
    .select()
}

export const createRecurringEvents = ( eventId: number, startDate: moment.Moment, timecodes: { time: object, day: number }[], agreementId: number, eventQty: number, dischargedDate?: moment.Moment) => {

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

        if(dischargedDate?.isBefore(currentDay)) 
          {
            createdEventsQty = maxEventInstancesQty
            return
          }
        
        let instance = {
          eventId: eventId,
          startTime: moment(currentDay).format(),
          endTime: moment(currentDay).add(30, 'm').format(),
          agreementId,
          timecodes: currentDay.day()
        }
        if(currentDay.isSame(startDate)){
          return
        }else{
          createdEventsQty++;
          createdEvents.push(instance)
        }
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

export const createOngoingEvents = async (eventId: number) => {
  let { data: eventData, error: eventDataError } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  if (eventDataError) {
    console.error(eventDataError);
    return;
  }

  let {data: eventInstances, error: eventInstancesError} = await supabase
    .from("eventInstances")
    .select("*")
    .eq("eventId", eventId)
    .eq("eventStatus", 1)
    .order("startTime", {ascending: false});

    
    if(eventData && eventInstances && eventInstances.length > 0){
      return createRecurringEvents(eventId, moment(eventInstances[0].startTime), eventData[0]?.timecodes, eventData[0].agreementId, 10-eventInstances.length, moment(eventData[0].dischargedDate ? eventData[0].dischargedDate : null));
    }
}

