import type { Consulta, EstadoConsulta, OrigenConsulta } from '../types';

const STORAGE_KEY = 'loteo:consultas';

function seedConsultas(): Consulta[] {
  const ahora = Date.now();
  const diasAtras = (n: number) => new Date(ahora - n * 86_400_000).toISOString();
  return [
    {
      id: 'seed-1',
      nombre: 'Rocío Salinas',
      telefono: '+5491133344455',
      loteId: 'lote-005',
      origen: 'whatsapp',
      estado: 'contactado',
      createdAt: diasAtras(1),
    },
    {
      id: 'seed-2',
      nombre: 'Federico Blanco',
      email: 'fede.blanco@example.com',
      mensaje: 'Quiero saber si hay financiación en pesos.',
      origen: 'formulario',
      estado: 'nuevo',
      createdAt: diasAtras(2),
    },
    {
      id: 'seed-3',
      nombre: 'Lucía Paz',
      telefono: '+5491144455566',
      loteId: 'lote-003',
      origen: 'whatsapp',
      estado: 'cerrado',
      createdAt: diasAtras(6),
    },
  ];
}

function readAll(): Consulta[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = seedConsultas();
      writeAll(seed);
      return seed;
    }
    return JSON.parse(raw) as Consulta[];
  } catch {
    return [];
  }
}

function writeAll(consultas: Consulta[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consultas));
}

export function getConsultas(): Consulta[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addConsulta(input: {
  origen: OrigenConsulta;
  loteId?: string;
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
}): Consulta[] {
  const consultas = readAll();
  const nueva: Consulta = {
    id: `consulta-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    estado: 'nuevo',
    createdAt: new Date().toISOString(),
    ...input,
  };
  const actualizadas = [...consultas, nueva];
  writeAll(actualizadas);
  return getConsultas();
}

export function setConsultaEstado(id: string, estado: EstadoConsulta): Consulta[] {
  const actualizadas = readAll().map((c) => (c.id === id ? { ...c, estado } : c));
  writeAll(actualizadas);
  return getConsultas();
}
