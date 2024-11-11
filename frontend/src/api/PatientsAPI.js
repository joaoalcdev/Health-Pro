import axios from "axios"
import moment from "moment"


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
    const res = await axios.get(apiBaseUrl(`patient/${patientId}`))

    return res.data
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

export const getPatientRecords = async (patientId, monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`patient/${patientId}/records/${monthRange}`))
    return res.data
  } catch (error) {
    return error
  }
}

export const getPatientRecordsExport = async (patientId, monthRange, patientFullName) => {

  try {
    const res = await axios.get(apiBaseUrl(`patient/${patientId}/records/${monthRange}/export`), {
      responseType: 'blob'
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `frequencia-${patientFullName}-${monthRange}.pdf`)
      document.body.appendChild(link)
      link.click()
    })
    return res.data
  } catch (error) {
    return error
  }
}