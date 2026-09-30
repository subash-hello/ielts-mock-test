import * as cheerio from 'cheerio';
async function test() {
  const resR = await fetch('https://ieltstrainingonline.com/practice-cam-18-reading-test-02-with-answer/');
  const htmlR = await resR.text();
  const $ = cheerio.load(htmlR);
  console.log('Number of tables:', $('table').length);
  $('table').each((i, tbl) => {
    console.log(`Table ${i}:`, $(tbl).text().slice(0, 100));
  });

  const resL = await fetch('https://ieltstrainingonline.com/practice-cam-18-listening-test-02/');
  const htmlL = await resL.text();
  const $l = cheerio.load(htmlL);
  const bodyTextL = $l('body').text();
  const ansIdxL = bodyTextL.indexOf('Answer Cam 18 Listening Test 02');
  console.log('=== Listening Answers ===');
  console.log(bodyTextL.slice(ansIdxL, ansIdxL + 800));

  const audioIdxL = bodyTextL.indexOf('Audioscript Cam 18 Listening Test 02');
  console.log('\n=== Listening Audioscript ===');
  console.log(bodyTextL.slice(audioIdxL, audioIdxL + 800));
}
test();
