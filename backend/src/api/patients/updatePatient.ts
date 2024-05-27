import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdatePatient = async (app: FastifyInstance) => {
  app.put("/patients/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        fullName,
        cpf,
        // age,
        bloodType,
        marital,
        gender,
        dateBirth,
        address,
        region,
        city,
        state,
        phoneNumber,
        emergencyContact
      } = req.body as Patients

      const { id } = req.params as { id: string }

      const { data, error } = await supabase
        .from("patients")
        .update({
          fullName,
          cpf,
          // age,
          bloodType,
          marital,
          gender,
          dateBirth,
          address,
          region,
          city,
          state,
          phoneNumber,
          emergencyContact
        }).eq("id", id).select()

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