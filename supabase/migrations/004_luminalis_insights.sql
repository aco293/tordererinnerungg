-- =============================================================================
-- Luminalis – Erkenntnisse (004)
-- Vom Nutzer bewusst verdichtete Erkenntnisse aus eigenen Weg-Einträgen.
-- Privat je Nutzer, inkl. Row Level Security. Idempotent gehalten.
-- =============================================================================

create extension if not exists pgcrypto;

create table if not exists public.luminalis_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source_entry_id uuid references public.luminalis_entries (id) on delete set null,
  pillar text,
  title text,
  insight text not null,
  integration_question text,
  resonance_topics text[] not null default '{}',
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists luminalis_insights_user_id_idx
  on public.luminalis_insights (user_id);

create index if not exists luminalis_insights_source_entry_id_idx
  on public.luminalis_insights (source_entry_id);

create index if not exists luminalis_insights_created_at_idx
  on public.luminalis_insights (created_at desc);

create index if not exists luminalis_insights_pinned_idx
  on public.luminalis_insights (pinned);

alter table public.luminalis_insights enable row level security;

drop policy if exists "luminalis_insights_select_own" on public.luminalis_insights;
create policy "luminalis_insights_select_own"
  on public.luminalis_insights for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_insights_insert_own" on public.luminalis_insights;
create policy "luminalis_insights_insert_own"
  on public.luminalis_insights for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_insights_update_own" on public.luminalis_insights;
create policy "luminalis_insights_update_own"
  on public.luminalis_insights for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_insights_delete_own" on public.luminalis_insights;
create policy "luminalis_insights_delete_own"
  on public.luminalis_insights for delete
  using (auth.uid() = user_id);

-- Grants für eingeloggte Nutzer (RLS schützt die Zeilen zusätzlich).
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.luminalis_insights to authenticated;

-- updated_at-Trigger aus Migration 001 wiederverwenden, falls vorhanden.
do $$
begin
  if exists (
    select 1 from pg_proc
    where proname = 'set_updated_at' and pronamespace = 'public'::regnamespace
  ) then
    drop trigger if exists luminalis_insights_set_updated_at on public.luminalis_insights;
    create trigger luminalis_insights_set_updated_at
      before update on public.luminalis_insights
      for each row execute function public.set_updated_at();
  end if;
end;
$$;
