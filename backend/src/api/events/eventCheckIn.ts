import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';
import Jimp from 'jimp';

import 'moment/locale/pt-br';

export const EventCheckIn = async (app: FastifyInstance) => {
  app.post("/checkIn/:id", async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };  
    let {
      checkInName,
      checkInSignature,
    } = req.body as {checkInName: string, checkInSignature: string};

    //Convert base64 to buffer
    const buffer = Buffer.from(checkInSignature, "base64");
    Jimp.read(buffer, (err, res) => {
      if (err) throw new Error(err.message);
      res.quality(5);
    });
    
    try {
      //Upload signature to storage
      const { data: fileData, error } = await supabase
      .storage
      .from('cedejom')
      .upload(`signatures/sign${id}.png`, buffer as Buffer , { 
        cacheControl: '3600', 
        upsert: false, 
        contentType: "image/png",
      });

      if (error) {
        return res.status(500).send({ error });
      }

      //Update event instance
      const { data, error: insertError } = await supabase
      .from('eventInstances')
      .update({
        checkInName,
        checkInSignature: fileData.path,
        checkInDate: moment().tz('America/Sao_Paulo').format(),
        eventStatus: 3,
      })
      .eq('id', id)
      .select()

      if (insertError) {
        return res.status(500).send({ error: insertError });
      }

      return res.status(200).send({data});
  
    } catch (error) {
      res.send({ error });
    }
  })

}

