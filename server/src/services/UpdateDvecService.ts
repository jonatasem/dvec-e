import prismaClient from "../prisma";

export interface UpdateDvecProps {
  id: string;
  frota?: string;
  atividade?: string;
  qth?: string;
  status_instalacao?: boolean;
  status_configuracao?: boolean;
}

export class UpdateDvecService {
  async execute({
    id,
    frota,
    atividade,
    qth,
    status_instalacao,
    status_configuracao,
  }: UpdateDvecProps) {
    // 1. Verifica se o ID foi informado
    if (!id) {
      throw new Error("O ID da frota é obrigatório para a atualização.");
    }

    // 2. Busca se o registro existe no banco
    const dvecExists = await prismaClient.dvec.findUnique({
      where: { id },
    });

    if (!dvecExists) {
      throw new Error("Frota não encontrada.");
    }

    // 3. Atualiza apenas os campos fornecidos
    const updateDvec = await prismaClient.dvec.update({
      where: { id },
      data: {
        ...(frota !== undefined && { frota }),
        ...(atividade !== undefined && { atividade }),
        ...(qth !== undefined && { qth }),
        ...(status_instalacao !== undefined && { status_instalacao }),
        ...(status_configuracao !== undefined && { status_configuracao }),
      },
    });

    return updateDvec;
  }
}
