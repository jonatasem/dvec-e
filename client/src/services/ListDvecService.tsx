import axios from "axios";
import { api } from "../lib/api";

export interface ListDevProps {
  id: string;
  frota: string;
  atividade: string;
  qth: string;
  status_instalacao: boolean;
  status_configuracao: boolean;
}

export async function ListDvecService(): Promise<ListDevProps[]> {
  try {
    const response = await api.get<ListDevProps[]>("/dvec");
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Erro ao buscar a lista de frotas.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    throw new Error(errorMessage, { cause: error });
  }
}
