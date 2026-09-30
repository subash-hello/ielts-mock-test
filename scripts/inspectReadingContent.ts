import * as cheerio from 'cheerio';
import fs from 'fs';

async function inspectContent() {
  const res = await fetch('https://ieltstrainingonline.com/practice-cam-18-reading-test-02-with-answer/');
  const html = await res.text();
  const $ = cheerio.load(html);
  const text = $('.entry-content').text();
  
  // Let's see the text between "READING PASSAGE 1" and "READING PASSAGE 2"
  const p1 = text.indexOf('READING PASSAGE 1');
  const p2 = text.indexOf('READING PASSAGE 2');
  console.log('--- PASSAGE 1 FULL ---');
  console.log(text.slice(p1, p2));
}
inspectContent();
