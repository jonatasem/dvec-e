import { useState, type FormEvent } from "react";
import { CreateDvecService } from "../services/CreateDvecService";
import type { ListDevProps } from "../services/ListDvecService";

interface FormDvecProps {
  onSuccess: (novoItem: ListDevProps) => void;
}

export default function FormDvec({ onSuccess }: FormDvecProps) {
  const [frota, setFrota] = useState("");
  const [atividade, setAtividade] = useState("");
  const [qth, setQth] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!frota || !atividade || !qth) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      const novoDvec = await CreateDvecService({ frota, atividade, qth });
      setFrota("");
      setAtividade("");
      setQth("");
      onSuccess(novoDvec);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl mb-8 space-y-4"
    >
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-lg font-bold text-slate-100">Cadastrar Nova Frota</h2>
        <p className="text-xs text-slate-400">Preencha as informações do novo equipamento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Frota
          </label>
          <input
            type="text"
            value={frota}
            onChange={(e) => setFrota(e.target.value)}
            placeholder="Ex: 850185"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Atividade
          </label>
          <input
            type="text"
            value={atividade}
            onChange={(e) => setAtividade(e.target.value)}
            placeholder="Ex: Transbordo"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            QTH
          </label>
          <input
            type="text"
            value={qth}
            onChange={(e) => setQth(e.target.value)}
            placeholder="Ex: 8167"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 transition shadow-lg shadow-blue-600/20"
      >
        {loading ? "Cadastrando..." : "Cadastrar Frota"}
      </button>
    </form>
  );
}