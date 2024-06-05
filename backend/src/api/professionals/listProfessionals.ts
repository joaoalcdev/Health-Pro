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
          return res.status(200).send(data ? data : null)
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
          return res.status(200).send(data ? data : null)
        }
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}