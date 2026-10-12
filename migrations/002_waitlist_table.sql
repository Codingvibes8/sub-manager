-- Waitlist table for Enterprise plan
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'enterprise',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for waitlist signup)
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Only allow reading own entry (not enforced via API for simplicity)
CREATE POLICY "No public read access" ON waitlist
  FOR SELECT USING (false);
