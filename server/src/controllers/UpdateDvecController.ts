import type { FastifyRequest, FastifyReply } from "fastify";
import { UpdateDvecService } from "../services/UpdateDvecService";

export class UpdateDvecController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const { 
      frota, 
      atividade, 
      qth, 
      status_instalacao, 
      status_configuracao 
    } = (request.body as Omit<Parameters<UpdateDvecService['execute']>[0], 'id'>) || {};

    const updateDvecService = new UpdateDvecService();

    try {
      const updatedDvec = await updateDvecService.execute({
        id,
        frota,
        atividade,
        qth,
        status_instalacao,
        status_configuracao,
      });

      return reply.send(updatedDvec);
    } catch (error: any) {

      return reply.status(400).send({
        error: error.message || "Erro ao atualizar a frota.",
      });
    }
  }
}
