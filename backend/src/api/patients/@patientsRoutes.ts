import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ListPatients } from './listPatients';
import { AddPatient } from './addPatient';
import { UpdatePatient } from './updatePatient';
import { getPatient } from './getPatient';
import { DeletePatient } from './deletePatient';
import { RecoveryPatient } from './recoveryPatient';
import { getPatientRecords } from './patientRecords';
import { getPatientRecordsExport } from './patientRecordsExport';

export const PatientsRoutes = async (app: FastifyInstance) => {
  app.register(ListPatients)
  app.register(AddPatient)
  app.register(UpdatePatient)
  app.register(getPatient)
  app.register(DeletePatient)
  app.register(RecoveryPatient)
  app.register(getPatientRecords),
  app.register(getPatientRecordsExport)
}; 