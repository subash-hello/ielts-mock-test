import * as cheerio from 'cheerio';

async function inspectAnswers() {
  const resR = await fetch('https://ieltstrainingonline.com/practice-cam-18-reading-test-02-with-answer/');
  const htmlR = await resR.text();
  const $r = cheerio.load(htmlR);
  
  $r('h2, h3').each((_, el) => {
    const txt = $r(el).text().trim();
    if (txt.includes('Answer Cam 18 Reading Test 02')) {
      console.log('Reading answers:');
      console.log($r(el).next().text().trim().slice(0, 500));
    }
  });

  const resL = await fetch('https://ieltstrainingonline.com/practice-cam-18-listening-test-02/');
  const htmlL = await resL.text();
  const $l = cheerio.load(htmlL);

  $l('h2, h3').each((_, el) => {
    const txt = $l(el).text().trim();
    if (txt.includes('Answer Cam 18 Listening Test 02')) {
      console.log('\nListening answers:');
      console.log($l(el).next().text().trim().slice(0, 500));
    }
  });
}

inspectAnswers().catch(console.error);
