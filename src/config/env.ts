export const siteConfig = {
  nombreProyecto: 'Loteo del Lago',
  whatsappNumero: import.meta.env.VITE_WHATSAPP_NUMERO ?? '5491100000000',
  mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN ?? '',
  adminUsuario: import.meta.env.VITE_ADMIN_USER ?? 'admin',
  adminPassword: import.meta.env.VITE_ADMIN_PASS ?? 'admin123',
};
