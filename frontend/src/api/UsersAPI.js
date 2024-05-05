import { apiBaseUrl } from "./apiConfig"
import axios from "axios"


//Users

export const getUsers = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/users`)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }

}

export const createUser = async (newUser) => {
  console.log(newUser)
  try {
    const res = await axios.post(`${apiBaseUrl}/users`, newUser)

    return res
  } catch (error) {
    console.log(error)
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