import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../../supabaseConnection";

export const AddProfessional = async (app: FastifyInstance) => {
  app.post("/professionals", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        roleId,
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

      const { data, error } = await supabase
      .auth
      .signUp({
        email,
        password
      })

      if(data) {
        const { data: createdUser, error } = await supabase
        .from("users")
        .insert([{
          id: data.user?.id,
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          roleId,
          address,
          city,
          region,
          state
        }]).select()

        if (error) {
          throw error
        } else {
            const { data: createdProfessional, error: pError  } = await supabase.from("professionals").insert([{
              id: data.user?.id,
              fullName,
              rg,
              rgInssuance,
              cpf,
              gender,
              specialty,
              council,
              councilNumber,
              councilInssuance,
            }]).select()
        
          if (pError) {
            throw pError
          }
          else {
            return res.status(200).send(createdUser ? createdUser[0] : null)
          }
        }
      }

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