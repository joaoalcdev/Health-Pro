import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { UsersRoutes } from './api/controllers/users/@usersRoutes';
import { AuthRoutes } from './api/controllers/auth/@authRoutes';
import { PatientsRoutes } from './api/controllers/patients/@patientsRoutes';
import { ProfessionalsRoutes } from './api/controllers/professionals/@professionalsRoutes';

export const routes = async (app: FastifyInstance) => {
  app.register(AuthRoutes)
  app.register(UsersRoutes)
  app.register(PatientsRoutes)
  app.register(ProfessionalsRoutes)
} 