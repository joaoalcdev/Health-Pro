import fastify from "fastify";
import cors from "@fastify/cors"
import { routes } from "./routes"

// export const app = fastify()
// app.register(routes)
// app.register(cors, {
//   origin: '*',
//   methods: ['POST', 'GET', 'PUT', 'DELETE'],
// })



// app.listen({
//   host: "0.0.0.0",
//   port: process.env.PORT ? Number(process.env.PORT) : 3333
// }).then(() => {
//   console.log("Server is running")
// })

export default function createServer() {
  const app = fastify()
  app.register(cors, {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'XMLHttpRequest', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'document'],
    credentials: true,
  })
  app.register(routes)
  return app
}

const app = createServer();
app.listen({
  host: "localhost",
  port: process.env.PORT ? Number(process.env.PORT) : 3000
}).then(() => {
  console.log("Server is running")
})