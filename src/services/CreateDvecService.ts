import { PrismaClient } from "@prisma/client";

interface CreateDvecProps {
    frota: string;
    atividade: string;
    qth: string;
}

export class CreateDvecService {
    async execute({ frota, atividade, qth }: CreateDvecProps){

        // Verificações
        // 1º Verificar a existencia da frota
        if(!frota){
            throw new Error("Por favor, digite a frota do equipamento.");
        }

        if(!atividade){

        }

    }
}