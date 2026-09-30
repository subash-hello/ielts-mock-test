import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_seh5sW-Yt3mlaq8u2_dwLA_iu1A3ibO';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('Connecting to Supabase at:', SUPABASE_URL);

async function testConnectionAndSeed() {
  // Test if table exists
  const { data, error } = await supabase.from('ielts_mock_tests').select('count', { count: 'exact', head: true });

  if (error) {
    if (error.code === 'PGRST205') {
      console.error('\n❌ ERROR: Table "ielts_mock_tests" does not exist in your Supabase database yet.');
      console.log('\n👉 ACTION REQUIRED:');
      console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/fqwdzxaprsefutccdqns');
      console.log('2. Click on "SQL Editor" in the left sidebar.');
      console.log('3. Copy and paste the contents of "supabase/schema.sql" and click "Run".');
      console.log('4. Once run, run this script again: "npm run seed:supabase"');
      return;
    } else {
      console.error('Database query error:', error);
      return;
    }
  }

  console.log('✅ Connected to "ielts_mock_tests" table successfully!');
}

testConnectionAndSeed();
