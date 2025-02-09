import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {  updateSingleEventInstance } from './eventsController';
import moment from 'moment-timezone';
import auth from "../../middlewares/auth";
import 'moment/locale/pt-br';

export const RescheduleSingleEvent = async (app: FastifyInstance) => {
  app.put("/eventInstance/reschedule/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: number}
      var {
        startTime,
        serviceId
      } = req.body as ScheduleEvent 

      const {data , error } = await updateSingleEventInstance(id, moment.tz(startTime, "America/Fortaleza"),serviceId)

      if (error) {
        throw error
      } 

      if (data) {
        res.send({
          status: 200,
          data,
          message: "Event rescheduled successfully"
        })
      }

         
    }
    catch(error){
      res.send({
        status: 400,
        message: error,
      })
    }
  })
}