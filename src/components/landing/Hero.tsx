import { Button } from '../ui/Button';
import { buildWhatsappUrl, registrarClickWhatsapp, whatsappMensajeGeneral } from '../../lib/whatsapp';
import { siteConfig } from '../../config/env';

interface HeroProps {
  lotesDisponibles: number;
  lotesTotales: number;
  onVerMasterplan: () => void;
}

export function Hero({ lotesDisponibles, lotesTotales, onVerMasterplan }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/85 to-brand-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,169,74,0.22),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 sm:py-28">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-400">
          Preventa abierta &middot; {siteConfig.nombreProyecto}
        </span>

        <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Tu lote frente al lago,
          <br className="hidden sm:block" /> a un click de reservarlo.
        </h1>

        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Lotes con escritura, servicios y masterplan interactivo para elegir
          la mejor ubicación frente al agua. Consultá disponibilidad en
          tiempo real y reservá el tuyo hoy.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" onClick={onVerMasterplan}>
            Ver masterplan
          </Button>
          <Button
            as="a"
            variant="ghost"
            href={buildWhatsappUrl(whatsappMensajeGeneral())}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => registrarClickWhatsapp()}
          >
            Consultar por WhatsApp
          </Button>
        </div>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/50">
              Lotes disponibles
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold text-accent-400">
              {lotesDisponibles} / {lotesTotales}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/50">
              Posesión
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold">
              2026
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/50">
              Servicios
            </dt>
            <dd className="font-[var(--font-display)] text-2xl font-bold">
              Agua &middot; Luz &middot; Cloacas
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
