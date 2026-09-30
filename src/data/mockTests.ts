import type { IELTSMockTest } from '../types/ielts';

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

export {
  cambridge18Test1Reading, cambridge18Test1Listening,
  cambridge18Test2Reading, cambridge18Test2Listening,
  cambridge18Test3Reading, cambridge18Test3Listening,
  cambridge18Test4Reading, cambridge18Test4Listening,
  cambridge19Test1Reading, cambridge19Test1Listening,
  cambridge19Test2Reading, cambridge19Test2Listening,
  cambridge19Test3Reading, cambridge19Test3Listening,
  cambridge19Test4Reading, cambridge19Test4Listening,
  cambridge20Test1Reading, cambridge20Test1Listening,
  cambridge20Test2Reading, cambridge20Test2Listening,
  cambridge20Test3Reading, cambridge20Test3Listening,
  cambridge20Test4Reading, cambridge20Test4Listening,
  cambridge21Test1Reading, cambridge21Test1Listening,
  cambridge21Test2Reading, cambridge21Test2Listening,
  cambridge21Test3Reading, cambridge21Test3Listening,
  cambridge21Test4Reading, cambridge21Test4Listening,
};

// All 32 authentic official Cambridge Academic tests (Books 18, 19, 20, 21)
export const allMockTests: IELTSMockTest[] = [
  // Cambridge 18
  cambridge18Test1Reading, cambridge18Test1Listening,
  cambridge18Test2Reading, cambridge18Test2Listening,
  cambridge18Test3Reading, cambridge18Test3Listening,
  cambridge18Test4Reading, cambridge18Test4Listening,

  // Cambridge 19
  cambridge19Test1Reading, cambridge19Test1Listening,
  cambridge19Test2Reading, cambridge19Test2Listening,
  cambridge19Test3Reading, cambridge19Test3Listening,
  cambridge19Test4Reading, cambridge19Test4Listening,

  // Cambridge 20
  cambridge20Test1Reading, cambridge20Test1Listening,
  cambridge20Test2Reading, cambridge20Test2Listening,
  cambridge20Test3Reading, cambridge20Test3Listening,
  cambridge20Test4Reading, cambridge20Test4Listening,

  // Cambridge 21
  cambridge21Test1Reading, cambridge21Test1Listening,
  cambridge21Test2Reading, cambridge21Test2Listening,
  cambridge21Test3Reading, cambridge21Test3Listening,
  cambridge21Test4Reading, cambridge21Test4Listening,
];

export function getMockTestById(id: string): IELTSMockTest | undefined {
  return allMockTests.find((t) => t.id === id);
}

export function getTestsByBookAndModule(book: number, module?: 'reading' | 'listening'): IELTSMockTest[] {
  return allMockTests.filter((t) => t.book === book && (!module || t.module === module));
}
