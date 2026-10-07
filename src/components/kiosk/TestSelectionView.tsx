import React, { useState } from 'react';
import { Headphones, BookOpen, PenTool, Target, ChevronRight, ArrowLeft } from 'lucide-react';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';
import { allFullMockTests } from '../../data/mockTests';

interface TestSelectionViewProps {
  availableTests: IELTSMockTest[];
  studentName: string;
  stationName: string;
  onSelectTest: (test: IELTSMockTest, fullMock?: FullMockTest) => void;
  onBack: () => void;
}

export const TestSelectionView: React.FC<TestSelectionViewProps> = ({
  availableTests,
  studentName,
  stationName,
  onSelectTest,
  onBack,
}) => {
  const [selectedModule, setSelectedModule] = useState<'listening' | 'reading' | 'writing' | 'full' | null>(null);

  // Group tests by module
  const listeningTests = availableTests.filter((t) => t.module === 'listening');
  const readingTests = availableTests.filter((t) => t.module === 'reading');
  const writingTests = availableTests.filter((t) => t.module === 'writing');

  // Full tests built from available pool
  const fullTests = allFullMockTests.filter((fm) =>
    availableTests.some((t) => t.id === fm.readingTest.id) ||
    availableTests.some((t) => t.id === fm.listeningTest.id)
  );

  const handleCardClick = (mod: 'listening' | 'reading' | 'writing' | 'full') => {
    setSelectedModule(mod);

    // If only 1 test in this module or user picks direct, we can either prompt specific test or pick the primary assigned test
    if (mod === 'listening' && listeningTests.length === 1) {
      onSelectTest(listeningTests[0]);
    } else if (mod === 'reading' && readingTests.length === 1) {
      onSelectTest(readingTests[0]);
    } else if (mod === 'writing' && writingTests.length === 1) {
      onSelectTest(writingTests[0]);
    } else if (mod === 'full' && fullTests.length === 1) {
      onSelectTest(fullTests[0].listeningTest, fullTests[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#C9A24B]/30">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-[#5B6B82] hover:text-[#0F1E33] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change Name</span>
          </button>
          <div className="text-right">
            <span className="text-xs font-mono font-semibold text-[#0F1E33]">{stationName}</span>
            <span className="text-xs text-[#5B6B82]"> · {studentName}</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Section Selection
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E33]">
            Choose your test
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Only tests assigned to you by your consultancy appear here.
          </p>
        </div>

        {/* Four Large Cards (Blueprint 6.3: L | R | W | Full) */}
        {!selectedModule ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Listening */}
            <button
              type="button"
              onClick={() => handleCardClick('listening')}
              disabled={listeningTests.length === 0}
              className="paper-card p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[140px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                  30 min
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  Listening
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  4 parts · 40 questions · Audio stream
                </p>
              </div>
            </button>

            {/* 2. Reading */}
            <button
              type="button"
              onClick={() => handleCardClick('reading')}
              disabled={readingTests.length === 0}
              className="paper-card p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[140px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                  60 min
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  Reading
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  3 passages · 40 questions · Book serif
                </p>
              </div>
            </button>

            {/* 3. Writing */}
            <button
              type="button"
              onClick={() => handleCardClick('writing')}
              disabled={writingTests.length === 0}
              className="paper-card p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[140px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PenTool className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                  60 min
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                  Writing
                </h3>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  Task 1 & Task 2 · Live word count
                </p>
              </div>
            </button>

            {/* 4. Full Test */}
            <button
              type="button"
              onClick={() => handleCardClick('full')}
              disabled={fullTests.length === 0}
              className="paper-card p-6 text-left hover:border-[#0F1E33] transition group flex flex-col justify-between min-h-[140px] cursor-pointer border-[#C9A24B]/40 bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-white bg-[#0F1E33] px-2 py-0.5 rounded">
                  2h 45m
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                    FULL TEST
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#C9A24B]/15 px-1.5 py-0.5 rounded">
                    Official
                  </span>
                </div>
                <p className="text-xs text-[#5B6B82] mt-0.5">
                  Listening → Reading → Writing back-to-back
                </p>
              </div>
            </button>
          </div>
        ) : (
          /* Specific Paper Selector within chosen module */
          <div className="paper-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <h3 className="font-display text-base font-bold text-[#0F1E33] capitalize">
                Select {selectedModule === 'full' ? 'Full Mock Test' : `${selectedModule} Test`} Paper
              </h3>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-xs text-[#5B6B82] hover:text-[#0F1E33] underline"
              >
                ← Back to 4 sections
              </button>
            </div>

            <div className="divide-y divide-[#5B6B82]/10 max-h-[360px] overflow-y-auto">
              {selectedModule === 'full'
                ? fullTests.map((ft) => (
                    <button
                      key={ft.id}
                      type="button"
                      onClick={() => onSelectTest(ft.listeningTest, ft)}
                      className="w-full py-3.5 px-3 text-left hover:bg-white rounded-lg flex items-center justify-between transition min-h-[48px]"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#0F1E33]">{ft.title}</div>
                        <div className="text-xs text-[#5B6B82]">
                          Cambridge {ft.book} · Listening, Reading & Writing
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#5B6B82]" />
                    </button>
                  ))
                : (selectedModule === 'listening'
                    ? listeningTests
                    : selectedModule === 'reading'
                    ? readingTests
                    : writingTests
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectTest(t)}
                      className="w-full py-3.5 px-3 text-left hover:bg-white rounded-lg flex items-center justify-between transition min-h-[48px]"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#0F1E33]">{t.title}</div>
                        <div className="text-xs text-[#5B6B82]">
                          Cambridge {t.book} Test {t.testNumber} · {t.durationMinutes} minutes
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#5B6B82]" />
                    </button>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
