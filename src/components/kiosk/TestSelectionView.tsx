import React, { useState, useEffect } from 'react';
import {
  Headphones,
  BookOpen,
  PenTool,
  Target,
  ArrowLeft,
  Building2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Radio
} from 'lucide-react';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';
import type { Consultancy } from '../../types/consultancy';
import { allMockTests, allFullMockTests } from '../../data/mockTests';
import { ConsultancyService } from '../../services/consultancyService';

interface TestSelectionViewProps {
  consultancy?: Consultancy;
  availableTests: IELTSMockTest[];
  studentName: string;
  stationName: string;
  onSelectTest: (test: IELTSMockTest, fullMock?: FullMockTest) => void;
  onBack: () => void;
}

export const TestSelectionView: React.FC<TestSelectionViewProps> = ({
  consultancy,
  availableTests,
  studentName,
  stationName,
  onSelectTest,
  onBack,
}) => {
  // Sync active live mock test launched by consultancy
  const [activeLaunch, setActiveLaunch] = useState(() => {
    if (!consultancy?.id) return null;
    const stationAssigned = ConsultancyService.getStationAssignedTest(consultancy.id, stationName);
    const branchActive = ConsultancyService.getActiveLaunchedTest(consultancy.id);
    return stationAssigned || branchActive || null;
  });

  useEffect(() => {
    const syncLaunch = () => {
      if (!consultancy?.id) return;
      const stationAssigned = ConsultancyService.getStationAssignedTest(consultancy.id, stationName);
      const branchActive = ConsultancyService.getActiveLaunchedTest(consultancy.id);
      setActiveLaunch(stationAssigned || branchActive || null);
    };

    syncLaunch();
    const unsub = ConsultancyService.subscribe((event) => {
      if (
        event.type === 'BRANCH_TEST_LAUNCHED' ||
        event.type === 'STATION_COMMAND' ||
        event.type === 'STATION_UPDATED' ||
        event.type === 'MODULE_TEST_ASSIGNED' ||
        event.type === 'STORAGE_SYNC'
      ) {
        syncLaunch();
      }
    });

    const interval = setInterval(syncLaunch, 800);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [consultancy?.id, stationName]);

  // Helper to extract Cambridge book and test number
  const parseBookAndTest = (testId?: string): { book: number; testNumber: number } | null => {
    if (!testId) return null;
    const match = testId.match(/cambridge-(\d+)-test-(\d+)/i);
    if (match) {
      return { book: parseInt(match[1], 10), testNumber: parseInt(match[2], 10) };
    }
    const found = allMockTests.find((t) => t.id === testId);
    if (found) {
      return { book: found.book, testNumber: found.testNumber };
    }
    const foundFull = allFullMockTests.find((f) => f.id === testId);
    if (foundFull) {
      return { book: foundFull.book, testNumber: foundFull.testNumber };
    }
    return null;
  };

  // Retrieve the active module test IDs configured by the consultancy
  const activeModuleTests = consultancy
    ? ConsultancyService.getActiveModuleTests(consultancy.id)
    : {
        listening: 'cambridge-16-test-1-listening',
        reading: 'cambridge-16-test-1-reading',
        writing: 'cambridge-16-test-1-writing',
        full: 'cambridge-16-test-1-full',
      };

  const parsedLaunch = parseBookAndTest(activeLaunch?.testId);
  const parsedConfig = parseBookAndTest(activeModuleTests.full || activeModuleTests.reading || activeModuleTests.listening);

  const targetBook = parsedLaunch?.book || parsedConfig?.book || 16;
  const targetTestNumber = parsedLaunch?.testNumber || parsedConfig?.testNumber || 1;

  // Resolve assigned test papers given by the consultancy for this Cambridge paper set
  const assignedListeningTest =
    availableTests.find((t) => t.book === targetBook && t.testNumber === targetTestNumber && t.module === 'listening') ||
    allMockTests.find((t) => t.book === targetBook && t.testNumber === targetTestNumber && t.module === 'listening') ||
    availableTests.find((t) => t.id === activeModuleTests.listening) ||
    allMockTests.find((t) => t.id === activeModuleTests.listening) ||
    availableTests.find((t) => t.module === 'listening') ||
    allMockTests.find((t) => t.module === 'listening');

  const assignedReadingTest =
    availableTests.find((t) => t.book === targetBook && t.testNumber === targetTestNumber && t.module === 'reading') ||
    allMockTests.find((t) => t.book === targetBook && t.testNumber === targetTestNumber && t.module === 'reading') ||
    availableTests.find((t) => t.id === activeModuleTests.reading) ||
    allMockTests.find((t) => t.id === activeModuleTests.reading) ||
    availableTests.find((t) => t.module === 'reading') ||
    allMockTests.find((t) => t.module === 'reading');

  const assignedWritingTest =
    availableTests.find((t) => t.book === targetBook && t.testNumber === targetTestNumber && t.module === 'writing') ||
    allMockTests.find((t) => t.book === targetBook && t.testNumber === targetTestNumber && t.module === 'writing') ||
    availableTests.find((t) => t.id === activeModuleTests.writing) ||
    allMockTests.find((t) => t.id === activeModuleTests.writing) ||
    availableTests.find((t) => t.module === 'writing') ||
    allMockTests.find((t) => t.module === 'writing');

  const assignedFullMock =
    allFullMockTests.find((fm) => fm.book === targetBook && fm.testNumber === targetTestNumber) ||
    allFullMockTests.find((fm) => fm.id === activeModuleTests.full) ||
    allFullMockTests.find((fm) => fm.book === 16 && fm.testNumber === 1) ||
    allFullMockTests[0];

  const handleSelectModule = (mod: 'listening' | 'reading' | 'writing' | 'full') => {
    if (mod === 'listening' && assignedListeningTest) {
      onSelectTest(assignedListeningTest);
    } else if (mod === 'reading' && assignedReadingTest) {
      onSelectTest(assignedReadingTest);
    } else if (mod === 'writing' && assignedWritingTest) {
      onSelectTest(assignedWritingTest);
    } else if (mod === 'full' && assignedFullMock) {
      onSelectTest(assignedFullMock.listeningTest, assignedFullMock);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#C9A24B]/30">
      <div className="max-w-3xl w-full space-y-6">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-[#5B6B82] hover:text-[#0F1E33] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change Name</span>
          </button>
          <div className="text-right flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-[#0F1E33] bg-white px-2.5 py-1 rounded-md border border-[#5B6B82]/20">
              {stationName}
            </span>
            <span className="text-xs text-[#5B6B82]">· {studentName}</span>
          </div>
        </div>

        {/* Live Consultancy Launch Banner */}
        <div className="bg-[#0F1E33] text-white p-4 sm:p-5 rounded-2xl shadow-md border border-[#0F1E33] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#C9A24B]/20 border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] shrink-0">
              {activeLaunch ? <Radio className="w-5 h-5 animate-pulse text-[#C9A24B]" /> : <Building2 className="w-5 h-5 text-[#C9A24B]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#C9A24B]/20 px-2 py-0.5 rounded">
                  {activeLaunch ? 'Live Consultancy Launch' : 'Assigned Exam Paper'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-300 font-semibold">Ready</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                Cambridge {targetBook} Test {targetTestNumber} Mock Paper
              </h2>
              <p className="text-xs text-white/70">
                Assigned by {consultancy?.name ? consultancy.name : 'Consultancy Centre'}. Select your examination module below.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] font-mono text-[#C9A24B] bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 block sm:inline-block">
              {studentName}
            </span>
          </div>
        </div>

        {/* Title & Guidance */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 text-[#0F1E33] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Choose Which Module To Sit</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F1E33] tracking-tight">
            Select Your Examination Scope
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B82] max-w-lg mx-auto leading-relaxed">
            The exam test paper has been set by your consultancy. Choose an individual module or take the full 3-section mock exam.
          </p>
        </div>

        {/* 4 Module Cards (Student Chooses Module Only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Listening */}
          <button
            type="button"
            onClick={() => handleSelectModule('listening')}
            disabled={!assignedListeningTest}
            className="paper-card p-5 sm:p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[170px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                  {assignedListeningTest?.durationMinutes || 30} min
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  Academic Listening
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  4 parts · 40 questions · High-fidelity audio
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#5B6B82]/15 flex items-center justify-between text-xs">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] uppercase font-bold text-[#5B6B82] block tracking-wider">
                  Assigned by Consultancy:
                </span>
                <span className="font-bold text-[#0F1E33] truncate block text-[11px]">
                  {assignedListeningTest?.title || `Cambridge ${targetBook} Test ${targetTestNumber} Listening`}
                </span>
              </div>
              <span className="shrink-0 flex items-center gap-1 font-bold text-[#0F1E33] group-hover:translate-x-1 transition-transform">
                <span>Select</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
              </span>
            </div>
          </button>

          {/* 2. Reading */}
          <button
            type="button"
            onClick={() => handleSelectModule('reading')}
            disabled={!assignedReadingTest}
            className="paper-card p-5 sm:p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[170px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                  {assignedReadingTest?.durationMinutes || 60} min
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  Academic Reading
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  3 passages · 40 questions · Official split layout
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#5B6B82]/15 flex items-center justify-between text-xs">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] uppercase font-bold text-[#5B6B82] block tracking-wider">
                  Assigned by Consultancy:
                </span>
                <span className="font-bold text-[#0F1E33] truncate block text-[11px]">
                  {assignedReadingTest?.title || `Cambridge ${targetBook} Test ${targetTestNumber} Reading`}
                </span>
              </div>
              <span className="shrink-0 flex items-center gap-1 font-bold text-[#0F1E33] group-hover:translate-x-1 transition-transform">
                <span>Select</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
              </span>
            </div>
          </button>

          {/* 3. Writing */}
          <button
            type="button"
            onClick={() => handleSelectModule('writing')}
            disabled={!assignedWritingTest}
            className="paper-card p-5 sm:p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[170px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PenTool className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                  {assignedWritingTest?.durationMinutes || 60} min
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  Academic Writing
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  Task 1 & Task 2 · Live word count & auto-save
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#5B6B82]/15 flex items-center justify-between text-xs">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] uppercase font-bold text-[#5B6B82] block tracking-wider">
                  Assigned by Consultancy:
                </span>
                <span className="font-bold text-[#0F1E33] truncate block text-[11px]">
                  {assignedWritingTest?.title || `Cambridge ${targetBook} Test ${targetTestNumber} Writing`}
                </span>
              </div>
              <span className="shrink-0 flex items-center gap-1 font-bold text-[#0F1E33] group-hover:translate-x-1 transition-transform">
                <span>Select</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
              </span>
            </div>
          </button>

          {/* 4. Full Mock Test (All 3 sets) */}
          <button
            type="button"
            onClick={() => handleSelectModule('full')}
            disabled={!assignedFullMock}
            className="paper-card p-5 sm:p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[170px] cursor-pointer border-2 border-[#C9A24B] bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#C9A24B] text-[#0F1E33] text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-bl-lg">
              Full 3-Set Mock
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 pr-14">
                  <span className="text-xs font-mono font-bold text-white bg-[#0F1E33] px-2 py-0.5 rounded">
                    {assignedFullMock?.totalDurationMinutes || 155} min
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors flex items-center gap-1.5">
                  <span>FULL MOCK TEST</span>
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  Listening → Reading → Writing complete sequence
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#C9A24B]/30 flex items-center justify-between text-xs">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] uppercase font-bold text-[#5B6B82] block tracking-wider">
                  Assigned by Consultancy:
                </span>
                <span className="font-bold text-[#0F1E33] truncate block text-[11px]">
                  {assignedFullMock?.title || `Cambridge ${targetBook} Test ${targetTestNumber} — Full Mock`}
                </span>
              </div>
              <span className="shrink-0 flex items-center gap-1 font-bold text-[#0F1E33] group-hover:translate-x-1 transition-transform">
                <span>Select</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
              </span>
            </div>
          </button>
        </div>

        {/* Footnote reassurance */}
        <div className="text-center text-[11px] text-[#5B6B82] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D4F]" />
          <span>Official Cambridge Academic CD-IELTS evaluation standards. Station results transmit live to consultancy radar.</span>
        </div>
      </div>
    </div>
  );
};

export default TestSelectionView;
