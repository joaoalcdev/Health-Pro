import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";


export const AddFile = async (app: FastifyInstance) => {
  app.post("http://localhost:3333/imageuploader", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    const { file } = req.body as { file: any };
    const { data, error } = await supabase.storage
      .from("test")
      .upload(`${file.filename}`, file.file);

    if (error) {
      return res.status(500).send({ error });
    }

    return res.status(200).send({ data });
  })
};