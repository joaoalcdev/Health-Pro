import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const Waitlist = async (app: FastifyInstance) => {
  app.get("/waitlist/:id",
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {

    const { id } = req.params as { id: string }
   
    try {
      if(id === '0'){  
        const { data: specialties, error: specialtiesError } = await supabase
          .from("specialties")
          .select("*")
          .order("id", { ascending: true });

        const { data: waitlist, error: waitlistError } = await supabase
          .from("view_waitlist")
          .select("*")
          .is("deletedAt", null)
          .order("createdAt", { ascending: true })
        
          if (specialtiesError){
            throw specialtiesError
          }
          if(waitlistError){
            throw waitlistError
          }

          if(specialties && waitlist){
            const rebaseData = specialties.map((item) => {
              return {
                id: item.id,
                name: item.name,
              }
            })

            return res.send({
              status: 200,
              data: rebaseData,
              message: "Waitlist fetched successfully"
            })
          }
      }else{
      const { data: waitlist, error: waitlistError } = await supabase
        .from("view_waitlist")
        .select("*")
        .is("deletedAt", null)
        .eq("specialtyId", id)
        .order("createdAt", { ascending: true })
        
        if(waitlistError){
          throw waitlistError
        }

        if( waitlist){
          return res.send({
            status: 200,
            data: waitlist,
            message: "Waitlist fetched successfully"
          })
        }

      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}