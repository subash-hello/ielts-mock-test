import React from 'react';
import { Play, ArrowLeft, Clock } from 'lucide-react';
import type { IELTSMockTest, FullMockTest } from '../../types/ielts';

interface ConfirmationStartViewProps {
  studentName: string;
  test: IELTSMockTest;
  fullMock?: FullMockTest;
  stationName: string;
  onStart: () => void;
  onBack: () => void;
}

export const ConfirmationStartView: React.FC<ConfirmationStartViewProps> = ({
  studentName,
  test,
  fullMock,
  stationName,
  onStart,
  onBack,
}) => {
  const durationText = fullMock
    ? `${fullMock.totalDurationMinutes} minutes`
    : `${test.durationMinutes} minutes`;

  const testTitle = fullMock
    ? fullMock.title
    : `${test.module.charAt(0).toUpperCase() + test.module.slice(1)} — Cambridge ${test.book} Test ${test.testNumber}`;

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
            <span>Choose different test</span>
          </button>
        </div>

        {/* Confirmation Card (Blueprint 6.4) */}
        <div className="paper-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#5B6B82]/15 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
              Exam Station Ready
            </span>
            <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
              Ready to begin?
            </h1>
          </div>

          {/* Details Table */}
          <div className="space-y-3.5 text-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
              <span className="text-[#5B6B82] text-xs">Student</span>
              <span className="font-bold text-[#0F1E33]">{studentName}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
              <span className="text-[#5B6B82] text-xs">Test</span>
              <span className="font-bold text-[#0F1E33] text-right">{testTitle}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-[#5B6B82]/10">
              <span className="text-[#5B6B82] text-xs">Duration</span>
              <span className="font-mono font-semibold text-[#0F1E33]">{durationText}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-[#5B6B82] text-xs">Station</span>
              <span className="font-mono font-bold text-[#0F1E33]">{stationName}</span>
            </div>
          </div>

          {/* Start Test Button */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onStart}
              className="btn-texture w-full min-h-[52px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-base font-bold shadow-md flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START TEST</span>
            </button>

            <p className="text-[11px] text-center text-[#5B6B82] flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Once started, the timer cannot be paused.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
