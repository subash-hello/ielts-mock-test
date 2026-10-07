import React, { useState, useEffect, useRef } from 'react';
import type {
  IELTSMockTest,
  CandidateAnswers,
  ReviewStatus,
  ExamSettings,
  TestResult,
  FullMockTest,
  WritingSubmission
} from './types/ielts';
import type {
  CandidateSession
} from './types/consultancy';
import { ConsultancyService } from './services/consultancyService';
import { calculateBandScore, evaluateTestAnswers } from './utils/scoring';
import { saveTestResultToSupabase, fetchMockTestsFromSupabase } from './lib/supabase';
import { allMockTests, allFullMockTests } from './data/mockTests';

// Kiosk & Student Flow Components (Blueprint Screen 6.1 - 6.5)
import { DirectoryLandingView } from './components/landing/DirectoryLandingView';
import { BranchLoginView } from './components/kiosk/BranchLoginView';
import { StudentNameView } from './components/kiosk/StudentNameView';
import { TestSelectionView } from './components/kiosk/TestSelectionView';
import { ConfirmationStartView } from './components/kiosk/ConfirmationStartView';
import { SubmissionConfirmedView } from './components/exam/SubmissionConfirmedView';

// Exam Screen Components
import { CDHeader } from './components/exam/CDHeader';
import { ReadingExamView } from './components/exam/ReadingExamView';
import { ListeningExamView } from './components/exam/ListeningExamView';
import { WritingExamView } from './components/exam/WritingExamView';
import { QuestionPalette } from './components/exam/QuestionPalette';

// Consultancy Portal Components (Blueprint Screen 6.6 - 6.10, Section 7)
import { ConsultancyLayout, type ConsultancySubTab } from './components/consultancy/ConsultancyLayout';
import { DashboardView } from './components/consultancy/DashboardView';
import { LaunchConsoleView } from './components/consultancy/LaunchConsoleView';
import { LiveMonitorView } from './components/consultancy/LiveMonitorView';
import { CandidatesView } from './components/consultancy/CandidatesView';
import { ResultsView } from './components/consultancy/ResultsView';
import { AIReportsView } from './components/consultancy/AIReportsView';
import { TestLibraryView } from './components/consultancy/TestLibraryView';
import { PcsView } from './components/consultancy/PcsView';
import { SettingsView } from './components/consultancy/SettingsView';

// Super Admin & Public Lookup (Blueprint Screen 6.11 - 6.12)
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { PublicResultLookupView } from './components/results/PublicResultLookupView';

