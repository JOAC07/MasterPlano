import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '../../hooks/useMapbox';
import { FichaLote } from './FichaLote';
import { puntosInteres } from '../../data/lotes';
import { siteConfig } from '../../config/env';
import { estadoColors, estadoLabels } from '../../lib/estadoColors';
import type { EstadoLote, Lote } from '../../types';

interface MasterplanProps {
  lotes: Lote[];
  disponibles: number;
  total: number;
}

const CENTRO_LOTEO: [number, number] = [-58.64111, -34.42152];
const ESTADOS: EstadoLote[] = ['disponible', 'reservado', 'vendido'];

export function Masterplan({ lotes, disponibles, total }: MasterplanProps) {
  const [selectedLoteId, setSelectedLoteId] = useState<string | null>(null);
  const selectedLote = lotes.find((l) => l.id === selectedLoteId) ?? null;
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  useEffect(() => {
    if (!pantallaCompleta) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPantallaCompleta(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [pantallaCompleta]);

  const { containerRef, resize } = useMapbox({
    token: siteConfig.mapboxToken,
    lotes,
    puntosInteres,
    center: CENTRO_LOTEO,
    zoom: 17.4,
    onLoteClick: setSelectedLoteId,
  });

  useEffect(() => {
    resize();
  }, [pantallaCompleta, resize]);

  return (
    <section id="masterplan" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
            Masterplan interactivo
          </span>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
            Elegí tu lote frente al lago.
          </h2>
        </div>
        <p className="font-[var(--font-display)] text-lg font-bold text-brand-900">
          Lotes disponibles: <span className="text-brand-600">{disponibles}</span> / {total}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500">
        {ESTADOS.map((estado) => (
          <span key={estado} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: estadoColors[estado] }}
            />
            {estadoLabels[estado]}
          </span>
        ))}
      </div>

      <div
        className={
          pantallaCompleta
            ? 'fixed inset-0 z-[100] h-screen w-screen'
            : 'relative mt-4 h-[480px] w-full overflow-hidden rounded-2xl border border-stone-100'
        }
      >
        {siteConfig.mapboxToken ? (
          <div ref={containerRef} className="h-full w-full" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-stone-100 px-6 text-center">
            <p className="font-semibold text-brand-950">Falta configurar el token de Mapbox</p>
            <p className="max-w-sm text-sm text-slate-500">
              Agregá <code className="rounded bg-white px-1.5 py-0.5">VITE_MAPBOX_TOKEN</code>{' '}
              en un archivo <code className="rounded bg-white px-1.5 py-0.5">.env.local</code>{' '}
              para ver el mapa satelital.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setPantallaCompleta((v) => !v)}
          aria-label={pantallaCompleta ? 'Salir de pantalla completa' : 'Pantalla completa'}
          className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-md bg-white text-brand-950 shadow-md transition-colors hover:bg-brand-50"
        >
          {pantallaCompleta ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          )}
        </button>
      </div>

      <FichaLote lote={selectedLote} onClose={() => setSelectedLoteId(null)} />
    </section>
  );
}
