import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import app from '../../server';
import { ListProfessionals } from './listProfessionals';
import { AddProfessional } from './addProfessional';


export const ProfessionalsRoutes =  async (app: FastifyInstance) => {
  app.register(ListProfessionals)
  app.register(AddProfessional)
  // app.register(UpdateProfessional)
  // app.register(DeleteProfessional)
  // app.register(ViewProfessional)
}; 