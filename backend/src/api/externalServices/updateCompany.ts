import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdateCompany = async (app: FastifyInstance) => {
  app.put("/company/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        companyName,
        status,
      } = req.body as Company 

      const { id } = req.params as Company

      const { data, error } = await supabase
      .from("externalCompanies")
      .update({
        companyName,
        status,
      })
      .eq("id", id)
      .select()

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