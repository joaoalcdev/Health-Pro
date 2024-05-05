import fastify from "fastify";
import cors from "@fastify/cors"

import { supabase } from "./supabaseConnection";

const app = fastify()

app.register(cors, {
  origin:'*',
  methods: ['POST', 'GET']
})

app.get("/users", async () => {

  try {
    const { data} = await supabase.from("users").select("*")

    return data ? data : null 
  } catch (error) {
    console.error(error)
    throw error
  }

})

app.post("/users", async (req, res) => {
  try {
    const {
      firstName, 
      lastName, 
      phoneNumber, 
      email, 
      password, 
      roleId, 
      address, 
      city, 
      region, 
      state
    } = req.body as Users

    const { data:userAuth, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (userAuth){
      const { data: createdUser } = await supabase.from("users").insert([{
        id: userAuth.user?.id,
        firstName, 
        lastName, 
        phoneNumber, 
        email, 
        password, 
        roleId, 
        address, 
        city, 
        region, 
        state
      }]).select()
      
      return createdUser ? createdUser[0] : null
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Server is running")
})