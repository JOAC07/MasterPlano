import { useCallback, useEffect, useState } from 'react';
import * as lotesService from '../services/lotesService';
import { lotes as lotesMock } from '../data/lotes';
import type { EstadoLote, Lote } from '../types';

export function useLotes() {
  // Se inicializa con el mock sin overrides para que la primera pintura no
  // muestre 0/0 mientras se resuelve la carga async.
  const [lotes, setLotes] = useState<Lote[]>(lotesMock);

  const recargar = useCallback(() => {
    lotesService.getLotes().then(setLotes);
  }, []);

  useEffect(() => {
    recargar();
    return lotesService.suscribirseACambiosDeEstado(recargar);
  }, [recargar]);

  async function actualizarEstado(loteId: string, estado: EstadoLote) {
    const actualizados = await lotesService.setLoteEstado(loteId, estado);
    setLotes(actualizados);
  }

  const disponibles = lotes.filter((l) => l.estado === 'disponible').length;

  return { lotes, disponibles, total: lotes.length, actualizarEstado };
}
