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

export const createInfinityEvents = async ( eventId: number, startDate: moment.Moment, timecodes: { time: object, day: number }[], agreementId: number, serviceId: number) => {

  console.log('SERVICE ID',serviceId)

  const maxEventInstancesQty = 10; //default number of events
  let currentDay = moment(startDate);
  let createdEventsQty = 0;
  let createdEvents: SingleEvent[] = [];
  let duration = 30;
  if (serviceId){
    await supabase
      .from("services")
      .select("customDuration")
      .eq("id", serviceId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          duration = data?.customDuration>0 ? data.customDuration : duration;
        }
      });
  }
  
  while (createdEventsQty < maxEventInstancesQty){
    timecodes.forEach((item: {
      day: number; time: object 
    }) => {
      if (item.day === currentDay.day()){
        
        currentDay.set('hour', moment(item.time).get('hour')).set('minute',moment(item.time).get('minute')).format()
        
        let instance = {
          eventId: eventId,
          startTime: moment(currentDay).format(),
          endTime: moment(currentDay).add(duration, 'm').format(),
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

export const createRecurringEvents = async ( eventId: number, startDate: moment.Moment, timecodes: { time: object, day: number }[], agreementId: number, eventQty: number,serviceId?: number, dischargedDate?: moment.Moment, ) => {

  const maxEventInstancesQty = eventQty; 
  let currentDay = moment(startDate);
  let createdEventsQty = 0;
  let createdEvents: SingleEvent[] = [];
  let duration = 30;
  if (serviceId){
    await supabase
      .from("services")
      .select("customDuration")
      .eq("id", serviceId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          duration = data?.customDuration>0 ? data.customDuration : duration;
        }
      });
  }
  
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
          endTime: moment(currentDay).add(duration, 'm').format(),
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

export const createSingleEvent = async ( eventId: number, startDate: moment.Moment,  agreementId: number, serviceId?: number) => {
  const finalAgreementId = agreementId === 0 ? null : agreementId;
  let currentDay = moment(startDate);
  let duration = 30;
  if (serviceId){
    await supabase
      .from("services")
      .select("customDuration")
      .eq("id", serviceId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          duration = data?.customDuration>0 ? data.customDuration : duration;
        }
      });
  }
  let createdEvent = {
    eventId: eventId,
    startTime: moment(currentDay).format(),
    endTime: moment(currentDay).add(duration, 'm').format(),
    agreementId: finalAgreementId,
    timecodes: currentDay.day()
  }
  
  return supabase
    .from("eventInstances")
    .insert(createdEvent)
    .select()
}

export const updateSingleEvent = async ( eventId: number, startDate: moment.Moment, serviceId?: number) => {
  let currentDay = moment(startDate);
  let duration = 30;
  if (serviceId){
    await supabase
      .from("services")
      .select("customDuration")
      .eq("id", serviceId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          duration = data?.customDuration>0 ? data.customDuration : duration;
        }
      });
  }

  let updatedEvent = {
    startTime: moment(currentDay).format(),
    endTime: moment(currentDay).add(duration, 'm').format(),
    timecodes: currentDay.day()
  }
  
  return supabase
    .from("eventInstances")
    .update(updatedEvent)
    .eq("eventId", eventId)
    .select()
}

export const updateSingleEventInstance = async ( eventInstanceId: number, startDate: moment.Moment, serviceId?:number) => {
  let currentDay = moment(startDate);

  let duration = 30;
  if (serviceId){
    await supabase
      .from("services")
      .select("customDuration")
      .eq("id", serviceId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          duration = data?.customDuration>0 ? data.customDuration : duration;
        }
      });
  }
  let updatedEvent = {
    startTime: moment(currentDay).format(),
    endTime: moment(currentDay).add(duration, 'm').format(),
    timecodes: currentDay.day()
  }
  
  return supabase
    .from("eventInstances")
    .update(updatedEvent)
    .eq("id", eventInstanceId)
    .select()
}

export const createOngoingEvents = async (eventId: number) => {
  let { data: eventData, error: eventDataError } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

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
      return createRecurringEvents(eventId, moment(eventInstances[0].startTime), eventData?.timecodes, eventData.agreementId, 10-eventInstances.length, eventData.serviceId, moment(eventData.dischargedDate ? eventData.dischargedDate : null));
    }
}

