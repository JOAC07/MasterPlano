interface Feature {
  numero: string;
  titulo: string;
  descripcion: string;
  bg: string;
}

const features: Feature[] = [
  {
    numero: '01',
    titulo: 'Escrituración inmediata',
    descripcion:
      'Cada lote se entrega con escritura a nombre del comprador, sin intermediarios ni demoras.',
    bg: 'bg-brand-100',
  },
  {
    numero: '02',
    titulo: 'Servicios en el lote',
    descripcion:
      'Agua, luz y cloacas llegan hasta el frente de cada lote de la Etapa 1, listos para construir.',
    bg: 'bg-sky-100',
  },
  {
    numero: '03',
    titulo: 'Financiación propia',
    descripcion:
      'Planes de pago en cuotas en pesos y dólares, sin bancos ni requisitos de ingresos.',
    bg: 'bg-accent-100',
  },
  {
    numero: '04',
    titulo: 'Entorno natural',
    descripcion:
      'Laguna central, parque lineal y forestación nativa a metros de cada lote.',
    bg: 'bg-stone-100',
  },
];

export function PorQueInvertir() {
  return (
    <section className="bg-brand-950/[0.02] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
          Por qué invertir acá
        </span>
        <h2 className="mt-3 max-w-xl font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
          Todo lo que necesitás para decidirte, sin sorpresas.
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.numero} className={`rounded-2xl p-6 ${f.bg}`}>
              <span className="font-[var(--font-display)] text-sm font-bold text-brand-700">
                {f.numero}
              </span>
              <h3 className="mt-3 font-[var(--font-display)] text-lg font-bold text-brand-950">
                {f.titulo}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{f.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
