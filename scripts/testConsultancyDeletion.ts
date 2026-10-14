/**
 * Comprehensive Consultancy Portal Deletion & Tombstone Verification Test
 * Verifies that deleting Results, Candidates, Stations, and Reports
 * from the consultancy portal permanently removes them and prevents resurrection.
 */

class MemoryStorage {
  private store: Map<string, string> = new Map();
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
  get length(): number {
    return this.store.size;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
}

class MockBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  constructor(name: string) {
    this.name = name;
  }
  postMessage(_data: any) {}
  addEventListener(_type: string, _listener: any) {}
  removeEventListener(_type: string, _listener: any) {}
  close() {}
}

(global as any).localStorage = new MemoryStorage();
(global as any).BroadcastChannel = MockBroadcastChannel;
(global as any).window = {
  localStorage: (global as any).localStorage,
  BroadcastChannel: MockBroadcastChannel
};

import { ConsultancyService } from '../src/services/consultancyService';
import type { TestResult, LabStation, ConsultancyStudent, SavedAIReport } from '../src/types/ielts';

let passed = 0;
let failed = 0;

function assert(condition: any, message: string) {
  if (!condition) {
    failed++;
    console.error(`  [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    passed++;
    console.log(`  [PASS] ${message}`);
  }
}

function assertEqual(actual: any, expected: any, message: string) {
  if (actual !== expected) {
    failed++;
    console.error(`  [FAIL] ${message} - expected: ${expected}, got: ${actual}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    passed++;
    console.log(`  [PASS] ${message}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('RUNNING CONSULTANCY PORTAL PERMANENT DELETION TESTS');
  console.log('======================================================\n');

  const cid = 'kiec-lalitpur';
  const branchCode = 'KIEC321';

  // --- TEST 1: Individual Result Deletion ---
  console.log('--- 1. Individual Result Deletion & Tombstone ---');
  const res1: TestResult = {
    testId: 'cambridge-16-test-1-reading',
    book: 16,
    testNumber: 1,
    module: 'reading',
    totalQuestions: 40,
    correctCount: 30,
    bandScore: 7.0,
    timeTakenSeconds: 3000,
    completedAt: '2026-10-14T05:00:00.000Z',
    answers: { 1: 'TRUE' },
    candidateName: 'Saroj Shrestha',
    candidateId: '009101',
    stationName: 'PC-01',
    consultancyId: cid,
    isPublished: true
  };

  ConsultancyService.saveTestResult(cid, res1);
  const beforeDel = ConsultancyService.getResults(cid);
  assert(beforeDel.some((r) => r.candidateId === '009101'), 'Result exists before deletion');

  // Delete it
  ConsultancyService.deleteTestResult(cid, res1.testId, res1.candidateId, res1.completedAt, (res1 as any).id);

  // Check it is deleted in local results under canonical and branch alias
  const afterDelCanonical = ConsultancyService.getResults(cid);
  const afterDelAlias = ConsultancyService.getResults(branchCode);
  assertEqual(afterDelCanonical.some((r) => r.candidateId === '009101'), false, 'Result deleted under canonical ID');
  assertEqual(afterDelAlias.some((r) => r.candidateId === '009101'), false, 'Result deleted under branch code alias');
  assert(ConsultancyService.isResultDeleted(cid, res1), 'isResultDeleted returns true for tombstoned result');

  // --- TEST 2: "Clear All Results" / Delete All Results ---
  console.log('\n--- 2. Clear All Results & Prevent Resurrecting ---');
  ConsultancyService.saveTestResult(cid, {
    ...res1,
    candidateId: '009102',
    candidateName: 'Dipesh Kumar'
  });
  ConsultancyService.saveTestResult(cid, {
    ...res1,
    candidateId: '009103',
    candidateName: 'Pooja Thapa'
  });
  assertEqual(ConsultancyService.getResults(cid).length, 2, '2 results exist before clearAllResults');

  ConsultancyService.clearAllResults(cid);
  assertEqual(ConsultancyService.getResults(cid).length, 0, '0 results exist after clearAllResults');
  assertEqual(ConsultancyService.getResults(branchCode).length, 0, '0 results exist under branchCode alias');

  // Revive by explicit save
  const newSubmission: TestResult = {
    testId: 'cambridge-16-test-2-reading',
    book: 16,
    testNumber: 2,
    module: 'reading',
    totalQuestions: 40,
    correctCount: 35,
    bandScore: 8.0,
    timeTakenSeconds: 3200,
    completedAt: new Date().toISOString(),
    answers: { 1: 'FALSE' },
    candidateName: 'New Candidate',
    candidateId: '009999',
    consultancyId: cid
  };
  ConsultancyService.saveTestResult(cid, newSubmission);
  assertEqual(ConsultancyService.getResults(cid).length, 1, 'New test result saved after clearAllResults is visible');

  // --- TEST 3: Student Candidate Deletion ---
  console.log('\n--- 3. Candidate Student Deletion & Prevent Auto-Recreation ---');
  const student: ConsultancyStudent = {
    id: 'std-test-101',
    consultancyId: cid,
    candidateNumber: '009105',
    fullName: 'Anil Shakya',
    email: 'anil@gmail.com',
    phone: '9841000000',
    targetBand: 7.5,
    enrolledDate: '2026-10-01',
    testsCompletedCount: 1,
    highestBand: 7.5,
    averageBand: 7.5
  };
  ConsultancyService.saveStudent(student);
  assert(ConsultancyService.getStudents(cid).some((s) => s.candidateNumber === '009105'), 'Student saved and visible');

  ConsultancyService.deleteStudent(cid, student.id, student.candidateNumber, student.fullName);
  assertEqual(ConsultancyService.getStudents(cid).some((s) => s.candidateNumber === '009105'), false, 'Student deleted from canonical');
  assertEqual(ConsultancyService.getStudents(branchCode).some((s) => s.candidateNumber === '009105'), false, 'Student deleted from branch alias');
  assert(ConsultancyService.isStudentDeleted(cid, student.id, student.fullName), 'isStudentDeleted returns true');
  assert(ConsultancyService.isStudentDeleted(cid, student.candidateNumber, student.fullName), 'isStudentDeleted by candidateNumber returns true');

  // Associated results for deleted student are also flagged as deleted
  const dummyRes = { candidateId: '009105', candidateName: 'Anil Shakya', testId: 'cambridge-16-test-1-reading' };
  assert(ConsultancyService.isResultDeleted(cid, dummyRes), 'Result of deleted student is also marked deleted');

  // Revive student explicitly
  ConsultancyService.saveStudent(student);
  assertEqual(ConsultancyService.getStudents(cid).some((s) => s.candidateNumber === '009105'), true, 'Student revived upon explicit save');

  // --- TEST 4: Lab PC Station Deletion ---
  console.log('\n--- 4. Lab PC Station Deletion & Multi-Alias Tombstone ---');
  const st1 = ConsultancyService.addStation(cid, 'PC-99');
  assert(ConsultancyService.getStations(cid).some((s) => s.name === 'PC-99'), 'Station PC-99 added');

  ConsultancyService.deleteStation(cid, st1.id);
  assertEqual(ConsultancyService.getStations(cid).some((s) => s.name === 'PC-99'), false, 'Station PC-99 deleted from canonical');
  assertEqual(ConsultancyService.getStations(branchCode).some((s) => s.name === 'PC-99'), false, 'Station PC-99 deleted from alias');
  assert(ConsultancyService.isStationDeleted(cid, 'PC-99'), 'isStationDeleted returns true for PC-99');
  assert(ConsultancyService.isStationDeleted(cid, st1.id), 'isStationDeleted returns true for station id');

  // Revive station explicitly
  ConsultancyService.addStation(cid, 'PC-99');
  assertEqual(ConsultancyService.getStations(cid).some((s) => s.name === 'PC-99'), true, 'Station PC-99 revived on explicit re-add');

  // --- TEST 5: AI Diagnostic Reports Deletion ---
  console.log('\n--- 5. AI Diagnostic Reports Deletion ---');
  const rep1: SavedAIReport = {
    id: 'rep-test-55',
    studentName: 'Bikram Shah',
    candidateId: '009106',
    testId: 'cambridge-16-test-1-reading',
    testTitle: 'Academic Reading - Cam 16 Test 1',
    module: 'reading',
    bandScore: 7.5,
    completedAt: '2026-10-14T06:00:00.000Z'
  };
  ConsultancyService.saveReport(cid, rep1);
  assert(ConsultancyService.getReports(cid).some((r) => r.candidateId === '009106'), 'Report saved and visible');

  ConsultancyService.deleteReport(cid, rep1.testId, rep1.candidateId, rep1.completedAt);
  assertEqual(ConsultancyService.getReports(cid).some((r) => r.candidateId === '009106'), false, 'Report deleted from canonical');
  assertEqual(ConsultancyService.getReports(branchCode).some((r) => r.candidateId === '009106'), false, 'Report deleted from alias');
  assert(ConsultancyService.isReportDeleted(cid, rep1), 'isReportDeleted returns true');

  // Delete all reports
  ConsultancyService.saveReport(cid, { ...rep1, candidateId: '009107', studentName: 'Suman Shrestha' });
  ConsultancyService.clearAllReports(cid);
  assertEqual(ConsultancyService.getReports(cid).length, 0, 'All reports cleared for consultancy');

  console.log('\n======================================================');
  console.log(`TOTAL ASSERTIONS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runTests().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
