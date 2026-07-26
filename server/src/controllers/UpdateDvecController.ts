import type { FastifyRequest, FastifyReply } from "fastify";
import { UpdateDvecService } from "../services/UpdateDvecService.js";

type UpdateBodyData = Omit<Parameters<UpdateDvecService['execute']>[0], 'id'>;

export class UpdateDvecController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const { 
      frota, 
      atividade, 
      qth, 
      status_instalacao, 
      status_configuracao 
    } = (request.body as UpdateBodyData) || ({} as UpdateBodyData);

    const updateDvecService = new UpdateDvecService();

    try {
      const updatedDvec = await updateDvecService.execute({
        id,
        ...(frota !== undefined ? { frota } : {}),
        ...(atividade !== undefined ? { atividade } : {}),
        ...(qth !== undefined ? { qth } : {}),
        ...(status_instalacao !== undefined ? { status_instalacao } : {}),
        ...(status_configuracao !== undefined ? { status_configuracao } : {}),
      } as Parameters<UpdateDvecService['execute']>[0]); 

      return reply.send(updatedDvec);
    } catch (error: any) {
      return reply.status(400).send({
        error: error.message || "Erro ao atualizar a frota.",
      });
    }
  }
}