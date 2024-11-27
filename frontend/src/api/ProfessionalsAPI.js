import axios from "axios"

import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"


//Professionals

export const getProfessionals = async (showDeleted) => {
  try {
    const res = await axios.get(apiBaseUrl(`professionals/${showDeleted ? showDeleted : false}`), {
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

export const getProfessionalById = async (professional) => {
  try {
    const res = await axios.get(apiBaseUrl(`professional/${professional}`), {
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

export const createProfessional = async (newProfessional) => {
  try {
    const { data, error } = await axios.post(apiBaseUrl('professionals'), newProfessional, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    if (error) {
      throw error
    }
    return data
  } catch (error) {
    return { error }
  }
}

export const updateProfessional = async (professional, updatedProfessional) => {
  try {
    const data = await axios.put(apiBaseUrl(`professional/${professional}`), updatedProfessional, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const deleteProfessional = async (professional) => {
  try {
    const data = await axios.delete(apiBaseUrl(`professional/${professional}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const getProfessionalRecords = async (professionalId, monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`professional/${professionalId}/records/${monthRange}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const getProfessionalRecordsExport = async (professionalId, monthRange, professionalFullName) => {

  try {
    const res = await axios.get(apiBaseUrl(`professional/${professionalId}/records/${monthRange}/export`), {
      responseType: 'blob',
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `frequencia-${professionalFullName}-${monthRange}.pdf`)
      document.body.appendChild(link)
      link.click()
    })
    return res.data
  } catch (error) {
    return error
  }
}
