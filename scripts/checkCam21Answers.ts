import fs from 'fs';
import * as cheerio from 'cheerio';

for (let t = 1; t <= 4; t++) {
  const rHtml = fs.readFileSync(`cache_html/cam21-reading-test${t}.html`, 'utf-8');
  const $r = cheerio.load(rHtml);
  const rText = $r('body').text();
  const rHasAns = rText.toLowerCase().includes('answer');
  console.log(`Cam 21 Reading ${t} has 'answer':`, rHasAns);

  const lHtml = fs.readFileSync(`cache_html/cam21-listening-test${t}.html`, 'utf-8');
  const $l = cheerio.load(lHtml);
  const lText = $l('body').text();
  const lHasAns = lText.toLowerCase().includes('answer');
  console.log(`Cam 21 Listening ${t} has 'answer':`, lHasAns);
}
