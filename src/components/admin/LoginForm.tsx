import { useState } from 'react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/env';

interface LoginFormProps {
  onLogin: (usuario: string, password: string) => boolean;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = onLogin(usuario, password);
    setError(!ok);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-950 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
          {siteConfig.nombreProyecto}
        </p>
        <h1 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-brand-950">
          Ingreso al panel
        </h1>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            autoFocus
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full rounded-xl border border-stone-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-stone-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">Usuario o contraseña incorrectos.</p>
        )}

        <Button type="submit" variant="primary" className="mt-6 w-full">
          Ingresar
        </Button>
      </form>
    </main>
  );
}
