import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadAudioFiles() {
  const audioDir = path.resolve('public/audio');
  const files = fs.readdirSync(audioDir).filter((f) => f.endsWith('.mp3'));

  console.log(`Uploading ${files.length} audio files to Supabase Storage (audio/)...`);

  for (const file of files) {
    const filePath = path.join(audioDir, file);
    const buffer = fs.readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from('ielts-mock-tests')
      .upload(`audio/${file}`, buffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (error) {
      console.error(`Failed to upload ${file}:`, error.message);
    } else {
      console.log(`✅ Uploaded audio/${file} -> ${SUPABASE_URL}/storage/v1/object/public/ielts-mock-tests/audio/${file}`);
    }
  }
}

uploadAudioFiles().catch(console.error);
