import { createClient } from '@supabase/supabase-js';
import { allMockTests } from '../src/data/mockTests.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';

console.log('Connecting to Supabase at:', SUPABASE_URL);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadTests() {
  console.log(`Starting upload of ${allMockTests.length} Cambridge Academic Mock Tests...`);

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

  // Batch insert/upsert in chunks of 5
  const chunkSize = 5;
  for (let i = 0; i < payload.length; i += chunkSize) {
    const chunk = payload.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from('ielts_mock_tests')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      if (error.code === 'PGRST205') {
        console.error('\n❌ ERROR: Table "ielts_mock_tests" does not exist in your Supabase database yet.');
        console.log('\n📋 TO FIX THIS:');
        console.log('1. Open your Supabase Dashboard:');
        console.log('   https://supabase.com/dashboard/project/fqwdzxaprsefutccdqns/sql/new');
        console.log('2. Paste the SQL script from "supabase/schema.sql" and click "RUN".');
        console.log('3. Re-run this script: npm run upload:supabase');
        return;
      }
      console.error(`Error uploading batch ${i / chunkSize + 1}:`, error.message);
      return;
    }

    console.log(`✅ Uploaded tests ${i + 1} to ${Math.min(i + chunkSize, payload.length)} of ${payload.length}`);
  }

  console.log('\n🎉 ALL CAMBRIDGE MOCK TESTS SUCCESSFULLY STORED IN SUPABASE!');
}

uploadTests().catch((err) => {
  console.error('Unexpected error:', err);
});
