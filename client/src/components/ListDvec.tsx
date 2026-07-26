import { useState, useEffect, useMemo } from "react";
import { ListDvecService, type ListDevProps } from "../services/ListDvecService";
import { DvecRow } from "./DvecRow";
import { EditDvec } from "./EditDvec";
import FormDvec from "./FormDvec";

export default function ListDvec() {
  const [dvecs, setDvecs] = useState<ListDevProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDvec, setEditingDvec] = useState<ListDevProps | null>(null);

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
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = dvecs.length;
    const instalados = dvecs.filter((item) => item.status_instalacao).length;
    const pendentesInstalacao = total - instalados;
    const configurados = dvecs.filter((item) => item.status_configuracao).length;
    const pendentesConfiguracao = total - configurados;

    return {
      total,
      instalados,
      pendentesInstalacao,
      configurados,
      pendentesConfiguracao,
    };
  }, [dvecs]);

  // 🔍 2. QTHs únicos para o select
  const uniqueQths = useMemo(() => {
    const qths = dvecs.map((item) => item.qth).filter(Boolean);
    return Array.from(new Set(qths)).sort();
  }, [dvecs]);

  // 🔍 3. Filtro dos equipamentos
  const filteredDvecs = useMemo(() => {
    return dvecs.filter((item) => {
      const matchesSearch =
        item.frota.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.atividade.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesQth = selectedQth === "" || item.qth === selectedQth;

      let matchesStatus = true;
      if (selectedStatus === "instalado") matchesStatus = item.status_instalacao;
      if (selectedStatus === "nao_instalado") matchesStatus = !item.status_instalacao;
      if (selectedStatus === "configurado") matchesStatus = item.status_configuracao;
      if (selectedStatus === "nao_configurado") matchesStatus = !item.status_configuracao;

      return matchesSearch && matchesQth && matchesStatus;
    });
  }, [dvecs, searchTerm, selectedQth, selectedStatus]);

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
      {/* Formulário de Cadastro */}
      <FormDvec onSuccess={handleAddSuccess} />

      {/* 📊 PAINEL DE MÉTRICAS / RESUMO DO RELATÓRIO */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {/* Total de Frotas */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Frotas
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-slate-100">{stats.total}</span>
            <span className="text-sm">🚛</span>
          </div>
        </div>

        {/* Instalados */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Instalados
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400">{stats.instalados}</span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
              ✓ OK
            </span>
          </div>
        </div>

        {/* Instalação Pendente */}
        <div className="bg-slate-900 border border-rose-500/20 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            Inst. Pendentes
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-rose-400">{stats.pendentesInstalacao}</span>
            <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20 font-medium">
              ✕ Pendente
            </span>
          </div>
        </div>

        {/* Configurados */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Configurados
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-cyan-400">{stats.configurados}</span>
            <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 font-medium">
              ⚙️ OK
            </span>
          </div>
        </div>

        {/* Configuração Pendente */}
        <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Config. Pendentes
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-amber-400">{stats.pendentesConfiguracao}</span>
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
              ⏳ Pendente
            </span>
          </div>
        </div>
      </div>

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

      {/* CABEÇALHO DA LISTA */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-100">Equipamentos Cadastrados</h2>
        <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full">
          Exibindo <strong className="text-slate-200">{filteredDvecs.length}</strong> de {dvecs.length}
        </span>
      </div>

      {/* RENDERIZAÇÃO DA LISTA */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
          Carregando frotas...
        </div>
      ) : filteredDvecs.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
          <p>Nenhum equipamento encontrado.</p>
          {(searchTerm || selectedQth || selectedStatus !== "todos") && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-blue-400 hover:underline"
            >
              Limpar filtros
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
