-- Billing tables for Stripe integration

-- Stripe customers table
create table stripe_customers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  stripe_customer_id text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table stripe_customers enable row level security;

create policy "Users can view their own stripe customer."
  on stripe_customers for select
  using ( auth.uid() = user_id );

-- Stripe subscriptions table
create table stripe_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  stripe_subscription_id text not null unique,
  stripe_product_id text,
  stripe_price_id text,
  status text not null,
  plan text not null default 'free',
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table stripe_subscriptions enable row level security;

create policy "Users can view their own stripe subscriptions."
  on stripe_subscriptions for select
  using ( auth.uid() = user_id );

-- Stripe invoices table
create table stripe_invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  stripe_invoice_id text not null unique,
  stripe_subscription_id text,
  amount_due integer,
  amount_paid integer,
  currency text default 'usd',
  status text,
  invoice_pdf text,
  hosted_invoice_url text,
  period_start timestamp with time zone,
  period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table stripe_invoices enable row level security;

create policy "Users can view their own invoices."
  on stripe_invoices for select
  using ( auth.uid() = user_id );

-- Update teams table to add stripe_customer_id reference
alter table teams add column if not exists stripe_customer_id text;
