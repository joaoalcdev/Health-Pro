import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";

export const AddPatient = async (app: FastifyInstance) => {
  app.post("/patients", async (req: FastifyRequest, res: FastifyReply) => {
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

      // CPF is unique
      const { data: cpfData, error: cpfError } = await supabase
        .from("patients")
        .select("cpf")
        .eq("cpf", cpf)
      if (cpfError) {
        throw cpfError
      } else if (cpfData && cpfData.length > 0) {
        return res.status(400).send({ message: "CPF já cadastrado", code: "CPF001"})
      }

      // RG is unique
      const { data: rgData, error: rgError } = await supabase
        .from("patients")
        .select("rg")
        .eq("rg", rg)
      if (rgError) {
        throw rgError
      } else if (rgData && rgData.length > 0) {
        return res.status(400).send({ message: "RG já cadastrado", code: "RG001"})
      }

      const { data, error } = await supabase
        .from("patients")
        .insert([{
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