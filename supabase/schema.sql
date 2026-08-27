-- Ejecutar este script completo en Supabase: Dashboard -> SQL Editor -> New query
-- Pegar todo y darle "Run".

-- Tabla que guarda únicamente el estado dinámico de cada lote (el resto del
-- contenido -- precio, superficie, polígono, etc. -- sigue viviendo en
-- src/data/lotes.ts, ya que no cambia). Separar esto evita duplicar en la
-- base datos que son básicamente contenido estático del sitio.
create table if not exists public.lote_estados (
  lote_id text primary key,
  estado text not null check (estado in ('disponible', 'reservado', 'vendido')),
  updated_at timestamptz not null default now()
);

-- Row Level Security: la tabla es de lectura pública (el sitio necesita
-- mostrar el estado a cualquier visitante) y de escritura pública también,
-- porque el panel /admin usa un login simple del lado del cliente (no
-- Supabase Auth), así que no hay una sesión real contra la que validar acá.
--
-- OJO: esto significa que cualquiera con la URL y la clave "anon" del
-- proyecto (ambas quedan visibles en el JS del sitio publicado) técnicamente
-- podría escribir en esta tabla llamando a la API directamente, sin pasar
-- por el login de /admin. Para un demo o lanzamiento chico es un riesgo bajo,
-- pero si esto se vuelve un negocio real, migrar el login de /admin a
-- Supabase Auth y cambiar estas políticas para exigir un usuario autenticado.
alter table public.lote_estados enable row level security;

drop policy if exists "lote_estados: lectura pública" on public.lote_estados;
create policy "lote_estados: lectura pública"
  on public.lote_estados for select
  using (true);

drop policy if exists "lote_estados: escritura pública (demo, sin Supabase Auth)" on public.lote_estados;
create policy "lote_estados: escritura pública (demo, sin Supabase Auth)"
  on public.lote_estados for all
  using (true)
  with check (true);

-- Habilita las notificaciones en tiempo real para esta tabla (solo si
-- todavía no estaba agregada, para poder correr este script más de una vez).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'lote_estados'
  ) then
    alter publication supabase_realtime add table public.lote_estados;
  end if;
end $$;

-- Estado inicial: coincide con lo que ya está publicado en el sitio
-- (src/data/lotes.ts) para que Supabase arranque sincronizado.
insert into public.lote_estados (lote_id, estado) values
  ('lote-001', 'disponible'),
  ('lote-002', 'disponible'),
  ('lote-003', 'reservado'),
  ('lote-004', 'disponible'),
  ('lote-005', 'vendido'),
  ('lote-006', 'disponible'),
  ('lote-007', 'reservado'),
  ('lote-008', 'disponible'),
  ('lote-009', 'vendido'),
  ('lote-010', 'reservado'),
  ('lote-011', 'disponible'),
  ('lote-012', 'disponible'),
  ('lote-013', 'reservado'),
  ('lote-014', 'disponible'),
  ('lote-015', 'vendido'),
  ('lote-016', 'disponible'),
  ('lote-017', 'disponible'),
  ('lote-018', 'reservado'),
  ('lote-019', 'disponible'),
  ('lote-020', 'vendido'),
  ('lote-021', 'disponible'),
  ('lote-022', 'disponible'),
  ('lote-023', 'reservado'),
  ('lote-024', 'disponible'),
  ('lote-025', 'vendido'),
  ('lote-026', 'disponible'),
  ('lote-027', 'disponible'),
  ('lote-028', 'reservado'),
  ('lote-029', 'disponible'),
  ('lote-030', 'vendido'),
  ('lote-031', 'disponible'),
  ('lote-032', 'disponible'),
  ('lote-033', 'reservado'),
  ('lote-034', 'disponible'),
  ('lote-035', 'vendido'),
  ('lote-036', 'disponible'),
  ('lote-037', 'disponible'),
  ('lote-038', 'reservado'),
  ('lote-039', 'disponible'),
  ('lote-040', 'vendido'),
  ('lote-041', 'disponible'),
  ('lote-042', 'disponible'),
  ('lote-043', 'reservado'),
  ('lote-044', 'disponible')
on conflict (lote_id) do nothing;
