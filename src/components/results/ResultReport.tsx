import React, { useState } from 'react';
import { CheckCircle2, Clock, ArrowLeft, RotateCcw, BookOpen, Sparkles, Building2, User, Headphones, Layers } from 'lucide-react';
import type { IELTSMockTest, TestResult } from '../../types/ielts';
import { evaluateTestAnswers } from '../../utils/scoring';
import { AIDiagnosticReportModal } from './AIDiagnosticReportModal';

export interface FullMockReportDetails {
  fullMockTitle: string;
  overallBand: number;
  listeningResult: TestResult;
  readingResult: TestResult;
  listeningTest: IELTSMockTest;
  readingTest: IELTSMockTest;
}

interface ResultReportProps {
  test: IELTSMockTest;
  result: TestResult;
  onReturnHub: () => void;
  onRetakeTest: () => void;
  fullMockDetails?: FullMockReportDetails;
}

export const ResultReport: React.FC<ResultReportProps> = ({
  test,
  result,
  onReturnHub,
  onRetakeTest,
  fullMockDetails
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [showDiagnosticModal, setShowDiagnosticModal] = useState<boolean>(false);
  const [activeReviewModule, setActiveReviewModule] = useState<'listening' | 'reading' | 'writing'>(() => {
    return fullMockDetails ? 'listening' : test.module;
  });

  // Current active test and result being reviewed
  const activeTest = fullMockDetails
    ? activeReviewModule === 'listening'
      ? fullMockDetails.listeningTest
      : fullMockDetails.readingTest
    : test;

  const activeResult = fullMockDetails
    ? activeReviewModule === 'listening'
      ? fullMockDetails.listeningResult
      : fullMockDetails.readingResult
    : result;

  const allQuestions = activeTest.sections.flatMap((s) => s.questionGroups.flatMap((g) => g.questions));

  // Determine band performance descriptor
  const getBandDescriptor = (band: number) => {
    if (band >= 8.5) return 'Expert / Very Good User';
    if (band >= 7.5) return 'Good / Very Good User';
    if (band >= 6.5) return 'Competent User';
    if (band >= 5.5) return 'Modest User';
    return 'Limited User';
  };

  const { questionResults } = evaluateTestAnswers(activeTest, activeResult.answers);

  const filteredQuestions = allQuestions.filter((q) => {
    const isCorrect = !!questionResults[q.questionNumber];
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'incorrect') return !isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onReturnHub}
              className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-2.5 sm:px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Selection Hub</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-3">
              <img src="/images/masterieltsai-icon.png" alt="MasterIELTS AI" className="w-5 h-5 object-contain" />
              <span className="font-extrabold text-xs text-slate-900 tracking-tight">MOCK TEST <span className="text-[10px] text-slate-500 font-normal">from Master IELTS AI</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDiagnosticModal(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Diagnostic Report</span>
            </button>
            <button
              onClick={onRetakeTest}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Score Card Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <img src="/images/masterieltsai-logo.png" alt="MasterIELTS AI" className="h-5 object-contain mr-1" />
              <span className="text-slate-300">•</span>
              <span className="text-xs uppercase font-bold text-red-600 tracking-wider">
                {fullMockDetails ? 'Full Mock Examination Report' : 'Official Diagnostic Report'}
              </span>
              <span className="text-slate-300">•</span>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full">
                <User className="w-3 h-3 text-blue-600" />
                <span>{result.candidateName || 'Candidate'}</span>
                {result.candidateId && (
                  <span className="font-mono text-slate-500 font-normal">#{result.candidateId}</span>
                )}
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {fullMockDetails ? fullMockDetails.fullMockTitle : test.title}
            </h2>
            
            {result.consultancyName && (
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg font-medium">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Result synchronized to <strong>{result.consultancyName}</strong> Portal</span>
              </div>
            )}

            {fullMockDetails ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className={`p-3 rounded-xl border transition ${
                  activeReviewModule === 'listening' ? 'bg-purple-50/70 border-purple-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-purple-900">
                      <Headphones className="w-3.5 h-3.5 text-purple-600" />
                      Listening Module
                    </span>
                    <span className="font-black text-sm text-purple-700">Band {fullMockDetails.listeningResult.bandScore.toFixed(1)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>{fullMockDetails.listeningResult.correctCount}/40 correct</span>
                    <span>•</span>
                    <span>{Math.floor(fullMockDetails.listeningResult.timeTakenSeconds / 60)} mins</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border transition ${
                  activeReviewModule === 'reading' ? 'bg-blue-50/70 border-blue-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-blue-900">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Reading Module
                    </span>
                    <span className="font-black text-sm text-blue-700">Band {fullMockDetails.readingResult.bandScore.toFixed(1)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>{fullMockDetails.readingResult.correctCount}/40 correct</span>
                    <span>•</span>
                    <span>{Math.floor(fullMockDetails.readingResult.timeTakenSeconds / 60)} mins</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Raw Score: <strong>{result.correctCount} / {result.totalQuestions}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Time Taken: <strong>{Math.floor(result.timeTakenSeconds / 60)} mins</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Accuracy: <strong>{((result.correctCount / result.totalQuestions) * 100).toFixed(1)}%</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Band Score Pill */}
          <div className="bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-2xl p-6 text-center shadow-lg min-w-44 flex-shrink-0">
            <span className="text-xs uppercase tracking-wider text-red-200 font-semibold block">
              {fullMockDetails ? 'Overall IELTS Band' : 'Estimated IELTS Band'}
            </span>
            <div className="text-5xl font-black tracking-tight my-1">
              {(fullMockDetails ? fullMockDetails.overallBand : result.bandScore).toFixed(1)}
            </div>
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
              {getBandDescriptor(fullMockDetails ? fullMockDetails.overallBand : result.bandScore)}
            </span>
          </div>
        </div>

        {/* IELTS Official Band Scale Conversion Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-3">
            Official Cambridge IELTS Academic Band Conversion Scale
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
            {[
              { range: '39-40', band: '9.0' },
              { range: '37-38', band: '8.5' },
              { range: '35-36', band: '8.0' },
              { range: '33-34', band: '7.5' },
              { range: '30-32', band: '7.0' },
              { range: '27-29', band: '6.5' },
              { range: '23-26', band: '6.0' },
              { range: '19-22', band: '5.5' },
            ].map((scale) => {
              const currentBandVal = fullMockDetails ? fullMockDetails.overallBand : result.bandScore;
              const isUserBand = currentBandVal.toFixed(1) === scale.band;

              return (
                <div
                  key={scale.band}
                  className={`p-2.5 rounded-xl border transition ${
                    isUserBand
                      ? 'bg-red-50 border-2 border-red-500 text-red-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-slate-400 block text-[10px]">{scale.range}</span>
                  <span className="font-bold text-sm">Band {scale.band}</span>
                  {isUserBand && (
                    <span className="block text-[9px] uppercase tracking-wider text-red-600 font-extrabold mt-0.5">
                      Your Score
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Mock Module Review Selector */}
        {fullMockDetails && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Select Module for Question Review
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Currently reviewing: <strong>{activeReviewModule === 'listening' ? 'Listening Module' : 'Reading Module'}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveReviewModule('listening')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeReviewModule === 'listening'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listening (Band {fullMockDetails.listeningResult.bandScore.toFixed(1)})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewModule('reading')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeReviewModule === 'reading'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reading (Band {fullMockDetails.readingResult.bandScore.toFixed(1)})</span>
              </button>
            </div>
          </div>
        )}

        {/* Question-by-Question Review with Evidence */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Detailed Solutions, Transcripts & Passage Evidence
              </h3>
              <p className="text-xs text-slate-500">
                Review your answers against the official Cambridge answer keys
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-md transition ${
                  filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({allQuestions.length})
              </button>
              <button
                onClick={() => setFilterMode('incorrect')}
                className={`px-3 py-1 rounded-md transition ${
                  filterMode === 'incorrect' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Incorrect ({allQuestions.length - activeResult.correctCount})
              </button>
              <button
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1 rounded-md transition ${
                  filterMode === 'correct' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Correct ({activeResult.correctCount})
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {filteredQuestions.map((q) => {
              const userAns = activeResult.answers[q.questionNumber];
              const isCorrect = !!questionResults[q.questionNumber];
              const displayUser = Array.isArray(userAns) ? userAns.join(', ') : (userAns || 'No Answer Provided');
              const displayCorrect = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer;

              return (
                <div key={q.questionNumber} className="p-5 hover:bg-slate-50/50 transition flex flex-col sm:flex-row gap-4">
                  <div className="flex sm:flex-col items-center gap-2 min-w-16">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {q.questionNumber}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {q.prompt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
                      <div>
                        <span className="text-slate-500 mr-1">Your Answer:</span>
                        <strong className={isCorrect ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                          {displayUser}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 mr-1">Correct Answer:</span>
                        <strong className="text-emerald-700 font-bold">
                          {displayCorrect}
                        </strong>
                      </div>
                    </div>

                    {/* Passage Evidence Box */}
                    {q.passageEvidence && (
                      <div className="bg-yellow-50/80 p-3 rounded-xl border border-yellow-200 text-slate-800 text-xs mt-2">
                        <span className="font-bold text-yellow-900 block mb-0.5">
                          Passage / Transcript Evidence ({q.passageEvidence.paragraph}):
                        </span>
                        <p className="italic text-slate-700 font-serif">
                          "{q.passageEvidence.quote}"
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs">
                        <span className="font-bold text-slate-800 mr-1">Analysis:</span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Official AI Diagnostic Report Modal */}
      {showDiagnosticModal && (
        <AIDiagnosticReportModal
          reportData={{
            studentName: activeResult.candidateName || result.candidateName || 'Candidate',
            bandScore: activeResult.bandScore,
            module: activeResult.module,
            testTitle: activeTest.title,
            correctCount: activeResult.correctCount,
            totalQuestions: activeResult.totalQuestions,
            timeTakenSeconds: activeResult.timeTakenSeconds
          }}
          consultancyName={result.consultancyName || 'IELTS Partner Consultancy'}
          branchName="Academic Department"
          onClose={() => setShowDiagnosticModal(false)}
        />
      )}
    </div>
  );
};
