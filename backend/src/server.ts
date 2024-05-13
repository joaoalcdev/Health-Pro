// restored the server.ts file
import fastify from "fastify";
import cors from "@fastify/cors"

import { supabase } from "./supabaseConnection";
import { FastifyRequest } from "fastify";

const app = fastify()

interface RequestParams {
  id: string;
}

app.register(cors, {
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
})


app.post("/login", async (req, res) => {
  try {
    const {
      email,
      password

    } = req.body as Users

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      throw error
    }else{

      return res.status(200).send(data ? data : null)
    }

  } catch (error) {
    return res.status(400).send(error)
  }
})


app.get("/user/:id", async (req, res) => {

  try {
    const userId = (req.params as RequestParams).id;

    const { data } = await supabase.from("users").select("*").eq("id", userId).single()

    return res.status(200).send(data ? data : null) 
  } catch (error) {
    console.error(error)
    throw error
  }
})

app.get("/users", async () => {

  try {
    const { data } = await supabase.from("users").select("*").order("firstName", { ascending: true })

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

    const createdAt = new Date()

    const { data:userAuth, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (userAuth) {
      const { data: createdUser, error } = await supabase.from("users").insert([{
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
        state,
        createdAt
      }]).select()

      if (error) {
        throw error
      }
      else return res.status(200).send(createdUser ? createdUser[0] : null)
      //return res.status(200).send(createdUser ? createdUser[0] : null)
    }
  } catch (error) {
    return res.status(400).send(error)
  }
})

app.put("/users", async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      roleId,
      address,
      region,
      city,
      state
    } = req.body as Users

    const { data: User, error } = await supabase.from("users").update({
      firstName,
      lastName,
      phoneNumber,
      email,
      roleId,
      address,
      city,
      region,
      state
    }).eq("id", id).select()

    if (error) {
      throw error
    }
    else return res.status(200).send(User ? User : null)
  } catch (error) {
    return res.status(400).send(error)
  }
})

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Server is running")
})