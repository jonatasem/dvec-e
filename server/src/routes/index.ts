import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { CreateDvecController } from "../controllers/CreateDvecController.js";
import { ListDvecController } from "../controllers/ListDvecController.js";
import { DeleteDvecController } from "../controllers/DeleteDvecController.js";
import { UpdateDvecController } from "../controllers/UpdateDvecController.js";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  // PÚBLICAS
  fastify.post(
    "/dvec",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateDvecController().handle(request, reply);
    }
  );

  fastify.get(
    "/dvec",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListDvecController().handle(request, reply);
    },
  );

  fastify.delete(
    "/dvec/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteDvecController().handle(request, reply);
    },
  );

  fastify.put(
    "/dvec/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateDvecController().handle(request, reply);
    },
  );
}