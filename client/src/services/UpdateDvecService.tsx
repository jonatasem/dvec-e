import axios from "axios";
import { api } from "../lib/api";

export interface UpdateDvecProps {
  frota?: string;
  atividade?: string;
  qth?: string;
  status_instalacao?: boolean;
  status_configuracao?: boolean;
}

export async function updateDvecService(id: string, data: UpdateDvecProps) {
  try {
    const response = await api.put(`/dvec/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Erro ao atualizar frota.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }

    throw new Error(errorMessage, { cause: error });
  }
}
