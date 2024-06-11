import axios from "axios"
import { apiBaseUrl } from "./apiConfig"

export const listAppointments = async (newAppointment) => {
  try {
    const data = await axios.get(apiBaseUrl('appointments'))
    return data
  } catch (error) {
    return error
  }
}


export const createAppointment = async (newAppointment) => {
  try {
    const data = await axios.post(apiBaseUrl('appointments'), newAppointment)
    return data
  } catch (error) {
    return error
  }
}

export const rescheduleAppointment = async (appointmentData, appointmentId) => {
  try {
    const data = await axios.put(apiBaseUrl(`appointment/reschedule/${appointmentId}`), appointmentData)
    return data
  } catch (error) {
    return error
  }
}

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(apiBaseUrl(`appointment/delete/${appointmentId}`))
    return response
  } catch (error) {
    return error
  }
}
