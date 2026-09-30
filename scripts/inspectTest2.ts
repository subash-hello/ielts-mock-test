import * as cheerio from 'cheerio';
import fs from 'fs';

async function inspectPages() {
  // 1. Fetch Cam 18 Test 2 Reading
  const resR = await fetch('https://ieltstrainingonline.com/practice-cam-18-reading-test-02-with-answer/');
  const htmlR = await resR.text();
  const $r = cheerio.load(htmlR);
  const contentR = $r('.entry-content');
  
  console.log('=== Reading Cam 18 Test 2 Headings ===');
  contentR.find('h1, h2, h3, h4').each((_, el) => {
    console.log($r(el).prop('tagName'), ':', $r(el).text().trim());
  });

  // 2. Fetch Cam 18 Test 2 Listening
  const resL = await fetch('https://ieltstrainingonline.com/practice-cam-18-listening-test-02/');
  const htmlL = await resL.text();
  const $l = cheerio.load(htmlL);
  const contentL = $l('.entry-content');

  console.log('\n=== Listening Cam 18 Test 2 Headings ===');
  contentL.find('h1, h2, h3, h4').each((_, el) => {
    console.log($l(el).prop('tagName'), ':', $l(el).text().trim());
  });
}

inspectPages().catch(console.error);
