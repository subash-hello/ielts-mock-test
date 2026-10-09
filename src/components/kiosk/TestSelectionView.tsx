import React from 'react';
import {
  Headphones,
  BookOpen,
  PenTool,
  Target,
  ArrowLeft,
  Building2,
  ArrowRight,
  ShieldCheck
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
  // Retrieve the active module test IDs configured by the consultancy
  const activeModuleTests = consultancy
    ? ConsultancyService.getActiveModuleTests(consultancy.id)
    : {
        listening: 'cambridge-16-test-1-listening',
        reading: 'cambridge-16-test-1-reading',
        writing: 'cambridge-16-test-1-writing',
        full: 'cambridge-16-test-1-full',
      };

  // Resolve assigned test papers given by the consultancy
  const assignedListeningTest =
    availableTests.find((t) => t.id === activeModuleTests.listening) ||
    allMockTests.find((t) => t.id === activeModuleTests.listening) ||
    availableTests.find((t) => t.module === 'listening') ||
    allMockTests.find((t) => t.module === 'listening');

  const assignedReadingTest =
    availableTests.find((t) => t.id === activeModuleTests.reading) ||
    allMockTests.find((t) => t.id === activeModuleTests.reading) ||
    availableTests.find((t) => t.module === 'reading') ||
    allMockTests.find((t) => t.module === 'reading');

  const assignedWritingTest =
    availableTests.find((t) => t.id === activeModuleTests.writing) ||
    allMockTests.find((t) => t.id === activeModuleTests.writing) ||
    availableTests.find((t) => t.module === 'writing') ||
    allMockTests.find((t) => t.module === 'writing');

  const assignedFullMock =
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

        {/* Title & Guidance */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 text-[#0F1E33] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Module Selection Only</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F1E33] tracking-tight">
            Choose Examination Module
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B82] max-w-lg mx-auto leading-relaxed">
            Select the module you wish to sit for. The specific official exam test paper is determined and assigned by your consultancy{consultancy?.name ? ` (${consultancy.name})` : ''}.
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
                  {assignedListeningTest?.title || 'Cambridge Academic Listening'}
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
                  {assignedReadingTest?.title || 'Cambridge Academic Reading'}
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
                  {assignedWritingTest?.title || 'Cambridge Academic Writing'}
                </span>
              </div>
              <span className="shrink-0 flex items-center gap-1 font-bold text-[#0F1E33] group-hover:translate-x-1 transition-transform">
                <span>Select</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
              </span>
            </div>
          </button>

          {/* 4. Full Mock Test */}
          <button
            type="button"
            onClick={() => handleSelectModule('full')}
            disabled={!assignedFullMock}
            className="paper-card p-5 sm:p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[170px] cursor-pointer border-[#C9A24B]/40 bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#C9A24B]/15 px-1.5 py-0.5 rounded">
                    Official
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-[#0F1E33] px-2 py-0.5 rounded">
                    {assignedFullMock?.totalDurationMinutes || 165} min
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  FULL MOCK TEST
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  Listening → Reading → Writing complete sequence
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#5B6B82]/15 flex items-center justify-between text-xs">
              <div className="overflow-hidden pr-2">
                <span className="text-[10px] uppercase font-bold text-[#5B6B82] block tracking-wider">
                  Assigned by Consultancy:
                </span>
                <span className="font-bold text-[#0F1E33] truncate block text-[11px]">
                  {assignedFullMock?.title || 'Cambridge Full Mock'}
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
          <span>Computer-delivered exam standards. All test contents authenticated by Cambridge Academic materials.</span>
        </div>
      </div>
    </div>
  );
};

export default TestSelectionView;
