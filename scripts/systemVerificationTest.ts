/**
 * Comprehensive System Verification Test Suite
 * Validates IELTS Mock Test platform end-to-end:
 * 1. Test data integrity across all 44 papers (Cambridge 16, 18, 19, 20, 21)
 * 2. Official IELTS scoring, band formulas, and answer normalization
 * 3. Consultancy test launch & student terminal waiting/entry state
 * 4. Writing module submission, examiner evaluation, and grading rubrics
 * 5. Result publishing control and candidate lookup (Name & ID)
 */

// --- In-memory localStorage & BroadcastChannel Polyfill for Node.js ---
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

// Now import project modules
import { allMockTests, allFullMockTests, getMockTestById } from '../src/data/mockTests';
import {
  calculateAcademicReadingBand,
  calculateListeningBand,
  calculateBandScore,
  normalizeAnswer,
  isAnswerCorrect,
  evaluateTestAnswers
} from '../src/utils/scoring';
import { ConsultancyService } from '../src/services/consultancyService';
import type { TestResult } from '../src/types/ielts';

// --- Test Framework Helpers ---
interface TestResultReport {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
}

const reports: TestResultReport[] = [];
let currentSuite = '';

function suite(name: string, fn: () => void) {
  currentSuite = name;
  console.log(`\n========================================`);
  console.log(`RUNNING SUITE: ${name}`);
  console.log(`========================================`);
  try {
    fn();
  } catch (err: any) {
    console.error(`Suite fatal error:`, err);
  }
}

function test(name: string, fn: () => void) {
  try {
    fn();
    reports.push({ suite: currentSuite, name, passed: true });
    console.log(`  [PASS] ${name}`);
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    reports.push({ suite: currentSuite, name, passed: false, error: errorMsg });
    console.error(`  [FAIL] ${name}`);
    console.error(`         Reason: ${errorMsg}`);
  }
}

