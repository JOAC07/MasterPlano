import { lotes as lotesMock } from '../data/lotes';
import { supabase } from '../lib/supabaseClient';
import type { EstadoLote, Lote } from '../types';

const STORAGE_KEY = 'loteo:estados-lotes';
const TABLA_ESTADOS = 'lote_estados';

type EstadoOverrides = Record<string, EstadoLote>;

function readLocalOverrides(): EstadoOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EstadoOverrides) : {};
  } catch {
    return {};
  }
}

function writeLocalOverrides(overrides: EstadoOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function aplicarOverrides(overrides: EstadoOverrides): Lote[] {
  return lotesMock.map((lote) =>
    overrides[lote.id] ? { ...lote, estado: overrides[lote.id] } : lote,
  );
}

/**
 * Fuente de verdad de lotes para toda la app: contenido estático del mock
 * (data/lotes.ts) + estado dinámico (disponible/reservado/vendido).
 *
 * El estado vive en Supabase cuando está configurado (VITE_SUPABASE_URL +
 * VITE_SUPABASE_ANON_KEY), sincronizado en tiempo real entre visitantes.
 * Sin esas variables, cae de vuelta a localStorage (solo local al navegador).
 */
export async function getLotes(): Promise<Lote[]> {
  if (!supabase) {
    return aplicarOverrides(readLocalOverrides());
  }

  const { data, error } = await supabase.from(TABLA_ESTADOS).select('lote_id, estado');
  if (error || !data) {
    console.error('No se pudo leer el estado de los lotes desde Supabase', error);
    return aplicarOverrides(readLocalOverrides());
  }

  const overrides: EstadoOverrides = {};
  for (const fila of data) {
    overrides[fila.lote_id] = fila.estado as EstadoLote;
  }
  return aplicarOverrides(overrides);
}

export async function setLoteEstado(loteId: string, estado: EstadoLote): Promise<Lote[]> {
  if (!supabase) {
    const overrides = readLocalOverrides();
    overrides[loteId] = estado;
    writeLocalOverrides(overrides);
    return getLotes();
  }

  const { error } = await supabase
    .from(TABLA_ESTADOS)
    .upsert({ lote_id: loteId, estado, updated_at: new Date().toISOString() });
  if (error) {
    console.error('No se pudo actualizar el estado del lote en Supabase', error);
  }
  return getLotes();
}

/**
 * Se suscribe a cambios en tiempo real de la tabla de estados. Devuelve una
 * función para cancelar la suscripción. No hace nada si Supabase no está
 * configurado.
 */
export function suscribirseACambiosDeEstado(onCambio: () => void): () => void {
  const client = supabase;
  if (!client) return () => {};

  const canal = client
    .channel('lote_estados_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: TABLA_ESTADOS }, onCambio)
    .subscribe();

  return () => {
    client.removeChannel(canal);
  };
}
