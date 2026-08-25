interface Stat {
  valor: string;
  etiqueta: string;
}

const stats: Stat[] = [
  { valor: '12+', etiqueta: 'Hectáreas desarrolladas' },
  { valor: '80+', etiqueta: 'Familias ya reservaron' },
  { valor: '6', etiqueta: 'Etapas en desarrollo' },
  { valor: '100%', etiqueta: 'Con escritura' },
];

export function StatsBar() {
  return (
    <section className="border-b border-stone-100 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.etiqueta} className="text-center sm:text-left">
            <p className="font-[var(--font-display)] text-3xl font-extrabold text-brand-900">
              {stat.valor}
            </p>
            <p className="mt-1 text-sm text-slate-500">{stat.etiqueta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
