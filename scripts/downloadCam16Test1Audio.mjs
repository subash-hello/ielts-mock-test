import fs from 'fs';
import path from 'path';

/**
 * Downloads the original Cambridge IELTS 16 Test 1 listening audio (Parts 1-4)
 * into public/audio/cam16-test1-partN.mp3.
 */
const dir = path.resolve('public/audio');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

for (let p = 1; p <= 4; p++) {
  const filename = `cam16-test1-part${p}.mp3`;
  const candidates = [
    `https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam16-Test1-Part${p}.mp3`,
    `https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam16-Test1-Part${p}.MP3`,
    `https://ieltstrainingonline.com/wp-content/uploads/2021/07/cam16-test1-part${p}.mp3`
  ];
  let ok = false;
  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.byteLength < 500000) continue;
      fs.writeFileSync(path.join(dir, filename), buf);
      console.log(`[Downloaded] ${filename} <- ${url} (${(buf.byteLength / 1024 / 1024).toFixed(2)} MB)`);
      ok = true;
      break;
    } catch {
      // try next candidate
    }
  }
  if (!ok) console.error(`[Failed] ${filename}`);
}
