import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('cache_html/cam18-reading-test2.html', 'utf-8');
const $ = cheerio.load(html);

let capturing = false;
$('.entry-content').find('h2, h3, h4, p').each((_, el) => {
  const txt = $(el).text().trim().replace(/\s+/g, ' ');
  if (txt.includes('Questions 20-23')) {
    capturing = true;
  } else if (txt.includes('READING PASSAGE 3')) {
    capturing = false;
  }

  if (capturing) {
    console.log($(el).prop('tagName'), ':', txt);
  }
});
