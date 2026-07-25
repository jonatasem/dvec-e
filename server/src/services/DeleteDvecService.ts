import prismaClient from "../prisma";

interface DeleteDvecProps {
  id: string;
}

export class DeleteDvecService {
  async execute({ id }: DeleteDvecProps) {
    if (!id) {
      throw new Error("O ID da frota não foi informado.");
    }

    const findDvec = await prismaClient.dvec.findFirst({
      where: { id },
    });

    if (!findDvec) {
      throw new Error("Frota não encontrada.");
    }

    await prismaClient.dvec.delete({
      where: {
        id: findDvec.id,
      },
    });

    return { message: "Deletado com sucesso." };
  }
}