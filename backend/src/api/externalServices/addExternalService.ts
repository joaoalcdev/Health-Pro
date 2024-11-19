import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddExternalService = async (app: FastifyInstance) => {
  app.post("/external-service", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        companyId,
        professionalName,
        date,
        service,
        value
      } = req.body as ExternalService 

      const { data, error } = await supabase
      .from("externalServices")
      .insert([{
        companyId,
        professionalName,
        date,
        service,
        value
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