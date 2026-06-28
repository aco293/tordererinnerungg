-- =============================================================================
-- Luminalis – Rechte & Policies (003)
-- Dokumentiert und sichert den Permissions-Fix dauerhaft. Vollständig
-- idempotent: mehrfaches Ausführen verursacht keine Fehler.
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Grants für eingeloggte Nutzer (RLS schützt die Zeilen zusätzlich)
-- ---------------------------------------------------------------------------
grant usage on schema public to authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.luminalis_profiles to authenticated;
grant select, insert, update, delete on public.luminalis_entries to authenticated;

-- ---------------------------------------------------------------------------
-- RLS sicher aktivieren
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.luminalis_profiles enable row level security;
alter table public.luminalis_entries enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- luminalis_profiles
-- ---------------------------------------------------------------------------
drop policy if exists "luminalis_profiles_select_own" on public.luminalis_profiles;
create policy "luminalis_profiles_select_own"
  on public.luminalis_profiles for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_profiles_insert_own" on public.luminalis_profiles;
create policy "luminalis_profiles_insert_own"
  on public.luminalis_profiles for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_profiles_update_own" on public.luminalis_profiles;
create policy "luminalis_profiles_update_own"
  on public.luminalis_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_profiles_delete_own" on public.luminalis_profiles;
create policy "luminalis_profiles_delete_own"
  on public.luminalis_profiles for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- luminalis_entries
-- ---------------------------------------------------------------------------
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
