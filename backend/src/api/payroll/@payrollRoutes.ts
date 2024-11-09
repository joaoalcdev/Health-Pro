import {FastifyInstance} from 'fastify';
import { getPayroll } from './getPayroll';
import { EditPayroll } from './editPayroll';
import { exportPayroll } from './exportPayroll';


export const PayrollRoutes =  async (app: FastifyInstance) => {
 app.register(getPayroll);
 app.register(EditPayroll);
  app.register(exportPayroll);
}