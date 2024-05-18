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

export const createProfessional = async (newProfessional) => {
  console.log(newProfessional)
  try {
    const data = await axios.post(apiBaseUrl('users'), newProfessional)
    return data
  } catch (error) {
    return error
  }
}

