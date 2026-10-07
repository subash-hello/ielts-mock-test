import type { IELTSMockTest, FullMockTest } from '../types/ielts';

import {
  cambridge16Test1Reading, cambridge16Test1Listening, cambridge16Test1Writing,
  cambridge16Test2Reading, cambridge16Test2Listening, cambridge16Test2Writing,
  cambridge16Test3Reading, cambridge16Test3Listening, cambridge16Test3Writing,
  cambridge16Test4Reading, cambridge16Test4Listening, cambridge16Test4Writing,
} from './cambridge16';

import {
  cambridge18Test1Reading, cambridge18Test1Listening,
  cambridge18Test2Reading, cambridge18Test2Listening,
  cambridge18Test3Reading, cambridge18Test3Listening,
  cambridge18Test4Reading, cambridge18Test4Listening,
} from './cambridge18';

import {
  cambridge19Test1Reading, cambridge19Test1Listening,
  cambridge19Test2Reading, cambridge19Test2Listening,
  cambridge19Test3Reading, cambridge19Test3Listening,
  cambridge19Test4Reading, cambridge19Test4Listening,
} from './cambridge19';

import {
  cambridge20Test1Reading, cambridge20Test1Listening,
  cambridge20Test2Reading, cambridge20Test2Listening,
  cambridge20Test3Reading, cambridge20Test3Listening,
  cambridge20Test4Reading, cambridge20Test4Listening,
} from './cambridge20';

import {
  cambridge21Test1Reading, cambridge21Test1Listening,
  cambridge21Test2Reading, cambridge21Test2Listening,
  cambridge21Test3Reading, cambridge21Test3Listening,
  cambridge21Test4Reading, cambridge21Test4Listening,
} from './cambridge21';

import {
  cambridge18Test1Writing, cambridge18Test2Writing, cambridge18Test3Writing, cambridge18Test4Writing,
  cambridge19Test1Writing, cambridge19Test2Writing, cambridge19Test3Writing, cambridge19Test4Writing,
  cambridge20Test1Writing, cambridge20Test2Writing, cambridge20Test3Writing, cambridge20Test4Writing,
  cambridge21Test1Writing, cambridge21Test2Writing, cambridge21Test3Writing, cambridge21Test4Writing,
} from './cambridgeWritingTests';

export {
  cambridge16Test1Reading, cambridge16Test1Listening, cambridge16Test1Writing,
  cambridge16Test2Reading, cambridge16Test2Listening, cambridge16Test2Writing,
  cambridge16Test3Reading, cambridge16Test3Listening, cambridge16Test3Writing,
  cambridge16Test4Reading, cambridge16Test4Listening, cambridge16Test4Writing,
  cambridge18Test1Reading, cambridge18Test1Listening, cambridge18Test1Writing,
  cambridge18Test2Reading, cambridge18Test2Listening, cambridge18Test2Writing,
  cambridge18Test3Reading, cambridge18Test3Listening, cambridge18Test3Writing,
  cambridge18Test4Reading, cambridge18Test4Listening, cambridge18Test4Writing,
  cambridge19Test1Reading, cambridge19Test1Listening, cambridge19Test1Writing,
  cambridge19Test2Reading, cambridge19Test2Listening, cambridge19Test2Writing,
  cambridge19Test3Reading, cambridge19Test3Listening, cambridge19Test3Writing,
  cambridge19Test4Reading, cambridge19Test4Listening, cambridge19Test4Writing,
  cambridge20Test1Reading, cambridge20Test1Listening, cambridge20Test1Writing,
  cambridge20Test2Reading, cambridge20Test2Listening, cambridge20Test2Writing,
  cambridge20Test3Reading, cambridge20Test3Listening, cambridge20Test3Writing,
  cambridge20Test4Reading, cambridge20Test4Listening, cambridge20Test4Writing,
  cambridge21Test1Reading, cambridge21Test1Listening, cambridge21Test1Writing,
  cambridge21Test2Reading, cambridge21Test2Listening, cambridge21Test2Writing,
  cambridge21Test3Reading, cambridge21Test3Listening, cambridge21Test3Writing,
  cambridge21Test4Reading, cambridge21Test4Listening, cambridge21Test4Writing,
};

