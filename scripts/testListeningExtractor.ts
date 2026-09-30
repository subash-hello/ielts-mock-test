import fs from 'fs';
import * as cheerio from 'cheerio';
import { parseAnswers } from './parseFullReadingTest';
import type { IELTSMockTest, IELTSSection, IELTSQuestionGroup, IELTSQuestion } from '../src/types/ielts';

function extractListeningParts(book: number, testNumber: number) {
  const html = fs.readFileSync(`cache_html/cam${book}-listening-test${testNumber}.html`, 'utf-8');
  const $ = cheerio.load(html);
  const content = $('.entry-content');
  const text = content.text() || $('body').text();
  const answers = parseAnswers(text, 'listening');

  console.log(`=== Cambridge ${book} Test ${testNumber} Listening ===`);
  console.log('Total answers found:', Object.keys(answers).length);

  // Let's inspect headings inside entry-content
  content.find('h2, h3, h4').each((_, el) => {
    const hText = $(el).text().trim();
    if (!hText.includes('Cam') && !hText.includes('Answer') && !hText.includes('Audioscript')) {
      console.log('Heading:', $(el).prop('tagName'), hText);
    }
  });
}

extractListeningParts(18, 2);
extractListeningParts(19, 1);
