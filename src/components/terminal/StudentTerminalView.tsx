import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Key,
  ShieldCheck,
  ArrowRight,
  Building2,
  Lock,
  User
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import type { IELTSMockTest } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';

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
    }
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
  const [selectedTestId, setSelectedTestId] = useState<string>(
    tests[0]?.id || 'cambridge-19-test-1-reading'
  );

  const [loginError, setLoginError] = useState<string | null>(null);
  const [consultancy, setConsultancy] = useState<Consultancy | undefined>(() =>
    ConsultancyService.getConsultancyByBranchCode(branchCode)
  );
  const [currentStation, setCurrentStation] = useState<LabStation | undefined>(undefined);

  // Sync consultancy when branchCode changes
  useEffect(() => {
    const found = ConsultancyService.getConsultancyByBranchCode(branchCode);
    setConsultancy(found);
    if (found && pcNumber) {
      const stations = ConsultancyService.getStations(found.id);
      const st = stations.find((s) => s.name.toUpperCase() === pcNumber.toUpperCase());
      setCurrentStation(st);
    }
  }, [branchCode, pcNumber]);

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

  const handleLaunchExam = (testToRun: IELTSMockTest) => {
    // Standardize PC name
    const cleanPc = pcNumber.trim().toUpperCase();
    const formattedPc = cleanPc.startsWith('PC-') ? cleanPc : `PC-${cleanPc.replace(/^PC/i, '')}`;

    // Candidate details are assigned automatically:
    // If student enters their name, use it; if teacher pre-assigned candidate name, preserve it; otherwise auto-label with PC#
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

    onStartExam(testToRun, candidateData);
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

    const chosenTest = tests.find((t) => t.id === selectedTestId) || tests[0];
    if (chosenTest) {
      handleLaunchExam(chosenTest);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
            IELTS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                Official Computer-Delivered Examination Kiosk
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Candidate Terminal
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {consultancy ? `${consultancy.name} • ${consultancy.branch}` : 'Educational Consultancy Lab'}
            </p>
          </div>
        </div>

        <button
          onClick={onExitTerminal}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
        >
          Exit Kiosk
        </button>
      </header>

      {/* Main Login Screen */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6">
        <div className="bg-white border border-slate-200 max-w-md w-full p-5 sm:p-8 rounded-2xl shadow-sm space-y-5 sm:space-y-6">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center mx-auto text-blue-600 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
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

            {/* 4. Test Paper */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Select Exam Paper
              </label>
              <select
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none text-xs"
              >
                {tests.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.module.toUpperCase()})
                  </option>
                ))}
              </select>
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
              <span>Login & Begin Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-2.5 text-center text-xs text-slate-500">
        British Council & IDP CD-IELTS Standard Computer Terminal • No Candidate Registration Required
      </footer>
    </div>
  );
};

export default StudentTerminalView;
