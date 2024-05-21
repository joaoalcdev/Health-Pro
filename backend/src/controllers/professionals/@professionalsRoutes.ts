import {app} from '../../server';
import { ListProfessionals } from './listProfessionals';
import { AddProfessional } from './addProfessional';


export const ProfessionalsRoutes =  async () => {
  app.register(ListProfessionals)
  app.register(AddProfessional)
  // app.register(UpdateProfessional)
  // app.register(DeleteProfessional)
  // app.register(ViewProfessional)
}; 