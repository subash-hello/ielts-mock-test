import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function downloadAndUploadAllAudio() {
  const dir = path.resolve('public/audio');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log('=== Step 2: Downloading all Cambridge 19 Audio Tracks ===');

  for (let t = 1; t <= 4; t++) {
    for (let p = 1; p <= 4; p++) {
      const filename = `cam19-test${t}-part${p}.m4a`;
      const filePath = path.join(dir, filename);

      let needDownload = true;
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 500000) {
          console.log(`[Local Exists] ${filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          needDownload = false;
        }
      }

      if (needDownload) {
        const url = `https://ieltstrainingonline.com/wp-content/uploads/2024/07/${filename}`;
        console.log(`Fetching ${filename} from ${url}...`);
        try {
          const res = await fetch(url);
          if (!res.ok) {
            console.error(`Failed to download ${url}: status ${res.status}`);
            continue;
          }
          const buf = await res.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buf));
          console.log(`[Downloaded] ${filename} (${(buf.byteLength / 1024 / 1024).toFixed(2)} MB)`);
        } catch (err: any) {
          console.error(`Error downloading ${filename}:`, err.message);
          continue;
        }
      }

      // Upload to Supabase Storage
      try {
        const fileContent = fs.readFileSync(filePath);
        const storagePath = `audio/${filename}`;
        const { error } = await supabase.storage
          .from('ielts-mock-tests')
          .upload(storagePath, fileContent, {
            contentType: 'audio/mp4',
            upsert: true
          });

        if (error) {
          console.error(`Supabase upload error for ${filename}:`, error.message);
        } else {
          console.log(`[Supabase Uploaded] ${storagePath}`);
        }
      } catch (err: any) {
        console.error(`Failed uploading ${filename} to Supabase:`, err.message);
      }
    }
  }

  console.log('=== Finished Cambridge 19 Audio Sync ===');
}

downloadAndUploadAllAudio().catch(console.error);
