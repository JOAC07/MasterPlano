import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import type { Lote, PuntoInteres } from '../types';
import { estadoColorExpression } from '../lib/estadoColors';

interface UseMapboxOptions {
  token: string;
  lotes: Lote[];
  puntosInteres: PuntoInteres[];
  center: [number, number];
  zoom?: number;
  onLoteClick: (loteId: string) => void;
}

const LOTES_SOURCE_ID = 'lotes-source';
const LOTES_FILL_LAYER_ID = 'lotes-fill';
const LOTES_LINE_LAYER_ID = 'lotes-line';

const poiColors: Record<PuntoInteres['tipo'], string> = {
  render: '#d4a94a',
  turistico: '#3c9a6c',
  amenity: '#7fb3d9',
  servicio: '#a8a29e',
};

class ResetViewControl implements mapboxgl.IControl {
  private container?: HTMLDivElement;
  private center: [number, number];
  private zoom: number;

  constructor(center: [number, number], zoom: number) {
    this.center = center;
    this.zoom = zoom;
  }

  onAdd(map: mapboxgl.Map) {
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    const button = document.createElement('button');
    button.type = 'button';
    button.title = 'Restablecer zoom';
    button.setAttribute('aria-label', 'Restablecer zoom');
    button.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin:auto"><path d="M3 12a9 9 0 1 1 3 6.7" /><path d="M3 17v-5h5" /></svg>';
    button.style.display = 'flex';
    button.onclick = () => {
      map.flyTo({ center: this.center, zoom: this.zoom, bearing: 0, pitch: 0 });
    };

    this.container.appendChild(button);
    return this.container;
  }

  onRemove() {
    this.container?.parentNode?.removeChild(this.container);
  }
}

function lotesToFeatureCollection(lotes: Lote[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: lotes.map((lote) => ({
      type: 'Feature',
      geometry: lote.poligonoGeojson,
      properties: { id: lote.id, estado: lote.estado, numero: lote.numero },
    })),
  };
}

export function useMapbox({
  token,
  lotes,
  puntosInteres,
  center,
  zoom = 17,
  onLoteClick,
}: UseMapboxOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const onLoteClickRef = useRef(onLoteClick);
  onLoteClickRef.current = onLoteClick;

  useEffect(() => {
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center,
      zoom,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new ResetViewControl(center, zoom), 'top-right');

    map.on('load', () => {
      map.addSource(LOTES_SOURCE_ID, {
        type: 'geojson',
        data: lotesToFeatureCollection(lotes),
      });

      map.addLayer({
        id: LOTES_FILL_LAYER_ID,
        type: 'fill',
        source: LOTES_SOURCE_ID,
        paint: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          'fill-color': estadoColorExpression as any,
          'fill-opacity': 0.55,
        },
      });

      map.addLayer({
        id: LOTES_LINE_LAYER_ID,
        type: 'line',
        source: LOTES_SOURCE_ID,
        paint: {
          'line-color': '#ffffff',
          'line-width': 2,
        },
      });

      map.on('click', LOTES_FILL_LAYER_ID, (e) => {
        const id = e.features?.[0]?.properties?.id;
        if (id) onLoteClickRef.current(id);
      });
      map.on('mouseenter', LOTES_FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', LOTES_FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = '';
      });

      for (const poi of puntosInteres) {
        const popup = new mapboxgl.Popup({ offset: 16 }).setHTML(
          `<div style="max-width:220px">
            <img src="${poi.imagenUrl}" alt="${poi.nombre}" style="width:100%;height:110px;object-fit:cover;border-radius:8px" onerror="this.style.display='none'" />
            <p style="margin:8px 0 2px;font-weight:700;font-size:13px">${poi.nombre}</p>
            <p style="margin:0;font-size:12px;color:#555">${poi.descripcion}</p>
          </div>`,
        );

        const el = document.createElement('div');
        el.style.width = '16px';
        el.style.height = '16px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.background = poiColors[poi.tipo];
        el.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.25)';
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([poi.lng, poi.lat])
          .setPopup(popup)
          .addTo(map);
        markersRef.current.push(marker);
      }
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
    // El mapa se inicializa una sola vez; lotes/puntosInteres/center/zoom
    // iniciales alcanzan, cambios posteriores de lotes se sincronizan abajo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const source = map.getSource(LOTES_SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
    source?.setData(lotesToFeatureCollection(lotes));
  }, [lotes]);

  function resize() {
    mapRef.current?.resize();
  }

  return { containerRef, resize };
}
