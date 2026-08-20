import { useMemo, useState } from 'react';
import type { Consulta, EstadoConsulta, OrigenConsulta } from '../../types';

const ESTADOS: EstadoConsulta[] = ['nuevo', 'contactado', 'cerrado'];
const ORIGENES: OrigenConsulta[] = ['whatsapp', 'formulario'];

const estadoBadgeClass: Record<EstadoConsulta, string> = {
  nuevo: 'bg-brand-100 text-brand-700',
  contactado: 'bg-accent-100 text-accent-600',
  cerrado: 'bg-stone-100 text-slate-500',
};

interface ConsultasTableProps {
  consultas: Consulta[];
  onCambiarEstado: (id: string, estado: EstadoConsulta) => void;
}

export function ConsultasTable({ consultas, onCambiarEstado }: ConsultasTableProps) {
  const [filtroOrigen, setFiltroOrigen] = useState<OrigenConsulta | 'todos'>('todos');
  const [filtroEstado, setFiltroEstado] = useState<EstadoConsulta | 'todos'>('todos');

  const filtradas = useMemo(
    () =>
      consultas.filter(
        (c) =>
          (filtroOrigen === 'todos' || c.origen === filtroOrigen) &&
          (filtroEstado === 'todos' || c.estado === filtroEstado),
      ),
    [consultas, filtroOrigen, filtroEstado],
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={filtroOrigen}
          onChange={(e) => setFiltroOrigen(e.target.value as OrigenConsulta | 'todos')}
          className="rounded-lg border border-stone-100 px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          <option value="todos">Todos los orígenes</option>
          {ORIGENES.map((o) => (
            <option key={o} value={o}>
              {o === 'whatsapp' ? 'WhatsApp' : 'Formulario'}
            </option>
          ))}
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value as EstadoConsulta | 'todos')}
          className="rounded-lg border border-stone-100 px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          <option value="todos">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e[0].toUpperCase() + e.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stone-100">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-stone-100 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3">Lote</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Cambiar estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtradas.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
                  No hay consultas con estos filtros.
                </td>
              </tr>
            )}
            {filtradas.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(c.createdAt).toLocaleDateString('es-AR')}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-brand-950">{c.nombre ?? 'Sin nombre'}</p>
                  <p className="text-xs text-slate-500">{c.email ?? c.telefono ?? '—'}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {c.origen === 'whatsapp' ? 'WhatsApp' : 'Formulario'}
                </td>
                <td className="px-4 py-3 text-slate-600">{c.loteId ?? '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${estadoBadgeClass[c.estado]}`}
                  >
                    {c.estado}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={c.estado}
                    onChange={(e) => onCambiarEstado(c.id, e.target.value as EstadoConsulta)}
                    className="rounded-lg border border-stone-100 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
