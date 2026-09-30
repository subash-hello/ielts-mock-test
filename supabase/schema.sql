-- ==========================================================
-- IELTS Mock Exam Platform: Supabase Database Schema
-- Run this in your Supabase Project -> SQL Editor
-- ==========================================================

-- 1. Table for Cambridge Academic Mock Tests (Books 18, 19, 20, 21)
CREATE TABLE IF NOT EXISTS public.ielts_mock_tests (
  id TEXT PRIMARY KEY,
  book INTEGER NOT NULL,
  test_number INTEGER NOT NULL,
  module TEXT NOT NULL CHECK (module IN ('reading', 'listening')),
  title TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  audio_url TEXT,
  sections JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table for Candidate Test Results & Band Scores
CREATE TABLE IF NOT EXISTS public.user_test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id TEXT NOT NULL,
  book INTEGER NOT NULL,
  test_number INTEGER NOT NULL,
  module TEXT NOT NULL,
  candidate_name TEXT DEFAULT 'Candidate',
  total_questions INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  band_score NUMERIC(3,1) NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.ielts_mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_test_results ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies: Allow public read and upsert operations for mock tests
DROP POLICY IF EXISTS "Allow public read access to mock tests" ON public.ielts_mock_tests;
CREATE POLICY "Allow public read access to mock tests"
  ON public.ielts_mock_tests
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public write access to mock tests" ON public.ielts_mock_tests;
CREATE POLICY "Allow public write access to mock tests"
  ON public.ielts_mock_tests
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 5. RLS Policies: Allow candidates to save and view their exam results
DROP POLICY IF EXISTS "Allow public access to user test results" ON public.user_test_results;
CREATE POLICY "Allow public access to user test results"
  ON public.user_test_results
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Create indexes for high-speed querying by book and module
CREATE INDEX IF NOT EXISTS idx_ielts_tests_book ON public.ielts_mock_tests(book);
CREATE INDEX IF NOT EXISTS idx_ielts_tests_module ON public.ielts_mock_tests(module);
