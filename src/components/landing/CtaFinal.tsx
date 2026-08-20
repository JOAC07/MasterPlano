import { Button } from '../ui/Button';
import { buildWhatsappUrl, registrarClickWhatsapp, whatsappMensajeGeneral } from '../../lib/whatsapp';

export function CtaFinal() {
  return (
    <section className="bg-brand-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h2 className="font-[var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Quedan pocos lotes disponibles en la Etapa 1.
        </h2>
        <p className="max-w-xl text-white/70">
          Reservá el tuyo hoy y aseguralo con la mejor ubicación dentro del
          masterplan.
        </p>
        <Button
          as="a"
          variant="primary"
          href={buildWhatsappUrl(whatsappMensajeGeneral())}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => registrarClickWhatsapp()}
        >
          Consultar por WhatsApp
        </Button>
      </div>
    </section>
  );
}
