import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment';
import auth from "../../middlewares/auth";

export const getProfessionalRecords = async (app: FastifyInstance) => {
  app.get("/professional/:id/records/:monthRange",
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var { id, monthRange } = req.params as { id: string, monthRange: string }
      monthRange = moment(monthRange,"dd-MM-YYYY").format()

      const { data, error } = await supabase
        .from('view_events')
        .select('*')
        .eq('professionalId', id)
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
          message: 'Professional records found',
          data: rebaseData
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