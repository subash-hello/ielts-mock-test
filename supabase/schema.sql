-- ==========================================================
-- IELTS Mock Exam Platform: Supabase Database Schema
-- Run this in your Supabase Project -> SQL Editor
-- (https://supabase.com/dashboard/project/fqwdzxaprsefutccdqns/sql/new)
-- ==========================================================

-- 1. Table for Cambridge Academic Mock Tests (Books 15, 16, 17, 18, 19, 20, 21)
CREATE TABLE IF NOT EXISTS public.ielts_mock_tests (
  id TEXT PRIMARY KEY,
  book INTEGER NOT NULL,
  test_number INTEGER NOT NULL,
  module TEXT NOT NULL CHECK (module IN ('reading', 'listening', 'writing')),
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
  book INTEGER,
  test_number INTEGER,
  module TEXT NOT NULL,
  candidate_name TEXT DEFAULT 'Candidate',
  candidate_id TEXT,
  total_questions INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  band_score NUMERIC(3,1) NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  writing_submission JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table for Consultancies / Branches
CREATE TABLE IF NOT EXISTS public.consultancies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  branch TEXT,
  admin_email TEXT,
  phone TEXT,
  access_code TEXT,
  branch_code TEXT UNIQUE,
  exam_password TEXT DEFAULT '1234',
  admin_password TEXT DEFAULT 'admin123',
  status TEXT DEFAULT 'active',
  computer_limit INTEGER DEFAULT 20,
  test_credits INTEGER DEFAULT 300,
  credits_used INTEGER DEFAULT 0,
  assigned_test_ids JSONB DEFAULT '[]'::jsonb,
  active_module_tests JSONB DEFAULT '{}'::jsonb,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now() + interval '1 year') NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table for Lab Workstations / Paired PCs
CREATE TABLE IF NOT EXISTS public.consultancy_stations (
  id TEXT PRIMARY KEY,
  consultancy_id TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'idle',
  current_candidate JSONB,
  assigned_test_id TEXT,
  test_title TEXT,
  module TEXT,
  is_full_mock BOOLEAN DEFAULT false,
  current_question INTEGER DEFAULT 1,
  total_questions INTEGER DEFAULT 40,
  answered_count INTEGER DEFAULT 0,
  remaining_seconds INTEGER,
  time_spent_seconds INTEGER,
  device_token TEXT,
  last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table for Candidate Students Roster
CREATE TABLE IF NOT EXISTS public.consultancy_students (
  id TEXT PRIMARY KEY,
  consultancy_id TEXT NOT NULL,
  candidate_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  target_band NUMERIC(3,1) DEFAULT 0,
  enrolled_date TEXT,
  tests_completed_count INTEGER DEFAULT 0,
  highest_band NUMERIC(3,1) DEFAULT 0,
  average_band NUMERIC(3,1) DEFAULT 0,
  latest_result_id TEXT,
  assigned_test_id TEXT,
  assigned_test_title TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Table for Consultancy Exam Submissions & Official Results
CREATE TABLE IF NOT EXISTS public.consultancy_results (
  id TEXT PRIMARY KEY,
  consultancy_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  book INTEGER,
  test_number INTEGER,
  module TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  band_score NUMERIC(3,1) NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  answers JSONB DEFAULT '{}'::jsonb,
  candidate_name TEXT,
  candidate_id TEXT,
  station_name TEXT,
  consultancy_name TEXT,
  target_band NUMERIC(3,1),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  writing_submission JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Table for AI Diagnostic Reports Archive
CREATE TABLE IF NOT EXISTS public.consultancy_reports (
  id TEXT PRIMARY KEY,
  consultancy_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  test_title TEXT NOT NULL,
  test_id TEXT,
  module TEXT,
  band_score NUMERIC(3,1) NOT NULL,
  correct_count INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  answers JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  writing_submission JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Table for Active Lab Exam Launches
CREATE TABLE IF NOT EXISTS public.consultancy_active_launches (
  consultancy_id TEXT PRIMARY KEY,
  test_id TEXT,
  title TEXT,
  session_name TEXT,
  is_full_mock BOOLEAN DEFAULT false,
  launched_at TIMESTAMP WITH TIME ZONE,
  stopped_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- Enable Row Level Security (RLS) on all tables
-- ==========================================================
ALTER TABLE public.ielts_mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancy_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancy_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancy_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancy_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancy_active_launches ENABLE ROW LEVEL SECURITY;

-- ==========================================================
-- RLS Policies (Allow read/write for lab PCs, kiosks & directors)
-- ==========================================================
DROP POLICY IF EXISTS "Allow public read access to mock tests" ON public.ielts_mock_tests;
CREATE POLICY "Allow public read access to mock tests"
  ON public.ielts_mock_tests FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public write access to mock tests" ON public.ielts_mock_tests;
CREATE POLICY "Allow public write access to mock tests"
  ON public.ielts_mock_tests FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to user test results" ON public.user_test_results;
CREATE POLICY "Allow public access to user test results"
  ON public.user_test_results FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to consultancies" ON public.consultancies;
CREATE POLICY "Allow public access to consultancies"
  ON public.consultancies FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to consultancy stations" ON public.consultancy_stations;
CREATE POLICY "Allow public access to consultancy stations"
  ON public.consultancy_stations FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to consultancy students" ON public.consultancy_students;
CREATE POLICY "Allow public access to consultancy students"
  ON public.consultancy_students FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to consultancy results" ON public.consultancy_results;
CREATE POLICY "Allow public access to consultancy results"
  ON public.consultancy_results FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to consultancy reports" ON public.consultancy_reports;
CREATE POLICY "Allow public access to consultancy reports"
  ON public.consultancy_reports FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to consultancy active launches" ON public.consultancy_active_launches;
CREATE POLICY "Allow public access to consultancy active launches"
  ON public.consultancy_active_launches FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- Indexes for High Speed Queries
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_ielts_tests_book ON public.ielts_mock_tests(book);
CREATE INDEX IF NOT EXISTS idx_ielts_tests_module ON public.ielts_mock_tests(module);
CREATE INDEX IF NOT EXISTS idx_stations_cid ON public.consultancy_stations(consultancy_id);
CREATE INDEX IF NOT EXISTS idx_students_cid ON public.consultancy_students(consultancy_id);
CREATE INDEX IF NOT EXISTS idx_results_cid ON public.consultancy_results(consultancy_id);
CREATE INDEX IF NOT EXISTS idx_results_candidate ON public.consultancy_results(candidate_id);
CREATE INDEX IF NOT EXISTS idx_reports_cid ON public.consultancy_reports(consultancy_id);

-- ==========================================================
-- Enable Supabase Realtime for Cross-PC Lab Telemetry
-- ==========================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE 
      public.consultancies,
      public.consultancy_stations,
      public.consultancy_students,
      public.consultancy_results,
      public.consultancy_reports,
      public.consultancy_active_launches;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ==========================================================
-- Starter Seed Data: Default Consultancies
-- ==========================================================
INSERT INTO public.consultancies (id, name, branch, admin_email, phone, access_code, branch_code, exam_password, admin_password, status, computer_limit, test_credits, credits_used, assigned_test_ids)
VALUES
  (
    'apex-global',
    'Apex Global Education',
    'Kathmandu Central (Bagbazar)',
    'director@apexglobal.edu.np',
    '+977 1 4241920',
    'APEX-2026',
    'APEX-2026',
    '1234',
    'admin123',
    'active',
    25,
    500,
    142,
    '["cambridge-16-test-1-reading","cambridge-16-test-1-listening","cambridge-16-test-1-writing","cambridge-16-test-2-reading","cambridge-16-test-2-listening","cambridge-16-test-2-writing","cambridge-16-test-3-reading","cambridge-16-test-3-listening","cambridge-16-test-3-writing","cambridge-16-test-4-reading","cambridge-16-test-4-listening","cambridge-16-test-4-writing","cambridge-19-test-1-reading","cambridge-19-test-1-listening","cambridge-19-test-2-reading","cambridge-19-test-2-listening","cambridge-18-test-1-reading","cambridge-18-test-1-listening"]'::jsonb
  ),
  (
    'edwise-overseas',
    'Edwise Overseas Education',
    'Putalisadak Hub',
    'ieltslab@edwise.com.np',
    '+977 1 4438190',
    'EDWISE-99',
    'EDWISE-99',
    '1234',
    'admin123',
    'active',
    15,
    300,
    89,
    '["cambridge-16-test-1-reading","cambridge-16-test-1-listening","cambridge-16-test-1-writing","cambridge-19-test-1-reading","cambridge-19-test-1-listening","cambridge-20-test-1-reading","cambridge-20-test-1-listening"]'::jsonb
  ),
  (
    'kangaroo-studies',
    'Kangaroo Education Group',
    'Chitwan / Bharatpur',
    'lab@kangarooedu.com',
    '+977 56 524180',
    'KANGAROO-7',
    'KANGAROO-7',
    '1234',
    'admin123',
    'active',
    20,
    400,
    210,
    '["cambridge-16-test-1-reading","cambridge-16-test-1-listening","cambridge-16-test-1-writing","cambridge-18-test-2-reading","cambridge-18-test-2-listening","cambridge-19-test-1-reading","cambridge-19-test-1-listening"]'::jsonb
  ),
  (
    'kiec-lalitpur',
    'KIEC Lalitpur',
    'Lalitpur',
    'kiec@gmail.com',
    '9763876490',
    'KIEC321',
    'KIEC321',
    '1234',
    '1234',
    'active',
    20,
    300,
    0,
    '["cambridge-16-test-1-reading","cambridge-16-test-1-listening","cambridge-16-test-1-writing","cambridge-16-test-2-reading","cambridge-16-test-2-listening","cambridge-16-test-2-writing","cambridge-16-test-3-reading","cambridge-16-test-3-listening","cambridge-16-test-3-writing","cambridge-16-test-4-reading","cambridge-16-test-4-listening","cambridge-16-test-4-writing","cambridge-19-test-1-reading","cambridge-19-test-1-listening"]'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  branch_code = EXCLUDED.branch_code,
  exam_password = EXCLUDED.exam_password,
  admin_password = EXCLUDED.admin_password;
