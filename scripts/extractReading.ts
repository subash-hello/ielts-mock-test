import fs from 'fs';
import * as cheerio from 'cheerio';

function extractReadingTest1() {
  const html = fs.readFileSync('scripts/sample-reading.html', 'utf-8');
  const $ = cheerio.load(html);

  const content = $('.entry-content');

  // Let's print out the text between "READING PASSAGE 1" and "READING PASSAGE 2"
  const fullText = content.text();
  console.log('Total text length:', fullText.length);

  const p1Idx = fullText.indexOf('READING PASSAGE 1');
  const p2Idx = fullText.indexOf('READING PASSAGE 2');
  const p3Idx = fullText.indexOf('READING PASSAGE 3');
  const ansIdx = fullText.indexOf('Answer Cam 18 Reading Test 01');

  console.log('P1 start:', p1Idx, 'P2 start:', p2Idx, 'P3 start:', p3Idx, 'Ans start:', ansIdx);

  fs.writeFileSync('scripts/extracted_p1.txt', fullText.slice(p1Idx, p2Idx));
  fs.writeFileSync('scripts/extracted_p2.txt', fullText.slice(p2Idx, p3Idx));
  fs.writeFileSync('scripts/extracted_p3.txt', fullText.slice(p3Idx, ansIdx));
  console.log('Saved extracted_p1.txt, p2, p3');
}

extractReadingTest1();
