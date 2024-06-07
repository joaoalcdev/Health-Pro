import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

// Patients

export const getPatients = async (showDeleted) => {
  try {
    const res = await axios.get(apiBaseUrl(`patients/${showDeleted ? showDeleted : false}`))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}

export const createPatient = async (newPatient) => {
  try {
    const data = await axios.post(apiBaseUrl('patients'), newPatient)
    return data
  } catch (error) {
    return error
  }
}

export const updatePatient = async (patientId, patient) => {
  try {
    const data = await axios.put(apiBaseUrl(`patients/${patientId}`), patient)
    return data
  } catch (error) {
    return error
  }
}

export const getPatient = async (patientId) => {
  try {
    const data = await axios.get(apiBaseUrl(`patient/${patientId}`))
    return data
  } catch (error) {
    return error
  }
}

export const deletePatient = async (patientId, patient) => {
  try {
    const data = await axios.delete(apiBaseUrl(`patients/${patientId}`, patient))
    if (data) {
      return data
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}

export const recoveryPatient = async (patientId) => {
  try {
    const data = await axios.put(apiBaseUrl(`patients/recovery/${patientId}`))
    return data
  } catch (error) {
    return error
  }
}