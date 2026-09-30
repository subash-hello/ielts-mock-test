import fs from 'fs';
import * as cheerio from 'cheerio';

function inspectReading() {
  const html = fs.readFileSync('cache_html/cam18-reading-test2.html', 'utf-8');
  const $ = cheerio.load(html);
  
  $('.entry-content').find('h2, h3, h4, p').each((i, el) => {
    const tag = $(el).prop('tagName');
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    if (tag && text.length > 0 && (tag.startsWith('H') || text.includes('Questions') || text.includes('Choose') || text.includes('Complete') || text.includes('PASSAGE') || text.includes('Stage'))) {
      console.log(`${tag}: ${text.slice(0, 100)}`);
    }
  });
}

inspectReading();
