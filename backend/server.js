import { fastify } from "fastify";

const server = fastify();

server.get("/", async () => {
  console.log("Server is running...")
  return "Hello World!"
});

server.listen({
  port: 3333,
})