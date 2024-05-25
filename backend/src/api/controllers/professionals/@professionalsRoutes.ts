import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { ListProfessionals } from './listProfessionals';
import { AddProfessional } from './addProfessional';
import { getProfessional } from './getProfessional';


export const ProfessionalsRoutes =  async (app: FastifyInstance) => {
  app.register(ListProfessionals)
  app.register(AddProfessional)
  app.register(getProfessional)
  // app.register(UpdateProfessional)
  // app.register(DeleteProfessional)
  // app.register(ViewProfessional)
}; 