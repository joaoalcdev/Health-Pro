import {FastifyInstance} from 'fastify';
import { AddCompany } from './addCompany';
import { getCompanies } from './getCompanies';
import { UpdateCompany } from './updateCompany';
import { AddExternalService } from './addExternalService';
import { getExternalServices } from './getExternalServices';
import { DeleteExternalService } from './deleteExternalService';

export const ExternalServicesRoutes =  async (app: FastifyInstance) => {
  app.register(AddCompany);
  app.register(UpdateCompany);
  app.register(getCompanies);
  app.register(AddExternalService);
  app.register(getExternalServices);
  app.register(DeleteExternalService);
}
