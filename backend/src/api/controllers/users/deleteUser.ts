import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase, supabaseAdmin } from "../../../supabaseConnection";

interface RequestParams {
  id: string;
}

export const DeleteUser = async (app: FastifyInstance) => {
  app.delete("/user/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const userId = (req.params as RequestParams).id;

      const { data, error } = await supabaseAdmin
        .auth
        .admin
        .deleteUser(userId)

      if (error) {
        throw error
      }

      const { error: deleteUserError } = await supabase.from('users')
      .delete()
      .eq('id', userId)
      
      if (deleteUserError) {
        throw error
      } else {
        return res.status(200).send(data ? data : null)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}