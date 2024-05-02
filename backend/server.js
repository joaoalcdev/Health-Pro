import { fastify } from "fastify";

const server = fastify();



server.get("/", async (request, reply) => {
  return "Hello World!";
});

server.listen({
  port: 3333,
})