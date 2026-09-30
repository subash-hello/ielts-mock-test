import React, { useState } from 'react';
import { Clock, Volume2, HelpCircle, ArrowLeft } from 'lucide-react';
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
  consultancyName
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isUrgent = remainingSeconds <= 600; // Last 10 minutes

  return (
    <>
      <header className="bg-[#f0f0f0] border-b border-[#cfcfcf] px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-xs select-none cd-ielts-font shadow-sm z-30 gap-2">
        {/* Left: Test Details */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onExitTest}
            className="p-1 sm:p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
            title="Return to Selection Hub"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-300">
              <img src="/images/masterieltsai-icon.png" alt="MasterIELTS AI" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
              <span className="font-extrabold text-xs tracking-tight text-slate-900 hidden xl:inline">MOCK TEST <span className="text-[10px] text-slate-500 font-normal">from Master IELTS AI</span></span>
            </div>
            <span className="font-bold text-slate-900 text-xs sm:text-sm whitespace-nowrap">
              <span className="hidden sm:inline">IELTS Academic </span>{test.module === 'reading' ? 'Reading' : 'Listening'}
            </span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-700 font-medium hidden md:inline">
              Candidate: <strong>{candidateName || 'Candidate'} ({candidateId || '001428'})</strong>
            </span>
            {consultancyName && (
              <>
                <span className="text-slate-400 hidden lg:inline">|</span>
                <span className="text-blue-700 font-medium hidden lg:inline">
                  {consultancyName}
                </span>
              </>
            )}
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-600 hidden sm:inline">
              {test.title}
            </span>
          </div>
        </div>

        {/* Center: Live Countdown Clock */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 sm:px-3 py-1 rounded border border-slate-300 shadow-inner shrink-0">
          <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-red-600 animate-pulse' : 'text-slate-500'}`} />
          <span
            className={`font-mono font-bold text-xs sm:text-sm ${
              isUrgent ? 'text-red-600 font-black' : 'text-slate-900'
            }`}
          >
            {settings.showTimer || isUrgent ? (
              <>
                <span>{timeFormatted}</span>
                <span className="hidden sm:inline"> remaining</span>
              </>
            ) : (
              'Hidden'
            )}
          </span>
          {!isUrgent && (
            <button
              onClick={() => onUpdateSettings({ showTimer: !settings.showTimer })}
              className="text-[10px] sm:text-[11px] text-blue-700 hover:text-blue-900 underline ml-0.5 sm:ml-1 cursor-pointer font-medium"
            >
              {settings.showTimer ? 'Hide' : 'Show'}
            </button>
          )}
        </div>

        {/* Right: Audio Volume (for Listening) & Accessibility Tools */}
        <div className="flex items-center gap-3">
          {/* Audio volume slider if listening */}
          {test.module === 'listening' && onVolumeChange && (
            <div className="hidden sm:flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-300">
              <Volume2 className="w-3.5 h-3.5 text-slate-600" />
              <input
                type="range"
                min="0"
                max="100"
                value={audioVolume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="w-16 h-1 accent-red-600 cursor-pointer"
                title={`Volume: ${audioVolume}%`}
              />
            </div>
          )}

          {/* Text Size Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-300 rounded px-1.5 py-0.5">
            <span className="text-[11px] text-slate-500 mr-0.5">Text:</span>
            <button
              onClick={() => onUpdateSettings({ fontSize: 'normal' })}
              className={`px-1.5 py-0.5 font-bold rounded cursor-pointer transition ${
                settings.fontSize === 'normal' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => onUpdateSettings({ fontSize: 'large' })}
              className={`px-1.5 py-0.5 font-bold text-sm rounded cursor-pointer transition ${
                settings.fontSize === 'large' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* Contrast Mode Switcher (Official CD-IELTS Display Options) */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-300 rounded px-1.5 py-0.5">
            <span className="text-[11px] text-slate-500 mr-0.5">Contrast:</span>
            <button
              onClick={() => onUpdateSettings({ contrast: 'standard' })}
              className={`px-1.5 py-0.5 text-xs font-semibold rounded cursor-pointer transition ${
                settings.contrast === 'standard'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Standard: Black on White"
            >
              Standard
            </button>
            <button
              onClick={() => onUpdateSettings({ contrast: 'inverted' })}
              className={`px-1.5 py-0.5 text-xs font-semibold rounded cursor-pointer transition ${
                settings.contrast === 'inverted'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Inverted: White on Dark"
            >
              Inverted
            </button>
            <button
              onClick={() => onUpdateSettings({ contrast: 'yellow-on-black' })}
              className={`px-1.5 py-0.5 text-xs font-semibold rounded cursor-pointer transition ${
                settings.contrast === 'yellow-on-black'
                  ? 'bg-black text-yellow-400 font-bold border border-yellow-500'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="High Contrast: Yellow on Black"
            >
              Yellow/Black
            </button>
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Help</span>
          </button>
        </div>
      </header>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 cd-ielts-font space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">Official CD-IELTS Examination Help</h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                <strong>Dropdown Menus & Summary Completion:</strong> For questions with word bank options, click the inline dropdown menu inside each gap or click the option card to insert your answer. You can also toggle between direct typing and dropdown selection.
              </p>
              <p>
                <strong>Text Highlighting & Sticky Notes:</strong> Select any text in the reading passage to highlight it in yellow or attach a personal note. Click any highlighted text to edit notes or clear the highlight.
              </p>
              <p>
                <strong>Question Navigation:</strong> Use the Passage / Part tabs and question number buttons at the bottom of the screen (1–40) to jump directly to any question. Answered questions show a solid bottom indicator.
              </p>
              <p>
                <strong>Reviewing Questions:</strong> Check the <em>Review</em> box to flag questions you want to return to later. An amber flag badge appears on the button.
              </p>
              <p>
                <strong>Word Limit Rules:</strong> For gap-fill tasks, strictly adhere to the limit (e.g. NO MORE THAN TWO WORDS). A real-time warning will alert you if your response exceeds the permitted word count.
              </p>
              <p>
                <strong>Accessibility Themes:</strong> Switch between Standard, Inverted, and Yellow-on-Black display themes using the Contrast options in the top header.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Close Help
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
