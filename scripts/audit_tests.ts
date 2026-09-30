import { allMockTests } from '../src/data/mockTests';

console.log('Auditing Mock Tests...');
for (const test of allMockTests) {
  let qCount = 0;
  const qNums: number[] = [];
  for (const s of test.sections) {
    for (const g of s.questionGroups) {
      if (g.questions) {
        for (const q of g.questions) {
          qCount++;
          qNums.push(q.questionNumber);
        }
      }
    }
  }
  const missing: number[] = [];
  for (let i = 1; i <= 40; i++) {
    if (!qNums.includes(i)) {
      missing.push(i);
    }
  }
  console.log(
    `[${test.id}] (${test.module}) Total: ${qCount} | Missing: ${missing.length > 0 ? missing.join(',') : 'None'}`
  );
}
