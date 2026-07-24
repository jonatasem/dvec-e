import { PrismaClient } from "@prisma/client";

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

        if(frota){
            throw new Error("Essa frota já foi cadastrada.");
        }

        

    }
}