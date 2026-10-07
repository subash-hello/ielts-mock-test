export type ConsultancyStatus = 'active' | 'trial' | 'suspended';

export interface Consultancy {
  id: string; // e.g. "apex-global"
  name: string; // e.g. "Apex Global Education"
  branch: string; // e.g. "Kathmandu Central (Bagbazar)"
  adminEmail: string;
  phone: string;
  accessCode: string; // Lab station PIN e.g. "APEX-2026"
  branchCode: string; // e.g. "APEX-2026"
  examPassword: string; // Exam session password e.g. "1234"
  adminPassword?: string; // Admin portal login password e.g. "admin123"
  status: ConsultancyStatus;
  computerLimit: number; // e.g. 25
  testCredits: number; // e.g. 500
  creditsUsed: number;
  logoUrl?: string;
  createdAt: string;
  validUntil: string;
  assignedTestIds?: string[]; // Test IDs the consultancy has enabled for students
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'consultancy_admin';
  consultancyId?: string;
  consultancyName?: string;
}

export interface CandidateSession {
  stationName: string; // e.g. "PC-01"
  branchCode: string; // e.g. "APEX-2026"
  consultancyId: string; // e.g. "apex-global"
  consultancyName: string; // e.g. "Apex Global Education"
  candidateName: string; // e.g. "Candidate PC-01"
  candidateId: string; // e.g. "004912"
  targetBand: number; // e.g. 7.5
  loggedInAt: string;
}

export type StationStatus = 'idle' | 'assigned' | 'in_progress' | 'paused' | 'submitted' | 'offline';

export interface LabStation {
  id: string; // e.g. "station-1"
  name: string; // e.g. "PC-01"
  consultancyId: string;
  status: StationStatus;
  currentCandidate?: {
    candidateId: string;
    name: string;
    passport?: string;
    targetBand?: number;
  };
  assignedTestId?: string;
  testTitle?: string;
  module?: 'reading' | 'listening' | 'writing';
  isFullMock?: boolean;
  currentQuestion?: number;
  totalQuestions?: number;
  answeredCount?: number;
  remainingSeconds?: number;
  lastHeartbeat: string;
  deviceToken?: string;
}

export interface ConsultancyStudent {
  id: string;
  consultancyId: string;
  candidateNumber: string; // e.g. "004912"
  fullName: string;
  email: string;
  phone: string;
  targetBand: number;
  enrolledDate: string;
  testsCompletedCount: number;
  highestBand: number;
  averageBand: number;
  latestResultId?: string;
  assignedTestId?: string;
  assignedTestTitle?: string;
}

export interface AIDiagnosticReport {
  studentName: string;
  candidateId: string;
  testTitle: string;
  module: 'reading' | 'listening' | 'writing';
  date: string;
  overallBand: number;
  targetBand?: number | null;
  bandGap?: number | null;
  cefrLevel: string; // e.g. "C1 - Operational Proficiency"
  accuracyPercentage: number;
  timeSpentFormatted: string;
  rawScore: string;
  skillMetrics: {
    name: string;
    scorePercent: number;
    benchmark: number;
    status: 'Mastered' | 'Competent' | 'Needs Practice' | 'Critical Focus';
  }[];
  aiDiagnosticInsights: {
    strengths: string[];
    criticalWeaknesses: string[];
    strategicAdvice: string[];
    speedAnalysis: string;
  };
}

export interface SavedAIReport {
  id?: string;
  studentName: string;
  candidateId: string;
  testTitle: string;
  module: 'reading' | 'listening' | 'writing';
  bandScore: number;
  correctCount: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  completedAt?: string;
  testId?: string;
  consultancyId?: string;
  answers?: Record<number, string | string[]>;
  isPublished?: boolean;
  publishedAt?: string;
  writingSubmission?: import('./ielts').WritingSubmission;
}
