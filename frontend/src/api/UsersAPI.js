import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//Users

export const getUsers = async (showDeleted) => {
  try {
    // const res = await axios.get(`${apiBaseUrl}`)
    const res = await axios.get(apiBaseUrl(`users/${showDeleted ? showDeleted : false}`))
    const data = res.data
    return data
  } catch (error) {
    return error
  }

}

export const createUser = async (newUser) => {
  try {
    const { data, error } = await axios.post(apiBaseUrl('users'), newUser)
    if (error) {
      throw error
    }
    return data
  } catch (error) {
    return { error }
  }
}

export const updateUser = async (user) => {
  try {
    const data = await axios.put(apiBaseUrl('users'), user)
    return data
  } catch (error) {
    return error
  }
}

export const deleteUser = async (user) => {

  try {
    const data = await axios.delete(apiBaseUrl(`user/${user.id}`), user)
    if (data) {
      return data
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}

export const recoveryUser = async (userId) => {
  try {
    const data = await axios.put(apiBaseUrl(`user/recovery/${userId}`))
    return data
  } catch (error) {
    return error
  }
}

