import { useState } from 'react';
import { Button } from '../ui/Button';
import { addConsulta } from '../../services/consultasService';

export function ContactoForm() {
  const [enviado, setEnviado] = useState(false);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const esEmail = contacto.includes('@');
    addConsulta({
      origen: 'formulario',
      nombre: nombre || undefined,
      email: esEmail ? contacto : undefined,
      telefono: esEmail ? undefined : contacto || undefined,
      mensaje: mensaje || undefined,
    });
    setEnviado(true);
  }

  if (enviado) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20 text-center">
        <p className="font-[var(--font-display)] text-2xl font-bold text-brand-950">
          ¡Gracias, {nombre || 'recibimos tu consulta'}!
        </p>
        <p className="mt-2 text-slate-600">
          Te vamos a contactar a la brevedad.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        Contacto
      </span>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl font-extrabold text-brand-950 sm:text-4xl">
        ¿Preferís que te escribamos nosotros?
      </h2>
      <p className="mt-3 text-slate-600">
        Dejanos tus datos y te contactamos en menos de 24hs.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          required
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-xl border border-stone-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <input
          type="text"
          required
          placeholder="Email o teléfono"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          className="w-full rounded-xl border border-stone-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <textarea
          placeholder="Mensaje (opcional)"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-stone-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <Button type="submit" variant="primary" className="w-full">
          Enviar consulta
        </Button>
      </form>
    </section>
  );
}
