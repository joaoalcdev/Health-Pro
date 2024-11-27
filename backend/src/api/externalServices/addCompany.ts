import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const AddCompany = async (app: FastifyInstance) => {
  app.post("/company", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        name,
        status,
      } = req.body as Company 

      const { data, error } = await supabase
      .from("externalCompanies")
      .insert([{
        name,
        status,
      }]).select()

      if (error) {
        throw error
      } 
      if(data) {
        return res.send({
          status: 200,
          data: data,
          messsage: "Company added successfully"
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