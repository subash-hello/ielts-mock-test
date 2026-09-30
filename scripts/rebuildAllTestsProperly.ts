import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import type { IELTSMockTest, IELTSSection, IELTSQuestionGroup, IELTSQuestion, IELTSQuestionType } from '../src/types/ielts';
import { parseAnswers } from './parseTestUtils';
import { detectQuestionType, extractQuestionsForGroup } from './robustTestParser';
import { cambridge18Test1Reading, cambridge18Test1Listening } from '../src/data/cambridge18';

export function parseRobustReadingTest(book: number, testNumber: number): IELTSMockTest {
  const html = fs.readFileSync(`cache_html/cam${book}-reading-test${testNumber}.html`, 'utf-8');
  const $ = cheerio.load(html);
  const content = $('.entry-content');
  const fullText = content.text() || $('body').text();
  const answers = parseAnswers(fullText, 'reading');

  const p1Idx = fullText.search(/READING PASSAGE 1/i);
  const p2Idx = fullText.search(/READING PASSAGE 2/i);
  const p3Idx = fullText.search(/READING PASSAGE 3/i);
  const ansIdx = fullText.search(/Answer[^\n\r]*Test/i);

  const rawP1 = fullText.slice(p1Idx, p2Idx);
  const rawP2 = fullText.slice(p2Idx, p3Idx);
  const rawP3 = fullText.slice(p3Idx, ansIdx !== -1 ? ansIdx : fullText.length);

  const sections: IELTSSection[] = [
    parseRobustSection(1, rawP1, answers, 1, 13),
    parseRobustSection(2, rawP2, answers, 14, 26),
    parseRobustSection(3, rawP3, answers, 27, 40),
  ];

  return {
    id: `cambridge-${book}-test-${testNumber}-reading`,
    book,
    testNumber,
    module: 'reading',
    title: `Cambridge ${book} Academic Reading Test ${testNumber}`,
    durationMinutes: 60,
    sections
  };
}

