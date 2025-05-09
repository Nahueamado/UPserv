-- Create profiles table linked to Supabase Auth users
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  profile_image_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security on profiles
alter table profiles enable row level security;

-- Policy to allow users to select their own profile
create policy "Allow users to select their own profile" on profiles
  for select using (auth.uid() = id);

-- Policy to allow users to insert their own profile
create policy "Allow users to insert their own profile" on profiles
  for insert with check (auth.uid() = id);

-- Policy to allow users to update their own profile
create policy "Allow users to update their own profile" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Create professionals table linked to profiles
create table if not exists professionals (
  professional_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  profession text not null,
  contact_info jsonb,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security on professionals
alter table professionals enable row level security;

-- Policy to allow users to select professionals (public read)
create policy "Allow select on professionals" on professionals
  for select using (true);

-- Policy to allow professional owners to insert their own record
create policy "Allow insert on professionals by owner" on professionals
  for insert with check (auth.uid() = user_id);

-- Policy to allow professional owners to update their own record
create policy "Allow update on professionals by owner" on professionals
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Policy to allow professional owners to delete their own record
create policy "Allow delete on professionals by owner" on professionals
  for delete using (auth.uid() = user_id);
