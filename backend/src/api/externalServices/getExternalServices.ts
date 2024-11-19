import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const getExternalServices = async (app: FastifyInstance) => {
  app.get("/external-services", async (req: FastifyRequest, res: FastifyReply) => {
    try {

      const { data, error } = await supabase
      .from("externalServices")
      .select()
      .is("deletedAt", null)
      .order("date", {ascending: false})

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
        return res.send({
          status: 200,
          data: data.map((externalService: any) => {
            const company = companies.find((company: any) => company.id === externalService.companyId),
            companyName = company ? company.name : "Unknown"
            return {
              ...externalService,
              companyName
            }
          }, []),
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