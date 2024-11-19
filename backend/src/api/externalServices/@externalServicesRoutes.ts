import {FastifyInstance} from 'fastify';
import { AddCompany } from './addCompany';
import { getCompanies } from './getCompanies';
import { UpdateCompany } from './updateCompany';

export const ExternalServicesRoutes =  async (app: FastifyInstance) => {
  app.register(AddCompany);
  app.register(UpdateCompany);
  app.register(getCompanies);
}
