import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

import 'moment/locale/pt-br';
import { MessagePort } from 'worker_threads';

export const EditPayroll = async (app: FastifyInstance) => {
  app.put("/editPayroll/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try{
      const {id} = req.params as {id: string}
      const {
        grossValue,
        professionalRate,
        tax,
        profit,
      } = req.body as EventInstance;

      const {data, error} = await supabase
        .from('eventInstances')
        .update({
          grossValue,
          professionalRate,
          tax,
          profit,
        })
        .eq('id', id)
        .select()
        
      
      if(error){
        throw error
      }else{
        if(data){
          res.status(200).send({
            code: 200,
            data,
            message: 'Evento editado com sucesso'
          })
        }else{
          res.status(404).send({
            code: 400,
            message: 'Não foi possível editar o evento'
          })
        }
      }
    }
    catch(error){
      res.status(500).send(error)
    }
  })
}