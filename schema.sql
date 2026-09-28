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
