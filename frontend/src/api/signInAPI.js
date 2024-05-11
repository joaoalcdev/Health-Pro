import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

export const userSignIn = async (user) => {
  const routeAPI = 'login'

  try {
    const data = await axios.post(apiBaseUrl(routeAPI), user)
    return data.data
  } catch (error) {
    return error
  }
}