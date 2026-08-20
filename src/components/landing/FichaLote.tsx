import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { buildWhatsappUrl, registrarClickWhatsapp, whatsappMensajeLote } from '../../lib/whatsapp';
import type { Lote } from '../../types';

const servicioLabels: Record<keyof Lote['servicios'], string> = {
  agua: 'Agua',
  luz: 'Luz',
  gas: 'Gas',
  cloacas: 'Cloacas',
  internet: 'Internet',
  pavimento: 'Pavimento',
};

interface FichaLoteProps {
  lote: Lote | null;
  onClose: () => void;
}

export function FichaLote({ lote, onClose }: FichaLoteProps) {
  return (
    <Modal open={lote !== null} onClose={onClose}>
      {lote && (
        <div>
          <GaleriaLote imagenes={lote.imagenes} numero={lote.numero} />

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {lote.etapa}
                </p>
                <h3 className="font-[var(--font-display)] text-2xl font-extrabold text-brand-950">
                  Lote {lote.numero}
                </h3>
              </div>
              <Badge estado={lote.estado} />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-stone-100 py-5 text-sm">
              <div>
                <dt className="text-slate-500">Superficie</dt>
                <dd className="font-semibold text-brand-950">{lote.superficieM2} m²</dd>
              </div>
              <div>
                <dt className="text-slate-500">Precio</dt>
                <dd className="font-semibold text-brand-950">
                  USD {lote.precioUsd.toLocaleString('en-US')}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">FOS / FOT</dt>
                <dd className="font-semibold text-brand-950">
                  {lote.fos} / {lote.fot}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Posesión</dt>
                <dd className="font-semibold text-brand-950">{lote.posesionAnio}</dd>
              </div>
            </dl>

            <p className="mt-4 text-sm text-slate-600">{lote.descripcion}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(lote.servicios) as Array<keyof Lote['servicios']>)
                .filter((key) => lote.servicios[key])
                .map((key) => (
                  <span
                    key={key}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                  >
                    {servicioLabels[key]}
                  </span>
                ))}
            </div>

            <Button
              as="a"
              variant="primary"
              className="mt-6 w-full"
              href={buildWhatsappUrl(whatsappMensajeLote(lote.numero))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => registrarClickWhatsapp(lote.id)}
            >
              Consultar Lote {lote.numero} por WhatsApp
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function GaleriaLote({ imagenes, numero }: { imagenes: string[]; numero: string }) {
  const lista = imagenes.length > 0 ? imagenes : ['__placeholder__'];

  return (
    <div className="flex gap-1 overflow-x-auto sm:rounded-t-3xl">
      {lista.map((src, i) => (
        <ImageWithFallback
          key={src === '__placeholder__' ? i : src}
          src={src}
          alt={`Lote ${numero}`}
          label={`Lote ${numero}`}
          className="h-48 w-full shrink-0 object-cover text-lg sm:rounded-t-3xl"
        />
      ))}
    </div>
  );
}
