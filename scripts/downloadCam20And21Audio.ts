import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fqwdzxaprsefutccdqns.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function downloadAndUploadCam20And21() {
  const dir = path.resolve('public/audio');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const books = [
    { book: 20, year: 2025 },
    { book: 21, year: 2026 }
  ];

  for (const { book, year } of books) {
    console.log(`=== Downloading Cambridge ${book} Audio Tracks ===`);
    for (let t = 1; t <= 4; t++) {
      for (let p = 1; p <= 4; p++) {
        const filename = `cam${book}-test${t}-part${p}.mp3`;
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
          // URLs might be uppercase MP3 or lowercase mp3
          const candidateUrls = [
            `https://ieltstrainingonline.com/wp-content/uploads/${year}/07/cam${book}-test${t}-part${p}.MP3`,
            `https://ieltstrainingonline.com/wp-content/uploads/${year}/07/cam${book}-test${t}-part${p}.mp3`,
            `https://ieltstrainingonline.com/wp-content/uploads/${year}/06/cam${book}-test${t}-part${p}.MP3`,
            `https://ieltstrainingonline.com/wp-content/uploads/${year}/06/cam${book}-test${t}-part${p}.mp3`
          ];

          let downloaded = false;
          for (const url of candidateUrls) {
            try {
              const res = await fetch(url);
              if (res.ok) {
                const buf = await res.arrayBuffer();
                fs.writeFileSync(filePath, Buffer.from(buf));
                console.log(`[Downloaded] ${filename} from ${url} (${(buf.byteLength / 1024 / 1024).toFixed(2)} MB)`);
                downloaded = true;
                break;
              }
            } catch (err: any) {
              // try next
            }
          }

          if (!downloaded) {
            console.error(`[Failed] could not find audio for Cam ${book} Test ${t} Part ${p}`);
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
              contentType: 'audio/mpeg',
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
  }

  console.log('=== Finished Cambridge 20 & 21 Audio Sync ===');
}

downloadAndUploadCam20And21().catch(console.error);
