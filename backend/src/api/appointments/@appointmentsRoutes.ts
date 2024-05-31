import {FastifyInstance} from 'fastify';
import { AddAppointment } from './addAppointment';


export const AppointmentRoutes =  async (app: FastifyInstance) => {
  app.register(AddAppointment)
}; 