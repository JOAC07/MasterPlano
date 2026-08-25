interface Pregunta {
  pregunta: string;
  respuesta: string;
}

const preguntas: Pregunta[] = [
  {
    pregunta: '¿Los lotes tienen escritura?',
    respuesta:
      'Sí, todos los lotes se entregan con escritura a nombre del comprador, gestionada por la desarrolladora sin costo adicional de intermediación.',
  },
  {
    pregunta: '¿Qué servicios tiene cada lote?',
    respuesta:
      'Los lotes de las Etapas 1 y 2, frente al lago principal, cuentan con agua, luz, cloacas, internet y pavimento. Las etapas 3 a 6 están en desarrollo: agua y luz ya disponibles, el resto se incorpora progresivamente durante 2027-2028.',
  },
  {
    pregunta: '¿Cómo funciona la financiación?',
    respuesta:
      'Ofrecemos planes propios en cuotas, en pesos o dólares, sin necesidad de créditos bancarios ni verificación de ingresos. Los detalles se coordinan por WhatsApp según el lote elegido.',
  },
  {
    pregunta: '¿Puedo reservar un lote a distancia?',
    respuesta:
      'Sí. Todo el proceso de consulta, reserva y seguimiento se puede hacer por WhatsApp, y coordinamos una visita presencial antes de la firma si preferís conocer el lote in situ.',
  },
  {
    pregunta: '¿Qué pasa si el lote que quiero está reservado?',
    respuesta:
      'Podés dejarnos tus datos para avisarte si vuelve a estar disponible, o te sugerimos lotes similares dentro de la misma etapa.',
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        Preguntas frecuentes
      </span>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
        Todo lo que querés saber antes de reservar.
      </h2>

      <div className="mt-8 divide-y divide-stone-100 border-y border-stone-100">
        {preguntas.map((p) => (
          <details key={p.pregunta} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-[var(--font-display)] font-semibold text-brand-950">
              {p.pregunta}
              <span className="shrink-0 text-xl text-accent-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-5 pt-1 text-sm text-slate-600">{p.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
