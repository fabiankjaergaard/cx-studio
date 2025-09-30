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
  images JSONB -- Array of image URLs/paths
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback (for beta testers)
CREATE POLICY "Anyone can insert feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to read feedback (for admin view)
CREATE POLICY "Anyone can read feedback" ON feedback
  FOR SELECT USING (true);

-- Create policy to allow deleting feedback (for admin)
CREATE POLICY "Anyone can delete feedback" ON feedback
  FOR DELETE USING (true);