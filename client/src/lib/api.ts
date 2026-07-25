import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

if(!apiUrl){
  throw new Error("Variável de ambiente não encontrada.")
}

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});