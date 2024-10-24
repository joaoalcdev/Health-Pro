import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListSpecialties = async (app: FastifyInstance) => {
  app.get("/specialties",
  async (req: FastifyRequest, res: FastifyReply) => {
   
    var {status} = req.query as {status: string};
    status = status ==='true' ? status : 'false';
    
    try {
      if (status === 'true') {
        let { data, error } = await supabase
          .from("specialties")
          .select("*")
          .is("deletedAt", null)
          .order("name")
        
        if (error) {
          throw error
        }
        return res.status(200).send(data ? data : null)
      } else 
      {
        let { data, error } = await supabase
          .from("specialties")
          .select("*")
          .order("name")

        let { data: services, error: errorServices } = await supabase
          .from("services")
          .select("*")
          .is("deletedAt", null)
          .order("id")

        let {data: servicePrices, error: errorServicePrices} = await supabase
          .from("view_service_prices")
          .select("*")
          .order("agreementId")

        let { data: regularPrices, error: errorRegularPrices } = await supabase
          .from("view_regular_prices")
          .select("*")
          .order("agreementId")

          if(data && services && regularPrices && servicePrices) {
            const serviceData = [...services]
            serviceData.forEach((service) => {
              service.prices = servicePrices.filter((servicePrice) => servicePrice.serviceId === service.id)
            })
            const responseData =[...data]
            responseData.forEach((specialty) => {
              specialty.services = serviceData.filter((service) => service.specialtyId === specialty.id)
              specialty.regularPrices = regularPrices.filter((regularPrice) => regularPrice.specialtyId === specialty.id)
            })
            data = responseData
          }
        
        if (error) {
          throw error
        }
        return res.status(200).send(data ? data : null)
    }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}