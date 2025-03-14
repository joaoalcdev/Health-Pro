import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";
import moment from 'moment';

export const getPatient = async (app: FastifyInstance) => {
  app.get("/patient/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var arrayHistory = []
      var arrayNextEvents = []

      const { id } = req.params as { id: string }
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)

      const { data: patientHistory, error: errorPatientHistory } = await supabase
        .from('view_events')
        .select('*')
        .eq('patientId', id)
        .eq('eventStatus', 3)
        .order('startTime', { ascending: false })

      const { data: patientNextEvents, error: errorPatientNextEvents } = await supabase
      .from('view_events')
      .select('*')
      .eq('patientId', id)
      .eq('eventStatus', 1)
      .gte('startTime', moment().format())
      .order('startTime', { ascending: true })

      const {data: specialties, error: errorSpecialities} = await supabase
        .from('specialties')
        .select('*')


      if (error) {
        throw error
      }
      if (errorPatientHistory) {
        throw errorPatientHistory
      }
      if (errorPatientNextEvents) {
        throw errorPatientNextEvents
      }
      if (errorSpecialities) {
        throw errorSpecialities
      }

      if (data) {
        if (patientHistory && patientHistory.length > 10) {
          for (let i = 0; i < 10; i++) {
            arrayHistory.push(patientHistory[i])
          }
        } else {
          arrayHistory = patientHistory
        }
        if(patientNextEvents && patientNextEvents.length > 10) {
          for (let i = 0; i < 10; i++) {
            arrayHistory.push(patientNextEvents[i])
          }
        } else {
          arrayNextEvents = patientNextEvents
        }
        const arrayHistoryWithSpecialty = arrayHistory.map((event) => {
          const specialty = specialties.find((specialty) => specialty.id === event.specialtyId)
          return {
            id: event.id,
            eventInstanceId: event.eventInstanceId,
            startTime: event.startTime,
            eventType: event.eventType,
            professionalFirstName: event.professionalFirstName,
            professionalLastName: event.professionalLastName,
            specialtyName: specialty?.name,
            serviceName: event.serviceName
          }
        })

        const arrayNextEventsWithSpecialty = arrayNextEvents.map((event) => {
          const specialty = specialties.find((specialty) => specialty.id === event.specialtyId)
          return {
            id: event.id,
            eventInstanceId: event.eventInstanceId,
            startTime: event.startTime,
            eventType: event.eventType,
            professionalFirstName: event.professionalFirstName,
            professionalLastName: event.professionalLastName,
            specialtyName: specialty?.name,
            serviceName: event.serviceName
          }
        })
        data[0].history = arrayHistoryWithSpecialty
        data[0].nextEvents = arrayNextEventsWithSpecialty
        return res.send({
          status: 200,
          message: 'Patient found',
          data: data[0]
        })
      }
    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })

}