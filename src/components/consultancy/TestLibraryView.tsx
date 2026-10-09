import React, { useState } from 'react';
import { Headphones, BookOpen, PenTool, Target, CheckCircle2, Star } from 'lucide-react';
import type { Consultancy } from '../../types/consultancy';
import type { IELTSMockTest } from '../../types/ielts';
import { allFullMockTests } from '../../data/mockTests';
import { ConsultancyService } from '../../services/consultancyService';

interface TestLibraryViewProps {
  consultancy: Consultancy;
  tests: IELTSMockTest[];
  onRefresh: () => void;
}

export const TestLibraryView: React.FC<TestLibraryViewProps> = ({
  consultancy,
  tests,
  onRefresh,
}) => {
  const [selectedBook, setSelectedBook] = useState<number | 'all'>('all');
  const [selectedModule, setSelectedModule] = useState<'all' | 'reading' | 'listening' | 'writing'>('all');

  const activeModules = ConsultancyService.getActiveModuleTests(consultancy.id);
  const assignedSet = new Set(consultancy.assignedTestIds || tests.map((t) => t.id));

  const books = Array.from(new Set(tests.map((t) => t.book))).sort((a, b) => b - a);

  const filtered = tests.filter((t) => {
    if (selectedBook !== 'all' && t.book !== selectedBook) return false;
    if (selectedModule !== 'all' && t.module !== selectedModule) return false;
    return true;
  });

  const handleToggleTest = (testId: string) => {
    let currentAssigned = consultancy.assignedTestIds ? [...consultancy.assignedTestIds] : tests.map((t) => t.id);
    if (currentAssigned.includes(testId)) {
      currentAssigned = currentAssigned.filter((id) => id !== testId);
    } else {
      currentAssigned.push(testId);
    }

    ConsultancyService.updateConsultancy(consultancy.id, {
      assignedTestIds: currentAssigned,
    });
    onRefresh();
  };

  const handleSetModuleActive = (module: 'listening' | 'reading' | 'writing' | 'full', testId: string) => {
    ConsultancyService.setActiveModuleTest(consultancy.id, module, testId);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Authentic Cambridge Test Catalog
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Test Library & Module Assignments
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Students at lab workstations choose their exam module only. The specific official Cambridge test papers below are given by your consultancy.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#0F1E33] bg-white px-3 py-1.5 rounded-lg border border-[#5B6B82]/20">
          Enabled: {assignedSet.size} / {tests.length} tests
        </div>
      </div>

      {/* Active Module Assignments (Rule: Student chooses module only, test given by consultancy) */}
      <div className="paper-card p-5 sm:p-6 border-2 border-[#C9A24B]/40 bg-white space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5B6B82]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-display text-base font-bold text-[#0F1E33]">
              Active Test Assignments Given to Students
            </h2>
          </div>
          <span className="text-[11px] text-[#5B6B82]">
            Students choose module only; the assigned test paper below starts automatically.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Listening Assignment */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#5B6B82]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
              <Headphones className="w-4 h-4 text-[#C9A24B]" />
              <span>Academic Listening</span>
            </div>
            <select
              value={activeModules.listening || ''}
              onChange={(e) => handleSetModuleActive('listening', e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-white border border-[#5B6B82]/30 rounded-lg outline-none focus:border-[#C9A24B] cursor-pointer"
            >
              {tests.filter((t) => t.module === 'listening').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#5B6B82] block truncate">
              Currently given: {tests.find((t) => t.id === activeModules.listening)?.title || 'Cambridge 16 Test 1'}
            </span>
          </div>

          {/* Reading Assignment */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#5B6B82]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
              <BookOpen className="w-4 h-4 text-[#C9A24B]" />
              <span>Academic Reading</span>
            </div>
            <select
              value={activeModules.reading || ''}
              onChange={(e) => handleSetModuleActive('reading', e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-white border border-[#5B6B82]/30 rounded-lg outline-none focus:border-[#C9A24B] cursor-pointer"
            >
              {tests.filter((t) => t.module === 'reading').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#5B6B82] block truncate">
              Currently given: {tests.find((t) => t.id === activeModules.reading)?.title || 'Cambridge 16 Test 1'}
            </span>
          </div>

          {/* Writing Assignment */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#5B6B82]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
              <PenTool className="w-4 h-4 text-[#C9A24B]" />
              <span>Academic Writing</span>
            </div>
            <select
              value={activeModules.writing || ''}
              onChange={(e) => handleSetModuleActive('writing', e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-white border border-[#5B6B82]/30 rounded-lg outline-none focus:border-[#C9A24B] cursor-pointer"
            >
              {tests.filter((t) => t.module === 'writing').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#5B6B82] block truncate">
              Currently given: {tests.find((t) => t.id === activeModules.writing)?.title || 'Cambridge 16 Test 1'}
            </span>
          </div>

          {/* Full Mock Assignment */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#5B6B82]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
              <Target className="w-4 h-4 text-[#C9A24B]" />
              <span>Full Mock Exam</span>
            </div>
            <select
              value={activeModules.full || ''}
              onChange={(e) => handleSetModuleActive('full', e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-white border border-[#5B6B82]/30 rounded-lg outline-none focus:border-[#C9A24B] cursor-pointer"
            >
              {allFullMockTests.map((fm) => (
                <option key={fm.id} value={fm.id}>
                  {fm.title}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#5B6B82] block truncate">
              Currently given: {allFullMockTests.find((fm) => fm.id === activeModules.full)?.title || 'Cambridge 16 Test 1 Full Mock'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedBook('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              selectedBook === 'all'
                ? 'border-[#0F1E33] bg-[#0F1E33] text-white'
                : 'border-[#5B6B82]/20 bg-white text-[#5B6B82] hover:bg-slate-50'
            }`}
          >
            All Books
          </button>
          {books.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBook(b)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                selectedBook === b
                  ? 'border-[#0F1E33] bg-[#0F1E33] text-white'
                  : 'border-[#5B6B82]/20 bg-white text-[#5B6B82] hover:bg-slate-50'
              }`}
            >
              C{b}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'reading', 'listening', 'writing'] as const).map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => setSelectedModule(mod)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border capitalize transition ${
                selectedModule === mod
                  ? 'border-[#0F1E33] bg-[#0F1E33] text-white'
                  : 'border-[#5B6B82]/20 bg-white text-[#5B6B82] hover:bg-slate-50'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Test List Table */}
      <div className="paper-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/60 border-b border-[#5B6B82]/15 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Test Title</th>
                <th className="py-3 px-4">Book</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Questions / Duration</th>
                <th className="py-3 px-4 text-center">Active Module Status</th>
                <th className="py-3 px-4 text-right">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B6B82]/10">
              {filtered.map((t) => {
                const isEnabled = assignedSet.has(t.id);
                const isActiveForModule =
                  (t.module === 'listening' && activeModules.listening === t.id) ||
                  (t.module === 'reading' && activeModules.reading === t.id) ||
                  (t.module === 'writing' && activeModules.writing === t.id);

                return (
                  <tr key={t.id} className={`hover:bg-white/60 transition ${isActiveForModule ? 'bg-amber-50/40' : ''}`}>
                    <td className="py-3.5 px-4 font-bold text-[#0F1E33]">
                      <div className="flex items-center gap-2">
                        {isActiveForModule && <Star className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]" />}
                        <span>{t.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#5B6B82]">
                      Cambridge {t.book}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize font-semibold text-[#0F1E33]">
                        {t.module}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#5B6B82]">
                      {t.module === 'writing' ? '2 Tasks' : '40 Questions'} · {t.durationMinutes} min
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isActiveForModule ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Given to Students</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetModuleActive(t.module, t.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-[#C9A24B]/15 text-slate-700 hover:text-[#0F1E33] border border-slate-200 transition cursor-pointer"
                        >
                          Give to Students
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleTest(t.id)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                          isEnabled
                            ? 'bg-[#2E7D4F]/15 text-[#2E7D4F] border border-[#2E7D4F]/30 hover:bg-[#2E7D4F]/25'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {isEnabled ? 'Enabled ✓' : 'Hidden'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
