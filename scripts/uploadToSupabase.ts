import { createClient } from '@supabase/supabase-js';
import { allMockTests } from '../src/data/mockTests';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';

console.log('--------------------------------------------------');
console.log('Connecting to Supabase at:', SUPABASE_URL);
console.log('--------------------------------------------------');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadTests() {
  console.log(`Preparing ${allMockTests.length} Cambridge Academic Mock Tests for upload...`);

  // Transform to database columns
  const payload = allMockTests.map((t) => ({
    id: t.id,
    book: t.book,
    test_number: t.testNumber,
    module: t.module,
    title: t.title,
    duration_minutes: t.durationMinutes,
    audio_url: t.audioUrl || null,
    sections: t.sections
  }));

  // Check if table exists
  const check = await supabase.from('ielts_mock_tests').select('id').limit(1);
  if (check.error) {
    if (check.error.code === 'PGRST205') {
      console.error('\n❌ TABLE MISSING: Table "public.ielts_mock_tests" does not exist in Supabase yet.');
      console.log('\n📋 IMMEDIATE ACTION REQUIRED:');
      console.log('1. Go to your Supabase Dashboard:');
      console.log('   https://supabase.com/dashboard/project/fqwdzxaprsefutccdqns/sql/new');
      console.log('2. Copy and paste the SQL script from "supabase/schema.sql" and click "RUN" (green button).');
      console.log('3. Run this script again: npm run upload:supabase\n');
      process.exit(1);
    } else {
      console.error('Database connection error:', check.error);
      process.exit(1);
    }
  }

  // Batch upsert in chunks of 4
  const chunkSize = 4;
  for (let i = 0; i < payload.length; i += chunkSize) {
    const chunk = payload.slice(i, i + chunkSize);
    const { error } = await supabase
      .from('ielts_mock_tests')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`Error uploading batch starting at ${i + 1}:`, error.message);
      process.exit(1);
    }

    console.log(`✅ Uploaded tests ${i + 1} to ${Math.min(i + chunkSize, payload.length)} of ${payload.length}`);
  }

  console.log('\n🎉 SUCCESS! All 32 Cambridge Academic Mock Tests are now permanently stored in Supabase!');
  console.log('You can view them in the Supabase Table Editor:');
  console.log('https://supabase.com/dashboard/project/fqwdzxaprsefutccdqns/editor/ielts_mock_tests\n');
}

uploadTests().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
