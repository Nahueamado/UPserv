-- Create profiles table linked to Supabase Auth users
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  profile_image_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
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
