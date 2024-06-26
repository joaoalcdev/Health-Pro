import { FastifyInstance } from 'fastify';
import { UsersRoutes } from './api/users/@usersRoutes';
import { AuthRoutes } from './api/auth/@authRoutes';
import { PatientsRoutes } from './api/patients/@patientsRoutes';
import { ProfessionalsRoutes } from './api/professionals/@professionalsRoutes';
import { AppointmentRoutes } from './api/appointments/@appointmentsRoutes';
import { SpecialtiesRoutes } from './api/specialties/@specialtiesRoutes';
import { ServicesRoutes } from './api/services/@servicesRoutes';
import { EventsRoutes } from './api/events/@eventsRoutes';
import { FileUploaderRoutes } from './api/fileupload/@fileuploaderRoutes';


export const routes = async (app: FastifyInstance) => {
  app.register(AuthRoutes);
  app.register(UsersRoutes);
  app.register(PatientsRoutes);
  app.register(ProfessionalsRoutes);
  app.register(AppointmentRoutes);
  app.register(SpecialtiesRoutes);
  app.register(ServicesRoutes);
  app.register(EventsRoutes);
  // app.register(FileUploaderRoutes);
} 