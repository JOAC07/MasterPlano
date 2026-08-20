export type EstadoLote = 'disponible' | 'reservado' | 'vendido';

export interface ServiciosLote {
  agua: boolean;
  luz: boolean;
  gas: boolean;
  cloacas: boolean;
  internet: boolean;
  pavimento: boolean;
}

export interface Lote {
  id: string;
  etapa: string;
  numero: string;
  superficieM2: number;
  fos: number;
  fot: number;
  precioUsd: number;
  estado: EstadoLote;
  posesionAnio: number;
  descripcion: string;
  servicios: ServiciosLote;
  poligonoGeojson: GeoJSON.Polygon;
  imagenes: string[];
}

export type TipoPuntoInteres = 'render' | 'turistico' | 'amenity' | 'servicio';

export interface PuntoInteres {
  id: string;
  nombre: string;
  tipo: TipoPuntoInteres;
  lat: number;
  lng: number;
  imagenUrl: string;
  descripcion: string;
}

export type OrigenConsulta = 'whatsapp' | 'formulario';
export type EstadoConsulta = 'nuevo' | 'contactado' | 'cerrado';

export interface Consulta {
  id: string;
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  loteId?: string;
  origen: OrigenConsulta;
  estado: EstadoConsulta;
  createdAt: string;
}
