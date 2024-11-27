import axios from "axios"

import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"


//Specialties
export const getSpecialties = async (status, specialtyId) => {
  try {
    const res = await axios.get(apiBaseUrl(`specialties${status || specialtyId ? '?' : ''}${status ? 'status=true' : ''}${specialtyId ? `specialtyId=${specialtyId}` : ''}`
    ), {
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

export const addSpecialties = async (data) => {
  try {
    const res = await axios.post(apiBaseUrl('specialties'), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res
  } catch (error) {
    return error
  }
}

export const updateSpecialties = async (id, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`specialties/${id}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res
  } catch (error) {
    return error
  }
}

export const waitlist = async (specialtyId) => {
  try {
    const res = await axios.get(apiBaseUrl(`waitlist/${specialtyId ? specialtyId : '0'}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const getPatientListBySpecialty = async (specialtyId) => {
  try {
    const res = await axios.get(apiBaseUrl(`specialty/${specialtyId}/patients`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const includePatientToWaitlist = async (specialtyId, data) => {
  try {
    const res = await axios.post(apiBaseUrl(`waitlist/${specialtyId}`), { patients: data }, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const updateWaitlist = async (specialtyId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`waitlist/${specialtyId}`), { waitlistItems: data }, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}
