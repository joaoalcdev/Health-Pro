import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

export const userSignOut = async () => {
  const routeAPI = 'logout'

  try {
    const data = await axios.post(apiBaseUrl(routeAPI))
    if (data.status !== 200) {
      throw new Error(data.status)
    } else {
      localStorage.removeItem("session");
      return data
    }
  } catch (error) {
    return error
  }
}

