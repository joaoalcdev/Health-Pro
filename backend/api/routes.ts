import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { UsersRoutes } from './src/controllers/users/@usersRoutes';
import { AuthRoutes } from './src/controllers/auth/@authRoutes';
import { PatientsRoutes } from './src/controllers/patients/@patientsRoutes';
import { ProfessionalsRoutes } from './src/controllers/professionals/@professionalsRoutes';

export const routes = async (app: FastifyInstance) => {
  app.register(AuthRoutes)
  app.register(UsersRoutes)
  app.register(PatientsRoutes)
  app.register(ProfessionalsRoutes)
} 