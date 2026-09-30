import fs from 'fs';
import * as cheerio from 'cheerio';

function analyzeReading() {
  const html = fs.readFileSync('scripts/sample-reading.html', 'utf-8');
  const $ = cheerio.load(html);

  const title = $('h1.entry-title').text().trim();
  console.log('Title:', title);

  const article = $('.entry-content');
  console.log('Article length:', article.text().length);

  // Check h2 and h3
  article.find('h2, h3, h4').each((i, el) => {
    console.log(`[H${el.tagName}]:`, $(el).text().trim());
  });

  // Check answer keys section
  console.log('--- Search for Answer Key ---');
  article.find('p, div, table').each((i, el) => {
    const txt = $(el).text().trim();
    if (txt.includes('Answer') && txt.includes('1.') && txt.includes('2.')) {
      console.log('Found answers block:', txt.slice(0, 300));
    }
  });
}

analyzeReading();
