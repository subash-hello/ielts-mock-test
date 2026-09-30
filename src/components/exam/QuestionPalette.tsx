import React, { useState } from 'react';
import { Flag, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { CandidateAnswers, ReviewStatus, IELTSModule } from '../../types/ielts';

interface QuestionPaletteProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: CandidateAnswers;
  reviewStatus: ReviewStatus;
  onSelectQuestion: (qNum: number) => void;
  onToggleReview: (qNum: number) => void;
  onFinishTest: () => void;
  module?: IELTSModule;
  activeSectionIndex?: number;
  onSelectSection?: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  currentQuestion,
  totalQuestions,
  answers,
  reviewStatus,
  onSelectQuestion,
  onToggleReview,
  onFinishTest,
  module = 'reading',
  activeSectionIndex = 0,
  onSelectSection
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [viewAllSections, setViewAllSections] = useState(false);

  // Define section bounds
  const sectionBounds =
    module === 'reading'
      ? [
          { name: 'Passage 1', start: 1, end: 13 },
          { name: 'Passage 2', start: 14, end: 26 },
          { name: 'Passage 3', start: 27, end: 40 }
        ]
      : [
          { name: 'Part 1', start: 1, end: 10 },
          { name: 'Part 2', start: 11, end: 20 },
          { name: 'Part 3', start: 21, end: 30 },
          { name: 'Part 4', start: 31, end: 40 }
        ];

  // Count answered questions
  const answeredCount = Object.keys(answers).filter((k) => {
    const val = answers[Number(k)];
    if (Array.isArray(val)) return val.length > 0;
    return val !== undefined && val !== null && val.toString().trim() !== '';
  }).length;

  const unansweredCount = totalQuestions - answeredCount;
  const isCurrentReviewed = !!reviewStatus[currentQuestion];

  // Questions to display in the palette (either active section or all)
  const currentSectionInfo = sectionBounds[activeSectionIndex] || sectionBounds[0];
  const displayedRange = viewAllSections
    ? Array.from({ length: totalQuestions }, (_, i) => i + 1)
    : Array.from(
        { length: currentSectionInfo.end - currentSectionInfo.start + 1 },
        (_, i) => currentSectionInfo.start + i
      );

  return (
    <>
      <footer className="bg-[#efefef] border-t border-[#cfcfcf] px-4 py-2 select-none cd-ielts-font shadow-lg z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Left: Section Navigator & Review Checkbox */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Section / Part Tabs */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded border border-slate-300 text-xs">
              {sectionBounds.map((sec, idx) => {
                const isActive = idx === activeSectionIndex && !viewAllSections;
                return (
                  <button
                    key={sec.name}
                    onClick={() => {
                      setViewAllSections(false);
                      if (onSelectSection) {
                        onSelectSection(idx);
                      } else {
                        onSelectQuestion(sec.start);
                      }
                    }}
                    className={`px-2.5 py-1 rounded font-bold transition cursor-pointer text-[11px] ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-xs border-b-2 border-red-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {sec.name} <span className="font-normal opacity-70">({sec.start}–{sec.end})</span>
                  </button>
                );
              })}
              <button
                onClick={() => setViewAllSections(!viewAllSections)}
                className={`px-2 py-1 rounded font-semibold text-[11px] transition cursor-pointer ${
                  viewAllSections
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View all 40 questions at once"
              >
                All (1–40)
              </button>
            </div>

            {/* Review Checkbox for current question (Official CD-IELTS placement) */}
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-800 bg-white px-2.5 py-1.5 rounded border border-slate-300 shadow-2xs hover:bg-slate-50 transition">
              <input
                type="checkbox"
                checked={isCurrentReviewed}
                onChange={() => onToggleReview(currentQuestion)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
              />
              <span className="flex items-center gap-1 select-none">
                <Flag
                  className={`w-3.5 h-3.5 ${
                    isCurrentReviewed ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
                  }`}
                />
                <span>Review ({currentQuestion})</span>
              </span>
            </label>
          </div>

          {/* Center: Question Palette Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-thin">
            {displayedRange.map((qNum) => {
              const isActive = qNum === currentQuestion;
              const ansVal = answers[qNum];
              const isAnswered =
                ansVal !== undefined &&
                ansVal !== null &&
                (Array.isArray(ansVal) ? ansVal.length > 0 : ansVal.toString().trim() !== '');
              const isReviewed = !!reviewStatus[qNum];

              // Authentic CD-IELTS styling:
              // - Active: Red ring & dark background
              // - Answered: Distinct solid bottom bar / dark font
              // - Reviewed: Amber flag / circular ring
              // - Unanswered: Crisp light background
              let btnClass = 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400';
              if (isActive) {
                btnClass = 'bg-slate-900 text-white ring-2 ring-red-600 font-extrabold shadow-xs';
              } else if (isReviewed) {
                btnClass = 'bg-amber-50 border-amber-400 text-amber-900 font-bold ring-1 ring-amber-400';
              } else if (isAnswered) {
                btnClass = 'bg-slate-200 border-slate-500 text-slate-900 font-bold border-b-3 border-b-slate-800';
              }

              return (
                <button
                  key={qNum}
                  onClick={() => onSelectQuestion(qNum)}
                  className={`w-8 h-8 flex-shrink-0 flex items-center justify-center text-xs rounded transition relative cursor-pointer ${btnClass}`}
                  title={`Question ${qNum}${isAnswered ? ' (Answered)' : ' (Not answered)'}${
                    isReviewed ? ' - Marked for review' : ''
                  }`}
                >
                  {qNum}
                  {isReviewed && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Navigation Controls & Finish Exam */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectQuestion(Math.max(1, currentQuestion - 1))}
              disabled={currentQuestion === 1}
              className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => onSelectQuestion(Math.min(totalQuestions, currentQuestion + 1))}
              disabled={currentQuestion === totalQuestions}
              className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Finish Test
            </button>
          </div>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 cd-ielts-font space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Confirm Test Submission</h3>
                <p className="text-xs text-slate-500">Are you sure you want to finish the exam?</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Total Questions:</span>
                <span className="font-bold text-slate-900">{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Answered Questions:</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-red-600 font-bold">
                  <span>Unanswered Questions:</span>
                  <span>{unansweredCount}</span>
                </div>
              )}
            </div>

            {unansweredCount > 0 ? (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                ⚠️ You still have <strong>{unansweredCount} unanswered questions</strong>. Once submitted, your answers will be evaluated for Band Score.
              </p>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 40 questions completed! Ready to calculate Band Score.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  onFinishTest();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/20 transition cursor-pointer"
              >
                Yes, Submit Final Answers
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
