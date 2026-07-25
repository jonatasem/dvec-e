import { useState } from "react";
import { deleteDvecService } from "../services/DeleteDvecService";
import type { ListDevProps } from "../services/ListDvecService";

interface DvecRowProps {
  item: ListDevProps;
  onDeleteSuccess: (id: string) => void;
  onEdit: (item: ListDevProps) => void;
}

export function DvecRow({ item, onDeleteSuccess, onEdit }: DvecRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar a frota "${item.frota}"?`
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      await deleteDvecService({ id: item.id });
      onDeleteSuccess(item.id);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao deletar frota.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-md">
      {/* Informações */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-slate-100 tracking-wide">
            Frota #{item.frota}
          </span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-medium border border-slate-700">
            QTH: {item.qth}
          </span>
        </div>

        <p className="text-sm text-slate-400">
          <strong className="text-slate-300 font-medium">Atividade:</strong> {item.atividade}
        </p>

        {/* Badges de Status */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
              item.status_instalacao
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            {item.status_instalacao ? "✓ Instalado" : "✕ Não Instalado"}
          </span>

          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
              item.status_configuracao
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            {item.status_configuracao ? "✓ Configurado" : "✕ Não Configurado"}
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
        <button
          onClick={() => onEdit(item)}
          className="px-4 py-2 bg-slate-800 text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-700 hover:text-white transition border border-slate-700"
        >
          Editar
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white text-sm font-medium rounded-lg border border-rose-600/20 transition disabled:opacity-50"
        >
          {isDeleting ? "Deletando..." : "Excluir"}
        </button>
      </div>
    </div>
  );
}