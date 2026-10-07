import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  RotateCcw
} from 'lucide-react';
import type { Consultancy, SavedAIReport } from '../../types/consultancy';
import { formatAppTimestamp, formatTimeSpent } from '../../utils/formatters';
import { AIDiagnosticReportModal } from '../results/AIDiagnosticReportModal';

interface AIReportsViewProps {
  consultancy: Consultancy;
  reports: SavedAIReport[];
  onRefresh: () => void;
}

export const AIReportsView: React.FC<AIReportsViewProps> = ({
  consultancy,
  reports,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<SavedAIReport | null>(null);

  const filtered = reports.filter(
    (r) =>
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.candidateId.toLowerCase().includes(search.toLowerCase()) ||
      (r.testTitle && r.testTitle.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            AI Diagnostic Evaluation
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Candidate Diagnostic Reports
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Deep diagnostic skill breakdowns and CEFR benchmark analyses powered by Master IELTS AI
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="btn-texture inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#5B6B82]/30 text-xs font-semibold text-[#0F1E33] hover:border-[#C9A24B]"
          title="Reload AI reports list"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#5B6B82]" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm w-full">
        <Search className="w-4 h-4 text-[#5B6B82] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student or candidate ID..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
        />
      </div>

      {/* Reports Grid */}
      {filtered.length === 0 ? (
        <div className="paper-card p-12 text-center text-[#5B6B82] space-y-2">
          <p className="text-sm">No diagnostic reports generated yet.</p>
          <p className="text-xs">
            Completed candidate exam submissions automatically generate full AI diagnostic reports.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((rep, idx) => {
            const timeStr = formatTimeSpent(rep.timeTakenSeconds);
            const dateStr = formatAppTimestamp(rep.completedAt);

            return (
              <div
                key={rep.id || idx}
                className="paper-card p-5 space-y-4 hover:border-[#0F1E33] transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#0F1E33]">
                        {rep.studentName}
                      </h3>
                      <span className="text-[11px] font-mono text-[#5B6B82]">
                        Candidate #{rep.candidateId}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-base text-[#0F1E33] bg-[#C9A24B]/15 px-2.5 py-0.5 rounded">
                      Band {rep.bandScore.toFixed(1)}
                    </span>
                  </div>

                  {/* Exact Test Identity (Blueprint Rule 2: never generic) */}
                  <div className="text-xs font-semibold text-[#0F1E33] bg-white p-2 rounded-lg border border-[#5B6B82]/15">
                    {rep.testTitle}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-[11px] text-[#5B6B82] block">Raw Score</span>
                      <span className="font-mono font-bold text-[#2E7D4F]">
                        {rep.correctCount} / {rep.totalQuestions}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#5B6B82] block">Time Spent</span>
                      <span className="font-mono text-[#0F1E33]">{timeStr}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#5B6B82]/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#5B6B82]">{dateStr}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedReport(rep)}
                    className="btn-texture px-3 py-1.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>View Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Diagnostic Modal */}
      {selectedReport && (
        <AIDiagnosticReportModal
          reportData={{
            studentName: selectedReport.studentName,
            candidateId: selectedReport.candidateId,
            bandScore: selectedReport.bandScore,
            module: selectedReport.module,
            testTitle: selectedReport.testTitle,
            correctCount: selectedReport.correctCount,
            totalQuestions: selectedReport.totalQuestions,
            timeTakenSeconds: selectedReport.timeTakenSeconds,
            completedAt: selectedReport.completedAt,
          }}
          consultancyName={consultancy.name}
          branchName={consultancy.branch}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
