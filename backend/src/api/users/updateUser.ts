import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const UpdateUser = async (app: FastifyInstance) => {
  app.put("/users/:id", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {


    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        roleId,
        address,
        region,
        city,
        state
      } = req.body as Users

      const { id } = req.params as { id: string }

      const { data: User, error } = await supabase
      .from("users")
      .update({
        firstName,
        lastName,
        phoneNumber,
        email,
        roleId,
        address,
        city,
        region,
        state
      }).eq("id", id).select()

      if (error) {
        throw error
      }
      else return res.status(200).send(User ? User : null)
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}