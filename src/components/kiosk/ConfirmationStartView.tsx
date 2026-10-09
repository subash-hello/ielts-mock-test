import React from 'react';
import { Play, ArrowLeft, Clock, ShieldCheck, Building2 } from 'lucide-react';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';

interface ConfirmationStartViewProps {
  studentName: string;
  test: IELTSMockTest;
  fullMock?: FullMockTest;
  stationName: string;
  consultancyName?: string;
  onStart: () => void;
  onBack: () => void;
}

export const ConfirmationStartView: React.FC<ConfirmationStartViewProps> = ({
  studentName,
  test,
  fullMock,
  stationName,
  consultancyName,
  onStart,
  onBack,
}) => {
  const durationText = fullMock
    ? `${fullMock.totalDurationMinutes} minutes`
    : `${test.durationMinutes} minutes`;

  const testTitle = fullMock
    ? fullMock.title
    : `${test.module.charAt(0).toUpperCase() + test.module.slice(1)} — Cambridge ${test.book} Test ${test.testNumber}`;

  const moduleName = fullMock
    ? 'Official Full Mock Exam'
    : `Academic ${test.module.charAt(0).toUpperCase() + test.module.slice(1)}`;

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-4 selection:bg-[#C9A24B]/30">
      <div className="max-w-md w-full space-y-6">
        {/* Back Link */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-[#5B6B82] hover:text-[#0F1E33] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Choose different module</span>
          </button>
        </div>

        {/* Confirmation Card */}
        <div className="paper-card p-6 sm:p-8 space-y-6 shadow-md border border-[#5B6B82]/20">
          <div className="border-b border-[#5B6B82]/15 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
                Exam Station Ready
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Authorized</span>
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-1">
              Ready to begin?
            </h1>
            <p className="text-xs text-[#5B6B82] mt-1">
              Verify your candidate workstation details and module confirmation below.
            </p>
          </div>

          {/* Details Table */}
          <div className="space-y-3.5 text-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
              <span className="text-[#5B6B82] text-xs">Candidate Name</span>
              <span className="font-bold text-[#0F1E33]">{studentName}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
              <span className="text-[#5B6B82] text-xs">Chosen Module</span>
              <span className="font-bold text-[#0F1E33]">{moduleName}</span>
            </div>

            <div className="flex items-start justify-between py-1.5 border-b border-[#5B6B82]/10 gap-3">
              <span className="text-[#5B6B82] text-xs shrink-0">Assigned Test Paper</span>
              <span className="font-bold text-[#0F1E33] text-right text-xs sm:text-sm">{testTitle}</span>
            </div>

            {consultancyName && (
              <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
                <span className="text-[#5B6B82] text-xs">Given by Consultancy</span>
                <span className="font-semibold text-[#0F1E33] text-xs flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#C9A24B]" />
                  <span>{consultancyName}</span>
                </span>
              </div>
            )}

            <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
              <span className="text-[#5B6B82] text-xs">Allocated Duration</span>
              <span className="font-mono font-semibold text-[#0F1E33]">{durationText}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-[#5B6B82] text-xs">Station PC</span>
              <span className="font-mono font-bold text-[#0F1E33]">{stationName}</span>
            </div>
          </div>

          {/* Start Test Button */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onStart}
              className="btn-texture w-full min-h-[52px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-base font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START EXAMINATION</span>
            </button>

            <p className="text-[11px] text-center text-[#5B6B82] flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Standard computer-delivered timer starts automatically upon click.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStartView;
