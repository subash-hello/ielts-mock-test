import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  ArrowRight,
  RotateCw,
  X,
  Award,
  Sparkles,
  PenTool
} from 'lucide-react';
import type { TestResult } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';

interface CandidateResultLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewResult: (result: TestResult) => void;
  initialCandidateId?: string;
  consultancyId?: string;
}

export const CandidateResultLookupModal: React.FC<CandidateResultLookupModalProps> = ({
  isOpen,
  onClose,
  onViewResult,
  initialCandidateId = '',
  consultancyId
}) => {
  const [candidateIdInput, setCandidateIdInput] = useState(initialCandidateId);
  const [selectedCid] = useState<string>(consultancyId || 'all');
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [publishedResults, setPublishedResults] = useState<TestResult[]>([]);
  const [pendingResults, setPendingResults] = useState<TestResult[]>([]);
  const [notFound, setNotFound] = useState(false);

  const performLookup = (candId: string, cid?: string) => {
    const clean = candId.trim().replace(/^#/, '');
    if (!clean) return;

    setIsSearching(true);
    setSearched(true);

    setTimeout(() => {
      const activeCid = cid && cid !== 'all' ? cid : undefined;
      const lookup = ConsultancyService.getCandidateResults(clean, activeCid);

      setPublishedResults(lookup.publishedResults);
      setPendingResults(lookup.pendingResults);
      setNotFound(!lookup.found);
      setIsSearching(false);
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      if (initialCandidateId) {
        setCandidateIdInput(initialCandidateId);
        performLookup(initialCandidateId, consultancyId);
      } else {
        setCandidateIdInput('');
        setSearched(false);
        setNotFound(false);
        setPublishedResults([]);
        setPendingResults([]);
      }
    } else {
      setSearched(false);
      setNotFound(false);
      setIsSearching(false);
    }
  }, [isOpen, initialCandidateId, consultancyId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(candidateIdInput, selectedCid);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh] cursor-default"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1">
              <img
                src="/images/masterieltsai-icon.png"
                alt="Master IELTS AI"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                  IELTS Result & Scorecard Verification
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                  Official TRF
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your Candidate Name or ID to retrieve verified test scorecards published by your centre.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          <form onSubmit={handleSearch} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Candidate Full Name or ID Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your name (e.g. Sujan Sharma) or Candidate ID"
                  value={candidateIdInput}
                  onChange={(e) => {
                    setCandidateIdInput(e.target.value);
                    if (notFound) setNotFound(false);
                    if (searched) setSearched(false);
                  }}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1">
                <button
                  type="submit"
                  disabled={isSearching || !candidateIdInput.trim()}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSearching ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking Records...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Verify & Retrieve Result</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Prompt before searching */}
          {!searched && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>How Candidate Result Publishing Works:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                <li>Mock tests taken in consultancy labs are withheld at the student terminal upon submission.</li>
                <li>Your answers directly synchronize to the Test Centre Administrator portal for review.</li>
                <li>Once the invigilator reviews and clicks <strong>Publish</strong>, your verified band score unlocks here.</li>
              </ul>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                Demo verified IDs to test: <strong className="font-mono text-slate-800">004128</strong>, <strong className="font-mono text-slate-800">004130</strong>
              </div>
            </div>
          )}

          {/* Results: Not Found */}
          {searched && notFound && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center space-y-2 animate-in fade-in">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
              <h4 className="font-bold text-red-900 text-sm">
                No Records Found for Candidate "{candidateIdInput}"
              </h4>
              <p className="text-xs text-red-700 max-w-sm mx-auto">
                Please ensure you entered the exact candidate full name (or ID) entered at the terminal, or ask your test centre invigilator to verify and publish your test.
              </p>
            </div>
          )}

          {/* Results: Pending Release Notice */}
          {searched && pendingResults.length > 0 && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      Pending Release by Test Centre
                    </span>
                    <span className="text-xs font-mono text-amber-800 font-bold">
                      {pendingResults.length} test{pendingResults.length > 1 ? 's' : ''} submitted
                    </span>
                  </div>
                  <h4 className="font-extrabold text-amber-950 text-sm">
                    Result Withheld per Official CD-IELTS Protocol
                  </h4>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Your test responses have been received and recorded at your consultancy portal. Per test centre policy, band scores are reviewed and signed off by the administrator before being published to candidates.
                  </p>
                </div>
              </div>

              {/* Pending submissions list */}
              <div className="space-y-1.5 pt-1">
                {pendingResults.map((pr, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 border border-amber-200 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 block">
                          Cambridge {pr.book} Test {pr.testNumber} ({pr.module.toUpperCase()})
                        </span>
                        {pr.module === 'writing' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                            <PenTool className="w-2.5 h-2.5" />
                            Writing Submission
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Candidate: {pr.candidateName || 'Candidate'} • Submitted: {new Date(pr.completedAt).toLocaleString()}
                      </span>
                      {pr.module === 'writing' && (
                        <p className="text-[11px] text-amber-800 mt-1 font-medium">
                          Writing Evaluation in Progress: Your essays have been submitted to your consultancy. Your examiner is reviewing your submission and your band score will appear here once published.
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md shrink-0">
                      Awaiting Publication
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-amber-800 flex items-center justify-between pt-1">
                <span>Please ask your test centre invigilator to click "Publish" in the Consultancy Portal.</span>
                <button
                  type="button"
                  onClick={() => performLookup(candidateIdInput, selectedCid)}
                  className="font-bold underline hover:text-amber-950 cursor-pointer flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" /> Refresh
                </button>
              </div>
            </div>
          )}

          {/* Results: Official Published Results */}
          {searched && publishedResults.length > 0 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Published Official Scorecards ({publishedResults.length})
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Verified by Test Centre
                </span>
              </div>

              <div className="space-y-2.5">
                {publishedResults.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition flex flex-col gap-3 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                            res.module === 'writing'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}>
                            {res.module.toUpperCase()}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">
                            Cambridge {res.book} • Academic Test {res.testNumber}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-medium text-slate-700">Candidate: {res.candidateName}</span>
                          <span>•</span>
                          <span>ID: <strong className="font-mono text-slate-900">{res.candidateId}</strong></span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Published: {res.publishedAt ? new Date(res.publishedAt).toLocaleString() : new Date(res.completedAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                            Band Score
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-indigo-600 font-mono">
                            {res.bandScore.toFixed(1)}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            onViewResult(res);
                            onClose();
                          }}
                          className="py-2 px-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0"
                        >
                          <span>View TRF Report</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Writing Breakdown and Examiner Feedback (if writing submission) */}
                    {res.writingSubmission && (
                      <div className="mt-1 pt-2 border-t border-slate-100 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Task 1 Band: <strong className="font-mono">{res.writingSubmission.task1Band ?? '—'}</strong> ({res.writingSubmission.task1WordCount} words)
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Task 2 Band: <strong className="font-mono">{res.writingSubmission.task2Band ?? '—'}</strong> ({res.writingSubmission.task2WordCount} words)
                          </span>
                        </div>

                        {res.writingSubmission.adminFeedback && (
                          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                            <span className="font-bold text-slate-900 block mb-0.5">Examiner Evaluation:</span>
                            <p className="italic text-slate-600 text-[11px] leading-relaxed">
                              "{res.writingSubmission.adminFeedback}"
                            </p>
                            {res.writingSubmission.reviewedBy && (
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                Evaluated by: {res.writingSubmission.reviewedBy}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Cambridge Academic Standard 0.0 - 9.0 Band Scale</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
