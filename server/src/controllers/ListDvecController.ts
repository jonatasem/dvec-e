import type { FastifyRequest, FastifyReply } from "fastify";
import { ListDvecService } from "../services/ListDvecService";

export class ListDvecController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listDvecService = new ListDvecService;

        const dvec = await listDvecService.execute();

        reply.status(200).send(dvec);
    }
}