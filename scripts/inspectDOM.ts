import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('cache_html/cam18-listening-test2.html', 'utf-8');
const $ = cheerio.load(html);

console.log('=== H3 & P in Part 2 & 3 ===');
$('.entry-content').find('h2, h3, h4, p, ol, ul').each((_, el) => {
  const text = $(el).text().trim();
  if (text.includes('Questions 11') || text.includes('Questions 21')) {
    console.log('--- FOUND ---', $(el).prop('tagName'), text);
    let curr = $(el).next();
    for (let i = 0; i < 8; i++) {
      console.log('  ', curr.prop('tagName'), ':', curr.text().trim().replace(/\s+/g, ' ').slice(0, 100));
      curr = curr.next();
    }
  }
});