function parseRobustSection(
  sectionNumber: number,
  rawText: string,
  answers: Record<number, string>,
  startQ: number,
  endQ: number
): IELTSSection {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  let subtitle = `Reading Passage ${sectionNumber}`;
  let passageLines: string[] = [];
  let questionLines: string[] = [];
  let reachedQuestions = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^READING PASSAGE/i.test(line) || /^You should spend about 20 minutes/i.test(line)) {
      continue;
    }
    if (!reachedQuestions && /^Questions?\s+\d+/i.test(line)) {
      reachedQuestions = true;
    }

    if (!reachedQuestions) {
      if (passageLines.length === 0 && line.length < 80 && !line.includes('.') && !line.startsWith('Paragraph')) {
        subtitle = line;
      } else {
        passageLines.push(line);
      }
    } else {
      questionLines.push(line);
    }
  }

  const passageContent = `
    <div class="space-y-4 text-slate-800 leading-relaxed font-serif">
      <h2 class="text-xl font-bold text-slate-900 font-sans mb-4">${subtitle}</h2>
      ${passageLines.map(p => {
        const pMatch = p.match(/^([A-G])\s+(.*)/);
        if (pMatch) {
          return `<p><span class="font-bold text-indigo-700 font-sans mr-2 text-base">[${pMatch[1]}]</span>${pMatch[2]}</p>`;
        }
        return `<p>${p}</p>`;
      }).join('\n')}
    </div>
  `;

  // Parse Groups
  const groupDefs: { title: string; minQ: number; maxQ: number; lines: string[] }[] = [];
  let currTitle = '';
  let currLines: string[] = [];
  let currMin = startQ;
  let currMax = endQ;

  for (const l of questionLines) {
    const m = l.match(/^Questions?\s+(\d+)\s*(?:[-–]|and)\s*(\d+)/i);
    if (m) {
      if (currTitle) {
        groupDefs.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
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
    groupDefs.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
  }

  const questionGroups: IELTSQuestionGroup[] = groupDefs.map((g, idx) => {
    const type = detectQuestionType(g.title, g.lines);
    const questions = extractQuestionsForGroup(type, g.title, g.lines, answers, g.minQ, g.maxQ);
    const instructions = g.lines.slice(0, 3).filter(l => !/^\d+[\s\.]/.test(l)).join(' ');

    return {
      id: `r-sec${sectionNumber}-g${idx + 1}-${g.minQ}-${g.maxQ}`,
      type,
      title: g.title,
      instructions: instructions || 'Answer the questions according to the passage.',
      questions
    };
  });

  return {
    sectionNumber,
    title: `Reading Passage ${sectionNumber}`,
    subtitle,
    passageContent,
    questionGroups
  };
}

export function parseRobustListeningTest(book: number, testNumber: number): IELTSMockTest {
  const html = fs.readFileSync(`cache_html/cam${book}-listening-test${testNumber}.html`, 'utf-8');
  const $ = cheerio.load(html);
  const content = $('.entry-content');
  const fullText = content.text() || $('body').text();
  const answers = parseAnswers(fullText, 'listening');

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
    parseRobustListeningPart(1, rawP1, answers, 1, 10, `/audio/cam${book}-test${testNumber}-part1.${ext}`),
    parseRobustListeningPart(2, rawP2, answers, 11, 20, `/audio/cam${book}-test${testNumber}-part2.${ext}`),
    parseRobustListeningPart(3, rawP3, answers, 21, 30, `/audio/cam${book}-test${testNumber}-part3.${ext}`),
    parseRobustListeningPart(4, rawP4, answers, 31, 40, `/audio/cam${book}-test${testNumber}-part4.${ext}`),
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

function parseRobustListeningPart(
  partNumber: number,
  rawText: string,
  answers: Record<number, string>,
  startQ: number,
  endQ: number,
  audioUrl: string
): IELTSSection {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  let subtitle = `Listening Part ${partNumber}`;
  for (const l of lines) {
    if (!/^PART\s+\d/i.test(l) && !/^Questions?\s+\d/i.test(l) && !l.includes('http') && l.length > 3 && l.length < 60) {
      subtitle = l;
      break;
    }
  }

  // Find Groups
  const groupDefs: { title: string; minQ: number; maxQ: number; lines: string[] }[] = [];
  let currTitle = '';
  let currLines: string[] = [];
  let currMin = startQ;
  let currMax = endQ;

  for (const l of lines) {
    const m = l.match(/^Questions?\s+(\d+)\s*(?:[-–]|and)\s*(\d+)/i);
    if (m) {
      if (currTitle) {
        groupDefs.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
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
    groupDefs.push({ title: currTitle, minQ: currMin, maxQ: currMax, lines: currLines });
  }

  // Cloze Template if part 1 or 4
  const isClozePart = partNumber === 1 || partNumber === 4;
  let clozeFormatted = '';
  if (isClozePart) {
    const noteLines = lines.filter(l => !/^PART\s+\d/i.test(l) && !l.includes('http') && !/^Questions?\s+\d/i.test(l));
    clozeFormatted = noteLines.map(l => {
      return l.replace(/(\d+)\s*[…\.]{2,}/g, '{{$1}}')
              .replace(/(\d+)\s*£[…\.]{2,}/g, '£{{$1}}');
    }).join('\n');
  }

  const questionGroups: IELTSQuestionGroup[] = groupDefs.map((g, idx) => {
    const type = detectQuestionType(g.title, g.lines);
    const questions = extractQuestionsForGroup(type, g.title, g.lines, answers, g.minQ, g.maxQ);
    const instructions = g.lines.slice(0, 3).filter(l => !/^\d+[\s\.]/.test(l)).join(' ');

    return {
      id: `l-part${partNumber}-g${idx + 1}-${g.minQ}-${g.maxQ}`,
      type,
      title: g.title,
      instructions: instructions || (isClozePart ? 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.' : 'Choose the correct letter.'),
      clozeTemplate: isClozePart && idx === 0 ? clozeFormatted : undefined,
      questions
    };
  });

  return {
    sectionNumber: partNumber,
    title: `Listening Part ${partNumber}`,
    subtitle,
    audioUrl,
    questionGroups: questionGroups.length > 0 ? questionGroups : [
      {
        id: `l-part${partNumber}-fallback`,
        type: isClozePart ? 'form_completion' : 'multiple_choice',
        title: `Questions ${startQ} – ${endQ}`,
        instructions: isClozePart ? 'Complete the notes below.' : 'Choose the correct letter.',
        clozeTemplate: clozeFormatted,
        questions: extractQuestionsForGroup(isClozePart ? 'form_completion' : 'multiple_choice', `Questions ${startQ} – ${endQ}`, lines, answers, startQ, endQ)
      }
    ]
  };
}

function rebuildAllCambridge() {
  for (const book of [18, 19, 20, 21]) {
    console.log(`=== Rebuilding Cambridge ${book} Mock Tests ===`);
    const tests: any = {};

    for (let t = 1; t <= 4; t++) {
      if (book === 18 && t === 1) {
        tests[`cambridge${book}Test${t}Reading`] = cambridge18Test1Reading;
        tests[`cambridge${book}Test${t}Listening`] = cambridge18Test1Listening;
        console.log(`Cambridge ${book} Test ${t}: Handcrafted test preserved`);
        continue;
      }

      console.log(`Extracting robust Cambridge ${book} Test ${t} Reading...`);
      tests[`cambridge${book}Test${t}Reading`] = parseRobustReadingTest(book, t);

      console.log(`Extracting robust Cambridge ${book} Test ${t} Listening...`);
      tests[`cambridge${book}Test${t}Listening`] = parseRobustListeningTest(book, t);
    }

    const codeLines: string[] = [
      `import type { IELTSMockTest } from '../types/ielts';\n`
    ];

    for (let t = 1; t <= 4; t++) {
      const rKey = `cambridge${book}Test${t}Reading`;
      const lKey = `cambridge${book}Test${t}Listening`;
      codeLines.push(`export const ${rKey}: IELTSMockTest = ${JSON.stringify(tests[rKey], null, 2)};\n`);
      codeLines.push(`export const ${lKey}: IELTSMockTest = ${JSON.stringify(tests[lKey], null, 2)};\n`);
    }

    const outPath = path.resolve(`src/data/cambridge${book}.ts`);
    fs.writeFileSync(outPath, codeLines.join('\n'), 'utf-8');
    console.log(`✅ Saved ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  }
}

rebuildAllCambridge();
