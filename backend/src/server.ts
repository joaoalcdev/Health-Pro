import fastify from "fastify";
import cors from "@fastify/cors"
import { routes } from "./routes";

export const app = fastify()
app.register(routes)
app.register(cors, {
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
})

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Server is running")
})