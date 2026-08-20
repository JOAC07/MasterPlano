interface Testimonio {
  nombre: string;
  rol: string;
  texto: string;
}

const testimonios: Testimonio[] = [
  {
    nombre: 'Marcela Fernández',
    rol: 'Lote 005, Etapa 1',
    texto:
      'El proceso de reserva fue muy simple y todo lo coordinamos por WhatsApp. Ya tenemos la escritura del lote.',
  },
  {
    nombre: 'Diego Ibarra',
    rol: 'Lote 003, Etapa 1',
    texto:
      'Nos convenció el entorno con el arroyo y que los servicios ya estaban en el lote. La financiación en cuotas fue clave.',
  },
  {
    nombre: 'Sofía Ramos',
    rol: 'Lote 009, Etapa 2',
    texto:
      'Compramos en preventa a buen precio. El equipo respondió todas las consultas rápido y con mucha claridad.',
  },
];

export function Testimonios() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        Lo que dicen los propietarios
      </span>
      <h2 className="mt-3 max-w-xl font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
        Familias que ya eligieron su lote.
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {testimonios.map((t) => (
          <figure key={t.nombre} className="rounded-2xl border border-stone-100 p-6">
            <blockquote className="text-sm text-slate-600">“{t.texto}”</blockquote>
            <figcaption className="mt-4">
              <p className="font-[var(--font-display)] text-sm font-bold text-brand-950">
                {t.nombre}
              </p>
              <p className="text-xs text-slate-500">{t.rol}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
