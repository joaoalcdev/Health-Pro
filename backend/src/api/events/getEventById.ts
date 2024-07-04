import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

export const GetEventById = async (app: FastifyInstance) => {
  app.get("/events/:id", async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string }

    try {
      let { data, error } = await supabase
        .from("view_events")
        .select("*")
        .eq("eventInstanceId", id)
      

      
      if (error) {
        throw error
      } else {
          return res.status(200).send(data ? data : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}


