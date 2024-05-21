import fastify from "fastify";
import cors from "@fastify/cors"
import { routes } from "./routes";

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
  app.register(routes)
  process.env.APP_ENV_DEV ? app.register(cors, {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }) : null
  return app
}

const app = createServer();
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Server is running")
})