import { UsersRoutes } from './controllers//users/@usersRoutes';
import { AuthRoutes } from './controllers/auth/@authRoutes';
import { PatientsRoutes } from './controllers/patients/@patientsRoutes';
import { ProfessionalsRoutes } from './controllers/professionals/@professionalsRoutes';
import {app} from './server';

export const routes =  async () => {
  app.register(AuthRoutes)
  app.register(UsersRoutes)
  app.register(PatientsRoutes)
  app.register(ProfessionalsRoutes)
} 