import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import moment from 'moment-timezone';
import { createInfinityEvents, createEvent, createRecurringEvents, createSingleEvent } from './eventsController';
import 'moment/locale/pt-br';
import auth from "../../middlewares/auth";


export const AddEvents = async (app: FastifyInstance) => {
  app.post("/events", 
    {preHandler: auth}, 
    async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var {
        patientId,
        professionalId,
        startDate,
        //endTime,
        serviceId,
        agreementId,
        eventType,
        eventsPerWeek,
        eventsQty,
        timecodes
      } = req.body as ScheduleEvent & { timecodes: {  day: number, time: object}}

      //convert timecodes to moment objects
      timecodes.forEach((item) => {
          item.time = moment.tz(item.time, "America/Fortaleza")
      })

      //convert startDate to moment object
      startDate = moment.tz(startDate, "America/Fortaleza")

      switch (eventType) {
        case 1: //Recorrência Infinita
        {
          const {data: eventData, error} = await createEvent(
            patientId,
            professionalId,
            moment(startDate).format(),
            eventType,
            agreementId,
            serviceId,
            timecodes
          );
          
          if (error) {
            throw error
          } else {
            const {data: eventInstances, error: eventInstancesError} = await createInfinityEvents(
              eventData[0].id,
              moment(startDate),
              timecodes, 
              agreementId
            )
            if (eventInstancesError) {
              throw eventInstancesError
            } else {
              return res.status(200).send(eventInstances ? eventInstances : null)
            } 
          }
        }

        case 2: //Recorrência Finita
        {
          const {data: eventData, error} = await createEvent(
            patientId,
            professionalId,
            moment(startDate).format(),
            eventType,
            agreementId,
            serviceId,
            timecodes,
            eventsQty
          );
          
          if (error) {
            throw error
          } else {
            const {data: eventInstances, error: eventInstancesError} = await createRecurringEvents(
              eventData[0].id,
              moment(startDate),
              timecodes, 
              agreementId,
              eventsQty?? 1
            )
            if (eventInstancesError) {
              throw eventInstancesError
            } else {
              return res.status(200).send(eventInstances ? eventInstances : null)
            } 
          }
        }

        case 3: //Sessão Única
        {
          const {data: eventData, error} = await createEvent(
            patientId,
            professionalId,
            moment(startDate).format(),
            eventType,
            agreementId,
            serviceId,
          );
          
          if (error) {
            throw error
          } else {
            const {data: eventInstances, error: eventInstancesError} = await createSingleEvent(
              eventData[0].id,
              moment(startDate),
              agreementId,
            )
            if (eventInstancesError) {
              throw eventInstancesError
            } else {
              return res.status(200).send(eventInstances ? eventInstances : null)
            } 
          }
        }

        default: //Consultas e Retornos
        {
          const {data: eventData, error} = await createEvent(
            patientId,
            professionalId,
            moment(startDate).format(),
            eventType,
            eventType === 5 ? 0 : agreementId,
            serviceId,
          );
          
          if (error) {
            throw error
          } else {
            const {data: eventInstances, error: eventInstancesError} = await createSingleEvent(
              eventData[0].id,
              moment(startDate),
              eventType === 5 ? 0 : agreementId,
            )
            if (eventInstancesError) {
              throw eventInstancesError
            } else {
              return res.status(200).send(eventInstances ? eventInstances : null)
            } 
          }
        }
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}