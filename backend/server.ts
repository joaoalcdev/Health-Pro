import fastify from "fastify";

import { supabase } from "./src/supabaseConnection";

const app = fastify()

app.get("/users", async () => {

  try {
    const { data: users } = await supabase.from("users").select("*")

    return { value: users }
  } catch (error) {
    console.error(error)
    throw error
  }

})

app.post("/users", async (request, response) => {
  try {
    const { name, email } = request.body as Users

    const { data: createdUser } = await supabase.from("users").insert([{
      name,
      email
    }]).select()

    // return { value: createdUser }
    if (createdUser) {
      return { value: createdUser[0] }
    } else {
      return { value: null }
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