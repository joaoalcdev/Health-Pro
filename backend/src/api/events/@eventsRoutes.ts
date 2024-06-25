import {FastifyInstance} from 'fastify';
import { AddEvents } from './addEvents';
import { ListEvents } from './listEvents';
import { GetEventsFiltering } from './getEventsFiltering';



export const EventsRoutes =  async (app: FastifyInstance) => {
 app.register(AddEvents);
 app.register(ListEvents);
 app.register(GetEventsFiltering);
}; 