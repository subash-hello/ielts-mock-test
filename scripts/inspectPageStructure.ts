import fs from 'fs';

async function inspect() {
  const rRes = await fetch('https://ieltstrainingonline.com/practice-cam-18-reading-test-01-with-answer/');
  const rHtml = await rRes.text();
  fs.writeFileSync('scripts/sample-reading.html', rHtml);

  const lRes = await fetch('https://ieltstrainingonline.com/practice-cam-18-listening-test-01/');
  const lHtml = await lRes.text();
  fs.writeFileSync('scripts/sample-listening.html', lHtml);

  console.log('Saved sample-reading.html length:', rHtml.length);
  console.log('Saved sample-listening.html length:', lHtml.length);
}
inspect().catch(console.error);
