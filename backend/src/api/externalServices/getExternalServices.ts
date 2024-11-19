import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';


export const getExternalServices = async (app: FastifyInstance) => {
  app.get("/external-services/:monthRange", async (req: FastifyRequest, res: FastifyReply) => {
    try {

      var {monthRange } = req.params as {monthRange: string};

      monthRange = moment(monthRange,"dd-MM-YYYY").format()


      const { data, error } = await supabase
      .from("externalServices")
      .select()
      .is("deletedAt", null)
      .gte("date", monthRange)
      .lte("date", moment(monthRange).add(1, "month").format())
      .order("date", {ascending: true})

      const {data: companies, error: companiesError } = await supabase
      .from("externalCompanies")
      .select()

      if (companiesError) {
        throw companiesError
      }

      if (error) {
        throw error
      } 

      if(data && companies) {
        var totalValue = 0;
        const rebaseData = data.map((externalService: any) => {
          totalValue += externalService.value
          const company = companies.find((company: any) => company.id === externalService.companyId),
          companyName = company ? company.name : "Unknown"
          return {
            ...externalService,
            companyName
          }
        })

        return res.send({
          status: 200,
          data: {
            externalServices: rebaseData,
            totalValue
          },
          message: "External services fetched successfully"
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