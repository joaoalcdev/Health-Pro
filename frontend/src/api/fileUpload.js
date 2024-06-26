import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

// File Upload

export const uploadFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const res = await axios.post(apiBaseUrl("imageuploader"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "file": "file",
      },
    })

    return res.data
  } catch (error) {
    return error
  }
}