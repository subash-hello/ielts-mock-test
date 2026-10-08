import { fetchMockTestsFromSupabase } from '../src/lib/supabase';
import { ConsultancyService } from '../src/services/consultancyService';

async function run() {
  console.log('--- Testing Supabase Mock Tests Fetching ---');
  const tests = await fetchMockTestsFromSupabase();
  if (tests && tests.length === 32) {
    console.log(`[PASS] fetchMockTestsFromSupabase successfully loaded ${tests.length} tests from Supabase storage!`);
  } else {
    console.error(`[FAIL] Expected 32 tests, got ${tests?.length}`);
    process.exit(1);
  }

  console.log('\n--- Testing ConsultancyService.syncFromSupabase Resiliency ---');
  let threw = false;
  try {
    await ConsultancyService.syncFromSupabase();
    console.log('[PASS] syncFromSupabase completed safely without throwing errors or breaking!');
  } catch (err) {
    threw = true;
    console.error('[FAIL] syncFromSupabase threw unexpected error:', err);
  }

  if (threw) {
    process.exit(1);
  }

  console.log('\n--- Testing Consultancies Local and Sync Integration ---');
  const consultancies = ConsultancyService.getConsultancies();
  console.log(`[PASS] Consultancies retrieved: ${consultancies.length}`);
  if (consultancies.length < 4) {
    console.error('[FAIL] Expected at least 4 default consultancies');
    process.exit(1);
  }

  console.log('\nAll Supabase synchronization tests passed successfully!');
}

run();
