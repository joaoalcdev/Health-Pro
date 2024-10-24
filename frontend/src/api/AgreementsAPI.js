import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

export const getAgreements = async () => {
  try {
    const res = await axios.get(apiBaseUrl('agreements'))
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}