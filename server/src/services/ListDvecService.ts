import prismaClient from "../prisma";

export class ListDvecService{
    async execute(){
        const dvec = await prismaClient.dvec.findMany();

        return dvec;
    }
}