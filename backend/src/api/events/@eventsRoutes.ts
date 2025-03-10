import {FastifyInstance} from 'fastify';
import { AddEvents } from './addEvents';
import { ListEvents } from './listEvents';
import { GetEventsFiltering } from './getEventsFiltering';
import { GetEventById } from './getEventById';
import { UpdateEvents } from './updateEvents';
import { EventCheckIn } from './eventCheckIn';
import { CancelEvents } from './cancelEvents';
import { RescheduleEvents } from './rescheduleEvents';
import { DischargeEvents } from './dischargeEvents';
import { RescheduleSingleEvent } from './rescheduleSingleEvent';

export const EventsRoutes =  async (app: FastifyInstance) => {
 app.register(AddEvents);
 app.register(ListEvents);
 app.register(GetEventsFiltering);
 app.register(GetEventById);
 app.register(UpdateEvents);
 app.register(EventCheckIn);
 app.register(CancelEvents);
 app.register(RescheduleEvents);
 app.register(DischargeEvents);
  app.register(RescheduleSingleEvent);
}