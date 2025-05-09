-- Drop existing tables if they exist
drop table if exists professionals cascade;
drop table if exists profiles cascade;

-- Create profiles table linked to Supabase Auth users
create table profiles (
  id uuid primary key,
  username text unique,
  full_name text,
  profile_image_url text,
  role text not null default 'user', -- roles: admin, moderator, user, professional
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
create table professionals (
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

-- Insert example users into profiles
-- Note: The UUIDs here should match actual auth.users UUIDs in your Supabase Auth system.
-- For demonstration, we use fixed UUIDs.

insert into profiles (id, username, full_name, profile_image_url, role, updated_at) values
('11111111-1111-1111-1111-111111111111', 'adminuser', 'Admin User', null, 'admin', now()),
('22222222-2222-2222-2222-222222222222', 'moduser', 'Moderator User', null, 'moderator', now()),
('33333333-3333-3333-3333-333333333333', 'normaluser', 'Normal User', null, 'user', now()),
('44444444-4444-4444-4444-444444444444', 'profuser', 'Professional User', null, 'professional', now());

-- Insert example professional linked to professional user
insert into professionals (user_id, profession, contact_info, bio, created_at, updated_at) values
('44444444-4444-4444-4444-444444444444', 'Software Developer', '{"email": "profuser@example.com", "phone": "123-456-7890"}', 'Experienced software developer specializing in web applications.', now(), now());
