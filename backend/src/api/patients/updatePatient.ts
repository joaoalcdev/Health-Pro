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

      // RG is unique
      const { data: rgData, error: rgError } = await supabase
        .from("patients")
        .select("rg")
        .eq("rg", rg)
        .neq("id", id)
        // if RG is empty, create a patient without RG
        .neq("rg", "")
      if (rgError) {
        throw rgError
      } else if (rgData && rgData.length > 0) {
        return res.status(400).send({ message: "RG já cadastrado", code: "RG001" })
      }

      // CPF is unique
      const { data: cpfData, error: cpfError } = await supabase
        .from("patients")
        .select("cpf")
        .eq("cpf", cpf)
        .neq("id", id)
        // if CPF is empty, create a patient without CPF
        .neq("cpf", "")
      if (cpfError) {
        throw cpfError
      } else if (cpfData && cpfData.length > 0) {
        return res.status(400).send({ message: "CPF já cadastrado", code: "CPF001" })
      }

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