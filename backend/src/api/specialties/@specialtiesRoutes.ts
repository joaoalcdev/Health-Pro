import {FastifyInstance} from 'fastify';
import { ListSpecialties } from './listSpecialties';
import { AddSpecialty } from './addSpecialty';
import { UpdateSpecialty } from './updateSpecialty';
import { Waitlist } from './waitlist';
import { ListPatientsBySpecialty } from './listPatientsBySpecialty';
import { IncludePatientToWaitlist } from './includePatientToWaitlist';
import { UpdateWaitlist } from './updateWaitlist';

export const SpecialtiesRoutes =  async (app: FastifyInstance) => {
  app.register(ListSpecialties);
  app.register(AddSpecialty);
  app.register(UpdateSpecialty);
  app.register(Waitlist);
  app.register(ListPatientsBySpecialty);
  app.register(IncludePatientToWaitlist);
  app.register(UpdateWaitlist);
}
