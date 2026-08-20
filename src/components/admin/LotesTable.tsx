import { estadoLabels } from '../../lib/estadoColors';
import { Badge } from '../ui/Badge';
import type { EstadoLote, Lote } from '../../types';

const ESTADOS: EstadoLote[] = ['disponible', 'reservado', 'vendido'];

interface LotesTableProps {
  lotes: Lote[];
  onCambiarEstado: (loteId: string, estado: EstadoLote) => void;
}

export function LotesTable({ lotes, onCambiarEstado }: LotesTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-100">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-stone-100 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Lote</th>
            <th className="px-4 py-3">Etapa</th>
            <th className="px-4 py-3">Superficie</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Cambiar estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {lotes.map((lote) => (
            <tr key={lote.id}>
              <td className="px-4 py-3 font-semibold text-brand-950">Lote {lote.numero}</td>
              <td className="px-4 py-3 text-slate-600">{lote.etapa}</td>
              <td className="px-4 py-3 text-slate-600">{lote.superficieM2} m²</td>
              <td className="px-4 py-3 text-slate-600">
                USD {lote.precioUsd.toLocaleString('en-US')}
              </td>
              <td className="px-4 py-3">
                <Badge estado={lote.estado} />
              </td>
              <td className="px-4 py-3">
                <select
                  value={lote.estado}
                  onChange={(e) => onCambiarEstado(lote.id, e.target.value as EstadoLote)}
                  className="rounded-lg border border-stone-100 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
                >
                  {ESTADOS.map((estado) => (
                    <option key={estado} value={estado}>
                      {estadoLabels[estado]}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
