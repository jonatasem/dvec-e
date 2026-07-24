import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  // PÚBLICAS

  fastify.get(
    "/teste",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {ok: "ok"};
    },
  );
}