/**
 * Resuelve una ruta absoluta de /public (ej: "/images/foo.jpg") contra el
 * BASE_URL configurado en Vite. Necesario porque GitHub Pages sirve el sitio
 * bajo un subpath (/MasterPlano/), no en la raíz del dominio.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
