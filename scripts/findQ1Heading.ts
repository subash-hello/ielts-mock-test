import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('cache_html/cam19-reading-test1.html', 'utf-8');
const $ = cheerio.load(html);

$('.entry-content').find('*').each((_, el) => {
  const text = $(el).text().trim();
  if (/^Questions?\s+1\b/i.test(text) && text.length < 50) {
    console.log($(el).prop('tagName'), ':', text);
  }
});
