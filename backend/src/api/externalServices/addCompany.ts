import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddCompany = async (app: FastifyInstance) => {
  app.post("/company", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        companyName,
        status,
      } = req.body as Company 

      const { data, error } = await supabase
      .from("externalCompanies")
      .insert([{
        companyName,
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