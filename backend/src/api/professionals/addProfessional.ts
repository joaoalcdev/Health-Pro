import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const AddProfessional = async (app: FastifyInstance) => {
  app.post("/professionals", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
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
            const { data: agreements,  error: aError } = await supabase
            .from("agreements")
            .select()

            if (aError) {
              throw aError
            } 

            if (agreements) {
              let professionalPayments: ProfessionalPayment[] = [];
              agreements.forEach((agreement) => {
                professionalPayments.push({
                  professionalId: createdProfessional[0].id,
                  agreementId: agreement.id,
                  professionalPayment: agreement.professionalPaymentDefault,
                })
              })

              const { data: createdProfessionalPayments, error: ppError } = await supabase
              .from("professionalPayments")
              .insert(professionalPayments)
              .select()

              if (ppError) {
                throw ppError
              } else {
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
        }
      }
    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })
  

}