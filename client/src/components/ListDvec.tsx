import { useState, useEffect, useMemo } from "react";
import { ListDvecService, type ListDevProps } from "../services/ListDvecService";
import { DvecRow } from "./DvecRow";
import { EditDvec } from "./EditDvec";
import FormDvec from "./FormDvec";

export default function ListDvec() {
  const [dvecs, setDvecs] = useState<ListDevProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDvec, setEditingDvec] = useState<ListDevProps | null>(null);

  // 🎯 Estados dos Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQth, setSelectedQth] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");

  useEffect(() => {
    let isMounted = true;

    async function loadDvec() {
      try {
        const data = await ListDvecService();
        if (isMounted) setDvecs(data);
      } catch (error) {
        if (isMounted) {
          alert(error instanceof Error ? error.message : "Erro ao carregar lista.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDvec();
    return () => { isMounted = false; };
  }, []);

  // 🔍 1. Extrai a lista de QTHs únicos para popular o <select> automaticamente
  const uniqueQths = useMemo(() => {
    const qths = dvecs.map((item) => item.qth).filter(Boolean);
    return Array.from(new Set(qths)).sort();
  }, [dvecs]);

  // 🔍 2. Aplica todos os filtros na lista
  const filteredDvecs = useMemo(() => {
    return dvecs.filter((item) => {
      // Filtro de Busca (Frota ou Atividade)
      const matchesSearch =
        item.frota.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.atividade.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por QTH (Local)
      const matchesQth = selectedQth === "" || item.qth === selectedQth;

      // Filtro por Status (Instalação / Configuração)
      let matchesStatus = true;
      if (selectedStatus === "instalado") matchesStatus = item.status_instalacao;
      if (selectedStatus === "nao_instalado") matchesStatus = !item.status_instalacao;
      if (selectedStatus === "configurado") matchesStatus = item.status_configuracao;
      if (selectedStatus === "nao_configurado") matchesStatus = !item.status_configuracao;

      return matchesSearch && matchesQth && matchesStatus;
    });
  }, [dvecs, searchTerm, selectedQth, selectedStatus]);

  // 🧹 Função para limpar filtros
  function handleClearFilters() {
    setSearchTerm("");
    setSelectedQth("");
    setSelectedStatus("todos");
  }

  function handleAddSuccess(novoDvec: ListDevProps) {
    setDvecs((prev) => [novoDvec, ...prev]);
  }

  function handleDeleteSuccess(idDeletado: string) {
    setDvecs((prev) => prev.filter((item) => item.id !== idDeletado));
  }

  function handleEditSuccess(updatedDvec: ListDevProps) {
    setDvecs((prev) =>
      prev.map((item) => (item.id === updatedDvec.id ? updatedDvec : item))
    );
  }

  return (
    <div>
      {/* Formulário de Cadastro Integrado */}
      <FormDvec onSuccess={handleAddSuccess} />

      {/* 🔍 BARRA DE FILTROS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-md space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            🔍 Filtrar Equipamentos
          </span>
          {(searchTerm || selectedQth || selectedStatus !== "todos") && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-medium transition"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Busca por Frota / Atividade */}
          <div>
            <label className="block text-xs text-slate-400 mb-1">Buscar por Frota/Atividade</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: 8501 ou Transbordo..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Filtro por QTH (Local) */}
          <div>
            <label className="block text-xs text-slate-400 mb-1">QTH (Local)</label>
            <select
              value={selectedQth}
              onChange={(e) => setSelectedQth(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100 focus:border-blue-500 outline-none transition cursor-pointer"
            >
              <option value="">Todos os Locais</option>
              {uniqueQths.map((qth) => (
                <option key={qth} value={qth}>
                  QTH {qth}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Status */}
          <div>
            <label className="block text-xs text-slate-400 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-100 focus:border-blue-500 outline-none transition cursor-pointer"
            >
              <option value="todos">Todos os Status</option>
              <option value="instalado">✓ Apenas Instalados</option>
              <option value="nao_instalado">✕ Não Instalados</option>
              <option value="configurado">✓ Apenas Configurados</option>
              <option value="nao_configurado">✕ Não Configurados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cabeçalho da Lista com Contador */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-100">Equipamentos Cadastrados</h2>
        <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full">
          Exibindo: <strong className="text-slate-200">{filteredDvecs.length}</strong> de {dvecs.length}
        </span>
      </div>

      {/* RENDERIZAÇÃO DA LISTA */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
          Carregando frotas...
        </div>
      ) : filteredDvecs.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
          <p>Nenhum equipamento encontrado com os filtros selecionados.</p>
          {(searchTerm || selectedQth || selectedStatus !== "todos") && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-blue-400 hover:underline"
            >
              Clique aqui para limpar os filtros
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDvecs.map((item) => (
            <DvecRow
              key={item.id}
              item={item}
              onDeleteSuccess={handleDeleteSuccess}
              onEdit={(itemParaEditar) => setEditingDvec(itemParaEditar)}
            />
          ))}
        </div>
      )}

      {editingDvec && (
        <EditDvec
          dvec={editingDvec}
          onClose={() => setEditingDvec(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
