import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

export const userSignIn = async (user) => {
  const routeAPI = 'login'

  try {
    const data = await axios.post(apiBaseUrl(routeAPI), user)
    if (data) {

      const userData = await axios.get(apiBaseUrl(`user/${data.data.user.id}`), {
        headers: {
          Authorization: `Bearer ${data.data.token}`
        },
        body: {
          id: data.data.id
        }
      })

      const authUser = {
        session: data.data,
        user: userData.data
      }
      return authUser
    }
  } catch (error) {
    return error
  }
}

