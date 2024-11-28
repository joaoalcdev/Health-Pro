import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const ListServices = async (app: FastifyInstance) => {
  app.get("/services",
  {preHandler: auth}, 
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

        return res.send({
          status: 200,
          data: result,
          message: "Services listed successfully"
        })

    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })
}