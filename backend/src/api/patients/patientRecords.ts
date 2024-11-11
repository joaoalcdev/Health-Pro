import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment';

export const getPatientRecords = async (app: FastifyInstance) => {
  app.get("/patient/:id/records/:monthRange", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var { id, monthRange } = req.params as { id: string, monthRange: string }
      monthRange = moment(monthRange,"dd-MM-YYYY").format()

      const { data, error } = await supabase
        .from('view_events')
        .select('*')
        .eq('patientId', id)
        .eq('eventStatus', 3)
        .gte('startTime', monthRange)
        .lte('startTime', moment(monthRange).endOf('month').format())
        .order('startTime', { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        const url = 'https://mquovyisjfoocfacuxum.supabase.co/storage/v1/object/public/cedejom/';      
        const rebaseData = data.map((record: any) => {
          return {
            ...record,
            checkInSignature: `${url}${record.checkInSignature}`	
          }
        })

        return res.send({
          status: 200,
          message: 'Patient records found',
          data: rebaseData
        })
      }
      
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}