import { evaluateTestAnswers } from '../src/utils/scoring';
import { cambridge17Test1Listening, cambridge17Test1Reading } from '../src/data/cambridge17';
import { ConsultancyService } from '../src/services/consultancyService';

console.log('=== 1. VERIFYING CAMBRIDGE 17 LISTENING TEST 1 PAIRED QUESTIONS SCORING ===');
// Q15 correct is A, Q16 correct is D
// Forward order
const forwardAnswers: Record<number, string> = {
  15: 'A',
  16: 'D',
  17: 'B',
  18: 'C',
  19: 'D',
  20: 'E'
};
const resForward = evaluateTestAnswers(cambridge17Test1Listening, forwardAnswers);
console.log('Forward click order scoring (Q15-20):');
console.log('Q15:', resForward.questionResults[15], 'Q16:', resForward.questionResults[16]);
console.log('Q17:', resForward.questionResults[17], 'Q18:', resForward.questionResults[18]);
console.log('Q19:', resForward.questionResults[19], 'Q20:', resForward.questionResults[20]);
console.log('Total correct out of 6:', [15, 16, 17, 18, 19, 20].filter(q => resForward.questionResults[q]).length);

// Reverse order (student clicked options in opposite order)
const reverseAnswers: Record<number, string> = {
  15: 'D',
  16: 'A',
  17: 'C',
  18: 'B',
  19: 'E',
  20: 'D'
};
const resReverse = evaluateTestAnswers(cambridge17Test1Listening, reverseAnswers);
console.log('\nReverse click order scoring (Q15-20):');
console.log('Q15:', resReverse.questionResults[15], 'Q16:', resReverse.questionResults[16]);
console.log('Q17:', resReverse.questionResults[17], 'Q18:', resReverse.questionResults[18]);
console.log('Q19:', resReverse.questionResults[19], 'Q20:', resReverse.questionResults[20]);
console.log('Total correct out of 6:', [15, 16, 17, 18, 19, 20].filter(q => resReverse.questionResults[q]).length);

if (
  resForward.questionResults[15] && resForward.questionResults[16] &&
  resForward.questionResults[17] && resForward.questionResults[18] &&
  resForward.questionResults[19] && resForward.questionResults[20] &&
  resReverse.questionResults[15] && resReverse.questionResults[16] &&
  resReverse.questionResults[17] && resReverse.questionResults[18] &&
  resReverse.questionResults[19] && resReverse.questionResults[20]
) {
  console.log('✅ Listening paired questions pass unordered evaluation in both directions!');
} else {
  console.error('❌ Listening paired questions failed evaluation!');
  process.exit(1);
}

console.log('\n=== 2. VERIFYING CAMBRIDGE 17 READING TEST 1 PAIRED QUESTIONS SCORING (Q23-24) ===');
// Q23 is C, Q24 is D
const readFwd = evaluateTestAnswers(cambridge17Test1Reading, { 23: 'C', 24: 'D' });
const readRev = evaluateTestAnswers(cambridge17Test1Reading, { 23: 'D', 24: 'C' });
console.log('Reading Forward Q23:', readFwd.questionResults[23], 'Q24:', readFwd.questionResults[24]);
console.log('Reading Reverse Q23:', readRev.questionResults[23], 'Q24:', readRev.questionResults[24]);

if (readFwd.questionResults[23] && readFwd.questionResults[24] && readRev.questionResults[23] && readRev.questionResults[24]) {
  console.log('✅ Reading paired questions pass unordered evaluation in both directions!');
} else {
  console.error('❌ Reading paired questions failed evaluation!');
  process.exit(1);
}

console.log('\n=== 3. VERIFYING CONSULTANCY DEDUPLICATION KEY STABILITY ===');
// Client recorded at 10:00:10, Server recorded at 10:00:26
const r1 = {
  testId: 'cambridge-16-test-4-listening',
  candidateId: '007509',
  candidateName: 'JYOTI ADHIKARI',
  completedAt: '2026-11-06T10:00:10.000Z',
  bandScore: 8.0,
  isPublished: true
};
const r2 = {
  testId: 'cambridge-16-test-4-listening',
  candidateId: '#007509',
  candidateName: 'Jyoti Adhikari',
  completedAt: '2026-11-06T10:00:26.000Z',
  bandScore: 8.0,
  isPublished: false
};

const key1 = ConsultancyService.getResultKey(r1);
const key2 = ConsultancyService.getResultKey(r2);
console.log('Key 1:', key1);
console.log('Key 2:', key2);
if (key1 === key2) {
  console.log('✅ Duplicate client & server records yield the EXACT same canonical key!');
} else {
  console.error('❌ Duplicate records got different keys!');
  process.exit(1);
}

const merged = ConsultancyService.mergeTestResults(r2 as any, r1 as any);
console.log('Merged isPublished status:', merged.isPublished);
if (merged.isPublished === true) {
  console.log('✅ Published status correctly preserved across merges!');
} else {
  console.error('❌ Published status was lost in merge!');
  process.exit(1);
}

console.log('\n🎉 ALL SYSTEM VERIFICATION CHECKS PASSED!');
