import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Sparkles,
  Trash2,
  FileText,
  X
} from 'lucide-react';
import type { Consultancy } from '../../types/consultancy';
import type { TestResult } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { formatAppTimestamp, formatTimeSpent } from '../../utils/formatters';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface ResultsViewProps {
  consultancy: Consultancy;
  results: TestResult[];
  onOpenAIDiagnostic: (result: TestResult) => void;
  onRefresh: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  consultancy,
  results,
  onOpenAIDiagnostic,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'submitted'>('all');
  const [selectedScorecard, setSelectedScorecard] = useState<TestResult | null>(null);

  // Confirmation state for Publish / Withdraw / Delete (Rule 1)
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isDestructive: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    isDestructive: false,
    onConfirm: () => {},
  });

  const filtered = results.filter((r) => {
    const q = search.toLowerCase();
    const matchQ =
      (r.candidateName && r.candidateName.toLowerCase().includes(q)) ||
      (r.candidateId && r.candidateId.toLowerCase().includes(q)) ||
      (r.testId && r.testId.toLowerCase().includes(q)) ||
      `${r.book || ''}`.includes(q);

    if (!matchQ) return false;
    if (statusFilter === 'published') return r.isPublished === true;
    if (statusFilter === 'submitted') return !r.isPublished;
    return true;
  });

  // Toggle publish state
  const handleTogglePublish = (res: TestResult) => {
    const isCurrentlyPublished = res.isPublished === true;
    const actionText = isCurrentlyPublished ? 'Withdraw' : 'Publish';
    const msg = isCurrentlyPublished
      ? `Withdraw published result for ${res.candidateName}? It will no longer be visible in public lookup.`
      : `Publish test result for ${res.candidateName} (Candidate #${res.candidateId})? The candidate will be able to look up their official scorecard.`;

    setConfirmModalConfig({
      isOpen: true,
      title: `${actionText} Test Result?`,
      message: msg,
      isDestructive: isCurrentlyPublished,
      onConfirm: () => {
        ConsultancyService.setResultPublished(
          consultancy.id,
          res.candidateId || '',
          res.testId || '',
          !isCurrentlyPublished,
          res.completedAt
        );
        setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }));
        onRefresh();
      },
    });
  };

  // Delete result (Rule 1)
  const handleDeleteResult = (res: TestResult) => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Delete Test Result?',
      message: `Permanently delete this score record for ${res.candidateName} (${res.module} Test)? This cannot be undone.`,
      isDestructive: true,
      onConfirm: () => {
        ConsultancyService.deleteTestResult(
          consultancy.id,
          res.testId || '',
          res.candidateId,
          res.completedAt
        );
        setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }));
        onRefresh();
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Official Results Directory
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Test Submissions & Scorecards
          </h1>
          <p className="text-xs text-[#5B6B82]">
            {results.length} total exam papers · Single source of truth for scores and reports
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-white border border-[#5B6B82]/20 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              statusFilter === 'all'
                ? 'bg-[#0F1E33] text-white'
                : 'text-[#5B6B82] hover:text-[#0F1E33]'
            }`}
          >
            All ({results.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              statusFilter === 'published'
                ? 'bg-[#2E7D4F] text-white'
                : 'text-[#5B6B82] hover:text-[#0F1E33]'
            }`}
          >
            Published ({results.filter((r) => r.isPublished).length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              statusFilter === 'submitted'
                ? 'bg-[#C9A24B] text-white'
                : 'text-[#5B6B82] hover:text-[#0F1E33]'
            }`}
          >
            Pending ({results.filter((r) => !r.isPublished).length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm w-full">
        <Search className="w-4 h-4 text-[#5B6B82] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name or candidate ID..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
        />
      </div>

      {/* Results Table (Blueprint 6.10) */}
      <div className="paper-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/60 border-b border-[#5B6B82]/15 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Test Identity (Exact)</th>
                <th className="py-3 px-4">Band Score</th>
                <th className="py-3 px-4">Raw / Accuracy</th>
                <th className="py-3 px-4">Time Spent</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B6B82]/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#5B6B82]">
                    No test results found.
                  </td>
                </tr>
              ) : (
                filtered.map((res, i) => {
                  const testTitle = `Cambridge ${res.book || 16} Test ${res.testNumber || 1} (${res.module})`;
                  const timeSpentStr = formatTimeSpent(res.timeTakenSeconds);
                  const timestampStr = formatAppTimestamp(res.completedAt);

                  return (
                    <tr key={`${res.candidateId}-${res.testId}-${i}`} className="hover:bg-white/60 transition">
                      {/* Candidate */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0F1E33]">{res.candidateName || 'Candidate'}</div>
                        <div className="text-[11px] text-[#5B6B82] font-mono">#{res.candidateId}</div>
                      </td>

                      {/* Exact Test Identity (Blueprint Rule 2: never generic) */}
                      <td className="py-3.5 px-4 font-semibold text-[#0F1E33]">
                        {testTitle}
                      </td>

                      {/* Band Score */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-sm text-[#0F1E33] bg-[#C9A24B]/15 px-2.5 py-0.5 rounded-md">
                          Band {res.bandScore > 0 ? res.bandScore.toFixed(1) : '—'}
                        </span>
                      </td>

                      {/* Raw count */}
                      <td className="py-3.5 px-4 font-mono text-[#5B6B82]">
                        {res.module === 'writing'
                          ? 'Examiner / AI'
                          : `${res.correctCount || 0} / ${res.totalQuestions || 40}`}
                      </td>

                      {/* Time Spent (Blueprint Rule 8: single source of truth) */}
                      <td className="py-3.5 px-4 font-mono text-[#5B6B82]">
                        {timeSpentStr}
                      </td>

                      {/* Submitted timestamp (Blueprint 5.5: Oct 6, 2026 · 4:32 PM) */}
                      <td className="py-3.5 px-4 text-[11px] text-[#5B6B82]">
                        {timestampStr}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {res.isPublished ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D4F] bg-[#2E7D4F]/10 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                            Submitted
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Publish / Withdraw */}
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(res)}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded transition ${
                              res.isPublished
                                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                : 'bg-[#2E7D4F] text-white hover:bg-[#256841]'
                            }`}
                            title={res.isPublished ? 'Withdraw from public lookup' : 'Publish to candidate lookup'}
                          >
                            {res.isPublished ? 'Withdraw' : 'Publish'}
                          </button>

                          {/* AI Diagnostic Report */}
                          <button
                            type="button"
                            onClick={() => onOpenAIDiagnostic(res)}
                            className="p-1.5 text-[#C9A24B] hover:text-[#B8923A] rounded hover:bg-[#C9A24B]/10"
                            title="AI Diagnostic Report"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          {/* Detailed Scorecard */}
                          <button
                            type="button"
                            onClick={() => setSelectedScorecard(res)}
                            className="p-1.5 text-[#5B6B82] hover:text-[#0F1E33] rounded hover:bg-slate-200/50"
                            title="View Scorecard"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteResult(res)}
                            className="p-1.5 text-[#C0392B] hover:text-red-700 rounded hover:bg-red-50"
                            title="Delete Result"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scorecard Modal */}
      {selectedScorecard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-lg w-full p-6 space-y-4 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
                  Official IELTS Scorecard
                </span>
                <h3 className="font-display text-lg font-bold text-[#0F1E33]">
                  {selectedScorecard.candidateName} (#{selectedScorecard.candidateId})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScorecard(null)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#5B6B82]/15 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#5B6B82]">Test Paper</span>
                <span className="font-bold text-[#0F1E33]">
                  Cambridge {selectedScorecard.book} Test {selectedScorecard.testNumber} ({selectedScorecard.module})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5B6B82]">Band Score</span>
                <span className="font-display text-xl font-black text-[#0F1E33]">
                  {selectedScorecard.bandScore.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5B6B82]">Correct Answers</span>
                <span className="font-mono font-bold text-[#2E7D4F]">
                  {selectedScorecard.correctCount || 0} / {selectedScorecard.totalQuestions || 40}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5B6B82]">Time Spent</span>
                <span className="font-mono text-[#0F1E33]">
                  {formatTimeSpent(selectedScorecard.timeTakenSeconds)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5B6B82]">Completed Date</span>
                <span className="font-mono text-[#0F1E33]">
                  {formatAppTimestamp(selectedScorecard.completedAt)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedScorecard(null)}
                className="btn-texture px-4 py-2 bg-[#0F1E33] text-white text-xs font-bold"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalConfig.isOpen}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
        isDestructive={confirmModalConfig.isDestructive}
        confirmLabel={confirmModalConfig.isDestructive ? 'Confirm' : 'Publish'}
        onConfirm={confirmModalConfig.onConfirm}
        onCancel={() => setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
