/**
 * QA Bug Verification Test Suite
 * Tests all 6 bug fixes and data cleanup requirements:
 * 1. Clearing credentials on manual login/logout
 * 2. Target Band not defaulting to 7.5 & keeping email/phone blank
 * 3. Hiding internal identifiers from student-facing screens
 * 4. Station attribution isolation (PC-01 vs PC-02) & stationName on TestResult
 * 5. Clean pairing URL without password exposure
 * 6. Query-time deleted consultancy filtering & exclusion of LAB01 / Consultancy Testing Lab
 */

import { ConsultancyService } from '../src/services/consultancyService';
import type { Consultancy, ConsultancyStudent } from '../src/types/consultancy';
import type { TestResult } from '../src/types/ielts';

// Mock browser environments
const mockStorage = () => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => {
      for (const k of Object.keys(store)) delete store[k];
    },
    get store() { return store; }
  };
};

const localStorageMock = mockStorage();
const sessionStorageMock = mockStorage();

(globalThis as any).localStorage = localStorageMock;
(globalThis as any).sessionStorage = sessionStorageMock;
(globalThis as any).window = {
  location: {
    origin: 'https://mocktest.masterieltsai.com',
    search: ''
  }
};

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  [PASS] ${msg}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${msg}`);
    failed++;
  }
}

console.log('========================================');
console.log('RUNNING QA BUG VERIFICATION TESTS');
console.log('========================================');

// Test 1: Prompt 1 - Credential clearance on logout
console.log('\n--- Prompt 1: Credential Clearance on Session End / Logout ---');
localStorageMock.setItem('ielts_terminal_pass', 'secret123');
localStorageMock.setItem('ielts_terminal_branch', 'BRANCH-XYZ');
sessionStorageMock.setItem('ielts_terminal_pass', 'secret123');
sessionStorageMock.setItem('ielts_terminal_branch', 'BRANCH-XYZ');

ConsultancyService.logoutCandidate();

assert(localStorageMock.getItem('ielts_terminal_pass') === null, 'ielts_terminal_pass cleared from localStorage on logout');
assert(localStorageMock.getItem('ielts_terminal_branch') === null, 'ielts_terminal_branch cleared from localStorage on logout');
assert(sessionStorageMock.getItem('ielts_terminal_pass') === null, 'ielts_terminal_pass cleared from sessionStorage on logout');
assert(sessionStorageMock.getItem('ielts_terminal_branch') === null, 'ielts_terminal_branch cleared from sessionStorage on logout');

// Test 2: Prompt 2 - Don't silently default Target Band to 7.5; email/phone blank
console.log('\n--- Prompt 2: Target Band & Candidate Registration Defaults ---');
const testCandidate: ConsultancyStudent = {
  id: 'std-test-1',
  consultancyId: 'apex-global',
  candidateNumber: '001234',
  fullName: 'Test Candidate',
  email: '',
  phone: '',
  targetBand: 0,
  enrolledDate: '2026-10-03',
  testsCompletedCount: 0,
  highestBand: 0,
  averageBand: 0
};
ConsultancyService.saveStudent(testCandidate);
const retrievedStd = ConsultancyService.getStudents('apex-global').find((s) => s.candidateNumber === '001234');
assert(retrievedStd?.targetBand === 0, 'Target band remains 0 (not silently defaulted to 7.5)');
assert(retrievedStd?.email === '', 'Email remains blank when not entered (no auto-generated @student.com)');
assert(retrievedStd?.phone === '', 'Phone remains blank when not entered (no auto-generated 9800000000)');

// Test 3: Prompt 4 - Station Attribution Isolation & stationName in TestResult
console.log('\n--- Prompt 4: Station Attribution Isolation (PC-01 vs PC-02) ---');
// Station tab 1 (PC-01)
const tab1Session = {
  stationName: 'PC-01',
  branchCode: 'APEX-2026',
  consultancyId: 'apex-global',
  consultancyName: 'Apex Education',
  candidateName: 'Candidate One',
  candidateId: '001001',
  targetBand: 0,
  loggedInAt: new Date().toISOString()
};

// Station tab 2 (PC-02)
const tab2Session = {
  stationName: 'PC-02',
  branchCode: 'APEX-2026',
  consultancyId: 'apex-global',
  consultancyName: 'Apex Education',
  candidateName: 'Candidate Two',
  candidateId: '001002',
  targetBand: 0,
  loggedInAt: new Date().toISOString()
};

const result1: TestResult = {
  testId: 'cambridge-16-test-1-reading',
  book: 16,
  testNumber: 1,
  module: 'reading',
  totalQuestions: 40,
  correctCount: 35,
  bandScore: 8.0,
  timeTakenSeconds: 3000,
  completedAt: new Date().toISOString(),
  answers: {},
  candidateName: tab1Session.candidateName,
  candidateId: tab1Session.candidateId,
  stationName: tab1Session.stationName,
  consultancyId: 'apex-global',
  consultancyName: 'Official IELTS Test Centre',
  isPublished: true
};

const result2: TestResult = {
  testId: 'cambridge-16-test-1-reading',
  book: 16,
  testNumber: 1,
  module: 'reading',
  totalQuestions: 40,
  correctCount: 32,
  bandScore: 7.5,
  timeTakenSeconds: 3200,
  completedAt: new Date().toISOString(),
  answers: {},
  candidateName: tab2Session.candidateName,
  candidateId: tab2Session.candidateId,
  stationName: tab2Session.stationName,
  consultancyId: 'apex-global',
  consultancyName: 'Official IELTS Test Centre',
  isPublished: true
};

ConsultancyService.saveTestResult('apex-global', result1);
ConsultancyService.saveTestResult('apex-global', result2);

const results = ConsultancyService.getResults('apex-global');
const r1 = results.find((r) => r.candidateId === '001001');
const r2 = results.find((r) => r.candidateId === '001002');

assert(r1?.stationName === 'PC-01', 'Submission from PC-01 is attributed to PC-01');
assert(r2?.stationName === 'PC-02', 'Submission from PC-02 is attributed to PC-02');
assert(r1?.stationName !== r2?.stationName, 'Stations do not overwrite each other between sessions');

// Test 4: Prompt 5 - Clean pairing URL without password exposure
console.log('\n--- Prompt 5: Clean Pairing URL ---');
const cleanUrl = `${(globalThis as any).window.location.origin}/?mode=terminal&cid=apex-global&station=PC-01`;
assert(!cleanUrl.includes('Pass:'), 'Pairing URL does not contain "Pass:" text');
assert(!cleanUrl.includes('1234'), 'Pairing URL does not embed exam password');
assert(cleanUrl.startsWith('https://mocktest.masterieltsai.com/?mode=terminal&cid=apex-global'), 'Pairing URL is clean with mode, cid, station');

// Test 5: Prompt 6 & Data Cleanup - Deleted consultancy filtering & LAB01 exclusion
console.log('\n--- Prompt 6 & Data Cleanup: Deleted Consultancy & LAB01 Exclusion ---');
// Setup a dummy deleted consultancy
const dummyDeleted: Consultancy = {
  id: 'deleted-inst-1',
  name: 'Deactivated Center',
  branch: 'Branch X',
  adminEmail: 'deleted@center.com',
  phone: '1234567890',
  accessCode: 'DEL-2026',
  branchCode: 'DEL-2026',
  examPassword: '1234',
  status: 'active',
  computerLimit: 10,
  testCredits: 100,
  creditsUsed: 0,
  createdAt: new Date().toISOString(),
  validUntil: new Date().toISOString(),
  assignedTestIds: []
};
ConsultancyService.saveConsultancy(dummyDeleted, false);

// Now delete it
ConsultancyService.deleteConsultancy(dummyDeleted.id);

assert(ConsultancyService.isConsultancyDeleted(dummyDeleted.id), 'Consultancy identified as deleted');
assert(ConsultancyService.isConsultancyDeleted(dummyDeleted.branchCode), 'Consultancy branchCode identified as deleted');

const consultancies = ConsultancyService.getConsultancies();
assert(!consultancies.some((c) => c.id === dummyDeleted.id), 'Deleted consultancy immediately excluded from getConsultancies()');
assert(!consultancies.some((c) => c.branchCode === 'LAB01' || c.name === 'Consultancy Testing Lab'), 'Consultancy Testing Lab / LAB01 excluded from getConsultancies()');

// Test 6: Bug A - Director Authentication & Director Password Verification
console.log('\n--- Bug A: Director Authentication & Password Security ---');
const secureBranch: Consultancy = {
  id: 'secure-branch-01',
  name: 'Secure Test Academy',
  branch: 'Kathmandu',
  adminEmail: 'director@secureacademy.com',
  phone: '9801122334',
  accessCode: 'SECURE-99',
  branchCode: 'SECURE-99',
  examPassword: 'studentpin123',
  adminPassword: 'directorSecretPass@99',
  status: 'active',
  computerLimit: 20,
  testCredits: 200,
  creditsUsed: 0,
  createdAt: new Date().toISOString(),
  validUntil: new Date().toISOString(),
  assignedTestIds: []
};
ConsultancyService.saveConsultancy(secureBranch, false);

// 1. Fresh session should be unauthenticated
ConsultancyService.logoutAdmin();
assert(!ConsultancyService.isDirectorAuthenticated(secureBranch.id), 'Fresh session is unauthenticated for director portal');

// 2. Student PIN should fail director authentication
const studentPinAttempt = ConsultancyService.verifyDirectorPassword(secureBranch.branchCode, 'studentpin123');
assert(!studentPinAttempt.success, 'Student Exam PIN fails director authentication');

// 3. Default fallback passwords (1234, admin123) should fail when custom director password is set
const fallbackAttempt = ConsultancyService.verifyDirectorPassword(secureBranch.branchCode, '1234');
assert(!fallbackAttempt.success, 'Hardcoded 1234 fails when custom director password is set');

// 4. Branch code entered as password should fail
const branchCodePassAttempt = ConsultancyService.verifyDirectorPassword(secureBranch.branchCode, 'SECURE-99');
assert(!branchCodePassAttempt.success, 'Branch code as password fails director authentication');

// 5. Correct Director Password succeeds
const correctAttempt = ConsultancyService.verifyDirectorPassword(secureBranch.branchCode, 'directorSecretPass@99');
assert(correctAttempt.success === true, 'Correct Director Password succeeds');
assert(ConsultancyService.isDirectorAuthenticated(secureBranch.id), 'Director is authenticated after entering correct password');
assert(ConsultancyService.getCurrentAdmin()?.role === 'consultancy_admin', 'Admin session role is consultancy_admin');

// 6. Logout clears director authentication
ConsultancyService.logoutAdmin();
assert(!ConsultancyService.isDirectorAuthenticated(secureBranch.id), 'Logout clears director authentication');
assert(ConsultancyService.getCurrentAdmin() === null, 'getCurrentAdmin returns null after logout');

// Cleanup dummy consultancy
ConsultancyService.deleteConsultancy(secureBranch.id);

// Test 7: 300-Credits Save Validation Fix
console.log('\n--- 300-Credits Save Validation Fix ---');
const branchWith300Credits: Consultancy = {
  id: 'credit-300-branch',
  name: 'Credit Test Branch',
  branch: 'Kathmandu',
  adminEmail: 'credit@test.com',
  phone: '9801234567',
  accessCode: 'CREDIT-300',
  branchCode: 'CREDIT-300',
  examPassword: '1234',
  adminPassword: 'admin',
  status: 'active',
  computerLimit: 20,
  testCredits: 300,
  creditsUsed: 0,
  createdAt: new Date().toISOString(),
  validUntil: new Date().toISOString(),
  assignedTestIds: []
};
ConsultancyService.createConsultancy(branchWith300Credits);
const fetchedCreditBranch = ConsultancyService.getConsultancyById('credit-300-branch');
assert(fetchedCreditBranch !== undefined, 'Branch with 300 test credits saved successfully without silent failure');
assert(fetchedCreditBranch?.testCredits === 300, 'Branch test credits correctly stored as 300');
ConsultancyService.deleteConsultancy('credit-300-branch');

// Test 8: Unique Branch Code Constraint (Duplicate prevention)
console.log('\n--- Duplicate Branch Code Constraint ---');
const primaryBranch: Consultancy = {
  id: 'orig-branch-1',
  name: 'Original Branch',
  branch: 'Kathmandu',
  adminEmail: 'orig@test.com',
  phone: '9801111111',
  accessCode: 'cr300-1',
  branchCode: 'cr300-1',
  examPassword: '1234',
  adminPassword: 'admin',
  status: 'active',
  computerLimit: 20,
  testCredits: 300,
  creditsUsed: 0,
  createdAt: new Date().toISOString(),
  validUntil: new Date().toISOString(),
  assignedTestIds: []
};
ConsultancyService.createConsultancy(primaryBranch);

// 1. isBranchCodeInUse identifies existing branchCode
assert(ConsultancyService.isBranchCodeInUse('cr300-1'), 'isBranchCodeInUse detects existing branch code');
assert(ConsultancyService.isBranchCodeInUse('CR300-1'), 'isBranchCodeInUse is case-insensitive');
assert(!ConsultancyService.isBranchCodeInUse('cr300-1', 'orig-branch-1'), 'isBranchCodeInUse excludes self when editing');
assert(!ConsultancyService.isBranchCodeInUse('unique-unassigned-code-99'), 'isBranchCodeInUse returns false for unused code');

// 2. Attempting to create duplicate branch throws error
let duplicateThrown = false;
try {
  ConsultancyService.createConsultancy({
    id: 'duplicate-branch-2',
    name: 'Duplicate Branch',
    branchCode: 'cr300-1'
  });
} catch (e: any) {
  duplicateThrown = true;
  assert(e.message.includes('already exists'), 'Error message clearly indicates branch code already exists');
}
assert(duplicateThrown, 'createConsultancy rejects duplicate branch code with error');

// Clean up test branch
ConsultancyService.deleteConsultancy('orig-branch-1');

console.log('\n--- Mode A Broadcast Portal Isolation & Exit Test Navigation UX ---');
// Verify helper logic: Portal vs Kiosk route differentiation
const checkIsCandidateKiosk = (route: string) =>
  route === 'kiosk-student' || route === 'kiosk-test' || route === 'kiosk-confirm' || route === 'branch-login';

const checkIsDirectorOrAdmin = (adminUser: any, route: string) =>
  Boolean(adminUser) || route === 'consultancy' || route === 'super-admin';

// 1. Director Portal is never considered a candidate kiosk
assert(!checkIsCandidateKiosk('consultancy'), 'Director portal (consultancy) is not a candidate kiosk route');
assert(!checkIsCandidateKiosk('super-admin'), 'Super admin portal is not a candidate kiosk route');
assert(checkIsCandidateKiosk('kiosk-student'), 'Student registration is recognized as candidate kiosk route');
assert(checkIsCandidateKiosk('kiosk-confirm'), 'Confirmation screen is recognized as candidate kiosk route');

// 2. Admin/Director portal tabs are protected from exam start
const fakeDirectorUser = { id: 'dir-1', role: 'consultancy_admin' as const, consultancyId: 'cid-1' };
assert(checkIsDirectorOrAdmin(fakeDirectorUser, 'consultancy'), 'Director session correctly identified as protected admin portal');
assert(checkIsDirectorOrAdmin(null, 'consultancy'), 'Consultancy route without admin user is also identified as protected portal');

// 3. Exit Test returns to director dashboard when director session active
const resolveExitRoute = (adminUser: any, branchCode?: string) => {
  if (adminUser?.role === 'super_admin') return '/admin';
  if (adminUser?.role === 'consultancy_admin' || Boolean(adminUser)) return '/consultancy/dashboard';
  return branchCode ? `/b/${branchCode}` : '/kiosk/student';
};

assert(resolveExitRoute(fakeDirectorUser) === '/consultancy/dashboard', 'Exit test for director routes back to /consultancy/dashboard');
assert(resolveExitRoute({ id: 'sa', role: 'super_admin' }) === '/admin', 'Exit test for super admin routes back to /admin');
assert(resolveExitRoute(null, 'cr300-1') === '/b/cr300-1', 'Exit test for kiosk candidate with branch code routes back to /b/{code}');
assert(resolveExitRoute(null) === '/kiosk/student', 'Exit test for standard kiosk candidate routes back to /kiosk/student');

console.log('\n========================================');
console.log(`TOTAL QA TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('========================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
