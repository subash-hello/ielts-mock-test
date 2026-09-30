import fs from 'fs';
import * as cheerio from 'cheerio';
import type { IELTSMockTest, IELTSSection, IELTSQuestionGroup, IELTSQuestion } from '../src/types/ielts';

export function parseAnswers(text: string, moduleType: 'reading' | 'listening'): Record<number, string> {
  const answers: Record<number, string> = {};
  const ansKeyword = moduleType === 'reading' ? /Answer Cam \d+ Reading Test \d+/i : /Answer Cam \d+ Listening Test \d+/i;
  const match = text.search(ansKeyword);
  const startIdx = match !== -1 ? match : text.search(/Answer[^\n\r]*Test/i);
  if (startIdx === -1) return answers;

  let afterAns = text.slice(startIdx);
  if (moduleType === 'listening') {
    const audioScriptIdx = afterAns.indexOf('Audioscript');
    if (audioScriptIdx !== -1) afterAns = afterAns.slice(0, audioScriptIdx);
  }
  const adsIdx = afterAns.indexOf('Advertisements');
  if (adsIdx !== -1) afterAns = afterAns.slice(0, adsIdx);

  afterAns = afterAns.replace(/(Passage|Part)\s*([1-4])\s*(\d+)/gi, '$1 $2\n$3');
  const lines = afterAns.split('\n').map(l => l.trim()).filter(Boolean);
  
  for (const line of lines) {
    const multiMatch = line.match(/^(\d+)\s*(?:&|and)\s*(\d+)\.?\s+([A-Za-z0-9,\s\(\)\/\-]+)/i);
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

    const singleMatch = line.match(/^(\d+)\.?\s+([^\n\r]+)/);
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

export function parseReadingTest(book: number, testNumber: number): IELTSMockTest {
  const html = fs.readFileSync(`cache_html/cam${book}-reading-test${testNumber}.html`, 'utf-8');
  const $ = cheerio.load(html);
  const content = $('.entry-content');
  const fullText = content.text() || $('body').text();
  const answers = parseAnswers(fullText, 'reading');

  // Find passage boundaries
  const p1Idx = fullText.search(/READING PASSAGE 1/i);
  const p2Idx = fullText.search(/READING PASSAGE 2/i);
  const p3Idx = fullText.search(/READING PASSAGE 3/i);
  const ansIdx = fullText.search(/Answer[^\n\r]*Test/i);

  const rawP1 = fullText.slice(p1Idx, p2Idx);
  const rawP2 = fullText.slice(p2Idx, p3Idx);
  const rawP3 = fullText.slice(p3Idx, ansIdx !== -1 ? ansIdx : fullText.length);

  const sections: IELTSSection[] = [
    parseReadingSection(1, rawP1, answers, 1, 13),
    parseReadingSection(2, rawP2, answers, 14, 26),
    parseReadingSection(3, rawP3, answers, 27, 40),
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

function parseReadingSection(
  sectionNumber: number,
  rawText: string,
  answers: Record<number, string>,
  startQ: number,
  endQ: number
): IELTSSection {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Extract Title: usually line 2 or 3 after "READING PASSAGE X" and "You should spend..."
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
      if (passageLines.length === 0 && line.length < 80 && !line.includes('.')) {
        subtitle = line;
      } else {
        passageLines.push(line);
      }
    } else {
      questionLines.push(line);
    }
  }

  // Format Passage HTML
  const passageContent = `
    <div class="space-y-4 text-slate-800 leading-relaxed font-serif">
      <h2 class="text-xl font-bold text-slate-900 font-sans mb-4">${subtitle}</h2>
      ${passageLines.map(p => {
        // If paragraph starts with "A ", "B ", "Paragraph A"
        const pMatch = p.match(/^([A-G])\s+(.*)/);
        if (pMatch) {
          return `<p><span class="font-bold text-indigo-700 font-sans mr-2 text-base">[${pMatch[1]}]</span>${pMatch[2]}</p>`;
        }
        return `<p>${p}</p>`;
      }).join('\n')}
    </div>
  `;

  // Parse Question Groups in this passage
  const questionGroups = parseQuestionGroups(questionLines, answers, startQ, endQ);

  return {
    sectionNumber,
    title: `Reading Passage ${sectionNumber}`,
    subtitle,
    passageContent,
    questionGroups
  };
}

function parseQuestionGroups(
  lines: string[],
  answers: Record<number, string>,
  startQ: number,
  endQ: number
): IELTSQuestionGroup[] {
  const groups: IELTSQuestionGroup[] = [];
  // Split questionLines by "Questions X-Y"
  let currentGroupLines: string[] = [];
  let groupTitle = '';

  for (const line of lines) {
    if (/^Questions?\s+\d+/i.test(line)) {
      if (currentGroupLines.length > 0) {
        groups.push(buildQuestionGroup(groupTitle, currentGroupLines, answers, startQ, endQ));
        currentGroupLines = [];
      }
      groupTitle = line;
    } else {
      currentGroupLines.push(line);
    }
  }

  if (currentGroupLines.length > 0) {
    groups.push(buildQuestionGroup(groupTitle, currentGroupLines, answers, startQ, endQ));
  }

  return groups;
}

function buildQuestionGroup(
  title: string,
  lines: string[],
  answers: Record<number, string>,
  minQ: number,
  maxQ: number
): IELTSQuestionGroup {
  const fullText = [title, ...lines].join('\n');
  const isTFNG = /TRUE|FALSE|NOT GIVEN/i.test(fullText);
  const isYNNG = /YES|NO|NOT GIVEN/i.test(fullText);
  const isMultipleChoice = /Choose the correct letter|Choose TWO letters/i.test(fullText);
  const isHeadings = /List of Headings|choose the correct heading/i.test(fullText);

  let type: any = 'sentence_completion';
  if (isTFNG) type = 'true_false_not_given';
  else if (isYNNG) type = 'yes_no_not_given';
  else if (isHeadings) type = 'matching_headings';
  else if (isMultipleChoice) type = 'multiple_choice';
  else if (/table/i.test(fullText)) type = 'table_completion';
  else if (/summary/i.test(fullText)) type = 'summary_completion';
  else if (/notes|complete the notes/i.test(fullText)) type = 'note_completion';

  // Extract instructions
  const instructions = lines.slice(0, 3).filter(l => !/^\d+[\s\.]/.test(l)).join(' ');

  // Extract questions
  const questions: IELTSQuestion[] = [];
  for (let q = minQ; q <= maxQ; q++) {
    // Check if q is in lines
    const qRegex = new RegExp(`^${q}[\\.\\s]+(.*)`, 'i');
    let foundPrompt = '';
    for (const l of lines) {
      const m = l.match(qRegex);
      if (m) {
        foundPrompt = m[1].trim();
        break;
      }
    }

    if (!foundPrompt) {
      // Check if line contains "...q..." or "q......"
      const inlineRegex = new RegExp(`(\\b${q}[\\.…\\_]{2,}[^\\n\\r]*)`, 'i');
      for (const l of lines) {
        const m = l.match(inlineRegex);
        if (m) {
          foundPrompt = m[1].trim();
          break;
        }
      }
    }

    // If q is in answers and belongs in this group range
    const qRangeMatch = title.match(/Questions?\s+(\d+)\s*[-–]\s*(\d+)/i);
    let inThisGroup = true;
    if (qRangeMatch) {
      const gStart = parseInt(qRangeMatch[1], 10);
      const gEnd = parseInt(qRangeMatch[2], 10);
      inThisGroup = q >= gStart && q <= gEnd;
    }

    if (inThisGroup && (foundPrompt || answers[q])) {
      const ans = answers[q] || '';
      questions.push({
        questionNumber: q,
        prompt: foundPrompt || `Question ${q}`,
        correctAnswer: ans,
        explanation: `Answer from Cambridge answer key: ${ans}`
      });
    }
  }

  return {
    id: `qg-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Math.random().toString(36).substring(2, 6)}`,
    type,
    title: title || 'Questions',
    instructions: instructions || 'Answer the questions according to the reading passage.',
    questions
  };
}

// Test parsing
const test2 = parseReadingTest(18, 2);
console.log('Test 2 parsed successfully!');
console.log('Title:', test2.title);
console.log('Sections:', test2.sections.map(s => ({
  title: s.title,
  subtitle: s.subtitle,
  groups: s.questionGroups.map(g => ({ title: g.title, type: g.type, qCount: g.questions.length }))
})));
