import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//Specialties
export const getSpecialties = async () => {
  try {
    const res = await axios.get(apiBaseUrl('specialties'))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}
