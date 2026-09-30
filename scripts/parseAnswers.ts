import fs from 'fs';
import * as cheerio from 'cheerio';

function printAnswers() {
  const html = fs.readFileSync('scripts/sample-reading.html', 'utf-8');
  const $ = cheerio.load(html);
  
  $('h2, h3').each((_, h) => {
    const txt = $(h).text().trim();
    if (txt.toLowerCase().includes('answer')) {
      console.log('Found heading:', txt);
      let curr = $(h).next();
      while (curr.length && !curr.is('h2')) {
        console.log(curr.text().trim());
        curr = curr.next();
      }
    }
  });
}
printAnswers();
