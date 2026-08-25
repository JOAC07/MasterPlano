import { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';

export interface FotoCarrusel {
  titulo: string;
  imagenUrl: string;
}

interface BentoStat {
  valor: string;
  etiqueta: string;
}

interface BentoGridProps {
  heroFotos: FotoCarrusel[];
  secondaryFotos: FotoCarrusel[];
  stat: BentoStat;
}

export function BentoGrid({ heroFotos, secondaryFotos, stat }: BentoGridProps) {
  return (
    <div className="grid h-[520px] grid-rows-[3fr_2fr] gap-3 sm:h-[640px]">
      <CarruselCelda fotos={heroFotos} arrowSize="h-10 w-10 text-lg" textSize="text-sm sm:text-base" />

      <div className="grid min-h-0 grid-cols-[2fr_3fr] gap-3">
        <div className="flex min-h-0 flex-col items-center justify-center gap-3 rounded-3xl bg-[#CBFF3D] p-4 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-950">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-[var(--font-display)] text-4xl font-extrabold leading-none text-brand-950 sm:text-5xl">
            {stat.valor}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-950/70 sm:text-sm">
            {stat.etiqueta}
          </p>
        </div>

        <CarruselCelda fotos={secondaryFotos} arrowSize="h-8 w-8 text-base" textSize="text-xs sm:text-sm" />
      </div>
    </div>
  );
}

function CarruselCelda({
  fotos,
  arrowSize,
  textSize,
}: {
  fotos: FotoCarrusel[];
  arrowSize: string;
  textSize: string;
}) {
  const [indice, setIndice] = useState(0);
  const foto = fotos[indice];

  function anterior() {
    setIndice((i) => (i - 1 + fotos.length) % fotos.length);
  }
  function siguiente() {
    setIndice((i) => (i + 1) % fotos.length);
  }

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-3xl">
      <ImageWithFallback
        src={foto.imagenUrl}
        alt={foto.titulo}
        label={foto.titulo}
        className="h-full min-h-0 w-full object-cover text-base"
      />
      <p
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2 font-[var(--font-display)] font-semibold text-white ${textSize}`}
      >
        {foto.titulo}
      </p>

      {fotos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={anterior}
            className={`absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-md transition-colors hover:bg-white ${arrowSize}`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={siguiente}
            className={`absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-md transition-colors hover:bg-white ${arrowSize}`}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
