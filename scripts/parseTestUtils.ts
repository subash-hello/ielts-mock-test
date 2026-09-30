import fs from 'fs';
import * as cheerio from 'cheerio';
import type { IELTSMockTest, IELTSSection, IELTSQuestionGroup, IELTSQuestion } from '../src/types/ielts';

export function parseAnswers(text: string, moduleType: 'reading' | 'listening'): Record<number, string> {
  const answers: Record<number, string> = {};
  const ansKeyword = moduleType === 'reading' ? /Answer Cam \d+ Reading Test \d+/i : /Answer Cam \d+ Listening Test \d+/i;
  let match = text.search(ansKeyword);
  if (match === -1) {
    match = text.search(/Answer[^\n\r]*Test/i);
  }
  if (match === -1) return answers;

  let afterAns = text.slice(match);
  if (moduleType === 'listening') {
    const audioScriptIdx = afterAns.indexOf('Audioscript');
    if (audioScriptIdx !== -1) afterAns = afterAns.slice(0, audioScriptIdx);
  }
  const adsIdx = afterAns.indexOf('Advertisements');
  if (adsIdx !== -1) afterAns = afterAns.slice(0, adsIdx);

  afterAns = afterAns.replace(/(Passage|Part)\s*([1-4])\s*(\d+)/gi, '$1 $2\n$3');
  const lines = afterAns.split('\n').map(l => l.trim()).filter(Boolean);
  
  for (const line of lines) {
    // Multi answer e.g. "11&12 B, E" or "23 and 24 A, C"
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

    // Single answer e.g. "1 antlers" or "9. TRUE" or "22. guilt"
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

export function parseReadingTestFromHtml(book: number, testNumber: number): IELTSMockTest {
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

  const questionGroups = parseReadingQuestionGroups(questionLines, answers, startQ, endQ);

  return {
    sectionNumber,
    title: `Reading Passage ${sectionNumber}`,
    subtitle,
    passageContent,
    questionGroups
  };
}

function parseReadingQuestionGroups(
  lines: string[],
  answers: Record<number, string>,
  startQ: number,
  endQ: number
): IELTSQuestionGroup[] {
  const groups: IELTSQuestionGroup[] = [];
  let currentGroupLines: string[] = [];
  let groupTitle = '';

  for (const line of lines) {
    if (/^Questions?\s+\d+/i.test(line)) {
      if (currentGroupLines.length > 0) {
        groups.push(buildReadingQuestionGroup(groupTitle, currentGroupLines, answers, startQ, endQ));
        currentGroupLines = [];
      }
      groupTitle = line;
    } else {
      currentGroupLines.push(line);
    }
  }

  if (currentGroupLines.length > 0) {
    groups.push(buildReadingQuestionGroup(groupTitle, currentGroupLines, answers, startQ, endQ));
  }

  return groups;
}

function buildReadingQuestionGroup(
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
  const isTable = /table/i.test(fullText);
  const isSummary = /summary/i.test(fullText);
  const isNotes = /notes|complete the notes/i.test(fullText);

  let type: any = 'sentence_completion';
  if (isTFNG) type = 'true_false_not_given';
  else if (isYNNG) type = 'yes_no_not_given';
  else if (isHeadings) type = 'matching_headings';
  else if (isMultipleChoice) type = 'multiple_choice';
  else if (isTable) type = 'table_completion';
  else if (isSummary) type = 'summary_completion';
  else if (isNotes) type = 'note_completion';

  // Instructions
  const instructions = lines.slice(0, 3).filter(l => !/^\d+[\s\.]/.test(l)).join(' ');

  // Range of questions
  const qRangeMatch = title.match(/Questions?\s+(\d+)\s*[-–]\s*(\d+)/i);
  let gStart = minQ;
  let gEnd = maxQ;
  if (qRangeMatch) {
    gStart = parseInt(qRangeMatch[1], 10);
    gEnd = parseInt(qRangeMatch[2], 10);
  }

  const questions: IELTSQuestion[] = [];
  for (let q = gStart; q <= gEnd; q++) {
    const qRegex = new RegExp(`^${q}[\\.\\s]+(.*)`, 'i');
    let foundPrompt = '';
    let foundOptions: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const m = l.match(qRegex);
      if (m) {
        foundPrompt = m[1].trim();
        // Check following lines for options A, B, C, D
        let j = i + 1;
        while (j < lines.length && /^[A-E]\s+/i.test(lines[j])) {
          foundOptions.push(lines[j].trim());
          j++;
        }
        break;
      }
    }

    if (!foundPrompt) {
      // Try inline bullet
      const inlineRegex = new RegExp(`(\\b${q}[\\.…\\_]{2,}[^\\n\\r]*)`, 'i');
      for (const l of lines) {
        const m = l.match(inlineRegex);
        if (m) {
          foundPrompt = m[1].trim();
          break;
        }
      }
    }

    const ans = answers[q] || '';
    questions.push({
      questionNumber: q,
      prompt: foundPrompt || `Question ${q}`,
      options: foundOptions.length > 0 ? foundOptions : undefined,
      correctAnswer: ans,
      explanation: `Official Cambridge answer: ${ans}`
    });
  }

  return {
    id: `rg-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Math.random().toString(36).substring(2, 6)}`,
    type,
    title: title || 'Questions',
    instructions: instructions || 'Answer the questions according to the reading passage.',
    questions
  };
}

export function parseListeningTestFromHtml(book: number, testNumber: number): IELTSMockTest {
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

  let subtitle = `Listening Part ${partNumber}`;
  for (const l of lines) {
    if (!/^PART\s+\d/i.test(l) && !/^Questions?\s+\d/i.test(l) && !l.includes('http') && l.length > 3 && l.length < 60) {
      subtitle = l;
      break;
    }
  }

  // Generate Cloze Template
  const noteLines = lines.filter(l => !/^PART\s+\d/i.test(l) && !l.includes('http') && !/^Questions?\s+\d/i.test(l));
  const clozeFormatted = noteLines.map(l => {
    return l.replace(/(\d+)\s*[…\.]{2,}/g, '{{$1}}')
            .replace(/(\d+)\s*£[…\.]{2,}/g, '£{{$1}}');
  }).join('\n');

  // Extract Question Prompts & Options
  const questions: IELTSQuestion[] = [];
  for (let q = startQ; q <= endQ; q++) {
    const qRegex = new RegExp(`^${q}[\\.\\s]+(.*)`, 'i');
    let foundPrompt = '';
    let foundOptions: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const m = l.match(qRegex);
      if (m) {
        foundPrompt = m[1].trim();
        let j = i + 1;
        while (j < lines.length && /^[A-E]\s+/i.test(lines[j])) {
          foundOptions.push(lines[j].trim());
          j++;
        }
        break;
      }
    }

    const ans = answers[q] || '';
    questions.push({
      questionNumber: q,
      prompt: foundPrompt || `Question ${q}`,
      options: foundOptions.length > 0 ? foundOptions : undefined,
      correctAnswer: ans,
      explanation: `Official Cambridge answer: ${ans}`
    });
  }

  const isClozePart = partNumber === 1 || partNumber === 4;
  const questionGroup: IELTSQuestionGroup = {
    id: `lg-part-${partNumber}-${startQ}-${endQ}`,
    type: isClozePart ? 'form_completion' : 'multiple_choice',
    title: `Questions ${startQ} – ${endQ}`,
    instructions: isClozePart
      ? 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.'
      : 'Choose the correct letter or write the correct letter next to the questions.',
    clozeTemplate: isClozePart ? clozeFormatted : undefined,
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
