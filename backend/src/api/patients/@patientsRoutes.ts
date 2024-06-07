import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import app from '../../server';
import { ListPatients } from './listPatients';
import { AddPatient } from './addPatient';
import { UpdatePatient } from './updatePatient';
import { getPatient } from './getPatient';
import { DeletePatient } from './deletePatient';
import { RecoveryPatient } from './recoveryPatient';

export const PatientsRoutes = async (app: FastifyInstance) => {
  app.register(ListPatients)
  app.register(AddPatient)
  app.register(UpdatePatient)
  app.register(getPatient)
  app.register(DeletePatient)
  app.register(RecoveryPatient)
}; 