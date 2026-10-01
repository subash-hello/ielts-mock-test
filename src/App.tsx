import React, { useState, useEffect, useRef } from 'react';
import type { IELTSMockTest, CandidateAnswers, ReviewStatus, ExamSettings, TestResult, FullMockTest, WritingSubmission } from './types/ielts';
import type { AdminUser, CandidateSession } from './types/consultancy';
import { LandingPage } from './components/landing/LandingPage';
import { CDHeader } from './components/exam/CDHeader';
import { ReadingExamView } from './components/exam/ReadingExamView';
import { ListeningExamView } from './components/exam/ListeningExamView';
import { WritingExamView } from './components/exam/WritingExamView';
import { QuestionPalette } from './components/exam/QuestionPalette';
import { ResultReport } from './components/results/ResultReport';
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { ConsultancyPortal } from './components/admin/ConsultancyPortal';
import { StudentTerminalView } from './components/terminal/StudentTerminalView';
import { UnifiedAuthView } from './components/auth/UnifiedAuthView';
import { SubmissionConfirmedView } from './components/exam/SubmissionConfirmedView';
import { CandidateResultLookupModal } from './components/results/CandidateResultLookupModal';
import { ConsultancyService } from './services/consultancyService';
import { calculateBandScore, evaluateTestAnswers } from './utils/scoring';
import { saveTestResultToSupabase, fetchMockTestsFromSupabase } from './lib/supabase';
import { allMockTests } from './data/mockTests';
import { Pause, CheckCircle2, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  // Candidate session state
  const [candidateSession, setCandidateSession] = useState<CandidateSession | null>(() =>
    ConsultancyService.getCurrentCandidateSession()
  );

  // Admin session state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() =>
    ConsultancyService.getCurrentAdmin()
  );

  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [initialAuthTab, setInitialAuthTab] = useState<'candidate' | 'admin'>('candidate');

  const [activeScreen, setActiveScreen] = useState<
    'landing' | 'exam' | 'submission-confirmed' | 'results' | 'super-admin' | 'consultancy' | 'terminal' | 'auth'
  >('landing');

  // Candidate ID lookup modal state (to check published results)
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);
  const [lookupInitialCandidateId, setLookupInitialCandidateId] = useState<string>('');

  const [selectedConsultancyId, setSelectedConsultancyId] = useState<string>(() => {
    const saved = ConsultancyService.getCurrentCandidateSession();
    return saved?.consultancyId || 'apex-global';
  });

  const [terminalStationName, setTerminalStationName] = useState<string>(() => {
    const saved = ConsultancyService.getCurrentCandidateSession();
    return saved?.stationName || 'PC-01';
  });

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

  const [isExamPausedByTeacher, setIsExamPausedByTeacher] = useState<boolean>(false);

  const [tests, setTests] = useState<IELTSMockTest[]>(allMockTests);
  const [currentTest, setCurrentTest] = useState<IELTSMockTest | null>(null);
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

  const [activeResult, setActiveResult] = useState<TestResult | null>(null);
  const [pastResults, setPastResults] = useState<TestResult[]>(() => {
    try {
      const saved = localStorage.getItem('ielts_mock_past_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Full Mock Test Sequence state (Listening -> 60s Break/Intermission -> Reading -> Combined Result)
  const [activeFullMock, setActiveFullMock] = useState<{
    fullMock: FullMockTest;
    currentStep: 'listening' | 'reading';
    listeningResult?: TestResult;
    readingResult?: TestResult;
    overallBand?: number;
  } | null>(null);
  const [showFullMockIntermission, setShowFullMockIntermission] = useState<boolean>(false);
  const [intermissionCountdown, setIntermissionCountdown] = useState<number>(60);

  // Keep ref to answers and remainingSeconds for callbacks
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const remainingSecondsRef = useRef(remainingSeconds);
  remainingSecondsRef.current = remainingSeconds;
  const currentTestRef = useRef(currentTest);
  currentTestRef.current = currentTest;

  // URL deep link routing on initial page load (e.g. ?mode=admin, ?mode=consultancy, ?mode=terminal&station=PC-04)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const cid = params.get('consultancy') || params.get('cid');
      const station = params.get('station') || params.get('st');

      if (cid) setSelectedConsultancyId(cid);
      if (station) setTerminalStationName(station);

      const loggedAdmin = ConsultancyService.getCurrentAdmin();
      const loggedCandidate = ConsultancyService.getCurrentCandidateSession();

      if (mode === 'admin' || mode === 'super-admin') {
        if (loggedAdmin?.role === 'super_admin') {
          setActiveScreen('super-admin');
        } else {
          setInitialAuthTab('admin');
          setAuthMessage('Super Administrator sign in required.');
          setActiveScreen('auth');
        }
      } else if (mode === 'consultancy') {
        if (loggedAdmin) {
          if (loggedAdmin.consultancyId) {
            setSelectedConsultancyId(loggedAdmin.consultancyId);
          }
          setActiveScreen('consultancy');
        } else {
          setInitialAuthTab('admin');
          setAuthMessage('Consultancy Director sign in required.');
          setActiveScreen('auth');
        }
      } else if (mode === 'terminal' || mode === 'lab' || mode === 'kiosk') {
        if (loggedCandidate) {
          setActiveScreen('terminal');
        } else {
          setInitialAuthTab('candidate');
          setActiveScreen('auth');
        }
      }
    } catch (e) {
      console.error('URL parse error:', e);
    }
  }, []);

  // Save past results to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ielts_mock_past_results', JSON.stringify(pastResults));
    } catch (e) {
      console.error('Failed to save past results', e);
    }
  }, [pastResults]);

  // Load mock tests dynamically from Supabase if valid and complete
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

  // Keep currentTest up to date if tests array is updated
  useEffect(() => {
    if (currentTest) {
      const match = tests.find((t) => t.id === currentTest.id);
      if (match && match !== currentTest) {
        setCurrentTest(match);
      }
    }
  }, [tests]);

  // Exam Countdown Timer (freezes if invigilator paused test)
  useEffect(() => {
    if (activeScreen !== 'exam' || !currentTest || isExamPausedByTeacher) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeScreen, currentTest, answers, isExamPausedByTeacher]);

  // Advance from Listening to Reading section in Full Mock Test
  const handleProceedToReading = () => {
    if (!activeFullMock) return;
    setShowFullMockIntermission(false);
    const readingTest = activeFullMock.fullMock.readingTest;
    setCurrentTest(readingTest);
    setCurrentQuestion(1);
    setActiveSectionIndex(0);
    setAnswers({});
    setReviewStatus({});
    setRemainingSeconds(readingTest.durationMinutes * 60);
    setActiveFullMock((prev) => (prev ? { ...prev, currentStep: 'reading' } : null));
    setIsExamPausedByTeacher(false);
    setActiveScreen('exam');
  };

  // Full Mock Intermission Countdown Timer (60s break before Reading)
  useEffect(() => {
    if (!showFullMockIntermission) return;

    const timer = setInterval(() => {
      setIntermissionCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleProceedToReading();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFullMockIntermission, activeFullMock]);

  // Lab invigilator remote command listener
  useEffect(() => {
    if (activeScreen !== 'exam' || !activeCandidateInfo?.stationName) return;

    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (event.type === 'STATION_COMMAND') {
        const { stationId, command } = event.payload || {};
        if (stationId === activeCandidateInfo.stationName) {
          if (command === 'PAUSE_EXAM') {
            setIsExamPausedByTeacher(true);
          } else if (command === 'RESUME_EXAM') {
            setIsExamPausedByTeacher(false);
          } else if (command === 'FORCE_SUBMIT') {
            finishExam();
          } else if (command === 'RESET_STATION') {
            alert('Your examination station was reset by the consultancy invigilator.');
            setActiveScreen('terminal');
          }
        }
      }
    });

    return () => unsubscribe();
  }, [activeScreen, activeCandidateInfo]);

  // Active exam live telemetry heartbeat to Consultancy Lab Monitor
  useEffect(() => {
    if (
      activeScreen !== 'exam' ||
      !currentTest ||
      !activeCandidateInfo?.consultancyId ||
      !activeCandidateInfo?.stationName
    ) {
      return;
    }

    const answeredCount = Object.keys(answers).filter(
      (k) => answers[Number(k)] && answers[Number(k)].length > 0
    ).length;

    const sendHeartbeat = () => {
      ConsultancyService.updateStationHeartbeat(
        activeCandidateInfo.consultancyId!,
        activeCandidateInfo.stationName!,
        {
          status: isExamPausedByTeacher ? 'paused' : 'in_progress',
          currentQuestion,
          totalQuestions: 40,
          answeredCount,
          remainingSeconds,
          assignedTestId: currentTest.id,
          testTitle: currentTest.title,
          module: currentTest.module,
          currentCandidate: {
            candidateId: activeCandidateInfo.candidateId,
            name: activeCandidateInfo.name,
            targetBand: activeCandidateInfo.targetBand
          }
        }
      );
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 3500);

    return () => clearInterval(interval);
  }, [
    activeScreen,
    currentTest,
    activeCandidateInfo,
    currentQuestion,
    answers,
    remainingSeconds,
    isExamPausedByTeacher
  ]);

  // Start a new test
  const startTest = (
    test: IELTSMockTest,
    candidate?: {
      name: string;
      candidateId: string;
      targetBand?: number;
      consultancyId?: string;
      consultancyName?: string;
      phone?: string;
      email?: string;
    },
    fullMock?: FullMockTest
  ) => {
    if (fullMock) {
      setActiveFullMock({
        fullMock,
        currentStep: fullMock.listeningTest.id === test.id ? 'listening' : 'reading'
      });
    } else {
      setActiveFullMock(null);
    }
    setShowFullMockIntermission(false);

    if (candidate) {
      const targetCid = candidate.consultancyId || selectedConsultancyId || 'apex-global';
      const consultancyObj = ConsultancyService.getConsultancyById(targetCid);
      const sess: CandidateSession = {
        stationName: terminalStationName || 'PC-01',
        branchCode: consultancyObj?.branchCode || consultancyObj?.accessCode || targetCid,
        consultancyId: targetCid,
        consultancyName: candidate.consultancyName || consultancyObj?.name || 'IELTS Partner',
        candidateName: candidate.name,
        candidateId: candidate.candidateId,
        targetBand: candidate.targetBand || 7.5,
        loggedInAt: new Date().toISOString()
      };
      ConsultancyService.setCurrentCandidateSession(sess);
      setCandidateSession(sess);
      setSelectedConsultancyId(targetCid);
      setActiveCandidateInfo({
        name: candidate.name,
        candidateId: candidate.candidateId,
        targetBand: candidate.targetBand,
        stationName: terminalStationName,
        consultancyId: targetCid
      });
    } else if (candidateSession) {
      setActiveCandidateInfo({
        name: candidateSession.candidateName,
        candidateId: candidateSession.candidateId,
        targetBand: candidateSession.targetBand,
        stationName: candidateSession.stationName,
        consultancyId: candidateSession.consultancyId
      });
    } else {
      const fallbackName = localStorage.getItem('ielts_candidate_name') || 'Candidate';
      const fallbackId = '00' + Math.floor(1000 + Math.random() * 9000);
      setActiveCandidateInfo({
        name: fallbackName,
        candidateId: fallbackId,
        targetBand: 7.5,
        stationName: terminalStationName,
        consultancyId: selectedConsultancyId || 'apex-global'
      });
    }

    setCurrentTest(test);
    setCurrentQuestion(1);
    setActiveSectionIndex(0);
    setAnswers({});
    setReviewStatus({});
    setRemainingSeconds(test.durationMinutes * 60);
    setIsExamPausedByTeacher(false);
    setActiveScreen('exam');
  };

  // Update answer for a specific question
  const handleAnswerChange = (qNum: number, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [qNum]: value
    }));
  };

  // Toggle review flag
  const handleToggleReview = (qNum: number) => {
    setReviewStatus((prev) => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  // Switch question and automatically change active section tab
  const handleSelectQuestion = (qNum: number) => {
    setCurrentQuestion(qNum);
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

  // Select section tab and jump to its first question
  const handleSelectSection = (index: number) => {
    setActiveSectionIndex(index);
    if (!currentTest) return;

    if (currentTest.module === 'reading') {
      const targetQ = index === 0 ? 1 : index === 1 ? 14 : 27;
      setCurrentQuestion(targetQ);
    } else {
      const targetQ = index * 10 + 1;
      setCurrentQuestion(targetQ);
    }
  };

  // Calculate score and finalize test
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
    const timeTaken = activeTest.durationMinutes * 60 - curRemaining;

    const studentName =
      activeCandidateInfo?.name?.trim() ||
      candidateSession?.candidateName?.trim() ||
      localStorage.getItem('ielts_candidate_name')?.trim() ||
      'Candidate';
    const candId =
      activeCandidateInfo?.candidateId ||
      candidateSession?.candidateId ||
      '00' + Math.floor(1000 + Math.random() * 9000);
    const cid =
      activeCandidateInfo?.consultancyId ||
      candidateSession?.consultancyId ||
      selectedConsultancyId ||
      'apex-global';
    const consultancy = ConsultancyService.getConsultancyById(cid);
    const consultancyName = consultancy?.name || candidateSession?.consultancyName || 'IELTS Partner';

    const newResult: TestResult = {
      testId: activeTest.id,
      book: activeTest.book,
      testNumber: activeTest.testNumber,
      module: activeTest.module,
      totalQuestions,
      correctCount,
      bandScore,
      timeTakenSeconds: Math.max(1, timeTaken),
      completedAt: new Date().toISOString(),
      answers: curAnswers,
      candidateName: studentName,
      candidateId: candId,
      consultancyId: cid,
      consultancyName: consultancyName,
      targetBand: activeCandidateInfo?.targetBand || candidateSession?.targetBand || 7.5,
      isPublished: false,
      writingSubmission: writingSub
    };

    setActiveResult(newResult);
    setPastResults((prev) => [newResult, ...prev.filter((p) => p.testId !== newResult.testId)]);
    saveTestResultToSupabase(newResult);

    // 1. Record in student's consultancy results directory (unreleased until admin publishes)
    ConsultancyService.saveTestResult(cid, newResult);

    // 2. Record student statistics & update registry in consultancy
    ConsultancyService.recordStudentTestResult(
      cid,
      candId,
      newResult,
      studentName
    );

    // 3. Save AI diagnostic report in consultancy archive
    ConsultancyService.saveReport(cid, {
      studentName,
      candidateId: candId,
      testTitle: activeTest.title,
      module: activeTest.module,
      bandScore,
      correctCount,
      totalQuestions,
      timeTakenSeconds: Math.max(1, timeTaken),
      completedAt: newResult.completedAt,
      consultancyId: cid,
      testId: activeTest.id,
      answers: curAnswers,
      isPublished: false
    });

    // 4. If candidate took test in a consultancy lab station, update station
    if (activeCandidateInfo?.stationName) {
      ConsultancyService.updateStationHeartbeat(
        cid,
        activeCandidateInfo.stationName,
        {
          status: 'submitted',
          remainingSeconds: 0,
          answeredCount: Object.keys(curAnswers).length,
          currentCandidate: {
            candidateId: candId,
            name: studentName,
            targetBand: activeCandidateInfo.targetBand
          }
        }
      );
    }

    // Check if candidate is running a Full Mock Test and finished Listening (Section 1)
    if (activeFullMock && activeFullMock.currentStep === 'listening') {
      setActiveFullMock((prev) => (prev ? { ...prev, listeningResult: newResult } : null));
      setShowFullMockIntermission(true);
      setIntermissionCountdown(60);
      return; // Transition to 60s intermission before Section 2 (Reading)
    }

    // If candidate finished Reading (Section 2) of Full Mock Test
    if (activeFullMock && activeFullMock.currentStep === 'reading') {
      const listResult = activeFullMock.listeningResult;
      const listBand = listResult ? listResult.bandScore : newResult.bandScore;
      const readBand = newResult.bandScore;
      const rawAvg = (listBand + readBand) / 2;
      const overallBand = Math.round(rawAvg * 2) / 2;
      setActiveFullMock((prev) => (prev ? { ...prev, readingResult: newResult, overallBand } : null));
    }

    // Official IELTS protocol: Band score is withheld at the terminal and sent to consultancy admin portal
    setActiveScreen('submission-confirmed');
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

  // Open Candidate ID result verification modal
  const handleOpenLookup = (initialId?: string) => {
    const defaultId =
      initialId ||
      activeCandidateInfo?.candidateId ||
      candidateSession?.candidateId ||
      activeResult?.candidateId ||
      '';
    setLookupInitialCandidateId(defaultId);
    setIsLookupModalOpen(true);
  };

  // Callback when a published result is selected in lookup modal
  const handleViewPublishedResult = (result: TestResult) => {
    setActiveResult(result);
    const foundTest = tests.find((t) => t.id === result.testId) || currentTest;
    if (foundTest) {
      setCurrentTest(foundTest);
    }
    setActiveScreen('results');
  };

  // Candidate login callback
  const handleCandidateLogin = (session: CandidateSession) => {
    setCandidateSession(session);
    setTerminalStationName(session.stationName);
    setSelectedConsultancyId(session.consultancyId);
    setActiveCandidateInfo({
      name: session.candidateName,
      candidateId: session.candidateId,
      targetBand: session.targetBand,
      stationName: session.stationName,
      consultancyId: session.consultancyId
    });
    setAuthMessage(null);
    setActiveScreen('landing');
  };

  // Admin login callback
  const handleAdminLogin = (user: AdminUser) => {
    setAdminUser(user);
    setAuthMessage(null);
    if (user.role === 'super_admin') {
      setActiveScreen('super-admin');
    } else {
      if (user.consultancyId) {
        setSelectedConsultancyId(user.consultancyId);
      }
      setActiveScreen('consultancy');
    }
  };

  // Master logout handler
  const handleLogout = () => {
    ConsultancyService.logoutCandidate();
    ConsultancyService.logoutAdmin();
    setCandidateSession(null);
    setAdminUser(null);
    setActiveCandidateInfo(null);
    setAuthMessage('You have been signed out successfully.');
    setInitialAuthTab('candidate');
    setActiveScreen('auth');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* SCREEN 1: OFFICIAL AUTHENTICATION GATE (CANDIDATE & ADMIN) */}
      {activeScreen === 'auth' && (
        <UnifiedAuthView
          initialTab={initialAuthTab}
          initialBranchCode={candidateSession?.branchCode || 'APEX-2026'}
          initialPcNumber={terminalStationName || 'PC-01'}
          onCandidateLogin={handleCandidateLogin}
          onAdminLogin={handleAdminLogin}
          onBackToHub={() => setActiveScreen('landing')}
          authMessage={authMessage}
        />
      )}

      {/* SCREEN 2: AUTHENTICATED CANDIDATE & TEST CATALOG HUB */}
      {activeScreen === 'landing' && (
        <LandingPage
          tests={tests}
          onStartTest={(test, candidate, fullMock) => {
            startTest(test, candidate, fullMock);
          }}
          pastResults={pastResults}
          onViewResults={(res) => {
            if (res.isPublished === false) {
              handleOpenLookup(res.candidateId);
              return;
            }
            setActiveResult(res);
            const foundTest = tests.find((t) => t.id === res.testId) || currentTest;
            if (foundTest) {
              setCurrentTest(foundTest);
            }
            setActiveScreen('results');
          }}
          onOpenResultLookup={() => handleOpenLookup()}
          onOpenSuperAdmin={() => {
            if (adminUser?.role === 'super_admin') {
              setActiveScreen('super-admin');
            } else {
              setInitialAuthTab('admin');
              setAuthMessage('Super Administrator sign in required.');
              setActiveScreen('auth');
            }
          }}
          onOpenConsultancy={() => {
            if (adminUser) {
              if (adminUser.consultancyId) {
                setSelectedConsultancyId(adminUser.consultancyId);
              }
              setActiveScreen('consultancy');
            } else {
              setInitialAuthTab('admin');
              setAuthMessage('Consultancy Director sign in required.');
              setActiveScreen('auth');
            }
          }}
          onOpenTerminal={() => {
            setActiveScreen('terminal');
          }}
          candidateSession={candidateSession}
          adminUser={adminUser}
          onLogout={handleLogout}
        />
      )}

      {/* SCREEN 3: SUPER ADMIN PORTAL */}
      {activeScreen === 'super-admin' && (
        <SuperAdminPortal
          onBackToApp={() => setActiveScreen('landing')}
          onOpenConsultancy={(cid) => {
            setSelectedConsultancyId(cid);
            setActiveScreen('consultancy');
          }}
          onLogout={handleLogout}
        />
      )}

      {/* SCREEN 4: CONSULTANCY ADMIN & LAB INVIGILATOR PORTAL */}
      {activeScreen === 'consultancy' && (
        <ConsultancyPortal
          consultancyId={selectedConsultancyId}
          tests={tests}
          onBackToHub={() => setActiveScreen('landing')}
          onOpenTerminal={(stName) => {
            setTerminalStationName(stName);
            setActiveScreen('terminal');
          }}
          onLogout={handleLogout}
        />
      )}

      {/* SCREEN 5: STUDENT COMPUTER TERMINAL KIOSK */}
      {activeScreen === 'terminal' && (
        <StudentTerminalView
          initialStationName={terminalStationName}
          initialConsultancyId={selectedConsultancyId}
          tests={tests}
          onStartExam={(test, candidate, fullMock) => {
            const cleanStation = candidate.stationName || terminalStationName || 'PC-01';
            const cleanCid = candidate.consultancyId || selectedConsultancyId || 'apex-global';
            setTerminalStationName(cleanStation);
            setSelectedConsultancyId(cleanCid);
            const sess: CandidateSession = {
              stationName: cleanStation,
              branchCode: 'APEX-2026',
              consultancyId: cleanCid,
              consultancyName: 'Apex Global Education',
              candidateName: candidate.name,
              candidateId: candidate.candidateId,
              targetBand: candidate.targetBand || 7.5,
              loggedInAt: new Date().toISOString()
            };
            ConsultancyService.setCurrentCandidateSession(sess);
            setCandidateSession(sess);
            setActiveCandidateInfo({
              name: candidate.name,
              candidateId: candidate.candidateId,
              targetBand: candidate.targetBand,
              stationName: cleanStation,
              consultancyId: cleanCid
            });
            startTest(test, undefined, fullMock);
          }}
          onExitTerminal={() => {
            if (!candidateSession && !adminUser) {
              setActiveScreen('auth');
            } else {
              setActiveScreen('landing');
            }
          }}
          onOpenLookup={() => handleOpenLookup()}
        />
      )}

      {/* SCREEN 5.5: SUBMISSION CONFIRMED / RESULT WITHHELD RECEIPT */}
      {activeScreen === 'submission-confirmed' && activeResult && currentTest && (
        <SubmissionConfirmedView
          candidateInfo={{
            name: activeResult.candidateName || activeCandidateInfo?.name || 'Candidate',
            candidateId: activeResult.candidateId || activeCandidateInfo?.candidateId || '000000',
            stationName: activeCandidateInfo?.stationName || terminalStationName || 'PC-01',
            consultancyName: activeResult.consultancyName || 'Apex Global Education'
          }}
          test={currentTest}
          fullMockTitle={activeFullMock?.fullMock?.title}
          submittedResult={activeResult}
          onOpenLookup={() => handleOpenLookup(activeResult.candidateId)}
          onReturnToTerminalOrHub={() => {
            setActiveFullMock(null);
            if (activeCandidateInfo?.stationName) {
              setActiveScreen('terminal');
            } else {
              setActiveScreen('landing');
            }
          }}
        />
      )}

      {/* SCREEN 6: OFFICIAL CD-IELTS EXAMINATION SIMULATOR */}
      {activeScreen === 'exam' && currentTest && (
        <div className={`h-screen flex flex-col overflow-hidden bg-white select-none contrast-${settings.contrast} relative`}>
          {/* Invigilator Pause Overlay */}
          {isExamPausedByTeacher && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex flex-col items-center justify-center p-6 text-center text-slate-900 space-y-4 animate-in fade-in">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-xs">
                  <Pause className="w-7 h-7 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Examination Paused by Invigilator
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your test countdown timer and audio playback are temporarily paused. Please remain seated at your desk until the invigilator resumes the session.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Station: {activeCandidateInfo?.stationName || 'Lab Terminal'} • Live Synchronized</span>
                </div>
              </div>
            </div>
          )}

          <CDHeader
            test={currentTest}
            remainingSeconds={remainingSeconds}
            settings={settings}
            onUpdateSettings={(newSet) => setSettings((prev) => ({ ...prev, ...newSet }))}
            onExitTest={() => {
              if (window.confirm('Return to previous screen? Your current exam session will be interrupted.')) {
                if (activeCandidateInfo?.stationName && activeCandidateInfo?.consultancyId) {
                  ConsultancyService.resetStation(activeCandidateInfo.consultancyId, activeCandidateInfo.stationName);
                  setActiveScreen('terminal');
                } else {
                  setActiveScreen('landing');
                }
              }
            }}
            audioVolume={audioVolume}
            onVolumeChange={setAudioVolume}
            candidateName={activeCandidateInfo?.name || candidateSession?.candidateName}
            candidateId={activeCandidateInfo?.candidateId || candidateSession?.candidateId}
            consultancyName={
              ConsultancyService.getConsultancyById(activeCandidateInfo?.consultancyId || candidateSession?.consultancyId || selectedConsultancyId)?.name ||
              candidateSession?.consultancyName
            }
          />

          {/* Exam View based on module: reading, listening, or writing */}
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

              {/* 40 Question Palette & Navigation */}
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

      {/* FULL MOCK EXAM INTERMISSION MODAL (Real IELTS 60s transition from Listening to Reading) */}
      {showFullMockIntermission && activeFullMock && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Section 1 of 2 Complete
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Listening Test Submitted!
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your 40 listening responses have been recorded. In official Computer-Delivered IELTS, candidates have a 1-minute transition window before the <strong>Academic Reading Test</strong> begins.
              </p>
            </div>

            {/* Step Progress Visualizer */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div className="text-left bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-emerald-700 font-bold uppercase block flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                </span>
                <span className="font-bold text-slate-900 block mt-0.5">Listening Test</span>
                <span className="text-slate-500 text-[11px]">40 Questions</span>
              </div>
              <div className="text-left bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-200">
                <span className="text-[10px] text-indigo-700 font-bold uppercase block flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-indigo-600" /> Next Section
                </span>
                <span className="font-bold text-slate-900 block mt-0.5">Academic Reading</span>
                <span className="text-slate-500 text-[11px]">60 Mins • 40 Questions</span>
              </div>
            </div>

            {/* Countdown notice */}
            <div className="text-xs font-semibold text-slate-600 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>
                Starting automatically in <strong className="text-indigo-700 font-mono text-sm">{intermissionCountdown}s</strong>
              </span>
            </div>

            {/* Immediate Action Button */}
            <button
              onClick={handleProceedToReading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>Begin Academic Reading Test Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 7: DIAGNOSTIC RESULTS REPORT */}
      {activeScreen === 'results' && activeResult && currentTest && (
        <ResultReport
          test={currentTest}
          result={activeResult}
          fullMockDetails={
            activeFullMock && activeFullMock.listeningResult && activeFullMock.readingResult
              ? {
                  fullMockTitle: activeFullMock.fullMock.title,
                  overallBand: activeFullMock.overallBand || 7.5,
                  listeningResult: activeFullMock.listeningResult,
                  readingResult: activeFullMock.readingResult,
                  listeningTest: activeFullMock.fullMock.listeningTest,
                  readingTest: activeFullMock.fullMock.readingTest
                }
              : undefined
          }
          onReturnHub={() => {
            setActiveFullMock(null);
            if (activeCandidateInfo?.stationName) {
              setActiveScreen('terminal');
            } else {
              setActiveScreen('landing');
            }
          }}
          onRetakeTest={() => {
            if (activeFullMock) {
              startTest(activeFullMock.fullMock.listeningTest, undefined, activeFullMock.fullMock);
            } else {
              startTest(currentTest);
            }
          }}
        />
      )}

      {/* CANDIDATE RESULT LOOKUP & VERIFICATION MODAL */}
      <CandidateResultLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
        initialCandidateId={lookupInitialCandidateId}
        consultancyId={selectedConsultancyId}
        onViewResult={handleViewPublishedResult}
      />
    </div>
  );
};

export default App;
