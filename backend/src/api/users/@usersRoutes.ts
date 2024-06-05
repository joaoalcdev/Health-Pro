import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import app from '../../server';
import { ListUsers } from './listUsers';
import { AddUser } from './addUser';
import { UpdateUser } from './updateUser';
import { DeleteUser } from './deleteUser';
import { ViewUser } from './viewUser';
import { RecoveryUser } from './recoveryUser';

export const UsersRoutes =  async (app: FastifyInstance) => {
  app.register(ListUsers);
  app.register(AddUser);
  app.register(UpdateUser);
  app.register(DeleteUser);
  app.register(ViewUser);
  app.register(RecoveryUser);
}; 
