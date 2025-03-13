import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const AddProfessional = async (app: FastifyInstance) => {
  app.post("/professionals", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      address,
      city,
      region,
      state,
      gender,
    } = req.body as Users

    const roleId = 3;
    
    const {
      fullName,
      rg,
      rgInssuance,
      cpf,
      specialty,
      council,
      councilNumber,
      } = req.body as Professionals
      
      
      const checkIsDuplicated =  (email: string, cpf: string) => {
        return supabase
        .from("view_professionals")
        .select("*")
        .or(`email.eq.${email},cpf.eq.${cpf}`)
        .then((response) => {
          if (response.data && response.data[0]) {
            return true
          }
          return false
        })
      }
      const isDuplicated = await checkIsDuplicated(email, cpf)
      if (isDuplicated) {
        return res.send({
          status: 400,
          message: "Já existe um profissional com esse e-mail ou cpf."
        })
      }
      
      try {
        await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        

        const { data, error } = await supabase
        .auth
        .signUp({
          email,
          password
        })
        if (error) {
          throw error
        }

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
            state,
            gender,
          }]).select()

          if (error) {
            throw error
          } else {
            const { data: createdProfessional, error: pError  } = await supabase.from("professionals").insert([{
              userId: data.user?.id,
              fullName,
              rg,
              rgInssuance,
              cpf,
              specialty,
              council,
              councilNumber,
            }]).select()
        
            if (pError) {
              throw pError
            }
            else {

              return res.send(
                {
                  status: 200,
                  data: createdUser,
                  message: "Professional created successfully"
                }
              )
            }
          }
        }
      } catch (error) {
        return res.send({
          status: 400,
          message: 'erro',
          error: error
        })
      }
  })
}