import { siteConfig } from '../config/env';
import { addConsulta } from '../services/consultasService';

export function registrarClickWhatsapp(loteId?: string) {
  addConsulta({ origen: 'whatsapp', loteId });
}

export function buildWhatsappUrl(mensaje: string): string {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${texto}`;
}

export function whatsappMensajeLote(numeroLote: string): string {
  return `Hola, quiero info del Lote ${numeroLote}`;
}

export function whatsappMensajeGeneral(): string {
  return `Hola, quiero más información sobre ${siteConfig.nombreProyecto}`;
}
