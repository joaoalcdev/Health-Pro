import axios from "axios"

import { apiBaseUrl } from "./apiConfig"

//Users

export const getUsers = async () => {
  try {
    // const res = await axios.get(`${apiBaseUrl}`)
    const res = await axios.get(apiBaseUrl('users'))
    const data = res.data
    return data
  } catch (error) {
    return error
  }

}

export const createUser = async (newUser) => {
  console.log(newUser)
  try {
    const data = await axios.post(apiBaseUrl('users'), newUser)
    return data
  } catch (error) {
    return error
  }
}

export const updateUser = async (User) => {
  console.log(User)
  try {
    const data = await axios.put(apiBaseUrl('users'), User)
    return data
  } catch (error) {
    return error
  }
}

// // Providers

// export const getProviders = async () => {
//   const snapshot = await getDocs(providerCollection)
//   const providers = snapshot.docs.map((doc => ({
//     id: doc.id, ...doc.data()
//   })))
//   return providers
// }

// export const postProvider = async (provider) => {
//   const docRef = doc(db, "provider", String(provider.id))
//   const addProvider = await setDoc(docRef, provider);
//   if (addProvider) {
//     return addProvider
//   }
//   else {
//     return null
//   }
// }

// export const editProvider = async (provider) => {
//   const docRef = doc(db, "provider", String(provider.id))
//   const updateProvider = await updateDoc(docRef, provider)
//   if (updateProvider) {
//     return updateProvider
//   }
//   else {
//     return null
//   }
// }

// export const deleteProvider = async (provider) => {
//   const docRef = doc(db, "provider", String(provider.id))
//   const updateProvider = await updateDoc(docRef, provider)
//   if (updateProvider) {
//     return updateProvider
//   }
//   else {
//     return null
//   }

// }