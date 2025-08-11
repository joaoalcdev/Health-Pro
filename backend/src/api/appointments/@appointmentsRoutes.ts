import {FastifyInstance} from 'fastify';
import { AddAppointment } from './addAppointment';
import { ListAppointments } from './listAppointments';
import { RescheduleAppointment } from './rescheduleAppointment';
import { DeleteAppointment } from './deleteAppointment';
import { GetAppointmentsFrom } from './getAppointmentsFrom';
import { GetAppointmentsByProfessionalId } from './getAppointmentsByProfessionalId';


export const AppointmentRoutes =  async (app: FastifyInstance) => {
  app.register(AddAppointment);
  app.register(ListAppointments);
  app.register(RescheduleAppointment);
  app.register(DeleteAppointment);
  app.register(GetAppointmentsFrom);
  app.register(GetAppointmentsByProfessionalId);
}; 