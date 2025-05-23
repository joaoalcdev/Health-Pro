import fastify from "fastify";
import cors from "@fastify/cors"
import { routes } from "./routes"


export default function createServer() {
  const app = fastify()
  app.register(cors, {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'XMLHttpRequest', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'document', 'xhr', 'preflight'],
    credentials: true,
  })
  app.register(routes)
  return app
}

const app = createServer();
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Server is running")
})