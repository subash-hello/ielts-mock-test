import { createClient } from '@supabase/supabase-js';
import type { IELTSMockTest, TestResult } from '../types/ielts';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://fqwdzxaprsefutccdqns.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_seh5sW-Yt3mlaq8u2_dwLA_iu1A3ibO';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all mock tests from Supabase (from live Storage bucket or table)
 */
export async function fetchMockTestsFromSupabase(): Promise<IELTSMockTest[] | null> {
  // Try loading from Supabase Database Table if configured
  try {
    const { data, error } = await supabase
      .from('ielts_mock_tests')
      .select('*')
      .order('book', { ascending: true })
      .order('test_number', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        book: row.book,
        testNumber: row.test_number,
        module: row.module,
        title: row.title,
        durationMinutes: row.duration_minutes,
        audioUrl: row.audio_url,
        sections: row.sections
      }));
    }
  } catch (err) {
    console.warn('Table fetch error:', err);
  }

  return null;
}

/**
 * Save candidate test result to Supabase
 */
export async function saveTestResultToSupabase(result: TestResult): Promise<boolean> {
  try {
    const { error } = await supabase.from('user_test_results').insert([
      {
        test_id: result.testId,
        book: result.book,
        test_number: result.testNumber,
        module: result.module,
        candidate_name: result.candidateName || 'Candidate',
        total_questions: result.totalQuestions,
        correct_count: result.correctCount,
        band_score: result.bandScore,
        time_taken_seconds: result.timeTakenSeconds,
        answers: result.answers,
        completed_at: result.completedAt
      }
    ]);

    if (error) {
      console.warn('Failed to save result to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving to Supabase:', err);
    return false;
  }
}
