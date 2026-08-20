import { estadoColors, estadoLabels } from '../../lib/estadoColors';
import type { EstadoLote } from '../../types';

export function Badge({ estado }: { estado: EstadoLote }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
      style={{ backgroundColor: estadoColors[estado] }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {estadoLabels[estado]}
    </span>
  );
}
