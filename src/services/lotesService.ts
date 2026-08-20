import { lotes as lotesMock } from '../data/lotes';
import type { EstadoLote, Lote } from '../types';

const STORAGE_KEY = 'loteo:estados-lotes';

type EstadoOverrides = Record<string, EstadoLote>;

function readOverrides(): EstadoOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EstadoOverrides) : {};
  } catch {
    return {};
  }
}

function writeOverrides(overrides: EstadoOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

/**
 * Fuente de verdad de lotes para toda la app: mock local + overrides de
 * estado guardados en localStorage. El día que haya API real, solo se
 * reescribe este archivo.
 */
export function getLotes(): Lote[] {
  const overrides = readOverrides();
  return lotesMock.map((lote) =>
    overrides[lote.id] ? { ...lote, estado: overrides[lote.id] } : lote,
  );
}

export function setLoteEstado(loteId: string, estado: EstadoLote): Lote[] {
  const overrides = readOverrides();
  overrides[loteId] = estado;
  writeOverrides(overrides);
  return getLotes();
}
