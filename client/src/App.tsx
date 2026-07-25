import ListDvec from "./components/ListDvec";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar Superior */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl">
              🚛
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-100">DVEC System</h1>
              <p className="text-xs text-slate-400">Gestão de Frotas e Equipamentos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8">
        <ListDvec />
      </main>
    </div>
  );
}