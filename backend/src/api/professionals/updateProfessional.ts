import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdateProfessional = async (app: FastifyInstance) => {
  app.put("/professional/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        region,
        state
      } = req.body as Users
       
      const {
        fullName,
        rg,
        rgInssuance,
        cpf,
        gender,
        specialty,
        council,
        councilNumber,
        councilInssuance
      } = req.body as Professionals

      const { id } = req.params as { id: string }


      const { data: User, error } = await supabase
      .from("users")
      .update({
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        region,
        state
      }).eq("id", id).select()

        if (error) {
          throw error
        } else {
          const { data: professional, error: pError } = await supabase
          .from("professionals")
          .update({
            fullName,
            rg,
            rgInssuance,
            cpf,
            gender,
            specialty,
            council,
            councilNumber,
            councilInssuance,
          }).eq("id", id).select()
        
          if (pError) {
            throw pError
          }
          else {
            return res.status(200).send(professional ? professional : null)
          }
        }
      } catch (error) {
        return res.status(400).send(error)
      }
  })
}