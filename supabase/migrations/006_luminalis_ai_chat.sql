-- =============================================================================
-- Luminalis – KI-Dialog & Frequenzintelligenz (006)
-- Persönlicher, dialogischer Begleiter und behutsame Reflexionsschicht.
-- Alle Daten privat je Nutzer, inkl. Row Level Security. Idempotent gehalten.
--
-- Tabellen:
--   luminalis_chat_sessions        = einzelne Dialog-Sitzungen
--   luminalis_chat_messages        = Nachrichten innerhalb einer Sitzung
--   luminalis_frequency_reflections = erzeugte Frequenzreflexionen
--
-- Keine öffentlichen Chatdaten. Kein Service-Role-Key.
-- =============================================================================

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Sitzungen
-- mode-Werte: begleitung | klarheit | erinnerung | integration | frequenzspiegel
-- -----------------------------------------------------------------------------
create table if not exists public.luminalis_chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  mode text not null default 'begleitung',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists luminalis_chat_sessions_user_id_idx
  on public.luminalis_chat_sessions (user_id);

create index if not exists luminalis_chat_sessions_created_at_idx
  on public.luminalis_chat_sessions (created_at desc);

-- -----------------------------------------------------------------------------
-- Nachrichten
-- role-Werte: user | assistant | system
-- -----------------------------------------------------------------------------
create table if not exists public.luminalis_chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.luminalis_chat_sessions (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null,
  content text not null,
  context_summary text,
  created_at timestamptz not null default now()
);

create index if not exists luminalis_chat_messages_session_id_idx
  on public.luminalis_chat_messages (session_id);

create index if not exists luminalis_chat_messages_user_id_idx
  on public.luminalis_chat_messages (user_id);

create index if not exists luminalis_chat_messages_created_at_idx
  on public.luminalis_chat_messages (created_at);

-- -----------------------------------------------------------------------------
-- Frequenzreflexionen
-- -----------------------------------------------------------------------------
create table if not exists public.luminalis_frequency_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid references public.luminalis_chat_sessions (id) on delete set null,
  title text,
  observed_patterns text[] not null default '{}',
  connecting_threads text[] not null default '{}',
  gentle_reflection text,
  possible_question text,
  integration_invitation text,
  source_summary text,
  created_at timestamptz not null default now()
);

create index if not exists luminalis_frequency_reflections_user_id_idx
  on public.luminalis_frequency_reflections (user_id);

create index if not exists luminalis_frequency_reflections_session_id_idx
  on public.luminalis_frequency_reflections (session_id);

create index if not exists luminalis_frequency_reflections_created_at_idx
  on public.luminalis_frequency_reflections (created_at desc);

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------
alter table public.luminalis_chat_sessions enable row level security;
alter table public.luminalis_chat_messages enable row level security;
alter table public.luminalis_frequency_reflections enable row level security;

-- Sitzungen: nur eigene
drop policy if exists "luminalis_chat_sessions_select_own" on public.luminalis_chat_sessions;
create policy "luminalis_chat_sessions_select_own"
  on public.luminalis_chat_sessions for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_chat_sessions_insert_own" on public.luminalis_chat_sessions;
create policy "luminalis_chat_sessions_insert_own"
  on public.luminalis_chat_sessions for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_chat_sessions_update_own" on public.luminalis_chat_sessions;
create policy "luminalis_chat_sessions_update_own"
  on public.luminalis_chat_sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_chat_sessions_delete_own" on public.luminalis_chat_sessions;
create policy "luminalis_chat_sessions_delete_own"
  on public.luminalis_chat_sessions for delete
  using (auth.uid() = user_id);

-- Nachrichten: nur eigene
drop policy if exists "luminalis_chat_messages_select_own" on public.luminalis_chat_messages;
create policy "luminalis_chat_messages_select_own"
  on public.luminalis_chat_messages for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_chat_messages_insert_own" on public.luminalis_chat_messages;
create policy "luminalis_chat_messages_insert_own"
  on public.luminalis_chat_messages for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_chat_messages_update_own" on public.luminalis_chat_messages;
create policy "luminalis_chat_messages_update_own"
  on public.luminalis_chat_messages for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_chat_messages_delete_own" on public.luminalis_chat_messages;
create policy "luminalis_chat_messages_delete_own"
  on public.luminalis_chat_messages for delete
  using (auth.uid() = user_id);

-- Frequenzreflexionen: nur eigene
drop policy if exists "luminalis_frequency_reflections_select_own" on public.luminalis_frequency_reflections;
create policy "luminalis_frequency_reflections_select_own"
  on public.luminalis_frequency_reflections for select
  using (auth.uid() = user_id);

drop policy if exists "luminalis_frequency_reflections_insert_own" on public.luminalis_frequency_reflections;
create policy "luminalis_frequency_reflections_insert_own"
  on public.luminalis_frequency_reflections for insert
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_frequency_reflections_update_own" on public.luminalis_frequency_reflections;
create policy "luminalis_frequency_reflections_update_own"
  on public.luminalis_frequency_reflections for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "luminalis_frequency_reflections_delete_own" on public.luminalis_frequency_reflections;
create policy "luminalis_frequency_reflections_delete_own"
  on public.luminalis_frequency_reflections for delete
  using (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- Grants für eingeloggte Nutzer (RLS schützt die Zeilen zusätzlich).
-- -----------------------------------------------------------------------------
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.luminalis_chat_sessions to authenticated;
grant select, insert, update, delete on public.luminalis_chat_messages to authenticated;
grant select, insert, update, delete on public.luminalis_frequency_reflections to authenticated;

-- -----------------------------------------------------------------------------
-- updated_at-Trigger aus Migration 001 wiederverwenden, falls vorhanden.
-- -----------------------------------------------------------------------------
do $$
begin
  if exists (
    select 1 from pg_proc
    where proname = 'set_updated_at' and pronamespace = 'public'::regnamespace
  ) then
    drop trigger if exists luminalis_chat_sessions_set_updated_at on public.luminalis_chat_sessions;
    create trigger luminalis_chat_sessions_set_updated_at
      before update on public.luminalis_chat_sessions
      for each row execute function public.set_updated_at();
  end if;
end;
$$;
