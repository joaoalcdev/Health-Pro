import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListServices = async (app: FastifyInstance) => {
  app.get("/services",
  async (req: FastifyRequest, res: FastifyReply) => {

    var {specialtyId} = req.query as {specialtyId: string};
    var {status} = req.query as {status: string};
    status = status ==='true' ? status : 'false';

   
    try {

        let { data, error } = await supabase
          .from("view_services")
          .select("*")
          .order("specialtyId")

        if (error) {
          throw error
        } 

        let result = data

        //Filters
        if (status === 'true') {
          result = result ? result?.filter((item: any) => item.deletedAt === null) : null 
        }

        if (specialtyId) {
          result = result ? result?.filter((item: any) => item.specialtyId == specialtyId) : null
      }

        return res.status(200).send(result ? result : null)

    } catch (error) {
      return res.status(400).send(error)
    }
  })
}