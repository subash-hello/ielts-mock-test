import fs from 'fs';
import * as cheerio from 'cheerio';

function extractProperPrompts(lines: string[], minQ: number, maxQ: number): Record<number, string> {
  const prompts: Record<number, string> = {};
  let currentSubheading = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    // Check if line is a subheading (e.g. "Stage 1:", "Benefits", "Person specification", "Purpose")
    if (
      (rawLine.endsWith(':') || (!rawLine.includes('…') && !rawLine.includes('...') && rawLine.length < 40 && !/^\d+/.test(rawLine))) &&
      !/^Questions?\s+\d+/i.test(rawLine) &&
      !/^Choose/i.test(rawLine) &&
      !/^Complete/i.test(rawLine) &&
      !/^Write/i.test(rawLine) &&
      !/^Do the following/i.test(rawLine)
    ) {
      currentSubheading = rawLine.replace(/[:●–\-]/g, '').trim();
    }

    // Check for each question number in this range
    for (let q = minQ; q <= maxQ; q++) {
      if (prompts[q]) continue;

      // Regex matching question number with dots/blanks or at start
      // e.g. "1………………." or "1............" or "1 £……………" or "1. " or "1 "
      const qBlankRegex = new RegExp(`(^|[^\\d])(${q})\\s*(?:£|\\$)?\\s*[…\\.]{2,}`, 'i');
      const qStartRegex = new RegExp(`^${q}[\\.\\s]+(.*)`, 'i');

      if (qBlankRegex.test(rawLine)) {
        // Clean line: remove leading bullet symbols
        let clean = rawLine.replace(/^[●–\-\*\o\s]+/, '').trim();
        // Replace "1………………." or "1 £……………" with "[ 1 ]"
        clean = clean.replace(new RegExp(`\\b${q}\\s*£\\s*[…\\.]{2,}`, 'g'), `£[ ${q} ]`)
                     .replace(new RegExp(`\\b${q}\\s*[…\\.]{2,}`, 'g'), `[ ${q} ]`);
        
        const prefix = currentSubheading ? `${currentSubheading}: ` : '';
        prompts[q] = prefix + clean;
        break;
      } else if (qStartRegex.test(rawLine)) {
        let clean = rawLine.replace(new RegExp(`^${q}[\\.\\s]+`), '').trim();
        prompts[q] = clean;
        break;
      }
    }
  }

  return prompts;
}

function testListening() {
  const html = fs.readFileSync('cache_html/cam18-listening-test2.html', 'utf-8');
  const $ = cheerio.load(html);
  const text = $('.entry-content').text();
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  console.log('\nExtracted Prompts for Listening Q1-10:');
  const prompts1 = extractProperPrompts(lines, 1, 10);
  for (let q = 1; q <= 10; q++) {
    console.log(`${q}: ${prompts1[q]}`);
  }

  console.log('\nExtracted Prompts for Listening Q11-20:');
  const prompts2 = extractProperPrompts(lines, 11, 20);
  for (let q = 11; q <= 20; q++) {
    console.log(`${q}: ${prompts2[q]}`);
  }

  console.log('\nExtracted Prompts for Listening Q31-40:');
  const prompts4 = extractProperPrompts(lines, 31, 40);
  for (let q = 31; q <= 40; q++) {
    console.log(`${q}: ${prompts4[q]}`);
  }
}

testListening();
