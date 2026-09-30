import * as cheerio from 'cheerio';

async function inspectParts() {
  const res = await fetch('https://ieltstrainingonline.com/practice-cam-18-listening-test-02/');
  const html = await res.text();
  const $ = cheerio.load(html);
  const text = $('.entry-content').text();

  const p2 = text.indexOf('PART 2');
  const p3 = text.indexOf('PART 3');
  const p4 = text.indexOf('PART 4');
  const pAns = text.indexOf('Answer Cam 18 Listening Test 02');

  console.log('=== PART 2 ===');
  console.log(text.slice(p2, p3).slice(0, 1500));

  console.log('\n=== PART 3 ===');
  console.log(text.slice(p3, p4).slice(0, 1500));

  console.log('\n=== PART 4 ===');
  console.log(text.slice(p4, pAns).slice(0, 1500));
}

inspectParts();
