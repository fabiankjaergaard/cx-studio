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