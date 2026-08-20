export function SobreElProyecto() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
            Sobre el proyecto
          </span>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-extrabold leading-tight text-brand-950 sm:text-4xl">
            Un barrio pensado para vivir cerca del bosque.
          </h2>
          <p className="mt-4 text-slate-600">
            Costanera del Bosque combina lotes con todos los servicios,
            espacios verdes y una laguna central en un entorno natural a
            minutos de la ciudad. Desarrollado con escrituración inmediata y
            financiación propia, pensado para quienes buscan invertir o
            construir su próxima casa.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-6 rounded-2xl bg-brand-50 p-8">
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-700">
              Desde
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold text-brand-950">
              2024
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-700">
              Superficie
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold text-brand-950">
              12+ ha
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-700">
              Etapas
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold text-brand-950">
              2
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-700">
              Escrituración
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold text-brand-950">
              Inmediata
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
