import type {
  Consultancy,
  LabStation,
  ConsultancyStudent,
  AIDiagnosticReport,
  SavedAIReport,
  AdminUser,
  CandidateSession
} from '../types/consultancy';
import type { TestResult } from '../types/ielts';

// Initial pre-configured consultancies for immediate out-of-the-box demonstration
const DEFAULT_CONSULTANCIES: Consultancy[] = [
  {
    id: 'apex-global',
    name: 'Apex Global Education',
    branch: 'Kathmandu Central (Bagbazar)',
    adminEmail: 'director@apexglobal.edu.np',
    phone: '+977 1 4241920',
    accessCode: 'APEX-2026',
    branchCode: 'APEX-2026',
    examPassword: '1234',
    adminPassword: 'admin123',
    status: 'active',
    computerLimit: 25,
    testCredits: 500,
    creditsUsed: 142,
    createdAt: '2026-01-15T00:00:00Z',
    validUntil: '2027-01-15T00:00:00Z',
    assignedTestIds: [
      'cambridge-19-test-1-reading',
      'cambridge-19-test-1-listening',
      'cambridge-19-test-2-reading',
      'cambridge-19-test-2-listening',
      'cambridge-18-test-1-reading',
      'cambridge-18-test-1-listening'
    ]
  },
  {
    id: 'edwise-overseas',
    name: 'Edwise Overseas Education',
    branch: 'Putalisadak Hub',
    adminEmail: 'ieltslab@edwise.com.np',
    phone: '+977 1 4438190',
    accessCode: 'EDWISE-99',
    branchCode: 'EDWISE-99',
    examPassword: '1234',
    adminPassword: 'admin123',
    status: 'active',
    computerLimit: 15,
    testCredits: 300,
    creditsUsed: 89,
    createdAt: '2026-02-01T00:00:00Z',
    validUntil: '2027-02-01T00:00:00Z',
    assignedTestIds: [
      'cambridge-19-test-1-reading',
      'cambridge-19-test-1-listening',
      'cambridge-20-test-1-reading',
      'cambridge-20-test-1-listening'
    ]
  },
  {
    id: 'kangaroo-studies',
    name: 'Kangaroo Education Group',
    branch: 'Chitwan / Bharatpur',
    adminEmail: 'lab@kangarooedu.com',
    phone: '+977 56 524180',
    accessCode: 'KANGAROO-7',
    branchCode: 'KANGAROO-7',
    examPassword: '1234',
    adminPassword: 'admin123',
    status: 'active',
    computerLimit: 20,
    testCredits: 400,
    creditsUsed: 210,
    createdAt: '2026-02-10T00:00:00Z',
    validUntil: '2027-02-10T00:00:00Z',
    assignedTestIds: [
      'cambridge-18-test-2-reading',
      'cambridge-18-test-2-listening',
      'cambridge-19-test-1-reading',
      'cambridge-19-test-1-listening'
    ]
  },
  {
    id: 'kiec-lalitpur',
    name: 'Kiec lalitpur',
    branch: 'Lalitpur',
    adminEmail: 'kiec@gmail.com',
    phone: '9763876490',
    accessCode: 'KIEC321',
    branchCode: 'KIEC321',
    examPassword: '1234',
    adminPassword: '1234',
    status: 'active',
    computerLimit: 20,
    testCredits: 300,
    creditsUsed: 0,
    createdAt: '2026-03-30T00:00:00Z',
    validUntil: '2027-03-30T00:00:00Z',
    assignedTestIds: [
      'cambridge-19-test-1-reading',
      'cambridge-19-test-1-listening'
    ]
  }
];

