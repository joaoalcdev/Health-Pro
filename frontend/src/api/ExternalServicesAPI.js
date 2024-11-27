import axios from "axios"
import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"


//External Services

export const addCompany = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('company'), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }, data)
    return res
  } catch (error) {
    return error
  }
}

export const editCompany = async (companyId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`company/${companyId}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }, data)
    return res
  } catch (error) {
    return error
  }
}

export const getCompanies = async () => {
  try {
    const res = await axios.get(apiBaseUrl('company'), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const addExternalService = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('external-service'), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }, data)
    return res
  } catch (error) {
    return error
  }
}

export const editExternalService = async (externalServiceId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`external-service/${externalServiceId}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }, data)
    return res
  } catch (error) {
    return error
  }
}

export const getExternalServices = async (monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`external-services/${monthRange}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const removeExternalService = async (externalServiceId) => {
  try {
    const res = await axios.delete(apiBaseUrl(`external-service/${externalServiceId}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res
  } catch (error) {
    return error
  }
}
