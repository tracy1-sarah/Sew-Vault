-- SewVault database schema.
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

-- ───────── Profiles ─────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Create a profile automatically whenever someone signs up (email or Google).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'full_name',
      split_part(new.email, '@', 1)
    ),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────── Clients ─────────
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  date date not null,
  phone_number text not null default '',
  amount_charged numeric(12, 2),
  advance_paid numeric(12, 2),
  balance numeric(12, 2) not null default 0,
  is_paid boolean not null default false,
  measurements jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_user_id_created_at_idx
  on public.clients (user_id, created_at desc);

-- Every tailor can only see and change their own clients.
alter table public.clients enable row level security;

create policy "Users can read their own clients"
  on public.clients for select
  using ((select auth.uid()) = user_id);

create policy "Users can add their own clients"
  on public.clients for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own clients"
  on public.clients for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own clients"
  on public.clients for delete
  using ((select auth.uid()) = user_id);
