import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase} from "../../../supabaseConnection";

export const AddPatient = async (app: FastifyInstance) => {
  app.post("/patients", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        fullName,
        cpf,
        age,
        bloodType,
        marital,
        gender,
        address,
        region,
        city,
        state,
        phoneNumber,
        emergencyContact
      } = req.body as Patients

      const { data , error } = await supabase
      .from("patients")
      .insert([{
        fullName,
        cpf,
        age,
        bloodType,
        marital,
        gender,
        address,
        region,
        city,
        state,
        phoneNumber,
        emergencyContact
      }]).select()
      
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