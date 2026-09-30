import * as cheerio from 'cheerio';

async function inspectListening() {
  const res = await fetch('https://ieltstrainingonline.com/practice-cam-18-listening-test-02/');
  const html = await res.text();
  const $ = cheerio.load(html);
  const text = $('.entry-content').text();

  const p1 = text.indexOf('PART 1');
  const p2 = text.indexOf('PART 2');
  console.log('--- LISTENING PART 1 ---');
  console.log(text.slice(p1, p2));
}

inspectListening();
