import axios from "axios"
import moment from "moment"

import { apiBaseUrl } from "./apiConfig"
import { getTokenFromLocalStorage } from "../hooks/getTokenFromLocalStorage"


export const getPayroll = async (monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`payroll/${monthRange}`),
      {
        body: {
          monthRange: monthRange
        },
        headers: {
          Authorization: `${getTokenFromLocalStorage()}`
        }
      }
    )
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}
export const getSummaryYearly = async (monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`summary/${monthRange}`),
      {
        body: {
          monthRange: monthRange
        },
        headers: {
          Authorization: `${getTokenFromLocalStorage()}`
        }
      }
    )
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}

export const editPayroll = async (eventId, data) => {
  try {
    const res = await axios.put(apiBaseUrl(`editPayroll/${eventId}`), data, {
      headers: {
        Authorization: `${getTokenFromLocalStorage()}`
      }
    })
    return res.data
  } catch (error) {
    return error
  }
}

export const exportPayroll = async (data, monthRange) => {
  const date = moment(monthRange).format('MM-YYYY')

  try {
    await axios.post(apiBaseUrl(`payroll/export`), {
      payrollData: data,
      monthRange: monthRange
    },
      {
        responseType: 'blob',
        headers: {
          Authorization: `${getTokenFromLocalStorage()}`
        }
      }
    ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `resumo-${data.professionalName}-${date}.pdf`)
      document.body.appendChild(link)
      link.click()
    }
    )

  } catch (error) {
    return error
  }
}