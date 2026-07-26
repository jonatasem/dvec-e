import prismaClient from "../prisma/index.js";

export class ListDvecService{
    async execute(){
        const dvec = await prismaClient.dvec.findMany();

        return dvec;
    }
}