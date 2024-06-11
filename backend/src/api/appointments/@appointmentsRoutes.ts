import {FastifyInstance} from 'fastify';
import { AddAppointment } from './addAppointment';
import { ListAppointments } from './listAppointments';
import { RescheduleAppointment } from './rescheduleAppointment';


export const AppointmentRoutes =  async (app: FastifyInstance) => {
  app.register(AddAppointment);
  app.register(ListAppointments);
  app.register(RescheduleAppointment);
}; 