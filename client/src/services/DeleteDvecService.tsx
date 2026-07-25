import axios from "axios";
import { api } from "../lib/api";

interface DeleteDvecProps {
  id: string;
}

export async function deleteDvecService({ id }: DeleteDvecProps) {
  try {
    const response = await api.delete(`/dvec/${id}`);

    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Erro ao deletar frota.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }

    throw new Error(errorMessage, { cause: error });
  }
}