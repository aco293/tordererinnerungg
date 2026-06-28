-- =============================================================================
-- Luminalis – Weg-Einträge (002)
-- Private Dialograum-Einträge je Nutzer inkl. Row Level Security.
-- Idempotent gehalten, damit erneutes Ausführen nicht fehlschlägt.
-- =============================================================================

-- gen_random_uuid() stammt aus pgcrypto (auf Supabase i. d. R. bereits aktiv).
create extension if not exists pgcrypto;

create table if not exists public.luminalis_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  entry_type text not null default 'dialog',
  pillar text,
  mode text,
  title text,
  content text not null,
  resonance_topics text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists luminalis_entries_user_id_idx
  on public.luminalis_entries (user_id);

create index if not exists luminalis_entries_created_at_idx
  on public.luminalis_entries (created_at desc);

alter table public.luminalis_entries enable row level security;

drop policy if exists "luminalis_entries_select_own" on public.luminalis_entries;
create policy "luminalis_entries_select_own"
  on public.luminalis_entries for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_entries_insert_own" on public.luminalis_entries;
create policy "luminalis_entries_insert_own"
  on public.luminalis_entries for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_entries_update_own" on public.luminalis_entries;
create policy "luminalis_entries_update_own"
  on public.luminalis_entries for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_entries_delete_own" on public.luminalis_entries;
create policy "luminalis_entries_delete_own"
  on public.luminalis_entries for delete
  using (auth.uid() = user_id);

-- updated_at-Trigger aus Migration 001 wiederverwenden, falls vorhanden.
do $$
begin
  if exists (
    select 1 from pg_proc
    where proname = 'set_updated_at' and pronamespace = 'public'::regnamespace
  ) then
    drop trigger if exists luminalis_entries_set_updated_at on public.luminalis_entries;
    create trigger luminalis_entries_set_updated_at
      before update on public.luminalis_entries
      for each row execute function public.set_updated_at();
  end if;
end;
$$;
