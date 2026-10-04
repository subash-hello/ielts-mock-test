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
  ExternalLink,
  BookOpen,
  Headphones,
  PenTool
} from 'lucide-react';
import type { IELTSMockTest, TestResult } from '../../types/ielts';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Banner Ribbon */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              Computer-Delivered IELTS Terminal • Official Test Submission
            </span>
          </div>
          <div className="text-[11px] text-slate-300 font-mono">
            Candidate ID: #{candidateInfo.candidateId}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-emerald-50/80 to-white border-b border-slate-100 text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 ring-8 ring-emerald-100">
              <ShieldCheck className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Test Submitted Successfully</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Examination Record Completed
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Your responses have been encrypted and transmitted to the Test Centre Administration Portal.
              </p>
            </div>
          </div>

          {/* Submission Receipt Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Submission Receipt
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                  STATUS: WITHHELD PENDING RELEASE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px] font-medium">Candidate Full Name</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{candidateInfo.name}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-medium">Candidate Identification (ID)</span>
                  <div className="font-mono font-black text-indigo-700 text-sm mt-0.5 bg-indigo-50/70 border border-indigo-200/80 px-2.5 py-1 rounded-lg inline-block">
                    {candidateInfo.candidateId}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-medium">Test Taken</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mt-0.5">
                    {test.module === 'writing' ? (
                      <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                    ) : test.module === 'reading' ? (
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                    )}
                    <span>
                      {fullMockTitle ? fullMockTitle : `Cambridge ${test.book} • ${test.title}`}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-medium">Examination Facility</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Official IELTS Test Centre</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-medium">Terminal Station</span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 mt-0.5">
                    <Monitor className="w-3.5 h-3.5 text-slate-400" />
                    <span>{candidateInfo.stationName || 'PC-01'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-medium">Timestamp of Submission</span>
                  <div className="flex items-center gap-1.5 font-mono text-slate-800 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(submittedResult.completedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Band Score Withholding Notice */}
            <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="font-extrabold text-amber-950 text-xs sm:text-sm uppercase tracking-wide">
                  Official IELTS Band Score Release Protocol
                </h3>
              </div>
              <p className="text-xs text-amber-950/85 leading-relaxed">
                Per official Computer-Delivered IELTS standards, band scores are not released immediately on candidate test station screens upon submission. Your exam data has been forwarded directly to your Consultancy Test Centre Administrator.
              </p>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {test.module === 'writing' ? (
                  <>For <strong>IELTS Academic Writing</strong>, your Task 1 and Task 2 essays are reviewed by your test centre examiners. As soon as your invigilator assigns scores and clicks <strong>"Publish"</strong>, you can easily check your score by entering your <strong>Name</strong> ({candidateInfo.name}) or Candidate ID (<strong className="font-mono">{candidateInfo.candidateId}</strong>).</>
                ) : (
                  <>As soon as the test centre administrator verifies your submission and clicks <strong>"Publish"</strong> on the centre director portal, you can input your <strong>Name</strong> ({candidateInfo.name}) or Candidate ID (<strong className="font-mono">{candidateInfo.candidateId}</strong>) to view your verified Band Score and comprehensive diagnostic report.</>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={onOpenLookup}
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Search className="w-4 h-4" />
                <span>Check Official Result (Enter Name or ID)</span>
              </button>

              <button
                onClick={onReturnToTerminalOrHub}
                className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>Exit Test Station / Return to Start</span>
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-slate-500 text-[11px] flex flex-wrap items-center justify-center gap-3">
            <span>MOCK TEST from Master IELTS AI</span>
            <span>•</span>
            <a
              href="https://masterieltsai.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline font-semibold flex items-center gap-1"
            >
              <span>masterieltsai.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
