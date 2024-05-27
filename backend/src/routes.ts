import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { UsersRoutes } from './api/users/@usersRoutes';
import { AuthRoutes } from './api/auth/@authRoutes';
import { PatientsRoutes } from './api/patients/@patientsRoutes';
import { ProfessionalsRoutes } from './api/professionals/@professionalsRoutes';

export const routes = async (app: FastifyInstance) => {
  app.register(AuthRoutes)
  app.register(UsersRoutes)
  app.register(PatientsRoutes)
  app.register(ProfessionalsRoutes)
} 