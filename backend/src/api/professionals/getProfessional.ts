import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const getProfessional = async (app: FastifyInstance) => {
  app.get("/professional/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var arrayHistory = []
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
      
      if (error ) {
        throw error
      } 
      if (errorProfessionalHistory) {
        throw errorProfessionalHistory
      }
      if (data) {
        if (professionalHistory && professionalHistory.length > 10) {
          for (let i = 0; i < 10; i++) {
            arrayHistory.push(professionalHistory[i])
          }
        } else {
          arrayHistory = professionalHistory
        }
        data[0].history = arrayHistory
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