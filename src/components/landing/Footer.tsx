import { siteConfig } from '../../config/env';

export function Footer() {
  return (
    <footer className="bg-brand-900 px-6 py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="font-[var(--font-display)] text-lg font-bold text-white">
            {siteConfig.nombreProyecto}
          </p>
          <p className="mt-2 max-w-xs text-sm">
            Loteo frente al lago, con escritura inmediata y servicios, a
            minutos de la ciudad.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Contacto</p>
          <p className="mt-2">WhatsApp: +{siteConfig.whatsappNumero}</p>
          <p>info@loteodellago.com</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Legales</p>
          <p className="mt-2 max-w-xs text-white/50">
            Precios en dólares estadounidenses (USD). Imágenes ilustrativas.
            Superficies y disponibilidad sujetas a confirmación.
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.nombreProyecto}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
