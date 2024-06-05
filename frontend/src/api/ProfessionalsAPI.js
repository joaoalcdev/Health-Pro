import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//Professionals

export const getProfessionals = async (showDeleted) => {
  try {
    const res = await axios.get(apiBaseUrl(`professionals/${showDeleted ? showDeleted : false}`))
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

export const updateProfessional = async (professional, updatedProfessional) => {
  try {
    const data = await axios.put(apiBaseUrl(`professional/${professional}`), updatedProfessional)
    return data
  } catch (error) {
    return error
  }
}

export const deleteProfessional = async (professional) => {
  try {
    const data = await axios.delete(apiBaseUrl(`professional/${professional}`))
    return data
  } catch (error) {
    return error
  }
}

