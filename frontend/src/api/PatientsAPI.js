import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

// Patients

export const getPatients = async () => {
  try {
    const res = await axios.get(apiBaseUrl('patients'))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}

export const createPatient = async (newPatient) => {
  console.log(newPatient)
  try {
    const data = await axios.post(apiBaseUrl('patients'), newPatient)
    return data
  } catch (error) {
    return error
  }
}

export const updatePatient = async (patient) => {
  try {
    const data = await axios.put(apiBaseUrl('patients'), patient)
    return data
  } catch (error) {
    return error
  }
}