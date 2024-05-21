import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import app from '../../server';
import { ListPatients } from './listPatients';
import { AddPatient } from './addPatient';


export const PatientsRoutes =  async (app: FastifyInstance) => {
  app.register(ListPatients)
  app.register(AddPatient)
}; 