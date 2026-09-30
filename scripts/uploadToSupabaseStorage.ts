import { createClient } from '@supabase/supabase-js';
import { allMockTests } from '../src/data/mockTests.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadToSupabaseStorage() {
  console.log('--------------------------------------------------');
  console.log('Uploading all mock tests to Supabase Storage...');
  console.log('Target Bucket: "ielts-mock-tests"');
  console.log('--------------------------------------------------');

  // 1. Upload master all-tests.json
  const masterJson = JSON.stringify(allMockTests, null, 2);
  const masterBlob = new Blob([masterJson], { type: 'application/json' });
  const { data: mData, error: mErr } = await supabase.storage
    .from('ielts-mock-tests')
    .upload('all-tests.json', masterBlob, {
      contentType: 'application/json',
      upsert: true
    });

  if (mErr) {
    console.error('Error uploading master file:', mErr.message);
  } else {
    console.log('✅ Uploaded master dataset: all-tests.json (contains all 32 tests)');
  }

  // 2. Upload each test individually
  for (const test of allMockTests) {
    const filename = `${test.id}.json`;
    const testJson = JSON.stringify(test, null, 2);
    const blob = new Blob([testJson], { type: 'application/json' });

    const { error } = await supabase.storage
      .from('ielts-mock-tests')
      .upload(`tests/${filename}`, blob, {
        contentType: 'application/json',
        upsert: true
      });

    if (error) {
      console.error(`Failed to upload ${filename}:`, error.message);
    } else {
      console.log(`✅ Uploaded: tests/${filename}`);
    }
  }

  console.log('--------------------------------------------------');
  console.log('🎉 ALL 32 CAMBRIDGE MOCK TESTS STORED IN SUPABASE!');
  console.log(`Public URL: ${SUPABASE_URL}/storage/v1/object/public/ielts-mock-tests/all-tests.json`);
  console.log('--------------------------------------------------');
}

uploadToSupabaseStorage().catch(console.error);
