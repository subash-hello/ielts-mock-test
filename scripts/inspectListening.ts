import fs from 'fs';
import * as cheerio from 'cheerio';

function inspectListening() {
  const html = fs.readFileSync('scripts/sample-listening.html', 'utf-8');
  const $ = cheerio.load(html);

  console.log('Title:', $('h1.entry-title').text().trim());

  $('h2, h3, h4').each((_, el) => {
    const t = $(el).text().trim();
    if (t.length > 0 && t.length < 100) {
      console.log(`[${el.tagName}]:`, t);
    }
  });

  // Find audio tags
  $('audio').each((_, el) => {
    console.log('Audio src:', $(el).attr('src'), $(el).find('source').attr('src'));
  });
}

inspectListening();
