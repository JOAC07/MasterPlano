import { useEffect, useState } from 'react';
import * as consultasService from '../services/consultasService';
import type { Consulta, EstadoConsulta, OrigenConsulta } from '../types';

export function useConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>(() => consultasService.getConsultas());

  useEffect(() => {
    setConsultas(consultasService.getConsultas());
  }, []);

  function registrarConsulta(input: {
    origen: OrigenConsulta;
    loteId?: string;
    nombre?: string;
    email?: string;
    telefono?: string;
    mensaje?: string;
  }) {
    setConsultas(consultasService.addConsulta(input));
  }

  function actualizarEstado(id: string, estado: EstadoConsulta) {
    setConsultas(consultasService.setConsultaEstado(id, estado));
  }

  return { consultas, registrarConsulta, actualizarEstado };
}
