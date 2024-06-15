import {FastifyInstance} from 'fastify';
import { ListSpecialties } from './listSpecialties';

export const SpecialtiesRoutes =  async (app: FastifyInstance) => {
  app.register(ListSpecialties);
}
