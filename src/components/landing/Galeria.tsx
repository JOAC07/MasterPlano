import { useState } from 'react';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface FotoGaleria {
  titulo: string;
  imagenUrl: string;
}

const fotos: FotoGaleria[] = [
  { titulo: 'Vista aérea de la península', imagenUrl: '/images/gallery/aerea.jpg' },
  { titulo: 'Muelle y náutica', imagenUrl: '/images/gallery/muelle.jpg' },
  { titulo: 'Arroyo Las Tunas', imagenUrl: '/images/gallery/arroyo.jpg' },
  { titulo: 'Club House', imagenUrl: '/images/gallery/club-house.jpg' },
  { titulo: 'Vivienda modelo', imagenUrl: '/images/gallery/vivienda-modelo.jpg' },
  { titulo: 'Parque lineal', imagenUrl: '/images/gallery/parque.jpg' },
];

export function Galeria() {
  const [indice, setIndice] = useState(0);

  function anterior() {
    setIndice((i) => (i - 1 + fotos.length) % fotos.length);
  }
  function siguiente() {
    setIndice((i) => (i + 1) % fotos.length);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        Galería
      </span>
      <h2 className="mt-3 max-w-xl font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
        Conocé la península en imágenes.
      </h2>

      <div className="relative mt-8 overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${indice * 100}%)` }}
        >
          {fotos.map((foto) => (
            <div key={foto.titulo} className="relative w-full shrink-0">
              <ImageWithFallback
                src={foto.imagenUrl}
                alt={foto.titulo}
                label={foto.titulo}
                className="h-64 w-full object-cover text-lg sm:h-96"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4 font-[var(--font-display)] text-sm font-semibold text-white sm:text-base">
                {foto.titulo}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Foto anterior"
          onClick={anterior}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-md transition-colors hover:bg-white"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={siguiente}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-md transition-colors hover:bg-white"
        >
          ›
        </button>
      </div>

      <div className="mt-2 flex justify-center gap-1">
        {fotos.map((foto, i) => (
          <button
            key={foto.titulo}
            type="button"
            aria-label={`Ir a foto ${i + 1}`}
            onClick={() => setIndice(i)}
            className="flex h-9 w-9 items-center justify-center"
          >
            <span
              className={`h-2 rounded-full transition-all ${
                i === indice ? 'w-6 bg-brand-600' : 'w-2 bg-stone-100'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
