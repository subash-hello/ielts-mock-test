import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  RotateCcw,
  Trash2
} from 'lucide-react';
import type { Consultancy, SavedAIReport } from '../../types/consultancy';
import { formatAppTimestamp, formatTimeSpent } from '../../utils/formatters';
import { AIDiagnosticReportModal } from '../results/AIDiagnosticReportModal';
import { ConsultancyService } from '../../services/consultancyService';

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
  const [deletingReport, setDeletingReport] = useState<SavedAIReport | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const handleDeleteConfirm = () => {
    if (!deletingReport) return;
    ConsultancyService.deleteReport(
      consultancy.id,
      deletingReport.testId,
      deletingReport.candidateId,
      deletingReport.completedAt
    );
    setDeletingReport(null);
    onRefresh();
  };

  const handleDeleteAllConfirm = () => {
    ConsultancyService.deleteAllReports(consultancy.id);
    setShowDeleteAllModal(false);
    onRefresh();
  };

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
        <div className="flex items-center gap-2">
          {reports.length > 0 && (
            <button
              type="button"
              onClick={() => setShowDeleteAllModal(true)}
              className="btn-texture inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-700 transition cursor-pointer"
              title="Delete all AI diagnostic reports"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete All</span>
            </button>
          )}
          <button
            type="button"
            onClick={onRefresh}
            className="btn-texture inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#5B6B82]/30 text-xs font-semibold text-[#0F1E33] hover:border-[#C9A24B]"
            title="Reload AI reports list"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#5B6B82]" />
            <span>Refresh</span>
          </button>
        </div>
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
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDeletingReport(rep)}
                      className="p-1.5 text-[#C0392B] hover:text-red-700 rounded hover:bg-red-50 border border-transparent hover:border-red-200 transition"
                      title="Delete Diagnostic Report"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal (QA-03) */}
      {deletingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3]">
            <h3 className="font-display text-lg font-bold text-[#0F1E33]">
              Delete Diagnostic Report?
            </h3>
            <p className="text-sm text-[#5B6B82] leading-relaxed">
              Are you sure you want to remove the AI diagnostic report for{' '}
              <strong className="text-[#0F1E33]">{deletingReport.studentName}</strong> (#{deletingReport.candidateId})?
            </p>
            <div className="p-3 bg-slate-100 rounded-lg text-xs font-mono text-[#0F1E33]">
              {deletingReport.testTitle} · Band {deletingReport.bandScore.toFixed(1)}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingReport(null)}
                className="btn-texture px-4 py-2 bg-transparent text-xs text-[#5B6B82] border border-[#5B6B82]/30"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="btn-texture px-5 py-2 bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-bold"
              >
                Delete Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 bg-[#0F1E33]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3] border border-red-200 shadow-xl animate-in fade-in">
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F1E33]">
                  Delete All Diagnostic Reports?
                </h3>
                <p className="text-xs text-[#5B6B82]">
                  Permanent Deletion Warning
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5B6B82] leading-relaxed">
              Are you sure you want to permanently delete all <strong className="text-[#0F1E33]">{reports.length}</strong> candidate diagnostic reports for <strong className="text-[#0F1E33]">{consultancy.name}</strong>? This action cannot be reversed.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteAllModal(false)}
                className="btn-texture px-4 py-2 bg-transparent text-xs text-[#5B6B82] border border-[#5B6B82]/30 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAllConfirm}
                className="btn-texture px-5 py-2 bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Delete All Reports
              </button>
            </div>
          </div>
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
