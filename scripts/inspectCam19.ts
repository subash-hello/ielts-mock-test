import fs from 'fs';
import * as cheerio from 'cheerio';

function inspectCam19() {
  const htmlR = fs.readFileSync('cache_html/cam19-reading-test1.html', 'utf-8');
  const $r = cheerio.load(htmlR);
  console.log('=== Cam 19 Reading 1 Headings & Questions ===');
  $r('.entry-content').find('h2, h3, h4').each((_, el) => {
    console.log($r(el).prop('tagName'), ':', $r(el).text().trim());
  });

  const htmlL = fs.readFileSync('cache_html/cam19-listening-test1.html', 'utf-8');
  const $l = cheerio.load(htmlL);
  console.log('\n=== Cam 19 Listening 1 Headings & Questions ===');
  $l('.entry-content').find('h2, h3, h4').each((_, el) => {
    console.log($l(el).prop('tagName'), ':', $l(el).text().trim());
  });
}

inspectCam19();
