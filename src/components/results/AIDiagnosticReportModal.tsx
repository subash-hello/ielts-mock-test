import React, { useEffect } from 'react';
import {
  Printer,
  X,
  CheckCircle,
  AlertTriangle,
  BrainCircuit,
  Building2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ConsultancyService } from '../../services/consultancyService';

interface AIDiagnosticReportModalProps {
  reportData: {
    studentName: string;
    candidateId?: string;
    bandScore: number;
    module: 'reading' | 'listening' | 'writing';
    testTitle: string;
    testId?: string;
    book?: number;
    testNumber?: number;
    correctCount: number;
    totalQuestions: number;
    timeTakenSeconds: number;
    completedAt?: string;
  };
  consultancyName: string;
  branchName?: string;
  onClose: () => void;
}

export const AIDiagnosticReportModal: React.FC<AIDiagnosticReportModalProps> = ({
  reportData,
  consultancyName,
  branchName = 'Academic Department',
  onClose
}) => {
  // Extract book and testNumber if present in title e.g. "Cambridge 16 Test 1 (Reading)"
  let extractedBook = reportData.book;
  let extractedTestNumber = reportData.testNumber;
  if (!extractedBook || !extractedTestNumber) {
    const bookMatch = (reportData.testTitle || reportData.testId || '').match(/cam(?:bridge)?[- ]?(\d+)/i);
    const testMatch = (reportData.testTitle || reportData.testId || '').match(/test[- ]?(\d+)/i);
    if (bookMatch) extractedBook = parseInt(bookMatch[1], 10);
    if (testMatch) extractedTestNumber = parseInt(testMatch[1], 10);
  }

  const diagnostic = ConsultancyService.generateAIDiagnostic(
    {
      testId: reportData.testId || 'report',
      book: extractedBook || 16,
      testNumber: extractedTestNumber || 1,
      module: reportData.module,
      totalQuestions: reportData.totalQuestions,
      correctCount: reportData.correctCount,
      bandScore: reportData.bandScore,
      timeTakenSeconds: reportData.timeTakenSeconds,
      completedAt: reportData.completedAt || new Date().toISOString(),
      candidateId: reportData.candidateId,
      candidateName: reportData.studentName,
      answers: {}
    },
    reportData.studentName,
    reportData.candidateId,
    reportData.testTitle
  );

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 overflow-y-auto flex items-start justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Floating fixed close button (always visible in top right corner of screen) */}
      <button
        onClick={onClose}
        aria-label="Close report"
        title="Close Diagnostic Report (Esc)"
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/90 text-white hover:bg-black hover:scale-110 shadow-2xl transition cursor-pointer print:hidden border border-white/20 flex items-center justify-center"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden my-2 sm:my-6 text-slate-900 flex flex-col animate-in fade-in relative"
      >
        {/* Sticky Top Control Bar (Hidden on print) */}
        <div className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              IELTS Diagnostic Evaluation Report
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition cursor-pointer shadow-xs"
              title="Close Report (Esc)"
            >
              <X className="w-4 h-4" />
              <span>Close (X)</span>
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6 bg-white text-slate-900">
          {/* 1. Official Header */}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-0.5 shadow-2xs">
                  <img
                    src="/images/masterieltsai-icon.png"
                    alt="Master IELTS AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-extrabold text-xs text-slate-900 uppercase tracking-tight">
                  MOCK TEST <span className="font-normal text-slate-500 lowercase">from</span> Master IELTS AI
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>{consultancyName}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                IELTS Diagnostic Evaluation Report
              </h2>
              <p className="text-xs text-slate-500">
                Branch: {branchName} • Official Cambridge Rubrics AI Diagnostic Assessment
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Assessment</span>
              </div>
              <div className="text-xs font-mono text-slate-500 mt-1">
                Ref ID: #{diagnostic.candidateId}
              </div>
            </div>
          </div>

          {/* 2. Candidate & Test Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                Candidate Name
              </span>
              <span className="font-bold text-sm text-slate-900">
                {diagnostic.studentName}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                Examination
              </span>
              <span className="font-bold text-slate-800 truncate block">
                {diagnostic.testTitle}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                Test Date
              </span>
              <span className="font-bold text-slate-800">
                {diagnostic.date}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                Duration Taken
              </span>
              <span className="font-bold text-slate-800 font-mono">
                {diagnostic.timeSpentFormatted}
              </span>
            </div>
          </div>

          {/* 3. Overall Band & CEFR Alignment Hero */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl bg-blue-600 flex flex-col items-center justify-center text-white shadow-xs">
                <span className="text-2xl font-extrabold leading-none">
                  {diagnostic.overallBand.toFixed(1)}
                </span>
                <span className="text-[9px] uppercase font-bold text-blue-100 tracking-wider mt-0.5">
                  Band
                </span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-blue-700 tracking-wider">
                  CEFR Language Standard
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {diagnostic.cefrLevel}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Raw Score: <strong>{diagnostic.rawScore}</strong> ({diagnostic.accuracyPercentage}% Accuracy)
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                Target Score Gap
              </span>
              <span
                className={`text-lg font-extrabold ${
                  diagnostic.bandGap <= 0 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {diagnostic.bandGap <= 0
                  ? 'Target Achieved ✓'
                  : `-${diagnostic.bandGap} Band to Goal (${diagnostic.targetBand.toFixed(1)})`}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                Estimated prep time: ~3 to 4 weeks
              </span>
            </div>
          </div>

          {/* 4. Sub-Skill Radar & Metrics Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-700 flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              <span>Skill Mastery Diagnostic Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diagnostic.skillMetrics.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        skill.status === 'Mastered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : skill.status === 'Competent'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        skill.scorePercent >= 80
                          ? 'bg-emerald-600'
                          : skill.scorePercent >= 65
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.scorePercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Student: {skill.scorePercent}%</span>
                    <span>Target: {skill.benchmark}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. AI Recommendations & Strategic Action Plan */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Diagnostic Recommendations & Action Plan</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Demonstrated Strengths</span>
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 text-xs leading-relaxed">
                  {diagnostic.aiDiagnosticInsights.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Priority Focus Areas</span>
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 text-xs leading-relaxed">
                  {diagnostic.aiDiagnosticInsights.criticalWeaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <span className="text-xs font-bold text-blue-700 block mb-1">
                Strategic Study Recommendation:
              </span>
              <p className="text-slate-700 text-xs leading-relaxed">
                {diagnostic.aiDiagnosticInsights.strategicAdvice.join(' ')}
              </p>
            </div>
          </div>

          {/* 6. Signature & Verification Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              <span>Generated on {diagnostic.date}</span>
              <span className="mx-2">•</span>
              <span>{consultancyName} Diagnostic System</span>
            </div>
            <div className="text-right font-mono text-[11px]">
              Certified Official Diagnostic Report
            </div>
          </div>
        </div>

        {/* Modal Bottom Control Bar (Hidden on print) */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <span className="text-xs text-slate-500 font-medium">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[11px] font-mono shadow-2xs">Esc</kbd> or click anywhere outside to exit
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDiagnosticReportModal;
