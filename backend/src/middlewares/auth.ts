import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../supabaseConnection";

async function auth (req: FastifyRequest, res: FastifyReply){
  //get acces_token from headers Barer token
    let token = req.headers.authorization as string
    const {data, error} = await supabase.auth.getUser(token)

    if(!token || !data || error || data.user.role !== "authenticated") {
      return res.status(401).send({error: "Unauthorized"}) 
    }
}

export default auth