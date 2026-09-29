-- Create the subscriptions table
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  price numeric not null,
  status text not null,
  category text not null,
  renewal_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table subscriptions enable row level security;

-- Create policies so users can only see and edit their own subscriptions
create policy "Users can view their own subscriptions."
  on subscriptions for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own subscriptions."
  on subscriptions for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own subscriptions."
  on subscriptions for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own subscriptions."
  on subscriptions for delete
  using ( auth.uid() = user_id );

-- Create the profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  full_name text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table profiles enable row level security;

create policy "Users can view their own profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create the email_preferences table
create table email_preferences (
  id uuid references auth.users on delete cascade primary key,
  product_updates boolean not null default true,
  renewal_reminders boolean not null default true,
  promotional_emails boolean not null default false,
  weekly_digest boolean not null default true,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table email_preferences enable row level security;

create policy "Users can view their own email preferences."
  on email_preferences for select
  using ( auth.uid() = id );

create policy "Users can insert their own email preferences."
  on email_preferences for insert
  with check ( auth.uid() = id );

create policy "Users can update their own email preferences."
  on email_preferences for update
  using ( auth.uid() = id );

-- Create the renewal_alerts table
create table renewal_alerts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  subscription_id uuid references subscriptions on delete cascade not null,
  alert_type text not null check (alert_type in ('info', 'warning', 'critical')),
  days_until integer not null,
  alert_date date not null,
  sent boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, subscription_id, alert_date)
);

alter table renewal_alerts enable row level security;

create policy "Users can view their own renewal alerts."
  on renewal_alerts for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own renewal alerts."
  on renewal_alerts for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own renewal alerts."
  on renewal_alerts for update
  using ( auth.uid() = user_id );