import { Pause, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & Screen State matching Blueprint Sitemap
  type AppRoute =
    | 'landing'
    | 'branch-login'
    | 'kiosk-student'
    | 'kiosk-test'
    | 'kiosk-confirm'
    | 'kiosk-exam'
    | 'kiosk-done'
    | 'consultancy'
    | 'super-admin'
    | 'result-lookup';

  const [activeRoute, setActiveRoute] = useState<AppRoute>('landing');
  const [currentBranchCode, setCurrentBranchCode] = useState<string>('kiec-1');
  const [directPcStation, setDirectPcStation] = useState<string | undefined>(undefined);
  const [consultancySubTab, setConsultancySubTab] = useState<ConsultancySubTab>('dashboard');

  // Candidate Session
  const [, setCandidateSession] = useState<CandidateSession | null>(() =>
    ConsultancyService.getCurrentCandidateSession()
  );

  // Active Station Name
  const [terminalStationName, setTerminalStationName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const urlStation = p.get('station') || p.get('st') || p.get('pc');
      if (urlStation) {
        const clean = urlStation.trim().toUpperCase();
        const formatted = clean.startsWith('PC-') ? clean : `PC-${clean.replace(/^PC/i, '')}`;
        return formatted;
      }
      const saved = localStorage.getItem('ielts_terminal_pc');
      if (saved) return saved;
    }
    return 'PC-01';
  });

  // Selected Consultancy / Branch
  const [selectedConsultancyId, setSelectedConsultancyId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const urlCid = p.get('consultancy') || p.get('cid');
      if (urlCid) return urlCid;
      const urlBranch = p.get('branch') || p.get('access') || p.get('code');
      if (urlBranch) {
        const found = ConsultancyService.getConsultancyByBranchCode(urlBranch);
        if (found) return found.id;
      }
    }
    const saved = ConsultancyService.getCurrentCandidateSession();
    return saved?.consultancyId || 'kiec-lalitpur';
  });

  // Candidate info
  const [activeCandidateInfo, setActiveCandidateInfo] = useState<{
    name: string;
    candidateId: string;
    targetBand?: number;
    stationName?: string;
    consultancyId?: string;
  } | null>(() => {
    const saved = ConsultancyService.getCurrentCandidateSession();
    if (!saved) return null;
    return {
      name: saved.candidateName,
      candidateId: saved.candidateId,
      targetBand: saved.targetBand,
      stationName: saved.stationName,
      consultancyId: saved.consultancyId
    };
  });

  // Test catalog & current test
  const [tests, setTests] = useState<IELTSMockTest[]>(allMockTests);
  const [currentTest, setCurrentTest] = useState<IELTSMockTest | null>(null);
  const [selectedFullMock, setSelectedFullMock] = useState<FullMockTest | undefined>(undefined);

  // Exam runtime state
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<CandidateAnswers>({});
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>({});
  const [remainingSeconds, setRemainingSeconds] = useState<number>(3600);
  const [audioVolume, setAudioVolume] = useState<number>(80);
  const [settings, setSettings] = useState<ExamSettings>({
    fontSize: 'normal',
    contrast: 'standard',
    showTimer: true
  });
  const [isExamPausedByTeacher, setIsExamPausedByTeacher] = useState<boolean>(false);
  const [invigilatorMessageBanner, setInvigilatorMessageBanner] = useState<string | null>(null);

  // Active result & past results
  const [activeResult, setActiveResult] = useState<TestResult | null>(null);
  const [, setPastResults] = useState<TestResult[]>(() => {
    try {
      const saved = localStorage.getItem('ielts_mock_past_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Full Mock Test sequence
  const [activeFullMock, setActiveFullMock] = useState<{
    fullMock: FullMockTest;
    currentStep: 'listening' | 'reading' | 'writing';
    listeningResult?: TestResult;
    readingResult?: TestResult;
    writingResult?: TestResult;
    overallBand?: number;
  } | null>(null);
  const [showFullMockIntermission, setShowFullMockIntermission] = useState<boolean>(false);
  const [intermissionCountdown, setIntermissionCountdown] = useState<number>(10); // Blueprint: 10-second breather screen

  // References for live closures
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const remainingSecondsRef = useRef(remainingSeconds);
  remainingSecondsRef.current = remainingSeconds;
  const currentTestRef = useRef(currentTest);
  currentTestRef.current = currentTest;
  const examStartTimeRef = useRef<number | null>(null);
  const timeSpentSecondsRef = useRef<number>(0);

  const syncExamSessionToStorage = (updates: Record<string, any>) => {
    try {
      const raw = localStorage.getItem('ielts_active_kiosk_exam_session');
      if (raw) {
        const parsed = JSON.parse(raw);
        localStorage.setItem(
          'ielts_active_kiosk_exam_session',
          JSON.stringify({
            ...parsed,
            ...updates,
            lastUpdatedTimestamp: Date.now()
          })
        );
      }
    } catch {
      // storage quota or parsing safeguard
    }
  };

  // Navigation function that updates history and state
  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      parseUrlRoute();
    }
  };

  // URL route parser matching Blueprint sitemap
  const parseUrlRoute = () => {
    if (typeof window === 'undefined') return;
    const pathname = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);

    // Support deep query links
    const mode = params.get('mode');
    const branchParam = params.get('branch') || params.get('access') || params.get('code');
    const stationParam = params.get('station') || params.get('st') || params.get('pc');

    if (stationParam) {
      const clean = stationParam.trim().toUpperCase();
      const formatted = clean.startsWith('PC-') ? clean : `PC-${clean.replace(/^PC/i, '')}`;
      setTerminalStationName(formatted);
      localStorage.setItem('ielts_terminal_pc', formatted);
    }

    // QA-01: Check if an active exam session exists on reload and restore it
    const savedExamRaw = typeof window !== 'undefined' ? localStorage.getItem('ielts_active_kiosk_exam_session') : null;
    let hasRestoredActiveExam = false;

    if (
      savedExamRaw &&
      !pathname.startsWith('/admin') &&
      !pathname.startsWith('/consultancy') &&
      !pathname.startsWith('/result')
    ) {
      try {
        const savedExam = JSON.parse(savedExamRaw);
        const elapsedSinceLastUpdate = Math.max(
          0,
          Math.floor((Date.now() - (savedExam.lastUpdatedTimestamp || Date.now())) / 1000)
        );
        const restoredRemaining = Math.max(
          0,
          (savedExam.remainingSeconds ?? 3600) - elapsedSinceLastUpdate
        );

        if (savedExam.test && restoredRemaining > 5) {
          setCurrentTest(savedExam.test);
          setSelectedFullMock(savedExam.fullMock);
          if (savedExam.activeFullMock) {
            setActiveFullMock(savedExam.activeFullMock);
          }
          if (savedExam.candidateInfo) {
            setActiveCandidateInfo(savedExam.candidateInfo);
          }
          if (savedExam.terminalStationName) {
            setTerminalStationName(savedExam.terminalStationName);
          }
          if (savedExam.consultancyId) {
            setSelectedConsultancyId(savedExam.consultancyId);
          }
          if (savedExam.branchCode) {
            setCurrentBranchCode(savedExam.branchCode);
          }
          setCurrentQuestion(savedExam.currentQuestion || 1);
          setActiveSectionIndex(savedExam.activeSectionIndex || 0);
          setAnswers(savedExam.answers || {});
          setReviewStatus(savedExam.reviewStatus || {});
          setRemainingSeconds(restoredRemaining);
          timeSpentSecondsRef.current = (savedExam.timeSpentSeconds || 0) + elapsedSinceLastUpdate;
          examStartTimeRef.current = savedExam.startedAtTimestamp || (Date.now() - timeSpentSecondsRef.current * 1000);
          setActiveRoute('kiosk-exam');
          hasRestoredActiveExam = true;
        } else {
          localStorage.removeItem('ielts_active_kiosk_exam_session');
        }
      } catch (e) {
        console.warn('Failed to restore active exam session:', e);
        localStorage.removeItem('ielts_active_kiosk_exam_session');
      }
    }

    if (hasRestoredActiveExam) {
      return;
    }

    if (pathname === '/result' || pathname.startsWith('/result')) {
      setActiveRoute('result-lookup');
    } else if (pathname.startsWith('/admin') || mode === 'admin' || mode === 'super-admin') {
      setActiveRoute('super-admin');
    } else if (pathname.startsWith('/consultancy') || mode === 'consultancy') {
      const parts = pathname.split('/').filter(Boolean);
      if (parts[1]) {
        const sub = parts[1] as ConsultancySubTab;
        setConsultancySubTab(sub);
      }
      setActiveRoute('consultancy');
    } else if (pathname.startsWith('/b/')) {
      // Branch URL: /b/{branch-code} or /b/{branch-code}/{pc-id}
      const parts = pathname.replace(/^\/b\//, '').split('/').filter(Boolean);
      const bCode = parts[0] || 'kiec-1';
      setCurrentBranchCode(bCode);

      const found = ConsultancyService.getConsultancyByBranchCode(bCode);
      if (found) {
        setSelectedConsultancyId(found.id);
      }

      if (parts[1]) {
        // Direct station link: /b/kiec-1/pc-04
        const cleanSt = parts[1].trim().toUpperCase();
        const formatted = cleanSt.startsWith('PC-') ? cleanSt : `PC-${cleanSt.replace(/^PC/i, '')}`;
        setDirectPcStation(formatted);
        setTerminalStationName(formatted);
        localStorage.setItem('ielts_terminal_pc', formatted);
      }

      setActiveRoute('branch-login');
    } else if (pathname === '/kiosk/student') {
      setActiveRoute('kiosk-student');
    } else if (pathname === '/kiosk/test') {
      setActiveRoute('kiosk-test');
    } else if (pathname === '/kiosk/confirm') {
      setActiveRoute('kiosk-confirm');
    } else if (pathname === '/kiosk/exam') {
      setActiveRoute('kiosk-exam');
    } else if (pathname === '/kiosk/done') {
      setActiveRoute('kiosk-done');
    } else {
      if (branchParam) {
        setCurrentBranchCode(branchParam);
        setActiveRoute('branch-login');
      } else {
        setActiveRoute('landing');
      }
    }
  };

  useEffect(() => {
    parseUrlRoute();
    window.addEventListener('popstate', parseUrlRoute);
    return () => window.removeEventListener('popstate', parseUrlRoute);
  }, []);

  // Fetch mock tests dynamically from Supabase if valid
  useEffect(() => {
    fetchMockTestsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        setTests((prev) => {
          const countQ = (t: IELTSMockTest) =>
            t.sections.reduce(
              (acc, s) =>
                acc + s.questionGroups.reduce((gAcc, g) => gAcc + (g.questions?.length || 0), 0),
              0
            );

          return prev.map((localTest) => {
            const remote = data.find((r) => r.id === localTest.id);
            if (!remote) return localTest;
            const localCount = countQ(localTest);
            const remoteCount = countQ(remote);
            if (remoteCount >= 38 && remoteCount >= localCount) {
              return remote;
            }
            return localTest;
          });
        });
      }
    });
  }, []);

  // Synchronize results to telemetry periodically
  useEffect(() => {
    const timer = setTimeout(() => {
      ConsultancyService.pushLocalResultsToCloud(selectedConsultancyId);
    }, 1200);

    const unsub = ConsultancyService.subscribe((event: { type: string; payload: any }) => {
      if (event.type === 'REQUEST_STATION_RESULTS') {
        const reqCid = event.payload?.consultancyId;
        const canonical = ConsultancyService.getCanonicalConsultancyId(reqCid || selectedConsultancyId);
        ConsultancyService.pushLocalResultsToCloud(canonical);
      }
    });

    return () => {
      clearTimeout(timer);
      unsub();
    };
  }, [selectedConsultancyId]);

  // QA-02: Authoritative Countdown Timer (does not reset on answers keystrokes)
  useEffect(() => {
    if (activeRoute !== 'kiosk-exam' || !currentTest || isExamPausedByTeacher) return;

    const timer = setInterval(() => {
      timeSpentSecondsRef.current += 1;
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        const nextSec = prev - 1;
        if (nextSec % 5 === 0) {
          syncExamSessionToStorage({
            remainingSeconds: nextSec,
            timeSpentSeconds: timeSpentSecondsRef.current
          });
        }
        return nextSec;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeRoute, currentTest, isExamPausedByTeacher]);

  // Breather intermission between Full Mock sections (Blueprint: 10-second breather screen)
  const handleProceedToNextFullMockSection = () => {
    if (!activeFullMock) return;
    setShowFullMockIntermission(false);

    if (activeFullMock.currentStep === 'listening') {
      const readingTest = activeFullMock.fullMock.readingTest;
      setCurrentTest(readingTest);
      setCurrentQuestion(1);
      setActiveSectionIndex(0);
      setAnswers({});
      setReviewStatus({});
      setRemainingSeconds(readingTest.durationMinutes * 60);
      timeSpentSecondsRef.current = 0;
      examStartTimeRef.current = Date.now();
      const updatedFullMock = { ...activeFullMock, currentStep: 'reading' as const };
      setActiveFullMock(updatedFullMock);
      setIsExamPausedByTeacher(false);
      setActiveRoute('kiosk-exam');

      try {
        localStorage.setItem(
          'ielts_active_kiosk_exam_session',
          JSON.stringify({
            testId: readingTest.id,
            test: readingTest,
            fullMock: activeFullMock.fullMock,
            candidateInfo: activeCandidateInfo,
            currentQuestion: 1,
            activeSectionIndex: 0,
            answers: {},
            reviewStatus: {},
            remainingSeconds: readingTest.durationMinutes * 60,
            timeSpentSeconds: 0,
            startedAtTimestamp: Date.now(),
            lastUpdatedTimestamp: Date.now(),
            consultancyId: selectedConsultancyId,
            branchCode: currentBranchCode,
            terminalStationName,
            activeFullMock: updatedFullMock
          })
        );
      } catch (e) {
        console.warn('Failed to update full mock storage:', e);
      }
      return;
    }

    if (activeFullMock.currentStep === 'reading' && activeFullMock.fullMock.writingTest) {
      const writingTest = activeFullMock.fullMock.writingTest;
      setCurrentTest(writingTest);
      setCurrentQuestion(1);
      setActiveSectionIndex(0);
      setAnswers({});
      setReviewStatus({});
      setRemainingSeconds(writingTest.durationMinutes * 60);
      timeSpentSecondsRef.current = 0;
      examStartTimeRef.current = Date.now();
      const updatedFullMock = { ...activeFullMock, currentStep: 'writing' as const };
      setActiveFullMock(updatedFullMock);
      setIsExamPausedByTeacher(false);
      setActiveRoute('kiosk-exam');

      try {
        localStorage.setItem(
          'ielts_active_kiosk_exam_session',
          JSON.stringify({
            testId: writingTest.id,
            test: writingTest,
            fullMock: activeFullMock.fullMock,
            candidateInfo: activeCandidateInfo,
            currentQuestion: 1,
            activeSectionIndex: 0,
            answers: {},
            reviewStatus: {},
            remainingSeconds: writingTest.durationMinutes * 60,
            timeSpentSeconds: 0,
            startedAtTimestamp: Date.now(),
            lastUpdatedTimestamp: Date.now(),
            consultancyId: selectedConsultancyId,
            branchCode: currentBranchCode,
            terminalStationName,
            activeFullMock: updatedFullMock
          })
        );
      } catch (e) {
        console.warn('Failed to update full mock storage:', e);
      }
      return;
    }
  };

  useEffect(() => {
    if (!showFullMockIntermission) return;
    const timer = setInterval(() => {
      setIntermissionCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleProceedToNextFullMockSection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFullMockIntermission, activeFullMock]);

  // Invigilator remote commands listener (Pause, Resume, Extend Time, Message, Force Submit, End)
  useEffect(() => {
    const unsubscribe = ConsultancyService.subscribe((event) => {
      const cStation = activeCandidateInfo?.stationName || terminalStationName;
      const cId = activeCandidateInfo?.consultancyId || selectedConsultancyId;

      if (event.type === 'BRANCH_TEST_LAUNCHED') {
        const payload = event.payload;
        if (!payload?.testId) {
          if (!payload?.consultancyId || payload.consultancyId === cId) {
            if (activeRoute === 'kiosk-exam') {
              localStorage.removeItem('ielts_active_kiosk_exam_session');
              alert('The examination session has been concluded by the consultancy invigilator.');
              setActiveRoute('kiosk-student');
            }
          }
        }
      } else if (event.type === 'STATION_COMMAND') {
        const { stationId, stationName, command, payload, consultancyId: cmdCid } = event.payload || {};
        const cleanStation = cStation ? ConsultancyService.normalizeStationName(cStation) : '';

        const isTargetStation =
          cleanStation &&
          (!stationId ||
            ConsultancyService.normalizeStationName(stationId) === cleanStation ||
            (stationName && ConsultancyService.normalizeStationName(stationName) === cleanStation));

        const isTargetBranch = !cmdCid || !cId || cmdCid === cId;

        if (isTargetStation || (command === 'END_TEST' && isTargetBranch)) {
          if (command === 'PAUSE_EXAM') {
            setIsExamPausedByTeacher(true);
          } else if (command === 'RESUME_EXAM') {
            setIsExamPausedByTeacher(false);
          } else if (command === 'EXTEND_TIME') {
            const addedSecs = (Number(payload) || 5) * 60;
            setRemainingSeconds((prev) => {
              const nextSec = prev + addedSecs;
              syncExamSessionToStorage({ remainingSeconds: nextSec });
              return nextSec;
            });
            alert(`Your remaining exam time has been extended by +${Number(payload) || 5} minutes by the invigilator.`);
          } else if (command === 'BROADCAST_MESSAGE') {
            setInvigilatorMessageBanner(String(payload || ''));
          } else if (command === 'FORCE_SUBMIT') {
            finishExam();
          } else if (command === 'RESET_STATION' || command === 'END_TEST') {
            localStorage.removeItem('ielts_active_kiosk_exam_session');
            alert('Your examination session was concluded by the consultancy invigilator.');
            setActiveRoute('kiosk-student');
          }
        }
      }
    });

    return () => unsubscribe();
  }, [activeRoute, activeCandidateInfo, terminalStationName, selectedConsultancyId]);

  // Active exam live telemetry heartbeat
  useEffect(() => {
    if (
      activeRoute !== 'kiosk-exam' ||
      !currentTest ||
      !selectedConsultancyId ||
      !terminalStationName
    ) {
      return;
    }

    const answeredCount = Object.keys(answers).filter(
      (k) => answers[Number(k)] && answers[Number(k)].length > 0
    ).length;

    const sendHeartbeat = () => {
      ConsultancyService.updateStationHeartbeat(
        selectedConsultancyId,
        terminalStationName,
        {
          status: isExamPausedByTeacher ? 'paused' : 'in_progress',
          currentQuestion,
          totalQuestions: currentTest.module === 'writing' ? 2 : 40,
          answeredCount,
          remainingSeconds,
          assignedTestId: currentTest.id,
          testTitle: currentTest.title,
          module: currentTest.module,
          currentCandidate: {
            candidateId: activeCandidateInfo?.candidateId || '004128',
            name: activeCandidateInfo?.name || 'Candidate',
            targetBand: activeCandidateInfo?.targetBand
          }
        }
      );
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 3500);
    return () => clearInterval(interval);
  }, [
    activeRoute,
    currentTest,
    activeCandidateInfo,
    selectedConsultancyId,
    terminalStationName,
    currentQuestion,
    answers,
    remainingSeconds,
    isExamPausedByTeacher
  ]);

  // Answer handler
  const handleAnswerChange = (qNum: number, value: string | string[]) => {
    setAnswers((prev) => {
      const next = {
        ...prev,
        [qNum]: value
      };
      syncExamSessionToStorage({ answers: next });
      return next;
    });
  };

  const handleToggleReview = (qNum: number) => {
    setReviewStatus((prev) => {
      const next = {
        ...prev,
        [qNum]: !prev[qNum]
      };
      syncExamSessionToStorage({ reviewStatus: next });
      return next;
    });
  };

  const handleSelectQuestion = (qNum: number) => {
    setCurrentQuestion(qNum);
    syncExamSessionToStorage({ currentQuestion: qNum });
    if (!currentTest) return;

    if (currentTest.module === 'reading') {
      if (qNum <= 13) setActiveSectionIndex(0);
      else if (qNum <= 26) setActiveSectionIndex(1);
      else setActiveSectionIndex(2);
    } else {
      if (qNum <= 10) setActiveSectionIndex(0);
      else if (qNum <= 20) setActiveSectionIndex(1);
      else if (qNum <= 30) setActiveSectionIndex(2);
      else setActiveSectionIndex(3);
    }
  };

  const handleSelectSection = (index: number) => {
    setActiveSectionIndex(index);
    syncExamSessionToStorage({ activeSectionIndex: index });
    if (!currentTest) return;

    if (currentTest.module === 'reading') {
      const targetQ = index === 0 ? 1 : index === 1 ? 14 : 27;
      setCurrentQuestion(targetQ);
    } else {
      const targetQ = index * 10 + 1;
      setCurrentQuestion(targetQ);
    }
  };

  // Start exam execution
  const startExamExecution = (testToRun: IELTSMockTest, fullMock?: FullMockTest) => {
    setCurrentTest(testToRun);
    setSelectedFullMock(fullMock);

    const initialFullMockState = fullMock
      ? {
          fullMock,
          currentStep: (fullMock.listeningTest.id === testToRun.id ? 'listening' : 'reading') as 'listening' | 'reading' | 'writing'
        }
      : null;

    setActiveFullMock(initialFullMockState);
    setShowFullMockIntermission(false);

    setCurrentQuestion(1);
    setActiveSectionIndex(0);
    setAnswers({});
    setReviewStatus({});
    setRemainingSeconds(testToRun.durationMinutes * 60);
    timeSpentSecondsRef.current = 0;
    examStartTimeRef.current = Date.now();
    setIsExamPausedByTeacher(false);
    setActiveRoute('kiosk-exam');

    try {
      localStorage.setItem(
        'ielts_active_kiosk_exam_session',
        JSON.stringify({
          testId: testToRun.id,
          test: testToRun,
          fullMock,
          candidateInfo: activeCandidateInfo,
          currentQuestion: 1,
          activeSectionIndex: 0,
          answers: {},
          reviewStatus: {},
          remainingSeconds: testToRun.durationMinutes * 60,
          timeSpentSeconds: 0,
          startedAtTimestamp: Date.now(),
          lastUpdatedTimestamp: Date.now(),
          consultancyId: selectedConsultancyId,
          branchCode: currentBranchCode,
          terminalStationName,
          activeFullMock: initialFullMockState
        })
      );
    } catch (e) {
      console.warn('Failed to save exam session:', e);
    }
  };

  // Finalize exam and calculate scores
  const finishExam = (writingSub?: WritingSubmission) => {
    const activeTest = currentTestRef.current;
    if (!activeTest) return;

    const curAnswers = answersRef.current;
    const curRemaining = remainingSecondsRef.current;

    const allQuestions = activeTest.sections.flatMap((s) =>
      s.questionGroups.flatMap((g) => g.questions)
    );

    const isWriting = activeTest.module === 'writing';
    const { correctCount } = isWriting ? { correctCount: 0 } : evaluateTestAnswers(activeTest, curAnswers);

    const totalQuestions = isWriting ? 2 : (allQuestions.length || 40);
    const bandScore = isWriting ? (writingSub?.overallWritingBand || 0) : calculateBandScore(activeTest.module, correctCount);

    // QA-02: Authoritative wall-clock time spent calculation
    const calculatedTimeTaken = timeSpentSecondsRef.current > 0
      ? timeSpentSecondsRef.current
      : (activeTest.durationMinutes * 60 - curRemaining);
    const timeTaken = Math.min(activeTest.durationMinutes * 60, Math.max(1, calculatedTimeTaken));

    const studentName = activeCandidateInfo?.name || 'Candidate';
    const candId = activeCandidateInfo?.candidateId || '00' + Math.floor(1000 + Math.random() * 9000);
    const cid = selectedConsultancyId || 'kiec-lalitpur';
    const consultancy = ConsultancyService.getConsultancyById(cid);

    const newResult: TestResult = {
      testId: activeTest.id,
      book: activeTest.book,
      testNumber: activeTest.testNumber,
      module: activeTest.module,
      totalQuestions,
      correctCount,
      bandScore,
      timeTakenSeconds: timeTaken,
      completedAt: new Date().toISOString(),
      answers: curAnswers,
      candidateName: studentName,
      candidateId: candId,
      stationName: terminalStationName,
      consultancyId: cid,
      consultancyName: consultancy?.name || 'Educational Consultancy Lab',
      targetBand: activeCandidateInfo?.targetBand ?? 0,
      isPublished: false,
      writingSubmission: writingSub
    };

    setActiveResult(newResult);
    setPastResults((prev) => [newResult, ...prev.filter((p) => p.testId !== newResult.testId)]);
    saveTestResultToSupabase(newResult);

    ConsultancyService.saveTestResult(cid, newResult);
    ConsultancyService.recordStudentTestResult(cid, candId, newResult, studentName);
    ConsultancyService.saveReport(cid, {
      studentName,
      candidateId: candId,
      testTitle: activeTest.title,
      module: activeTest.module,
      bandScore,
      correctCount,
      totalQuestions,
      timeTakenSeconds: timeTaken,
      completedAt: newResult.completedAt,
      consultancyId: cid,
      testId: activeTest.id,
      answers: curAnswers,
      isPublished: false
    });

    ConsultancyService.updateStationHeartbeat(cid, terminalStationName, {
      status: 'submitted',
      remainingSeconds: 0,
      answeredCount: Object.keys(curAnswers).length,
      assignedTestId: activeTest.id,
      testTitle: activeTest.title,
      module: activeTest.module,
      currentCandidate: {
        candidateId: candId,
        name: studentName,
        targetBand: activeCandidateInfo?.targetBand ?? 0
      }
    });

    // Check Full Mock transitions
    if (activeFullMock && activeFullMock.currentStep === 'listening') {
      setActiveFullMock((prev) => (prev ? { ...prev, listeningResult: newResult } : null));
      setShowFullMockIntermission(true);
      setIntermissionCountdown(10);
      return;
    }

    if (activeFullMock && activeFullMock.currentStep === 'reading') {
      if (activeFullMock.fullMock.writingTest) {
        setActiveFullMock((prev) => (prev ? { ...prev, readingResult: newResult } : null));
        setShowFullMockIntermission(true);
        setIntermissionCountdown(10);
        return;
      }
      const listResult = activeFullMock.listeningResult;
      const listBand = listResult ? listResult.bandScore : newResult.bandScore;
      const readBand = newResult.bandScore;
      const overallBand = Math.round(((listBand + readBand) / 2) * 2) / 2;
      setActiveFullMock((prev) => (prev ? { ...prev, readingResult: newResult, overallBand } : null));
    }

    if (activeFullMock && activeFullMock.currentStep === 'writing') {
      const listResult = activeFullMock.listeningResult;
      const readResult = activeFullMock.readingResult;
      const listBand = listResult ? listResult.bandScore : 0;
      const readBand = readResult ? readResult.bandScore : 0;
      const writBand = newResult.bandScore || 0;
      const overallBand = Math.round(((listBand + readBand + writBand) / 3) * 2) / 2;
      setActiveFullMock((prev) => (prev ? { ...prev, writingResult: newResult, overallBand } : null));
    }

    // Exam completely concluded - clear active session storage
    localStorage.removeItem('ielts_active_kiosk_exam_session');

    // Route to submission confirmation receipt (Blueprint 6.5 Done)
    setActiveRoute('kiosk-done');
  };

  const handleWritingSubmit = (submission: { task1Essay: string; task1WordCount: number; task2Essay: string; task2WordCount: number }) => {
    const writingSub: WritingSubmission = {
      task1Essay: submission.task1Essay,
      task1WordCount: submission.task1WordCount,
      task2Essay: submission.task2Essay,
      task2WordCount: submission.task2WordCount
    };
    finishExam(writingSub);
  };

  // Master Logout (Rule 10: Clear shared-PC prior session data)
  const handleLogout = () => {
    localStorage.removeItem('ielts_active_kiosk_exam_session');
    ConsultancyService.logoutCandidate();
    ConsultancyService.logoutAdmin();
    setCandidateSession(null);
    setActiveCandidateInfo(null);
    navigateTo('/');
  };

  const activeConsultancy = ConsultancyService.getConsultancyById(selectedConsultancyId) ||
    ConsultancyService.getConsultancies()[0];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30">
      {/* 1. PUBLIC DIRECTORY / LANDING (Blueprint Sitemap: /) */}
      {activeRoute === 'landing' && (
        <DirectoryLandingView
          onSelectBranch={(code) => {
            setCurrentBranchCode(code);
            navigateTo(`/b/${code}`);
          }}
          onOpenResultLookup={() => navigateTo('/result')}
          onOpenSuperAdmin={() => navigateTo('/admin')}
          onOpenConsultancyPortal={(cid) => {
            if (cid) setSelectedConsultancyId(cid);
            navigateTo('/consultancy/dashboard');
          }}
        />
      )}

      {/* 2. BRANCH LOGIN (Blueprint Screen 6.1: /b/{branch-code}) */}
      {activeRoute === 'branch-login' && (
        <BranchLoginView
          branchCode={currentBranchCode}
          initialStationId={directPcStation}
          onEnterStudentKiosk={(consultancy, stName) => {
            setSelectedConsultancyId(consultancy.id);
            setTerminalStationName(stName);
            setActiveRoute('kiosk-student');
          }}
          onEnterInvigilator={(consultancy) => {
            setSelectedConsultancyId(consultancy.id);
            setConsultancySubTab('dashboard');
            setActiveRoute('consultancy');
          }}
          onBackToDirectory={() => navigateTo('/')}
        />
      )}

      {/* 3. STUDENT NAME ENTRY (Blueprint Screen 6.2: /kiosk/student) */}
      {activeRoute === 'kiosk-student' && (
        <StudentNameView
          stationName={terminalStationName}
          consultancyName={activeConsultancy.name}
          consultancyId={activeConsultancy.id}
          onContinue={(candidate) => {
            setActiveCandidateInfo({
              name: candidate.name,
              candidateId: candidate.candidateId,
              targetBand: candidate.targetBand,
              stationName: terminalStationName,
              consultancyId: activeConsultancy.id
            });

            // Blueprint 6.3: "If the invigilator pre-assigned a specific test to this student, the screen skips straight to confirmation — the student doesn't choose."
            const activeLaunch = ConsultancyService.getActiveLaunchedTest(activeConsultancy.id);
            const stationObj = ConsultancyService.getStations(activeConsultancy.id).find((s) => s.name === terminalStationName);
            const assignedTestId = stationObj?.assignedTestId || activeLaunch?.testId;

            if (assignedTestId) {
              const matchedTest = tests.find((t) => t.id === assignedTestId) || tests[0];
              const isFull = stationObj?.isFullMock || activeLaunch?.isFullMock || assignedTestId.endsWith('-full');
              const matchedFull = isFull ? allFullMockTests.find((fm) => fm.id === assignedTestId || fm.book === matchedTest.book) : undefined;
              setCurrentTest(matchedTest);
              setSelectedFullMock(matchedFull);
              setActiveRoute('kiosk-confirm');
            } else {
              setActiveRoute('kiosk-test');
            }
          }}
          onSwitchStationOrReset={() => {
            setActiveRoute('branch-login');
          }}
        />
      )}

      {/* 4. TEST SELECTION (Blueprint Screen 6.3: /kiosk/test) */}
      {activeRoute === 'kiosk-test' && (
        <TestSelectionView
          availableTests={tests}
          studentName={activeCandidateInfo?.name || 'Candidate'}
          stationName={terminalStationName}
          onSelectTest={(test, fullMock) => {
            setCurrentTest(test);
            setSelectedFullMock(fullMock);
            setActiveRoute('kiosk-confirm');
          }}
          onBack={() => setActiveRoute('kiosk-student')}
        />
      )}

      {/* 5. CONFIRMATION + START (Blueprint Screen 6.4: /kiosk/confirm) */}
      {activeRoute === 'kiosk-confirm' && currentTest && (
        <ConfirmationStartView
          studentName={activeCandidateInfo?.name || 'Candidate'}
          test={currentTest}
          fullMock={selectedFullMock}
          stationName={terminalStationName}
          onStart={() => {
            startExamExecution(currentTest, selectedFullMock);
          }}
          onBack={() => setActiveRoute('kiosk-test')}
        />
      )}

      {/* 6. EXAM SCREEN (Blueprint Screen 6.5: /kiosk/exam) */}
      {activeRoute === 'kiosk-exam' && currentTest && (
        <div className={`h-screen flex flex-col overflow-hidden bg-white select-none ${settings.contrast === 'inverted' ? 'dark-exam-mode' : 'bg-exam-calm'} relative`}>
          {/* Invigilator Message Banner */}
          {invigilatorMessageBanner && (
            <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#0F1E33] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#C9A24B] flex items-center gap-3 animate-in fade-in">
              <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
              <span className="text-xs font-semibold">
                Notice from Invigilator: <strong>{invigilatorMessageBanner}</strong>
              </span>
              <button
                onClick={() => setInvigilatorMessageBanner(null)}
                className="text-slate-400 hover:text-white ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Invigilator Pause Overlay */}
          {isExamPausedByTeacher && (
            <div className="absolute inset-0 bg-[#0F1E33]/70 backdrop-blur-xs z-50 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in">
              <div className="paper-card p-8 max-w-md w-full space-y-4 flex flex-col items-center bg-[#FAF8F3]">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Pause className="w-7 h-7" />
                </div>
                <h2 className="font-display text-xl font-bold text-[#0F1E33]">
                  Examination Paused by Invigilator
                </h2>
                <p className="text-xs text-[#5B6B82] leading-relaxed">
                  Your countdown timer is paused. Please remain seated at your desk until the invigilator resumes the session.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-mono font-bold text-[#0F1E33]">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D4F]" />
                  <span>Station: {terminalStationName} · Synchronized</span>
                </div>
              </div>
            </div>
          )}

          {/* CD Header */}
          <CDHeader
            test={currentTest}
            remainingSeconds={remainingSeconds}
            settings={settings}
            onUpdateSettings={(newSet) => setSettings((prev) => ({ ...prev, ...newSet }))}
            onExitTest={() => {
              if (window.confirm('Return to previous screen? Your current exam session will be interrupted.')) {
                localStorage.removeItem('ielts_active_kiosk_exam_session');
                setActiveRoute('kiosk-student');
              }
            }}
            audioVolume={audioVolume}
            onVolumeChange={setAudioVolume}
            candidateName={activeCandidateInfo?.name}
            candidateId={activeCandidateInfo?.candidateId}
            consultancyName={activeConsultancy.name}
          />

          {/* Module-Specific Exam Views */}
          {currentTest.module === 'writing' ? (
            <WritingExamView
              test={currentTest}
              settings={settings}
              onSubmitWriting={handleWritingSubmit}
            />
          ) : (
            <>
              {currentTest.module === 'reading' ? (
                <ReadingExamView
                  test={currentTest}
                  currentQuestion={currentQuestion}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  settings={settings}
                  activePassageIndex={activeSectionIndex}
                  onSelectPassage={handleSelectSection}
                  onSelectQuestion={handleSelectQuestion}
                />
              ) : (
                <ListeningExamView
                  test={currentTest}
                  currentQuestion={currentQuestion}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  settings={settings}
                  activePartIndex={activeSectionIndex}
                  onSelectPart={handleSelectSection}
                  onSelectQuestion={handleSelectQuestion}
                  volume={audioVolume}
                />
              )}

              {/* 40 Question Palette */}
              <QuestionPalette
                currentQuestion={currentQuestion}
                totalQuestions={40}
                answers={answers}
                reviewStatus={reviewStatus}
                onSelectQuestion={handleSelectQuestion}
                onToggleReview={handleToggleReview}
                onFinishTest={() => finishExam()}
                module={currentTest.module}
                activeSectionIndex={activeSectionIndex}
                onSelectSection={handleSelectSection}
              />
            </>
          )}
        </div>
      )}

      {/* FULL MOCK INTERMISSION (Blueprint: 10-second breather screen) */}
      {showFullMockIntermission && activeFullMock && (
        <div className="fixed inset-0 bg-[#0F1E33]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="paper-card max-w-md w-full p-6 sm:p-8 space-y-5 text-center bg-[#FAF8F3] animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#2E7D4F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-[#0F1E33]">
                Section Complete!
              </h2>
              <p className="text-xs text-[#5B6B82]">
                10-second transition window before the next official exam section.
              </p>
            </div>

            <div className="text-xs font-mono font-bold text-[#0F1E33] flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C9A24B] animate-pulse" />
              <span>Starting in {intermissionCountdown}s...</span>
            </div>

            <button
              onClick={handleProceedToNextFullMockSection}
              className="btn-texture w-full min-h-[48px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-bold"
            >
              Begin Next Section Now →
            </button>
          </div>
        </div>
      )}

      {/* 7. SUBMISSION CONFIRMED RECEIPT (Blueprint Screen 6.5 Done) */}
      {activeRoute === 'kiosk-done' && activeResult && currentTest && (
        <SubmissionConfirmedView
          candidateInfo={{
            name: activeResult.candidateName || 'Candidate',
            candidateId: activeResult.candidateId || '004128',
            stationName: terminalStationName,
            consultancyName: activeConsultancy.name
          }}
          test={currentTest}
          fullMockTitle={selectedFullMock?.title}
          submittedResult={activeResult}
          onOpenLookup={() => navigateTo('/result')}
          onReturnToTerminalOrHub={() => {
            setActiveFullMock(null);
            setActiveRoute('kiosk-student');
          }}
        />
      )}

      {/* 8. CONSULTANCY PORTAL (Blueprint Screen 6.6 - 6.10: /consultancy/*) */}
      {activeRoute === 'consultancy' && (
        <ConsultancyLayout
          consultancy={activeConsultancy}
          activeTab={consultancySubTab}
          onTabChange={(tab) => {
            setConsultancySubTab(tab);
            navigateTo(`/consultancy/${tab}`);
          }}
          onQuickLaunchClick={() => {
            setConsultancySubTab('launch');
            navigateTo('/consultancy/launch');
          }}
          onLogout={handleLogout}
        >
          {consultancySubTab === 'dashboard' && (
            <DashboardView
              consultancy={activeConsultancy}
              stations={ConsultancyService.getStations(activeConsultancy.id)}
              results={ConsultancyService.getResults(activeConsultancy.id)}
              onOpenLaunchModeA={() => {
                setConsultancySubTab('launch');
                navigateTo('/consultancy/launch');
              }}
              onOpenLaunchModeB={() => {
                setConsultancySubTab('launch');
                navigateTo('/consultancy/launch');
              }}
              onOpenPrintQRs={() => {
                setConsultancySubTab('pcs');
                navigateTo('/consultancy/pcs');
              }}
              onOpenPairNewPC={() => {
                setConsultancySubTab('pcs');
                navigateTo('/consultancy/pcs');
              }}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'launch' && (
            <LaunchConsoleView
              consultancy={activeConsultancy}
              stations={ConsultancyService.getStations(activeConsultancy.id)}
              students={ConsultancyService.getStudents(activeConsultancy.id)}
              tests={tests}
              onSessionLaunched={() => {
                setConsultancySubTab('monitor');
                navigateTo('/consultancy/monitor');
              }}
              onSessionEnded={() => {
                setConsultancySubTab('dashboard');
                navigateTo('/consultancy/dashboard');
              }}
            />
          )}

          {consultancySubTab === 'monitor' && (
            <LiveMonitorView
              consultancy={activeConsultancy}
              stations={ConsultancyService.getStations(activeConsultancy.id)}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'candidates' && (
            <CandidatesView
              consultancy={activeConsultancy}
              students={ConsultancyService.getStudents(activeConsultancy.id)}
              onOpenAssignTest={() => {
                setConsultancySubTab('launch');
                navigateTo('/consultancy/launch');
              }}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'results' && (
            <ResultsView
              consultancy={activeConsultancy}
              results={ConsultancyService.getResults(activeConsultancy.id)}
              onOpenAIDiagnostic={() => {
                setConsultancySubTab('reports');
                navigateTo('/consultancy/reports');
              }}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'reports' && (
            <AIReportsView
              consultancy={activeConsultancy}
              reports={ConsultancyService.getReports(activeConsultancy.id)}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'tests' && (
            <TestLibraryView
              consultancy={activeConsultancy}
              tests={tests}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'pcs' && (
            <PcsView
              consultancy={activeConsultancy}
              stations={ConsultancyService.getStations(activeConsultancy.id)}
              onRefresh={() => setTests([...tests])}
            />
          )}

          {consultancySubTab === 'settings' && (
            <SettingsView
              consultancy={activeConsultancy}
              onRefresh={() => setTests([...tests])}
            />
          )}
        </ConsultancyLayout>
      )}

      {/* 9. SUPER ADMIN PORTAL (Blueprint Screen 6.11: /admin) */}
      {activeRoute === 'super-admin' && (
        <SuperAdminPortal
          onBackToApp={() => navigateTo('/')}
          onOpenConsultancy={(cid) => {
            setSelectedConsultancyId(cid);
            setConsultancySubTab('dashboard');
            setActiveRoute('consultancy');
          }}
          onLogout={handleLogout}
        />
      )}

      {/* 10. PUBLIC RESULT LOOKUP (Blueprint Screen 6.12: /result) */}
      {activeRoute === 'result-lookup' && (
        <PublicResultLookupView
          onBackToHub={() => navigateTo('/')}
        />
      )}
    </div>
  );
};

export default App;
