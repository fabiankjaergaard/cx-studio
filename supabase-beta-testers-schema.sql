-- Create beta_testers table
CREATE TABLE IF NOT EXISTS beta_testers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_code VARCHAR(10) DEFAULT '1111',
  ip_address VARCHAR(45),
  user_agent TEXT,
  session_count INTEGER DEFAULT 1,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_beta_testers_login_time ON beta_testers(login_time DESC);
CREATE INDEX IF NOT EXISTS idx_beta_testers_name ON beta_testers(name);

-- Enable Row Level Security
ALTER TABLE beta_testers ENABLE ROW LEVEL SECURITY;

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