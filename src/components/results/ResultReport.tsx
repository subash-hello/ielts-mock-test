import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Sparkles,
  Building2,
  User,
  Headphones,
  Layers,
  PenTool,
  Maximize2,
  X,
  Award,
  AlertCircle,
  FileText
} from 'lucide-react';
import type { IELTSMockTest, TestResult } from '../../types/ielts';
import { evaluateTestAnswers } from '../../utils/scoring';
import { AIDiagnosticReportModal } from './AIDiagnosticReportModal';

export interface FullMockReportDetails {
  fullMockTitle: string;
  overallBand: number;
  listeningResult: TestResult;
  readingResult: TestResult;
  writingResult?: TestResult;
  listeningTest: IELTSMockTest;
  readingTest: IELTSMockTest;
  writingTest?: IELTSMockTest;
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
  const [zoomDiagramModal, setZoomDiagramModal] = useState<boolean>(false);
  const [activeReviewModule, setActiveReviewModule] = useState<'listening' | 'reading' | 'writing'>(() => {
    return fullMockDetails ? 'listening' : test.module;
  });

  const isWritingActive = activeReviewModule === 'writing' || (!fullMockDetails && test.module === 'writing');

  // Current active test and result being reviewed
  const activeTest = fullMockDetails
    ? activeReviewModule === 'listening'
      ? fullMockDetails.listeningTest
    : activeReviewModule === 'writing' && fullMockDetails.writingTest
      ? fullMockDetails.writingTest
      : fullMockDetails.readingTest
    : test;

  const activeResult = fullMockDetails
    ? activeReviewModule === 'listening'
      ? fullMockDetails.listeningResult
    : activeReviewModule === 'writing' && fullMockDetails.writingResult
      ? fullMockDetails.writingResult
      : fullMockDetails.readingResult
    : result;

  // Writing data extraction
  const writingSub = fullMockDetails
    ? fullMockDetails.writingResult?.writingSubmission
    : result.writingSubmission || activeResult.writingSubmission;

  const task1Words = writingSub?.task1WordCount || 0;
  const task2Words = writingSub?.task2WordCount || 0;
  const task1Essay = writingSub?.task1Essay || '';
  const task2Essay = writingSub?.task2Essay || '';
  const task1Band = writingSub?.task1Band;
  const task2Band = writingSub?.task2Band;
  const writingOverallBand =
    writingSub?.overallWritingBand ??
    (activeResult.module === 'writing' && activeResult.bandScore > 0 ? activeResult.bandScore : undefined);
  const hasWritingGrade = typeof writingOverallBand === 'number' && writingOverallBand > 0;
  const adminFeedback = writingSub?.adminFeedback;
  const reviewedBy = writingSub?.reviewedBy;
  const reviewedAt = writingSub?.reviewedAt;

  // Full mock calculations
  const listBand = fullMockDetails?.listeningResult?.bandScore ?? 0;
  const readBand = fullMockDetails?.readingResult?.bandScore ?? 0;
  const hasFullMockWriting = !!fullMockDetails?.writingTest;

  // Overall Band calculation
  const overallDisplayBand = fullMockDetails
    ? hasFullMockWriting
      ? hasWritingGrade
        ? Math.round(((listBand + readBand + writingOverallBand!) / 3) * 2) / 2
        : Math.round(((listBand + readBand) / 2) * 2) / 2
      : fullMockDetails.overallBand
    : test.module === 'writing'
    ? writingOverallBand || 0
    : result.bandScore;

  // Reading / Listening questions & results
  const allQuestions = isWritingActive
    ? []
    : activeTest.sections.flatMap((s) => s.questionGroups.flatMap((g) => g.questions));

  const { questionResults } = isWritingActive
    ? { questionResults: {} as Record<number, boolean> }
    : evaluateTestAnswers(activeTest, activeResult.answers);

