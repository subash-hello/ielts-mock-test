import React, { useState, useEffect, useMemo } from 'react';
import {
  Rocket,
  Users,
  Radio,
  CheckCircle2,
  Play,
  StopCircle,
  Clock,
  Layers,
  Activity
} from 'lucide-react';
import type { Consultancy, LabStation, ConsultancyStudent } from '../../types/consultancy';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';
import { allFullMockTests } from '../../data/mockTests';
import { ConsultancyService } from '../../services/consultancyService';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface LaunchConsoleViewProps {
  consultancy: Consultancy;
  stations: LabStation[];
  students: ConsultancyStudent[];
  tests: IELTSMockTest[];
  initialMode?: 'modeA' | 'modeB';
  preselectedCandidate?: ConsultancyStudent | null;
  onSessionLaunched: () => void;
  onSessionEnded: () => void;
  onNavigateToMonitor?: () => void;
}

export const LaunchConsoleView: React.FC<LaunchConsoleViewProps> = ({
  consultancy,
  stations,
  students,
  tests,
  initialMode,
  preselectedCandidate,
  onSessionLaunched,
  onSessionEnded,
  onNavigateToMonitor,
}) => {
  const [activeMode, setActiveMode] = useState<'modeA' | 'modeB'>(initialMode || 'modeA');
  const [sessionName, setSessionName] = useState<string>(() => ConsultancyService.getActiveBatchName(consultancy.id) || '');
  const [activeLaunch, setActiveLaunch] = useState(() => ConsultancyService.getActiveLaunchedTest(consultancy.id));

  // Sync active test launch from memory and cloud in real time
  useEffect(() => {
    const sync = () => {
      setActiveLaunch(ConsultancyService.getActiveLaunchedTest(consultancy.id));
    };
    sync();
    ConsultancyService.syncActiveLaunchFromCloud(consultancy.id).then((l) => {
      if (l) setActiveLaunch(l);
    }).catch(() => {});

    const unsub = ConsultancyService.subscribe((event) => {
      if (
        event.type === 'BRANCH_TEST_LAUNCHED' ||
        event.type === 'STATION_UPDATED' ||
        event.type === 'STATION_COMMAND' ||
        event.type === 'STORAGE_SYNC'
      ) {
        sync();
      }
    });

    const interval = setInterval(sync, 1500);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [consultancy.id]);

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Mode A state (Lab-wide broadcast)
  const [selectedBook, setSelectedBook] = useState<number>(16);
  const [selectedTestNum, setSelectedTestNum] = useState<number>(1);
  const [selectedSection, setSelectedSection] = useState<'reading' | 'listening' | 'writing' | 'full'>('full');
  const [isBroadcastingCountdown, setIsBroadcastingCountdown] = useState(false);
  const [countdownNum, setCountdownNum] = useState<number>(5);

  // Mode B state (Per-student assignment table)
  // Map stationId -> { studentId?: string; studentName?: string; testId: string; isFullMock?: boolean }
  const [stationAssignments, setStationAssignments] = useState<
    Record<string, { studentName: string; candidateId: string; testId: string; isFullMock: boolean }>
  >(() => {
    const init: Record<string, { studentName: string; candidateId: string; testId: string; isFullMock: boolean }> = {};
    stations.forEach((st) => {
      init[st.id] = {
        studentName: st.currentCandidate?.name || '',
        candidateId: st.currentCandidate?.candidateId || '',
        testId: st.assignedTestId || '',
        isFullMock: false,
      };
    });
    return init;
  });

  // Pre-fill candidate into first available station if assigned from Candidates registry
  useEffect(() => {
    if (preselectedCandidate) {
      const targetStation = stations.find((s) => s.status === 'idle') || stations[0];
      if (targetStation) {
        setStationAssignments((prev) => ({
          ...prev,
          [targetStation.id]: {
            ...prev[targetStation.id],
            studentName: preselectedCandidate.fullName,
            candidateId: preselectedCandidate.candidateNumber,
          }
        }));
      }
    }
  }, [preselectedCandidate, stations]);

  // End Session confirmation modal state (Rule 1)
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);

  // Filter available books & tests for Mode A
  const books = Array.from(new Set(tests.map((t) => t.book))).sort((a, b) => b - a);
  const testsInBook = tests.filter((t) => t.book === selectedBook);
  const testNums = Array.from(new Set(testsInBook.map((t) => t.testNumber))).sort((a, b) => a - b);

  // Connected stations count
  const activeStations = stations.filter((st) => {
    const hb = st.lastHeartbeat ? new Date(st.lastHeartbeat).getTime() : 0;
    return (Date.now() - hb < 60000) || st.status === 'in_progress' || st.status === 'assigned' || Boolean(st.currentCandidate?.name);
  });
  const connectedCount = activeStations.length;

  // Selected test preview in Mode A
  const getSelectedModeATest = (): { test?: IELTSMockTest; fullMock?: FullMockTest; title: string; duration: number } => {
    if (selectedSection === 'full') {
      const full = allFullMockTests.find(
        (fm) => fm.book === selectedBook && fm.testNumber === selectedTestNum
      ) || allFullMockTests[0];
      return {
        fullMock: full,
        test: full?.listeningTest,
        title: full?.title || `Cambridge ${selectedBook} Test ${selectedTestNum} — Full Mock`,
        duration: full?.totalDurationMinutes || 165,
      };
    }
    const t = tests.find(
      (m) => m.book === selectedBook && m.testNumber === selectedTestNum && m.module === selectedSection
    );
    return {
      test: t,
      title: t?.title || `Cambridge ${selectedBook} Test ${selectedTestNum} (${selectedSection})`,
      duration: t?.durationMinutes || 60,
    };
  };

  const modeAPreview = getSelectedModeATest();

  // Execute Mode A Broadcast Launch immediately (0ms delay)
  const handleLaunchModeA = () => {
    if (!modeAPreview.test && !modeAPreview.fullMock) {
      alert('Selected test is not available in library.');
      return;
    }

    setIsBroadcastingCountdown(false);
    setCountdownNum(0);

    // Broadcast test to lab terminals immediately
    const targetTestId = (selectedSection === 'full' && modeAPreview.fullMock ? modeAPreview.fullMock.id : modeAPreview.test?.id) || 'cambridge-16-test-1-full';
    ConsultancyService.launchBranchTest(
      consultancy.id,
      targetTestId,
      modeAPreview.title,
      selectedSection === 'full',
      sessionName.trim() || undefined
    );

    onSessionLaunched();
  };

  // Update assignment for a station in Mode B
  const handleUpdateAssignment = (stationId: string, updates: Partial<{ studentName: string; candidateId: string; testId: string; isFullMock: boolean }>) => {
    setStationAssignments((prev) => ({
      ...prev,
      [stationId]: {
        ...prev[stationId],
        ...updates,
      },
    }));
  };

  // Execute Mode B Assigned Tests Launch
  const handleLaunchModeB = () => {
    const assignedEntries = Object.entries(stationAssignments).filter(
      ([_, val]) => val.testId && val.testId !== 'none'
    );

    if (assignedEntries.length === 0) {
      alert('Please assign a test to at least one station.');
      return;
    }

    if (sessionName.trim()) {
      ConsultancyService.setActiveBatchName(consultancy.id, sessionName.trim());
    }

    // Launch assigned tests per station
    assignedEntries.forEach(([stId, val]) => {
      const st = stations.find((s) => s.id === stId);
      if (!st) return;

      const matchedTest = tests.find((t) => t.id === val.testId);
      const matchedFull = allFullMockTests.find((fm) => fm.id === val.testId);
      const isFull = val.isFullMock || val.testId.endsWith('-full') || Boolean(matchedFull);

      // Assign student & test to station in service
      ConsultancyService.assignStationTest(
        consultancy.id,
        st.name,
        val.testId,
        matchedTest?.title || matchedFull?.title || 'Assigned Mock Test',
        val.studentName || undefined,
        val.candidateId || undefined,
        undefined,
        isFull
      );
    });

    onSessionLaunched();
  };

  // Count assigned stations in Mode B
  const assignedCountModeB = Object.values(stationAssignments).filter(
    (val) => val.testId && val.testId !== 'none'
  ).length;

  // Execute End Lab Session
  const handleConfirmEndSession = () => {
    stations.forEach((st) => {
      if (st.assignedTestId || st.status === 'assigned' || st.status === 'in_progress' || st.status === 'paused') {
        ConsultancyService.resetStation(consultancy.id, st.id);
      }
    });
    ConsultancyService.launchBranchTest(consultancy.id, null);
    ConsultancyService.setActiveBatchName(consultancy.id, undefined);
    ConsultancyService.broadcastStationCommand(consultancy.id, 'END_TEST', { stoppedAt: Date.now() });
    setShowEndSessionModal(false);
    onSessionEnded();
  };

  const activeBatch = ConsultancyService.getActiveBatchName(consultancy.id);
  const stationsInExam = stations.filter((s) => s.status === 'in_progress' || s.status === 'paused').length;
  const stationsAssigned = stations.filter((s) => s.status === 'assigned').length;
  const hasActiveStations = stations.some(
    (s) => s.status === 'in_progress' || s.status === 'paused' || s.status === 'assigned'
  );
  const hasActiveSession = Boolean(activeLaunch?.testId || activeBatch || hasActiveStations);

  // Resolve which test is running in the lab
  const resolvedRunningTest = useMemo(() => {
    if (activeLaunch?.testId) {
      const full = allFullMockTests.find((fm) => fm.id === activeLaunch.testId);
      const std = tests.find((t) => t.id === activeLaunch.testId);
      const isFull = Boolean(activeLaunch.isFullMock || full || activeLaunch.testId.includes('full'));
      const moduleName = isFull
        ? 'Full Mock (L+R+W)'
        : std?.module === 'reading'
        ? 'Academic Reading'
        : std?.module === 'listening'
        ? 'Academic Listening'
        : std?.module === 'writing'
        ? 'Academic Writing'
        : 'Mock Exam';

      return {
        title: full?.title || std?.title || activeLaunch.title || activeLaunch.testId,
        isFullMock: isFull,
        module: moduleName,
        duration: full?.totalDurationMinutes || std?.durationMinutes || (isFull ? 95 : 60),
        mode: 'Mode A: Lab-Wide Broadcast',
        launchedAt: activeLaunch.launchedAt,
        testId: activeLaunch.testId,
        questionCount: isFull ? '40 Listening + 40 Reading + 2 Writing Tasks' : (std?.module === 'writing' ? 'Task 1 & Task 2' : '40 Questions'),
        testList: undefined as Array<{ stationName: string; studentName: string; title: string }> | undefined,
      };
    }

    // Mode B: individual station assignments
    const runningStations = stations.filter(
      (st) => (st.status === 'in_progress' || st.status === 'assigned' || st.status === 'paused') && st.assignedTestId
    );
    if (runningStations.length > 0) {
      const distinctTestIds = Array.from(new Set(runningStations.map((st) => st.assignedTestId!)));
      const titles = distinctTestIds.map((id) => {
        const full = allFullMockTests.find((fm) => fm.id === id);
        const std = tests.find((t) => t.id === id);
        return full?.title || std?.title || id;
      });

      const firstId = distinctTestIds[0];
      const isFull = distinctTestIds.some((id) => id.includes('full'));
      const firstStd = tests.find((t) => t.id === firstId);

      return {
        title: titles.length === 1 ? titles[0] : `${titles.length} Distinct Papers Assigned`,
        isFullMock: isFull,
        module: titles.length === 1 ? (firstId.includes('full') ? 'Full Mock' : (firstStd?.module ? firstStd.module.toUpperCase() : 'EXAM')) : 'Multi-Paper',
        duration: firstStd?.durationMinutes || 60,
        mode: 'Mode B: Per-Student Assignment',
        launchedAt: runningStations[0].lastHeartbeat,
        testId: firstId,
        questionCount: `${runningStations.length} Active Workstations Assigned`,
        testList: runningStations.map((st) => ({
          stationName: st.name,
          studentName: st.currentCandidate?.name || 'Assigned Student',
          title: st.testTitle || st.assignedTestId || 'Test',
        })),
      };
    }

    return null;
  }, [activeLaunch, stations, tests]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
              Exam Orchestrator
            </span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${connectedCount > 0 ? 'bg-emerald-100 text-[#2E7D4F]' : 'bg-slate-200 text-[#5B6B82]'}`}>
              ● {connectedCount} {connectedCount === 1 ? 'Station' : 'Stations'} Online
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Launch Console
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Send synchronized exams lab-wide or map specific test papers per student
          </p>

          {/* Running Test Indicator (Shows directly in header) */}
          {hasActiveSession && resolvedRunningTest && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[#5B6B82]/15">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Running Test:</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#0F1E33] bg-white px-3 py-1 rounded-md border border-slate-300 shadow-2xs">
                {resolvedRunningTest.title}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                {resolvedRunningTest.module}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {resolvedRunningTest.mode}
              </span>
              {activeBatch && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                  Batch: {activeBatch}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons in Header */}
        {hasActiveSession && (
          <div className="flex items-center gap-2">
            {onNavigateToMonitor && (
              <button
                type="button"
                onClick={onNavigateToMonitor}
                className="btn-texture px-3.5 py-2 bg-[#0F1E33] hover:bg-[#1a2e4c] text-white text-xs font-bold shadow-2xs flex items-center gap-2 cursor-pointer transition rounded-xl"
              >
                <Activity className="w-4 h-4 text-[#C9A24B]" />
                <span>Live Monitor</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowEndSessionModal(true)}
              className="btn-texture px-4 py-2 bg-white hover:bg-red-50 text-[#C0392B] border border-[#C0392B]/40 text-xs font-bold shadow-2xs flex items-center gap-2 cursor-pointer transition rounded-xl"
            >
              <StopCircle className="w-4 h-4" />
              <span>End Active Lab Session</span>
            </button>
          </div>
        )}
      </div>

      {/* Active Exam Session in Lab Banner Card */}
      {hasActiveSession && resolvedRunningTest && (
        <div className="bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/50 border-2 border-emerald-500 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Active Exam Session Running in Lab
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {resolvedRunningTest.mode}
              </span>
            </div>

            {resolvedRunningTest.launchedAt && (
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Launched: {new Date(resolvedRunningTest.launchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                  <Layers className="w-3 h-3 text-purple-600" />
                  <span>{resolvedRunningTest.module}</span>
                </span>
                {resolvedRunningTest.duration > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{resolvedRunningTest.duration} Mins Total</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{stationsInExam} in Exam · {stationsAssigned} Ready · {connectedCount} Online</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#0F1E33] tracking-tight">
                {resolvedRunningTest.title}
              </h2>
              <p className="text-xs text-[#5B6B82]">
                {resolvedRunningTest.questionCount} • All connected candidate workstations in this branch are receiving this test.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {onNavigateToMonitor && (
                <button
                  type="button"
                  onClick={onNavigateToMonitor}
                  className="btn-texture px-4 py-2.5 bg-[#0F1E33] hover:bg-[#1a2e4c] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition"
                >
                  <Activity className="w-4 h-4 text-[#C9A24B]" />
                  <span>View Live Monitor</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowEndSessionModal(true)}
                className="btn-texture px-4 py-2.5 bg-white hover:bg-red-50 text-[#C0392B] border border-[#C0392B]/40 text-xs font-bold rounded-xl shadow-2xs flex items-center gap-2 cursor-pointer transition"
              >
                <StopCircle className="w-4 h-4" />
                <span>End Active Session</span>
              </button>
            </div>
          </div>

          {/* Mode B Station Breakdown if multiple papers */}
          {resolvedRunningTest.testList && Array.isArray(resolvedRunningTest.testList) && (
            <div className="pt-2 border-t border-emerald-100/70">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Assigned Workstation Breakdown:
              </div>
              <div className="flex flex-wrap gap-2">
                {resolvedRunningTest.testList.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs text-[#0F1E33] shadow-2xs"
                  >
                    <span className="font-mono font-bold text-blue-700">{item.stationName}:</span>
                    <span className="font-medium text-slate-700">{item.studentName}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-semibold text-slate-900">{item.title}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode Selector Tabs (Blueprint 6.7: Mode A & Mode B side by side) */}
      <div className="grid grid-cols-2 gap-3 max-w-lg">
        <button
          type="button"
          onClick={() => setActiveMode('modeA')}
          className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
            activeMode === 'modeA'
              ? 'border-[#0F1E33] bg-[#0F1E33] text-white shadow-xs'
              : 'border-[#5B6B82]/20 bg-white text-[#0F1E33] hover:bg-slate-50'
          }`}
        >
          <Radio className="w-5 h-5 shrink-0" />
          <div>
            <div className="text-xs font-bold">Mode A: Lab-Wide Broadcast</div>
            <div className={`text-[11px] ${activeMode === 'modeA' ? 'text-slate-300' : 'text-[#5B6B82]'}`}>
              Send ONE test to ALL PCs
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('modeB')}
          className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
            activeMode === 'modeB'
              ? 'border-[#0F1E33] bg-[#0F1E33] text-white shadow-xs'
              : 'border-[#5B6B82]/20 bg-white text-[#0F1E33] hover:bg-slate-50'
          }`}
        >
          <Users className="w-5 h-5 shrink-0" />
          <div>
            <div className="text-xs font-bold">Mode B: Per-Student Assignment</div>
            <div className={`text-[11px] ${activeMode === 'modeB' ? 'text-slate-300' : 'text-[#5B6B82]'}`}>
              Assign test per station
            </div>
          </div>
        </button>
      </div>

      {/* Session / Batch Name (QA-E10) */}
      <div className="paper-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-[#0F1E33]">
            Session / Batch Name (Optional)
          </label>
          <p className="text-[11px] text-[#5B6B82]">
            Displayed in Live Monitor telemetry to identify this testing cohort
          </p>
        </div>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="e.g. Oct 7 Evening Mock / Batch A"
          className="w-full sm:w-80 px-3.5 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-semibold text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
        />
      </div>

      {/* MODE A: LAB-WIDE BROADCAST */}
      {activeMode === 'modeA' && (
        <div className="paper-card p-6 space-y-6 animate-in fade-in">
          <div className="border-b border-[#5B6B82]/15 pb-3">
            <h2 className="font-display text-lg font-bold text-[#0F1E33]">
              Lab-Wide Broadcast Setup
            </h2>
            <p className="text-xs text-[#5B6B82]">
              Select test paper and section to launch across all {connectedCount} connected computer stations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Pick Book */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F1E33]">
                1. Cambridge Practice Book
              </label>
              <div className="space-y-1.5">
                {books.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBook(b)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs font-bold flex items-center justify-between transition ${
                      selectedBook === b
                        ? 'border-[#0F1E33] bg-[#0F1E33]/5 text-[#0F1E33] ring-1 ring-[#0F1E33]'
                        : 'border-[#5B6B82]/20 bg-white text-[#5B6B82] hover:bg-slate-50'
                    }`}
                  >
                    <span>Cambridge IELTS {b}</span>
                    <span className="text-[10px] text-[#C9A24B] uppercase">Academic</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Pick Test Number */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F1E33]">
                2. Test Number
              </label>
              <div className="grid grid-cols-2 gap-2">
                {testNums.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedTestNum(num)}
                    className={`p-3 rounded-lg border text-center text-xs font-bold transition ${
                      selectedTestNum === num
                        ? 'border-[#0F1E33] bg-[#0F1E33]/5 text-[#0F1E33] ring-1 ring-[#0F1E33]'
                        : 'border-[#5B6B82]/20 bg-white text-[#5B6B82] hover:bg-slate-50'
                    }`}
                  >
                    Test {num}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Pick Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F1E33]">
                3. Section
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'reading', label: 'Academic Reading', duration: '60 min' },
                  { id: 'listening', label: 'Academic Listening', duration: '30 min' },
                  { id: 'writing', label: 'Academic Writing', duration: '60 min' },
                  { id: 'full', label: 'FULL TEST (All 3 Modules)', duration: '2h 45m' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSection(s.id as any)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs font-bold flex items-center justify-between transition ${
                      selectedSection === s.id
                        ? 'border-[#0F1E33] bg-[#0F1E33]/5 text-[#0F1E33] ring-1 ring-[#0F1E33]'
                        : 'border-[#5B6B82]/20 bg-white text-[#5B6B82] hover:bg-slate-50'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] text-[#5B6B82] font-mono">{s.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review & Launch Confirmation Box (Blueprint 6.7) */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#5B6B82]/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
                  Launch Review
                </span>
                <div className="font-display text-base font-bold text-[#0F1E33] mt-0.5">
                  {connectedCount} PCs will receive: {modeAPreview.title}
                </div>
                <p className="text-xs text-[#5B6B82]">
                  Duration: {modeAPreview.duration} minutes · Synchronized start countdown
                </p>
              </div>

              <button
                type="button"
                onClick={handleLaunchModeA}
                disabled={isBroadcastingCountdown}
                className="btn-texture px-6 py-3 bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-w-[200px]"
              >
                {isBroadcastingCountdown ? (
                  <span className="font-mono text-base font-black text-[#C9A24B] animate-pulse">
                    Broadcasting in {countdownNum}s...
                  </span>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-[#C9A24B]" />
                    <span>Launch Lab-Wide →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE B: PER-STUDENT ASSIGNMENT TABLE */}
      {activeMode === 'modeB' && (
        <div className="paper-card p-6 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#5B6B82]/15 pb-3">
            <div>
              <h2 className="font-display text-lg font-bold text-[#0F1E33]">
                Assign Tests to Workstations
              </h2>
              <p className="text-xs text-[#5B6B82]">
                Map specific students and Cambridge papers to individual PC stations
              </p>
            </div>

            <button
              type="button"
              onClick={handleLaunchModeB}
              disabled={assignedCountModeB === 0}
              className="btn-texture px-5 py-2.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-xs font-bold shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              <Rocket className="w-4 h-4 text-[#C9A24B]" />
              <span>Launch {assignedCountModeB} Assigned Tests</span>
            </button>
          </div>

          {/* Assignment Table (Blueprint 6.7: Station | Student | Test) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#5B6B82]/20 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Student Candidate</th>
                  <th className="py-2.5 px-3">Assigned Test</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5B6B82]/10">
                {stations.map((st) => {
                  const assignment = stationAssignments[st.id] || {
                    studentName: '',
                    candidateId: '',
                    testId: '',
                    isFullMock: false,
                  };

                  return (
                    <tr key={st.id} className="hover:bg-white/60 transition">
                      {/* Station */}
                      <td className="py-3 px-3 font-mono font-bold text-[#0F1E33] whitespace-nowrap">
                        {st.name}
                      </td>

                      {/* Student Candidate Selector */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={assignment.studentName}
                            onChange={(e) =>
                              handleUpdateAssignment(st.id, { studentName: e.target.value })
                            }
                            placeholder="Student name (optional)"
                            className="px-2.5 py-1.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs w-48 focus:outline-none focus:border-[#C9A24B]"
                          />
                          {students.length > 0 && (
                            <select
                              onChange={(e) => {
                                const found = students.find((s) => s.id === e.target.value);
                                if (found) {
                                  handleUpdateAssignment(st.id, {
                                    studentName: found.fullName,
                                    candidateId: found.candidateNumber,
                                  });
                                }
                              }}
                              className="px-2 py-1.5 bg-slate-100 border border-[#5B6B82]/20 rounded-lg text-[11px] text-[#5B6B82]"
                            >
                              <option value="">Roster ▾</option>
                              {students.map((cand) => (
                                <option key={cand.id} value={cand.id}>
                                  {cand.fullName} (#{cand.candidateNumber})
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>

                      {/* Test Selector */}
                      <td className="py-3 px-3">
                        <select
                          value={assignment.testId}
                          onChange={(e) => {
                            const val = e.target.value;
                            const isFull = val.endsWith('-full');
                            handleUpdateAssignment(st.id, {
                              testId: val,
                              isFullMock: isFull,
                            });
                          }}
                          className="px-3 py-1.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs w-64 font-medium focus:outline-none focus:border-[#C9A24B]"
                        >
                          <option value="">— No Test (Keep Idle) —</option>
                          <optgroup label="Full Mock Test Bundles">
                            {allFullMockTests.map((ft) => (
                              <option key={ft.id} value={ft.id}>
                                {ft.title}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Individual Cambridge Tests">
                            {tests.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.title} ({t.module})
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </td>

                      {/* Status indicator */}
                      <td className="py-3 px-3">
                        {assignment.testId && assignment.testId !== 'none' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D4F] bg-[#2E7D4F]/10 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Assigned
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#5B6B82]">Idle</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#5B6B82]/10">
            <span className="text-xs text-[#5B6B82]">
              Unassigned stations stay idle. Assignment is always explicit and visible.
            </span>
            <button
              type="button"
              onClick={handleLaunchModeB}
              disabled={assignedCountModeB === 0}
              className="btn-texture px-6 py-2.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-xs font-bold disabled:opacity-50"
            >
              Launch {assignedCountModeB} Assigned Tests →
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for End Session */}
      <ConfirmationModal
        isOpen={showEndSessionModal}
        title="End Active Examination Session?"
        message={connectedCount > 0 ? `End the exam on all ${connectedCount} active station${connectedCount === 1 ? '' : 's'}? Current exam sessions will be concluded.` : 'Conclude the active laboratory session across all workstations?'}
        confirmLabel="End Session"
        cancelLabel="Keep Working"
        isDestructive={true}
        affectedCount={connectedCount}
        affectedLabel="connected workstations"
        onConfirm={handleConfirmEndSession}
        onCancel={() => setShowEndSessionModal(false)}
      />
    </div>
  );
};
