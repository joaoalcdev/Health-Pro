import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const getCompanies = async (app: FastifyInstance) => {
  app.get("/company", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {

      const { data, error } = await supabase
      .from("externalCompanies")
      .select()
      .is("status", true)
      .order("id", {ascending: true})

      if (error) {
        throw error
      } 
      if(data) {
        return res.send({
          status: 200,
          data: data,
          messsage: "Companies fetched successfully"
        })
      }      
    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })
}