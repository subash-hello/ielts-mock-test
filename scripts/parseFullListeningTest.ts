import fs from 'fs';
import * as cheerio from 'cheerio';
import type { IELTSMockTest, IELTSSection, IELTSQuestionGroup, IELTSQuestion } from '../src/types/ielts';
import { parseAnswers } from './parseFullReadingTest';

export function parseListeningTest(book: number, testNumber: number): IELTSMockTest {
  const html = fs.readFileSync(`cache_html/cam${book}-listening-test${testNumber}.html`, 'utf-8');
  const $ = cheerio.load(html);
  const content = $('.entry-content');
  const fullText = content.text() || $('body').text();
  const answers = parseAnswers(fullText, 'listening');

  // Find Part boundaries
  const p1Idx = fullText.search(/PART 1/i);
  const p2Idx = fullText.search(/PART 2/i);
  const p3Idx = fullText.search(/PART 3/i);
  const p4Idx = fullText.search(/PART 4/i);
  const ansIdx = fullText.search(/Answer[^\n\r]*Test/i);

  const rawP1 = fullText.slice(p1Idx, p2Idx);
  const rawP2 = fullText.slice(p2Idx, p3Idx);
  const rawP3 = fullText.slice(p3Idx, p4Idx);
  const rawP4 = fullText.slice(p4Idx, ansIdx !== -1 ? ansIdx : fullText.length);

  const ext = book === 19 ? 'm4a' : 'mp3';

  const sections: IELTSSection[] = [
    parseListeningPart(1, rawP1, answers, 1, 10, `/audio/cam${book}-test${testNumber}-part1.${ext}`),
    parseListeningPart(2, rawP2, answers, 11, 20, `/audio/cam${book}-test${testNumber}-part2.${ext}`),
    parseListeningPart(3, rawP3, answers, 21, 30, `/audio/cam${book}-test${testNumber}-part3.${ext}`),
    parseListeningPart(4, rawP4, answers, 31, 40, `/audio/cam${book}-test${testNumber}-part4.${ext}`),
  ];

  return {
    id: `cambridge-${book}-test-${testNumber}-listening`,
    book,
    testNumber,
    module: 'listening',
    title: `Cambridge ${book} Academic Listening Test ${testNumber}`,
    durationMinutes: 35,
    audioUrl: `/audio/cam${book}-test${testNumber}-part1.${ext}`,
    sections
  };
}

function parseListeningPart(
  partNumber: number,
  rawText: string,
  answers: Record<number, string>,
  startQ: number,
  endQ: number,
  audioUrl: string
): IELTSSection {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // Identify subtitle
  let subtitle = `Listening Part ${partNumber}`;
  // Look for prominent heading that is not PART X or Questions X-Y
  for (const l of lines) {
    if (!/^PART\s+\d/i.test(l) && !/^Questions?\s+\d/i.test(l) && !l.includes('http') && l.length > 3 && l.length < 60) {
      subtitle = l;
      break;
    }
  }

  // Cloze template generation for parts 1 and 4 (and any notes sections)
  let clozeTemplate = '';
  const noteLines = lines.filter(l => !/^PART\s+\d/i.test(l) && !l.includes('http') && !/^Questions?\s+\d/i.test(l));
  
  // Replace inline blanks like "1…………………" or "1 £……………" with {{1}}
  const clozeFormatted = noteLines.map(l => {
    return l.replace(/(\d+)\s*[…\.]{2,}/g, '{{$1}}')
            .replace(/(\d+)\s*£[…\.]{2,}/g, '£{{$1}}');
  }).join('\n');

  // Build question list
  const questions: IELTSQuestion[] = [];
  for (let q = startQ; q <= endQ; q++) {
    const ans = answers[q] || '';
    questions.push({
      questionNumber: q,
      prompt: `Question ${q}`,
      correctAnswer: ans,
      explanation: `Official Cambridge answer: ${ans}`
    });
  }

  const questionGroup: IELTSQuestionGroup = {
    id: `l-part-${partNumber}-qg-${startQ}-${endQ}`,
    type: (partNumber === 1 || partNumber === 4) ? 'form_completion' : 'multiple_choice',
    title: `Questions ${startQ} – ${endQ}`,
    instructions: (partNumber === 1 || partNumber === 4)
      ? 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.'
      : 'Choose the correct letter or write the correct letter next to the questions.',
    clozeTemplate: clozeFormatted,
    questions
  };

  return {
    sectionNumber: partNumber,
    title: `Listening Part ${partNumber}`,
    subtitle,
    audioUrl,
    questionGroups: [questionGroup]
  };
}

const lTest2 = parseListeningTest(18, 2);
console.log('Listening Test 2 parsed successfully!');
console.log('Title:', lTest2.title);
console.log('Sections:', lTest2.sections.map(s => ({
  title: s.title,
  subtitle: s.subtitle,
  audioUrl: s.audioUrl,
  qCount: s.questionGroups[0].questions.length
})));
