import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { ListProfessionals } from './listProfessionals';
import { AddProfessional } from './addProfessional';
import { getProfessional } from './getProfessional';
import { UpdateProfessional } from './updateProfessional';
import { DeleteProfessional } from './deleteProfessional';
import {getProfessionalRecords} from './professionalRecords';
import { getProfessionalRecordsExport } from './professionalRecordsExport';
import { AddPaymentException } from './addPaymentException';


export const ProfessionalsRoutes =  async (app: FastifyInstance) => {
  app.register(ListProfessionals);
  app.register(AddProfessional);
  app.register(getProfessional);
  app.register(UpdateProfessional);
  app.register(DeleteProfessional);
  app.register(getProfessionalRecords);
  app.register(getProfessionalRecordsExport);
  app.register(AddPaymentException);
}; 