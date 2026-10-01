import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  LayoutGrid,
  Send,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';
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
  const [showGridModal, setShowGridModal] = useState(false);

  // Define section bounds matching official CD-IELTS structure
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

  return (
    <>
      {/* Official Computer-Delivered IELTS Bottom Navigation Bar */}
      <footer className="bg-[#fcfcfc] border-t border-[#d8d8d8] px-2 sm:px-4 py-2 select-none cd-ielts-font shadow-lg z-30">
        <div className="flex items-center justify-between gap-2 max-w-[1920px] mx-auto">
          {/* 1. Left Navigation Arrows: [ < ] [ > ] */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onSelectQuestion(Math.max(1, currentQuestion - 1))}
              disabled={currentQuestion === 1}
              className="w-8 h-8 sm:w-9 sm:h-8 bg-[#3d3d3d] hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xs flex items-center justify-center transition cursor-pointer shadow-2xs"
              title="Previous Question"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => onSelectQuestion(Math.min(totalQuestions, currentQuestion + 1))}
              disabled={currentQuestion === totalQuestions}
              className="w-8 h-8 sm:w-9 sm:h-8 bg-[#3d3d3d] hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xs flex items-center justify-center transition cursor-pointer shadow-2xs"
              title="Next Question"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 2. Center Part / Passage Tabs with Inline Question Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none flex-1 min-w-0 py-0.5 justify-start md:justify-center">
            {sectionBounds.map((sec, idx) => {
              const isActive = idx === activeSectionIndex;

              if (isActive) {
                // Active Section Tab: Light pink/red outline with question pills [ 1 ] [ 2 ] ... [ 10 ]
                return (
                  <div
                    key={sec.name}
                    className="border border-[#f87171] bg-white rounded-xs px-2.5 sm:px-3 py-1 flex items-center gap-2 shadow-2xs shrink-0"
                  >
                    <span className="font-bold text-xs text-slate-900 whitespace-nowrap select-none">
                      {sec.name}:
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: sec.end - sec.start + 1 },
                        (_, i) => sec.start + i
                      ).map((qNum) => {
                        const isCurrent = qNum === currentQuestion;
                        const ans = answers[qNum];
                        const isAnswered =
                          ans !== undefined &&
                          ans !== null &&
                          (Array.isArray(ans) ? ans.length > 0 : ans.toString().trim() !== '');
                        const isReviewed = !!reviewStatus[qNum];

                        return (
                          <button
                            key={qNum}
                            onClick={() => onSelectQuestion(qNum)}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xs border text-xs font-bold flex items-center justify-center transition cursor-pointer relative select-none ${
                              isCurrent
                                ? 'border-slate-900 bg-slate-100 ring-1 ring-slate-900 text-slate-900'
                                : isAnswered
                                ? 'border-slate-400 bg-slate-50 text-slate-900 border-b-2 border-b-slate-800'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                            }`}
                            title={`Question ${qNum}${isAnswered ? ' (Answered)' : ' (Unanswered)'}${
                              isReviewed ? ' - Flagged for review' : ''
                            }`}
                          >
                            {qNum}
                            {isReviewed && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Inactive Section Tab: Clean button showing e.g. "Part 2: 10 questions"
              return (
                <button
                  key={sec.name}
                  onClick={() => {
                    if (onSelectSection) {
                      onSelectSection(idx);
                    }
                    onSelectQuestion(sec.start);
                  }}
                  className="border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 rounded-xs px-3 sm:px-4 py-1.5 flex items-center gap-1.5 cursor-pointer transition text-xs whitespace-nowrap shrink-0 shadow-2xs"
                  title={`Switch to ${sec.name}`}
                >
                  <span className="font-bold text-slate-900">{sec.name}:</span>
                  <span className="italic text-slate-500 font-serif">
                    {sec.end - sec.start + 1} questions
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3. Right Tools: Review Checkbox, Blue Grid [ ::: ], Green [ Submit ] */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Review Flag Checkbox for Current Question */}
            <label className="hidden lg:flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700 bg-white px-2.5 py-1 rounded-xs border border-slate-300 shadow-2xs hover:bg-slate-50 transition">
              <input
                type="checkbox"
                checked={isCurrentReviewed}
                onChange={() => onToggleReview(currentQuestion)}
                className="w-3.5 h-3.5 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
              />
              <Flag
                className={`w-3.5 h-3.5 ${
                  isCurrentReviewed ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
                }`}
              />
              <span className="select-none">Review</span>
            </label>

            {/* Blue Grid Review Button [ ::: ] */}
            <button
              onClick={() => setShowGridModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-8 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-xs flex items-center justify-center cursor-pointer shadow-xs transition"
              title="Overview & Review all 40 questions"
            >
              <LayoutGrid className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
            </button>

            {/* Green Submit Button [ Submit ✈ ] */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="h-8 bg-[#00875a] hover:bg-[#007048] text-white font-bold text-xs sm:text-[13px] px-3.5 rounded-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition"
              title="Submit Final Answers"
            >
              <span>Submit</span>
              <Send className="w-3 h-3 -rotate-12 fill-white ml-0.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* 40-QUESTION OVERVIEW & REVIEW MODAL (Triggered by [ ::: ] Grid Button) */}
      {showGridModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 cd-ielts-font space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Question Overview & Review
                  </h3>
                  <p className="text-xs text-slate-500">
                    {answeredCount} of {totalQuestions} answered • {unansweredCount} remaining
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Sections Grid */}
            <div className="overflow-y-auto space-y-4 flex-1 pr-1">
              {sectionBounds.map((sec, sIdx) => (
                <div key={sec.name} className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>
                      {sec.name} (Questions {sec.start}–{sec.end})
                    </span>
                    <button
                      onClick={() => {
                        onSelectSection?.(sIdx);
                        onSelectQuestion(sec.start);
                        setShowGridModal(false);
                      }}
                      className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      Go to {sec.name} →
                    </button>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {Array.from(
                      { length: sec.end - sec.start + 1 },
                      (_, i) => sec.start + i
                    ).map((qNum) => {
                      const isCurrent = qNum === currentQuestion;
                      const ans = answers[qNum];
                      const isAnswered =
                        ans !== undefined &&
                        ans !== null &&
                        (Array.isArray(ans) ? ans.length > 0 : ans.toString().trim() !== '');
                      const isReviewed = !!reviewStatus[qNum];

                      return (
                        <div key={qNum} className="relative group">
                          <button
                            onClick={() => {
                              onSelectSection?.(sIdx);
                              onSelectQuestion(qNum);
                              setShowGridModal(false);
                            }}
                            className={`w-full h-9 rounded-sm border text-xs font-bold flex items-center justify-center transition cursor-pointer ${
                              isCurrent
                                ? 'border-slate-900 bg-slate-900 text-white ring-2 ring-slate-400'
                                : isAnswered
                                ? 'border-slate-400 bg-slate-100 text-slate-900 border-b-2 border-b-slate-700'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                            }`}
                            title={`Jump to Question ${qNum}`}
                          >
                            {qNum}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleReview(qNum);
                            }}
                            className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center transition cursor-pointer shadow-xs ${
                              isReviewed
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-200 hover:bg-amber-200 text-slate-600 opacity-0 group-hover:opacity-100'
                            }`}
                            title={isReviewed ? 'Remove Review Flag' : 'Flag for Review'}
                          >
                            <Flag className="w-2.5 h-2.5 fill-current" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Legend and Close */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs border border-slate-400 bg-slate-100 border-b-2 border-b-slate-700 inline-block" />
                  Answered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs border border-slate-300 bg-white inline-block" />
                  Unanswered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  Review Flag
                </span>
              </div>

              <button
                onClick={() => setShowGridModal(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition cursor-pointer ml-auto"
              >
                Return to Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal before Final Submission */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 cd-ielts-font space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
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
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 leading-relaxed">
                ⚠️ You still have <strong>{unansweredCount} unanswered questions</strong>. Once submitted, your answers will be evaluated for Band Score.
              </p>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 40 questions completed! Ready to submit.</span>
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
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer"
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
