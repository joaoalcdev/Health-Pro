import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListSpecialties = async (app: FastifyInstance) => {
  app.get("/specialties",
  async (req: FastifyRequest, res: FastifyReply) => {
   
    var {status} = req.query as {status: string};
    status = status ==='true' ? status : 'false';
    
    try {
      if (status === 'true') {
        let { data, error } = await supabase
          .from("specialties")
          .select("*")
          .is("deletedAt", null)
          .order("name")
        
        if (error) {
          throw error
        }
        return res.status(200).send(data ? data : null)
      } else 
      {
        let { data, error } = await supabase
          .from("specialties")
          .select("*")
          .order("name")
        
        if (error) {
          throw error
        }
        return res.status(200).send(data ? data : null)
    }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}