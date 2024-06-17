import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";

export const UpdatePatient = async (app: FastifyInstance) => {
  app.put("/patients/:id", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {
        fullName,
        cpf,
        rg,
        bloodType,
        marital,
        gender,
        dateBirth,
        address,
        region,
        city,
        state,
        insurance,
        cardNumber,
        phoneNumber,
        emergencyContact,
        paternalFiliation,
        maternalFiliation,
        paternalFiliationContact,
        maternalFiliationContact
      } = req.body as Patients

      const { id } = req.params as { id: string }

      const { data, error } = await supabase
        .from("patients")
        .update({
          fullName,
          cpf,
          rg,
          bloodType,
          marital,
          gender,
          dateBirth,
          address,
          region,
          city,
          state,
          insurance,
          cardNumber,
          phoneNumber,
          emergencyContact,
          paternalFiliation,
          maternalFiliation,
          paternalFiliationContact,
          maternalFiliationContact
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