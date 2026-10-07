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
import { supabase } from '../lib/supabase';

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
      'cambridge-16-test-1-reading',
      'cambridge-16-test-1-listening',
      'cambridge-16-test-1-writing',
      'cambridge-16-test-2-reading',
      'cambridge-16-test-2-listening',
      'cambridge-16-test-2-writing',
      'cambridge-16-test-3-reading',
      'cambridge-16-test-3-listening',
      'cambridge-16-test-3-writing',
      'cambridge-16-test-4-reading',
      'cambridge-16-test-4-listening',
      'cambridge-16-test-4-writing',
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
      'cambridge-16-test-1-reading',
      'cambridge-16-test-1-listening',
      'cambridge-16-test-1-writing',
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
      'cambridge-16-test-1-reading',
      'cambridge-16-test-1-listening',
      'cambridge-16-test-1-writing',
      'cambridge-18-test-2-reading',
      'cambridge-18-test-2-listening',
      'cambridge-19-test-1-reading',
      'cambridge-19-test-1-listening'
    ]
  },
  {
    id: 'kiec-lalitpur',
    name: 'KIEC Lalitpur',
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
      'cambridge-16-test-1-reading',
      'cambridge-16-test-1-listening',
      'cambridge-16-test-1-writing',
      'cambridge-16-test-2-reading',
      'cambridge-16-test-2-listening',
      'cambridge-16-test-2-writing',
      'cambridge-16-test-3-reading',
      'cambridge-16-test-3-listening',
      'cambridge-16-test-3-writing',
      'cambridge-16-test-4-reading',
      'cambridge-16-test-4-listening',
      'cambridge-16-test-4-writing',
      'cambridge-19-test-1-reading',
      'cambridge-19-test-1-listening'
    ]
  }
];

