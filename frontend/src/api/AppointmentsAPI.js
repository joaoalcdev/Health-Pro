import axios from "axios"
import { apiBaseUrl } from "./apiConfig"

export const createAppointment = async (newAppointment) => {
  try {
    const data = await axios.post(apiBaseUrl('appointments'), newAppointment)
    return data
  } catch (error) {
    return error
  }
}