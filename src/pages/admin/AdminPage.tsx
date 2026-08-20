import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLotes } from '../../hooks/useLotes';
import { useConsultas } from '../../hooks/useConsultas';
import { LoginForm } from '../../components/admin/LoginForm';
import { LotesTable } from '../../components/admin/LotesTable';
import { ConsultasTable } from '../../components/admin/ConsultasTable';
import { Metricas } from '../../components/admin/Metricas';
import { siteConfig } from '../../config/env';

type Tab = 'lotes' | 'consultas';

export function AdminPage() {
  const { isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return <AdminDashboard onLogout={logout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('lotes');
  const { lotes, actualizarEstado } = useLotes();
  const { consultas, actualizarEstado: actualizarEstadoConsulta } = useConsultas();

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-stone-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
              {siteConfig.nombreProyecto}
            </p>
            <h1 className="font-[var(--font-display)] text-xl font-bold text-brand-950">
              Panel de administración
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="rounded-full border border-stone-100 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-stone-100"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <Metricas lotes={lotes} consultas={consultas} />

        <div className="mt-8 flex gap-2 border-b border-stone-100">
          <TabButton active={tab === 'lotes'} onClick={() => setTab('lotes')}>
            Lotes
          </TabButton>
          <TabButton active={tab === 'consultas'} onClick={() => setTab('consultas')}>
            Consultas
          </TabButton>
        </div>

        <div className="mt-6">
          {tab === 'lotes' ? (
            <LotesTable lotes={lotes} onCambiarEstado={actualizarEstado} />
          ) : (
            <ConsultasTable consultas={consultas} onCambiarEstado={actualizarEstadoConsulta} />
          )}
        </div>
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? 'border-brand-600 text-brand-900'
          : 'border-transparent text-slate-500 hover:text-brand-700'
      }`}
    >
      {children}
    </button>
  );
}
