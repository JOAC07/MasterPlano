import type { Consulta, Lote } from '../../types';

interface MetricasProps {
  lotes: Lote[];
  consultas: Consulta[];
}

function contarDesde(consultas: Consulta[], diasAtras: number): number {
  const limite = Date.now() - diasAtras * 86_400_000;
  return consultas.filter((c) => new Date(c.createdAt).getTime() >= limite).length;
}

export function Metricas({ lotes, consultas }: MetricasProps) {
  const disponibles = lotes.filter((l) => l.estado === 'disponible').length;
  const reservados = lotes.filter((l) => l.estado === 'reservado').length;
  const vendidos = lotes.filter((l) => l.estado === 'vendido').length;

  const items = [
    { label: 'Disponibles', value: disponibles },
    { label: 'Reservados', value: reservados },
    { label: 'Vendidos', value: vendidos },
    { label: 'Consultas hoy', value: contarDesde(consultas, 1) },
    { label: 'Consultas 7 días', value: contarDesde(consultas, 7) },
    { label: 'Consultas totales', value: consultas.length },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-stone-100 p-4">
          <p className="font-[var(--font-display)] text-2xl font-bold text-brand-950">
            {item.value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
