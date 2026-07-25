import { useState, type FormEvent } from "react";
import { updateDvecService } from "../services/UpdateDvecService";
import type { ListDevProps } from "../services/ListDvecService";

interface EditDvecProps {
  dvec: ListDevProps;
  onClose: () => void;
  onSuccess: (updatedDvec: ListDevProps) => void;
}

export function EditDvec({ dvec, onClose, onSuccess }: EditDvecProps) {
  const [frota, setFrota] = useState(dvec.frota);
  const [atividade, setAtividade] = useState(dvec.atividade);
  const [qth, setQth] = useState(dvec.qth);
  const [statusInstalacao, setStatusInstalacao] = useState(dvec.status_instalacao);
  const [statusConfiguracao, setStatusConfiguracao] = useState(dvec.status_configuracao);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        frota,
        atividade,
        qth,
        status_instalacao: statusInstalacao,
        status_configuracao: statusConfiguracao,
      };

      await updateDvecService(dvec.id, updatedData);

      onSuccess({
        ...dvec,
        ...updatedData,
      });

      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-100">Editar Frota</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Frota
            </label>
            <input
              type="text"
              value={frota}
              onChange={(e) => setFrota(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
              required
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
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
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
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={statusInstalacao}
                onChange={(e) => setStatusInstalacao(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0"
              />
              Instalado
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={statusConfiguracao}
                onChange={(e) => setStatusConfiguracao(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0"
              />
              Configurado
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-500 disabled:opacity-50 transition"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}