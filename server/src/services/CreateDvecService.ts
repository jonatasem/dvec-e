import prismaClient from "../prisma/index.js";

interface CreateDvecProps {
    frota: string;
    atividade: string;
    qth: string;
}

export class CreateDvecService {
    async execute({ frota, atividade, qth }: CreateDvecProps){

        // Verificações
        if(!frota){
            throw new Error("Por favor, digite a frota do equipamento.");
        }

        if(!atividade){
            throw new Error("Por favor, digite a atividade do equipamento.");
        }

        if(!qth){
            throw new Error("Por favor, digite o local do equipamento.");
        }        

        // Verificar a existencia da frota
        const ExistingFleet = await prismaClient.dvec.findUnique({
            where: {
                frota: frota,
            },
        });

        if(ExistingFleet){
            throw new Error("Essa frota já foi cadastrada.");
        }

        const dvec = await prismaClient.dvec.create({
            data: {
                frota: frota,
                atividade: atividade,
                qth: qth
            },
        });

        return dvec;
    }
}