import fs from 'fs';
import * as cheerio from 'cheerio';
import { parseAnswers } from './parseTestUtils';
import { detectQuestionType, extractQuestionsForGroup } from './robustTestParser';

function testReading() {
  const html = fs.readFileSync('cache_html/cam18-reading-test2.html', 'utf-8');
  const $ = cheerio.load(html);
  const text = $('.entry-content').text();
  const answers = parseAnswers(text, 'reading');
  const ansIdx = text.search(/Answer[^\n\r]*Test/i);
  const examText = ansIdx !== -1 ? text.slice(0, ansIdx) : text;
  const lines = examText.split('\n').map(l => l.trim()).filter(Boolean);

  // Find question groups
  const groups: { title: string; minQ: number; maxQ: number; lines: string[] }[] = [];
  let currTitle = '';
  let currLines: string[] = [];
  let currMin = 1;
  let currMax = 1;

  for (const l of lines) {
    const m = l.match(/^Questions?\s+(\d+)\s*(?:[-–]|and)\s*(\d+)/i);
    if (m) {
      if (currTitle) {
        groups.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
        currLines = [];
      }
      currTitle = l;
      currMin = parseInt(m[1], 10);
      currMax = parseInt(m[2], 10);
    } else if (currTitle) {
      currLines.push(l);
    }
  }
  if (currTitle) {
    groups.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
  }

  console.log(`=== Cambridge 18 Test 2 Reading Groups: ${groups.length} ===`);
  for (const g of groups) {
    const type = detectQuestionType(g.title, g.lines);
    const questions = extractQuestionsForGroup(type, g.title, g.lines, answers, g.minQ, g.maxQ);
    console.log(`\nGroup: ${g.title} | Detected Type: ${type} | Count: ${questions.length}`);
    for (const q of questions.slice(0, 3)) {
      console.log(`  Q${q.questionNumber}: "${q.prompt}" => Ans: "${q.correctAnswer}" ${q.options ? `[${q.options.length} options]` : ''}`);
    }
  }
}

function testListening() {
  const html = fs.readFileSync('cache_html/cam18-listening-test2.html', 'utf-8');
  const $ = cheerio.load(html);
  const text = $('.entry-content').text();
  const answers = parseAnswers(text, 'listening');
  const ansIdx = text.search(/Answer[^\n\r]*Test/i);
  const examText = ansIdx !== -1 ? text.slice(0, ansIdx) : text;
  const lines = examText.split('\n').map(l => l.trim()).filter(Boolean);

  const groups: { title: string; minQ: number; maxQ: number; lines: string[] }[] = [];
  let currTitle = '';
  let currLines: string[] = [];
  let currMin = 1;
  let currMax = 1;

  for (const l of lines) {
    const m = l.match(/^Questions?\s+(\d+)\s*(?:[-–]|and)\s*(\d+)/i);
    if (m) {
      if (currTitle) {
        groups.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
        currLines = [];
      }
      currTitle = l;
      currMin = parseInt(m[1], 10);
      currMax = parseInt(m[2], 10);
    } else if (currTitle) {
      currLines.push(l);
    }
  }
  if (currTitle) {
    groups.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
  }

  console.log(`\n=== Cambridge 18 Test 2 Listening Groups: ${groups.length} ===`);
  for (const g of groups) {
    const type = detectQuestionType(g.title, g.lines);
    const questions = extractQuestionsForGroup(type, g.title, g.lines, answers, g.minQ, g.maxQ);
    console.log(`\nGroup: ${g.title} | Detected Type: ${type} | Count: ${questions.length}`);
    for (const q of questions.slice(0, 3)) {
      console.log(`  Q${q.questionNumber}: "${q.prompt}" => Ans: "${q.correctAnswer}" ${q.options ? `[${q.options.length} options]` : ''}`);
    }
  }
}

testReading();
testListening();
