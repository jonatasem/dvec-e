import { useEffect, useState } from "react"
import { type ListDevProps, ListDvecService } from "./services/ListDvecService";

function App() {

  const [dvecs, setDvecs] = useState<ListDevProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDvec(){
      try {
        const data = await ListDvecService();
        setDvecs(data);
      } catch(error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    loadDvec();
  }, []);

  if(loading){
    return <p>Carregando frota...</p>
  }

  return (
    <>
      <main className="p-8">
        <h1 className="text-2xl front-bold mb-4">Lista de Equipamentos</h1>
        {dvecs.length === 0 ? (
          <p>Nenhum Equipamento Cadastrado.</p>
        ) : (
          <ul className="space-y-2">
            {dvecs.map((item) => (
              <li key={item.id} className="p-4 border rounded shadow-sm">
                <p><strong>Frota:</strong> {item.frota}</p>
                <p><strong>Atividade:</strong> {item.atividade}</p>
                <p><strong>Instalado:</strong> {item.status_instalacao ? "Sim" : "Não"}</p>
                <p><strong>Configurado:</strong> {item.status_configuracao ? "Sim" : "Não"}</p>
              </li>
            ))}
          </ul>
        )
      }
      </main>
    </>
  )
}

export default App
