import {FastifyInstance} from 'fastify';
import { AddAppointment } from './addAppointment';
import { ListAppointments } from './listAppointments';
import { RescheduleAppointment } from './rescheduleAppointment';
import { DeleteAppointment } from './deleteAppointment';


export const AppointmentRoutes =  async (app: FastifyInstance) => {
  app.register(AddAppointment);
  app.register(ListAppointments);
  app.register(RescheduleAppointment);
  app.register(DeleteAppointment);
}; 