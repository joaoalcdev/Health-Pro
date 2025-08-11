import axios from "axios"
import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"

export const getAgreements = async () => {
  try {
    const res = await axios.get(apiBaseUrl('agreements'), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}