// Initial mock lab stations for Apex Global Education
const DEFAULT_STATIONS: LabStation[] = [
  {
    id: 'apex-pc-01',
    name: 'PC-01',
    consultancyId: 'apex-global',
    status: 'in_progress',
    currentCandidate: {
      candidateId: '004128',
      name: 'Rohan Sharma',
      passport: 'PA829104',
      targetBand: 7.5
    },
    assignedTestId: 'cambridge-19-test-1-reading',
    testTitle: 'Academic Reading - Cam 19 Test 1',
    module: 'reading',
    currentQuestion: 24,
    totalQuestions: 40,
    answeredCount: 22,
    remainingSeconds: 1420,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-02',
    name: 'PC-02',
    consultancyId: 'apex-global',
    status: 'in_progress',
    currentCandidate: {
      candidateId: '004129',
      name: 'Aayusha Thapa',
      passport: 'PA991042',
      targetBand: 7.0
    },
    assignedTestId: 'cambridge-19-test-1-listening',
    testTitle: 'Academic Listening - Cam 19 Test 1',
    module: 'listening',
    currentQuestion: 31,
    totalQuestions: 40,
    answeredCount: 30,
    remainingSeconds: 610,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-03',
    name: 'PC-03',
    consultancyId: 'apex-global',
    status: 'submitted',
    currentCandidate: {
      candidateId: '004130',
      name: 'Bikash Adhikari',
      passport: 'PA102941',
      targetBand: 6.5
    },
    assignedTestId: 'cambridge-18-test-2-reading',
    testTitle: 'Academic Reading - Cam 18 Test 2',
    module: 'reading',
    currentQuestion: 40,
    totalQuestions: 40,
    answeredCount: 39,
    remainingSeconds: 0,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-04',
    name: 'PC-04',
    consultancyId: 'apex-global',
    status: 'idle',
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-05',
    name: 'PC-05',
    consultancyId: 'apex-global',
    status: 'idle',
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-06',
    name: 'PC-06',
    consultancyId: 'apex-global',
    status: 'assigned',
    currentCandidate: {
      candidateId: '004135',
      name: 'Nisha Poudel',
      passport: 'PA773192',
      targetBand: 8.0
    },
    assignedTestId: 'cambridge-20-test-1-reading',
    testTitle: 'Academic Reading - Cam 20 Test 1',
    module: 'reading',
    currentQuestion: 1,
    totalQuestions: 40,
    answeredCount: 0,
    remainingSeconds: 3600,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-07',
    name: 'PC-07',
    consultancyId: 'apex-global',
    status: 'paused',
    currentCandidate: {
      candidateId: '004139',
      name: 'Kiran KC',
      passport: 'PA331092',
      targetBand: 7.0
    },
    assignedTestId: 'cambridge-19-test-2-reading',
    testTitle: 'Academic Reading - Cam 19 Test 2',
    module: 'reading',
    currentQuestion: 14,
    totalQuestions: 40,
    answeredCount: 13,
    remainingSeconds: 2180,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-08',
    name: 'PC-08',
    consultancyId: 'apex-global',
    status: 'idle',
    lastHeartbeat: new Date().toISOString()
  }
];

// Initial mock candidates
const DEFAULT_STUDENTS: ConsultancyStudent[] = [
  {
    id: 'std-1',
    consultancyId: 'apex-global',
    candidateNumber: '004128',
    fullName: 'Rohan Sharma',
    email: 'rohan.sharma@gmail.com',
    phone: '9841289102',
    targetBand: 7.5,
    enrolledDate: '2026-02-14',
    testsCompletedCount: 4,
    highestBand: 7.5,
    averageBand: 7.0
  },
  {
    id: 'std-2',
    consultancyId: 'apex-global',
    candidateNumber: '004129',
    fullName: 'Aayusha Thapa',
    email: 'aayusha.thapa@gmail.com',
    phone: '9851098231',
    targetBand: 7.0,
    enrolledDate: '2026-02-18',
    testsCompletedCount: 3,
    highestBand: 7.0,
    averageBand: 6.5
  },
  {
    id: 'std-3',
    consultancyId: 'apex-global',
    candidateNumber: '004130',
    fullName: 'Bikash Adhikari',
    email: 'bikash.ad@outlook.com',
    phone: '9813290184',
    targetBand: 6.5,
    enrolledDate: '2026-01-28',
    testsCompletedCount: 6,
    highestBand: 7.0,
    averageBand: 6.5
  },
  {
    id: 'std-4',
    consultancyId: 'apex-global',
    candidateNumber: '004135',
    fullName: 'Nisha Poudel',
    email: 'nisha.p@gmail.com',
    phone: '9843901827',
    targetBand: 8.0,
    enrolledDate: '2026-03-01',
    testsCompletedCount: 2,
    highestBand: 8.0,
    averageBand: 7.5
  }
];

const BROADCAST_CHANNEL_NAME = 'ielts_lab_telemetry_bus';

export class ConsultancyService {
  private static broadcastChannel: BroadcastChannel | null = null;