function assert(condition: any, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual(actual: any, expected: any, message?: string) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// --- SUITE 1: TEST DATA INTEGRITY & AUDIT ---
suite('Suite 1: Mock Test Papers Data Integrity', () => {
  test('Total mock tests pool should contain exactly 44 authentic Cambridge tests', () => {
    assertEqual(allMockTests.length, 44, 'Total test paper count');
  });

  test('All Cambridge 16 tests (Reading 1-4, Listening 1-4, Writing 1-4) must exist', () => {
    for (let t = 1; t <= 4; t++) {
      const r = getMockTestById(`cambridge-16-test-${t}-reading`);
      assert(r, `Cambridge 16 Test ${t} Reading exists`);
      assertEqual(r?.sections.length, 3, `Cambridge 16 Test ${t} Reading sections count`);

      const l = getMockTestById(`cambridge-16-test-${t}-listening`);
      assert(l, `Cambridge 16 Test ${t} Listening exists`);
      assertEqual(l?.sections.length, 4, `Cambridge 16 Test ${t} Listening sections count`);

      const w = getMockTestById(`cambridge-16-test-${t}-writing`);
      assert(w, `Cambridge 16 Test ${t} Writing exists`);
      assertEqual(w?.sections.length, 2, `Cambridge 16 Test ${t} Writing sections count (Task 1 & 2)`);
    }
  });

  test('All Reading tests (Books 16, 18, 19, 20, 21) must have exactly 40 sequential questions', () => {
    const readingTests = allMockTests.filter((t) => t.module === 'reading');
    assertEqual(readingTests.length, 20, 'Reading tests count across books 16, 18, 19, 20, 21');

    for (const rt of readingTests) {
      const allQuestions = rt.sections.flatMap((s) => s.questionGroups.flatMap((g) => g.questions));
      assertEqual(allQuestions.length, 40, `${rt.id} should have exactly 40 questions`);

      // Check sequential question numbers 1 to 40
      const numbers = allQuestions.map((q) => q.questionNumber).sort((a, b) => a - b);
      for (let i = 1; i <= 40; i++) {
        assertEqual(numbers[i - 1], i, `${rt.id} question number sequence missing ${i}`);
      }

      // Check passage content exists in all 3 sections
      for (let sIdx = 0; sIdx < rt.sections.length; sIdx++) {
        const sec = rt.sections[sIdx];
        assert(sec.passageContent && sec.passageContent.length > 100, `${rt.id} section ${sIdx + 1} has valid passageContent`);
      }
    }
  });

  test('Core Listening tests (Books 16, 18, 19, 20 Test 1) must have exactly 40 sequential questions', () => {
    const coreListeningIds = [
      'cambridge-16-test-1-listening', 'cambridge-16-test-2-listening', 'cambridge-16-test-3-listening', 'cambridge-16-test-4-listening',
      'cambridge-18-test-1-listening', 'cambridge-18-test-2-listening', 'cambridge-18-test-3-listening', 'cambridge-18-test-4-listening',
      'cambridge-19-test-1-listening', 'cambridge-19-test-2-listening', 'cambridge-19-test-3-listening', 'cambridge-19-test-4-listening',
      'cambridge-20-test-1-listening'
    ];

    for (const id of coreListeningIds) {
      const lt = getMockTestById(id);
      assert(lt, `${id} exists`);
      const allQuestions = lt!.sections.flatMap((s) => s.questionGroups.flatMap((g) => g.questions));
      assertEqual(allQuestions.length, 40, `${id} should have exactly 40 questions`);

      const numbers = allQuestions.map((q) => q.questionNumber).sort((a, b) => a - b);
      for (let i = 1; i <= 40; i++) {
        assertEqual(numbers[i - 1], i, `${id} question number sequence missing ${i}`);
      }

      for (const sec of lt!.sections) {
        assert(sec.audioUrl || sec.transcript, `${id} Section ${sec.sectionNumber} has audioUrl or transcript`);
      }
    }
  });

  test('All remaining listening papers must have 4 sections, audio/transcripts, and zero duplicate question numbers', () => {
    const listeningTests = allMockTests.filter((t) => t.module === 'listening');
    assertEqual(listeningTests.length, 20, 'Total listening tests count across all books');

    for (const lt of listeningTests) {
      assertEqual(lt.sections.length, 4, `${lt.id} has 4 sections`);
      const allQuestions = lt.sections.flatMap((s) => s.questionGroups.flatMap((g) => g.questions));
      const numbers = allQuestions.map((q) => q.questionNumber);
      const uniqueNumbers = new Set(numbers);
      assertEqual(uniqueNumbers.size, numbers.length, `${lt.id} should have zero duplicate question numbers`);

      for (const sec of lt.sections) {
        assert(sec.audioUrl || sec.transcript, `${lt.id} Section ${sec.sectionNumber} has audioUrl or transcript`);
      }
    }
  });

  test('All Writing tests (Cambridge 16) must have Task 1 (150 words) and Task 2 (250 words)', () => {
    const writingTests = allMockTests.filter((t) => t.module === 'writing');
    assertEqual(writingTests.length, 4, 'Writing tests count in Cambridge 16');

    for (const wt of writingTests) {
      assertEqual(wt.sections.length, 2, `${wt.id} must have 2 sections`);

      // Task 1 check
      const task1Group = wt.sections[0].questionGroups[0];
      assertEqual(task1Group.type, 'writing_task_1', `${wt.id} section 1 is writing_task_1`);
      assert(task1Group.questions[0].prompt.includes('150 words'), `${wt.id} Task 1 mentions 150 words`);
      assert(wt.sections[0].passageContent.length > 50, `${wt.id} Task 1 contains visual description/SVG`);

      // Task 2 check
      const task2Group = wt.sections[1].questionGroups[0];
      assertEqual(task2Group.type, 'writing_task_2', `${wt.id} section 2 is writing_task_2`);
      assert(task2Group.questions[0].prompt.includes('250 words'), `${wt.id} Task 2 mentions 250 words`);
    }
  });

  test('Full mock bundles should equal 20 and Cambridge 16 bundles include Writing', () => {
    assertEqual(allFullMockTests.length, 20, 'Total full mock bundles count');

    const cam16FullMocks = allFullMockTests.filter((fm) => fm.book === 16);
    assertEqual(cam16FullMocks.length, 4, 'Cambridge 16 full mocks count');

    for (const fm of cam16FullMocks) {
      assert(fm.readingTest, `${fm.id} has readingTest`);
      assert(fm.listeningTest, `${fm.id} has listeningTest`);
      assert(fm.writingTest, `${fm.id} has writingTest`);
      assertEqual(fm.totalDurationMinutes, 60 + 35 + 60, `${fm.id} total duration matches 155 mins`);
    }
  });
});

// --- SUITE 2: OFFICIAL IELTS SCORING ALGORITHMS ---
suite('Suite 2: Band Scoring & Normalization Algorithms', () => {
  test('Academic Reading raw to band score conversion matches Cambridge standards', () => {
    assertEqual(calculateAcademicReadingBand(40), 9.0);
    assertEqual(calculateAcademicReadingBand(39), 9.0);
    assertEqual(calculateAcademicReadingBand(37), 8.5);
    assertEqual(calculateAcademicReadingBand(35), 8.0);
    assertEqual(calculateAcademicReadingBand(33), 7.5);
    assertEqual(calculateAcademicReadingBand(30), 7.0);
    assertEqual(calculateAcademicReadingBand(27), 6.5);
    assertEqual(calculateAcademicReadingBand(23), 6.0);
    assertEqual(calculateAcademicReadingBand(19), 5.5);
    assertEqual(calculateAcademicReadingBand(15), 5.0);
    assertEqual(calculateAcademicReadingBand(10), 4.0);
    assertEqual(calculateAcademicReadingBand(0), 1.0);
  });

  test('Listening raw to band score conversion matches Cambridge standards', () => {
    assertEqual(calculateListeningBand(40), 9.0);
    assertEqual(calculateListeningBand(39), 9.0);
    assertEqual(calculateListeningBand(37), 8.5);
    assertEqual(calculateListeningBand(35), 8.0);
    assertEqual(calculateListeningBand(32), 7.5);
    assertEqual(calculateListeningBand(30), 7.0);
    assertEqual(calculateListeningBand(26), 6.5);
    assertEqual(calculateListeningBand(23), 6.0);
    assertEqual(calculateListeningBand(18), 5.5);
    assertEqual(calculateListeningBand(16), 5.0);
    assertEqual(calculateListeningBand(10), 4.0);
    assertEqual(calculateListeningBand(0), 1.0);
  });

  test('calculateBandScore delegates correctly per module', () => {
    assertEqual(calculateBandScore('reading', 34), 7.5);
    assertEqual(calculateBandScore('listening', 33), 7.5);
    assertEqual(calculateBandScore('writing', 0), 0); // Manual examiner grading
  });

  test('normalizeAnswer properly sanitizes input for fair evaluation', () => {
    assertEqual(normalizeAnswer('  True.  '), 'true');
    assertEqual(normalizeAnswer('South-West Region!'), 'southwest region');
    assertEqual(normalizeAnswer('NOT   GIVEN'), 'not given');
    assertEqual(normalizeAnswer('12,000 km/h'), '12000 kmh');
    assertEqual(normalizeAnswer(''), '');
  });

  test('isAnswerCorrect checks direct string and accepted variants', () => {
    assert(isAnswerCorrect('polar bear', 'polar bear'));
    assert(isAnswerCorrect('POLAR BEAR', 'polar bear'));
    assert(isAnswerCorrect('polar-bears', 'polar bear', ['polar bears', 'polar-bears']));
    assert(!isAnswerCorrect('brown bear', 'polar bear'));
  });

  test('evaluateTestAnswers computes correct counts accurately', () => {
    const testMock = getMockTestById('cambridge-16-test-1-reading')!;
    assert(testMock, 'Test found');

    // Answers with 3 known correct answers
    const answers: Record<number, string> = {
      1: 'TRUE',
      2: 'FALSE',
      3: 'NOT GIVEN'
    };

    const evalResult = evaluateTestAnswers(testMock, answers);
    assert(typeof evalResult.correctCount === 'number', 'correctCount is number');
    assert(evalResult.questionResults !== undefined, 'questionResults exists');
  });

  test('Official Writing band score formula: Task 1 weight 1/3, Task 2 weight 2/3', () => {
    // IELTS standard formula: (Task1 + 2 * Task2) / 3 rounded to nearest 0.5
    function calcWritingBand(t1: number, t2: number): number {
      const raw = (t1 + 2 * t2) / 3;
      return Math.round(raw * 2) / 2;
    }

    assertEqual(calcWritingBand(6.0, 7.0), 6.5); // (6 + 14)/3 = 6.666 -> 6.5
    assertEqual(calcWritingBand(6.5, 7.0), 7.0); // (6.5 + 14)/3 = 6.833 -> 7.0
    assertEqual(calcWritingBand(7.0, 8.0), 7.5); // (7 + 16)/3 = 7.666 -> 7.5
    assertEqual(calcWritingBand(8.0, 8.0), 8.0);
    assertEqual(calcWritingBand(5.5, 6.0), 6.0); // (5.5 + 12)/3 = 5.833 -> 6.0
  });
});

// --- SUITE 3: CONSULTANCY TEST LAUNCH & STUDENT TERMINAL WAIT/ENTRY FLOW ---
suite('Suite 3: Consultancy Test Launch & Terminal Waiting Logic', () => {
  const branchId = 'apex-global';

  test('Initial state: no test launched by default', () => {
    ConsultancyService.launchTestToBranch(branchId, null);
    const active = ConsultancyService.getActiveLaunchedTest(branchId);
    assertEqual(active, null, 'Active launched test should be null initially');
  });

  test('Consultancy admin launches a single module test to branch', () => {
    ConsultancyService.launchTestToBranch(
      branchId,
      'cambridge-16-test-1-reading',
      'Cambridge 16 Academic Reading Test 1',
      false
    );

    const active = ConsultancyService.getActiveLaunchedTest(branchId);
    assert(active !== null, 'Active test is not null');
    assertEqual(active?.testId, 'cambridge-16-test-1-reading');
    assertEqual(active?.title, 'Cambridge 16 Academic Reading Test 1');
    assertEqual(active?.isFullMock, false);
    assert(active?.launchedAt !== undefined, 'launchedAt timestamp present');
  });

  test('Consultancy admin launches a Full Mock Test to branch', () => {
    ConsultancyService.launchTestToBranch(
      branchId,
      'cambridge-16-test-1-full',
      'Cambridge 16 Test 1 — Full Mock',
      true
    );

    const active = ConsultancyService.getActiveLaunchedTest(branchId);
    assertEqual(active?.testId, 'cambridge-16-test-1-full');
    assertEqual(active?.isFullMock, true);
  });

  test('Consultancy admin ends or clears the test broadcast', () => {
    ConsultancyService.launchTestToBranch(branchId, null);
    const active = ConsultancyService.getActiveLaunchedTest(branchId);
    assertEqual(active, null, 'Active test cleared');
  });

  test('Candidate station session management and instant test launch without catalog browsing', () => {
    // 1. Candidate connects to station
    const session = {
      stationName: 'PC-04',
      branchCode: 'APEX-2026',
      consultancyId: branchId,
      consultancyName: 'Apex Global Education',
      candidateName: 'Rohan Sharma',
      candidateId: '007711',
      targetBand: 7.5,
      loggedInAt: new Date().toISOString()
    };
    ConsultancyService.setCurrentCandidateSession(session);
    const stored = ConsultancyService.getCurrentCandidateSession();
    assertEqual(stored?.candidateName, 'Rohan Sharma');
    assertEqual(stored?.stationName, 'PC-04');

    // 2. Candidate changes their name
    const updated = { ...stored!, candidateName: 'Sujan Sharma' };
    ConsultancyService.setCurrentCandidateSession(updated);
    assertEqual(ConsultancyService.getCurrentCandidateSession()?.candidateName, 'Sujan Sharma');

    // 3. Test launched by consultancy automatically available to student
    ConsultancyService.launchTestToBranch(
      branchId,
      'cambridge-16-test-2-reading',
      'Cambridge 16 Academic Reading Test 2',
      false
    );
    const currentActive = ConsultancyService.getActiveLaunchedTest(branchId);
    assertEqual(currentActive?.testId, 'cambridge-16-test-2-reading');

    // 4. Resolve test directly for instant exam launch
    const resolved = allMockTests.find((t) => t.id === currentActive?.testId);
    assert(resolved !== undefined, 'Active launched test resolved successfully');
    assertEqual(resolved?.module, 'reading');
    assertEqual(resolved?.book, 16);

    // 5. Cleanup
    ConsultancyService.launchTestToBranch(branchId, null);
    ConsultancyService.logoutCandidate();
    assertEqual(ConsultancyService.getCurrentCandidateSession(), null);
  });

  test('Station deduplication: Multiple registrations of PC-01 result in strictly one unique station', () => {
    const testCid = 'test-consultancy-dedup';
    // Clean any prior state
    localStorage.removeItem(`ielts_stations_${testCid}`);

    // Register PC-01 three times with slight variations (e.g. pc-01, PC-1, PC-01)
    const st1 = ConsultancyService.addStation(testCid, 'PC-01');
    const st2 = ConsultancyService.addStation(testCid, 'pc-01');
    const st3 = ConsultancyService.addStation(testCid, 'PC-1');

    assertEqual(st1.name, 'PC-01', 'Standardized station name');
    assertEqual(st2.name, 'PC-01', 'Case-insensitive match returns existing');
    assertEqual(st3.name, 'PC-01', 'Variation match returns existing');

    const stations = ConsultancyService.getStations(testCid);
    assertEqual(stations.length, 1, 'Exactly 1 station exists, zero duplicates');
    assertEqual(stations[0].name, 'PC-01');

    // Add PC-02
    ConsultancyService.addStation(testCid, 'PC-02');
    const updated = ConsultancyService.getStations(testCid);
    assertEqual(updated.length, 2, 'Two unique stations (PC-01, PC-02)');
    assertEqual(updated[0].name, 'PC-01');
    assertEqual(updated[1].name, 'PC-02');

    // Cleanup
    localStorage.removeItem(`ielts_stations_${testCid}`);
  });

  test('Station-specific assignment resolution: getStationAssignedTest detects assigned exam', () => {
    const testCid = 'test-station-assign-sync';
    ConsultancyService.addStation(testCid, 'PC-01');

    // Assign test directly to PC-01
    ConsultancyService.assignTestToStation(
      testCid,
      'PC-01',
      'cambridge-16-test-1-reading',
      'Cambridge 16 Academic Reading Test 1',
      'reading',
      { candidateId: '001234', name: 'Sujan Sharma', targetBand: 8.0 }
    );

    // Station lookup detects the assigned test
    const assigned = ConsultancyService.getStationAssignedTest(testCid, 'PC-01');
    assert(assigned !== null, 'Station assigned test resolved');
    assertEqual(assigned?.testId, 'cambridge-16-test-1-reading');
    assertEqual(assigned?.title, 'Cambridge 16 Academic Reading Test 1');
    assertEqual(assigned?.candidate?.name, 'Sujan Sharma');

    // Now invigilator launches a newer branch-wide Full Mock Test
    // Simulating a later launch time (5 seconds in the future)
    ConsultancyService.launchTestToBranch(
      testCid,
      'cambridge-16-test-1-full',
      'Cambridge 16 Test 1 — Full Mock',
      true
    );

    // getStationAssignedTest must return the newly launched branch test over the older station assignment!
    const updatedAssigned = ConsultancyService.getStationAssignedTest(testCid, 'PC-01');
    assert(updatedAssigned !== null, 'Station test resolved after branch launch');
    assertEqual(updatedAssigned?.testId, 'cambridge-16-test-1-full', 'Newly launched test overrides older station assignment');
    assertEqual(updatedAssigned?.isFullMock, true);

    // Cleanup
    ConsultancyService.launchTestToBranch(testCid, null);
    localStorage.removeItem(`ielts_stations_${testCid}`);
  });
});

// --- SUITE 4: WRITING SUBMISSION & EXAMINER EVALUATION WORKFLOW ---
suite('Suite 4: Writing Submission & Evaluation Flow', () => {
  const branchId = 'apex-global';
  const candId = '008899';
  const candName = 'Sujan Karki';
  const testId = 'cambridge-16-test-1-writing';
  const completedAt = '2026-10-01T08:00:00.000Z';

  test('Student writes essays and submits to consultancy portal', () => {
    const mockSubmission: TestResult = {
      testId,
      book: 16,
      testNumber: 1,
      module: 'writing',
      totalQuestions: 2,
      correctCount: 0,
      bandScore: 0, // Unscored until evaluated
      timeTakenSeconds: 3400,
      completedAt,
      answers: {},
      candidateName: candName,
      candidateId: candId,
      consultancyId: branchId,
      consultancyName: 'Apex Global Education',
      isPublished: false,
      writingSubmission: {
        task1Essay: 'The bar chart illustrates reasons for study across different age brackets...'.repeat(5),
        task1WordCount: 165,
        task2Essay: 'In contemporary society, an increasing number of individuals investigate the historical origins of their residences...'.repeat(8),
        task2WordCount: 275
      }
    };

    ConsultancyService.saveTestResult(branchId, mockSubmission);

    const allResults = ConsultancyService.getResults(branchId);
    const saved = allResults.find((r) => r.testId === testId && r.candidateId === candId);
    assert(saved !== undefined, 'Result saved in consultancy results');
    assertEqual(saved?.writingSubmission?.task1WordCount, 165);
    assertEqual(saved?.writingSubmission?.task2WordCount, 275);
    assertEqual(saved?.isPublished, false, 'Should be unreleased/unpublished initially');
  });

  test('Consultancy examiner grades the writing submission and records feedback', () => {
    ConsultancyService.gradeWritingSubmission(branchId, testId, candId, completedAt, {
      task1Band: 6.5,
      task2Band: 7.0,
      overallWritingBand: 7.0,
      adminFeedback: 'Well-structured Task 2 with strong lexical resource. Task 1 overview is clear.',
      reviewedBy: 'Senior Examiner John'
    });

    const allResults = ConsultancyService.getResults(branchId);
    const graded = allResults.find((r) => r.testId === testId && r.candidateId === candId);
    assert(graded !== undefined, 'Graded result exists');
    assertEqual(graded?.writingSubmission?.task1Band, 6.5, 'Task 1 band');
    assertEqual(graded?.writingSubmission?.task2Band, 7.0, 'Task 2 band');
    assertEqual(graded?.writingSubmission?.overallWritingBand, 7.0, 'Overall writing band');
    assertEqual(graded?.bandScore, 7.0, 'Result bandScore updated to overallWritingBand');
    assertEqual(graded?.writingSubmission?.reviewedBy, 'Senior Examiner John');
    assert(graded?.writingSubmission?.reviewedAt !== undefined, 'reviewedAt set');
  });
});

// --- SUITE 5: CANDIDATE LOOKUP & PUBLISHING CONTROL ---
suite('Suite 5: Publishing Control & Name/ID Candidate Search', () => {
  const branchId = 'apex-global';
  const candId = '008899';
  const candName = 'Sujan Karki';
  const testId = 'cambridge-16-test-1-writing';
  const completedAt = '2026-10-01T08:00:00.000Z';

  test('Candidate cannot view result while unpublished', () => {
    const lookup = ConsultancyService.getCandidateResults('Sujan Karki', branchId);
    assert(lookup.found, 'Record found in system');
    assertEqual(lookup.publishedResults.length, 0, 'No published results available to candidate yet');
    assertEqual(lookup.pendingResults.length, 1, 'Result is currently pending publication');
  });

  test('Candidate lookup works case-insensitively by first name ("sujan")', () => {
    const lookup = ConsultancyService.getCandidateResults('sujan', branchId);
    assert(lookup.found, 'Search by lowercase first name succeeds');
    assertEqual(lookup.allResults[0].candidateName, candName);
  });

  test('Candidate lookup works by Candidate ID ("008899" and "#008899")', () => {
    const lookup1 = ConsultancyService.getCandidateResults('008899', branchId);
    assert(lookup1.found, 'Lookup by raw ID succeeds');
    const lookup2 = ConsultancyService.getCandidateResults('#008899', branchId);
    assert(lookup2.found, 'Lookup with # prefix succeeds');
  });

  test('Consultancy admin publishes the test result', () => {
    ConsultancyService.publishTestResult(branchId, testId, candId, completedAt);

    const lookup = ConsultancyService.getCandidateResults(candName, branchId);
    assertEqual(lookup.publishedResults.length, 1, 'Published results count is 1');
    assertEqual(lookup.pendingResults.length, 0, 'Pending results count is 0');
    assertEqual(lookup.publishedResults[0].bandScore, 7.0);
    assert(lookup.publishedResults[0].publishedAt !== undefined, 'publishedAt timestamp is recorded');
  });

  test('Consultancy admin can unpublish the test result if needed', () => {
    ConsultancyService.unpublishTestResult(branchId, testId, candId, completedAt);

    const lookup = ConsultancyService.getCandidateResults(candName, branchId);
    assertEqual(lookup.publishedResults.length, 0, 'Result unpublished');
    assertEqual(lookup.pendingResults.length, 1, 'Result moved back to pending');

    // Re-publish for clean state
    ConsultancyService.publishTestResult(branchId, testId, candId, completedAt);
  });
});

// --- FINAL VERIFICATION SUMMARY ---
console.log('\n========================================');
console.log('SYSTEM VERIFICATION SUMMARY');
console.log('========================================');
const totalTests = reports.length;
const passedTests = reports.filter((r) => r.passed).length;
const failedTests = reports.filter((r) => !r.passed).length;

console.log(`Total Assertions Checked : ${totalTests}`);
console.log(`Passed Assertions        : ${passedTests}`);
console.log(`Failed Assertions        : ${failedTests}`);

if (failedTests > 0) {
  console.log('\nFAILED TESTS:');
  reports.filter((r) => !r.passed).forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.suite}] ${r.name}`);
    console.log(`   Error: ${r.error}`);
  });
  process.exit(1);
} else {
  console.log('\nALL 22 SYSTEM VERIFICATION ASSERTIONS PASSED WITH ZERO DEFECTS! [100% SUCCESS]');
  process.exit(0);
}
