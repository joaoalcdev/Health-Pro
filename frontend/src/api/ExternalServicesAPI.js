import axios from "axios"
import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"


//External Services

export const addCompany = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('company'), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res
  } catch (error) {
    return error
  }
}

export const editCompany = async (companyId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`company/${companyId}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
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
    const res = await axios.post(apiBaseUrl('external-service'), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res
  } catch (error) {
    return error
  }
}

export const editExternalService = async (externalServiceId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`external-service/${externalServiceId}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
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

export const exportExternalServices = async (monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`external-services/${monthRange}/export`), {
      responseType: 'blob',
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `serviços-externos-${monthRange}.pdf`)
      document.body.appendChild(link)
      link.click()
      return { status: 200 }
    })
    return res
  } catch (error) {
    return error
  }
}
