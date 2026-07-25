import type { FastifyRequest, FastifyReply } from "fastify";
import { DeleteDvecService } from "../services/DeleteDvecService";

export class DeleteDvecController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    const { id } = request.params as { id: string };

    if (!id) {
      return reply.status(400).send({
        error: "O ID da frota é obrigatório para a exclusão.",
      });
    }

    const deleteDvecService = new DeleteDvecService();

    try {
      const result = await deleteDvecService.execute({ id });
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(400).send({
        error: error.message || "Erro ao deletar a frota.",
      });
    }
  }
}
