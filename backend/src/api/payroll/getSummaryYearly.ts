import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';
import auth from "../../middlewares/auth";

export const getSummaryYearly = async (app: FastifyInstance) => {
  app.get("/summary/:monthRange", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {

    var {monthRange } = req.params as {monthRange: string};

    monthRange = moment(monthRange,"dd-MM-YYYY").format()

    const startDate = moment(monthRange).startOf('year').format()
    const endDate = moment(monthRange).endOf('year').format()

    try {
      const { data, error } = await supabase
      .from('view_events')
      .select()
      .eq('eventStatus', 3)
      .gte('startTime', startDate)
      .lte('endTime', endDate)
      .order('startTime', {ascending: true})

      if(error){
        throw error
      }
      var totalAmountDue = 0 as number; // Valor total a ser pago a todos os Profissionais
      var totalGrossValue = 0 as number; // Valor da receita bruta total do mês
      var totalTax = 0 as number; // Valor total de impostos
      var totalProfit = 0 as number; // Valor total de lucro

      if(data){
        data.forEach((event: any) => {
          totalAmountDue += event.professionalRate;
          totalGrossValue += event.grossValue;
          totalTax += event.tax;
          totalProfit += event.profit;
        });

      }
      return res.send({
        status: 200,
        data: {
          totalAmountDue: Number(totalAmountDue.toFixed(2)),
          totalGrossValue: Number(totalGrossValue.toFixed(2)),
          totalTax: Number(totalTax.toFixed(2)),
          totalProfit: Number(totalProfit.toFixed(2)),
        },
        message: 'Yearly summary retrieved successfully'
      })
      
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}