// Initial mock lab stations (all start clean/idle without stale hardcoded test assignments)
const DEFAULT_STATIONS: LabStation[] = [
  {
    id: 'apex-pc-01',
    name: 'PC-01',
    consultancyId: 'apex-global',
    status: 'idle',
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-02',
    name: 'PC-02',
    consultancyId: 'apex-global',
    status: 'idle',
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-03',
    name: 'PC-03',
    consultancyId: 'apex-global',
    status: 'idle',
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
    status: 'idle',
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'apex-pc-07',
    name: 'PC-07',
    consultancyId: 'apex-global',
    status: 'idle',
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
  private static localListeners: Set<(event: { type: string; payload: any }) => void> = new Set();
  private static supabaseChannel: any = null;
  private static isSupabaseSubscribed = false;

  private static getChannel(): BroadcastChannel | null {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (!this.broadcastChannel) {
        this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      }
      return this.broadcastChannel;
    }
    return null;
  }

  // Supabase Realtime Telemetry Bus (operates seamlessly across different computers and browsers)
  private static getSupabaseChannel(): any {
    if (typeof window === 'undefined' || !supabase) return null;
    if (this.supabaseChannel) return this.supabaseChannel;

    try {
      this.supabaseChannel = supabase.channel('ielts-global-lab-telemetry', {
        config: {
          broadcast: { ack: false, self: false },
          presence: { key: 'station-telemetry' }
        }
      });

      this.supabaseChannel
        .on('broadcast', { event: 'telemetry' }, (msg: any) => {
          if (msg?.payload) {
            this.handleCloudTelemetry(msg.payload);
          }
        })
        .on('presence', { event: 'sync' }, () => {
          try {
            const state = this.supabaseChannel.presenceState();
            this.handlePresenceSync(state);
          } catch {}
        })
        .subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            this.isSupabaseSubscribed = true;
            this.syncLocalToPresence();
          }
        });

      return this.supabaseChannel;
    } catch {
      return null;
    }
  }

  private static handleCloudTelemetry(eventObj: { type: string; payload: any }): void {
    if (!eventObj?.type) return;

    if (eventObj.type === 'BRANCH_TEST_LAUNCHED') {
      const p = eventObj.payload;
      if (p?.consultancyId && p?.testId) {
        const stoppedAt = this.getStoppedTimestamp(p.consultancyId);
        const launchedAt = p.launchedAt ? new Date(p.launchedAt).getTime() : 0;
        if (stoppedAt && stoppedAt >= launchedAt) {
          // Test was stopped at or after this launch: do NOT resurrect
          return;
        }
        try {
          localStorage.setItem(`ielts_launched_test_${p.consultancyId}`, JSON.stringify(p));
          localStorage.setItem('ielts_latest_launched_test', JSON.stringify(p));
        } catch {}
      } else if (p?.consultancyId && !p?.testId) {
        const stopTime = p.stoppedAt || Date.now();
        const c = this.getConsultancyById(p.consultancyId) || this.getConsultancyByBranchCode(p.consultancyId);
        const targetCids = [p.consultancyId];
        if (c && c.id && !targetCids.includes(c.id)) targetCids.push(c.id);
        if (c && c.branchCode && !targetCids.includes(c.branchCode)) targetCids.push(c.branchCode);

        try {
          for (const cid of targetCids) {
            localStorage.setItem(`ielts_stopped_test_${cid}`, String(stopTime));
            localStorage.removeItem(`ielts_launched_test_${cid}`);
          }
          const latestRaw = localStorage.getItem('ielts_latest_launched_test');
          if (latestRaw) {
            const parsed = JSON.parse(latestRaw);
            if (!parsed?.consultancyId || targetCids.includes(parsed.consultancyId)) {
              localStorage.removeItem('ielts_latest_launched_test');
            }
          }
          if (this.supabaseChannel) {
            try {
              this.supabaseChannel.untrack();
            } catch {}
          }
        } catch {}
      }
    } else if (eventObj.type === 'STATION_UPDATED' || eventObj.type === 'STATION_HEARTBEAT' || eventObj.type === 'STATION_ADDED') {
      const st = eventObj.payload;
      if (st?.consultancyId && st?.name) {
        try {
          const canonical = this.getCanonicalConsultancyId(st.consultancyId);
          const aliases = this.getConsultancyAliases(st.consultancyId);
          const list = this.getStations(canonical);
          const norm = this.normalizeStationName(st.name);
          const idx = list.findIndex((s) => this.normalizeStationName(s.name) === norm);
          if (idx >= 0) {
            list[idx] = { ...list[idx], ...st, consultancyId: canonical };
          } else {
            list.push({ ...st, consultancyId: canonical });
          }
          const serialized = JSON.stringify(list);
          for (const key of aliases) {
            localStorage.setItem(`ielts_stations_${key}`, serialized);
          }
        } catch {}
      }
    } else if (eventObj.type === 'RESULT_ADDED') {
      const p = eventObj.payload;
      const cid = p?.consultancyId;
      const res = p?.result;
      if (cid && res) {
        try {
          const canonical = this.getCanonicalConsultancyId(cid);
          const aliases = this.getConsultancyAliases(cid);
          const list = this.getResults(canonical);
          if (res.isPublished === undefined) {
            res.isPublished = false;
          }
          const cleanRes = { ...res, consultancyId: canonical };
          const idx = list.findIndex(
            (r) =>
              r.testId === cleanRes.testId &&
              r.candidateId === cleanRes.candidateId &&
              r.completedAt === cleanRes.completedAt
          );
          if (idx >= 0) {
            list[idx] = cleanRes;
          } else {
            // Check if this candidate has an existing placeholder result from station recovery that should be upgraded
            const hasRealAnswers = cleanRes.answers && Object.keys(cleanRes.answers).length > 0;
            const isWriting = cleanRes.module === 'writing' || !!cleanRes.writingSubmission;
            const placeholderIdx = list.findIndex(
              (r) =>
                (r.candidateId === cleanRes.candidateId ||
                  (r.candidateName && cleanRes.candidateName && r.candidateName.trim().toLowerCase() === cleanRes.candidateName.trim().toLowerCase())) &&
                r.testId === 'cambridge-16-test-1-reading' &&
                r.bandScore === 7.0 &&
                Object.keys(r.answers || {}).length === 0 &&
                (hasRealAnswers || isWriting || cleanRes.testId !== 'cambridge-16-test-1-reading' || cleanRes.bandScore !== 7.0)
            );
            if (placeholderIdx >= 0) {
              list[placeholderIdx] = cleanRes;
            } else {
              list.unshift(cleanRes);
            }
          }
          const serialized = JSON.stringify(list);
          for (const key of aliases) {
            localStorage.setItem(`ielts_results_${key}`, serialized);
          }

          // Automatically sync candidate student in the consultancy roster
          try {
            const students = this.getStudents(canonical);
            this.upsertStudentForResult(
              students,
              canonical,
              cleanRes.candidateId || '00' + Math.floor(1000 + Math.random() * 9000),
              cleanRes,
              cleanRes.candidateName
            );
            const stdSerialized = JSON.stringify(students);
            for (const key of aliases) {
              localStorage.setItem(`ielts_students_${key}`, stdSerialized);
            }
          } catch {}
        } catch {}
      }
    } else if (eventObj.type === 'REQUEST_STATION_RESULTS') {
      const p = eventObj.payload;
      const requestedCid = p?.consultancyId;
      if (typeof window !== 'undefined') {
        const canonical = this.getCanonicalConsultancyId(requestedCid);
        setTimeout(() => {
          this.pushLocalResultsToCloud(canonical);
        }, Math.floor(50 + Math.random() * 250));
      }
    } else if (eventObj.type === 'REPORT_ADDED') {
      const p = eventObj.payload;
      const cid = p?.consultancyId;
      const rep = p?.report;
      if (cid && rep) {
        try {
          const canonical = this.getCanonicalConsultancyId(cid);
          const aliases = this.getConsultancyAliases(cid);
          const list = this.getReports(canonical);
          const exists = list.some(
            (r) =>
              r.testId === rep.testId &&
              r.candidateId === rep.candidateId &&
              r.completedAt === rep.completedAt
          );
          if (!exists) {
            list.unshift({ ...rep, consultancyId: canonical });
          }
          const serialized = JSON.stringify(list);
          for (const key of aliases) {
            localStorage.setItem(`ielts_reports_${key}`, serialized);
          }
        } catch {}
      }
    } else if (eventObj.type === 'STUDENT_UPDATED') {
      const p = eventObj.payload;
      if (p?.consultancyId) {
        try {
          const canonical = this.getCanonicalConsultancyId(p.consultancyId);
          const aliases = this.getConsultancyAliases(p.consultancyId);
          const students = this.getStudents(canonical);
          if (p.candidateNumber && p.result) {
            this.upsertStudentForResult(
              students,
              canonical,
              p.candidateNumber,
              p.result,
              p.candidateName
            );
          }
          const serialized = JSON.stringify(students);
          for (const key of aliases) {
            localStorage.setItem(`ielts_students_${key}`, serialized);
          }
        } catch {}
      }
    } else if (eventObj.type === 'CONSULTANCY_UPDATED') {
      const c = eventObj.payload;
      if (c && c.id) {
        try {
          const list = this.getConsultancies();
          const idx = list.findIndex((item) => item.id === c.id);
          if (idx >= 0) {
            list[idx] = c;
          } else {
            list.unshift(c);
          }
          localStorage.setItem('ielts_consultancies', JSON.stringify(list));
        } catch {}
      }
    } else if (eventObj.type === 'CONSULTANCY_DELETED') {
      const id = eventObj.payload;
      if (id) {
        try {
          const deleted = this.getDeletedConsultancyIds();
          const cleanId = String(id).toLowerCase().trim();
          if (!deleted.includes(cleanId)) {
            deleted.push(cleanId);
            localStorage.setItem('ielts_deleted_consultancies', JSON.stringify(deleted));
          }
          const list = this.getConsultancies().filter((c) => c.id.toLowerCase() !== cleanId);
          localStorage.setItem('ielts_consultancies', JSON.stringify(list));
        } catch {}
      }
    }

    // Dispatch locally to components
    this.localListeners.forEach((listener) => {
      try {
        listener(eventObj);
      } catch {}
    });

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('ielts_telemetry', { detail: eventObj }));
      } catch {}
    }
  }

  private static handlePresenceSync(state: Record<string, any[]>): void {
    if (!state) return;
    for (const key of Object.keys(state)) {
      const presences = state[key];
      if (Array.isArray(presences)) {
        for (const item of presences) {
          if (item?.type === 'BRANCH_TEST_LAUNCHED' && item.consultancyId && item.testId) {
            const stoppedAt = this.getStoppedTimestamp(item.consultancyId);
            const launchedAt = item.launchedAt ? new Date(item.launchedAt).getTime() : 0;
            // CRITICAL: If the test was stopped AT OR AFTER this launchedAt, DO NOT resurrect!
            if (stoppedAt && stoppedAt >= launchedAt) {
              if (this.supabaseChannel) {
                try {
                  this.supabaseChannel.untrack();
                } catch {}
              }
              continue;
            }

            try {
              localStorage.setItem(`ielts_launched_test_${item.consultancyId}`, JSON.stringify(item));
              localStorage.setItem('ielts_latest_launched_test', JSON.stringify(item));
            } catch {}
            this.localListeners.forEach((listener) => {
              try {
                listener({ type: 'BRANCH_TEST_LAUNCHED', payload: item });
              } catch {}
            });
          }
        }
      }
    }
  }

  private static syncLocalToPresence(): void {
    if (!this.supabaseChannel || !this.isSupabaseSubscribed) return;
    try {
      // Avoid student terminals echoing test launches
      if (typeof window !== 'undefined' && (
        window.location.search.includes('station=') ||
        window.location.pathname.includes('/terminal')
      )) {
        return;
      }

      const latestRaw = localStorage.getItem('ielts_latest_launched_test');
      if (latestRaw) {
        const parsed = JSON.parse(latestRaw);
        if (parsed?.testId && parsed?.consultancyId) {
          const stoppedAt = this.getStoppedTimestamp(parsed.consultancyId);
          const launchedAt = parsed.launchedAt ? new Date(parsed.launchedAt).getTime() : 0;
          if (stoppedAt && stoppedAt >= launchedAt) {
            // Test was stopped; untrack immediately
            this.supabaseChannel.untrack();
            return;
          }
          this.supabaseChannel.track({
            type: 'BRANCH_TEST_LAUNCHED',
            ...parsed
          });
        }
      }
    } catch {}
  }

  // Broadcast event across browser tabs / windows in the lab with 0ms latency + Cloud Realtime
  public static broadcast(type: string, payload: any) {
    const eventObj = { type, payload, timestamp: Date.now() };

    // 1. Direct synchronous in-memory dispatch (0ms latency within the current process/page)
    this.localListeners.forEach((listener) => {
      try {
        listener(eventObj);
      } catch (err) {
        console.error('Error in telemetry listener:', err);
      }
    });

    // 2. Dispatch DOM CustomEvent on window for same-window DOM listeners (0ms)
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('ielts_telemetry', { detail: eventObj }));
      } catch {}
    }

    // 3. BroadcastChannel message across separate tabs/windows on the same machine
    const channel = this.getChannel();
    if (channel) {
      try {
        channel.postMessage(eventObj);
      } catch {}
    }

    // 4. Supabase Realtime across separate computers / browsers on the internet
    const sbCh = this.getSupabaseChannel();
    if (sbCh) {
      try {
        sbCh.send({
          type: 'broadcast',
          event: 'telemetry',
          payload: eventObj
        });
        if (type === 'BRANCH_TEST_LAUNCHED') {
          if (payload?.testId) {
            sbCh.track({
              type: 'BRANCH_TEST_LAUNCHED',
              ...payload
            });
          } else {
            sbCh.untrack();
          }
        }
      } catch {}
    }
  }

  // Subscribe to live telemetry events with multi-channel instant reaction
  public static subscribe(callback: (event: { type: string; payload: any }) => void): () => void {
    // Ensure cloud channel is active
    this.getSupabaseChannel();

    // 1. Register local synchronous listener (0ms)
    this.localListeners.add(callback);

    // 2. BroadcastChannel listener (cross-tab message)
    const channel = this.getChannel();
    const channelHandler = (e: MessageEvent) => {
      if (e.data) {
        callback(e.data);
      }
    };
    if (channel) {
      channel.addEventListener('message', channelHandler);
    }

    // 3. CustomEvent listener (same window DOM event)
    const customEventHandler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) {
        callback(custom.detail);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('ielts_telemetry', customEventHandler);
    }

    // 4. Native window storage event listener (cross-tab 0ms instant trigger, never throttled by browser)
    const storageHandler = (e: StorageEvent) => {
      if (!e.key) {
        callback({ type: 'STORAGE_SYNC', payload: {} });
        return;
      }
      if (
        e.key.startsWith('ielts_launched_test_') ||
        e.key === 'ielts_latest_launched_test'
      ) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : null;
          callback({
            type: 'BRANCH_TEST_LAUNCHED',
            payload: parsed || { testId: null }
          });
        } catch {
          callback({ type: 'BRANCH_TEST_LAUNCHED', payload: { testId: null } });
        }
      } else if (e.key.startsWith('ielts_stations_')) {
        callback({ type: 'STATION_UPDATED', payload: {} });
      } else if (e.key.startsWith('ielts_results_')) {
        callback({ type: 'RESULT_SUBMITTED', payload: {} });
      }
    };

    // 5. Visibility and focus listeners (instant sync when student switches to or refocuses tab)
    const focusHandler = () => {
      callback({ type: 'WINDOW_FOCUSED', payload: {} });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', storageHandler);
      window.addEventListener('focus', focusHandler);
      document.addEventListener('visibilitychange', focusHandler);
    }

    return () => {
      this.localListeners.delete(callback);
      if (channel) {
        channel.removeEventListener('message', channelHandler);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('ielts_telemetry', customEventHandler);
        window.removeEventListener('storage', storageHandler);
        window.removeEventListener('focus', focusHandler);
        document.removeEventListener('visibilitychange', focusHandler);
      }
    };
  }

  // --- CONSULTANCIES MANAGEMENT (SUPER ADMIN) ---
  public static getDeletedConsultancyIds(): string[] {
    try {
      const raw = localStorage.getItem('ielts_deleted_consultancies');
      let list: string[] = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list)) {
        // Self-heal: Any active consultancy in storage must NEVER be marked deleted
        if (typeof window !== 'undefined') {
          const rawActive = localStorage.getItem('ielts_consultancies');
          if (rawActive) {
            try {
              const active: Consultancy[] = JSON.parse(rawActive);
              const activeKeys = new Set<string>();
              active.forEach((c) => {
                if (c.id) activeKeys.add(c.id.toLowerCase().trim());
                if (c.branchCode) activeKeys.add(c.branchCode.toLowerCase().trim());
                if (c.accessCode) activeKeys.add(c.accessCode.toLowerCase().trim());
              });
              const cleaned = list.filter((key) => !activeKeys.has(key.toLowerCase().trim()));
              if (cleaned.length !== list.length) {
                localStorage.setItem('ielts_deleted_consultancies', JSON.stringify(cleaned));
                list = cleaned;
              }
            } catch {}
          }
        }
        return list;
      }
      return [];
    } catch {
      return [];
    }
  }

  public static isConsultancyDeleted(idOrCode: string): boolean {
    if (!idOrCode) return false;
    const clean = idOrCode.toLowerCase().trim();
    const cleanAlphaNum = clean.replace(/[^a-z0-9]/g, '');
    const deleted = this.getDeletedConsultancyIds();
    return (
      deleted.includes(clean) ||
      deleted.includes(cleanAlphaNum) ||
      deleted.some((d) => d === clean || d.replace(/[^a-z0-9]/g, '') === cleanAlphaNum)
    );
  }

  public static getConsultancies(): Consultancy[] {
    const deletedIds = this.getDeletedConsultancyIds();
    const isExcluded = (c: Consultancy) => {
      if ((c as any).status === 'inactive' || (c as any).status === 'deleted' || c.status === 'suspended') return true;
      const id = (c.id || '').toLowerCase().trim();
      const branch = (c.branchCode || '').toLowerCase().trim();
      const access = (c.accessCode || '').toLowerCase().trim();
      const name = (c.name || '').toLowerCase().trim();

      // Data cleanup: Exclude developer test leftover "Consultancy Testing Lab" / "LAB01"
      if (branch === 'lab01' || access === 'lab01' || id === 'lab01' || name === 'consultancy testing lab') {
        return true;
      }

      // Exclude strictly by unique ID or branchCode tombstone, NEVER by common human name
      if (id && deletedIds.includes(id)) return true;
      if (branch && deletedIds.includes(branch)) return true;
      if (access && deletedIds.includes(access)) return true;
      return false;
    };

    const raw = typeof window !== 'undefined' ? localStorage.getItem('ielts_consultancies') : null;
    let list: Consultancy[] = [];

    if (!raw) {
      list = DEFAULT_CONSULTANCIES.filter((d) => !isExcluded(d));
      if (typeof window !== 'undefined') {
        localStorage.setItem('ielts_consultancies', JSON.stringify(list));
      }
      return list;
    }

    try {
      const parsed: Consultancy[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed.filter((c) => !isExcluded(c));

        // Merge missing default consultancies EXCEPT those explicitly deleted or inactive
        let changed = false;
        for (const def of DEFAULT_CONSULTANCIES) {
          if (isExcluded(def)) continue;
          const exists = list.some(
            (c) =>
              c.id.toLowerCase() === def.id.toLowerCase() ||
              (c.adminEmail && c.adminEmail.trim().toLowerCase() === def.adminEmail.toLowerCase()) ||
              (c.branchCode && c.branchCode.trim().toUpperCase() === def.branchCode.toUpperCase())
          );
          if (!exists) {
            list.push(def);
            changed = true;
          }
        }
        if (typeof window !== 'undefined' && (changed || list.length !== parsed.length)) {
          localStorage.setItem('ielts_consultancies', JSON.stringify(list));
        }
        return list;
      }
      return DEFAULT_CONSULTANCIES.filter((d) => !isExcluded(d));
    } catch {
      return DEFAULT_CONSULTANCIES.filter((d) => !isExcluded(d));
    }
  }

  public static getConsultancyById(id: string): Consultancy | undefined {
    if (!id) return undefined;
    const clean = id.trim().toLowerCase();
    const cleanAlphaNum = clean.replace(/[^a-z0-9]/g, '');
    return this.getConsultancies().find(
      (c) =>
        c.id.toLowerCase() === clean ||
        c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanAlphaNum ||
        (c.branchCode && c.branchCode.toLowerCase() === clean) ||
        (c.accessCode && c.accessCode.toLowerCase() === clean) ||
        (c.name && c.name.toLowerCase() === clean) ||
        (c.name && c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanAlphaNum)
    );
  }

  public static getConsultancyByAccessCode(code: string): Consultancy | undefined {
    if (!code) return undefined;
    const clean = code.trim().toUpperCase();
    const cleanAlphaNum = clean.replace(/[^A-Z0-9]/g, '');

    // Map sketch shortcuts: kiec-1, kiec-2, kiec-3, apex-1
    if (cleanAlphaNum === 'KIEC1' || clean === 'KIEC-1') {
      const found = this.getConsultancyById('kiec-lalitpur');
      if (found) return found;
    }
    if (cleanAlphaNum === 'APEX1' || clean === 'APEX-1') {
      const found = this.getConsultancyById('apex-global');
      if (found) return found;
    }

    return this.getConsultancies().find(
      (c) =>
        (c.accessCode && c.accessCode.toUpperCase() === clean) ||
        (c.branchCode && c.branchCode.toUpperCase() === clean) ||
        (c.id && c.id.toUpperCase() === clean) ||
        (c.name && c.name.toUpperCase() === clean) ||
        (c.branch && c.branch.toUpperCase() === clean) ||
        (c.accessCode && c.accessCode.toUpperCase().replace(/[^A-Z0-9]/g, '') === cleanAlphaNum) ||
        (c.branchCode && c.branchCode.toUpperCase().replace(/[^A-Z0-9]/g, '') === cleanAlphaNum) ||
        (c.id && c.id.toUpperCase().replace(/[^A-Z0-9]/g, '') === cleanAlphaNum) ||
        (c.name && c.name.toUpperCase().replace(/[^A-Z0-9]/g, '') === cleanAlphaNum)
    );
  }

  public static getConsultancyByBranchCode(code: string): Consultancy | undefined {
    return this.getConsultancyByAccessCode(code);
  }

  public static getCanonicalConsultancyId(input?: string): string {
    if (!input) return 'apex-global';
    const clean = input.trim();
    if (!clean) return 'apex-global';
    const c = this.getConsultancyById(clean) || this.getConsultancyByBranchCode(clean);
    return c?.id || clean.toLowerCase();
  }

  public static getConsultancyAliases(input?: string): string[] {
    if (!input) return ['apex-global'];
    const canonical = this.getCanonicalConsultancyId(input);
    const c = this.getConsultancyById(canonical);
    const aliases = new Set<string>();
    aliases.add(canonical);
    if (input.trim()) aliases.add(input.trim());
    if (input.trim().toLowerCase()) aliases.add(input.trim().toLowerCase());
    if (input.trim().toUpperCase()) aliases.add(input.trim().toUpperCase());
    if (c) {
      if (c.id) {
        aliases.add(c.id);
        aliases.add(c.id.toLowerCase());
      }
      if (c.branchCode) {
        aliases.add(c.branchCode);
        aliases.add(c.branchCode.toUpperCase());
        aliases.add(c.branchCode.toLowerCase());
      }
      if (c.accessCode) {
        aliases.add(c.accessCode);
        aliases.add(c.accessCode.toUpperCase());
        aliases.add(c.accessCode.toLowerCase());
      }
    }
    return Array.from(aliases);
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

    let consultancy = this.getConsultancyByBranchCode(cleanBranch);
    if (!consultancy) {
      consultancy = this.getConsultancyById(branchCode.trim().toLowerCase());
    }
    if (!consultancy) {
      const all = this.getConsultancies();
      consultancy = all.find(
        (c) =>
          c.id.toUpperCase() === cleanBranch ||
          (c.branchCode && c.branchCode.toUpperCase() === cleanBranch) ||
          (c.accessCode && c.accessCode.toUpperCase() === cleanBranch) ||
          c.name.toUpperCase().includes(cleanBranch)
      );
    }

    if (!consultancy) {
      return {
        success: false,
        error: `Branch code or ID "${cleanBranch}" not found. Please confirm with your invigilator.`
      };
    }

    const expectedPassword = consultancy.examPassword || '1234';
    if (
      cleanPass &&
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
    try {
      const sessRaw = typeof window !== 'undefined' ? sessionStorage.getItem('ielts_candidate_session') : null;
      if (sessRaw) {
        return JSON.parse(sessRaw);
      }
    } catch {}

    const raw = typeof window !== 'undefined' ? localStorage.getItem('ielts_candidate_session') : null;
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public static setCurrentCandidateSession(session: CandidateSession | null): void {
    if (session) {
      try {
        sessionStorage.setItem('ielts_candidate_session', JSON.stringify(session));
        if (session.stationName) {
          sessionStorage.setItem('ielts_terminal_pc', session.stationName);
        }
      } catch {}
      try {
        localStorage.setItem('ielts_candidate_session', JSON.stringify(session));
        if (session.stationName) {
          localStorage.setItem('ielts_terminal_pc', session.stationName);
        }
      } catch {}
    } else {
      try {
        sessionStorage.removeItem('ielts_candidate_session');
      } catch {}
      try {
        localStorage.removeItem('ielts_candidate_session');
      } catch {}
    }
  }

  public static logoutCandidate(): void {
    this.setCurrentCandidateSession(null);
    try {
      localStorage.removeItem('ielts_terminal_pass');
      localStorage.removeItem('ielts_terminal_branch');
      sessionStorage.removeItem('ielts_terminal_pass');
      sessionStorage.removeItem('ielts_terminal_branch');
    } catch {}
  }

  public static saveConsultancy(consultancy: Consultancy, shouldBroadcast: boolean = true): void {
    consultancy.name = (consultancy.name || '').trim();
    consultancy.adminEmail = (consultancy.adminEmail || '').trim().toLowerCase();
    consultancy.branchCode = (consultancy.branchCode || consultancy.accessCode || '').trim().toUpperCase();
    consultancy.accessCode = (consultancy.accessCode || consultancy.branchCode || '').trim().toUpperCase();
    consultancy.examPassword = (consultancy.examPassword || '1234').trim();
    consultancy.adminPassword = (consultancy.adminPassword || consultancy.examPassword || '1234').trim();

    // Revive from deleted list if it was previously in tombstone (strip all associated identifiers/names)
    const cleanId = (consultancy.id || '').trim().toLowerCase();
    const cleanBranch = (consultancy.branchCode || '').trim().toLowerCase();
    const cleanAccess = (consultancy.accessCode || '').trim().toLowerCase();
    const cleanName = (consultancy.name || '').trim().toLowerCase();

    const deleted = this.getDeletedConsultancyIds().filter(
      (d) =>
        d.toLowerCase().trim() !== cleanId &&
        d.toLowerCase().trim() !== cleanBranch &&
        d.toLowerCase().trim() !== cleanAccess &&
        d.toLowerCase().trim() !== cleanName
    );
    localStorage.setItem('ielts_deleted_consultancies', JSON.stringify(deleted));

    const list = this.getConsultancies();
    const existingIdx = list.findIndex(
      (c) =>
        (c.id && consultancy.id && c.id.toLowerCase() === consultancy.id.toLowerCase()) ||
        (consultancy.branchCode && c.branchCode && c.branchCode.trim().toUpperCase() === consultancy.branchCode) ||
        (consultancy.accessCode && c.accessCode && c.accessCode.trim().toUpperCase() === consultancy.accessCode) ||
        (consultancy.adminEmail && c.adminEmail && c.adminEmail.trim().toLowerCase() === consultancy.adminEmail)
    );
    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...consultancy, id: list[existingIdx].id };
    } else {
      list.unshift(consultancy);
    }
    localStorage.setItem('ielts_consultancies', JSON.stringify(list));
    if (shouldBroadcast) {
      this.broadcast('CONSULTANCY_UPDATED', list[existingIdx >= 0 ? existingIdx : 0]);
    }
  }

  public static deleteConsultancy(id: string): void {
    if (!id) return;
    const cleanId = id.trim().toLowerCase();

    // 1. Remove from active list
    const current = this.getConsultancies();
    const target = current.find(
      (c) =>
        (c.id && c.id.toLowerCase() === cleanId) ||
        (c.branchCode && c.branchCode.toLowerCase() === cleanId) ||
        (c.accessCode && c.accessCode.toLowerCase() === cleanId)
    );

    const updated = current.filter((c) => {
      if (c.id && c.id.toLowerCase() === cleanId) return false;
      if (target && target.id && c.id && c.id.toLowerCase() === target.id.toLowerCase()) return false;
      return true;
    });
    localStorage.setItem('ielts_consultancies', JSON.stringify(updated));

    // 2. Record tombstone strictly for the unique id and codes (never generic branch names)
    const toRemove = new Set<string>();
    toRemove.add(cleanId);
    if (target?.id) toRemove.add(target.id.toLowerCase().trim());
    if (target?.branchCode) toRemove.add(target.branchCode.toLowerCase().trim());
    if (target?.accessCode) toRemove.add(target.accessCode.toLowerCase().trim());

    const deleted = this.getDeletedConsultancyIds().filter((d) => !toRemove.has(d.toLowerCase().trim()));
    toRemove.forEach((key) => deleted.push(key));
    localStorage.setItem('ielts_deleted_consultancies', JSON.stringify(deleted));

    // 3. Clean up related station and session keys
    try {
      localStorage.removeItem(`ielts_stations_${id}`);
      localStorage.removeItem(`ielts_assigned_tests_${id}`);
      localStorage.removeItem(`ielts_students_${id}`);
      localStorage.removeItem(`ielts_published_results_${id}`);
      localStorage.removeItem(`ielts_launched_test_${id}`);
      localStorage.removeItem(`ielts_stopped_test_${id}`);
      if (target?.id) {
        localStorage.removeItem(`ielts_stations_${target.id}`);
        localStorage.removeItem(`ielts_assigned_tests_${target.id}`);
        localStorage.removeItem(`ielts_students_${target.id}`);
        localStorage.removeItem(`ielts_published_results_${target.id}`);
        localStorage.removeItem(`ielts_launched_test_${target.id}`);
        localStorage.removeItem(`ielts_stopped_test_${target.id}`);
      }
    } catch (e) {
      console.error('Error clearing consultancy storage keys:', e);
    }

    // 4. Broadcast deletion event
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
  public static normalizeStationName(stationName: string): string {
    const raw = stationName.trim().toUpperCase();
    // Standardize PC1, PC01, PC-1 -> PC-01
    const match = raw.match(/^PC-?0*(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      return `PC-${num.toString().padStart(2, '0')}`;
    }
    return raw;
  }

  public static getStations(consultancyId: string): LabStation[] {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);

    let stationsList: LabStation[] = [];
    let foundRaw = false;

    for (const key of aliases) {
      const raw = localStorage.getItem(`ielts_stations_${key}`);
      if (raw) {
        foundRaw = true;
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            stationsList.push(...parsed);
          }
        } catch {}
      }
    }

    if (!foundRaw) {
      if (canonical === 'apex-global') {
        stationsList = [...DEFAULT_STATIONS];
      }
    } else {
      stationsList = stationsList.map((st: LabStation) => {
        // Clear any stale demo assignments from earlier prototypes
        if (st.currentCandidate?.candidateId === '004128' && st.assignedTestId === 'cambridge-19-test-1-reading') {
          return {
            ...st,
            status: 'idle' as const,
            currentCandidate: undefined,
            assignedTestId: undefined,
            testTitle: undefined,
            module: undefined,
            remainingSeconds: undefined,
            answeredCount: 0,
            currentQuestion: 1
          };
        }

        // Auto-reconcile submitted stations: if the candidate and their results were deleted, return station to idle
        if (st.status === 'submitted' && st.currentCandidate?.candidateId) {
          try {
            const rawStd = typeof window !== 'undefined' ? localStorage.getItem(`ielts_students_${canonical}`) : null;
            const rawRes = typeof window !== 'undefined' ? localStorage.getItem(`ielts_results_${canonical}`) : null;
            const stdList: ConsultancyStudent[] = rawStd ? JSON.parse(rawStd) : [];
            const resList: TestResult[] = rawRes ? JSON.parse(rawRes) : [];
            const candId = st.currentCandidate.candidateId;
            const candName = (st.currentCandidate.name || '').trim().toLowerCase();

            const hasStudent = stdList.some(
              (s) => s.candidateNumber === candId || (candName && s.fullName.trim().toLowerCase() === candName)
            );
            const hasResult = resList.some(
              (r) => r.candidateId === candId || (candName && (r.candidateName || '').trim().toLowerCase() === candName)
            );

            if (!hasStudent && !hasResult) {
              return {
                ...st,
                status: 'idle' as const,
                currentCandidate: undefined,
                assignedTestId: undefined,
                testTitle: undefined,
                module: undefined,
                timeSpentSeconds: undefined,
                remainingSeconds: undefined,
                answeredCount: 0,
                currentQuestion: 1
              };
            }
          } catch {}
        }
        return st;
      });
    }

    // Deduplicate by normalized station name (e.g. "PC-01")
    const deduplicated: LabStation[] = [];
    const seenNames = new Set<string>();

    // Prioritize active/assigned stations or those with newer heartbeats
    const sorted = [...stationsList].sort((a, b) => {
      const aPriority = a.status === 'in_progress' ? 3 : a.status === 'assigned' ? 2 : a.status === 'paused' ? 1 : 0;
      const bPriority = b.status === 'in_progress' ? 3 : b.status === 'assigned' ? 2 : b.status === 'paused' ? 1 : 0;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return new Date(b.lastHeartbeat || 0).getTime() - new Date(a.lastHeartbeat || 0).getTime();
    });

    for (const st of sorted) {
      const norm = this.normalizeStationName(st.name);
      if (!seenNames.has(norm)) {
        seenNames.add(norm);
        deduplicated.push({ ...st, name: norm, consultancyId: canonical });
      }
    }

    // Sort in natural order: PC-01, PC-02, PC-03...
    deduplicated.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    const serialized = JSON.stringify(deduplicated);
    for (const key of aliases) {
      localStorage.setItem(`ielts_stations_${key}`, serialized);
    }

    return deduplicated;
  }

  public static saveStation(station: LabStation): void {
    const canonical = this.getCanonicalConsultancyId(station.consultancyId);
    const aliases = this.getConsultancyAliases(station.consultancyId);
    const normName = this.normalizeStationName(station.name);
    const stationWithNorm = { ...station, name: normName, consultancyId: canonical };
    const list = this.getStations(canonical);
    const existingIdx = list.findIndex(
      (s) => s.id === station.id || this.normalizeStationName(s.name) === normName
    );
    if (existingIdx >= 0) {
      list[existingIdx] = {
        ...list[existingIdx],
        ...stationWithNorm,
        lastHeartbeat: new Date().toISOString()
      };
    } else {
      list.push({ ...stationWithNorm, lastHeartbeat: new Date().toISOString() });
    }
    const serialized = JSON.stringify(list);
    for (const key of aliases) {
      localStorage.setItem(`ielts_stations_${key}`, serialized);
    }
    this.broadcast('STATION_UPDATED', stationWithNorm);
  }

  public static updateStationHeartbeat(
    consultancyId: string,
    stationIdentifier: string,
    updates: Partial<LabStation>
  ): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getStations(canonical);
    const normSearch = this.normalizeStationName(stationIdentifier);
    const existingIdx = list.findIndex(
      (s) => s.id === stationIdentifier || this.normalizeStationName(s.name) === normSearch
    );
    if (existingIdx >= 0) {
      list[existingIdx] = {
        ...list[existingIdx],
        ...updates,
        consultancyId: canonical,
        lastHeartbeat: new Date().toISOString()
      };
      const serialized = JSON.stringify(list);
      for (const key of aliases) {
        localStorage.setItem(`ielts_stations_${key}`, serialized);
      }
      this.broadcast('STATION_HEARTBEAT', list[existingIdx]);
      this.broadcast('STATION_UPDATED', list[existingIdx]);
    } else {
      const newStation: LabStation = {
        id: `${canonical}-${normSearch.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: normSearch,
        consultancyId: canonical,
        status: updates.status || 'idle',
        lastHeartbeat: new Date().toISOString(),
        ...updates
      };
      list.push(newStation);
      const serialized = JSON.stringify(list);
      for (const key of aliases) {
        localStorage.setItem(`ielts_stations_${key}`, serialized);
      }
      this.broadcast('STATION_HEARTBEAT', newStation);
      this.broadcast('STATION_UPDATED', newStation);
    }
  }

  public static addStation(consultancyId: string, stationName: string): LabStation {
    const normName = this.normalizeStationName(stationName);
    const list = this.getStations(consultancyId);
    const activeTest = this.getActiveLaunchedTest(consultancyId);
    
    // Strict uniqueness check by normalized station name
    const existing = list.find((s) => this.normalizeStationName(s.name) === normName);
    if (existing) {
      existing.lastHeartbeat = new Date().toISOString();
      if (activeTest && (!existing.assignedTestId || existing.status === 'idle')) {
        existing.status = 'assigned';
        existing.assignedTestId = activeTest.testId;
        existing.testTitle = activeTest.title;
        existing.isFullMock = activeTest.isFullMock;
      }
      this.saveStation(existing);
      return existing;
    }

    const id = `${consultancyId}-${normName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const newStation: LabStation = {
      id,
      name: normName,
      consultancyId,
      status: activeTest ? 'assigned' : 'idle',
      assignedTestId: activeTest?.testId,
      testTitle: activeTest?.title,
      isFullMock: activeTest?.isFullMock,
      lastHeartbeat: new Date().toISOString()
    };
    list.push(newStation);
    localStorage.setItem(`ielts_stations_${consultancyId}`, JSON.stringify(list));
    this.broadcast('STATION_ADDED', newStation);
    return newStation;
  }

  public static addStationsBatch(consultancyId: string, count: number): LabStation[] {
    const list = this.getStations(consultancyId);
    let maxNum = 0;
    list.forEach((st) => {
      const match = st.name.match(/\d+/);
      if (match) {
        const n = parseInt(match[0], 10);
        if (n > maxNum) maxNum = n;
      }
    });

    const added: LabStation[] = [];
    for (let i = 1; i <= count; i++) {
      const num = maxNum + i;
      const formattedName = `PC-${num < 10 ? '0' + num : num}`;
      added.push(this.addStation(consultancyId, formattedName));
    }
    return added;
  }

  public static deleteStation(consultancyId: string, stationId: string): void {
    const list = this.getStations(consultancyId).filter((s) => s.id !== stationId);
    localStorage.setItem(`ielts_stations_${consultancyId}`, JSON.stringify(list));
    this.broadcast('STATION_DELETED', { consultancyId, stationId });
  }

  public static assignTestToStation(
    consultancyId: string,
    stationIdentifier: string,
    testId: string,
    testTitle: string,
    module: 'reading' | 'listening' | 'writing',
    candidate?: { candidateId: string; name: string; targetBand?: number }
  ): void {
    this.updateStationHeartbeat(consultancyId, stationIdentifier, {
      status: 'assigned',
      assignedTestId: testId,
      testTitle,
      module,
      currentQuestion: 1,
      totalQuestions: 40,
      answeredCount: 0,
      remainingSeconds: module === 'reading' || module === 'writing' ? 3600 : 2100,
      currentCandidate: candidate || {
        candidateId: '00' + Math.floor(1000 + Math.random() * 9000),
        name: 'Assigned Student'
      }
    });
    this.broadcast('STATION_COMMAND', { stationId: stationIdentifier, command: 'START_TEST', testId });
  }

  public static getStationAssignedTest(
    consultancyId?: string,
    stationIdentifier?: string
  ): {
    consultancyId: string;
    testId: string;
    title: string;
    module?: 'reading' | 'listening' | 'writing';
    launchedAt: string;
    candidate?: { candidateId: string; name: string; targetBand?: number };
    isFullMock?: boolean;
  } | null {
    if (!stationIdentifier) return null;
    const norm = this.normalizeStationName(stationIdentifier);

    // If specific consultancyId is provided, check directly
    if (consultancyId) {
      const branchActive = this.getActiveLaunchedTest(consultancyId);
      const maxStopped = this.getStoppedTimestamp(consultancyId);
      const stations = this.getStations(consultancyId);
      const matched = stations.find((s) => s.id === stationIdentifier || this.normalizeStationName(s.name) === norm);
      if (matched && matched.assignedTestId && (matched.status === 'assigned' || matched.status === 'in_progress')) {
        const sTime = new Date(matched.lastHeartbeat || 0).getTime();
        if (maxStopped && maxStopped >= sTime) {
          // Station assignment is prior to stop event
          return null;
        }
        const stationAssignment = {
          consultancyId,
          testId: matched.assignedTestId,
          title: matched.testTitle || matched.assignedTestId,
          module: matched.module,
          launchedAt: matched.lastHeartbeat || new Date().toISOString(),
          candidate: matched.currentCandidate,
          isFullMock: matched.assignedTestId.includes('full')
        };
        if (branchActive) {
          const bTime = new Date(branchActive.launchedAt || 0).getTime();
          if (bTime > sTime) {
            return {
              consultancyId: branchActive.consultancyId || consultancyId,
              testId: branchActive.testId,
              title: branchActive.title,
              launchedAt: branchActive.launchedAt,
              isFullMock: branchActive.isFullMock,
              candidate: matched.currentCandidate
            };
          }
        }
        return stationAssignment;
      }

      // If station itself didn't have an individual override, but branch has an active test:
      if (branchActive) {
        return {
          consultancyId: branchActive.consultancyId || consultancyId,
          testId: branchActive.testId,
          title: branchActive.title,
          launchedAt: branchActive.launchedAt,
          isFullMock: branchActive.isFullMock,
          candidate: matched?.currentCandidate
        };
      }

      // If consultancyId was provided and neither station nor branch has an active test:
      return null;
    }

    // Otherwise scan all registered consultancies
    const allConsultancies = this.getConsultancies();
    for (const c of allConsultancies) {
      const branchActive = this.getActiveLaunchedTest(c.id);
      const maxStopped = this.getStoppedTimestamp(c.id);
      const stations = this.getStations(c.id);
      const matched = stations.find((s) => s.id === stationIdentifier || this.normalizeStationName(s.name) === norm);
      if (matched && matched.assignedTestId && (matched.status === 'assigned' || matched.status === 'in_progress')) {
        const sTime = new Date(matched.lastHeartbeat || 0).getTime();
        if (maxStopped && maxStopped >= sTime) {
          continue;
        }
        const stationAssignment = {
          consultancyId: c.id,
          testId: matched.assignedTestId,
          title: matched.testTitle || matched.assignedTestId,
          module: matched.module,
          launchedAt: matched.lastHeartbeat || new Date().toISOString(),
          candidate: matched.currentCandidate,
          isFullMock: matched.assignedTestId.includes('full')
        };
        if (branchActive) {
          const bTime = new Date(branchActive.launchedAt || 0).getTime();
          const sTime = new Date(stationAssignment.launchedAt || 0).getTime();
          if (bTime > sTime) {
            return {
              consultancyId: branchActive.consultancyId || c.id,
              testId: branchActive.testId,
              title: branchActive.title,
              launchedAt: branchActive.launchedAt,
              isFullMock: branchActive.isFullMock,
              candidate: matched.currentCandidate
            };
          }
        }
        return stationAssignment;
      }
      if (matched && branchActive) {
        return {
          consultancyId: branchActive.consultancyId || c.id,
          testId: branchActive.testId,
          title: branchActive.title,
          launchedAt: branchActive.launchedAt,
          isFullMock: branchActive.isFullMock,
          candidate: matched.currentCandidate
        };
      }
    }

    return null;
  }

  // --- BRANCH ACTIVE LAUNCHED TEST (FOR ALL STUDENT TERMINALS) ---
  public static getStoppedTimestamp(consultancyId?: string): number {
    if (!consultancyId) return 0;
    try {
      const c = this.getConsultancyById(consultancyId) || this.getConsultancyByBranchCode(consultancyId);
      const cids = [consultancyId];
      if (c && c.id && !cids.includes(c.id)) cids.push(c.id);
      if (c && c.branchCode && !cids.includes(c.branchCode)) cids.push(c.branchCode);

      let maxTime = 0;
      for (const id of cids) {
        const val = Number(localStorage.getItem(`ielts_stopped_test_${id}`) || 0);
        if (val > maxTime) maxTime = val;
      }
      return maxTime;
    } catch {
      return 0;
    }
  }

  public static getActiveBatchName(consultancyId?: string): string | null {
    if (!consultancyId) return null;
    const launched = this.getActiveLaunchedTest(consultancyId);
    if (launched?.sessionName) return launched.sessionName;
    const direct = localStorage.getItem(`ielts_batch_name_${consultancyId}`);
    return direct || null;
  }

  public static setActiveBatchName(consultancyId: string, name?: string): void {
    if (!consultancyId) return;
    if (name && name.trim()) {
      localStorage.setItem(`ielts_batch_name_${consultancyId}`, name.trim());
    } else {
      localStorage.removeItem(`ielts_batch_name_${consultancyId}`);
    }
  }

  public static getActiveLaunchedTest(consultancyId?: string): {
    consultancyId?: string;
    testId: string;
    title: string;
    sessionName?: string;
    launchedAt: string;
    isFullMock?: boolean;
  } | null {
    if (!consultancyId) {
      return null;
    }

    const c = this.getConsultancyById(consultancyId) || this.getConsultancyByBranchCode(consultancyId);
    const cids = [consultancyId];
    if (c && c.id && !cids.includes(c.id)) cids.push(c.id);
    if (c && c.branchCode && !cids.includes(c.branchCode)) cids.push(c.branchCode);

    const maxStopped = this.getStoppedTimestamp(consultancyId);

    for (const cid of cids) {
      const raw = localStorage.getItem(`ielts_launched_test_${cid}`);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.testId) {
            const launchTime = parsed.launchedAt ? new Date(parsed.launchedAt).getTime() : 0;
            if (maxStopped && maxStopped >= launchTime) {
              // Already stopped by admin! Purge stale key
              localStorage.removeItem(`ielts_launched_test_${cid}`);
            } else {
              return parsed;
            }
          }
        } catch {}
      }
    }
    // Never fall back to another consultancy's test!
    return null;
  }

  public static launchTestToBranch(
    consultancyId: string,
    testId: string | null,
    title?: string,
    isFullMock?: boolean,
    sessionName?: string
  ): void {
    const c = this.getConsultancyById(consultancyId) || this.getConsultancyByBranchCode(consultancyId);
    const targetCids = [consultancyId];
    if (c && c.id && !targetCids.includes(c.id)) targetCids.push(c.id);
    if (c && c.branchCode && !targetCids.includes(c.branchCode)) targetCids.push(c.branchCode);

    if (!testId) {
      const stopTime = Date.now();
      for (const cid of targetCids) {
        localStorage.setItem(`ielts_stopped_test_${cid}`, String(stopTime));
        localStorage.removeItem(`ielts_launched_test_${cid}`);
      }

      try {
        const latestRaw = localStorage.getItem('ielts_latest_launched_test');
        if (latestRaw) {
          const parsed = JSON.parse(latestRaw);
          if (!parsed?.consultancyId || targetCids.includes(parsed.consultancyId)) {
            localStorage.removeItem('ielts_latest_launched_test');
          }
        }
      } catch {
        localStorage.removeItem('ielts_latest_launched_test');
      }

      const sbCh = this.getSupabaseChannel();
      if (sbCh) {
        try {
          sbCh.untrack();
        } catch {}
      }

      // Also reset stations that were assigned to the stopped session
      for (const cid of targetCids) {
        try {
          const stations = this.getStations(cid);
          let changed = false;
          for (const st of stations) {
            if (st.assignedTestId || st.status === 'assigned' || st.status === 'in_progress' || st.status === 'paused') {
              st.status = 'idle';
              delete st.assignedTestId;
              delete st.currentCandidate;
              delete st.testTitle;
              delete st.module;
              delete st.isFullMock;
              delete st.currentQuestion;
              delete st.totalQuestions;
              delete st.answeredCount;
              delete st.remainingSeconds;
              st.lastHeartbeat = new Date().toISOString();
              changed = true;
            }
          }
          if (changed) {
            const aliases = this.getConsultancyAliases(cid);
            const serialized = JSON.stringify(stations);
            for (const key of aliases) {
              localStorage.setItem(`ielts_stations_${key}`, serialized);
            }
          }
        } catch {}
      }

      this.broadcast('BRANCH_TEST_LAUNCHED', { consultancyId, testId: null, stoppedAt: stopTime });
      this.broadcast('STATION_COMMAND', { consultancyId, command: 'END_TEST', stoppedAt: stopTime });
      this.broadcast('ADMIN_FORCE_RESET_TEST', { consultancyId, stoppedAt: stopTime });
      return;
    }

    // Launching new test: clear any previous stop tombstones!
    for (const cid of targetCids) {
      localStorage.removeItem(`ielts_stopped_test_${cid}`);
    }

    if (sessionName) {
      this.setActiveBatchName(consultancyId, sessionName);
    } else {
      this.setActiveBatchName(consultancyId, undefined);
    }

    const data = {
      consultancyId: c?.id || consultancyId,
      testId,
      title: title || testId,
      sessionName: sessionName || undefined,
      launchedAt: new Date().toISOString(),
      isFullMock: isFullMock ?? testId.includes('full')
    };

    for (const cid of targetCids) {
      localStorage.setItem(`ielts_launched_test_${cid}`, JSON.stringify(data));
    }
    localStorage.setItem('ielts_latest_launched_test', JSON.stringify(data));

    // Also align lab stations in this consultancy so their assigned tests match the new launch
    for (const cid of targetCids) {
      try {
        const stations = this.getStations(cid);
        let changed = false;
        for (const st of stations) {
          if (st.status === 'idle' || st.status === 'assigned') {
            st.assignedTestId = testId;
            st.testTitle = title || testId;
            st.status = 'assigned';
            st.lastHeartbeat = data.launchedAt;
            changed = true;
          }
        }
        if (changed) {
          localStorage.setItem(`ielts_stations_${cid}`, JSON.stringify(stations));
        }
      } catch {}
    }

    this.broadcast('BRANCH_TEST_LAUNCHED', data);
    this.broadcast('STATION_COMMAND', {
      consultancyId: data.consultancyId,
      command: 'START_TEST',
      testId,
      isFullMock: data.isFullMock,
      title: data.title
    });
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
    const list = this.getStations(consultancyId);
    const norm = this.normalizeStationName(stationId);
    const existingIdx = list.findIndex(
      (s) => s.id === stationId || this.normalizeStationName(s.name) === norm
    );
    if (existingIdx >= 0) {
      const targetName = list[existingIdx].name;
      list[existingIdx] = {
        ...list[existingIdx],
        status: 'idle',
        lastHeartbeat: new Date().toISOString()
      };
      delete list[existingIdx].assignedTestId;
      delete list[existingIdx].testTitle;
      delete list[existingIdx].module;
      delete list[existingIdx].isFullMock;
      delete list[existingIdx].currentCandidate;
      delete list[existingIdx].currentQuestion;
      delete list[existingIdx].totalQuestions;
      delete list[existingIdx].answeredCount;
      delete list[existingIdx].remainingSeconds;

      const aliases = this.getConsultancyAliases(consultancyId);
      const serialized = JSON.stringify(list);
      for (const key of aliases) {
        localStorage.setItem(`ielts_stations_${key}`, serialized);
      }
      this.broadcast('STATION_HEARTBEAT', list[existingIdx]);
      this.broadcast('STATION_UPDATED', list[existingIdx]);
      this.broadcast('STATION_COMMAND', { stationId, stationName: targetName, consultancyId, command: 'RESET_STATION' });
      this.broadcast('STATION_COMMAND', { stationId, stationName: targetName, consultancyId, command: 'END_TEST' });
    }
  }

  // --- CANDIDATE STUDENTS DIRECTORY ---
  public static getStudents(consultancyId: string): ConsultancyStudent[] {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);

    const studentMap = new Map<string, ConsultancyStudent>();
    let foundRaw = false;

    for (const key of aliases) {
      const raw = localStorage.getItem(`ielts_students_${key}`);
      if (raw) {
        foundRaw = true;
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            parsed.forEach((s: ConsultancyStudent) => {
              const uKey = s.candidateNumber || s.id;
              if (!studentMap.has(uKey)) {
                studentMap.set(uKey, { ...s, consultancyId: canonical });
              }
            });
          }
        } catch {}
      }
    }

    if (!foundRaw || studentMap.size === 0) {
      if (canonical === 'apex-global') {
        localStorage.setItem(`ielts_students_${canonical}`, JSON.stringify(DEFAULT_STUDENTS));
        return DEFAULT_STUDENTS;
      }
      return [];
    }

    const merged = Array.from(studentMap.values());
    const serialized = JSON.stringify(merged);
    for (const key of aliases) {
      localStorage.setItem(`ielts_students_${key}`, serialized);
    }

    return merged;
  }

  public static saveStudent(student: ConsultancyStudent): void {
    const canonical = this.getCanonicalConsultancyId(student.consultancyId);
    const aliases = this.getConsultancyAliases(student.consultancyId);
    const list = this.getStudents(canonical);
    const existingIdx = list.findIndex(
      (s) => s.id === student.id || s.candidateNumber === student.candidateNumber
    );
    const cleanStd = { ...student, consultancyId: canonical };
    if (existingIdx >= 0) {
      list[existingIdx] = cleanStd;
    } else {
      list.unshift(cleanStd);
    }
    const serialized = JSON.stringify(list);
    for (const key of aliases) {
      localStorage.setItem(`ielts_students_${key}`, serialized);
    }
    this.broadcast('STUDENT_UPDATED', { consultancyId: canonical, student: cleanStd });
  }

  public static deleteStudent(consultancyId: string, studentId: string, cascadeDeleteData: boolean = false): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getStudents(canonical);
    const targetStudent = list.find((s) => s.id === studentId || s.candidateNumber === studentId);
    const updated = list.filter((s) => s.id !== studentId && s.candidateNumber !== studentId);
    const serialized = JSON.stringify(updated);
    for (const key of aliases) {
      localStorage.setItem(`ielts_students_${key}`, serialized);
    }

    if (cascadeDeleteData && targetStudent) {
      const candNum = targetStudent.candidateNumber;
      // Delete results
      const results = this.getResults(canonical);
      const remainingResults = results.filter((r) => r.candidateId !== candNum);
      const resSerialized = JSON.stringify(remainingResults);
      for (const key of aliases) {
        localStorage.setItem(`ielts_results_${key}`, resSerialized);
      }
      // Delete AI reports (QA-03)
      this.deleteReportsForStudent(canonical, candNum);
    }

    // Also reset any workstation currently showing this deleted candidate
    try {
      const candNum = targetStudent?.candidateNumber || studentId;
      const candName = targetStudent?.fullName?.trim().toLowerCase();
      const stations = this.getStations(canonical);
      let stationsChanged = false;
      stations.forEach((st) => {
        const matchesId = st.currentCandidate?.candidateId === candNum || st.currentCandidate?.candidateId === studentId;
        const matchesName = candName && st.currentCandidate?.name?.trim().toLowerCase() === candName;
        if (matchesId || matchesName) {
          st.status = 'idle';
          delete st.currentCandidate;
          delete st.assignedTestId;
          delete st.testTitle;
          delete st.module;
          delete st.timeSpentSeconds;
          delete st.remainingSeconds;
          delete st.answeredCount;
          stationsChanged = true;
        }
      });
      if (stationsChanged) {
        const serializedSt = JSON.stringify(stations);
        for (const key of aliases) {
          localStorage.setItem(`ielts_stations_${key}`, serializedSt);
        }
        this.broadcast('STATION_UPDATED', { consultancyId: canonical });
      }
    } catch {}

    this.broadcast('STUDENT_UPDATED', { consultancyId: canonical, studentId });
  }

  private static upsertStudentForResult(
    students: ConsultancyStudent[],
    consultancyId: string,
    candidateNumber: string,
    result: TestResult,
    candidateName?: string
  ): ConsultancyStudent {
    const cleanName = candidateName?.trim() || result.candidateName?.trim() || 'Candidate';
    let student = students.find(
      (s) =>
        s.candidateNumber === candidateNumber ||
        (cleanName && s.fullName.toLowerCase() === cleanName.toLowerCase())
    );
    if (student) {
      if (!student.latestResultId || student.latestResultId !== result.testId) {
        student.testsCompletedCount = (student.testsCompletedCount || 0) + 1;
        student.highestBand = Math.max(student.highestBand || 0, result.bandScore);
        student.averageBand = Number(
          (((student.averageBand || result.bandScore) * (student.testsCompletedCount - 1) + result.bandScore) /
            student.testsCompletedCount).toFixed(1)
        );
        student.latestResultId = result.testId;
      }
      if (result.targetBand && (!student.targetBand || student.targetBand === 0)) {
        student.targetBand = result.targetBand;
      }
    } else {
      student = {
        id: 'std-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5),
        consultancyId,
        candidateNumber: candidateNumber || '00' + Math.floor(1000 + Math.random() * 9000),
        fullName: cleanName,
        email: '',
        phone: '',
        targetBand: result.targetBand || 0,
        enrolledDate: new Date().toISOString().split('T')[0],
        testsCompletedCount: 1,
        highestBand: result.bandScore,
        averageBand: result.bandScore,
        latestResultId: result.testId
      };
      students.unshift(student);
    }
    return student;
  }

  public static recordStudentTestResult(
    consultancyId: string,
    candidateNumber: string,
    result: TestResult,
    candidateName?: string
  ): void {
    const students = this.getStudents(consultancyId);
    const student = this.upsertStudentForResult(students, consultancyId, candidateNumber, result, candidateName);
    this.saveStudent(student);
    this.broadcast('STUDENT_UPDATED', { consultancyId, candidateNumber, result, candidateName });
  }

  // --- CONSULTANCY ALL TEST RESULTS DIRECTORY ---
  public static getResults(consultancyId: string): TestResult[] {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);

    const resultMap = new Map<string, TestResult>();
    let foundRaw = false;

    for (const key of aliases) {
      const raw = localStorage.getItem(`ielts_results_${key}`);
      if (raw) {
        foundRaw = true;
        try {
          const parsed: TestResult[] = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            parsed.forEach((r) => {
              const uniqueKey = `${r.testId}-${r.candidateId || ''}-${r.completedAt || ''}`;
              if (!resultMap.has(uniqueKey)) {
                resultMap.set(uniqueKey, { ...r, consultancyId: canonical });
              }
            });
          }
        } catch {}
      }
    }

    if (!foundRaw) {
      if (canonical === 'apex-global') {
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
        const serialized = JSON.stringify(defaultResults);
        for (const key of aliases) {
          localStorage.setItem(`ielts_results_${key}`, serialized);
        }
        return defaultResults;
      }
      return [];
    }

    if (resultMap.size === 0) {
      return [];
    }

    const merged = Array.from(resultMap.values()).sort(
      (a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime()
    );

    const serialized = JSON.stringify(merged);
    for (const key of aliases) {
      localStorage.setItem(`ielts_results_${key}`, serialized);
    }

    return merged;
  }

  public static saveTestResult(consultancyId: string, result: TestResult): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);
    if (result.isPublished === undefined) {
      result.isPublished = false;
    }
    const cleanRes = { ...result, consultancyId: canonical };
    const existingIdx = list.findIndex(
      (r) =>
        r.testId === cleanRes.testId &&
        r.candidateId === cleanRes.candidateId &&
        r.completedAt === cleanRes.completedAt
    );
    if (existingIdx >= 0) {
      list[existingIdx] = cleanRes;
    } else {
      // Check if this candidate has an existing placeholder result from station recovery that should be upgraded
      const hasRealAnswers = cleanRes.answers && Object.keys(cleanRes.answers).length > 0;
      const isWriting = cleanRes.module === 'writing' || !!cleanRes.writingSubmission;
      const placeholderIdx = list.findIndex(
        (r) =>
          (r.candidateId === cleanRes.candidateId ||
            (r.candidateName && cleanRes.candidateName && r.candidateName.trim().toLowerCase() === cleanRes.candidateName.trim().toLowerCase())) &&
          r.testId === 'cambridge-16-test-1-reading' &&
          r.bandScore === 7.0 &&
          Object.keys(r.answers || {}).length === 0 &&
          (hasRealAnswers || isWriting || cleanRes.testId !== 'cambridge-16-test-1-reading' || cleanRes.bandScore !== 7.0)
      );
      if (placeholderIdx >= 0) {
        list[placeholderIdx] = cleanRes;
      } else {
        list.unshift(cleanRes);
      }
      this.consumeCredit(canonical);
    }
    const serialized = JSON.stringify(list);
    for (const key of aliases) {
      localStorage.setItem(`ielts_results_${key}`, serialized);
    }

    // Automatically sync student candidate roster
    try {
      const students = this.getStudents(canonical);
      this.upsertStudentForResult(
        students,
        canonical,
        cleanRes.candidateId || '00' + Math.floor(1000 + Math.random() * 9000),
        cleanRes,
        cleanRes.candidateName
      );
      const stdSerialized = JSON.stringify(students);
      for (const key of aliases) {
        localStorage.setItem(`ielts_students_${key}`, stdSerialized);
      }
    } catch {}

    this.broadcast('RESULT_ADDED', { consultancyId: canonical, result: cleanRes });
  }

  public static consumeCredit(consultancyId: string, count: number = 1): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const list = this.getConsultancies();
    const idx = list.findIndex(
      (c) =>
        c.id.toLowerCase() === canonical.toLowerCase() ||
        (c.branchCode && c.branchCode.toLowerCase() === canonical.toLowerCase())
    );
    if (idx >= 0) {
      const current = list[idx];
      current.creditsUsed = (current.creditsUsed || 0) + count;
      this.saveConsultancy(current);
    }
  }

  // --- EDIT / ADJUST CANDIDATE TEST RESULT (CONSULTANCY ADMIN) ---
  public static updateTestResult(
    consultancyId: string,
    targetTestId: string,
    targetCandidateId: string,
    targetCompletedAt: string,
    updates: Partial<TestResult>
  ): boolean {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);

    const idx = list.findIndex(
      (r) =>
        (r.testId === targetTestId && r.candidateId === targetCandidateId && r.completedAt === targetCompletedAt) ||
        (r.candidateId === targetCandidateId && (!targetCompletedAt || r.completedAt === targetCompletedAt))
    );

    if (idx < 0) return false;

    const old = list[idx];
    const updated: TestResult = {
      ...old,
      ...updates,
      consultancyId: canonical
    };

    // If testId changed, recalculate book and testNumber
    if (updates.testId && updates.testId !== old.testId) {
      const match = updates.testId.match(/cambridge-(\d+)-test-(\d+)/);
      if (match) {
        updated.book = parseInt(match[1], 10);
        updated.testNumber = parseInt(match[2], 10);
      }
      if (!updates.module) {
        updated.module = updates.testId.includes('writing')
          ? 'writing'
          : updates.testId.includes('listening')
          ? 'listening'
          : 'reading';
      }
    }

    list[idx] = updated;
    const serialized = JSON.stringify(list);
    for (const key of aliases) {
      localStorage.setItem(`ielts_results_${key}`, serialized);
    }

    // Update candidate student stats in roster
    try {
      const students = this.getStudents(canonical);
      this.upsertStudentForResult(
        students,
        canonical,
        updated.candidateId || targetCandidateId,
        updated,
        updated.candidateName
      );
      const stdSerialized = JSON.stringify(students);
      for (const key of aliases) {
        localStorage.setItem(`ielts_students_${key}`, stdSerialized);
      }
    } catch {}

    // Update AI report archive if present
    try {
      const reports = this.getReports(canonical);
      const rIdx = reports.findIndex(
        (rep) => rep.candidateId === targetCandidateId && (!targetCompletedAt || rep.completedAt === targetCompletedAt)
      );
      if (rIdx >= 0) {
        reports[rIdx] = {
          ...reports[rIdx],
          studentName: updated.candidateName || reports[rIdx].studentName,
          testId: updated.testId,
          testTitle: `Cambridge ${updated.book || 16} Test ${updated.testNumber || 1} (${updated.module})`,
          module: updated.module,
          bandScore: updated.bandScore,
          correctCount: updated.correctCount,
          totalQuestions: updated.totalQuestions
        };
        const repSerialized = JSON.stringify(reports);
        for (const key of aliases) {
          localStorage.setItem(`ielts_reports_${key}`, repSerialized);
        }
      }
    } catch {}

    this.broadcast('RESULT_UPDATED', { consultancyId: canonical, result: updated });
    return true;
  }

  // --- PUBLISH / RELEASE TEST RESULTS (CONSULTANCY ADMIN) ---
  public static publishTestResult(consultancyId: string, testId: string, candidateId?: string, completedAt?: string): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);
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
      const serialized = JSON.stringify(list);
      for (const key of aliases) {
        localStorage.setItem(`ielts_results_${key}`, serialized);
      }
      this.broadcast('RESULT_PUBLISHED', { consultancyId: canonical, testId, candidateId });
    }
  }

  public static unpublishTestResult(consultancyId: string, testId: string, candidateId?: string, completedAt?: string): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);
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
      const serialized = JSON.stringify(list);
      for (const key of aliases) {
        localStorage.setItem(`ielts_results_${key}`, serialized);
      }
      this.broadcast('RESULT_UNPUBLISHED', { consultancyId: canonical, testId, candidateId });
    }
  }

  public static publishAllResults(consultancyId: string): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);
    const now = new Date().toISOString();
    for (const item of list) {
      item.isPublished = true;
      if (!item.publishedAt) {
        item.publishedAt = now;
      }
    }
    const serialized = JSON.stringify(list);
    for (const key of aliases) {
      localStorage.setItem(`ielts_results_${key}`, serialized);
    }
    this.broadcast('ALL_RESULTS_PUBLISHED', { consultancyId: canonical });
  }

  // Delete a specific test result
  public static deleteTestResult(
    consultancyId: string,
    testId: string,
    candidateId?: string,
    completedAt?: string
  ): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);
    const updated = list.filter((r) => {
      const matchTest = r.testId === testId;
      const matchCand = !candidateId || r.candidateId === candidateId;
      const matchTime = !completedAt || r.completedAt === completedAt;
      return !(matchTest && matchCand && matchTime);
    });

    const serialized = JSON.stringify(updated);
    for (const key of aliases) {
      localStorage.setItem(`ielts_results_${key}`, serialized);
    }

    // Also remove from global past results if present
    try {
      const rawPast = localStorage.getItem('ielts_mock_past_results');
      if (rawPast) {
        const pastList: TestResult[] = JSON.parse(rawPast);
        const filteredPast = pastList.filter((r) => {
          const matchTest = r.testId === testId;
          const matchCand = !candidateId || r.candidateId === candidateId;
          const matchTime = !completedAt || r.completedAt === completedAt;
          return !(matchTest && matchCand && matchTime);
        });
        localStorage.setItem('ielts_mock_past_results', JSON.stringify(filteredPast));
      }
    } catch {}

    // Also remove matching AI report if present (QA-03)
    try {
      const reports = this.getReports(canonical);
      const filteredReports = reports.filter((rep) => {
        const matchTest = !testId || rep.testId === testId;
        const matchCand = !candidateId || rep.candidateId === candidateId;
        const matchTime = !completedAt || rep.completedAt === completedAt;
        return !(matchTest && matchCand && matchTime);
      });
      const repSerialized = JSON.stringify(filteredReports);
      for (const key of aliases) {
        localStorage.setItem(`ielts_reports_${key}`, repSerialized);
      }
    } catch {}

    // Recalculate student candidate stats if candidateId is provided (QA-03)
    if (candidateId) {
      try {
        const students = this.getStudents(canonical);
        const std = students.find((s) => s.candidateNumber === candidateId || s.id === candidateId);
        if (std) {
          const remainingForCand = updated.filter((r) => r.candidateId === candidateId);
          std.testsCompletedCount = remainingForCand.length;
          if (remainingForCand.length > 0) {
            const bands = remainingForCand.map((r) => r.bandScore || 0);
            std.highestBand = Math.max(...bands);
            std.averageBand = Number((bands.reduce((a, b) => a + b, 0) / bands.length).toFixed(1));
            std.latestResultId = remainingForCand[0].testId;
          } else {
            std.highestBand = 0;
            std.averageBand = 0;
            delete std.latestResultId;
          }
          const stdSerialized = JSON.stringify(students);
          for (const key of aliases) {
            localStorage.setItem(`ielts_students_${key}`, stdSerialized);
          }
          this.broadcast('STUDENT_UPDATED', { consultancyId: canonical, candidateId });
        }
      } catch {}
    }

    // Also reset any station that was displaying this candidate or result as submitted
    try {
      const stations = this.getStations(canonical);
      let stationsChanged = false;
      stations.forEach((st) => {
        if (st.status === 'submitted') {
          const matchCand = candidateId && st.currentCandidate?.candidateId === candidateId;
          const matchTest = st.assignedTestId === testId;
          if (matchCand || (!candidateId && matchTest)) {
            st.status = 'idle';
            delete st.currentCandidate;
            delete st.assignedTestId;
            delete st.testTitle;
            delete st.module;
            delete st.timeSpentSeconds;
            delete st.remainingSeconds;
            delete st.answeredCount;
            stationsChanged = true;
          }
        }
      });
      if (stationsChanged) {
        const serializedSt = JSON.stringify(stations);
        for (const key of aliases) {
          localStorage.setItem(`ielts_stations_${key}`, serializedSt);
        }
        this.broadcast('STATION_UPDATED', { consultancyId: canonical });
      }
    } catch {}

    this.broadcast('RESULT_DELETED', { consultancyId: canonical, testId, candidateId, completedAt });
  }

  // Clear all test results for a consultancy
  public static clearAllResults(consultancyId: string): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    for (const key of aliases) {
      localStorage.setItem(`ielts_results_${key}`, JSON.stringify([]));
      localStorage.setItem(`ielts_reports_${key}`, JSON.stringify([]));
    }
    // Also reset candidate statistics
    try {
      const students = this.getStudents(canonical);
      students.forEach((s) => {
        s.testsCompletedCount = 0;
        s.highestBand = 0;
        s.averageBand = 0;
        delete s.latestResultId;
      });
      const stdSerialized = JSON.stringify(students);
      for (const key of aliases) {
        localStorage.setItem(`ielts_students_${key}`, stdSerialized);
      }
    } catch {}
    this.broadcast('ALL_RESULTS_CLEARED', { consultancyId: canonical });
  }

  public static deleteReport(
    consultancyId: string,
    testId?: string,
    candidateId?: string,
    completedAt?: string
  ): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getReports(canonical);
    const updated = list.filter((r) => {
      const matchTest = !testId || r.testId === testId;
      const matchCand = !candidateId || r.candidateId === candidateId;
      const matchTime = !completedAt || r.completedAt === completedAt;
      return !(matchTest && matchCand && matchTime);
    });
    const serialized = JSON.stringify(updated);
    for (const key of aliases) {
      localStorage.setItem(`ielts_reports_${key}`, serialized);
    }
    this.broadcast('REPORT_DELETED', { consultancyId: canonical, testId, candidateId, completedAt });
  }

  public static deleteReportsForStudent(consultancyId: string, candidateId: string): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getReports(canonical);
    const updated = list.filter((r) => r.candidateId !== candidateId);
    const serialized = JSON.stringify(updated);
    for (const key of aliases) {
      localStorage.setItem(`ielts_reports_${key}`, serialized);
    }
    this.broadcast('REPORTS_CLEARED_FOR_STUDENT', { consultancyId: canonical, candidateId });
  }

  // --- LAB WORKSTATION TELEMETRY & SUBMISSION SYNC ENGINE ---
  public static requestStationSync(consultancyId: string): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    this.broadcast('REQUEST_STATION_RESULTS', {
      consultancyId: canonical,
      requestedAt: new Date().toISOString()
    });
  }

  public static pushLocalResultsToCloud(consultancyId?: string): number {
    if (typeof window === 'undefined') return 0;
    try {
      const canonical = this.getCanonicalConsultancyId(consultancyId);
      const aliases = this.getConsultancyAliases(consultancyId || canonical);

      const resultMap = new Map<string, TestResult>();

      // 1. Check all consultancy keys
      for (const k of aliases) {
        const raw = localStorage.getItem(`ielts_results_${k}`);
        if (raw) {
          try {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr)) {
              arr.forEach((r: TestResult) => {
                const uid = `${r.testId}-${r.candidateId || ''}-${r.completedAt || ''}`;
                if (!resultMap.has(uid)) {
                  resultMap.set(uid, { ...r, consultancyId: canonical });
                }
              });
            }
          } catch {}
        }
      }

      // 2. Check ielts_mock_past_results
      const pastRaw = localStorage.getItem('ielts_mock_past_results');
      if (pastRaw) {
        try {
          const arr = JSON.parse(pastRaw);
          if (Array.isArray(arr)) {
            arr.forEach((r: TestResult) => {
              const uid = `${r.testId}-${r.candidateId || ''}-${r.completedAt || ''}`;
              if (!resultMap.has(uid)) {
                resultMap.set(uid, { ...r, consultancyId: canonical });
              }
            });
          }
        } catch {}
      }

      const results = Array.from(resultMap.values());
      results.forEach((res) => {
        this.broadcast('RESULT_ADDED', {
          consultancyId: canonical,
          result: res
        });
        if (res.candidateId || res.candidateName) {
          this.broadcast('STUDENT_UPDATED', {
            consultancyId: canonical,
            candidateNumber: res.candidateId,
            result: res,
            candidateName: res.candidateName
          });
        }
      });

      // 3. Gather AI Reports
      for (const k of aliases) {
        const repRaw = localStorage.getItem(`ielts_reports_${k}`);
        if (repRaw) {
          try {
            const repArr = JSON.parse(repRaw);
            if (Array.isArray(repArr)) {
              repArr.forEach((rep) => {
                this.broadcast('REPORT_ADDED', {
                  consultancyId: canonical,
                  report: { ...rep, consultancyId: canonical }
                });
              });
            }
          } catch {}
        }
      }

      return results.length;
    } catch {
      return 0;
    }
  }

  // Auto-reconcile candidates recorded from station telemetry into candidate students roster
  public static reconcileCandidatesFromStations(consultancyId: string): {
    reconciledCount: number;
    reconciledCandidates: { name: string; candidateId: string; stationName: string }[];
  } {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const stations = this.getStations(canonical);
    const students = this.getStudents(canonical);
    const aliases = this.getConsultancyAliases(canonical);

    const reconciled: { name: string; candidateId: string; stationName: string }[] = [];

    stations.forEach((st) => {
      if (st.currentCandidate?.name) {
        const name = st.currentCandidate.name.trim();
        const candId = st.currentCandidate.candidateId || '00' + Math.floor(1000 + Math.random() * 9000);

        let student = students.find(
          (s) => s.candidateNumber === candId || s.fullName.toLowerCase() === name.toLowerCase()
        );

        if (!student) {
          const candResults = this.getResults(canonical).filter(
            (r) => r.candidateId === candId || (r.candidateName && r.candidateName.toLowerCase() === name.toLowerCase())
          );
          const testsCompletedCount = candResults.length;
          const highestBand = testsCompletedCount > 0
            ? Math.max(...candResults.map((r) => r.bandScore || 0))
            : (st.currentCandidate.targetBand || 0);
          const averageBand = testsCompletedCount > 0
            ? Math.round((candResults.reduce((a, b) => a + (b.bandScore || 0), 0) / testsCompletedCount) * 10) / 10
            : (st.currentCandidate.targetBand || 0);

          student = {
            id: 'std-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5),
            consultancyId: canonical,
            candidateNumber: candId,
            fullName: name,
            email: '',
            phone: '',
            targetBand: st.currentCandidate.targetBand || 0,
            enrolledDate: new Date().toISOString().split('T')[0],
            testsCompletedCount,
            highestBand,
            averageBand,
            latestResultId: st.assignedTestId || candResults[0]?.testId
          };
          students.unshift(student);
          reconciled.push({ name, candidateId: candId, stationName: st.name });
        }
      }
    });

    if (reconciled.length > 0) {
      const serialized = JSON.stringify(students);
      for (const k of aliases) {
        localStorage.setItem(`ielts_students_${k}`, serialized);
      }
      this.broadcast('STUDENT_UPDATED', { consultancyId: canonical });
    }

    return {
      reconciledCount: reconciled.length,
      reconciledCandidates: reconciled
    };
  }

  // Create or recover a result card directly from station candidate metadata
  public static recordStationSubmissionResult(
    consultancyId: string,
    stationName: string,
    options?: {
      testId?: string;
      bandScore?: number;
      module?: 'reading' | 'listening' | 'writing';
    }
  ): TestResult | null {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const stations = this.getStations(canonical);
    const norm = this.normalizeStationName(stationName);
    const station = stations.find((s) => this.normalizeStationName(s.name) === norm);
    if (!station || !station.currentCandidate) return null;

    const cand = station.currentCandidate;
    const testId = options?.testId || station.assignedTestId || 'cambridge-16-test-1-reading';
    const mod = options?.module || station.module || (testId.includes('writing') ? 'writing' : testId.includes('listening') ? 'listening' : 'reading');
    const isWritingModule = mod === 'writing';
    const finalBand = isWritingModule
      ? (options?.bandScore !== undefined ? options.bandScore : 0)
      : (options?.bandScore !== undefined ? options.bandScore : (cand.targetBand && cand.targetBand >= 4.0 ? cand.targetBand : 7.0));

    const bookMatch = testId.match(/cambridge-(\d+)-test-(\d+)/);
    const book = bookMatch ? parseInt(bookMatch[1], 10) : 16;
    const testNum = bookMatch ? parseInt(bookMatch[2], 10) : 1;

    const consultancy = this.getConsultancyById(canonical);

    const result: TestResult = {
      testId,
      book,
      testNumber: testNum,
      module: mod,
      totalQuestions: isWritingModule ? 2 : 40,
      correctCount: isWritingModule ? 0 : Math.round((finalBand / 9) * 40),
      bandScore: finalBand,
      timeTakenSeconds: mod === 'reading' || mod === 'writing' ? 3540 : 1980,
      completedAt: new Date().toISOString(),
      answers: {},
      candidateName: cand.name,
      candidateId: cand.candidateId,
      stationName: station.name,
      consultancyId: canonical,
      consultancyName: consultancy?.name || 'Educational Consultancy Lab',
      targetBand: cand.targetBand || 0,
      isPublished: false,
      writingSubmission: isWritingModule ? {
        task1Essay: 'Candidate submitted Task 1 response on lab station ' + station.name + ':\n\nThe chart illustrates international student admissions across key institutions from 2015 to 2024. Overall, engineering and computing programs exhibited the most prominent upward trajectory.',
        task1WordCount: 168,
        task2Essay: 'Candidate submitted Task 2 response on lab station ' + station.name + ':\n\nSome argue that digital automation diminishes interpersonal skills, whereas others contend that it streamlines international collaboration. In my view, while reliance on technology introduces communication challenges, structured implementation enhances educational productivity.',
        task2WordCount: 276
        // Bands remain undefined until manual evaluation by examiner
      } : undefined
    };

    this.saveTestResult(canonical, result);
    return result;
  }

  // --- WRITING MODULE EVALUATION & SCORING (CONSULTANCY ADMIN) ---
  public static gradeWritingSubmission(
    consultancyId: string,
    testId: string,
    candidateId: string,
    completedAt: string,
    evaluation: {
      task1Band: number;
      task2Band: number;
      overallWritingBand: number;
      adminFeedback?: string;
      reviewedBy?: string;
    },
    publishImmediately: boolean = false
  ): TestResult | null {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getResults(canonical);
    let updatedResult: TestResult | null = null;
    const now = new Date().toISOString();

    for (const item of list) {
      const matchTest = item.testId === testId;
      const matchCand = !candidateId || item.candidateId === candidateId;
      const matchTime = !completedAt || item.completedAt === completedAt;

      if (matchTest && matchCand && matchTime) {
        if (!item.writingSubmission) {
          item.writingSubmission = {
            task1Essay: '',
            task1WordCount: 0,
            task2Essay: '',
            task2WordCount: 0
          };
        }
        item.writingSubmission.task1Band = evaluation.task1Band;
        item.writingSubmission.task2Band = evaluation.task2Band;
        item.writingSubmission.overallWritingBand = evaluation.overallWritingBand;
        item.writingSubmission.adminFeedback = evaluation.adminFeedback;
        item.writingSubmission.reviewedBy = evaluation.reviewedBy || 'Academic Admin';
        item.writingSubmission.reviewedAt = now;
        item.bandScore = evaluation.overallWritingBand;

        if (publishImmediately) {
          item.isPublished = true;
          item.publishedAt = now;
        }

        updatedResult = item;
        break;
      }
    }

    if (updatedResult) {
      // 1. Save updated results across all branch aliases
      const serialized = JSON.stringify(list);
      for (const key of aliases) {
        localStorage.setItem(`ielts_results_${key}`, serialized);
      }

      // 2. Update global past results if present
      try {
        const rawPast = localStorage.getItem('ielts_mock_past_results');
        if (rawPast) {
          const pastList: TestResult[] = JSON.parse(rawPast);
          const pIdx = pastList.findIndex((r) =>
            r.testId === testId &&
            (!candidateId || r.candidateId === candidateId) &&
            (!completedAt || r.completedAt === completedAt)
          );
          if (pIdx >= 0) {
            pastList[pIdx] = { ...pastList[pIdx], ...updatedResult };
            localStorage.setItem('ielts_mock_past_results', JSON.stringify(pastList));
          }
        }
      } catch {}

      // 3. Update candidate student statistics
      if (candidateId) {
        try {
          const students = this.getStudents(canonical);
          const std = students.find((s) => s.candidateNumber === candidateId || s.id === candidateId);
          if (std) {
            const candResults = list.filter((r) => r.candidateId === candidateId);
            const scoredBands = candResults.map((r) => r.bandScore || 0).filter((b) => b > 0);
            if (scoredBands.length > 0) {
              std.highestBand = Math.max(...scoredBands);
              std.averageBand = Number((scoredBands.reduce((a, b) => a + b, 0) / scoredBands.length).toFixed(1));
            } else {
              std.highestBand = evaluation.overallWritingBand;
              std.averageBand = evaluation.overallWritingBand;
            }
            std.latestResultId = testId;
            const stdSerialized = JSON.stringify(students);
            for (const key of aliases) {
              localStorage.setItem(`ielts_students_${key}`, stdSerialized);
            }
            this.broadcast('STUDENT_UPDATED', {
              consultancyId: canonical,
              candidateNumber: candidateId,
              student: std
            });
          }
        } catch {}
      }

      // 4. Update AI report archive if present
      try {
        const reports = this.getReports(canonical);
        const rIdx = reports.findIndex(
          (rep) => rep.testId === testId && (!candidateId || rep.candidateId === candidateId) && (!completedAt || rep.completedAt === completedAt)
        );
        if (rIdx >= 0) {
          reports[rIdx].bandScore = evaluation.overallWritingBand;
          if (publishImmediately) {
            reports[rIdx].isPublished = true;
          }
          const repSerialized = JSON.stringify(reports);
          for (const key of aliases) {
            localStorage.setItem(`ielts_reports_${key}`, repSerialized);
          }
          this.broadcast('REPORT_UPDATED', {
            consultancyId: canonical,
            report: reports[rIdx]
          });
        }
      } catch {}

      // 5. Broadcast events for live views
      this.broadcast('RESULT_UPDATED', {
        consultancyId: canonical,
        testId,
        candidateId,
        result: updatedResult
      });

      if (publishImmediately) {
        this.broadcast('RESULT_PUBLISHED', {
          consultancyId: canonical,
          testId,
          candidateId
        });
      }
    }

    return updatedResult;
  }

  // Look up candidate results by Candidate Name OR Candidate Number
  public static getCandidateResults(query: string, consultancyId?: string): {
    found: boolean;
    allResults: TestResult[];
    publishedResults: TestResult[];
    pendingResults: TestResult[];
  } {
    const cleanQuery = query.trim().replace(/^#/, '').toLowerCase();
    if (!cleanQuery) {
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
        const idMatch = (r.candidateId || '').trim().toLowerCase() === cleanQuery;
        const nameMatch = (r.candidateName || '').toLowerCase().includes(cleanQuery);
        return idMatch || nameMatch;
      });
      allMatching = allMatching.concat(matched);
    }

    // Also check global past results
    try {
      const rawPast = localStorage.getItem('ielts_mock_past_results');
      if (rawPast) {
        const parsed: TestResult[] = JSON.parse(rawPast);
        for (const pr of parsed) {
          const idMatch = (pr.candidateId || '').trim().toLowerCase() === cleanQuery;
          const nameMatch = (pr.candidateName || '').toLowerCase().includes(cleanQuery);
          if (
            (idMatch || nameMatch) &&
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
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);

    const reportMap = new Map<string, SavedAIReport>();
    let foundRaw = false;

    for (const key of aliases) {
      const raw = localStorage.getItem(`ielts_reports_${key}`);
      if (raw) {
        foundRaw = true;
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            parsed.forEach((r: SavedAIReport) => {
              const uKey = `${r.testId || r.testTitle}-${r.candidateId || ''}-${r.completedAt || ''}`;
              if (!reportMap.has(uKey)) {
                reportMap.set(uKey, { ...r, consultancyId: canonical });
              }
            });
          }
        } catch {}
      }
    }

    if (!foundRaw || reportMap.size === 0) {
      if (canonical === 'apex-global') {
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
        const serialized = JSON.stringify(defaultReports);
        for (const key of aliases) {
          localStorage.setItem(`ielts_reports_${key}`, serialized);
        }
        return defaultReports;
      }
      return [];
    }

    const merged = Array.from(reportMap.values());
    const serialized = JSON.stringify(merged);
    for (const key of aliases) {
      localStorage.setItem(`ielts_reports_${key}`, serialized);
    }

    return merged;
  }

  public static saveReport(consultancyId: string, report: SavedAIReport): void {
    const canonical = this.getCanonicalConsultancyId(consultancyId);
    const aliases = this.getConsultancyAliases(consultancyId);
    const list = this.getReports(canonical);
    const cleanRep = { ...report, consultancyId: canonical };
    const exists = list.some(
      (r) =>
        r.testId === cleanRep.testId &&
        r.candidateId === cleanRep.candidateId &&
        r.completedAt === cleanRep.completedAt
    );
    if (!exists) {
      list.unshift(cleanRep);
    }
    const serialized = JSON.stringify(list);
    for (const key of aliases) {
      localStorage.setItem(`ielts_reports_${key}`, serialized);
    }
    this.broadcast('REPORT_ADDED', { consultancyId: canonical, report: cleanRep });
  }

  // --- AI DIAGNOSTIC ENGINE ---
  public static generateAIDiagnostic(
    result: TestResult,
    studentName: string = 'Candidate',
    customCandidateId?: string,
    customTestTitle?: string
  ): AIDiagnosticReport {
    const band = result.bandScore;
    const target = result.targetBand && result.targetBand > 0 ? result.targetBand : null;
    const bandGap = target !== null ? Number((target - band).toFixed(1)) : null;
    const percent = Math.round((result.correctCount / (result.totalQuestions || 40)) * 100);

    const cefr =
      band >= 8.5
        ? 'C2 - Mastery / Native Operational'
        : band >= 7.0
        ? 'C1 - Effective Operational Proficiency'
        : band >= 5.5
        ? 'B2 - Independent User (High Proficiency)'
        : band >= 4.0
        ? 'B1 - Intermediate User (Threshold)'
        : band >= 3.0
        ? 'A2 - Basic User (Waystage)'
        : band >= 2.0
        ? 'A1 - Breakthrough User'
        : 'Pre-A1 - Non User / Novice';

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
      weaknesses.push('Matching Headings and paragraph summary questions require disciplined time allocation.');
      advice.push('Drill True/False/Not Given questions focusing strictly on distinguishing "False" (contradiction) from "Not Given" (absence of proof).');
    }

    if (result.module === 'listening') {
      strengths.push('Clean spelling accuracy for proper nouns and numeric sequences.');
      weaknesses.push('Part 3 multi-speaker academic dialogue exhibits hesitation during rapid turn-taking.');
      advice.push('Pre-read Question stems during the 30-second silent gaps to predict word classes (nouns vs verbs).');
    } else {
      advice.push('Apply the two-pass reading methodology: 90 seconds structural skim, followed by localized question scanning.');
    }

    const resolvedCandidateId = customCandidateId || result.candidateId || ('00' + Math.floor(1000 + Math.random() * 9000));
    const resolvedTitle =
      customTestTitle ||
      (result as any).testTitle ||
      (result.book && result.testNumber
        ? `Cambridge ${result.book} Test ${result.testNumber} (${result.module === 'reading' ? 'Reading' : result.module === 'writing' ? 'Writing' : 'Listening'})`
        : 'IELTS Mock Examination');

    return {
      studentName,
      candidateId: resolvedCandidateId,
      testTitle: resolvedTitle,
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

  public static sendStationCommand(
    consultancyId: string,
    stationId: string,
    command: string,
    payload?: any
  ): void {
    this.broadcast('STATION_COMMAND', { consultancyId, stationId, command, payload });
  }

  public static broadcastStationCommand(
    consultancyId: string,
    command: string,
    payload?: any
  ): void {
    this.broadcast('STATION_COMMAND', { consultancyId, command, payload });
  }

  public static launchBranchTest(
    consultancyId: string,
    testId: string | null,
    title?: string,
    isFullMock?: boolean,
    sessionName?: string
  ): void {
    this.launchTestToBranch(consultancyId, testId, title, isFullMock, sessionName);
  }

  public static assignStationTest(
    consultancyId: string,
    stationName: string,
    testId: string,
    testTitle?: string,
    studentName?: string,
    candidateId?: string,
    _passport?: string,
    isFullMock?: boolean
  ): void {
    const mod: 'reading' | 'listening' | 'writing' = isFullMock || testId.includes('listening') ? 'listening' : testId.includes('writing') ? 'writing' : 'reading';
    this.assignTestToStation(
      consultancyId,
      stationName,
      testId,
      testTitle || 'Assigned Mock Test',
      mod,
      studentName ? { candidateId: candidateId || '004128', name: studentName } : undefined
    );
  }

  public static createConsultancy(consultancy: Partial<Consultancy> & { id: string; name: string }): Consultancy {
    const full: Consultancy = {
      id: consultancy.id,
      name: consultancy.name,
      branch: consultancy.branch || 'Central',
      adminEmail: consultancy.adminEmail || 'admin@agency.com',
      phone: consultancy.phone || '',
      accessCode: consultancy.accessCode || consultancy.id,
      branchCode: consultancy.branchCode || consultancy.accessCode || consultancy.id,
      examPassword: consultancy.examPassword || '1234',
      adminPassword: consultancy.adminPassword || '1234',
      status: consultancy.status || 'active',
      computerLimit: consultancy.computerLimit || 20,
      testCredits: consultancy.testCredits || 300,
      creditsUsed: consultancy.creditsUsed || 0,
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 365 * 86400000).toISOString(),
    };
    this.saveConsultancy(full);
    return full;
  }

  public static addStudent(consultancyId: string, data: { fullName: string; email?: string; phone?: string; targetBand?: number }): ConsultancyStudent {
    const list = this.getStudents(consultancyId);
    let candNumber = '';
    let tries = 0;
    do {
      candNumber = '00' + Math.floor(1000 + Math.random() * 9000);
      tries++;
    } while (list.some((s) => s.candidateNumber === candNumber) && tries < 20);

    const targetBandVal = data.targetBand !== undefined && data.targetBand !== null && !isNaN(Number(data.targetBand))
      ? Number(data.targetBand)
      : 0;

    const newStudent: ConsultancyStudent = {
      id: 'std-' + Date.now(),
      consultancyId,
      candidateNumber: candNumber,
      fullName: data.fullName,
      email: data.email || '',
      phone: data.phone || '',
      targetBand: targetBandVal,
      enrolledDate: new Date().toISOString().split('T')[0],
      testsCompletedCount: 0,
      highestBand: 0,
      averageBand: 0,
    };
    this.saveStudent(newStudent);
    return newStudent;
  }

  public static updateStudent(consultancyId: string, studentId: string, updates: Partial<ConsultancyStudent>): void {
    const list = this.getStudents(consultancyId);
    const idx = list.findIndex((s) => s.id === studentId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem(`ielts_students_${consultancyId}`, JSON.stringify(list));
      this.broadcast('STUDENT_UPDATED', { consultancyId, student: list[idx] });
    }
  }

  public static updateConsultancy(
    consultancyId: string,
    updates: Partial<Consultancy>
  ): void {
    const existing = this.getConsultancyById(consultancyId);
    if (existing) {
      this.saveConsultancy({ ...existing, ...updates });
    }
  }

  public static setResultPublished(
    consultancyId: string,
    candidateId: string,
    testId: string,
    isPublished: boolean,
    completedAt?: string
  ): void {
    if (isPublished) {
      this.publishTestResult(consultancyId, testId, candidateId, completedAt);
    } else {
      this.unpublishTestResult(consultancyId, testId, candidateId, completedAt);
    }
  }

  public static getAllResultsAcrossConsultancies(): TestResult[] {
    const consultancies = this.getConsultancies();
    const all: TestResult[] = [];
    for (const c of consultancies) {
      all.push(...this.getResults(c.id));
    }
    return all;
  }
}
