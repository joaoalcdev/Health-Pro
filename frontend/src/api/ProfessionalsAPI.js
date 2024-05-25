import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//Professionals

export const getProfessionals = async () => {
  try {
    const res = await axios.get(apiBaseUrl('professionals'))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}

export const getProfessionalById = async (professional) => {
  try {
    const res = await axios.get(apiBaseUrl(`professional/${professional}`))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}


export const createProfessional = async (newProfessional) => {
  try {
    const data = await axios.post(apiBaseUrl('professionals'), newProfessional)
    return data
  } catch (error) {
    return error
  }
}

