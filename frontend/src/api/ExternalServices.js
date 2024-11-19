import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//External Services

export const addCompany = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('company'), data)
    return res
  } catch (error) {
    return error
  }
}

export const editCompany = async (companyId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`company/${companyId}`), data)
    return res
  } catch (error) {
    return error
  }
}

export const getCompanies = async () => {
  try {
    const res = await axios.get(apiBaseUrl('company'))
    return res.data
  } catch (error) {
    return error
  }
}