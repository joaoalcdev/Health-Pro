import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

export const userSignIn = async (user) => {
  const routeAPI = 'login'

  try {
    const response = await axios.post(apiBaseUrl(routeAPI), user)
    if (response.status === 400) {
      throw response.error
    }

    if (response.status === 401) {
      return response.data
    }

    const authUser = {
      session: response.data.session,
      user: response.data.userData,
    }
    return authUser
    // }
  } catch (error) {
    return error
  }
}

