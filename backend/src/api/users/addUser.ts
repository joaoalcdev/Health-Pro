import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddUser = async (app: FastifyInstance) => {
  app.post("/users", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        roleId,
        address,
        city,
        region,
        state,
        gender,
      } = req.body as Users

      const { data, error } = await supabase
      .auth
      .signUp({
        email,
        password
      })
      if (error) {
        throw error
      }
      if(data) {
        const { data: createdUser, error } = await supabase
        .from("users")
        .insert([{
          id: data.user?.id,
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          roleId,
          address,
          city,
          region,
          state,
          gender,
        }]).select()

        if (error) {
          throw error
        } else {
          return res.status(200).send(createdUser ? data : null)
        }
      }

      if (error) {
        throw error
      } else {
        return res.status(200).send(data ? data : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}