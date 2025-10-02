-- Create feedback table for storing user feedback from beta testers
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Feedback type
  type TEXT NOT NULL CHECK (type IN ('feedback', 'feature-request', 'bug-report')),

  -- User information
  user_name TEXT,
  user_id TEXT,
  is_beta_tester BOOLEAN DEFAULT false,

  -- Common fields
  category TEXT,
  priority TEXT CHECK (priority IN ('critical', 'important', 'nice-to-have')),

  -- Feedback specific
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,

  -- Feature request / Bug report specific
  title TEXT,
  description TEXT,
  use_case TEXT,

  -- Bug report specific
  steps TEXT,
  expected_result TEXT,
  actual_result TEXT,

  -- Image attachments
  images JSONB
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Add images column if it doesn't exist
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS images JSONB;

-- Create beta_testers table
CREATE TABLE IF NOT EXISTS beta_testers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_code VARCHAR(10) DEFAULT '1111',
  session_count INTEGER DEFAULT 1,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to beta_testers table
ALTER TABLE beta_testers ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45);
ALTER TABLE beta_testers ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Create index for faster queries on beta_testers
CREATE INDEX IF NOT EXISTS idx_beta_testers_login_time ON beta_testers(login_time DESC);
CREATE INDEX IF NOT EXISTS idx_beta_testers_name ON beta_testers(name);

-- Enable Row Level Security
ALTER TABLE beta_testers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow anonymous inserts" ON beta_testers;
DROP POLICY IF EXISTS "Allow authenticated reads" ON beta_testers;

-- Create policy to allow inserts from anonymous users (for beta login)
CREATE POLICY "Allow anonymous inserts" ON beta_testers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (for admin)
CREATE POLICY "Allow authenticated reads" ON beta_testers
  FOR SELECT
  USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON beta_testers TO anon;
GRANT SELECT ON beta_testers TO authenticated;

-- ============================================
-- NEW: Access codes table for personal beta codes
-- ============================================

-- Create access_codes table for beta tester access codes
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(4) UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_by VARCHAR(255),
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster code lookups
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_is_used ON access_codes(is_used);

-- Enable Row Level Security
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous to check codes" ON access_codes;
DROP POLICY IF EXISTS "Allow anonymous to mark codes as used" ON access_codes;

-- Create policy to allow anonymous users to check codes
CREATE POLICY "Allow anonymous to check codes" ON access_codes
  FOR SELECT
  USING (true);

-- Create policy to allow anonymous users to update codes when used
CREATE POLICY "Allow anonymous to mark codes as used" ON access_codes
  FOR UPDATE
  USING (is_used = FALSE)
  WITH CHECK (is_used = TRUE);

-- Grant permissions
GRANT SELECT, UPDATE ON access_codes TO anon;

-- Insert 20 unique 4-digit codes
INSERT INTO access_codes (code) VALUES
  ('7394'),
  ('2851'),
  ('9462'),
  ('3178'),
  ('5623'),
  ('8147'),
  ('4926'),
  ('1735'),
  ('6289'),
  ('3514'),
  ('9827'),
  ('4163'),
  ('7538'),
  ('2694'),
  ('8351'),
  ('1927'),
  ('5482'),
  ('6739'),
  ('3261'),
  ('9475')
ON CONFLICT (code) DO NOTHING;