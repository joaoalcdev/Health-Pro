import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListProfessionals = async (app: FastifyInstance) => {
  app.get("/professionals/:deleted",
  async (req: FastifyRequest, res: FastifyReply) => {
   
    let { deleted } = req.params as { deleted: string }
    try {
      if (deleted==="true") {
        let { data, error } = await supabase
        .from("view_professionals")
        .select("*")
        .not("deletedAt", "is", null)
        .order("firstName", { ascending: true })
        if (error) {
          throw error
        } else {
          //test NoData
          //return res.status(200).send([])
          return res.send({
            status: 200,
            data: data,
            message: "Professionals listed successfully"
          })  
        }
      }else{
        let { data, error } = await supabase
        .from("view_professionals")
        .select("*")
        .is("deletedAt",  null)
        .order("firstName", { ascending: true })
        
        if (error) {
          throw error
        } else {

          //test NoData
          //return res.status(200).send([])
          let {data: specialties, error: specialtiesError} = await supabase
          .from("specialties")
          .select("*")
          
          if (data && specialties){
            
            data = data.map((item: any) => {
            return {
              ...item,
              summary: `${item.firstName} ${item.lastName} (${specialties.find((specialty) => specialty.id === item.specialty).name})`
              }
              
            })

            return res.send({
              status: 200,
              data: data,
              message: "Professionals listed successfully"
            })
          }

          
        }
      }
    } catch (error) {
      return res.send({
        status: 400,
        message: error
      })
    }
  })
}