import fs from 'fs';
import * as cheerio from 'cheerio';

function parseAnswers(text: string, moduleType: 'reading' | 'listening'): Record<number, string> {
  const answers: Record<number, string> = {};
  const ansKeyword = moduleType === 'reading' ? /Answer Cam \d+ Reading Test \d+/i : /Answer Cam \d+ Listening Test \d+/i;
  const match = text.search(ansKeyword);
  if (match === -1) {
    // Cambridge 21 might have "Answer Cam 21 Reading" or just "Answer" or "Key"
    const fallbackMatch = text.search(/Answer[^\n\r]*Test/i);
    if (fallbackMatch === -1) return answers;
  }

  const startIdx = match !== -1 ? match : text.search(/Answer[^\n\r]*Test/i);
  let afterAns = text.slice(startIdx);
  // Cut off advertisements or audioscripts if listening
  if (moduleType === 'listening') {
    const audioScriptIdx = afterAns.indexOf('Audioscript');
    if (audioScriptIdx !== -1) afterAns = afterAns.slice(0, audioScriptIdx);
  }
  const adsIdx = afterAns.indexOf('Advertisements');
  if (adsIdx !== -1) afterAns = afterAns.slice(0, adsIdx);

  afterAns = afterAns.replace(/(Passage|Part)\s*([1-4])\s*(\d+)/gi, '$1 $2\n$3');
  const lines = afterAns.split('\n').map(l => l.trim()).filter(Boolean);
  
  for (const line of lines) {
    const multiMatch = line.match(/^(\d+)\s*(?:&|and)\s*(\d+)\s+([A-Za-z0-9,\s\(\)\/\-]+)/i);
    if (multiMatch) {
      const q1 = parseInt(multiMatch[1], 10);
      const q2 = parseInt(multiMatch[2], 10);
      const parts = multiMatch[3].split(',').map(s => s.trim());
      if (parts.length >= 2) {
        answers[q1] = parts[0];
        answers[q2] = parts[1];
      } else {
        answers[q1] = multiMatch[3].trim();
        answers[q2] = multiMatch[3].trim();
      }
      continue;
    }

    const singleMatch = line.match(/^(\d+)\s+([^\n\r]+)/);
    if (singleMatch) {
      const qNum = parseInt(singleMatch[1], 10);
      const ansVal = singleMatch[2].replace(/\s+/g, ' ').trim();
      if (qNum >= 1 && qNum <= 40) {
        answers[qNum] = ansVal;
      }
    }
  }

  return answers;
}

function testAll() {
  for (const b of [18, 19, 20, 21]) {
    for (const t of [1, 2, 3, 4]) {
      // Reading
      const rHtml = fs.readFileSync(`cache_html/cam${b}-reading-test${t}.html`, 'utf-8');
      const $r = cheerio.load(rHtml);
      const rText = $r('.entry-content').text() || $r('body').text();
      const rAnswers = parseAnswers(rText, 'reading');

      // Listening
      const lHtml = fs.readFileSync(`cache_html/cam${b}-listening-test${t}.html`, 'utf-8');
      const $l = cheerio.load(lHtml);
      const lText = $l('.entry-content').text() || $l('body').text();
      const lAnswers = parseAnswers(lText, 'listening');

      console.log(`Cam ${b} Test ${t}: Reading Answers=${Object.keys(rAnswers).length}/40 | Listening Answers=${Object.keys(lAnswers).length}/40`);
    }
  }
}

testAll();