  const filteredQuestions = allQuestions.filter((q) => {
    const isCorrect = !!questionResults[q.questionNumber];
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'incorrect') return !isCorrect;
    return true;
  });

  // Determine band performance descriptor
  const getBandDescriptor = (band: number) => {
    if (band >= 8.5) return 'Expert / Very Good User';
    if (band >= 7.5) return 'Good / Very Good User';
    if (band >= 6.5) return 'Competent User';
    if (band >= 5.5) return 'Modest User';
    if (band > 0) return 'Limited User';
    return 'Pending Evaluation';
  };

  const task1Section = activeTest.sections[0];
  const task2Section = activeTest.sections[1];
  const task1Prompt = task1Section?.questionGroups[0]?.questions[0]?.prompt || '';
  const task2Prompt = task2Section?.questionGroups[0]?.questions[0]?.prompt || '';

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
              <span className="font-extrabold text-xs text-slate-900 tracking-tight">
                MOCK TEST <span className="text-[10px] text-slate-500 font-normal">from Master IELTS AI</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isWritingActive && (
              <button
                onClick={() => setShowDiagnosticModal(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Diagnostic Report</span>
              </button>
            )}
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
          <div className="space-y-2 flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <img src="/images/masterieltsai-logo.png" alt="MasterIELTS AI" className="h-5 object-contain mr-1" />
              <span className="text-slate-300">•</span>
              <span className="text-xs uppercase font-bold text-red-600 tracking-wider">
                {fullMockDetails ? 'Full Mock Examination Report' : isWritingActive ? 'Official Academic Writing Report' : 'Official Diagnostic Report'}
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
                <span>Result verified by <strong>{result.consultancyName}</strong></span>
              </div>
            )}

            {/* Module Breakdown Cards */}
            {fullMockDetails ? (
              <div className={`grid grid-cols-1 ${hasFullMockWriting ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3 pt-3`}>
                {/* Listening Card */}
                <div
                  onClick={() => setActiveReviewModule('listening')}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    activeReviewModule === 'listening' ? 'bg-purple-50/70 border-purple-400 ring-2 ring-purple-200' : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-purple-900">
                      <Headphones className="w-3.5 h-3.5 text-purple-600" />
                      Listening
                    </span>
                    <span className="font-black text-sm text-purple-700">
                      Band {fullMockDetails.listeningResult.bandScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{fullMockDetails.listeningResult.correctCount}/40 correct</span>
                    <span>•</span>
                    <span>{Math.floor(fullMockDetails.listeningResult.timeTakenSeconds / 60)} mins</span>
                  </div>
                </div>

                {/* Reading Card */}
                <div
                  onClick={() => setActiveReviewModule('reading')}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    activeReviewModule === 'reading' ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-200' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-blue-900">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Reading
                    </span>
                    <span className="font-black text-sm text-blue-700">
                      Band {fullMockDetails.readingResult.bandScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{fullMockDetails.readingResult.correctCount}/40 correct</span>
                    <span>•</span>
                    <span>{Math.floor(fullMockDetails.readingResult.timeTakenSeconds / 60)} mins</span>
                  </div>
                </div>

                {/* Writing Card (if 3-module Full Mock) */}
                {hasFullMockWriting && (
                  <div
                    onClick={() => setActiveReviewModule('writing')}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      activeReviewModule === 'writing' ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                        <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                        Writing
                      </span>
                      {hasWritingGrade ? (
                        <span className="font-black text-sm text-emerald-700">
                          Band {writingOverallBand!.toFixed(1)}
                        </span>
                      ) : (
                        <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Pending Grade
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>T1: {task1Words}w • T2: {task2Words}w</span>
                      {hasWritingGrade && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-emerald-700">Graded</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : isWritingActive ? (
              <div className="flex flex-wrap items-center gap-3 pt-3 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <PenTool className="w-4 h-4 text-emerald-600" />
                  <span>Task 1: <strong>{task1Words} words</strong> (Min: 150)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Task 2: <strong>{task2Words} words</strong> (Min: 250)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Time Taken: <strong>{Math.floor(result.timeTakenSeconds / 60)} mins</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  {hasWritingGrade ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Examiner Graded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                      <Clock className="w-4 h-4 text-amber-600" /> Awaiting Teacher Evaluation
                    </span>
                  )}
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
              {fullMockDetails
                ? hasFullMockWriting && !hasWritingGrade
                  ? 'Provisional IELTS Band'
                  : 'Overall IELTS Band'
                : isWritingActive && !hasWritingGrade
                ? 'Evaluation Status'
                : 'Estimated IELTS Band'}
            </span>
            <div className="text-5xl font-black tracking-tight my-1 font-mono">
              {isWritingActive && !hasWritingGrade ? (
                <span className="text-3xl font-extrabold text-amber-200">Pending</span>
              ) : (
                overallDisplayBand.toFixed(1)
              )}
            </div>
            <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-medium inline-block mt-1">
              {fullMockDetails && hasFullMockWriting && !hasWritingGrade
                ? 'Writing Pending Evaluation'
                : getBandDescriptor(overallDisplayBand)}
            </span>
          </div>
        </div>

        {/* IELTS Official Band Scale Conversion Matrix OR Writing Assessment Criteria */}
        {isWritingActive ? (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Official IELTS Academic Writing Assessment Criteria</span>
              </h3>
              <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Cambridge Rubric
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">1. Task Achievement / Response</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Completeness of Task 1 report (trend synthesis, data overview) and depth of Task 2 essay arguments with relevant examples.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">2. Coherence and Cohesion</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Logical paragraph organization, clear progression throughout, and accurate use of cohesive devices and discourse markers.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">3. Lexical Resource</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Range and precision of academic vocabulary, natural collocation, awareness of style and register, and minimal spelling errors.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">4. Grammatical Range & Accuracy</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Mix of simple and complex sentence structures, punctuation mastery, and low frequency of error-free sentence formations.
                </p>
              </div>
            </div>
          </div>
        ) : (
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
        )}

        {/* Full Mock Module Review Selector Tabs */}
        {fullMockDetails && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Select Module for Question & Response Review
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Currently reviewing:{' '}
                <strong>
                  {activeReviewModule === 'listening'
                    ? 'Listening Module'
                    : activeReviewModule === 'reading'
                    ? 'Reading Module'
                    : 'Academic Writing Module'}
                </strong>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveReviewModule('listening')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeReviewModule === 'reading'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reading (Band {fullMockDetails.readingResult.bandScore.toFixed(1)})</span>
              </button>
              {hasFullMockWriting && (
                <button
                  type="button"
                  onClick={() => setActiveReviewModule('writing')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeReviewModule === 'writing'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>
                    Writing {hasWritingGrade ? `(Band ${writingOverallBand!.toFixed(1)})` : '(Pending)'}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* REVIEW BODY A: WRITING MODULE REVIEW (ESSAYS, SVGs, RUBRIC)    */}
        {/* ============================================================== */}
        {isWritingActive ? (
          <div className="space-y-6">
            {/* Teacher / Examiner Rubric Evaluation Card */}
            <div className={`p-5 sm:p-6 rounded-2xl border ${
              hasWritingGrade
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-amber-50/80 border-amber-300'
            } shadow-xs space-y-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    hasWritingGrade ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    <PenTool className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {hasWritingGrade ? 'Verified Teacher Evaluation & Band Scorecard' : 'Writing Submission Awaiting Teacher Evaluation'}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {hasWritingGrade
                        ? `Official marking evaluated by ${reviewedBy || 'Academic Examiner'} on ${reviewedAt ? new Date(reviewedAt).toLocaleDateString() : 'recent evaluation'}`
                        : 'Your essays have been synchronized to your consultancy portal. Your teacher will evaluate and assign band scores.'}
                    </p>
                  </div>
                </div>

                {hasWritingGrade && (
                  <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-xs">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Writing</span>
                      <span className="text-lg font-black text-emerald-800 font-mono">
                        Band {writingOverallBand!.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Rubric Breakdown Pills */}
              {hasWritingGrade ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-emerald-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Task 1 (Report / Summary)</span>
                      <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Band {typeof task1Band === 'number' ? task1Band.toFixed(1) : '—'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      Weighting: 1/3 • Word count: {task1Words} words (Min: 150)
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Task 2 (Discursive Essay)</span>
                      <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Band {typeof task2Band === 'number' ? task2Band.toFixed(1) : '—'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      Weighting: 2/3 (counts double) • Word count: {task2Words} words (Min: 250)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Examiner Band Scoring Workflow:</strong> In official IELTS, Academic Writing requires manual marking by certified teachers against the 4 assessment criteria. Your consultancy teacher can input band scores in the Consultancy Portal under "Grade Writing" and publish the final result.
                  </div>
                </div>
              )}

              {/* Examiner Diagnostic Remarks */}
              {adminFeedback && (
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 text-xs space-y-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Examiner Diagnostic Feedback & Rubric Remarks:
                  </span>
                  <p className="italic text-slate-700 text-xs leading-relaxed font-sans bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    "{adminFeedback}"
                  </p>
                </div>
              )}
            </div>

            {/* Task 1 Review Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Academic Writing • Task 1
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Report / Data Analysis (Suggested: 20 Minutes • 150 Words Minimum)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    task1Words >= 150
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}>
                    {task1Words >= 150 ? '✓ ' : '⚠️ '}{task1Words} words (Min: 150)
                  </span>
                  {typeof task1Band === 'number' && (
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-emerald-600 text-white">
                      Band {task1Band.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-5 text-xs">
                {/* Task Prompt */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Task 1 Instructions & Prompt:</span>
                  <p className="font-sans whitespace-pre-wrap">{task1Prompt}</p>
                </div>

                {/* SVG Visual Diagram from Passage */}
                {task1Section?.passageContent && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Official Diagram / Chart:</span>
                      <button
                        type="button"
                        onClick={() => setZoomDiagramModal(true)}
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" /> Zoom Diagram
                      </button>
                    </div>
                    <div
                      className="border border-slate-200 rounded-xl p-3 bg-white max-h-96 overflow-y-auto cursor-pointer hover:border-indigo-400 transition"
                      onClick={() => setZoomDiagramModal(true)}
                      dangerouslySetInnerHTML={{ __html: task1Section.passageContent }}
                    />
                  </div>
                )}

                {/* Candidate's Submitted Essay */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Candidate's Submitted Response:</span>
                    <span className="text-[11px] text-slate-500 font-mono">{task1Words} words written</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 whitespace-pre-wrap leading-relaxed select-text font-sans text-xs sm:text-sm">
                    {task1Essay || (
                      <span className="text-slate-400 italic">No response submitted for Task 1.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Task 2 Review Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                    Academic Writing • Task 2
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Discursive Essay (Suggested: 40 Minutes • 250 Words Minimum)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    task2Words >= 250
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}>
                    {task2Words >= 250 ? '✓ ' : '⚠️ '}{task2Words} words (Min: 250)
                  </span>
                  {typeof task2Band === 'number' && (
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-emerald-600 text-white">
                      Band {task2Band.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-5 text-xs">
                {/* Task Prompt */}
                <div className="bg-[#f8f9fa] p-4 rounded-xl border-2 border-slate-300 text-slate-800 leading-relaxed space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 border-b border-slate-200 pb-1.5">
                    <span>CAMBRIDGE IELTS ACADEMIC WRITING TASK 2</span>
                    <span>Write at least 250 words</span>
                  </div>
                  <p className="font-sans whitespace-pre-wrap text-slate-900 font-medium">{task2Prompt}</p>
                  <p className="italic text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                    Give reasons for your answer and include any relevant examples from your own knowledge or experience.
                  </p>
                </div>

                {/* Candidate's Submitted Essay */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Candidate's Submitted Response:</span>
                    <span className="text-[11px] text-slate-500 font-mono">{task2Words} words written</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 whitespace-pre-wrap leading-relaxed select-text font-sans text-xs sm:text-sm">
                    {task2Essay || (
                      <span className="text-slate-400 italic">No response submitted for Task 2.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* REVIEW BODY B: READING / LISTENING 40 QUESTIONS WITH EVIDENCE  */
          /* ============================================================== */
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
        )}
      </main>

      {/* Diagram Zoom Modal */}
      {zoomDiagramModal && task1Section?.passageContent && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer animate-in fade-in"
          onClick={() => setZoomDiagramModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl cursor-default"
          >
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <span className="font-extrabold text-slate-900 text-sm">
                Task 1 Diagram & Visual Analysis (High Resolution)
              </span>
              <button
                onClick={() => setZoomDiagramModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: task1Section.passageContent }}
            />
          </div>
        </div>
      )}

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
