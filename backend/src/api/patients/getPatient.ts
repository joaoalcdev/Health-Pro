import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";

export const getPatient = async (app: FastifyInstance) => {
  app.get("/patient/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var arrayHistory = []
      const { id } = req.params as { id: string }
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)

      const { data: patientHistory, error: errorPatientHistory } = await supabase
        .from('view_events')
        .select('*')
        .eq('patientId', id)
        .eq('eventStatus', 3)
        .order('startTime', { ascending: false })

      if (error || errorPatientHistory) {
        throw error
      }
      if (data) {
        if (patientHistory && patientHistory.length > 10) {
          for (let i = 0; i < 10; i++) {
            arrayHistory.push(patientHistory[i])
          }
        } else {
          arrayHistory = patientHistory
        }
        data[0].history = arrayHistory
        return res.send({
          status: 200,
          message: 'Patient found',
          data: data[0]
        })
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}