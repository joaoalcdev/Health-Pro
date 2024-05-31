import {FastifyInstance} from 'fastify';
import { AddAppointment } from './addAppointment';
import { ListAppointments } from './listAppointments';


export const AppointmentRoutes =  async (app: FastifyInstance) => {
  app.register(AddAppointment);
  app.register(ListAppointments);

}; 