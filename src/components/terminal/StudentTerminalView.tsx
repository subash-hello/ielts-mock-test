import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Key,
  ArrowRight,
  Building2,
  Lock,
  User,
  BookOpen,
  Headphones,
  Clock,
  Layers,
  Search,
  Sparkles,
  PenTool,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { buildFullMockTests, allFullMockTests } from '../../data/mockTests';

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

  // Pre-load saved or URL parameters
  const [branchCode, setBranchCode] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get('branch') || urlParams.get('access') || urlParams.get('code');
    if (fromUrl) return fromUrl.toUpperCase();

    const saved = localStorage.getItem('ielts_terminal_branch');
    if (saved) return saved;

    if (initialConsultancyId) {
      const c = ConsultancyService.getConsultancyById(initialConsultancyId);
      if (c) return c.branchCode || c.accessCode;
    }
    return 'APEX-2026';
  });

  const [pcNumber, setPcNumber] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get('station') || urlParams.get('st') || urlParams.get('pc');
    if (fromUrl) return fromUrl.toUpperCase();

    return localStorage.getItem('ielts_terminal_pc') || initialStationName || 'PC-01';
  });

  const [password, setPassword] = useState<string>(
    localStorage.getItem('ielts_terminal_pass') || '1234'
  );

  const [loginError, setLoginError] = useState<string | null>(null);
  const [consultancy, setConsultancy] = useState<Consultancy | undefined>(() =>
    ConsultancyService.getConsultancyByBranchCode(branchCode)
  );
  const [currentStation, setCurrentStation] = useState<LabStation | undefined>(undefined);

  // Phase: If previously paired, start in connected waiting screen
  const [phase, setPhase] = useState<'login' | 'connected'>(() => {
    const saved = localStorage.getItem('ielts_terminal_branch');
    return saved ? 'connected' : 'connected'; // Default directly to connected station kiosk for instant student check-in
  });

  // Active test launched by branch admin
  const [activeLaunchedTest, setActiveLaunchedTest] = useState<{
    testId: string;
    title: string;
    launchedAt: string;
    isFullMock?: boolean;
  } | null>(() => {
    const c = ConsultancyService.getConsultancyByBranchCode(branchCode);
    return c ? ConsultancyService.getActiveLaunchedTest(c.id) : null;
  });

  // Teacher override: whether to expand manual test library
  const [showManualOverride, setShowManualOverride] = useState(false);
  const [testMode, setTestMode] = useState<'full' | 'individual'>('individual');
  const [availableTests, setAvailableTests] = useState<IELTSMockTest[]>(tests);
  const [availableFullMocks, setAvailableFullMocks] = useState<FullMockTest[]>([]);

  // Sync consultancy when branchCode changes
  useEffect(() => {
    const found = ConsultancyService.getConsultancyByBranchCode(branchCode);
    setConsultancy(found);
    if (found) {
      computeAvailableTests(found.id);
      setActiveLaunchedTest(ConsultancyService.getActiveLaunchedTest(found.id));
      if (pcNumber) {
        const stations = ConsultancyService.getStations(found.id);
        const st = stations.find((s) => s.name.toUpperCase() === pcNumber.toUpperCase());
        setCurrentStation(st);
      }
    } else {
      setAvailableTests(tests);
      setAvailableFullMocks(buildFullMockTests(tests));
    }
  }, [branchCode, pcNumber, tests]);

  // Subscribe to live branch launched test & teacher commands
  useEffect(() => {
    if (!consultancy) return;

    // Check on mount
    setActiveLaunchedTest(ConsultancyService.getActiveLaunchedTest(consultancy.id));

    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (event.type === 'BRANCH_TEST_LAUNCHED') {
        const payload = event.payload;
        if (payload?.consultancyId === consultancy.id) {
          if (payload.testId) {
            setActiveLaunchedTest({
              testId: payload.testId,
              title: payload.title || payload.testId,
              launchedAt: payload.launchedAt || new Date().toISOString(),
              isFullMock: payload.isFullMock
            });
          } else {
            setActiveLaunchedTest(null);
          }
        }
      } else if (event.type === 'STATION_COMMAND') {
        const { stationId, command, testId } = event.payload || {};
        const cleanPc = pcNumber.trim().toUpperCase();
        if (stationId === currentStation?.id || stationId === currentStation?.name || stationId === cleanPc) {
          if (command === 'START_TEST') {
            const foundTest = tests.find((t) => t.id === testId) || tests[0];
            if (foundTest) {
              handleLaunchExam(foundTest);
            }
          }
        }
      }
    });

    // Polling sync every 2 seconds
    const interval = setInterval(() => {
      const active = ConsultancyService.getActiveLaunchedTest(consultancy.id);
      setActiveLaunchedTest(active);
    }, 2000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [consultancy, currentStation, pcNumber, tests]);

  // Filter tests based on consultancy's assigned tests
  const computeAvailableTests = (cid: string) => {
    const assignedIds = ConsultancyService.getAssignedTestIds(cid);
    let filtered: IELTSMockTest[] = [];
    if (assignedIds.length > 0) {
      filtered = tests.filter((t) => assignedIds.includes(t.id));
    } else {
      filtered = tests;
    }
    setAvailableTests(filtered);
    setAvailableFullMocks(buildFullMockTests(filtered));
  };

  const handleLaunchExam = (testToRun: IELTSMockTest, fullMock?: FullMockTest) => {
    const cleanPc = pcNumber.trim().toUpperCase();
    const formattedPc = cleanPc.startsWith('PC-') ? cleanPc : `PC-${cleanPc.replace(/^PC/i, '')}`;

    const enteredName = candidateNameInput.trim();
    if (!enteredName) {
      alert('Please enter your full name before starting the exam.');
      return;
    }
    localStorage.setItem('ielts_candidate_name', enteredName);

    const candidateId =
      currentStation?.currentCandidate?.candidateId ||
      '00' + Math.floor(1000 + Math.random() * 9000);
    const targetBand = currentStation?.currentCandidate?.targetBand || 7.5;

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
      const allFull = buildFullMockTests(tests);
      const fm = allFull.find((f) => f.id === activeLaunchedTest.testId) || allFull[0];
      if (fm) {
        handleLaunchExam(fm.listeningTest, fm);
        return;
      }
    }

    const foundTest = tests.find((t) => t.id === activeLaunchedTest.testId) || tests[0];
    if (foundTest) {
      handleLaunchExam(foundTest);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const verification = ConsultancyService.verifyTerminalLogin(branchCode, pcNumber, password);
    if (!verification.success || !verification.consultancy || !verification.stationName) {
      setLoginError(verification.error || 'Authentication failed. Please check your credentials.');
      return;
    }

    // Save for workstation persistence
    localStorage.setItem('ielts_terminal_branch', branchCode.trim().toUpperCase());
    localStorage.setItem('ielts_terminal_pc', verification.stationName);
    localStorage.setItem('ielts_terminal_pass', password.trim());

    // Ensure station is added to consultancy lab
    ConsultancyService.addStation(verification.consultancy.id, verification.stationName);

    // Compute available tests for this consultancy
    computeAvailableTests(verification.consultancy.id);

    // Move to connected phase
    setPhase('connected');
  };

  // Resolve launched test details
  const resolvedTest = activeLaunchedTest
    ? tests.find((t) => t.id === activeLaunchedTest.testId)
    : null;
  const resolvedFullMock = activeLaunchedTest && (activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full'))
    ? allFullMockTests.find((f) => f.id === activeLaunchedTest.testId)
    : null;

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
              {consultancy ? `${consultancy.name} • ${consultancy.branch}` : 'Educational Consultancy Lab'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenLookup && (
            <button
              onClick={onOpenLookup}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check Results</span>
            </button>
          )}

          {phase === 'connected' ? (
            <button
              onClick={() => setPhase('login')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
              title="Station settings & pairing"
            >
              Station Config
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

      {/* PHASE 1: LOGIN / STATION PAIRING */}
      {phase === 'login' && (
        <main className="flex-1 flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white border border-slate-200 max-w-md w-full p-5 sm:p-8 rounded-2xl shadow-sm space-y-5 sm:space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1.5 shadow-sm mx-auto mb-1">
                <img
                  src="/images/masterieltsai-icon.png"
                  alt="Master IELTS AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-0.5">
                <span className="font-extrabold text-slate-900 uppercase tracking-tight">MOCK TEST</span>
                <span>from <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">Master IELTS AI</a></span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Candidate Terminal Configuration
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect this workstation to your consultancy examination invigilator desk.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              {/* 1. Branch Code */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Branch Code *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value.toUpperCase())}
                    placeholder="e.g. APEX-2026"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono font-bold text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-sm uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {consultancy ? `Connected: ${consultancy.name}` : 'Enter code provided by your institute'}
                </p>
              </div>

              {/* Candidate Full Name */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Candidate Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={candidateNameInput}
                    onChange={(e) => setCandidateNameInput(e.target.value)}
                    placeholder="e.g. Sujan Sharma"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-xs"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Your name will appear on the consultancy invigilator radar and test scorecard
                </p>
              </div>

              {/* 2. PC Number */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  PC Number *
                </label>
                <div className="relative">
                  <Monitor className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pcNumber}
                    onChange={(e) => setPcNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. PC-01, PC-04"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-bold text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-sm uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Check the label stickered on your computer desk
                </p>
              </div>

              {/* 3. Password */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Examination Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter exam session password"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-sm"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Session password provided by invigilator (default: 1234)
                </p>
              </div>

              {/* Error Banner */}
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs leading-relaxed">
                  {loginError}
                </div>
              )}

              {/* Policy notice */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-start gap-2 text-xs text-slate-600">
                <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Your computer connects live to the teacher invigilator monitor. Please remain seated once the test starts.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Connect Station</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
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
                  {consultancy ? `${consultancy.name} • ${consultancy.branch}` : 'Consultancy Lab'}
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

          {/* Teacher Override: Manual practice catalog (Collapsed by default) */}
          <div className="mt-8 border-t border-slate-200 pt-5 text-center">
            <button
              onClick={() => setShowManualOverride(!showManualOverride)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <span>Teacher Override / Self-Study Practice Mode</span>
              {showManualOverride ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showManualOverride && (
              <div className="mt-5 text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900">
                    Manual Test Selection (Teacher Practice Override)
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTestMode('individual')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        testMode === 'individual' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Individual Module
                    </button>
                    <button
                      onClick={() => setTestMode('full')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        testMode === 'full' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Full Mock
                    </button>
                  </div>
                </div>

                {testMode === 'individual' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {availableTests.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 hover:border-blue-300 transition"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-slate-900 block truncate max-w-[220px]">
                            {t.title}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Cambridge {t.book} • {t.durationMinutes} min
                          </span>
                        </div>
                        <button
                          onClick={() => handleLaunchExam(t)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition cursor-pointer shrink-0"
                        >
                          Start
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {testMode === 'full' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {availableFullMocks.map((fm) => (
                      <div
                        key={fm.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 hover:border-blue-300 transition"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-slate-900 block truncate max-w-[220px]">
                            {fm.title}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Reading + Listening • {fm.totalDurationMinutes} min
                          </span>
                        </div>
                        <button
                          onClick={() => handleLaunchExam(fm.listeningTest, fm)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition cursor-pointer shrink-0"
                        >
                          Start
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
