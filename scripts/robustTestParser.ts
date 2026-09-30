import fs from 'fs';
import * as cheerio from 'cheerio';
import type { IELTSMockTest, IELTSSection, IELTSQuestionGroup, IELTSQuestion, IELTSQuestionType } from '../src/types/ielts';
import { parseAnswers } from './parseTestUtils';

// Helper to determine question type accurately
export function detectQuestionType(groupTitle: string, lines: string[]): IELTSQuestionType {
  const headerText = [groupTitle, ...lines.slice(0, 5)].join('\n');

  if (/List of Headings/i.test(headerText)) {
    return 'matching_headings';
  }
  if (/Label the (?:map|diagram|plan)/i.test(headerText)) {
    return 'diagram_labelling';
  }
  if (/Which paragraph contains/i.test(headerText) || /Match each/i.test(headerText)) {
    return 'matching_information';
  }
  if (/Choose (?:the correct letter|TWO letters|THREE letters)/i.test(headerText)) {
    return /TWO|THREE/i.test(headerText) ? 'multiple_choice_multi' : 'multiple_choice';
  }
  if (/TRUE\s*if the statement|TRUE\s*FALSE\s*NOT GIVEN/i.test(headerText)) {
    return 'true_false_not_given';
  }
  if (/YES\s*if the statement|YES\s*NO\s*NOT GIVEN/i.test(headerText)) {
    return 'yes_no_not_given';
  }
  if (/Complete the table/i.test(headerText)) {
    return 'table_completion';
  }
  if (/Complete the summary/i.test(headerText)) {
    return 'summary_completion';
  }
  if (/Complete the form/i.test(headerText)) {
    return 'form_completion';
  }
  if (/Complete the notes/i.test(headerText)) {
    return 'form_completion'; // renders cloze notes cleanly
  }
  if (/Complete the sentences/i.test(headerText)) {
    return 'sentence_completion';
  }
  if (/flow-?chart/i.test(headerText)) {
    return 'sentence_completion';
  }
  if (/Answer the questions/i.test(headerText)) {
    return 'short_answer';
  }

  // Fallback checks
  if (lines.some(l => /^[A-E]\s+/i.test(l))) {
    return 'multiple_choice';
  }
  return 'sentence_completion';
}

