import type { FastifyRequest, FastifyReply } from "fastify";
import { CreateDvecService } from "../services/CreateDvecService";

interface CreateDvecProps {
    frota: string;
    atividade: string;
    qth: string;
}

export class CreateDvecController{
    async handle(request: FastifyRequest, reply: FastifyReply ){

        const { frota, atividade, qth } = request.body as CreateDvecProps;

        const dvecService = new CreateDvecService();

        try {
            const dvec = await dvecService.execute({
                frota, 
                atividade, 
                qth
            });

            return reply.status(201).send(dvec);
        } catch(error: any) {
            return reply.status(400).send({error: error.message});
        }
    }
}