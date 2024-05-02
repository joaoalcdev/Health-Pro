import { fastify } from "fastify";

const server = fastify();

// 500: INTERNAL_SERVER_ERROR
// Code: FUNCTION_INVOCATION_FAILED
// ID: gru1::pxqnb-1714675917018-ffb5d7c87161

server.get("/", async (request, reply) => {
  return { hello: "world" };
});

server.listen({
  port: 3000,
})