import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const IncludePatientToWaitlist = async (app: FastifyInstance) => {
  app.post("/waitlist/:id",
  async (req: FastifyRequest, res: FastifyReply) => {

    const { patients } = req.body as { patients: number[] }
    const { id } = req.params as { id: number }

    const arrayPatients = patients.map((item:any) => {
      return {
        patientId: item,
        specialtyId: Number(id),
        listType: 1
      }
    })
   
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .insert(arrayPatients)
        .select()
      
        if (error){
          throw error
        }
        if(data){
          return res.send({
            status: 200,
            data: data,
            message: "Patients included to waitlist successfully"
          })
        }
      
    } catch (error) {
      return res.send(
        {
          status: 400,
          message: error
        }
      )
    }
  })
}