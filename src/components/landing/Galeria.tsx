import { BentoGrid, type FotoCarrusel } from '../ui/BentoGrid';

const fotosDesarrollo: FotoCarrusel[] = [
  { titulo: 'Vista aérea de la península', imagenUrl: '/images/gallery/aerea.jpg' },
  { titulo: 'Muelle y náutica', imagenUrl: '/images/gallery/muelle.jpg' },
  { titulo: 'Vista al lago', imagenUrl: '/images/gallery/lago.jpg' },
  { titulo: 'Club House', imagenUrl: '/images/gallery/club-house.jpg' },
  { titulo: 'Vivienda modelo', imagenUrl: '/images/gallery/vivienda-modelo.jpg' },
  { titulo: 'Parque lineal', imagenUrl: '/images/gallery/parque.jpg' },
];

const fotosVidaEnElLago: FotoCarrusel[] = [
  { titulo: 'El lago desde el aire', imagenUrl: '/images/lifestyle/aerea-lago.jpg' },
  { titulo: 'Vela en el lago', imagenUrl: '/images/lifestyle/vela.jpg' },
  { titulo: 'Club náutico', imagenUrl: '/images/lifestyle/club-nautico.jpg' },
  { titulo: 'Escuela de vela', imagenUrl: '/images/lifestyle/escuela-vela.jpg' },
  { titulo: 'Stand up paddle', imagenUrl: '/images/lifestyle/paddle.jpg' },
  { titulo: 'Muelle social', imagenUrl: '/images/lifestyle/muelle-social.jpg' },
  { titulo: 'Picnic junto al agua', imagenUrl: '/images/lifestyle/picnic.jpg' },
];

export function Galeria() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        Galería
      </span>
      <h2 className="mt-3 max-w-xl font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
        Conocé la península y la vida junto al lago.
      </h2>
      <p className="mt-3 max-w-xl text-slate-600">
        El desarrollo, el masterplan y todo lo que se vive a metros del agua.
      </p>

      <div className="mt-8">
        <BentoGrid
          heroFotos={fotosDesarrollo}
          secondaryFotos={fotosVidaEnElLago}
          stat={{ valor: '44', etiqueta: 'Lotes en el masterplan' }}
        />
      </div>
    </section>
  );
}
