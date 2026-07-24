
export interface ListDevProps {
    id: string;
    frota: string;
    atividade: string;
    qth: string;
    status_instalacao: boolean,
    status_configuracao: boolean
}

export async function ListDvecService(): Promise<ListDevProps[]> {
    const response = await fetch("http://localhost:3333/dvec", {
        method: "GET",
    });

    const result = await response.json();    

    if(!response.ok){
        throw new Error(result.message || "Erro ao buscar a lista de frotas.");
    }

    console.log(result);
    
    return result;
}