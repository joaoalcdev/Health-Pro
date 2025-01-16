import axios from "axios"
import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"

export const listEvents = async () => {
  try {
    const data = await axios.get(apiBaseUrl('events'), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}


export const createEvents = async (newEvent) => {
  try {
    const data = await axios.post(apiBaseUrl('events'), newEvent, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const rescheduleEvents = async (eventData, eventId) => {
  try {
    const data = await axios.put(apiBaseUrl(`event/reschedule/${eventId}`), eventData, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const rescheduleSingleEvent = async (eventData, eventInstanceId) => {
  try {
    const res = await axios.put(apiBaseUrl(`eventInstance/reschedule/${eventInstanceId}`), eventData, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const deleteEvents = async (appointmentId) => {
  try {
    const response = await axios.delete(apiBaseUrl(`events/delete/${appointmentId}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const getEventsFiltering = async (professionalId, patientId, start, end) => {
  try {
    const res = await axios.get(apiBaseUrl(
      'events/get' +
      `${professionalId || patientId || start || end ? '?' : ''}` +
      `${professionalId ? `professionalId=${professionalId}&` : ''}` +
      `${patientId ? `patientId=${patientId}&` : ''}` +
      `${start ? `start=${start}&` : ''}` +
      `${end ? `end=${end}` : ''}`
    ), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const getEventById = async (id) => {
  try {
    const data = await axios.get(apiBaseUrl(`events/${id}`), {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const updateEvent = async (data, eventInstanceId) => {
  try {
    const response = await axios.put(apiBaseUrl(`eventInstance/${eventInstanceId}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const eventCheckIn = async (formData, eventInstanceId) => {
  try {
    const response = await axios.post(apiBaseUrl(`checkIn/${eventInstanceId}`), formData, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    }
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const cancelEvent = async (eventInstanceId, data) => {
  try {
    const response = await axios.put(apiBaseUrl(`cancelEvent/${eventInstanceId}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const dischargeEvent = async (data, eventId) => {
  try {
    const response = await axios.put(apiBaseUrl(`discharge/${eventId}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}