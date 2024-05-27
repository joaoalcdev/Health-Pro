import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdateUser = async (app: FastifyInstance) => {
  app.put("/users/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        id,
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