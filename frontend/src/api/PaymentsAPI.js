import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

export const getPayroll = async (monthRange) => {
  try {
    const res = await axios.get(apiBaseUrl(`payroll/${monthRange}`),
      {
        body: {
          monthRange: monthRange
        }
      }
    )
    const data = res.data
    return data
  } catch (error) {
    return error
  }
}