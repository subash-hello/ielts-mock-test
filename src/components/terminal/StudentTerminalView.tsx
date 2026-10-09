import React, { useState, useEffect } from 'react';
import {
  Monitor,
  ArrowRight,
  User,
  BookOpen,
  Headphones,
  Clock,
  Layers,
  Sparkles,
  PenTool,
  CheckCircle2,
  Volume2,
  FileCheck,
  Maximize,
  Minimize,
  SlidersHorizontal,
  AlertCircle
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { buildFullMockTests, allFullMockTests, allMockTests } from '../../data/mockTests';

interface StudentTerminalViewProps {
  initialStationName?: string;
  initialConsultancyId?: string;
  tests: IELTSMockTest[];
  onStartExam: (
    test: IELTSMockTest,
    candidate: {
      name: string;
      candidateId: string;
      targetBand: number;
      stationName?: string;
      consultancyId?: string;
    },
    fullMockTest?: FullMockTest
  ) => void;
  onExitTerminal: () => void;
  onOpenLookup?: () => void;
}

export const StudentTerminalView: React.FC<StudentTerminalViewProps> = ({
  initialStationName,
  initialConsultancyId,
  tests,
  onStartExam,
  onExitTerminal,
  onOpenLookup
}) => {
  const [candidateNameInput, setCandidateNameInput] = useState<string>(() => {
    return localStorage.getItem('ielts_candidate_name') || '';
  });

  // Check if consultancy or branch code was deleted/deactivated (BUG-11)
  const isDeleted = (() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    const explicitCid = urlParams.get('cid') || urlParams.get('consultancy');
    const branchFromUrl = urlParams.get('branch') || urlParams.get('access') || urlParams.get('code');
    if (explicitCid && ConsultancyService.isConsultancyDeleted(explicitCid)) return true;
    if (branchFromUrl && ConsultancyService.isConsultancyDeleted(branchFromUrl)) return true;
    return false;
  })();

  // Resolve consultancy strictly prioritizing URL parameters (cid, branch, cname) or initialConsultancyId
  const [consultancy, setConsultancy] = useState<Consultancy | undefined>(() => {
    if (isDeleted) return undefined;

    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const explicitCid = urlParams.get('cid') || urlParams.get('consultancy');
    const branchFromUrl = urlParams.get('branch') || urlParams.get('access') || urlParams.get('code');

    // 1. Try finding by explicit CID in URL
    if (explicitCid) {
      const found = ConsultancyService.getConsultancyById(explicitCid);
      if (found) {
        if (found.branchCode || found.accessCode) {
          localStorage.setItem('ielts_terminal_branch', found.branchCode || found.accessCode);
        }
        return found;
      }
    }

    // 2. Try finding by branch code in URL
    if (branchFromUrl) {
      const found = ConsultancyService.getConsultancyByBranchCode(branchFromUrl);
      if (found) {
        localStorage.setItem('ielts_terminal_branch', found.branchCode || found.accessCode);
        return found;
      }
    }

    // 3. Try initialConsultancyId prop
    if (initialConsultancyId) {
      const found = ConsultancyService.getConsultancyById(initialConsultancyId);
      if (found) return found;
    }

    // 4. Fall back to saved local branch
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ielts_terminal_branch') : null;
    if (saved) {
      const found = ConsultancyService.getConsultancyByBranchCode(saved);
      if (found) return found;
    }

    // 5. Fallback to active consultancies
    const all = ConsultancyService.getConsultancies();
    return all[0];
  });

  const [branchCode, setBranchCode] = useState<string>(() => {
    return consultancy?.branchCode || consultancy?.accessCode || 'APEX-2026';
  });

  // Isolate selected PC station per-tab with sessionStorage, fallback to localStorage
  const [pcNumber, setPcNumber] = useState<string>(() => {
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const fromUrl = urlParams.get('station') || urlParams.get('st') || urlParams.get('pc');
    if (fromUrl) {
      const clean = fromUrl.trim().toUpperCase();
      const formatted = clean.startsWith('PC-') ? clean : `PC-${clean.replace(/^PC/i, '')}`;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ielts_terminal_pc', formatted);
        localStorage.setItem('ielts_terminal_pc', formatted);
      }
      return formatted;
    }
    const sessionSaved = typeof window !== 'undefined' ? sessionStorage.getItem('ielts_terminal_pc') : null;
    if (sessionSaved) return sessionSaved;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ielts_terminal_pc') : null;
    if (saved) return saved;
    if (initialStationName) return initialStationName;
    return 'PC-01';
  });

  const [allConsultancies, setAllConsultancies] = useState<Consultancy[]>(() => ConsultancyService.getConsultancies());

  useEffect(() => {
    ConsultancyService.syncFromBackend().then(() => {
      setAllConsultancies(ConsultancyService.getConsultancies());
    }).catch(() => {});

    const unsub = ConsultancyService.subscribe((event) => {
      if (
        event.type === 'CONSULTANCY_UPDATED' ||
        event.type === 'CONSULTANCY_CREATED' ||
        event.type === 'CONSULTANCY_DELETED' ||
        event.type === 'STORAGE_SYNC'
      ) {
        setAllConsultancies(ConsultancyService.getConsultancies());
      }
    });
    return () => unsub();
  }, []);

  const [loginError, setLoginError] = useState<string | null>(null);

  const [selectedConsultancyId, setSelectedConsultancyId] = useState<string>(() => {
    return consultancy?.id || initialConsultancyId || 'apex-global';
  });

  const [currentStation, setCurrentStation] = useState<LabStation | undefined>(undefined);

  // Phase: Start in connected screen if station already configured, or show friendly setup wizard
  const [phase, setPhase] = useState<'login' | 'connected'>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stationFromUrl = urlParams.get('station') || urlParams.get('st') || urlParams.get('pc');
    const saved = localStorage.getItem('ielts_terminal_branch') && localStorage.getItem('ielts_terminal_pc');
    return stationFromUrl || saved ? 'connected' : 'connected';
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Active test launched by branch admin
  const [activeLaunchedTest, setActiveLaunchedTest] = useState<{
    testId: string;
    title: string;
    launchedAt: string;
    isFullMock?: boolean;
    consultancyId?: string;
  } | null>(() => {
    const activeCid = consultancy?.id;
    if (!activeCid) return null;
    const stationTest = ConsultancyService.getStationAssignedTest(activeCid, pcNumber);
    const branchActive = ConsultancyService.getActiveLaunchedTest(activeCid);

    if (stationTest && branchActive) {
      const sTime = new Date(stationTest.launchedAt || 0).getTime();
      const bTime = new Date(branchActive.launchedAt || 0).getTime();
      return bTime >= sTime ? branchActive : stationTest;
    }
    return stationTest || branchActive;
  });

  // Audio Test Tone generator (440Hz standard)
  const [isSoundTesting, setIsSoundTesting] = useState(false);
  const testAudio = () => {
    if (typeof window === 'undefined') return;
    try {
      setIsSoundTesting(true);
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);

      setTimeout(() => setIsSoundTesting(false), 1200);
    } catch (e) {
      console.error('Audio test failed', e);
      setIsSoundTesting(false);
    }
  };

  // Keep consultancy synced with initialConsultancyId prop
  useEffect(() => {
    if (initialConsultancyId && (!consultancy || consultancy.id !== initialConsultancyId)) {
      const c = ConsultancyService.getConsultancyById(initialConsultancyId);
      if (c) {
        setConsultancy(c);
        setSelectedConsultancyId(c.id);
        const b = c.branchCode || c.accessCode;
        if (b) {
          setBranchCode(b);
          localStorage.setItem('ielts_terminal_branch', b);
        }
      }
    }
  }, [initialConsultancyId]);

  // Sync consultancy when branchCode changes
  useEffect(() => {
    let found = consultancy;
    if (!found || (found.branchCode !== branchCode && found.accessCode !== branchCode)) {
      found = ConsultancyService.getConsultancyByBranchCode(branchCode);
      if (!found) found = ConsultancyService.getConsultancyById(branchCode.toLowerCase());
      if (found) {
        setConsultancy(found);
        setSelectedConsultancyId(found.id);
      }
    }
    if (found) {
      const stationTest = ConsultancyService.getStationAssignedTest(found.id, pcNumber);
      const branchActive = ConsultancyService.getActiveLaunchedTest(found.id);

      let resolved: typeof branchActive = null;
      if (stationTest && branchActive) {
        const sTime = new Date(stationTest.launchedAt || 0).getTime();
        const bTime = new Date(branchActive.launchedAt || 0).getTime();
        resolved = bTime >= sTime ? branchActive : stationTest;
      } else {
        resolved = stationTest || branchActive;
      }
      setActiveLaunchedTest(resolved);

      if (pcNumber) {
        ConsultancyService.addStation(found.id, pcNumber);
        const stations = ConsultancyService.getStations(found.id);
        const normPc = ConsultancyService.normalizeStationName(pcNumber);
        const st = stations.find((s) => ConsultancyService.normalizeStationName(s.name) === normPc);
        setCurrentStation(st);
      }
    }
  }, [branchCode, pcNumber, tests, initialConsultancyId]);

  // Subscribe to live branch launched test & teacher commands & station assignments
  useEffect(() => {
    const syncActiveTest = () => {
      const activeCid = consultancy?.id;
      if (!activeCid) return;
      const stationTest = ConsultancyService.getStationAssignedTest(activeCid, pcNumber);
      const branchActive = ConsultancyService.getActiveLaunchedTest(activeCid);

      let resolved: {
        testId: string;
        title: string;
        launchedAt: string;
        isFullMock?: boolean;
        consultancyId?: string;
        candidate?: { candidateId: string; name: string; targetBand?: number };
      } | null = null;

      if (stationTest && branchActive) {
        const sTime = new Date(stationTest.launchedAt || 0).getTime();
        const bTime = new Date(branchActive.launchedAt || 0).getTime();
        resolved = bTime >= sTime ? branchActive : stationTest;
      } else {
        resolved = stationTest || branchActive;
      }

      if (!stationTest && !branchActive) {
        resolved = null;
      }

      setActiveLaunchedTest(resolved);

      if (resolved?.candidate?.name && !candidateNameInput.trim()) {
        setCandidateNameInput(resolved.candidate.name);
      }
    };

    // Check immediately on mount
    syncActiveTest();

    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (event.type === 'BRANCH_TEST_LAUNCHED') {
        const payload = event.payload;
        // Ignore test events launched for other consultancies
        if (payload?.consultancyId && consultancy?.id && payload.consultancyId !== consultancy.id) {
          return;
        }
        if (payload?.testId) {
          const cid = payload.consultancyId || consultancy?.id;
          const stoppedAt = cid ? ConsultancyService.getStoppedTimestamp(cid) : 0;
          const launchedAt = payload.launchedAt ? new Date(payload.launchedAt).getTime() : 0;
          if (stoppedAt && stoppedAt >= launchedAt) {
            setActiveLaunchedTest(null);
            return;
          }
          setActiveLaunchedTest({
            testId: payload.testId,
            title: payload.title || payload.testId,
            launchedAt: payload.launchedAt || new Date().toISOString(),
            isFullMock: payload.isFullMock,
            consultancyId: payload.consultancyId
          });
        } else {
          // Admin ENDED the test!
          const cid = payload?.consultancyId || consultancy?.id;
          if (cid) {
            try {
              localStorage.setItem(`ielts_stopped_test_${cid}`, String(payload?.stoppedAt || Date.now()));
              localStorage.removeItem(`ielts_launched_test_${cid}`);
            } catch {}
          }
          localStorage.removeItem('ielts_latest_launched_test');
          setActiveLaunchedTest(null);
          setCurrentStation((prev) =>
            prev ? { ...prev, status: 'idle', assignedTestId: undefined, testTitle: undefined } : prev
          );
          syncActiveTest();
        }
      } else if (event.type === 'ADMIN_FORCE_RESET_TEST') {
        const payload = event.payload;
        const cid = payload?.consultancyId || consultancy?.id;
        if (!payload?.consultancyId || !consultancy || payload.consultancyId === consultancy.id) {
          if (cid) {
            try {
              localStorage.setItem(`ielts_stopped_test_${cid}`, String(payload?.stoppedAt || Date.now()));
              localStorage.removeItem(`ielts_launched_test_${cid}`);
            } catch {}
          }
          localStorage.removeItem('ielts_latest_launched_test');
          setActiveLaunchedTest(null);
          setCurrentStation((prev) =>
            prev ? { ...prev, status: 'idle', assignedTestId: undefined, testTitle: undefined } : prev
          );
          syncActiveTest();
        }
      } else if (event.type === 'STATION_COMMAND') {
        const { stationId, stationName, command, consultancyId: cmdCid, stoppedAt } = event.payload || {};
        const cleanPc = ConsultancyService.normalizeStationName(pcNumber);
        const isTargetStation =
          !stationId ||
          ConsultancyService.normalizeStationName(stationId) === cleanPc ||
          (stationName && ConsultancyService.normalizeStationName(stationName) === cleanPc);
        const isTargetBranch = !cmdCid || !consultancy || cmdCid === consultancy.id;

        if (isTargetStation && isTargetBranch) {
          if (command === 'RESET_STATION' || command === 'END_TEST') {
            const cid = cmdCid || consultancy?.id;
            if (cid) {
              try {
                localStorage.setItem(`ielts_stopped_test_${cid}`, String(stoppedAt || Date.now()));
                localStorage.removeItem(`ielts_launched_test_${cid}`);
              } catch {}
            }
            localStorage.removeItem('ielts_latest_launched_test');
            setActiveLaunchedTest(null);
            setCurrentStation((prev) =>
              prev ? { ...prev, status: 'idle', assignedTestId: undefined, testTitle: undefined } : prev
            );
          }
          syncActiveTest();
        }
      } else if (event.type === 'REQUEST_STATION_RESULTS') {
        const targetCid = event.payload?.consultancyId;
        const myCid = ConsultancyService.getCanonicalConsultancyId(consultancy?.id);
        if (!targetCid || targetCid === myCid) {
          ConsultancyService.pushLocalResultsToCloud(myCid);
        }
      } else if (
        event.type === 'STATION_UPDATED' ||
        event.type === 'STORAGE_SYNC' ||
        event.type === 'WINDOW_FOCUSED'
      ) {
        const cleanPc = ConsultancyService.normalizeStationName(pcNumber);
        const payload = event.payload;
        const targetStation = payload?.stationId || payload?.name || payload?.id;
        if (!targetStation || ConsultancyService.normalizeStationName(targetStation) === cleanPc) {
          syncActiveTest();
        }
      }
    });

    // On terminal mount, automatically push any locally stored candidate results to cloud
    if (consultancy?.id) {
      setTimeout(() => {
        ConsultancyService.pushLocalResultsToCloud(consultancy.id);
      }, 500);

      // Query central backend for any active exam broadcast
      ConsultancyService.syncActiveLaunchFromBackend(consultancy.id)
        .then(() => syncActiveTest())
        .catch(() => {});
    }

    // High-frequency responsive fallback interval (200ms) for instant local test appearance
    const interval = setInterval(syncActiveTest, 200);

    // Cross-device/cross-browser polling: poll central backend every 3.5 seconds
    const backendInterval = setInterval(() => {
      if (consultancy?.id) {
        ConsultancyService.syncActiveLaunchFromBackend(consultancy.id)
          .then(() => syncActiveTest())
          .catch(() => {});
      }
    }, 3500);

    return () => {
      unsubscribe();
      clearInterval(interval);
      clearInterval(backendInterval);
    };
  }, [consultancy, currentStation, pcNumber, tests]);

  const handleLaunchExam = (testToRun: IELTSMockTest, fullMock?: FullMockTest) => {
    const cleanPc = pcNumber.trim().toUpperCase();
    const formattedPc = cleanPc.startsWith('PC-') ? cleanPc : `PC-${cleanPc.replace(/^PC/i, '')}`;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ielts_terminal_pc', formattedPc);
      localStorage.setItem('ielts_terminal_pc', formattedPc);
    }

    const enteredName = candidateNameInput.trim();
    if (!enteredName) {
      alert('Please enter your full name before starting the exam.');
      return;
    }
    localStorage.setItem('ielts_candidate_name', enteredName);

    const candidateId =
      currentStation?.currentCandidate?.candidateId ||
      '00' + Math.floor(1000 + Math.random() * 9000);
    const targetBand = currentStation?.currentCandidate?.targetBand || 0;

    const candidateData = {
      name: enteredName,
      candidateId,
      targetBand,
      stationName: formattedPc,
      consultancyId: consultancy?.id || 'apex-global'
    };

    // Update station heartbeat in invigilator radar
    if (consultancy) {
      ConsultancyService.updateStationHeartbeat(consultancy.id, formattedPc, {
        status: 'in_progress',
        currentCandidate: candidateData,
        assignedTestId: testToRun.id,
        testTitle: fullMock ? fullMock.title : testToRun.title,
        module: testToRun.module,
        currentQuestion: 1,
        totalQuestions: testToRun.module === 'writing' ? 2 : 40,
        answeredCount: 0,
        remainingSeconds: testToRun.durationMinutes * 60
      });
    }

    onStartExam(testToRun, candidateData, fullMock);
  };

  const handleStartLaunchedTest = () => {
    if (!activeLaunchedTest) return;

    const enteredName = candidateNameInput.trim();
    if (!enteredName) {
      alert('Please enter your candidate full name to proceed with the exam.');
      return;
    }

    if (activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full')) {
      const allFull = buildFullMockTests(tests.length > 0 ? tests : allMockTests);
      const fm = allFull.find((f) => f.id === activeLaunchedTest.testId) || allFull[0];
      if (fm) {
        handleLaunchExam(fm.listeningTest, fm);
        return;
      }
    }

    const foundTest =
      tests.find((t) => t.id === activeLaunchedTest.testId) ||
      allMockTests.find((t) => t.id === activeLaunchedTest.testId) ||
      tests[0];
    if (foundTest) {
      handleLaunchExam(foundTest);
    }
  };

  const handleQuickConnectStation = (stationToConnect: string) => {
    setLoginError(null);
    const targetC =
      ConsultancyService.getConsultancyById(selectedConsultancyId) ||
      consultancy ||
      allConsultancies[0];
    const cleanSt = stationToConnect.trim().toUpperCase();
    if (!cleanSt) {
      setLoginError('Please select or enter a PC number.');
      return;
    }
    const formattedSt = cleanSt.startsWith('PC-') ? cleanSt : `PC-${cleanSt.replace(/^PC/i, '')}`;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ielts_terminal_pc', formattedSt);
      localStorage.setItem('ielts_terminal_pc', formattedSt);
      localStorage.setItem('ielts_terminal_branch', targetC.branchCode || targetC.accessCode);
      localStorage.removeItem('ielts_terminal_pass');
    }

    setBranchCode(targetC.branchCode || targetC.accessCode);
    setPcNumber(formattedSt);
    setConsultancy(targetC);

    ConsultancyService.addStation(targetC.id, formattedSt);
    setPhase('connected');
  };

  // Resolve launched test details
  const resolvedTest = activeLaunchedTest
    ? tests.find((t) => t.id === activeLaunchedTest.testId) ||
      allMockTests.find((t) => t.id === activeLaunchedTest.testId) ||
      null
    : null;
  const resolvedFullMock = activeLaunchedTest && (activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full'))
    ? allFullMockTests.find((f) => f.id === activeLaunchedTest.testId) ||
      buildFullMockTests(tests.length > 0 ? tests : allMockTests).find((f) => f.id === activeLaunchedTest.testId) ||
      null
    : null;
  if (isDeleted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-white border border-slate-200 max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-xl text-center space-y-4 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-slate-900">Branch Not Found or Deactivated</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              The educational consultancy or computer lab linked to this workstation URL is no longer active.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onExitTerminal}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs"
            >
              Return to Main Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1 shadow-xs shrink-0">
            <img
              src="/images/masterieltsai-icon.png"
              alt="Master IELTS AI"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs sm:text-sm text-slate-900 tracking-tight uppercase">
                MOCK TEST <span className="font-normal text-[11px] text-slate-500 lowercase">from</span> Master IELTS AI
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Candidate Terminal
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Official IELTS Test Centre
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fullscreen Kiosk Mode Button */}
          <button
            onClick={toggleFullscreen}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5 ${
              isFullscreen
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
            }`}
            title="Toggle Fullscreen Exam Mode (F11)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen (F11)'}</span>
          </button>

          {/* Sound Test Button */}
          <button
            onClick={testAudio}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shadow-xs flex items-center gap-1.5 ${
              isSoundTesting
                ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
            }`}
            title="Check headphone sound"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{isSoundTesting ? 'Playing 440Hz...' : 'Sound Test'}</span>
          </button>

          {onOpenLookup && (
            <button
              onClick={onOpenLookup}
              className="hidden md:flex px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold transition cursor-pointer shadow-xs items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Check Results</span>
            </button>
          )}

          {phase === 'connected' ? (
            <button
              onClick={() => setPhase('login')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
              title="Change computer station number"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Switch PC</span>
            </button>
          ) : null}

          <button
            onClick={onExitTerminal}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
          >
            Exit Kiosk
          </button>
        </div>
      </header>

      {/* PHASE 1: WORKSTATION SETUP & PAIRING WIZARD */}
      {phase === 'login' && (
        <main className="flex-1 flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white border border-slate-200 max-w-xl w-full p-5 sm:p-8 rounded-3xl shadow-lg space-y-6">
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1.5 shadow-sm mx-auto mb-1">
                <img
                  src="/images/masterieltsai-icon.png"
                  alt="Master IELTS AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <span className="font-extrabold text-slate-900 uppercase tracking-tight">MOCK TEST</span>
                <span>from <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">Master IELTS AI</a></span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Connect This Computer to Lab
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Setup takes 5 seconds: Tap which PC number this is. It will pair immediately with the invigilator station.
              </p>
            </div>

            {/* Pick Station Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Tap This Computer's PC Number</span>
                </label>
                <span className="text-[11px] font-semibold text-blue-600">
                  Selected: <strong className="font-mono text-sm">{pcNumber || 'PC-01'}</strong>
                </span>
              </div>

              {/* Station Chips Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                {(ConsultancyService.getStations(selectedConsultancyId || consultancy?.id || 'apex-global').length > 0
                  ? ConsultancyService.getStations(selectedConsultancyId || consultancy?.id || 'apex-global')
                  : [
                      { id: '1', name: 'PC-01', consultancyId: selectedConsultancyId, status: 'idle', lastHeartbeat: '' },
                      { id: '2', name: 'PC-02', consultancyId: selectedConsultancyId, status: 'idle', lastHeartbeat: '' },
                      { id: '3', name: 'PC-03', consultancyId: selectedConsultancyId, status: 'idle', lastHeartbeat: '' },
                      { id: '4', name: 'PC-04', consultancyId: selectedConsultancyId, status: 'idle', lastHeartbeat: '' },
                      { id: '5', name: 'PC-05', consultancyId: selectedConsultancyId, status: 'idle', lastHeartbeat: '' },
                      { id: '6', name: 'PC-06', consultancyId: selectedConsultancyId, status: 'idle', lastHeartbeat: '' }
                    ]
                ).map((st) => {
                  const isStSelected =
                    ConsultancyService.normalizeStationName(pcNumber) ===
                    ConsultancyService.normalizeStationName(st.name);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setPcNumber(st.name);
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('ielts_terminal_pc', st.name);
                          localStorage.setItem('ielts_terminal_pc', st.name);
                        }
                      }}
                      className={`py-2 px-1.5 rounded-lg font-mono font-bold text-xs transition cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                        isStSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-105'
                          : 'bg-white hover:bg-blue-50 text-slate-800 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <span>{st.name}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          st.status === 'in_progress' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Custom PC Name Input */}
              <div className="pt-1 flex items-center gap-2">
                <input
                  type="text"
                  value={pcNumber}
                  onChange={(e) => {
                    const clean = e.target.value.toUpperCase();
                    setPcNumber(clean);
                    if (clean && typeof window !== 'undefined') {
                      sessionStorage.setItem('ielts_terminal_pc', clean);
                      localStorage.setItem('ielts_terminal_pc', clean);
                    }
                  }}
                  placeholder="Or type custom PC name (e.g. PC-12)"
                  className="flex-1 bg-white border border-slate-300 focus:border-blue-600 text-slate-900 font-mono font-bold text-xs px-3 py-2 rounded-lg outline-none uppercase"
                />
              </div>
            </div>

            {/* Error Banner */}
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                {loginError}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleQuickConnectStation(pcNumber)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-md hover:shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                <span>Save &amp; Connect as {pcNumber || 'PC-01'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 Once connected, this browser permanently remembers its station identity.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* PHASE 2: CONNECTED WAITING & LAUNCHED TEST FLOW */}
      {phase === 'connected' && (
        <main className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto w-full flex flex-col justify-center">
          {/* Station Status Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono font-extrabold text-sm shadow-xs shrink-0">
                {pcNumber || 'PC-01'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Station: {pcNumber || 'PC-01'}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Synchronized
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Official IELTS Test Centre
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Invigilator Radar
                </span>
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Ready to Receive Test
                </span>
              </div>
            </div>
          </div>

          {/* Candidate Full Name Input (Required before test) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Candidate Full Name</span>
                <span className="text-red-500 text-xs">*</span>
              </label>
              {candidateNameInput.trim() ? (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ready
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  Name Required
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                required
                value={candidateNameInput}
                onChange={(e) => {
                  setCandidateNameInput(e.target.value);
                  localStorage.setItem('ielts_candidate_name', e.target.value);
                }}
                placeholder="Type your full official name (e.g. Sujan Sharma)"
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-bold text-slate-900 px-4 py-3 rounded-xl outline-none text-sm transition"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Your name will appear on the teacher invigilator monitor, writing submission, and official scorecard.
            </p>
          </div>

          {/* ================= CONDITION A: TEST IS LAUNCHED BY ADMIN ================= */}
          {activeLaunchedTest ? (
            <div className="bg-gradient-to-b from-emerald-50/70 via-white to-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    Live Exam Session Launched by Invigilator
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {new Date(activeLaunchedTest.launchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Test Meta Card */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full') ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                      <Layers className="w-3.5 h-3.5 text-purple-700" />
                      <span>Full Mock Test</span>
                    </span>
                  ) : resolvedTest?.module === 'writing' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      <PenTool className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Academic Writing</span>
                    </span>
                  ) : resolvedTest?.module === 'reading' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                      <span>Academic Reading</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs">
                      <Headphones className="w-3.5 h-3.5 text-indigo-700" />
                      <span>Academic Listening</span>
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>
                      {activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full')
                        ? '95 Mins Total'
                        : resolvedTest?.module === 'writing'
                        ? '60 Mins • 2 Tasks'
                        : resolvedTest?.module === 'reading'
                        ? '60 Mins • 40 Questions'
                        : '35 Mins • 40 Questions'}
                    </span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {resolvedFullMock ? resolvedFullMock.title : resolvedTest ? resolvedTest.title : activeLaunchedTest.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {resolvedTest?.module === 'writing'
                    ? 'In this exam session, you will complete Task 1 (report/summary, 150 words minimum) and Task 2 (essay, 250 words minimum). Your essays will submit directly to your consultancy admin for band scoring.'
                    : activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full')
                    ? 'Official full mock exam sequence: Section 1 Listening (35 min), followed by a 1-minute transition window, and Section 2 Reading (60 min).'
                    : 'Standard computer-delivered examination simulator with official timing, navigation palette, and live invigilator telemetry.'}
                </p>
              </div>

              {/* Start Exam Action Button */}
              <div>
                {candidateNameInput.trim().length >= 2 ? (
                  <button
                    onClick={handleStartLaunchedTest}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl transition cursor-pointer shadow-lg hover:shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 transform active:scale-[0.99]"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      disabled
                      className="w-full py-4 bg-slate-200 text-slate-400 font-bold text-sm rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Please Enter Your Full Name Above to Start Test</span>
                    </button>
                    <p className="text-[11px] text-center text-amber-700 font-medium">
                      Invigilator protocol requires candidate identification before launching.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ================= CONDITION B: NO TEST LAUNCHED YET (AWAITING SCREEN) ================= */
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <span className="w-full h-full rounded-full bg-blue-100/60 animate-ping absolute" />
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center relative z-10 shadow-xs">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Station {pcNumber} Connected to Invigilator Radar</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Waiting for Invigilator to Launch Test
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Please enter your candidate name above and remain seated. Your consultancy invigilator will launch the test session from the admin control desk.
                </p>
              </div>

              {/* Instructions Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left text-xs max-w-lg mx-auto space-y-2.5">
                <div className="font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>CD-IELTS Terminal Protocol:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                  <li>No tests are visible to students until authorized by the branch administrator.</li>
                  <li>When the invigilator clicks <strong>Launch Test</strong>, the <strong>Start Test</strong> button will appear here in real time.</li>
                  <li>Ensure your headphones are connected and sound volume is adjusted properly.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Terminal Support Tools */}
          <div className="mt-8 border-t border-slate-200 pt-5 flex flex-wrap items-center justify-center gap-3">
            {!isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Maximize className="w-4 h-4 text-purple-600" />
                <span>Enter Fullscreen Exam Mode (F11)</span>
              </button>
            )}
            <button
              onClick={testAudio}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>{isSoundTesting ? 'Playing Test Tone (440Hz)...' : 'Check Audio / Headphones'}</span>
            </button>
            {onOpenLookup && (
              <button
                onClick={onOpenLookup}
                className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs transition flex items-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Check Published Results by Candidate ID</span>
              </button>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-2.5 text-center text-xs text-slate-500">
        British Council & IDP CD-IELTS Standard Computer Terminal • Official Invigilator Telemetry Active
      </footer>
    </div>
  );
};

export default StudentTerminalView;
