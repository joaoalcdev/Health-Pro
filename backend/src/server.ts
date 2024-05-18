// restored the server.ts file
import fastify from "fastify";
import cors from "@fastify/cors"

import { supabase, supabaseAdmin } from "./supabaseConnection";

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
    } else {
      return res.status(200).send(data ? data : null)
    }
  } catch (error) {
    return res.status(400).send(error)
  }
})

app.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    } else {
      return res.status(200).send("Sessão encerrada")
    }

  } catch (error) {
    return res.status(400).send("Não foi possível encerrar a sessão!")
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

    const { data: userAuth, error } = await supabase.auth.signUp({
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

app.delete("/user/:id", async (req, res) => {
  try {
    const userId = (req.params as RequestParams).id;

    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    console.log(data)
    if (error) {
      throw error
    } else {
      const { error } = await supabase.from('users').delete().eq('id', userId)

    }


    if (error) {
      throw error
    }
    else return res.status(200).send("User deleted successfully")
  } catch (error) {
    return res.status(400).send(error)
  }
})

// get all Patients
app.get("/patients", async (req, res) => {
  try {
    const { data } = await supabase.from("patients").select("*").order("fullName", { ascending: true })

    return data ? data : null
  } catch (error) {
    console.error(error)
    throw error
  }
})

// create a new patient
app.post("/patients", async (req, res) => {
  try {
    const {
      fullName,
      cpf,
      age,
      bloodType,
      gender,
      address,
      region,
      city,
      state,
      phoneNumber,
      emergencyContact
    } = req.body as Patients

    const { data: patient, error } = await supabase.from("patients").insert([{
      fullName,
      cpf,
      age,
      bloodType,
      gender,
      address,
      region,
      city,
      state,
      phoneNumber,
      emergencyContact
    }]).select()

    if (error) {
      throw error
    }
    else return res.status(200).send(patient ? patient[0] : null)
  } catch (error) {
    return
  }
}
)

//Get all professionals
app.get("/professionals", async () => {

  try {
    let { data, error } = await supabase
      .from('view_professionals')
      .select('*')

    return data ? data : null
  } catch (error) {
    console.error(error)
    throw error
  }
})

//Create a new professional
app.post("/professionals", async (req, res) => {
  const defaultRole = 3;

  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      address,
      city,
      region,
      state
    } = req.body as Users

    const {
      fullName,
      rg,
      rgInssuance,
      cpf,
      gender,
      specialty,
      council,
      councilNumber,
      councilInssuance
    } = req.body as Professionals

    const { data: userAuth, error } = await supabase.auth.signUp({
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
        roleId: defaultRole,
        address,
        city,
        region,
        state,
      }]).select()

      const { data: createdProfessional, error: pError  } = await supabase.from("professionals").insert([{
        id: userAuth.user?.id,
        fullName,
        rg,
        rgInssuance,
        cpf,
        gender,
        specialty,
        council,
        councilNumber,
        councilInssuance,
      }]).select()

      if (error) {
        throw error
      }
      else return res.status(200).send(createdUser ? createdUser[0] : null)
    }
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