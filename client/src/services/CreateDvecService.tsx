import axios from "axios";
import { api } from "../lib/api";

export interface CreateDvecProps {
  frota: string;
  atividade: string;
  qth: string;
}

export async function CreateDvecService(params: CreateDvecProps) {
  try {
    const response = await api.post("/dvec", params);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Erro ao cadastrar a frota.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }

    throw new Error(errorMessage, { cause: error });
  }
}