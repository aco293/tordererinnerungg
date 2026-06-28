-- =============================================================================
-- Luminalis – Integrationen (005)
-- Freiwillige nächste Schritte, um eine Erkenntnis ins Leben zu bringen.
-- Privat je Nutzer, inkl. Row Level Security. Idempotent gehalten.
--
-- Statuswerte (ruhig, menschlich – nicht produktivitätsorientiert):
--   open        = offen
--   in_motion   = in Bewegung
--   integrated  = integriert
--   released    = losgelassen
-- =============================================================================

create extension if not exists pgcrypto;

create table if not exists public.luminalis_integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  insight_id uuid references public.luminalis_insights (id) on delete set null,
  title text,
  intention text not null,
  next_step text,
  rhythm text,
  status text not null default 'open',
  reflection text,
  resonance_topics text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists luminalis_integrations_user_id_idx
  on public.luminalis_integrations (user_id);

create index if not exists luminalis_integrations_insight_id_idx
  on public.luminalis_integrations (insight_id);

create index if not exists luminalis_integrations_status_idx
  on public.luminalis_integrations (status);

create index if not exists luminalis_integrations_created_at_idx
  on public.luminalis_integrations (created_at desc);

alter table public.luminalis_integrations enable row level security;

drop policy if exists "luminalis_integrations_select_own" on public.luminalis_integrations;
create policy "luminalis_integrations_select_own"
  on public.luminalis_integrations for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_integrations_insert_own" on public.luminalis_integrations;
create policy "luminalis_integrations_insert_own"
  on public.luminalis_integrations for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_integrations_update_own" on public.luminalis_integrations;
create policy "luminalis_integrations_update_own"
  on public.luminalis_integrations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_integrations_delete_own" on public.luminalis_integrations;
create policy "luminalis_integrations_delete_own"
  on public.luminalis_integrations for delete
  using (auth.uid() = user_id);

-- Grants für eingeloggte Nutzer (RLS schützt die Zeilen zusätzlich).
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.luminalis_integrations to authenticated;

-- updated_at-Trigger aus Migration 001 wiederverwenden, falls vorhanden.
do $$
begin
  if exists (
    select 1 from pg_proc
    where proname = 'set_updated_at' and pronamespace = 'public'::regnamespace
  ) then
    drop trigger if exists luminalis_integrations_set_updated_at on public.luminalis_integrations;
    create trigger luminalis_integrations_set_updated_at
      before update on public.luminalis_integrations
      for each row execute function public.set_updated_at();
  end if;
end;
$$;
