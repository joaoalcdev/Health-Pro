import {FastifyInstance} from 'fastify';
import { ListAgreements } from './listAgreements';

export const AgreementsRoutes =  async (app: FastifyInstance) => {
  app.register(ListAgreements);
}
