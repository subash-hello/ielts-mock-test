import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Sparkles,
  Trash2,
  FileText,
  X,
  PenTool,
  Clock,
  AlertCircle,
  Check
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
  initialFilter?: 'all' | 'published' | 'submitted' | 'writing_pending';
  initialWritingModalResult?: TestResult | null;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  consultancy,
  results,
  onOpenAIDiagnostic,
  onRefresh,
  initialFilter = 'all',
  initialWritingModalResult = null,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'submitted' | 'writing_pending'>(initialFilter);
  const [selectedScorecard, setSelectedScorecard] = useState<TestResult | null>(null);

  // Writing Evaluation Modal state
  const [writingModalResult, setWritingModalResult] = useState<TestResult | null>(initialWritingModalResult);
  const [writingGradeForm, setWritingGradeForm] = useState<{
    task1Band: number;
    task2Band: number;
    overallWritingBand: number;
    isManualOverride: boolean;
    adminFeedback: string;
    reviewedBy: string;
  }>({
    task1Band: 6.0,
    task2Band: 6.0,
    overallWritingBand: 6.0,
    isManualOverride: false,
    adminFeedback: '',
    reviewedBy: 'Academic Examiner'
  });

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

  useEffect(() => {
    if (initialFilter) {
      setStatusFilter(initialFilter);
    }
  }, [initialFilter]);

  useEffect(() => {
    if (initialWritingModalResult) {
      handleOpenWritingGradeModal(initialWritingModalResult);
    }
  }, [initialWritingModalResult]);

  const isWritingTest = (r: TestResult) => r.module === 'writing' || !!r.writingSubmission;
  const isUngradedWriting = (r: TestResult) =>
    isWritingTest(r) && (!r.writingSubmission?.overallWritingBand || r.writingSubmission.overallWritingBand === 0);

  const pendingWritingCount = results.filter(isUngradedWriting).length;
  const publishedCount = results.filter((r) => r.isPublished === true).length;
  const pendingReleaseCount = results.filter((r) => !r.isPublished).length;

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
    if (statusFilter === 'writing_pending') return isUngradedWriting(r);
    return true;
  });

  // Open writing grading modal
  const handleOpenWritingGradeModal = (res: TestResult) => {
    const sub = res.writingSubmission;
    const t1 = sub?.task1Band ?? 6.0;
    const t2 = sub?.task2Band ?? 6.0;
    const calculatedOverall = Math.round(((t1 + 2 * t2) / 3) * 2) / 2;
    const overall = sub?.overallWritingBand || calculatedOverall;

    setWritingGradeForm({
      task1Band: t1,
      task2Band: t2,
      overallWritingBand: overall,
      isManualOverride: sub?.overallWritingBand !== undefined && sub.overallWritingBand !== calculatedOverall,
      adminFeedback: sub?.adminFeedback || '',
      reviewedBy: sub?.reviewedBy || 'Academic Examiner'
    });
    setWritingModalResult(res);
  };

  // Save Writing Grade
  const handleSaveWritingGrade = (publishImmediately: boolean) => {
    if (!writingModalResult) return;

    ConsultancyService.gradeWritingSubmission(
      consultancy.id,
      writingModalResult.testId || '',
      writingModalResult.candidateId || '',
      writingModalResult.completedAt,
      {
        task1Band: writingGradeForm.task1Band,
        task2Band: writingGradeForm.task2Band,
        overallWritingBand: writingGradeForm.overallWritingBand,
        adminFeedback: writingGradeForm.adminFeedback.trim(),
        reviewedBy: writingGradeForm.reviewedBy.trim() || 'Academic Examiner'
      },
      publishImmediately
    );

    setWritingModalResult(null);
    onRefresh();
  };

  // Toggle publish state
  const handleTogglePublish = (res: TestResult) => {
    const isCurrentlyPublished = res.isPublished === true;

    // Guard: Do not allow publishing ungraded writing tests directly without grading
    if (!isCurrentlyPublished && isUngradedWriting(res)) {
      setConfirmModalConfig({
        isOpen: true,
        title: 'Writing Assessment Requires Grading',
        message: `This Writing test for ${res.candidateName || 'Candidate'} has not been graded yet. Would you like to evaluate and assign the band score now before publishing?`,
        isDestructive: false,
        onConfirm: () => {
          setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }));
          handleOpenWritingGradeModal(res);
        },
      });
      return;
    }

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
    <div className="space-y-6 font-ui">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Official Results Directory
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Test Submissions &amp; Scorecards
          </h1>
          <p className="text-xs text-[#5B6B82]">
            {results.length} total exam papers · Single source of truth for scores and reports
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white border border-[#5B6B82]/20 p-1 rounded-lg">
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
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              statusFilter === 'submitted'
                ? 'bg-slate-700 text-white'
                : 'text-[#5B6B82] hover:text-[#0F1E33]'
            }`}
          >
            Pending Release ({pendingReleaseCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('writing_pending')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition flex items-center gap-1.5 ${
              statusFilter === 'writing_pending'
                ? 'bg-[#C9A24B] text-[#0F1E33] shadow-xs'
                : pendingWritingCount > 0
                ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                : 'text-[#5B6B82] hover:text-[#0F1E33]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-amber-600" />
            <span>Writing to Grade ({pendingWritingCount})</span>
          </button>
        </div>
      </div>

      {/* Writing Pending Alert Banner (if any) */}
      {pendingWritingCount > 0 && statusFilter !== 'writing_pending' && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded-md bg-amber-200 text-amber-900">
              <PenTool className="w-4 h-4" />
            </span>
            <span className="font-semibold text-amber-950">
              {pendingWritingCount} Writing test submission{pendingWritingCount > 1 ? 's' : ''} require manual examiner band grading.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setStatusFilter('writing_pending')}
            className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
          >
            Filter Writing Submissions →
          </button>
        </div>
      )}

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
                    No test results found matching current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((res, i) => {
                  const testTitle = `Cambridge ${res.book || 16} Test ${res.testNumber || 1} (${res.module})`;
                  const timeSpentStr = formatTimeSpent(res.timeTakenSeconds);
                  const timestampStr = formatAppTimestamp(res.completedAt);
                  const isWriting = isWritingTest(res);
                  const isUngraded = isUngradedWriting(res);

                  return (
                    <tr key={`${res.candidateId}-${res.testId}-${i}`} className="hover:bg-white/60 transition">
                      {/* Candidate */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0F1E33]">{res.candidateName || 'Candidate'}</div>
                        <div className="text-[11px] text-[#5B6B82] font-mono">#{res.candidateId}</div>
                      </td>

                      {/* Exact Test Identity (Blueprint Rule 2: never generic) */}
                      <td className="py-3.5 px-4 font-semibold text-[#0F1E33]">
                        <div className="flex items-center gap-1.5">
                          {isWriting && <PenTool className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />}
                          <span>{testTitle}</span>
                        </div>
                      </td>

                      {/* Band Score */}
                      <td className="py-3.5 px-4">
                        {isUngraded ? (
                          <button
                            type="button"
                            onClick={() => handleOpenWritingGradeModal(res)}
                            className="inline-flex items-center gap-1.5 font-mono font-bold text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1 rounded-md transition cursor-pointer shadow-2xs"
                            title="Click to evaluate and award writing band score"
                          >
                            <PenTool className="w-3 h-3 text-amber-700" />
                            <span>Needs Grade</span>
                          </button>
                        ) : (
                          <div className="flex flex-col">
                            <span className="font-mono font-bold text-sm text-[#0F1E33] bg-[#C9A24B]/15 px-2.5 py-0.5 rounded-md w-fit">
                              Band {res.bandScore > 0 ? res.bandScore.toFixed(1) : '—'}
                            </span>
                            {isWriting && res.writingSubmission?.overallWritingBand ? (
                              <span className="text-[10px] text-[#5B6B82] font-mono mt-0.5">
                                T1: {res.writingSubmission.task1Band?.toFixed(1) ?? '—'} · T2: {res.writingSubmission.task2Band?.toFixed(1) ?? '—'}
                              </span>
                            ) : null}
                          </div>
                        )}
                      </td>

                      {/* Raw count */}
                      <td className="py-3.5 px-4 font-mono text-[#5B6B82]">
                        {isWriting ? (
                          <div className="text-[11px]">
                            <span>T1: {res.writingSubmission?.task1WordCount || 0}w</span>
                            <span className="mx-1 text-slate-300">•</span>
                            <span>T2: {res.writingSubmission?.task2WordCount || 0}w</span>
                          </div>
                        ) : (
                          `${res.correctCount || 0} / ${res.totalQuestions || 40}`
                        )}
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
                        {isUngraded ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Awaiting Examiner</span>
                          </span>
                        ) : res.isPublished ? (
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
                          {/* Writing Grading Button */}
                          {isWriting && (
                            <button
                              type="button"
                              onClick={() => handleOpenWritingGradeModal(res)}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition shadow-xs ${
                                isUngraded
                                  ? 'bg-[#C9A24B] hover:bg-[#B8923A] text-[#0F1E33] ring-1 ring-[#C9A24B]/60'
                                  : 'bg-slate-100 hover:bg-slate-200 text-[#0F1E33] border border-slate-300'
                              }`}
                              title={isUngraded ? 'Grade candidate writing essays' : 'Edit examiner evaluation'}
                            >
                              <PenTool className="w-3 h-3 text-[#0F1E33]" />
                              <span>{isUngraded ? 'Grade Writing' : 'Edit Grade'}</span>
                            </button>
                          )}

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

      {/* WRITING EVALUATION & MANUAL GRADING MODAL */}
      {writingModalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F1E33]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF8F3] border border-[#5B6B82]/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#0F1E33]">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#5B6B82]/20 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center shrink-0">
                  <PenTool className="w-5 h-5 text-[#0F1E33]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
                      Academic Examiner Portal
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-700">
                      Station: {writingModalResult.stationName || 'Lab PC'}
                    </span>
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-black text-[#0F1E33] leading-tight">
                    Evaluate IELTS Writing Submission: {writingModalResult.candidateName} (#{writingModalResult.candidateId})
                  </h2>
                  <p className="text-xs text-[#5B6B82] mt-0.5">
                    Cambridge {writingModalResult.book || 16} Test {writingModalResult.testNumber || 1} Writing • Submitted {formatAppTimestamp(writingModalResult.completedAt)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWritingModalResult(null)}
                className="p-1.5 rounded-lg text-[#5B6B82] hover:text-[#0F1E33] hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Protocol Banner */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 sm:p-4 text-xs text-amber-950 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Official IELTS Marking Protocol:</strong> IELTS Writing is evaluated manually across four criteria: Task Achievement/Response, Coherence &amp; Cohesion, Lexical Resource, and Grammatical Range &amp; Accuracy. <strong>Task 2 carries double the weight of Task 1:</strong> Overall Band = <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">((T1 + 2×T2) / 3)</code>, rounded to the nearest half band.
                </p>
              </div>

              {/* Task 1 Section */}
              <div className="border border-[#5B6B82]/20 rounded-2xl p-4 sm:p-5 bg-white space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#5B6B82]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0F1E33]">Task 1 Response (Report / Summary / Letter)</span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        (writingModalResult.writingSubmission?.task1WordCount || 0) >= 150
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}
                    >
                      {writingModalResult.writingSubmission?.task1WordCount || 0} words (Min: 150)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="font-bold text-[#0F1E33]">Task 1 Band Score:</label>
                    <select
                      value={writingGradeForm.task1Band}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const calculatedOverall = Math.round(((val + 2 * writingGradeForm.task2Band) / 3) * 2) / 2;
                        setWritingGradeForm((prev) => ({
                          ...prev,
                          task1Band: val,
                          overallWritingBand: prev.isManualOverride ? prev.overallWritingBand : calculatedOverall
                        }));
                      }}
                      className="bg-white border-2 border-[#C9A24B] font-mono font-bold text-[#0F1E33] rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#C9A24B] cursor-pointer"
                    >
                      {[0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((b) => (
                        <option key={b} value={b}>Band {b.toFixed(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-[#FAF8F3] border border-[#5B6B82]/15 rounded-xl p-4 max-h-52 overflow-y-auto whitespace-pre-wrap font-sans text-xs text-[#0F1E33] leading-relaxed select-text">
                  {writingModalResult.writingSubmission?.task1Essay || (
                    <span className="text-[#5B6B82] italic">No essay response text recorded for Task 1.</span>
                  )}
                </div>
              </div>

              {/* Task 2 Section */}
              <div className="border border-[#5B6B82]/20 rounded-2xl p-4 sm:p-5 bg-white space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#5B6B82]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0F1E33]">Task 2 Response (Discursive Essay)</span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        (writingModalResult.writingSubmission?.task2WordCount || 0) >= 250
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}
                    >
                      {writingModalResult.writingSubmission?.task2WordCount || 0} words (Min: 250)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="font-bold text-[#0F1E33]">Task 2 Band Score:</label>
                    <select
                      value={writingGradeForm.task2Band}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const calculatedOverall = Math.round(((writingGradeForm.task1Band + 2 * val) / 3) * 2) / 2;
                        setWritingGradeForm((prev) => ({
                          ...prev,
                          task2Band: val,
                          overallWritingBand: prev.isManualOverride ? prev.overallWritingBand : calculatedOverall
                        }));
                      }}
                      className="bg-white border-2 border-[#C9A24B] font-mono font-bold text-[#0F1E33] rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#C9A24B] cursor-pointer"
                    >
                      {[0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((b) => (
                        <option key={b} value={b}>Band {b.toFixed(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-[#FAF8F3] border border-[#5B6B82]/15 rounded-xl p-4 max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-xs text-[#0F1E33] leading-relaxed select-text">
                  {writingModalResult.writingSubmission?.task2Essay || (
                    <span className="text-[#5B6B82] italic">No essay response text recorded for Task 2.</span>
                  )}
                </div>
              </div>

              {/* Overall Band Calculation & Feedback Section */}
              <div className="bg-emerald-50/60 border border-emerald-300/80 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                      Awarded Overall Writing Band Score
                    </span>
                    <p className="text-[11px] text-emerald-800">
                      Standard Formula: (Task 1 + 2 × Task 2) / 3 = {(((writingGradeForm.task1Band + 2 * writingGradeForm.task2Band) / 3)).toFixed(2)} → Rounded to nearest 0.5 band.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white border border-emerald-400 px-3 py-1.5 rounded-xl">
                      <span className="text-xs font-bold text-slate-600">Band:</span>
                      <select
                        value={writingGradeForm.overallWritingBand}
                        onChange={(e) => {
                          setWritingGradeForm((prev) => ({
                            ...prev,
                            overallWritingBand: Number(e.target.value),
                            isManualOverride: true
                          }));
                        }}
                        className="font-mono text-xl font-black text-emerald-800 bg-transparent outline-none cursor-pointer"
                      >
                        {[0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((b) => (
                          <option key={b} value={b}>{b.toFixed(1)}</option>
                        ))}
                      </select>
                    </div>

                    {writingGradeForm.isManualOverride && (
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">
                        Manual Override Active
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Examiner Diagnostic Remarks &amp; Rubric Feedback:
                    </label>
                    <textarea
                      rows={3}
                      value={writingGradeForm.adminFeedback}
                      onChange={(e) => setWritingGradeForm({ ...writingGradeForm, adminFeedback: e.target.value })}
                      placeholder="e.g. Task 1 provides clear trend overview with appropriate factual data. Task 2 exhibits logical paragraph structure and clear central topic, though occasional modal verb slips occur."
                      className="w-full p-3 bg-white border border-[#5B6B82]/25 rounded-xl outline-none focus:border-[#C9A24B] text-xs text-[#0F1E33]"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="font-semibold text-slate-700 text-xs">Certified Examiner Name:</label>
                    <input
                      type="text"
                      value={writingGradeForm.reviewedBy}
                      onChange={(e) => setWritingGradeForm({ ...writingGradeForm, reviewedBy: e.target.value })}
                      placeholder="Academic Examiner"
                      className="px-3 py-1 bg-white border border-[#5B6B82]/25 rounded-lg text-xs font-medium text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#5B6B82]/20 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setWritingModalResult(null)}
                className="btn-texture px-4 py-2 border border-[#5B6B82]/30 bg-white hover:bg-slate-50 text-[#5B6B82] font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSaveWritingGrade(false)}
                  className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                >
                  Save Evaluation (Draft)
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveWritingGrade(true)}
                  className="btn-texture px-4 py-2 bg-[#2E7D4F] hover:bg-[#256841] text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save &amp; Publish Scorecard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  {selectedScorecard.bandScore > 0 ? selectedScorecard.bandScore.toFixed(1) : 'Ungraded (Pending)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5B6B82]">Raw / Submissions</span>
                <span className="font-mono font-bold text-[#2E7D4F]">
                  {selectedScorecard.module === 'writing'
                    ? `T1: ${selectedScorecard.writingSubmission?.task1WordCount || 0}w · T2: ${selectedScorecard.writingSubmission?.task2WordCount || 0}w`
                    : `${selectedScorecard.correctCount || 0} / ${selectedScorecard.totalQuestions || 40}`}
                </span>
              </div>
              {selectedScorecard.writingSubmission && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Task 1 Band:</span>
                    <span className="font-mono font-bold">{selectedScorecard.writingSubmission.task1Band?.toFixed(1) ?? '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Task 2 Band:</span>
                    <span className="font-mono font-bold">{selectedScorecard.writingSubmission.task2Band?.toFixed(1) ?? '—'}</span>
                  </div>
                  {selectedScorecard.writingSubmission.adminFeedback && (
                    <div className="pt-1 text-[11px] text-slate-600 border-t border-slate-200">
                      <strong>Remarks:</strong> {selectedScorecard.writingSubmission.adminFeedback}
                    </div>
                  )}
                </div>
              )}
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
              {isWritingTest(selectedScorecard) && (
                <button
                  type="button"
                  onClick={() => {
                    const sc = selectedScorecard;
                    setSelectedScorecard(null);
                    handleOpenWritingGradeModal(sc);
                  }}
                  className="btn-texture px-4 py-2 bg-[#C9A24B] hover:bg-[#B8923A] text-[#0F1E33] text-xs font-bold flex items-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Grade / Edit Writing</span>
                </button>
              )}
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
