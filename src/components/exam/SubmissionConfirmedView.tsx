import React from 'react';
import {
  CheckCircle2,
  Building2,
  User,
  Monitor,
  Clock,
  ShieldCheck,
  Search,
  LogOut,
  BookOpen,
  Headphones,
  PenTool
} from 'lucide-react';
import type { IELTSMockTest, TestResult } from '../../types/ielts';
import { formatAppTimestamp } from '../../utils/formatters';

interface SubmissionConfirmedViewProps {
  candidateInfo: {
    name: string;
    candidateId: string;
    stationName?: string;
    consultancyName?: string;
  };
  test: IELTSMockTest;
  fullMockTitle?: string;
  submittedResult: TestResult;
  onOpenLookup: () => void;
  onReturnToTerminalOrHub: () => void;
}

export const SubmissionConfirmedView: React.FC<SubmissionConfirmedViewProps> = ({
  candidateInfo,
  test,
  fullMockTitle,
  submittedResult,
  onOpenLookup,
  onReturnToTerminalOrHub
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30">
      {/* Top Banner Ribbon */}
      <div className="bg-[#0F1E33] text-white text-xs py-2 px-4 border-b border-[#5B6B82]/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E7D4F]" />
            <span className="font-semibold tracking-wide uppercase text-[11px] text-slate-200">
              Computer-Delivered IELTS Terminal • Official Test Submission
            </span>
          </div>
          <div className="text-[11px] text-[#C9A24B] font-mono font-bold">
            Candidate ID: #{candidateInfo.candidateId}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="paper-card overflow-hidden shadow-md">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-white border-b border-[#5B6B82]/15 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2E7D4F]/10 text-[#2E7D4F] flex items-center justify-center mx-auto ring-8 ring-[#2E7D4F]/5">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E7D4F]/15 text-[#2E7D4F] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Test Submitted Successfully</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F1E33] tracking-tight">
                Examination Record Completed
              </h1>
              <p className="text-xs sm:text-sm text-[#5B6B82] max-w-lg mx-auto leading-relaxed">
                Your responses have been verified, encrypted, and recorded in the Test Centre Administration Portal.
              </p>
            </div>
          </div>

          {/* Submission Receipt Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white border border-[#5B6B82]/15 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#5B6B82]/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B82]">
                  Submission Receipt
                </span>
                <span className="text-[11px] font-mono text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded font-bold">
                  WITHHELD PENDING RELEASE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#5B6B82] block text-[11px]">Candidate Full Name</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#0F1E33] mt-0.5">
                    <User className="w-3.5 h-3.5 text-[#5B6B82]" />
                    <span>{candidateInfo.name}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B82] block text-[11px]">Candidate Identification (ID)</span>
                  <div className="font-mono font-bold text-[#0F1E33] text-sm mt-0.5 bg-[#C9A24B]/15 px-2.5 py-0.5 rounded inline-block">
                    #{candidateInfo.candidateId}
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B82] block text-[11px]">Test Taken</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#0F1E33] mt-0.5">
                    {test.module === 'writing' ? (
                      <PenTool className="w-3.5 h-3.5 text-[#C9A24B]" />
                    ) : test.module === 'reading' ? (
                      <BookOpen className="w-3.5 h-3.5 text-[#0F1E33]" />
                    ) : (
                      <Headphones className="w-3.5 h-3.5 text-[#2E7D4F]" />
                    )}
                    <span>
                      {fullMockTitle ? fullMockTitle : `Cambridge ${test.book} · ${test.title}`}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B82] block text-[11px]">Examination Facility</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#0F1E33] mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#5B6B82]" />
                    <span>{candidateInfo.consultancyName || 'Authorized Examination Centre'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B82] block text-[11px]">Terminal Station</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-[#0F1E33] mt-0.5">
                    <Monitor className="w-3.5 h-3.5 text-[#5B6B82]" />
                    <span>{candidateInfo.stationName || 'PC-01'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#5B6B82] block text-[11px]">Timestamp of Submission</span>
                  <div className="flex items-center gap-1.5 font-mono text-[#0F1E33] mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#5B6B82]" />
                    <span>{formatAppTimestamp(submittedResult.completedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Band Score Withholding Notice */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="font-bold text-amber-950 text-xs uppercase tracking-wide">
                  {test.module === 'writing'
                    ? 'Writing Module · Human Examiner Evaluation Required'
                    : 'Official IELTS Band Score Release Protocol'}
                </h3>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {test.module === 'writing' ? (
                  <>
                    Your Task 1 and Task 2 essays have been transmitted directly to your Test Centre Administrator for manual assessment against certified IELTS rubrics (Task Achievement, Coherence &amp; Cohesion, Lexical Resource, Grammatical Accuracy). Once evaluated and published, you can look up your official Band Score using your Candidate ID (<strong className="font-mono">#{candidateInfo.candidateId}</strong>).
                  </>
                ) : (
                  <>
                    Per official Computer-Delivered IELTS standards, band scores are withheld at the student station screen. Once your consultancy invigilator verifies and publishes results, you can look up your score using your Candidate ID (<strong className="font-mono">#{candidateInfo.candidateId}</strong>).
                  </>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onOpenLookup}
                className="btn-texture w-full min-h-[48px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#C9A24B]" />
                <span>Check Official Published Result</span>
              </button>

              <button
                type="button"
                onClick={onReturnToTerminalOrHub}
                className="btn-texture w-full min-h-[44px] bg-white hover:bg-slate-50 text-[#5B6B82] font-semibold text-xs border border-[#5B6B82]/20 flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Return to Station Idle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
