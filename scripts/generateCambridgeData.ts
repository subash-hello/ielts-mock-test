import fs from 'fs';
import path from 'path';
import { parseReadingTestFromHtml, parseListeningTestFromHtml } from './parseTestUtils';
import { cambridge18Test1Reading, cambridge18Test1Listening } from '../src/data/cambridge18';

function generateCambridgeBook(book: number) {
  console.log(`=== Generating Authentic Cambridge ${book} Mock Tests ===`);
  const tests: any = {};

  for (let t = 1; t <= 4; t++) {
    if (book === 18 && t === 1) {
      tests[`cambridge${book}Test${t}Reading`] = cambridge18Test1Reading;
      tests[`cambridge${book}Test${t}Listening`] = cambridge18Test1Listening;
      console.log(`Cambridge ${book} Test ${t}: Using handcrafted verified test`);
      continue;
    }

    console.log(`Parsing Cambridge ${book} Test ${t} Reading...`);
    const rTest = parseReadingTestFromHtml(book, t);
    tests[`cambridge${book}Test${t}Reading`] = rTest;

    console.log(`Parsing Cambridge ${book} Test ${t} Listening...`);
    const lTest = parseListeningTestFromHtml(book, t);
    tests[`cambridge${book}Test${t}Listening`] = lTest;
  }

  // Format code
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

async function run() {
  for (const b of [18, 19, 20, 21]) {
    generateCambridgeBook(b);
  }
  console.log('All Cambridge 18, 19, 20, 21 datasets generated successfully!');
}

run().catch(console.error);
