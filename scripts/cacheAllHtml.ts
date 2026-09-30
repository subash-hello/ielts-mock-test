import fs from 'fs';
import path from 'path';

async function cacheAllHtml() {
  const cacheDir = path.resolve('cache_html');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

  const tests = [];
  for (const b of [18, 19, 20, 21]) {
    for (const t of [1, 2, 3, 4]) {
      const padT = t.toString().padStart(2, '0');
      // Reading URL
      const rUrl = b === 21
        ? `https://ieltstrainingonline.com/practice-cam-21-reading-test-${padT}/`
        : `https://ieltstrainingonline.com/practice-cam-${b}-reading-test-${padT}-with-answer/`;
      tests.push({
        type: 'reading',
        book: b,
        test: t,
        url: rUrl,
        filename: `cam${b}-reading-test${t}.html`
      });

      // Listening URL
      const lUrl = `https://ieltstrainingonline.com/practice-cam-${b}-listening-test-${padT}/`;
      tests.push({
        type: 'listening',
        book: b,
        test: t,
        url: lUrl,
        filename: `cam${b}-listening-test${t}.html`
      });
    }
  }

  console.log(`Starting cache of ${tests.length} tests...`);

  for (const item of tests) {
    const filePath = path.join(cacheDir, item.filename);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 10000) {
      console.log(`[Cached] ${item.filename}`);
      continue;
    }

    try {
      console.log(`Fetching ${item.filename} from ${item.url}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed ${item.url}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`[Saved] ${item.filename} (${(html.length / 1024).toFixed(1)} KB)`);
    } catch (err: any) {
      console.error(`Error caching ${item.filename}:`, err.message);
    }
  }

  console.log('Finished caching all HTML files!');
}

cacheAllHtml().catch(console.error);
