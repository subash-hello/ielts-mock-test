import React, { useState } from 'react';
import {
  Rocket,
  Users,
  Radio,
  CheckCircle2,
  Play,
  StopCircle
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
  onSessionLaunched: () => void;
  onSessionEnded: () => void;
}

export const LaunchConsoleView: React.FC<LaunchConsoleViewProps> = ({
  consultancy,
  stations,
  students,
  tests,
  onSessionLaunched,
  onSessionEnded,
}) => {
  const [activeMode, setActiveMode] = useState<'modeA' | 'modeB'>('modeA');

  // Mode A state (Lab-wide broadcast)
  const [selectedBook, setSelectedBook] = useState<number>(16);
  const [selectedTestNum, setSelectedTestNum] = useState<number>(1);
  const [selectedSection, setSelectedSection] = useState<'reading' | 'listening' | 'writing' | 'full'>('reading');
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

  // End Session confirmation modal state (Rule 1)
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);

  // Filter available books & tests for Mode A
  const books = Array.from(new Set(tests.map((t) => t.book))).sort((a, b) => b - a);
  const testsInBook = tests.filter((t) => t.book === selectedBook);
  const testNums = Array.from(new Set(testsInBook.map((t) => t.testNumber))).sort((a, b) => a - b);

  // Connected stations count
  const activeStations = stations.filter((st) => {
    const hb = st.lastHeartbeat ? new Date(st.lastHeartbeat).getTime() : 0;
    return Date.now() - hb < 45000;
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

  // Execute Mode A Broadcast Launch
  const handleLaunchModeA = () => {
    if (!modeAPreview.test && !modeAPreview.fullMock) {
      alert('Selected test is not available in library.');
      return;
    }

    setIsBroadcastingCountdown(true);
    setCountdownNum(5);

    let count = 5;
    const interval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        setIsBroadcastingCountdown(false);

        // Broadcast test to lab terminals
        const targetTestId = modeAPreview.test?.id || 'cambridge-16-test-1-reading';
        ConsultancyService.launchBranchTest(
          consultancy.id,
          targetTestId,
          modeAPreview.title,
          selectedSection === 'full'
        );

        onSessionLaunched();
      } else {
        setCountdownNum(count);
      }
    }, 1000);
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

    // Launch assigned tests per station
    assignedEntries.forEach(([stId, val]) => {
      const st = stations.find((s) => s.id === stId);
      if (!st) return;

      const matchedTest = tests.find((t) => t.id === val.testId);
      const isFull = val.isFullMock || val.testId.endsWith('-full');

      // Assign student & test to station in service
      ConsultancyService.assignStationTest(
        consultancy.id,
        st.name,
        val.testId,
        matchedTest?.title || 'Assigned Mock Test',
        val.studentName || undefined,
        val.candidateId || undefined,
        undefined,
        isFull
      );
    });

    onSessionLaunched();
    alert(`Successfully launched ${assignedEntries.length} assigned workstation tests!`);
  };

  // Count assigned stations in Mode B
  const assignedCountModeB = Object.values(stationAssignments).filter(
    (val) => val.testId && val.testId !== 'none'
  ).length;

  // Execute End Lab Session
  const handleConfirmEndSession = () => {
    ConsultancyService.launchBranchTest(consultancy.id, null);
    ConsultancyService.broadcastStationCommand(consultancy.id, 'END_TEST');
    setShowEndSessionModal(false);
    onSessionEnded();
  };

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
        </div>

        {/* End Session Button (Blueprint 6.7: Red, separated, ALWAYS confirms!) */}
        <div>
          <button
            type="button"
            onClick={() => setShowEndSessionModal(true)}
            className="btn-texture px-4 py-2 bg-white hover:bg-red-50 text-[#C0392B] border border-[#C0392B]/40 text-xs font-bold shadow-2xs flex items-center gap-2"
          >
            <StopCircle className="w-4 h-4" />
            <span>End Active Lab Session</span>
          </button>
        </div>
      </div>

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
