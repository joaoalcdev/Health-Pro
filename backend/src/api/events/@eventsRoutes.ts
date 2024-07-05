import {FastifyInstance} from 'fastify';
import { AddEvents } from './addEvents';
import { ListEvents } from './listEvents';
import { GetEventsFiltering } from './getEventsFiltering';
import { GetEventById } from './getEventById';
import { UpdateEvents } from './updateEvents';


export const EventsRoutes =  async (app: FastifyInstance) => {
 app.register(AddEvents);
 app.register(ListEvents);
 app.register(GetEventsFiltering);
 app.register(GetEventById);
 app.register(UpdateEvents);

}