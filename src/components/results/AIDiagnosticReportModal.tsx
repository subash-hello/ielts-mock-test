import React from 'react';
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
    bandScore: number;
    module: 'reading' | 'listening' | 'writing';
    testTitle: string;
    correctCount: number;
    totalQuestions: number;
    timeTakenSeconds: number;
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
  const diagnostic = ConsultancyService.generateAIDiagnostic(
    {
      testId: 'mock-report',
      book: 19,
      testNumber: 1,
      module: reportData.module,
      totalQuestions: reportData.totalQuestions,
      correctCount: reportData.correctCount,
      bandScore: reportData.bandScore,
      timeTakenSeconds: reportData.timeTakenSeconds,
      completedAt: new Date().toISOString(),
      answers: {}
    },
    reportData.studentName
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden my-4 sm:my-8 text-slate-900 flex flex-col animate-in fade-in">
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="bg-slate-50 border-b border-slate-200 px-3.5 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              IELTS Diagnostic Evaluation Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
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
      </div>
    </div>
  );
};

export default AIDiagnosticReportModal;