// Extract clean, full, complete question prompt and options
export function extractQuestionsForGroup(
  type: IELTSQuestionType,
  groupTitle: string,
  lines: string[],
  answers: Record<number, string>,
  minQ: number,
  maxQ: number
): IELTSQuestion[] {
  const questions: IELTSQuestion[] = [];
  
  // Extract options if this group contains a box of options A-F or list of names
  const boxOptions: string[] = [];
  for (const l of lines) {
    // Match line with multiple options e.g. "A medical practitioners B specialised tasks"
    const multiOptMatch = [...l.matchAll(/([A-I])\s+([A-Za-z\s\-]+?)(?=(?:[A-I]\s+|$))/g)];
    if (multiOptMatch.length >= 2) {
      for (const m of multiOptMatch) {
        boxOptions.push(`${m[1]}. ${m[2].trim()}`);
      }
    } else if (/^[A-I]\s+[A-Za-z]/i.test(l) && !/^\d+/.test(l)) {
      boxOptions.push(l.trim());
    }
  }

  // Pre-process lines to find subheadings
  let currentSubheading = '';
  const lineContexts: { text: string; subheading: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    const isSub =
      (rawLine.endsWith(':') || (!rawLine.includes('…') && !rawLine.includes('...') && rawLine.length < 50 && !/^\d+/.test(rawLine))) &&
      !/^Questions?\s+\d+/i.test(rawLine) &&
      !/^Choose/i.test(rawLine) &&
      !/^Complete/i.test(rawLine) &&
      !/^Write/i.test(rawLine) &&
      !/^Do the following/i.test(rawLine) &&
      !/^In boxes/i.test(rawLine) &&
      !/^[A-I]\s+/i.test(rawLine);

    if (isSub) {
      currentSubheading = rawLine.replace(/[:●–\-]/g, '').trim();
    }

    lineContexts.push({ text: rawLine, subheading: currentSubheading });
  }

  // For multi-select groups like "Questions 11 and 12: What are the TWO main reasons..."
  const isMultiSelectHeader = /Choose (?:TWO|THREE) letters/i.test(groupTitle) || lines.some(l => /Choose (?:TWO|THREE) letters/i.test(l));
  let multiSelectMainPrompt = '';
  if (isMultiSelectHeader) {
    for (const item of lineContexts) {
      if (item.text.length > 20 && !item.text.startsWith('Choose') && !item.text.startsWith('Write') && !/^[A-I]\s+/i.test(item.text)) {
        multiSelectMainPrompt = item.text.replace(/^[●–\-]/, '').trim();
        break;
      }
    }
  }

  for (let q = minQ; q <= maxQ; q++) {
    let prompt = '';
    let options: string[] | undefined = undefined;

    // 1. Check if multi-select
    if (isMultiSelectHeader && multiSelectMainPrompt) {
      const idx = q - minQ + 1;
      const ordinal = idx === 1 ? 'First choice' : idx === 2 ? 'Second choice' : 'Third choice';
      prompt = `${multiSelectMainPrompt} (${ordinal})`;
      options = boxOptions.length > 0 ? boxOptions : undefined;
    }

    // 2. Scan lines for standard question starting with "q." or "q " or "q) "
    if (!prompt) {
      for (let i = 0; i < lineContexts.length; i++) {
        const item = lineContexts[i];
        const qStartRegex = new RegExp(`^${q}[\\.\\)\\s]+(.*)`, 'i');
        const m = item.text.match(qStartRegex);
        if (m) {
          let fullPrompt = m[1].trim();
          // If followed by continuation lines that are not options or next question
          let j = i + 1;
          const foundOpts: string[] = [];
          while (j < lineContexts.length) {
            const nextText = lineContexts[j].text;
            if (/^\d+[\.\s]/.test(nextText) || /^Questions?\s+\d+/i.test(nextText)) {
              break;
            }
            if (/^[A-I][\.\s]/i.test(nextText)) {
              foundOpts.push(nextText);
            } else if (foundOpts.length === 0 && nextText.length > 3 && !nextText.endsWith(':') && !nextText.includes('……')) {
              fullPrompt += ' ' + nextText;
            }
            j++;
          }
          prompt = fullPrompt;
          if (foundOpts.length > 0) {
            options = foundOpts;
          }
          break;
        }
      }
    }

    // 3. Scan lines for blank with question number e.g. "q…………" or "q......"
    if (!prompt) {
      for (const item of lineContexts) {
        const qBlankRegex = new RegExp(`(^|[^\\d])(${q})\\s*(?:£|\\$)?\\s*[…\\.]{2,}`, 'i');
        if (qBlankRegex.test(item.text)) {
          let clean = item.text.replace(/^[●–\-\*\o\s]+/, '').trim();
          clean = clean.replace(new RegExp(`\\b${q}\\s*£\\s*[…\\.]{2,}`, 'g'), `£[ ${q} ]`)
                       .replace(new RegExp(`\\b${q}\\s*[…\\.]{2,}`, 'g'), `[ ${q} ]`);
          
          // If clean contains multiple sentences, extract the sentence containing [ q ]
          const sentences = clean.split(/(?<=[.!?])\s+/);
          for (const s of sentences) {
            if (s.includes(`[ ${q} ]`)) {
              clean = s.trim();
              break;
            }
          }

          const prefix = item.subheading ? `${item.subheading}: ` : '';
          prompt = prefix + clean;
          break;
        }
      }
    }

    // 4. Map/diagram labeling e.g. "15 School ……………."
    if (!prompt) {
      for (const item of lineContexts) {
        const labelRegex = new RegExp(`^${q}\\s+([A-Za-z\\s\\-]+)[…\\.\\_]{2,}`, 'i');
        const m = item.text.match(labelRegex);
        if (m) {
          prompt = `Label: ${m[1].trim()}`;
          break;
        }
      }
    }

    // Fallback if still not found
    if (!prompt) {
      prompt = `Question ${q}`;
    }

    // Attach box options if available and not already set
    if (!options && boxOptions.length > 0 && (type === 'summary_completion' || type === 'matching_information' || type === 'multiple_choice' || type === 'multiple_choice_multi' || type === 'diagram_labelling')) {
      options = boxOptions;
    }

    const ans = answers[q] || '';
    questions.push({
      questionNumber: q,
      prompt,
      options,
      correctAnswer: ans,
      explanation: `Official Cambridge answer: ${ans}`
    });
  }

  return questions;
}
