import {app} from '../../server';
import { ListPatients } from './listPatients';
import { AddPatient } from './addPatient';


export const PatientsRoutes =  async () => {
  app.register(ListPatients)
  app.register(AddPatient)
}; 