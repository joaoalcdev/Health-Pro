import axios from "axios"
import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"

export const listAppointments = async (newAppointment) => {
  try {
    const data = await axios.get(apiBaseUrl('appointments'), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}


export const createAppointment = async (newAppointment) => {
  try {
    const data = await axios.post(apiBaseUrl('appointments'), newAppointment, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const rescheduleAppointment = async (appointmentData, appointmentId) => {
  try {
    const data = await axios.put(apiBaseUrl(`appointment/reschedule/${appointmentId}`), appointmentData, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(apiBaseUrl(`appointment/delete/${appointmentId}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const getAppointmentsWithFilter = async (professionalId, patientId) => {
  try {
    const data = await axios.get(apiBaseUrl(`appointments/get?${professionalId !== 0 ? `professional=${professionalId}` : ''}${professionalId && patientId ? '&' : ''}${patientId !== 0 ? `patient=${patientId}` : ''}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}