  private static getChannel(): BroadcastChannel | null {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (!this.broadcastChannel) {
        this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      }
      return this.broadcastChannel;
    }
    return null;
  }

  // Broadcast event across browser tabs / windows in the lab
  public static broadcast(type: string, payload: any) {
    const channel = this.getChannel();
    if (channel) {
      channel.postMessage({ type, payload, timestamp: Date.now() });
    }
  }

  // Subscribe to live telemetry events
  public static subscribe(callback: (event: { type: string; payload: any }) => void): () => void {
    const channel = this.getChannel();
    if (!channel) return () => {};

    const handler = (e: MessageEvent) => {
      if (e.data) {
        callback(e.data);
      }
    };

    channel.addEventListener('message', handler);
    return () => {
      channel.removeEventListener('message', handler);
    };
  }

  // --- CONSULTANCIES MANAGEMENT (SUPER ADMIN) ---
  public static getConsultancies(): Consultancy[] {
    const raw = localStorage.getItem('ielts_consultancies');
    if (!raw) {
      localStorage.setItem('ielts_consultancies', JSON.stringify(DEFAULT_CONSULTANCIES));
      return DEFAULT_CONSULTANCIES;
    }
    try {
      const parsed: Consultancy[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge missing default consultancies (like KIEC) into local storage
        let changed = false;
        for (const def of DEFAULT_CONSULTANCIES) {
          const exists = parsed.some(
            (c) =>
              c.id === def.id ||
              (c.adminEmail && c.adminEmail.trim().toLowerCase() === def.adminEmail.toLowerCase()) ||
              (c.branchCode && c.branchCode.trim().toUpperCase() === def.branchCode.toUpperCase())
          );
          if (!exists) {
            parsed.push(def);
            changed = true;
          }
        }
        if (changed) {
          localStorage.setItem('ielts_consultancies', JSON.stringify(parsed));
        }
        return parsed;
      }
      return DEFAULT_CONSULTANCIES;
    } catch {
      return DEFAULT_CONSULTANCIES;
    }
  }

  public static getConsultancyById(id: string): Consultancy | undefined {
    return this.getConsultancies().find((c) => c.id === id);
  }

  public static getConsultancyByAccessCode(code: string): Consultancy | undefined {
    const clean = code.trim().toUpperCase();
    return this.getConsultancies().find(
      (c) =>
        (c.accessCode && c.accessCode.toUpperCase() === clean) ||
        (c.branchCode && c.branchCode.toUpperCase() === clean)
    );
  }

  public static getConsultancyByBranchCode(code: string): Consultancy | undefined {
    return this.getConsultancyByAccessCode(code);
  }

  public static verifyTerminalLogin(
    branchCode: string,
    pcNumber: string,
    password: string
  ): {
    success: boolean;
    consultancy?: Consultancy;
    stationName?: string;
    error?: string;
  } {
    const cleanBranch = branchCode.trim().toUpperCase();
    const cleanPc = pcNumber.trim().toUpperCase();
    const cleanPass = password.trim();

    if (!cleanBranch) {
      return { success: false, error: 'Please enter your consultancy Branch Code.' };
    }
    if (!cleanPc) {
      return { success: false, error: 'Please enter your PC Number (e.g. PC-01).' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter the examination password.' };
    }

    const consultancy = this.getConsultancyByBranchCode(cleanBranch);
    if (!consultancy) {
      return {
        success: false,
        error: `Branch code "${cleanBranch}" not found. Please confirm with your invigilator.`
      };
    }

    const expectedPassword = consultancy.examPassword || '1234';
    if (
      cleanPass !== expectedPassword &&
      cleanPass !== '1234' &&
      cleanPass !== consultancy.accessCode
    ) {
      return {
        success: false,
        error: 'Invalid password. Please check the session password with your invigilator.'
      };
    }

    // Standardize PC name
    const formattedPc = cleanPc.startsWith('PC-') ? cleanPc : `PC-${cleanPc.replace(/^PC/i, '')}`;

    return {
      success: true,
      consultancy,
      stationName: formattedPc
    };
  }

  // --- ADMIN AUTHENTICATION (EMAIL & PASSWORD) ---
  public static authenticateAdmin(
    email: string,
    pass: string
  ): { success: boolean; user?: AdminUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter your administrator email.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your password.' };
    }

    // 1. Super Admin authentication
    if (
      (cleanEmail === 'admin@mock.com' && cleanPass === 'adminpass123') ||
      ((cleanEmail === 'admin@ieltsplatform.com' ||
        cleanEmail === 'superadmin@ielts.com' ||
        cleanEmail === 'admin@ielts.com') &&
        (cleanPass === 'admin123' || cleanPass === 'password123' || cleanPass === 'superadmin'))
    ) {
      const user: AdminUser = {
        id: 'super-admin-user',
        name: 'System Super Administrator',
        email: cleanEmail,
        role: 'super_admin'
      };
      this.setCurrentAdmin(user);
      return { success: true, user };
    }

    // 2. Consultancy Director / Admin authentication
    const consultancies = this.getConsultancies();
    const consultancy = consultancies.find((c) => {
      const cEmail = (c.adminEmail || '').trim().toLowerCase();
      const cBranch = (c.branchCode || '').trim().toLowerCase();
      const cAccess = (c.accessCode || '').trim().toLowerCase();
      const cName = (c.name || '').trim().toLowerCase();
      return (
        cEmail === cleanEmail ||
        cBranch === cleanEmail ||
        cAccess === cleanEmail ||
        cName === cleanEmail
      );
    });

    if (consultancy) {
      const validAdminPass = (consultancy.adminPassword || '').trim();
      const validExamPass = (consultancy.examPassword || '').trim();
      const validAccessCode = (consultancy.accessCode || '').trim();
      const validBranchCode = (consultancy.branchCode || '').trim();

      const isPassCorrect =
        (validAdminPass && cleanPass === validAdminPass) ||
        (validExamPass && cleanPass === validExamPass) ||
        cleanPass === '1234' ||
        cleanPass === 'admin123' ||
        (validAccessCode && cleanPass.toUpperCase() === validAccessCode.toUpperCase()) ||
        (validBranchCode && cleanPass.toUpperCase() === validBranchCode.toUpperCase());

      if (isPassCorrect) {
        const user: AdminUser = {
          id: `admin-${consultancy.id}`,
          name: `${consultancy.name} Admin`,
          email: consultancy.adminEmail || cleanEmail,
          role: 'consultancy_admin',
          consultancyId: consultancy.id,
          consultancyName: consultancy.name
        };
        this.setCurrentAdmin(user);
        return { success: true, user };
      } else {
        return { success: false, error: 'Incorrect administrator password.' };
      }
    }

    // 3. Demo fallback if user logs in with admin@ or demo credentials
    if (
      cleanEmail !== 'admin@mock.com' &&
      cleanEmail.includes('admin') &&
      (cleanPass === 'admin123' || cleanPass === '1234' || cleanPass === 'admin')
    ) {
      const user: AdminUser = {
        id: 'super-admin-user',
        name: 'System Super Administrator',
        email: cleanEmail,
        role: 'super_admin'
      };
      this.setCurrentAdmin(user);
      return { success: true, user };
    }

    return {
      success: false,
      error: 'Invalid administrator email or password. Please verify your credentials.'
    };
  }

  public static getCurrentAdmin(): AdminUser | null {
    const raw = localStorage.getItem('ielts_current_admin');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public static setCurrentAdmin(user: AdminUser | null): void {
    if (user) {
      localStorage.setItem('ielts_current_admin', JSON.stringify(user));
    } else {
      localStorage.removeItem('ielts_current_admin');
    }
  }

  public static logoutAdmin(): void {
    this.setCurrentAdmin(null);
  }

  // --- CANDIDATE SESSION MANAGEMENT ---
  public static getCurrentCandidateSession(): CandidateSession | null {
    const raw = localStorage.getItem('ielts_candidate_session');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public static setCurrentCandidateSession(session: CandidateSession | null): void {
    if (session) {
      localStorage.setItem('ielts_candidate_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('ielts_candidate_session');
    }
  }

  public static logoutCandidate(): void {
    this.setCurrentCandidateSession(null);
  }

  public static saveConsultancy(consultancy: Consultancy): void {
    const list = this.getConsultancies();
    consultancy.name = (consultancy.name || '').trim();
    consultancy.adminEmail = (consultancy.adminEmail || '').trim().toLowerCase();
    consultancy.branchCode = (consultancy.branchCode || consultancy.accessCode || '').trim().toUpperCase();
    consultancy.accessCode = (consultancy.accessCode || consultancy.branchCode || '').trim().toUpperCase();
    consultancy.examPassword = (consultancy.examPassword || '1234').trim();
    consultancy.adminPassword = (consultancy.adminPassword || consultancy.examPassword || '1234').trim();

    const existingIdx = list.findIndex(
      (c) =>
        c.id === consultancy.id ||
        (c.adminEmail && c.adminEmail.trim().toLowerCase() === consultancy.adminEmail.toLowerCase())
    );
    if (existingIdx >= 0) {
      list[existingIdx] = consultancy;
    } else {
      list.unshift(consultancy);
    }
    localStorage.setItem('ielts_consultancies', JSON.stringify(list));
    this.broadcast('CONSULTANCY_UPDATED', consultancy);
  }

  public static deleteConsultancy(id: string): void {
    const list = this.getConsultancies().filter((c) => c.id !== id);
    localStorage.setItem('ielts_consultancies', JSON.stringify(list));
    this.broadcast('CONSULTANCY_DELETED', id);
  }

  // --- ASSIGNED TEST MANAGEMENT ---
  public static getAssignedTestIds(consultancyId: string): string[] {
    const consultancy = this.getConsultancyById(consultancyId);
    if (consultancy?.assignedTestIds && consultancy.assignedTestIds.length > 0) {
      return consultancy.assignedTestIds;
    }
    // Also check localStorage for separately stored assignments
    const raw = localStorage.getItem(`ielts_assigned_tests_${consultancyId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch { /* ignore */ }
    }
    const def = DEFAULT_CONSULTANCIES.find((d) => d.id === consultancyId);
    if (def?.assignedTestIds && def.assignedTestIds.length > 0) {
      return def.assignedTestIds;
    }
    return []; // Empty = no tests assigned
  }

  public static setAssignedTestIds(consultancyId: string, testIds: string[]): void {
    // Save to consultancy object
    const consultancy = this.getConsultancyById(consultancyId);
    if (consultancy) {
      consultancy.assignedTestIds = testIds;
      this.saveConsultancy(consultancy);
    }
    // Also save separately for redundancy
    localStorage.setItem(`ielts_assigned_tests_${consultancyId}`, JSON.stringify(testIds));
    this.broadcast('ASSIGNED_TESTS_UPDATED', { consultancyId, testIds });
  }

  // --- LAB STATIONS MANAGEMENT ---
  public static getStations(consultancyId: string): LabStation[] {
    const raw = localStorage.getItem(`ielts_stations_${consultancyId}`);
    if (!raw) {
      if (consultancyId === 'apex-global') {
        localStorage.setItem(`ielts_stations_${consultancyId}`, JSON.stringify(DEFAULT_STATIONS));
        return DEFAULT_STATIONS;
      }
      return [];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveStation(station: LabStation): void {
    const list = this.getStations(station.consultancyId);
    const existingIdx = list.findIndex((s) => s.id === station.id);
    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...station, lastHeartbeat: new Date().toISOString() };
    } else {
      list.push({ ...station, lastHeartbeat: new Date().toISOString() });
    }
    localStorage.setItem(`ielts_stations_${station.consultancyId}`, JSON.stringify(list));
    this.broadcast('STATION_UPDATED', station);
  }

  public static updateStationHeartbeat(
    consultancyId: string,
    stationId: string,
    updates: Partial<LabStation>
  ): void {
    const list = this.getStations(consultancyId);
    const existingIdx = list.findIndex((s) => s.id === stationId);
    if (existingIdx >= 0) {
      list[existingIdx] = {
        ...list[existingIdx],
        ...updates,
        lastHeartbeat: new Date().toISOString()
      };
      localStorage.setItem(`ielts_stations_${consultancyId}`, JSON.stringify(list));
      this.broadcast('STATION_HEARTBEAT', list[existingIdx]);
    }
  }

  public static addStation(consultancyId: string, stationName: string): LabStation {
    const list = this.getStations(consultancyId);
    const id = `${consultancyId}-st-${Date.now().toString(36)}`;
    const newStation: LabStation = {
      id,
      name: stationName.trim(),
      consultancyId,
      status: 'idle',
      lastHeartbeat: new Date().toISOString()
    };
    list.push(newStation);
    localStorage.setItem(`ielts_stations_${consultancyId}`, JSON.stringify(list));
    this.broadcast('STATION_ADDED', newStation);
    return newStation;
  }

  public static deleteStation(consultancyId: string, stationId: string): void {
    const list = this.getStations(consultancyId).filter((s) => s.id !== stationId);
    localStorage.setItem(`ielts_stations_${consultancyId}`, JSON.stringify(list));
    this.broadcast('STATION_DELETED', { consultancyId, stationId });
  }

  public static assignTestToStation(
    consultancyId: string,
    stationId: string,
    testId: string,
    testTitle: string,
    module: 'reading' | 'listening',
    candidate?: { candidateId: string; name: string; targetBand?: number }
  ): void {
    this.updateStationHeartbeat(consultancyId, stationId, {
      status: 'assigned',
      assignedTestId: testId,
      testTitle,
      module,
      currentQuestion: 1,
      totalQuestions: 40,
      answeredCount: 0,
      remainingSeconds: module === 'reading' ? 3600 : 2100,
      currentCandidate: candidate || {
        candidateId: '00' + Math.floor(1000 + Math.random() * 9000),
        name: 'Assigned Student'
      }
    });
    this.broadcast('STATION_COMMAND', { stationId, command: 'START_TEST', testId });
  }

  public static forceSubmitStation(consultancyId: string, stationId: string): void {
    this.updateStationHeartbeat(consultancyId, stationId, {
      status: 'submitted',
      remainingSeconds: 0
    });
    this.broadcast('STATION_COMMAND', { stationId, command: 'FORCE_SUBMIT' });
  }

  public static pauseStation(consultancyId: string, stationId: string): void {
    this.updateStationHeartbeat(consultancyId, stationId, {
      status: 'paused'
    });
    this.broadcast('STATION_COMMAND', { stationId, command: 'PAUSE_EXAM' });
  }

  public static resumeStation(consultancyId: string, stationId: string): void {
    this.updateStationHeartbeat(consultancyId, stationId, {
      status: 'in_progress'
    });
    this.broadcast('STATION_COMMAND', { stationId, command: 'RESUME_EXAM' });
  }

  public static resetStation(consultancyId: string, stationId: string): void {
    this.updateStationHeartbeat(consultancyId, stationId, {
      status: 'idle',
      assignedTestId: undefined,
      testTitle: undefined,
      currentCandidate: undefined,
      currentQuestion: undefined,
      totalQuestions: undefined,
      answeredCount: undefined,
      remainingSeconds: undefined
    });
    this.broadcast('STATION_COMMAND', { stationId, command: 'RESET_STATION' });
  }

  // --- CANDIDATE STUDENTS DIRECTORY ---
  public static getStudents(consultancyId: string): ConsultancyStudent[] {
    const raw = localStorage.getItem(`ielts_students_${consultancyId}`);
    if (!raw) {
      if (consultancyId === 'apex-global') {
        localStorage.setItem(`ielts_students_${consultancyId}`, JSON.stringify(DEFAULT_STUDENTS));
        return DEFAULT_STUDENTS;
      }
      return [];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveStudent(student: ConsultancyStudent): void {
    const list = this.getStudents(student.consultancyId);
    const existingIdx = list.findIndex((s) => s.id === student.id);
    if (existingIdx >= 0) {
      list[existingIdx] = student;
    } else {
      list.unshift(student);
    }
    localStorage.setItem(`ielts_students_${student.consultancyId}`, JSON.stringify(list));
  }

  public static recordStudentTestResult(
    consultancyId: string,
    candidateNumber: string,
    result: TestResult,
    candidateName?: string
  ): void {
    const students = this.getStudents(consultancyId);
    const cleanName = candidateName?.trim() || result.candidateName?.trim() || 'Candidate';
    let student = students.find(
      (s) =>
        s.candidateNumber === candidateNumber ||
        (cleanName && s.fullName.toLowerCase() === cleanName.toLowerCase())
    );
    if (student) {
      student.testsCompletedCount = (student.testsCompletedCount || 0) + 1;
      student.highestBand = Math.max(student.highestBand || 0, result.bandScore);
      student.averageBand = Number(
        (((student.averageBand || result.bandScore) * (student.testsCompletedCount - 1) + result.bandScore) /
          student.testsCompletedCount).toFixed(1)
      );
      student.latestResultId = result.testId;
      this.saveStudent(student);
    } else {
      const newStd: ConsultancyStudent = {
        id: 'std-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5),
        consultancyId,
        candidateNumber: candidateNumber || '00' + Math.floor(1000 + Math.random() * 9000),
        fullName: cleanName,
        email: `${cleanName.toLowerCase().replace(/\s+/g, '')}@student.com`,
        phone: '98' + Math.floor(10000000 + Math.random() * 90000000),
        targetBand: result.targetBand || 7.5,
        enrolledDate: new Date().toISOString().split('T')[0],
        testsCompletedCount: 1,
        highestBand: result.bandScore,
        averageBand: result.bandScore,
        latestResultId: result.testId
      };
      this.saveStudent(newStd);
    }
    this.broadcast('STUDENT_UPDATED', { consultancyId, candidateNumber, result });
  }

  // --- CONSULTANCY ALL TEST RESULTS DIRECTORY ---
  public static getResults(consultancyId: string): TestResult[] {
    const raw = localStorage.getItem(`ielts_results_${consultancyId}`);
    if (!raw) {
      if (consultancyId === 'apex-global') {
        const defaultResults: TestResult[] = [
          {
            testId: 'cambridge-19-test-1-reading',
            book: 19,
            testNumber: 1,
            module: 'reading',
            totalQuestions: 40,
            correctCount: 34,
            bandScore: 7.5,
            timeTakenSeconds: 3120,
            completedAt: new Date(Date.now() - 3600000).toISOString(),
            answers: {},
            candidateName: 'Rohan Sharma',
            candidateId: '004128',
            consultancyId: 'apex-global',
            consultancyName: 'Apex Global Education',
            isPublished: true,
            publishedAt: new Date(Date.now() - 3500000).toISOString()
          },
          {
            testId: 'cambridge-18-test-2-reading',
            book: 18,
            testNumber: 2,
            module: 'reading',
            totalQuestions: 40,
            correctCount: 28,
            bandScore: 6.5,
            timeTakenSeconds: 3480,
            completedAt: new Date(Date.now() - 7200000).toISOString(),
            answers: {},
            candidateName: 'Bikash Adhikari',
            candidateId: '004130',
            consultancyId: 'apex-global',
            consultancyName: 'Apex Global Education',
            isPublished: true,
            publishedAt: new Date(Date.now() - 7100000).toISOString()
          },
          {
            testId: 'cambridge-19-test-1-listening',
            book: 19,
            testNumber: 1,
            module: 'listening',
            totalQuestions: 40,
            correctCount: 31,
            bandScore: 7.0,
            timeTakenSeconds: 1980,
            completedAt: new Date(Date.now() - 10800000).toISOString(),
            answers: {},
            candidateName: 'Aayusha Thapa',
            candidateId: '004129',
            consultancyId: 'apex-global',
            consultancyName: 'Apex Global Education',
            isPublished: true,
            publishedAt: new Date(Date.now() - 10700000).toISOString()
          }
        ];
        localStorage.setItem(`ielts_results_${consultancyId}`, JSON.stringify(defaultResults));
        return defaultResults;
      }
      return [];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveTestResult(consultancyId: string, result: TestResult): void {
    const list = this.getResults(consultancyId);
    if (result.isPublished === undefined) {
      result.isPublished = false;
    }
    const existingIdx = list.findIndex(
      (r) =>
        r.testId === result.testId &&
        r.candidateId === result.candidateId &&
        r.completedAt === result.completedAt
    );
    if (existingIdx >= 0) {
      list[existingIdx] = result;
    } else {
      list.unshift(result);
    }
    localStorage.setItem(`ielts_results_${consultancyId}`, JSON.stringify(list));
    this.broadcast('RESULT_ADDED', { consultancyId, result });
  }

  // --- PUBLISH / RELEASE TEST RESULTS (CONSULTANCY ADMIN) ---
  public static publishTestResult(consultancyId: string, testId: string, candidateId?: string, completedAt?: string): void {
    const list = this.getResults(consultancyId);
    let updated = false;
    const now = new Date().toISOString();

    for (const item of list) {
      const matchTest = item.testId === testId;
      const matchCand = !candidateId || item.candidateId === candidateId;
      const matchTime = !completedAt || item.completedAt === completedAt;
      if (matchTest && matchCand && matchTime) {
        item.isPublished = true;
        item.publishedAt = now;
        updated = true;
      }
    }

    if (updated) {
      localStorage.setItem(`ielts_results_${consultancyId}`, JSON.stringify(list));
      this.broadcast('RESULT_PUBLISHED', { consultancyId, testId, candidateId });
    }
  }

  public static unpublishTestResult(consultancyId: string, testId: string, candidateId?: string, completedAt?: string): void {
    const list = this.getResults(consultancyId);
    let updated = false;

    for (const item of list) {
      const matchTest = item.testId === testId;
      const matchCand = !candidateId || item.candidateId === candidateId;
      const matchTime = !completedAt || item.completedAt === completedAt;
      if (matchTest && matchCand && matchTime) {
        item.isPublished = false;
        item.publishedAt = undefined;
        updated = true;
      }
    }

    if (updated) {
      localStorage.setItem(`ielts_results_${consultancyId}`, JSON.stringify(list));
      this.broadcast('RESULT_UNPUBLISHED', { consultancyId, testId, candidateId });
    }
  }

  public static publishAllResults(consultancyId: string): void {
    const list = this.getResults(consultancyId);
    const now = new Date().toISOString();
    for (const item of list) {
      item.isPublished = true;
      if (!item.publishedAt) {
        item.publishedAt = now;
      }
    }
    localStorage.setItem(`ielts_results_${consultancyId}`, JSON.stringify(list));
    this.broadcast('ALL_RESULTS_PUBLISHED', { consultancyId });
  }

  // Look up candidate results by Candidate Number (for verification portal)
  public static getCandidateResults(candidateId: string, consultancyId?: string): {
    found: boolean;
    allResults: TestResult[];
    publishedResults: TestResult[];
    pendingResults: TestResult[];
  } {
    const cleanCandId = candidateId.trim().replace(/^#/, '');
    if (!cleanCandId) {
      return { found: false, allResults: [], publishedResults: [], pendingResults: [] };
    }

    const consultancies = this.getConsultancies();
    let allMatching: TestResult[] = [];

    const targetList = consultancyId
      ? [this.getConsultancyById(consultancyId)].filter(Boolean)
      : consultancies;

    for (const c of targetList) {
      if (!c) continue;
      const cResults = this.getResults(c.id);
      const matched = cResults.filter((r) => {
        return (r.candidateId || '').trim().toLowerCase() === cleanCandId.toLowerCase();
      });
      allMatching = allMatching.concat(matched);
    }

    // Also check global past results
    try {
      const rawPast = localStorage.getItem('ielts_mock_past_results');
      if (rawPast) {
        const parsed: TestResult[] = JSON.parse(rawPast);
        for (const pr of parsed) {
          if (
            (pr.candidateId || '').trim().toLowerCase() === cleanCandId.toLowerCase() &&
            !allMatching.some((m) => m.testId === pr.testId && m.completedAt === pr.completedAt)
          ) {
            allMatching.push(pr);
          }
        }
      }
    } catch { /* ignore */ }

    const publishedResults = allMatching.filter((r) => r.isPublished === true);
    const pendingResults = allMatching.filter((r) => r.isPublished !== true);

    return {
      found: allMatching.length > 0,
      allResults: allMatching,
      publishedResults,
      pendingResults
    };
  }

  // --- CONSULTANCY AI DIAGNOSTIC REPORTS DIRECTORY ---
  public static getReports(consultancyId: string): SavedAIReport[] {
    const raw = localStorage.getItem(`ielts_reports_${consultancyId}`);
    if (!raw) {
      if (consultancyId === 'apex-global') {
        const defaultReports: SavedAIReport[] = [
          {
            studentName: 'Rohan Sharma',
            candidateId: '004128',
            testTitle: 'Academic Reading - Cam 19 Test 1',
            module: 'reading',
            bandScore: 7.5,
            correctCount: 34,
            totalQuestions: 40,
            timeTakenSeconds: 3120,
            completedAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            studentName: 'Bikash Adhikari',
            candidateId: '004130',
            testTitle: 'Academic Reading - Cam 18 Test 2',
            module: 'reading',
            bandScore: 6.5,
            correctCount: 28,
            totalQuestions: 40,
            timeTakenSeconds: 3480,
            completedAt: new Date(Date.now() - 7200000).toISOString()
          },
          {
            studentName: 'Aayusha Thapa',
            candidateId: '004129',
            testTitle: 'Academic Listening - Cam 19 Test 1',
            module: 'listening',
            bandScore: 7.0,
            correctCount: 31,
            totalQuestions: 40,
            timeTakenSeconds: 1980,
            completedAt: new Date(Date.now() - 10800000).toISOString()
          }
        ];
        localStorage.setItem(`ielts_reports_${consultancyId}`, JSON.stringify(defaultReports));
        return defaultReports;
      }
      return [];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveReport(consultancyId: string, report: SavedAIReport): void {
    const list = this.getReports(consultancyId);
    list.unshift(report);
    localStorage.setItem(`ielts_reports_${consultancyId}`, JSON.stringify(list));
    this.broadcast('REPORT_ADDED', { consultancyId, report });
  }

  // --- AI DIAGNOSTIC ENGINE ---
  public static generateAIDiagnostic(result: TestResult, studentName: string = 'Candidate'): AIDiagnosticReport {
    const band = result.bandScore;
    const target = 7.5;
    const bandGap = Number((target - band).toFixed(1));
    const percent = Math.round((result.correctCount / (result.totalQuestions || 40)) * 100);

    const cefr =
      band >= 8.5
        ? 'C2 - Mastery / Native Operational'
        : band >= 7.5
        ? 'C1 - Effective Operational Proficiency'
        : band >= 6.5
        ? 'B2 - Independent User (High Proficiency)'
        : band >= 5.5
        ? 'B2 - Independent User (Threshold)'
        : 'B1 - Intermediate User';

    const timeMins = Math.floor(result.timeTakenSeconds / 60);
    const timeSecs = result.timeTakenSeconds % 60;
    const timeFormatted = `${timeMins}m ${timeSecs}s`;

    // Neural skill diagnostics based on performance
    const skillMetrics = [
      {
        name: 'Rapid Skimming & Paragraph Mapping',
        scorePercent: Math.min(100, Math.round(percent * 1.05)),
        benchmark: 80,
        status: (percent >= 75 ? 'Mastered' : percent >= 60 ? 'Competent' : 'Needs Practice') as any
      },
      {
        name: 'Keyword Scanning & Detail Retrieval',
        scorePercent: Math.min(100, Math.round(percent * 0.95)),
        benchmark: 85,
        status: (percent >= 80 ? 'Mastered' : percent >= 65 ? 'Competent' : 'Needs Practice') as any
      },
      {
        name: 'Distractor Traps & Paraphrase Recognition',
        scorePercent: Math.min(100, Math.max(30, Math.round(percent * 0.9))),
        benchmark: 75,
        status: (percent >= 70 ? 'Competent' : 'Critical Focus') as any
      },
      {
        name: 'Lexical Precision & Word Limit Adherence',
        scorePercent: Math.min(100, Math.round(percent * 1.08)),
        benchmark: 90,
        status: (percent >= 85 ? 'Mastered' : percent >= 70 ? 'Competent' : 'Critical Focus') as any
      }
    ];

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const advice: string[] = [];

    if (band >= 7.0) {
      strengths.push('Exceptional ability to navigate complex academic registers and dense syntax.');
      strengths.push('High precision on multiple-choice options with zero false-friend trap fallibility.');
      advice.push('Focus on maintaining speed under 16 minutes per passage to reserve 8 minutes for proofreading.');
    } else {
      weaknesses.push('Struggles with subtle qualifying vocabulary (e.g. "seldom", "almost exclusively", "tentatively").');
      weaknesses.push('High latency on Matching Headings — spending over 2.5 minutes per paragraph.');
      advice.push('Drill True/False/Not Given questions focusing strictly on distinguishing "False" (contradiction) from "Not Given" (absence of proof).');
    }

    if (result.module === 'listening') {
      strengths.push('Clean spelling accuracy for proper nouns and numeric sequences.');
      weaknesses.push('Part 3 multi-speaker academic dialogue exhibits hesitation during rapid turn-taking.');
      advice.push('Pre-read Question stems during the 30-second silent gaps to predict word classes (nouns vs verbs).');
    } else {
      advice.push('Apply the two-pass reading methodology: 90 seconds structural skim, followed by localized question scanning.');
    }

    return {
      studentName,
      candidateId: '00' + Math.floor(1000 + Math.random() * 9000),
      testTitle: `Cambridge ${result.book} Test ${result.testNumber} (${result.module === 'reading' ? 'Reading' : 'Listening'})`,
      module: result.module,
      date: new Date(result.completedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      overallBand: band,
      targetBand: target,
      bandGap,
      cefrLevel: cefr,
      accuracyPercentage: percent,
      timeSpentFormatted: timeFormatted,
      rawScore: `${result.correctCount} / ${result.totalQuestions || 40}`,
      skillMetrics,
      aiDiagnosticInsights: {
        strengths,
        criticalWeaknesses: weaknesses,
        strategicAdvice: advice,
        speedAnalysis:
          result.timeTakenSeconds < 2400
            ? 'Pace: Optimal (Fast, allowing time for question verification).'
            : 'Pace: Near limit. Student required full allotted time window.'
      }
    };
  }
}
