import axios from "axios"
import { apiBaseUrl } from "./apiConfig"

export const listEvents = async () => {
  try {
    const data = await axios.get(apiBaseUrl('events'))
    return data
  } catch (error) {
    return error
  }
}


export const createEvents = async (newEvent) => {
  try {
    const data = await axios.post(apiBaseUrl('events'), newEvent)
    return data
  } catch (error) {
    return error
  }
}

export const rescheduleEvents = async (eventData, eventId) => {
  try {
    const data = await axios.put(apiBaseUrl(`event/reschedule/${eventId}`), eventData)
    return data
  } catch (error) {
    return error
  }
}

export const deleteEvents = async (appointmentId) => {
  try {
    const response = await axios.delete(apiBaseUrl(`events/delete/${appointmentId}`))
    return response
  } catch (error) {
    return error
  }
}

export const getEventsFiltering = async (professionalId, patientId) => {
  try {
    const data = await axios.get(apiBaseUrl(`events/get?${professionalId !== 0 ? `professional=${professionalId}` : ''}${professionalId && patientId ? '&' : ''}${patientId !== 0 ? `patient=${patientId}` : ''}`))
    return data
  } catch (error) {
    return error
  }
}

export const getEventById = async (id) => {
  try {
    const data = await axios.get(apiBaseUrl(`events/${id}`))
    return data
  } catch (error) {
    return error
  }
}

export const updateEvent = async (data, eventInstanceId) => {
  try {
    const response = await axios.put(apiBaseUrl(`eventInstance/${eventInstanceId}`), data)
    return response
  } catch (error) {
    return error
  }
}

export const eventCheckIn = async (formData, eventInstanceId) => {
  try {
    const response = await axios.post(apiBaseUrl(`checkIn/${eventInstanceId}`), formData,
    )
    return response
  } catch (error) {
    return error
  }
}

export const cancelEvent = async (eventInstanceId, data) => {
  try {
    const response = await axios.put(apiBaseUrl(`cancelEvent/${eventInstanceId}`), data)
    return response
  } catch (error) {
    return error
  }
}