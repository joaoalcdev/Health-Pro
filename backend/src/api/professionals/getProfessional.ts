import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const getProfessional = async (app: FastifyInstance) => {
  app.get("/professional/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var arrayHistory = []
      var professionalPayments: { agreementId: number, agreementName: string | undefined, professionalPayment: number }[] = []
      const { id } = req.params as { id: string }
      const { data, error } = await supabase
        .from("view_professionals")
        .select("*")
        .eq("id", id)

      const { data: professionalHistory, error: errorProfessionalHistory } = await supabase
        .from('view_events')
        .select('*')
        .eq('professionalId', id)
        .eq('eventStatus', 3)
        .order('startTime', { ascending: false })
      
      const { data: professionalPaymentsData, error: errorProfessionalPayments } = await supabase
        .from('professionalPaymentExceptions')
        .select('agreementId, professionalPayment')
        .eq('professionalId', id)
        .order('agreementId', { ascending: true })

      const {data: agreements, error: errorAgreements} = await supabase
        .from('agreements')
        .select('id, name')
       
      
      if (error ) {
        throw error
      } 
      if (errorProfessionalHistory) {
        throw errorProfessionalHistory
      }
      if (errorProfessionalPayments) {
        throw errorProfessionalPayments
      }
      if (errorAgreements) {
        throw errorAgreements
      }

      if (data) {
        if (professionalHistory && professionalHistory.length > 10) {
          for (let i = 0; i < 10; i++) {
            arrayHistory.push(professionalHistory[i])
          }
        } else {
          arrayHistory = professionalHistory
        }
        professionalPaymentsData.forEach((payment) => {
          professionalPayments.push({
            agreementId: payment.agreementId,
            agreementName: agreements.find((agreement) => agreement.id === payment.agreementId)?.name,
            professionalPayment: payment.professionalPayment
          })
        })

        data[0].history = arrayHistory
        data[0].professionalPayments = professionalPayments
        return res.send({
          status: 200,
          message: 'Professional history found',
          data: data[0]
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