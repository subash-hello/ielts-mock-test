import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { ConsultancyService } from '../../services/consultancyService';
import type { TestResult } from '../../types/ielts';
import { formatAppTimestamp, formatTimeSpent } from '../../utils/formatters';
import { AIDiagnosticReportModal } from './AIDiagnosticReportModal';

interface PublicResultLookupViewProps {
  onBackToHub: () => void;
  initialCandidateId?: string;
}

export const PublicResultLookupView: React.FC<PublicResultLookupViewProps> = ({
  onBackToHub,
  initialCandidateId = '',
}) => {
  // Rule 10 & Section 10: Public result lookup starts with a BLANK field every visit and clears previous results
  const [candidateId, setCandidateId] = useState(initialCandidateId);
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedResults, setMatchedResults] = useState<TestResult[]>([]);
  const [selectedReportResult, setSelectedReportResult] = useState<TestResult | null>(null);

  useEffect(() => {
    // If an initialCandidateId was provided explicitly (e.g. from receipt), execute search once
    if (initialCandidateId.trim()) {
      executeSearch(initialCandidateId.trim());
    }
  }, [initialCandidateId]);

  const executeSearch = (queryId: string) => {
    const clean = queryId.trim();
    if (!clean) return;

    // Only return officially published results (QA-04: Withdrawn / unpublished records must be completely withheld)
    const all = ConsultancyService.getAllResultsAcrossConsultancies();
    const candidateEntries = all.filter(
      (r: TestResult) =>
        r.isPublished === true &&
        r.candidateId &&
        r.candidateId.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    setMatchedResults(candidateEntries);
    setHasSearched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(candidateId);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30">
      {/* Top Header */}
      <header className="bg-[#0F1E33] text-white px-4 sm:px-6 py-3 border-b border-[#5B6B82]/30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C9A24B] text-[#0F1E33] flex items-center justify-center font-bold text-sm">
              M
            </div>
            <div>
              <span className="font-display font-bold text-base text-white">
                Master IELTS AI
              </span>
              <span className="text-xs text-slate-400 block -mt-0.5">
                Official Result Verification Gateway
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToHub}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Hub</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Public Candidate Verification
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E33]">
            Look Up Examination Results
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B82] max-w-md mx-auto">
            Enter your official 6-digit Candidate Number issued during check-in to verify your score.
          </p>
        </div>

        {/* Search Input Box (Starts blank every visit - Rule 10) */}
        <div className="paper-card p-6 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#5B6B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
                placeholder="e.g. 004128"
                autoFocus
                required
                className="w-full min-h-[48px] pl-10 pr-4 py-2 bg-white border border-[#5B6B82]/30 rounded-[10px] text-sm font-mono font-bold text-[#0F1E33] placeholder-[#5B6B82]/40 focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
              />
            </div>
            <button
              type="submit"
              className="btn-texture min-h-[48px] px-6 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-sm font-semibold shadow-xs"
            >
              Verify Result →
            </button>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-4 animate-in fade-in">
            {matchedResults.length === 0 ? (
              <div className="paper-card p-8 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-[#C9A24B] mx-auto" />
                <h3 className="font-display text-base font-bold text-[#0F1E33]">
                  No Published Records Found
                </h3>
                <p className="text-xs text-[#5B6B82] max-w-sm mx-auto">
                  No published mock test records match candidate ID <span className="font-mono text-[#0F1E33]">#{candidateId}</span>. If you recently took an exam, results will appear here once officially published by your consultancy invigilator.
                </p>
              </div>
            ) : (
              matchedResults.map((res, i) => {
                const isPub = res.isPublished === true;
                const dateStr = formatAppTimestamp(res.completedAt);
                const timeStr = formatTimeSpent(res.timeTakenSeconds);
                const testTitle = `Cambridge ${res.book || 16} Test ${res.testNumber || 1} (${res.module})`;

                return (
                  <div
                    key={i}
                    className="paper-card p-6 space-y-4 border-l-4 border-l-[#C9A24B]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5B6B82]/15 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg font-bold text-[#0F1E33]">
                            {res.candidateName}
                          </h3>
                          <span className="text-xs font-mono text-[#5B6B82]">
                            #{res.candidateId}
                          </span>
                        </div>
                        <p className="text-xs text-[#5B6B82] mt-0.5">
                          {res.consultancyName || 'Authorized Examination Centre'}
                        </p>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {isPub ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#2E7D4F] text-xs font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Official Score Published</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Submitted · Pending Invigilator Release</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {isPub ? (
                      /* Published Scorecard View */
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3 bg-white border border-[#5B6B82]/15 rounded-xl">
                            <span className="text-[10px] text-[#5B6B82] uppercase font-bold block">
                              Overall Band
                            </span>
                            <span className="font-display text-2xl font-black text-[#0F1E33]">
                              {res.bandScore.toFixed(1)}
                            </span>
                          </div>

                          <div className="p-3 bg-white border border-[#5B6B82]/15 rounded-xl">
                            <span className="text-[10px] text-[#5B6B82] uppercase font-bold block">
                              Module
                            </span>
                            <span className="font-bold text-sm text-[#0F1E33] capitalize">
                              {res.module}
                            </span>
                          </div>

                          <div className="p-3 bg-white border border-[#5B6B82]/15 rounded-xl">
                            <span className="text-[10px] text-[#5B6B82] uppercase font-bold block">
                              Raw Score
                            </span>
                            <span className="font-mono font-bold text-sm text-[#2E7D4F]">
                              {res.module === 'writing' ? 'Examiner' : `${res.correctCount} / ${res.totalQuestions}`}
                            </span>
                          </div>

                          <div className="p-3 bg-white border border-[#5B6B82]/15 rounded-xl">
                            <span className="text-[10px] text-[#5B6B82] uppercase font-bold block">
                              Time Spent
                            </span>
                            <span className="font-mono text-sm text-[#0F1E33]">
                              {timeStr}
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 bg-white border border-[#5B6B82]/15 rounded-xl text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[#5B6B82]">Test Paper:</span>
                            <span className="font-bold text-[#0F1E33]">{testTitle}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#5B6B82]">Completed Date:</span>
                            <span className="font-mono text-[#0F1E33]">{dateStr}</span>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReportResult(res)}
                            className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                            <span>View Full AI Diagnostic Breakdown</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Pending release explanation */
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#5B6B82] space-y-2">
                        <p>
                          Your exam responses for <strong className="text-[#0F1E33]">{testTitle}</strong> were submitted on <span className="font-mono text-[#0F1E33]">{dateStr}</span>.
                        </p>
                        <p>
                          Under official examination lab guidelines, the score will be made visible on this portal once your consultancy invigilator verifies and publishes the session.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* AI Diagnostic Modal if selected */}
      {selectedReportResult && (
        <AIDiagnosticReportModal
          reportData={{
            studentName: selectedReportResult.candidateName || 'Candidate',
            candidateId: selectedReportResult.candidateId,
            bandScore: selectedReportResult.bandScore,
            module: selectedReportResult.module,
            testTitle: `Cambridge ${selectedReportResult.book || 16} Test ${selectedReportResult.testNumber || 1} (${selectedReportResult.module})`,
            book: selectedReportResult.book,
            testNumber: selectedReportResult.testNumber,
            correctCount: selectedReportResult.correctCount,
            totalQuestions: selectedReportResult.totalQuestions,
            timeTakenSeconds: selectedReportResult.timeTakenSeconds,
            completedAt: selectedReportResult.completedAt,
          }}
          consultancyName={selectedReportResult.consultancyName || 'Authorized Examination Centre'}
          onClose={() => setSelectedReportResult(null)}
        />
      )}
    </div>
  );
};
