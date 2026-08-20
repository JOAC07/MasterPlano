import { useEffect, useState } from 'react';
import * as lotesService from '../services/lotesService';
import type { EstadoLote, Lote } from '../types';

export function useLotes() {
  const [lotes, setLotes] = useState<Lote[]>(() => lotesService.getLotes());

  useEffect(() => {
    setLotes(lotesService.getLotes());
  }, []);

  function actualizarEstado(loteId: string, estado: EstadoLote) {
    setLotes(lotesService.setLoteEstado(loteId, estado));
  }

  const disponibles = lotes.filter((l) => l.estado === 'disponible').length;

  return { lotes, disponibles, total: lotes.length, actualizarEstado };
}
