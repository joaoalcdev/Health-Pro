import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const ListUsers = async (app: FastifyInstance) => {
  app.get("/users/:deleted",
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    
    let { deleted } = req.params as { deleted: string }
    
    try {
      if(deleted==="true") {
        let { data, error } = await supabase
        .from("users")
        .select("*")
        .not("deletedAt","is", null)
        .filter("roleId","in", "(1,2)")
        .order("firstName", { ascending: true })
        if (error) {
          throw error
        } else {
          return res.status(200).send(data ? data : null)
        }
      } else {

      let { data, error } = await supabase
        .from("users")
        .select("*")
        .filter("deletedAt","is", null)
        .filter("roleId","in", "(1,2)")
        .order("firstName", { ascending: true })
      
      if (error) {
        throw error
      } else {
        return res.status(200).send(data ? data : null)
      }
    }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}