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

export const addSpecialties = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('specialties'), data)
    return res
  } catch (error) {
    return error
  }
}

export const updateSpecialties = async (id, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`specialties/${id}`), data)
    return res
  } catch (error) {
    return error
  }
}
