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
  ArrowLeft,
  Layers
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { buildFullMockTests } from '../../data/mockTests';

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
}

export const StudentTerminalView: React.FC<StudentTerminalViewProps> = ({
  initialStationName,
  initialConsultancyId,
  tests,
  onStartExam,
  onExitTerminal
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

  // Phase: 'login' = enter credentials, 'select-test' = pick a test after login
  const [phase, setPhase] = useState<'login' | 'select-test'>('login');

  // Available tests filtered by consultancy assignments
  const [availableTests, setAvailableTests] = useState<IELTSMockTest[]>(tests);
  const [availableFullMocks, setAvailableFullMocks] = useState<FullMockTest[]>([]);

  // Test selection
  const [testMode, setTestMode] = useState<'full' | 'individual'>('full');

  // Sync consultancy when branchCode changes
  useEffect(() => {
    const found = ConsultancyService.getConsultancyByBranchCode(branchCode);
    setConsultancy(found);
    if (found) {
      computeAvailableTests(found.id);
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

  // Listen for remote teacher commands if station is registered
  useEffect(() => {
    if (!consultancy || !currentStation) return;

    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (event.type === 'STATION_COMMAND') {
        const { stationId, command, testId } = event.payload;
        if (stationId === currentStation.id || stationId === currentStation.name) {
          if (command === 'START_TEST') {
            const foundTest = tests.find((t) => t.id === testId) || tests[0];
            if (foundTest) {
              handleLaunchExam(foundTest);
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, [consultancy, currentStation, tests]);

  // Filter tests based on consultancy's assigned tests
  const computeAvailableTests = (cid: string) => {
    const assignedIds = ConsultancyService.getAssignedTestIds(cid);
    let filtered: IELTSMockTest[];
    if (assignedIds.length > 0) {
      filtered = tests.filter((t) => assignedIds.includes(t.id));
    } else {
      // No assignments = show all (fallback)
      filtered = tests;
    }
    setAvailableTests(filtered);
    setAvailableFullMocks(buildFullMockTests(filtered));
  };

  const handleLaunchExam = (testToRun: IELTSMockTest, fullMock?: FullMockTest) => {
    // Standardize PC name
    const cleanPc = pcNumber.trim().toUpperCase();
    const formattedPc = cleanPc.startsWith('PC-') ? cleanPc : `PC-${cleanPc.replace(/^PC/i, '')}`;

    const enteredName = candidateNameInput.trim();
    const candidateName = enteredName || currentStation?.currentCandidate?.name || `Candidate ${formattedPc}`;
    if (enteredName) {
      localStorage.setItem('ielts_candidate_name', enteredName);
    }
    const candidateId =
      currentStation?.currentCandidate?.candidateId ||
      '00' + Math.floor(1000 + Math.random() * 9000);
    const targetBand = currentStation?.currentCandidate?.targetBand || 7.5;

    const candidateData = {
      name: candidateName,
      candidateId,
      targetBand,
      stationName: formattedPc,
      consultancyId: consultancy?.id || 'apex-global'
    };

    // Update station heartbeat
    if (consultancy) {
      ConsultancyService.updateStationHeartbeat(consultancy.id, formattedPc, {
        status: 'in_progress',
        currentCandidate: candidateData,
        assignedTestId: testToRun.id,
        testTitle: testToRun.title,
        module: testToRun.module,
        currentQuestion: 1,
        totalQuestions: 40,
        answeredCount: 0,
        remainingSeconds: testToRun.durationMinutes * 60
      });
    }

    onStartExam(testToRun, candidateData, fullMock);
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

    // Move to test selection phase
    setPhase('select-test');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-xs">
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

        <button
          onClick={onExitTerminal}
          className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
        >
          Exit Kiosk
        </button>
      </header>

      {/* PHASE 1: LOGIN */}
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
                Candidate Terminal Login
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                No registration needed. Enter your <strong>Branch Code</strong>, <strong>PC Number</strong>, and <strong>Password</strong> to begin your exam.
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
                  Your name will appear on the consultancy invigilator radar and test report
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
                  Session password written on the whiteboard (default: 1234)
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
                <span>Login & Select Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </main>
      )}

      {/* PHASE 2: TEST SELECTION */}
      {phase === 'select-test' && (
        <main className="flex-1 p-3 sm:p-6 max-w-4xl mx-auto w-full">
          {/* Back to login */}
          <button
            onClick={() => setPhase('login')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-4 cursor-pointer transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </button>

          {/* Candidate Info Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-sm font-bold text-blue-700">
                {(candidateNameInput || 'C').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{candidateNameInput || `Candidate ${pcNumber}`}</div>
                <div className="text-[11px] text-slate-500">
                  {consultancy?.name} • Station: {pcNumber}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Connected to Invigilator Monitor
            </div>
          </div>

          {/* Test Mode Tabs */}
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setTestMode('full')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                testMode === 'full'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Full Mock Test (Reading + Listening)
            </button>
            <button
              onClick={() => setTestMode('individual')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                testMode === 'individual'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Individual Module
            </button>
          </div>

          {/* FULL MOCK TEST MODE */}
          {testMode === 'full' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-slate-900">
                  Select Full Mock Test
                </h2>
                <span className="text-[11px] text-slate-500">
                  {availableFullMocks.length} test{availableFullMocks.length !== 1 ? 's' : ''} available
                </span>
              </div>

              {availableFullMocks.length === 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <p className="text-sm font-semibold text-amber-800 mb-1">No Full Mock Tests Available</p>
                  <p className="text-xs text-amber-600">
                    Your consultancy has not assigned any complete mock tests yet. Please ask your invigilator to assign tests from the admin portal.
                  </p>
                </div>
              )}

              {availableFullMocks.map((fullMock) => (
                <div
                  key={fullMock.id}
                  className="bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-300 transition group"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition">
                          {fullMock.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {fullMock.totalDurationMinutes} min total
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-blue-500" />
                            Reading: {fullMock.readingTest.durationMinutes} min
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            <Headphones className="w-3 h-3 text-purple-500" />
                            Listening: {fullMock.listeningTest.durationMinutes} min
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            40 Reading Questions
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                            40 Listening Questions
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            Cambridge {fullMock.book}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLaunchExam(fullMock.listeningTest, fullMock)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer shadow-xs shrink-0"
                      >
                        <span>Start Full Mock</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Test flow */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="font-semibold text-slate-700">Exam Flow:</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-100">
                        <Headphones className="w-3 h-3" /> Listening (35 min)
                      </span>
                      <span>→</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                        <BookOpen className="w-3 h-3" /> Reading (60 min)
                      </span>
                      <span>→</span>
                      <span className="font-semibold text-emerald-600">Results</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INDIVIDUAL MODULE MODE */}
          {testMode === 'individual' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-slate-900">
                  Select Individual Test
                </h2>
                <span className="text-[11px] text-slate-500">
                  {availableTests.length} test{availableTests.length !== 1 ? 's' : ''} available
                </span>
              </div>

              {availableTests.length === 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <p className="text-sm font-semibold text-amber-800 mb-1">No Tests Available</p>
                  <p className="text-xs text-amber-600">
                    Your consultancy has not assigned any tests yet. Please ask your invigilator.
                  </p>
                </div>
              )}

              {availableTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-300 transition group"
                >
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {test.durationMinutes} min
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          test.module === 'reading'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          {test.module === 'reading' ? (
                            <><BookOpen className="w-3 h-3" /> Reading</>
                          ) : (
                            <><Headphones className="w-3 h-3" /> Listening</>
                          )}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          Cambridge {test.book} • Test {test.testNumber}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLaunchExam(test)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer shadow-xs shrink-0"
                    >
                      <span>Start Test</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-2.5 text-center text-xs text-slate-500">
        British Council & IDP CD-IELTS Standard Computer Terminal • No Candidate Registration Required
      </footer>
    </div>
  );
};

export default StudentTerminalView;
