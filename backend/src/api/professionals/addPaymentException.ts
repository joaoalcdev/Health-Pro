import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const AddPaymentException = async (app: FastifyInstance) => {
  app.post("/professional/:id/exception", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        agreementId,
        professionalPayment,
      } = req.body as ProfessionalPayment

      const { id } = req.params as { id: string };

      //validate request body isn't null
      if (!agreementId || !professionalPayment) {
        return res.send({
          status: 400,
          message: 'agreementId and professionalPayment are required'
        })
      }

      //check if there's already a payment exception for this professional
      const { data: professionalPaymentException, error: professionalPaymentExceptionError } = await supabase
      .from('professionalPaymentExceptions')
      .select()
      .eq('professionalId', id)
      .eq('agreementId', agreementId)

      if(professionalPaymentExceptionError){
        throw professionalPaymentExceptionError;
      }

      if(professionalPaymentException.length > 0){
        //update row instead of insert
        const { data, error } = await supabase
        .from('professionalPaymentExceptions')
        .update({
          professionalPayment: Number(professionalPayment)
        })
        .eq('id', professionalPaymentException[0].id)
        .select() 

        if(error){
          throw error;
        }
        return res.send({
          status: 200,
          data,
          message: 'Payment exception updated successfully'
        })
      }

      console.log({
        agreementId,
        professionalPayment: Number(professionalPayment),
        professionalId: id
      })

      const { data, error } = await supabase
      .from("professionalPaymentExceptions")
      .insert([{
        agreementId,
        professionalPayment: Number(professionalPayment),
        professionalId: id
      }])
      .select()

      if(error){
        throw error;
      }
      return res.send({
        status: 200,
        data,
        message: 'Payment exception added successfully'
      })
      
    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })
}