import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//Specialties
export const getServices = async (status, specialtyId) => {
  try {
    const res = await axios.get(apiBaseUrl(`services${status || specialtyId ? '?' : ''}${status ? 'status=true' : ''}${status && specialtyId ? '&' : ''}${specialtyId ? `specialtyId=${specialtyId}` : ''}`))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}

export const addServices = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('services'), data)
    return res
  } catch (error) {
    return error
  }
}

export const updateServices = async (id, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`services/${id}`), data)
    return res
  } catch (error) {
    return error
  }
}
