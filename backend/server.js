import { fastify } from "fastify";

const server = fastify();

server.get("/", () => {
  console.log("server is running...");
  return "Hello World!";
})

server.listen({
  port: 3333,
})