import {FastifyInstance} from 'fastify';
import { ListSpecialties } from './listSpecialties';
import { AddSpecialty } from './addSpecialty';
import { UpdateSpecialty } from './updateSpecialty';

export const SpecialtiesRoutes =  async (app: FastifyInstance) => {
  app.register(ListSpecialties);
  app.register(AddSpecialty);
  app.register(UpdateSpecialty);
}
