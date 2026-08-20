import type { EstadoLote } from '../types';

export const estadoColors: Record<EstadoLote, string> = {
  disponible: '#3c9a6c',
  reservado: '#d4a94a',
  vendido: '#78716c',
};

export const estadoLabels: Record<EstadoLote, string> = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  vendido: 'Vendido',
};

// Expresión de Mapbox GL (tipado laxo a propósito: el spec de expresiones
// de mapbox-gl es demasiado estricto para una tupla heterogénea simple).
export const estadoColorExpression: unknown = [
  'match',
  ['get', 'estado'],
  'disponible',
  estadoColors.disponible,
  'reservado',
  estadoColors.reservado,
  'vendido',
  estadoColors.vendido,
  '#999999',
];
