-- =============================================================================
-- Luminalis – Grundlage (001)
-- Profile + persönliches Luminalis-Profil inkl. Row Level Security.
-- Idempotent gehalten, damit erneutes Ausführen nicht fehlschlägt.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- updated_at automatisch pflegen
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles – Basisprofil je Auth-Nutzer
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

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

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- luminalis_profiles – persönliche „Erste Ausrichtung"
-- ---------------------------------------------------------------------------
create table if not exists public.luminalis_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  current_focus text,
  guiding_question text,
  selected_pillars text[] not null default '{}',
  resonance_topics text[] not null default '{}',
  first_intention text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.luminalis_profiles enable row level security;

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

drop trigger if exists luminalis_profiles_set_updated_at on public.luminalis_profiles;
create trigger luminalis_profiles_set_updated_at
  before update on public.luminalis_profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Optional: profiles automatisch bei Registrierung anlegen
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Grants für eingeloggte Nutzer (RLS schützt die Zeilen zusätzlich)
-- ---------------------------------------------------------------------------
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.luminalis_profiles to authenticated;
