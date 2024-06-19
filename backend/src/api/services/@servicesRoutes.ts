import {FastifyInstance} from 'fastify';
import { ListServices } from './listServices';
import { AddService } from './addServices';
import { UpdateService } from './updateServices';

export const ServicesRoutes =  async (app: FastifyInstance) => {
  app.register(ListServices);
  app.register(AddService);
  app.register(UpdateService);
}
