import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";

export const ListPatientsBySpecialty = async (app: FastifyInstance) => {
  app.get("/specialty/:id/patients",
  async (req: FastifyRequest, res: FastifyReply) => {

    const { id } = req.params as { id: string }
   
    try {
      const { data: patients, error: patientsError } = await supabase
        .from("patients")
        .select("*")
        .is("deletedAt", null)
        .order("fullName", { ascending: true });

      const { data: waitlist, error: waitlistError } = await supabase
        .from("waitlist")
        .select("*")
        .is("deletedAt", null)
        .eq("specialtyId", id)
      
        if (patientsError){
          throw patientsError
        }

        if (waitlistError){
          throw waitlistError
        }

        if(patients && waitlist){
          let rebaseData = [] as any;
          patients.forEach((item) => {
            //remove patients whom are already in the waitlist
            const patientInWaitlist = waitlist.find((waitlistItem) => waitlistItem.patientId === item.id)
            if(!patientInWaitlist){
              rebaseData.push(item)
            }
          })

          return res.send({
            status: 200,
            data: rebaseData,
            message: "Patients fetched successfully"
          })
        }
      
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}