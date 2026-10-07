import React, { useState } from 'react';
import { Volume2, HelpCircle, ArrowLeft, Moon, Sun } from 'lucide-react';
import type { ExamSettings, IELTSMockTest } from '../../types/ielts';

interface CDHeaderProps {
  test: IELTSMockTest;
  remainingSeconds: number;
  settings: ExamSettings;
  onUpdateSettings: (newSettings: Partial<ExamSettings>) => void;
  onExitTest: () => void;
  audioVolume?: number;
  onVolumeChange?: (volume: number) => void;
  candidateName?: string;
  candidateId?: string;
  consultancyName?: string;
}

export const CDHeader: React.FC<CDHeaderProps> = ({
  test,
  remainingSeconds,
  settings,
  onUpdateSettings,
  onExitTest,
  audioVolume = 80,
  onVolumeChange,
  candidateName,
  candidateId,
  consultancyName: _consultancyName
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Blueprint 6.5: Under 5 minutes turns amber; under 1 minute pulses gently. Never alarming red mid-exam!
  const isUnder5Min = remainingSeconds <= 300;
  const isUnder1Min = remainingSeconds <= 60;

  const isDarkMode = settings.contrast === 'inverted';

  const toggleDarkMode = () => {
    onUpdateSettings({ contrast: isDarkMode ? 'standard' : 'inverted' });
  };

  return (
    <>
      <header className="bg-[#FAF8F3] border-b border-[#5B6B82]/20 px-3 sm:px-6 py-2.5 flex items-center justify-between text-xs select-none shadow-2xs z-30 gap-3">
        {/* Left: Thin Gold Ring Timer + Numerals (Blueprint 6.5: top-left, always visible) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExitTest}
            className="px-2.5 py-1 rounded bg-white hover:bg-red-50 text-[#5B6B82] hover:text-[#C0392B] border border-[#5B6B82]/20 hover:border-red-200 transition font-medium flex items-center gap-1.5 shadow-2xs"
            title="Exit Test"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px]">Exit Test</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#5B6B82]/20 rounded-lg shadow-2xs">
            {/* Thin gold ring indicator */}
            <div
              className={`w-3 h-3 rounded-full border-2 ${
                isUnder1Min
                  ? 'border-amber-600 bg-amber-500/20 animate-ping'
                  : isUnder5Min
                  ? 'border-amber-500 bg-amber-500/20'
                  : 'border-[#C9A24B] bg-[#C9A24B]/10'
              }`}
            />
            <span
              className={`font-mono font-bold text-xs sm:text-sm ${
                isUnder1Min
                  ? 'text-amber-700 animate-pulse font-black'
                  : isUnder5Min
                  ? 'text-amber-600'
                  : 'text-[#0F1E33]'
              }`}
            >
              {timeFormatted} remaining
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[#5B6B82] border-l border-[#5B6B82]/20 pl-3">
            <span className="font-semibold text-[#0F1E33] capitalize">
              {test.module}
            </span>
            <span>·</span>
            <span>Cambridge {test.book} Test {test.testNumber}</span>
          </div>
        </div>

        {/* Center: Candidate Info */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#5B6B82]">
          <span>Candidate:</span>
          <strong className="text-[#0F1E33] font-bold">
            {candidateName || 'Candidate'}
          </strong>
          {candidateId && (
            <span className="font-mono text-[11px] text-[#5B6B82]">
              (#{candidateId})
            </span>
          )}
        </div>

        {/* Right: Audio Volume (Listening), Dark Exam Mode Toggle, Text Size */}
        <div className="flex items-center gap-2.5">
          {/* Audio volume slider if listening */}
          {test.module === 'listening' && onVolumeChange && (
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#5B6B82]/20">
              <Volume2 className="w-3.5 h-3.5 text-[#5B6B82]" />
              <input
                type="range"
                min="0"
                max="100"
                value={audioVolume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="w-16 h-1 accent-[#C9A24B] cursor-pointer"
                title={`Volume: ${audioVolume}%`}
              />
            </div>
          )}

          {/* Text Size Switcher */}
          <div className="flex items-center bg-white border border-[#5B6B82]/20 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onUpdateSettings({ fontSize: 'normal' })}
              className={`px-2 py-0.5 font-bold rounded transition ${
                settings.fontSize === 'normal'
                  ? 'bg-[#0F1E33] text-white'
                  : 'text-[#5B6B82] hover:text-[#0F1E33]'
              }`}
              title="Standard Font"
            >
              A
            </button>
            <button
              onClick={() => onUpdateSettings({ fontSize: 'large' })}
              className={`px-2 py-0.5 font-bold text-sm rounded transition ${
                settings.fontSize === 'large'
                  ? 'bg-[#0F1E33] text-white'
                  : 'text-[#5B6B82] hover:text-[#0F1E33]'
              }`}
              title="Large Font"
            >
              A+
            </button>
          </div>

          {/* Dark Exam Mode Toggle (Blueprint 5.2 & 6.5) */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-lg border transition ${
              isDarkMode
                ? 'bg-[#0F1E33] text-[#C9A24B] border-[#C9A24B]/40'
                : 'bg-white text-[#5B6B82] border-[#5B6B82]/20 hover:text-[#0F1E33]'
            }`}
            title={isDarkMode ? 'Switch to Exam Calm (Light)' : 'Switch to Dark Exam Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 rounded-lg bg-white border border-[#5B6B82]/20 text-[#5B6B82] hover:text-[#0F1E33]"
            title="Examination Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Help Instructions Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <h3 className="font-display text-base font-bold text-[#0F1E33]">
                Examination Guidelines
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#5B6B82] leading-relaxed">
              <p>
                • <strong>Authoritative Timer:</strong> The timer runs from the examination server and cannot be paused.
              </p>
              <p>
                • <strong>Auto-Saving:</strong> Answers save automatically locally and sync in real-time.
              </p>
              <p>
                • <strong>Navigation:</strong> Click any question number on the palette at the bottom to navigate.
              </p>
              <p>
                • <strong>Review Flag:</strong> Toggle the review flag to mark questions you wish to double-check.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpModal(false)}
                className="btn-texture px-4 py-2 bg-[#0F1E33] text-white text-xs font-bold"
              >
                Close & Continue Test
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
