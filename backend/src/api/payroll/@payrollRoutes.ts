import {FastifyInstance} from 'fastify';
import { getPayroll } from './getPayroll';

export const PayrollRoutes =  async (app: FastifyInstance) => {
 app.register(getPayroll);
}