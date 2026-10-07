import React, { useState } from 'react';
import type { Consultancy } from '../../types/consultancy';
import type { IELTSMockTest } from '../../types/ielts';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Authentic Cambridge Test Catalog
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Test Library & Student Visibility
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Toggle which Cambridge Academic tests are enabled for student self-selection in this branch. (Cambridge 16 includes Reading, Listening & Writing; Cambridge 18–21 contain full Reading & Listening test suites).
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#0F1E33] bg-white px-3 py-1.5 rounded-lg border border-[#5B6B82]/20">
          Enabled: {assignedSet.size} / {tests.length} tests
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
      <div className="paper-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/60 border-b border-[#5B6B82]/15 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Test Title</th>
                <th className="py-3 px-4">Book</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Questions / Duration</th>
                <th className="py-3 px-4 text-right">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B6B82]/10">
              {filtered.map((t) => {
                const isEnabled = assignedSet.has(t.id);

                return (
                  <tr key={t.id} className="hover:bg-white/60 transition">
                    <td className="py-3.5 px-4 font-bold text-[#0F1E33]">
                      {t.title}
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
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleTest(t.id)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
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