// All 60 authentic official Cambridge Academic tests (Books 16, 18, 19, 20, 21 — Reading, Listening & Writing)
export const allMockTests: IELTSMockTest[] = [
  // Cambridge 16 (Reading, Listening, Writing)
  cambridge16Test1Reading, cambridge16Test1Listening, cambridge16Test1Writing,
  cambridge16Test2Reading, cambridge16Test2Listening, cambridge16Test2Writing,
  cambridge16Test3Reading, cambridge16Test3Listening, cambridge16Test3Writing,
  cambridge16Test4Reading, cambridge16Test4Listening, cambridge16Test4Writing,

  // Cambridge 18 (Reading, Listening, Writing)
  cambridge18Test1Reading, cambridge18Test1Listening, cambridge18Test1Writing,
  cambridge18Test2Reading, cambridge18Test2Listening, cambridge18Test2Writing,
  cambridge18Test3Reading, cambridge18Test3Listening, cambridge18Test3Writing,
  cambridge18Test4Reading, cambridge18Test4Listening, cambridge18Test4Writing,

  // Cambridge 19 (Reading, Listening, Writing)
  cambridge19Test1Reading, cambridge19Test1Listening, cambridge19Test1Writing,
  cambridge19Test2Reading, cambridge19Test2Listening, cambridge19Test2Writing,
  cambridge19Test3Reading, cambridge19Test3Listening, cambridge19Test3Writing,
  cambridge19Test4Reading, cambridge19Test4Listening, cambridge19Test4Writing,

  // Cambridge 20 (Reading, Listening, Writing)
  cambridge20Test1Reading, cambridge20Test1Listening, cambridge20Test1Writing,
  cambridge20Test2Reading, cambridge20Test2Listening, cambridge20Test2Writing,
  cambridge20Test3Reading, cambridge20Test3Listening, cambridge20Test3Writing,
  cambridge20Test4Reading, cambridge20Test4Listening, cambridge20Test4Writing,

  // Cambridge 21 (Reading, Listening, Writing)
  cambridge21Test1Reading, cambridge21Test1Listening, cambridge21Test1Writing,
  cambridge21Test2Reading, cambridge21Test2Listening, cambridge21Test2Writing,
  cambridge21Test3Reading, cambridge21Test3Listening, cambridge21Test3Writing,
  cambridge21Test4Reading, cambridge21Test4Listening, cambridge21Test4Writing,
];

export function getMockTestById(id: string): IELTSMockTest | undefined {
  return allMockTests.find((t) => t.id === id);
}

export function getTestsByBookAndModule(book: number, module?: 'reading' | 'listening' | 'writing'): IELTSMockTest[] {
  return allMockTests.filter((t) => t.book === book && (!module || t.module === module));
}

// Build full mock test bundles (reading + listening + optional writing from same book/test number)
export function buildFullMockTests(testsPool: IELTSMockTest[] = allMockTests): FullMockTest[] {
  const fullTests: FullMockTest[] = [];
  const books = [...new Set(testsPool.map((t) => t.book))].sort();

  for (const book of books) {
    const bookTests = testsPool.filter((t) => t.book === book);
    const testNumbers = [...new Set(bookTests.map((t) => t.testNumber))].sort();

    for (const testNum of testNumbers) {
      const reading = bookTests.find((t) => t.testNumber === testNum && t.module === 'reading');
      const listening = bookTests.find((t) => t.testNumber === testNum && t.module === 'listening');
      const writing = bookTests.find((t) => t.testNumber === testNum && t.module === 'writing');

      if (reading && listening) {
        fullTests.push({
          id: `cambridge-${book}-test-${testNum}-full`,
          book,
          testNumber: testNum,
          title: `Cambridge ${book} Test ${testNum} — Full Mock`,
          readingTest: reading,
          listeningTest: listening,
          writingTest: writing || undefined,
          totalDurationMinutes: reading.durationMinutes + listening.durationMinutes + (writing ? writing.durationMinutes : 0),
        });
      }
    }
  }

  return fullTests;
}

export const allFullMockTests: FullMockTest[] = buildFullMockTests();
