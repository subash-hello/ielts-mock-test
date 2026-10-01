import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BookOpen,
  Headphones,
  Award,
  CheckCircle,
  CheckCircle2,
  Clock,
  Volume2,
  Building2,
  Laptop,
  Cpu,
  ArrowRight,
  Search,
  Check,
  LogOut,
  User,
  Sparkles,
  ChevronDown,
  Code,
  Terminal,
  Globe,
  Mail,
  Monitor,
  Layers,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  PenTool,
  Menu,
  X
} from 'lucide-react';
import type { IELTSMockTest, IELTSModule, TestResult, FullMockTest } from '../../types/ielts';
import type { CandidateSession, AdminUser } from '../../types/consultancy';
import { allMockTests, buildFullMockTests } from '../../data/mockTests';
import { CandidateCheckInModal } from '../exam/CandidateCheckInModal';
import { ConsultancyService } from '../../services/consultancyService';

interface LandingPageProps {
  tests?: IELTSMockTest[];
  onStartTest: (
    test: IELTSMockTest,
    candidate?: {
      name: string;
      candidateId: string;
      targetBand: number;
      consultancyId: string;
      consultancyName: string;
      phone?: string;
      email?: string;
    },
    fullMockTest?: FullMockTest
  ) => void;
  pastResults: TestResult[];
  onViewResults: (result: TestResult) => void;
  onOpenSuperAdmin?: () => void;
  onOpenConsultancy?: () => void;
  onOpenTerminal?: () => void;
  onOpenResultLookup?: () => void;
  candidateSession?: CandidateSession | null;
  adminUser?: AdminUser | null;
  onLogout?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  tests = allMockTests,
  onStartTest,
  pastResults,
  onViewResults,
  onOpenSuperAdmin,
  onOpenConsultancy,
  onOpenTerminal,
  onOpenResultLookup,
  candidateSession,
  adminUser,
  onLogout
}) => {
  const [selectedBook, setSelectedBook] = useState<number>(19);
  const [moduleFilter, setModuleFilter] = useState<'all' | 'full' | IELTSModule>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSoundTesting, setIsSoundTesting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Candidate Name Check-In Modal state when clicking ANY test
  const [selectedTestForModal, setSelectedTestForModal] = useState<IELTSMockTest | null>(null);
  const [selectedFullMockForModal, setSelectedFullMockForModal] = useState<FullMockTest | null>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);

  // Candidate Name Input & Active Launched Test for Candidate Session
  const [candidateNameInput, setCandidateNameInput] = useState<string>(() => {
    return (
      candidateSession?.candidateName ||
      localStorage.getItem('ielts_candidate_name') ||
      ''
    );
  });

  const [activeLaunchedTest, setActiveLaunchedTest] = useState<{
    testId: string;
    title: string;
    launchedAt: string;
    isFullMock?: boolean;
    consultancyId?: string;
  } | null>(() => {
    const stationTest = ConsultancyService.getStationAssignedTest(
      candidateSession?.consultancyId,
      candidateSession?.stationName
    );
    if (stationTest) {
      return {
        testId: stationTest.testId,
        title: stationTest.title,
        launchedAt: stationTest.launchedAt,
        isFullMock: stationTest.isFullMock,
        consultancyId: stationTest.consultancyId
      };
    }
    return ConsultancyService.getActiveLaunchedTest(candidateSession?.consultancyId);
  });

  // Sync candidateNameInput when candidateSession updates
  useEffect(() => {
    if (candidateSession?.candidateName) {
      setCandidateNameInput(candidateSession.candidateName);
    }
  }, [candidateSession?.candidateName]);

  // Subscribe and poll for active branch launched test & station assignments
  useEffect(() => {
    const syncTest = () => {
      const cid = candidateSession?.consultancyId;
      const stName = candidateSession?.stationName;

      // 1. Branch-wide launched test (consultancy-specific or newest active)
      const branchTest = ConsultancyService.getActiveLaunchedTest(cid);

      // 2. Station-specific assignment
      const stTest = stName ? ConsultancyService.getStationAssignedTest(cid, stName) : null;

      // 3. Compare timestamps: whichever is newer wins
      let resolved: typeof branchTest = null;
      if (branchTest && stTest) {
        const bTime = new Date(branchTest.launchedAt || 0).getTime();
        const sTime = new Date(stTest.launchedAt || 0).getTime();
        resolved = bTime >= sTime ? branchTest : stTest;
      } else {
        resolved = branchTest || stTest;
      }

      setActiveLaunchedTest(resolved);

      if (stTest?.candidate?.name && !candidateNameInput.trim()) {
        setCandidateNameInput(stTest.candidate.name);
      }
    };

    syncTest();

    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (event.type === 'BRANCH_TEST_LAUNCHED') {
        const payload = event.payload;
        if (payload?.testId) {
          const launched = {
            testId: payload.testId,
            title: payload.title || payload.testId,
            launchedAt: payload.launchedAt || new Date().toISOString(),
            isFullMock: payload.isFullMock,
            consultancyId: payload.consultancyId
          };
          setActiveLaunchedTest(launched);

          // Update candidate session in storage to match launching branch consultancy
          if (payload.consultancyId) {
            const targetC = ConsultancyService.getConsultancyById(payload.consultancyId);
            if (targetC && candidateSession) {
              const updated: CandidateSession = {
                ...candidateSession,
                consultancyId: targetC.id,
                consultancyName: targetC.name,
                branchCode: targetC.branchCode || targetC.accessCode || candidateSession.branchCode
              };
              ConsultancyService.setCurrentCandidateSession(updated);
            }
          }
        } else {
          setActiveLaunchedTest(null);
          syncTest();
        }
      } else if (
        event.type === 'STATION_COMMAND' ||
        event.type === 'STATION_UPDATED' ||
        event.type === 'STORAGE_SYNC' ||
        event.type === 'WINDOW_FOCUSED'
      ) {
        syncTest();
      }
    });

    // High-frequency responsive fallback interval (200ms) for instant detection
    const interval = setInterval(syncTest, 200);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [candidateSession?.consultancyId, candidateSession?.stationName]);

  // Auto-scroll to test station immediately when a test is launched by invigilator
  const lastLaunchedIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (activeLaunchedTest?.testId && activeLaunchedTest.testId !== lastLaunchedIdRef.current) {
      lastLaunchedIdRef.current = activeLaunchedTest.testId;
      setTimeout(() => {
        const el = document.getElementById('test-station');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 60);
    }
  }, [activeLaunchedTest?.testId]);

  // Resolve launched test or full mock
  const resolvedLaunchedTest = useMemo(() => {
    if (!activeLaunchedTest) return null;
    return (
      tests.find((t) => t.id === activeLaunchedTest.testId) ||
      allMockTests.find((t) => t.id === activeLaunchedTest.testId) ||
      null
    );
  }, [activeLaunchedTest, tests]);

  const resolvedLaunchedFullMock = useMemo(() => {
    if (!activeLaunchedTest || !activeLaunchedTest.isFullMock) return null;
    const allFMs = buildFullMockTests(tests.length > 0 ? tests : allMockTests);
    return allFMs.find((fm) => fm.id === activeLaunchedTest.testId) || null;
  }, [activeLaunchedTest, tests]);

  const handleStartLaunchedTest = () => {
    const cleanName = candidateNameInput.trim();
    if (!cleanName) {
      alert('Please enter your full name before starting the exam.');
      return;
    }
    localStorage.setItem('ielts_candidate_name', cleanName);

    const candId =
      candidateSession?.candidateId ||
      '00' + Math.floor(1000 + Math.random() * 9000);
    const targetBand = candidateSession?.targetBand || 7.5;
    const cid = activeLaunchedTest?.consultancyId || candidateSession?.consultancyId || 'apex-global';
    const cObj = ConsultancyService.getConsultancyById(cid);
    const cname = candidateSession?.consultancyName || cObj?.name || 'IELTS Mock Test Station';
    const station = candidateSession?.stationName || 'PC-01';

    if (candidateSession) {
      const updatedSession: CandidateSession = {
        ...candidateSession,
        candidateName: cleanName
      };
      ConsultancyService.setCurrentCandidateSession(updatedSession);
    }

    const candidateData = {
      name: cleanName,
      candidateId: candId,
      targetBand,
      consultancyId: cid,
      consultancyName: cname,
      stationName: station
    };

    if (activeLaunchedTest?.isFullMock && resolvedLaunchedFullMock) {
      onStartTest(resolvedLaunchedFullMock.listeningTest, candidateData, resolvedLaunchedFullMock);
      return;
    }

    if (resolvedLaunchedTest) {
      onStartTest(resolvedLaunchedTest, candidateData);
      return;
    }

    const fallback =
      tests.find((t) => t.id === activeLaunchedTest?.testId) ||
      allMockTests.find((t) => t.id === activeLaunchedTest?.testId) ||
      tests[0];
    if (fallback) {
      onStartTest(fallback, candidateData);
    }
  };

  // Filter tests by consultancy assignment if candidate is logged in under a consultancy
  const consultancyAssignedIds = useMemo(() => {
    if (!candidateSession?.consultancyId) return [];
    return ConsultancyService.getAssignedTestIds(candidateSession.consultancyId);
  }, [candidateSession?.consultancyId]);

  const candidateAvailableTests = useMemo(() => {
    if (candidateSession?.consultancyId) {
      if (consultancyAssignedIds.length > 0) {
        return tests.filter((t) => consultancyAssignedIds.includes(t.id));
      }
      return []; // Only show tests assigned/accepted by their consultancy
    }
    return tests;
  }, [tests, candidateSession?.consultancyId, consultancyAssignedIds]);

  const candidateFullMocks = useMemo(() => {
    return buildFullMockTests(candidateAvailableTests);
  }, [candidateAvailableTests]);

  const handleTestClick = (test: IELTSMockTest) => {
    setSelectedTestForModal(test);
    setSelectedFullMockForModal(null);
    setIsCheckInModalOpen(true);
  };

  const handleFullMockClick = (fullMock: FullMockTest) => {
    setSelectedTestForModal(fullMock.listeningTest);
    setSelectedFullMockForModal(fullMock);
    setIsCheckInModalOpen(true);
  };

  const handleConfirmCandidate = (candidate: {
    name: string;
    candidateId: string;
    targetBand: number;
    consultancyId: string;
    consultancyName: string;
    phone?: string;
    email?: string;
  }) => {
    setIsCheckInModalOpen(false);
    if (selectedTestForModal) {
      onStartTest(selectedTestForModal, candidate, selectedFullMockForModal || undefined);
    }
  };

  const books = [16, 18, 19, 20, 21];

  const filteredTests = useMemo(() => {
    if (moduleFilter === 'full') return [];
    return candidateAvailableTests.filter((test) => {
      if (moduleFilter === 'writing') {
        if (test.module !== 'writing') return false;
        // If specific book is selected and it has writing, respect it, otherwise show all writing
        if (selectedBook === 16 && test.book !== 16) return false;
      } else {
        if (test.book !== selectedBook) return false;
        if (moduleFilter !== 'all' && test.module !== moduleFilter) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = test.title.toLowerCase().includes(query);
        const matchesModule = test.module.toLowerCase().includes(query);
        if (!matchesTitle && !matchesModule) return false;
      }
      return true;
    });
  }, [candidateAvailableTests, selectedBook, moduleFilter, searchQuery]);

  const filteredFullMocks = useMemo(() => {
    return candidateFullMocks.filter((fm) => {
      if (fm.book !== selectedBook) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return fm.title.toLowerCase().includes(query);
      }
      return true;
    });
  }, [candidateFullMocks, selectedBook, searchQuery]);

  // Audio Test Tone generator (440Hz standard)
  const testAudio = () => {
    if (typeof window === 'undefined') return;
    try {
      setIsSoundTesting(true);
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);

      setTimeout(() => {
        setIsSoundTesting(false);
      }, 1300);
    } catch {
      setIsSoundTesting(false);
    }
  };

  const scrollToTests = () => {
    const targetId = candidateSession ? 'test-station' : 'test-catalog';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const faqs = [
    {
      q: 'Are these mock tests authentic Cambridge Academic papers?',
      a: 'Yes. All mock tests are authentic full-length practice tests from Cambridge Academic IELTS books 18, 19, 20, and 21. Each Reading test contains 3 academic passages and 40 questions (60 minutes). Each Listening test contains 4 parts with authentic audio tracks, map labelling, and form completion.'
    },
    {
      q: 'How is the IELTS Band Score calculated?',
      a: 'After completing any mock test, the platform evaluates your raw score out of 40 and calculates your official IELTS Band Score (0.0 to 9.0) using the exact Cambridge Academic conversion rubrics for Reading and Listening.'
    },
    {
      q: 'Does this platform replicate the official Computer-Delivered IELTS (CD-IELTS) interface?',
      a: 'Yes. The exam interface replicates the official British Council / IDP Computer-Delivered IELTS test layout, including split-screen passage view, highlighters, question navigation palette, volume controls, countdown timer with 10-minute warning, and review flags.'
    },
    {
      q: 'How does the Study Abroad Consultancy Lab integration work?',
      a: 'Consultancies and language institutions can run physical computer labs using our Station Terminal mode (PC-01, PC-02, etc.). When candidates enter their name and student ID, their test progress, timers, and finished band score reports synchronize directly to the consultancy director dashboard in real time.'
    },
    {
      q: 'Can I practice Speaking and Writing modules as well?',
      a: 'Yes. For AI-evaluated Speaking (with voice analysis and examiner simulation) and Academic Writing Task 1 & Task 2 scoring, visit our parent platform at masterieltsai.com.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
      {/* 1. Top Status Ribbon */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-700 py-2 px-3 sm:px-4 z-40 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs">
              Computer-Delivered IELTS (CD-IELTS) Simulator • <strong className="text-slate-900">Cambridge Academic 16–21</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] sm:text-xs text-slate-600">
            <a
              href="https://masterieltsai.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition flex items-center gap-1"
            >
              <span>Visit masterieltsai.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Study Abroad Consultancy Lab Network</span>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand: MOCK TEST from Master IELTS AI */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center shadow-xs border border-slate-200 bg-white p-1 group-hover:border-indigo-400 transition shrink-0">
              <img
                src="/images/masterieltsai-icon.png"
                alt="Master IELTS AI"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 uppercase">
                  MOCK TEST
                </span>
                <span className="hidden sm:inline-flex text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Cambridge 16–21
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                from{' '}
                <a
                  href="https://masterieltsai.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold underline decoration-indigo-300 hover:decoration-indigo-600 transition"
                >
                  Master IELTS AI
                </a>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-slate-700">
            <a href="#test-catalog" className="text-slate-900 hover:text-indigo-600 transition flex items-center gap-1.5">
              <span>Mock Tests</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-600 text-white font-black">44 PAPERS</span>
            </a>
            <a href="#cd-features" className="hover:text-indigo-600 transition">CD-IELTS Format</a>
            <a href="#consultancy-lab" className="hover:text-indigo-600 transition">Consultancy Network</a>
            <a href="#creators" className="hover:text-indigo-600 transition">Creators</a>
            <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Audio Check Button */}
            <button
              onClick={testAudio}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isSoundTesting
                  ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              title="Test audio tone before the Listening exam"
            >
              <Volume2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">{isSoundTesting ? 'Playing 440Hz...' : 'Sound Test'}</span>
            </button>

            {/* Candidate Session Pill */}
            {candidateSession && (
              <div className="hidden xl:flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-bold text-slate-900 truncate max-w-[100px]">{candidateSession.candidateName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-indigo-700 truncate max-w-[90px]">{candidateSession.consultancyName}</span>
              </div>
            )}

            {/* Admin Session Pill */}
            {adminUser && (
              <div className="hidden xl:flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                <span className="font-bold text-blue-900 truncate max-w-[100px]">{adminUser.name || adminUser.email}</span>
              </div>
            )}

            {/* Check Results / TRF Lookup Button */}
            {onOpenResultLookup && (
              <button
                onClick={onOpenResultLookup}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs transition cursor-pointer"
                title="Verify Candidate Band Score & Official TRF"
              >
                <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Check Results</span>
              </button>
            )}

            {/* Consultancy Portal Login */}
            {onOpenConsultancy && (
              <button
                onClick={onOpenConsultancy}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs transition cursor-pointer"
                title="Consultancy Director & Lab Portal"
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Portal</span>
              </button>
            )}

            {/* Super Admin */}
            {adminUser?.role === 'super_admin' && onOpenSuperAdmin && (
              <button
                onClick={onOpenSuperAdmin}
                className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
                title="Super Admin Dashboard"
              >
                <Cpu className="w-4 h-4 text-purple-600" />
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={scrollToTests}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:-translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{candidateSession ? 'Test Station' : 'Select Test'}</span>
            </button>

            {/* Sign Out Button */}
            {(candidateSession || adminUser) && onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 sm:p-2 rounded-xl text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 lg:hidden transition cursor-pointer"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <a
                href="#test-catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between"
              >
                <span>Mock Tests</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-600 text-white font-black">44</span>
              </a>
              <a
                href="#cd-features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600"
              >
                CD-IELTS Format
              </a>
              <a
                href="#consultancy-lab"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Consultancy Lab
              </a>
              <a
                href="#creators"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Meet Creators
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 col-span-2"
              >
                Frequently Asked Questions
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
              {onOpenResultLookup && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenResultLookup();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-extrabold border border-indigo-200 text-center flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>Check Results / Verify TRF</span>
                </button>
              )}
              {onOpenConsultancy && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenConsultancy();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 text-center"
                >
                  Consultancy Portal Login
                </button>
              )}
              {onOpenTerminal && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 text-center"
                >
                  Pair Student PC
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Active Candidate Session Banner */}
      {candidateSession && (
        <div className="bg-indigo-50 border-b border-indigo-200 px-4 py-2.5 text-xs z-30 relative text-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Connected Station: <strong className="text-slate-900">{candidateSession.stationName}</strong></span>
              <span className="text-slate-300">•</span>
              <span>Test Centre: <strong className="text-slate-900">{candidateSession.consultancyName}</strong></span>
              <span className="text-slate-300">•</span>
              <span>Candidate: <strong className="text-slate-900">{candidateSession.candidateName}</strong></span>
              <span className="text-slate-300">•</span>
              <span>ID: <strong className="font-mono text-indigo-700 font-bold">{candidateSession.candidateId}</strong></span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
              >
                Disconnect Station
              </button>
            )}
          </div>
        </div>
      )}

      {/* Instant Live Exam Alert Ribbon */}
      {activeLaunchedTest && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 shadow-md z-30 sticky top-16 sm:top-20 animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
              </span>
              <span className="font-extrabold tracking-wide uppercase text-[11px] bg-white/20 px-2 py-0.5 rounded-md">
                Live Test Ready
              </span>
              <span className="font-semibold truncate max-w-sm sm:max-w-md">
                {resolvedLaunchedFullMock ? resolvedLaunchedFullMock.title : resolvedLaunchedTest ? resolvedLaunchedTest.title : activeLaunchedTest.title}
              </span>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('test-station');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="px-3 py-1 bg-white text-emerald-800 hover:bg-emerald-50 rounded-lg font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Go to Test Station</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. CANDIDATE TEST STATION (IF ACTIVELY LAUNCHED OR LOGGED IN UNDER CANDIDATE SESSION) */}
      {(candidateSession || activeLaunchedTest) ? (
        <>
          <section id="test-station" className="relative z-10 py-8 sm:py-12 bg-slate-50 min-h-[75vh] flex flex-col justify-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-6">
              {/* Station Status Bar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-mono font-black text-sm shadow-xs shrink-0">
                    {candidateSession?.stationName || 'PC-01'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Station: {candidateSession?.stationName || 'PC-01'}
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-semibold text-emerald-700">
                        Synchronized
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {(activeLaunchedTest?.consultancyId
                        ? ConsultancyService.getConsultancyById(activeLaunchedTest.consultancyId)?.name
                        : null) ||
                        candidateSession?.consultancyName ||
                        'Educational Consultancy Lab'}
                      {candidateSession?.candidateId ? (
                        <> • Candidate ID: <strong className="font-mono text-indigo-700">{candidateSession.candidateId}</strong></>
                      ) : (
                        <> • Live Exam Station</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  {onOpenResultLookup && (
                    <button
                      onClick={onOpenResultLookup}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Check Results</span>
                    </button>
                  )}
                  {candidateSession && onLogout && (
                    <button
                      onClick={onLogout}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-semibold border border-slate-200 transition cursor-pointer"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </div>

              {/* Candidate Full Name Input (Required before test) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    <span>Candidate Full Name</span>
                    <span className="text-red-500 text-xs">*</span>
                  </label>
                  {candidateNameInput.trim() ? (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ready
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      Name Required
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    value={candidateNameInput}
                    onChange={(e) => {
                      setCandidateNameInput(e.target.value);
                      localStorage.setItem('ielts_candidate_name', e.target.value);
                    }}
                    placeholder="Type your full official name (e.g. Sujan Sharma)"
                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-900 px-4 py-3 rounded-xl outline-none text-sm transition shadow-2xs"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Your official name will appear on the teacher invigilator monitor, writing submission, and published scorecard.
                </p>
              </div>

              {/* ================= CONDITION A: TEST IS LAUNCHED BY ADMIN ================= */}
              {activeLaunchedTest ? (
                <div className="bg-gradient-to-b from-emerald-50/70 via-white to-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                        Live Exam Session Launched by Invigilator
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(activeLaunchedTest.launchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Test Meta Card */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full') ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                          <Layers className="w-3.5 h-3.5 text-purple-700" />
                          <span>Full Mock Test</span>
                        </span>
                      ) : resolvedLaunchedTest?.module === 'writing' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                          <PenTool className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Academic Writing</span>
                        </span>
                      ) : resolvedLaunchedTest?.module === 'reading' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                          <span>Academic Reading</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs">
                          <Headphones className="w-3.5 h-3.5 text-indigo-700" />
                          <span>Academic Listening</span>
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>
                          {activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full')
                            ? '95 Mins Total'
                            : resolvedLaunchedTest?.module === 'writing'
                            ? '60 Mins • 2 Tasks'
                            : resolvedLaunchedTest?.module === 'reading'
                            ? '60 Mins • 40 Questions'
                            : '35 Mins • 40 Questions'}
                        </span>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {resolvedLaunchedFullMock ? resolvedLaunchedFullMock.title : resolvedLaunchedTest ? resolvedLaunchedTest.title : activeLaunchedTest.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {resolvedLaunchedTest?.module === 'writing'
                        ? 'In this exam session, you will complete Task 1 (report/summary, 150 words minimum) and Task 2 (essay, 250 words minimum). Your essays will submit directly to your consultancy admin for band scoring.'
                        : activeLaunchedTest.isFullMock || activeLaunchedTest.testId.includes('full')
                        ? 'Official full mock exam sequence: Section 1 Listening (35 min), followed by a 1-minute transition window, and Section 2 Reading (60 min).'
                        : 'Standard computer-delivered examination simulator with official timing, navigation palette, and live invigilator telemetry.'}
                    </p>
                  </div>

                  {/* Start Exam Action Button */}
                  <div>
                    {candidateNameInput.trim().length >= 2 ? (
                      <button
                        onClick={handleStartLaunchedTest}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl transition cursor-pointer shadow-lg hover:shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 transform active:scale-[0.99]"
                      >
                        <span>Start Test</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <button
                          disabled
                          className="w-full py-4 bg-slate-200 text-slate-400 font-bold text-sm rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          <span>Please Enter Your Full Name Above to Start Test</span>
                        </button>
                        <p className="text-[11px] text-center text-amber-700 font-medium">
                          Invigilator protocol requires candidate identification before launching.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ================= CONDITION B: NO TEST LAUNCHED YET (AWAITING SCREEN) ================= */
                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <span className="w-full h-full rounded-full bg-indigo-100/60 animate-ping absolute" />
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center relative z-10 shadow-xs">
                      <Monitor className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Station {candidateSession?.stationName || 'PC-01'} Connected to Invigilator Radar</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Waiting for Invigilator to Launch Test
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Please enter your candidate name above and remain seated. Your consultancy invigilator will launch the test session from the admin control desk.
                    </p>
                  </div>

                  {/* Helpful Actions while waiting */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={testAudio}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                      <span>{isSoundTesting ? 'Playing Test Tone (440Hz)...' : 'Check Audio / Headphones'}</span>
                    </button>
                    {onOpenResultLookup && (
                      <button
                        onClick={onOpenResultLookup}
                        className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs transition flex items-center gap-2 cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4 text-indigo-600" />
                        <span>Check Published Results by Candidate ID</span>
                      </button>
                    )}
                  </div>

                  {/* Instructions Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left text-xs max-w-lg mx-auto space-y-2.5">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>CD-IELTS Terminal Protocol:</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                      <li>No tests are visible to students until authorized by the branch administrator.</li>
                      <li>When the invigilator clicks <strong>Launch Test</strong>, the <strong>Start Test</strong> button will appear here in real time.</li>
                      <li>Ensure your headphones are connected and sound volume is adjusted properly.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Dedicated Candidate Terminal Footer */}
          <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-500">
            British Council &amp; IDP CD-IELTS Standard Computer Terminal • Station {candidateSession?.stationName || 'PC-01'} • Official Invigilator Telemetry Active
          </footer>
        </>
      ) : (
        /* GUEST / VISITOR PUBLIC SECTIONS */
        <>
          {/* 3. Hero Section (Clean, High-Contrast White Background) */}
          <section className="relative z-10 pt-8 pb-12 sm:pt-14 sm:pb-16 lg:pt-18 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Official Cambridge Academic 18–21 Papers</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-950">
                Official IELTS Academic{' '}
                <span className="gradient-text">
                  Mock Tests
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Take full-length Reading and Listening practice tests under authentic Computer-Delivered IELTS (CD-IELTS) exam conditions. Experience official timed sections, side-by-side reading passages, listening audio players, and instant band score calculation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <button
                  onClick={scrollToTests}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Browse All 44 Tests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenConsultancy && (
                  <button
                    onClick={onOpenConsultancy}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <span>Consultancy Lab Portal</span>
                  </button>
                )}

                <button
                  onClick={testAudio}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Check Audio</span>
                </button>
              </div>

              {/* Real Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-slate-200 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">44 Papers</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">Cambridge 16, 18, 19, 20 &amp; 21</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">CD-IELTS</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">Official Exam Layout</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">Band 9.0</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">Official Raw Conversion</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">Live Sync</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">Consultancy Telemetry</p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Exam Screen Preview Card */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="w-full max-w-[460px] rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xl space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-bold text-slate-900">IELTS Academic Reading</span>
                  </div>
                  <span className="font-mono text-indigo-700 font-bold">59:14 remaining</span>
                </div>

                {/* Simulated Screen Body */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 border-b border-slate-200 pb-2">
                    <span className="font-semibold">Cambridge 19 • Test 1</span>
                    <span className="text-indigo-700 font-mono font-medium truncate max-w-[180px] sm:max-w-none">
                      Passage 1: Tennis Rackets
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                      <span className="text-slate-500 block font-semibold text-[10px] sm:text-[11px]">Reading Passage</span>
                      <p className="text-slate-800 text-[10px] line-clamp-3 leading-relaxed">
                        In 1874, Major Walter Wingfield patented a game he called Sphairistike, which soon became lawn tennis...
                      </p>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                      <span className="text-slate-500 block font-semibold text-[10px] sm:text-[11px]">Questions 1–7</span>
                      <p className="text-indigo-700 text-[10px] font-mono font-bold">
                        TRUE / FALSE / NOT GIVEN
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[8px] sm:text-[9px] font-bold">Q1 Done</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[8px] sm:text-[9px] font-bold">Q2 Flag</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Palette preview */}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider block mb-1.5 font-bold">
                      Question Palette (40 Questions)
                    </span>
                    <div className="grid grid-cols-10 gap-0.5 sm:gap-1 text-center font-mono text-[8px] sm:text-[9px]">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className={`py-0.5 rounded ${
                            i < 12
                              ? 'bg-blue-600 text-white font-bold'
                              : i === 12
                              ? 'bg-amber-400 text-slate-900 font-bold'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 text-[11px]">Standard CD-IELTS Environment</span>
                  <button
                    onClick={scrollToTests}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                  >
                    Start Paper →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cambridge Academic Mock Test Catalog (#test-catalog) */}
      <section id="test-catalog" className="relative z-10 py-12 sm:py-16 bg-slate-50 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
                <FileCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Cambridge Academic Papers Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Select Your <span className="gradient-text">Examination Paper</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Choose any paper from Cambridge 18, 19, 20, or 21. Enter candidate details to begin the exam session and record your score.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-auto md:min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tests (e.g. Test 1, Reading)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none transition shadow-xs"
              />
            </div>
          </div>

          {/* Book & Module Selector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Book Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 shrink-0">Book:</span>
              {books.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBook(b)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    selectedBook === b
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs'
                  }`}
                >
                  <span>Cambridge {b}</span>
                  {b === 16 && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      selectedBook === 16
                        ? 'bg-violet-500 text-white'
                        : 'bg-violet-100 text-violet-800 border border-violet-200'
                    }`}>
                      + Writing
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Module Filter */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
              <button
                onClick={() => setModuleFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  moduleFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-300'
                }`}
              >
                All Papers
              </button>
              <button
                onClick={() => setModuleFilter('full')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  moduleFilter === 'full'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Full Mock Tests (95–155m)</span>
              </button>
              <button
                onClick={() => setModuleFilter('reading')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  moduleFilter === 'reading'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reading (60m)</span>
              </button>
              <button
                onClick={() => setModuleFilter('listening')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  moduleFilter === 'listening'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-300'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listening (30m)</span>
              </button>
              <button
                onClick={() => {
                  setModuleFilter('writing');
                  setSelectedBook(16);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  moduleFilter === 'writing'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-300'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Writing (60m)</span>
                <span className={`text-[10px] font-mono px-1 rounded font-extrabold ${
                  moduleFilter === 'writing' ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-800'
                }`}>
                  Book 16
                </span>
              </button>
            </div>
          </div>



          {/* FULL MOCK TESTS VIEW */}
          {moduleFilter === 'full' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredFullMocks.map((fullMock) => (
                <div
                  key={fullMock.id}
                  onClick={() => handleFullMockClick(fullMock)}
                  className="rounded-2xl p-5 border border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 hover:border-indigo-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5 relative shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono border border-indigo-200">
                        BOOK {fullMock.book}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-600 text-white shadow-2xs">
                        <Layers className="w-3 h-3" />
                        <span>Full Mock Test</span>
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {fullMock.title}
                    </h3>

                    <div className="p-3 bg-white/80 border border-indigo-100 rounded-xl space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5 font-semibold text-purple-700">
                          <Headphones className="w-3.5 h-3.5" /> Listening Section
                        </span>
                        <span className="font-mono font-medium">35 Mins • 40 Qs</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5 font-semibold text-blue-700">
                          <BookOpen className="w-3.5 h-3.5" /> Reading Section
                        </span>
                        <span className="font-mono font-medium">60 Mins • 40 Qs</span>
                      </div>
                      {fullMock.writingTest && (
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1.5 font-semibold text-violet-700">
                            <PenTool className="w-3.5 h-3.5" /> Writing Section
                          </span>
                          <span className="font-mono font-medium">60 Mins • 2 Tasks</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{fullMock.totalDurationMinutes} Mins Total</span>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">
                        {fullMock.writingTest ? '80 Qs + 2 Writing Tasks' : '80 Questions'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-indigo-100 flex items-center justify-between">
                    <span className="text-[11px] text-indigo-700 font-semibold">Real Exam Simulation</span>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Start Full Mock</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredFullMocks.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-700">No Full Mock Tests found for Book {selectedBook}</p>
                  <p className="text-xs text-slate-500 mt-1">Try selecting another Cambridge book or individual papers.</p>
                </div>
              )}
            </div>
          ) : (
            /* Test Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredTests.map((test) => {
              const isReading = test.module === 'reading';
              const isWriting = test.module === 'writing';
              const totalQ = test.sections.reduce(
                (acc, s) =>
                  acc + s.questionGroups.reduce((gAcc, g) => gAcc + (g.questions?.length || 0), 0),
                0
              );

              // Check if user has taken this test previously
              const pastAttempt = pastResults.find((r) => r.testId === test.id);

              return (
                <div
                  key={test.id}
                  onClick={() => handleTestClick(test)}
                  className="rounded-2xl p-4 sm:p-5 border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5 relative shadow-xs"
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono border border-slate-200">
                        BOOK {test.book}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          isReading
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : isWriting
                            ? 'bg-violet-50 text-violet-800 border border-violet-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isReading ? <BookOpen className="w-3 h-3" /> : isWriting ? <PenTool className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                        <span>{test.module}</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {test.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{test.durationMinutes} Mins</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>
                          {isWriting ? '2 Tasks (Task 1 & 2)' : `${totalQ} Questions`}
                        </span>
                      </span>
                    </div>

                    {pastAttempt && (
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium text-[11px]">Last Attempt</span>
                        {pastAttempt.isPublished !== false ? (
                          <span className="font-mono font-black text-emerald-700 text-xs">
                            {pastAttempt.writingSubmission ? (
                              `Band ${pastAttempt.bandScore.toFixed(1)} (T1: ${pastAttempt.writingSubmission.task1Band ?? '—'}, T2: ${pastAttempt.writingSubmission.task2Band ?? '—'})`
                            ) : (
                              `Band ${pastAttempt.bandScore.toFixed(1)} (${pastAttempt.correctCount}/${pastAttempt.totalQuestions})`
                            )}
                          </span>
                        ) : (
                          <span className="font-mono font-bold text-amber-700 text-[10px] bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                            Pending Release
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">Cambridge Rubric</span>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                    >
                      <span>Take Test</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </section>

      {/* 5. Authentic CD-IELTS Exam Features (#cd-features) */}
      <section id="cd-features" className="relative z-10 py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-3">
              <Monitor className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> True-to-Life Testing Environment
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight mb-2 sm:mb-3">
              Standard Computer-Delivered <span className="gradient-text">CD-IELTS Features</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Our mock test engine is designed to mirror the exact test day experience at official British Council and IDP test centres.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Side-by-Side Reading View</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Academic reading passages appear on the left with questions on the right. Highlight text, take notes, and adjust column split widths just like in the real CD-IELTS examination.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Authentic Listening Player</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Section-by-section continuous audio playback with authentic British, Australian, and North American accents, interactive map labeling, and multiple-choice questions.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Interactive 40-Question Palette</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review answered questions, unanswered questions, and flagged questions at a single glance. Jump to any question instantly across all 3 passages or 4 audio sections.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Official Cambridge Band 9.0 Scale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated raw score to IELTS Band conversion calibrated against official Cambridge Assessment criteria for both Reading (Academic) and Listening modules.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Strict Countdown Timer &amp; 10m Warning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real exam clock with hide/show options during testing and an automatic flashing warning during the final 10 minutes to help candidates master pacing.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Consultancy Lab Telemetry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidate scores and session logs synchronize in real time to the education consultancy portal for director review, mock test rankings, and student reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Consultancy & Computer Lab Integration (#consultancy-lab) */}
      <section id="consultancy-lab" className="relative z-10 py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-12 shadow-sm text-slate-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5 shrink-0" /> For Education Consultancies &amp; Institutes
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Turn Your Computer Lab into an Official IELTS Testing Center
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our consultancy telemetry platform enables study abroad agencies and IELTS preparation centres to host authenticated mock examinations on any physical PC. Each terminal pairs with your centre PIN, tracks candidate names and IDs, and produces institutional score reports.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Station pairing (PC-01 to PC-30)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live invigilator monitor screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Candidate name &amp; ID check-in modal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant PDF diagnostic score reports</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3">
                  {onOpenConsultancy && (
                    <button
                      onClick={onOpenConsultancy}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Open Consultancy Director Portal</span>
                    </button>
                  )}

                  {onOpenTerminal && (
                    <button
                      onClick={onOpenTerminal}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Laptop className="w-4 h-4 text-indigo-600" />
                      <span>Launch Student Kiosk Station</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lab Telemetry Graphic */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-3 text-xs w-full">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Apex Global Education Lab
                  </span>
                  <span className="text-[10px] text-indigo-700 font-mono font-bold">PIN: APX-2026</span>
                </div>

                <div className="space-y-2">
                  {[
                    { pc: 'PC-01', user: 'Bibek Thapa', test: 'Cam 19 Test 1 Reading', band: 'Band 7.5', status: 'Completed' },
                    { pc: 'PC-02', user: 'Anjali Sharma', test: 'Cam 19 Test 2 Listening', band: 'Band 8.0', status: 'Completed' },
                    { pc: 'PC-03', user: 'Candidate #04', test: 'Cam 20 Test 1 Reading', band: '34m remaining', status: 'In Exam' }
                  ].map((row, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-indigo-700 font-bold text-[11px]">{row.pc}</span>
                          <span className="text-slate-900 font-medium text-xs">{row.user}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{row.test}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                          {row.band}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-500 text-center pt-1 border-t border-slate-200">
                  Scores synchronized live to consultancy portal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Previous Candidate Results (if any exist) */}
      {pastResults.length > 0 && (
        <section className="relative z-10 py-10 sm:py-12 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Your Recent Mock Test Attempts &amp; Band Scores
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {pastResults.length} test result(s) stored on this device
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 bg-white overflow-hidden text-xs shadow-xs">
              {pastResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      {result.bandScore.toFixed(1)}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Cambridge {result.book} Test {result.testNumber} ({result.module.toUpperCase()})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Raw Score: {result.correctCount} / {result.totalQuestions} • Completed on{' '}
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onViewResults(result)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold rounded-xl transition cursor-pointer self-start sm:self-auto"
                  >
                    View Scorecard &amp; Analysis
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Meet the Creators (#creators) */}
      <section id="creators" className="relative z-10 py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> Engineering Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
              Meet the <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Built by the developers behind Master IELTS AI to bring authentic Cambridge examination practice to students and consultancies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Subash Bhandari */}
            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Subash Bhandari</h3>
                  <p className="text-xs font-semibold text-indigo-600">Full Stack Engineer &amp; AI Specialist</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Lead engineer behind Master IELTS AI and the CD-IELTS examination engine. Focused on educational technology, exam simulations, and high-precision evaluation systems.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <a href="mailto:subashbhandari2008@gmail.com" className="hover:text-slate-900 transition truncate">
                  subashbhandari2008@gmail.com
                </a>
              </div>
            </div>

            {/* Rohan Aacharya */}
            <div className="rounded-2xl p-5 sm:p-6 border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center text-white shrink-0">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Rohan Aacharya</h3>
                  <p className="text-xs font-semibold text-cyan-700">Software Architect &amp; Product Designer</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Co-creator designing seamless candidate experiences, responsive exam interfaces, and institutional telemetry workflows for education consultancies.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Globe className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition">
                  masterieltsai.com Core Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section (#faq) */}
      <section id="faq" className="relative z-10 py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">Everything you need to know about taking mock tests on this platform.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900 pr-4">{f.q}</span>
                    <div className={`w-6 h-6 rounded bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Clean Footer (White Background, Black Text) */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-10 sm:py-12 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <a href="/" className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1 shrink-0">
                  <img
                    src="/images/masterieltsai-icon.png"
                    alt="Master IELTS AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-900 uppercase tracking-tight">
                    MOCK TEST
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium leading-none">
                    from Master IELTS AI
                  </span>
                </div>
              </a>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-4">
                Official Computer-Delivered IELTS (CD-IELTS) practice portal. Full-length Cambridge Academic 18–21 tests with real-time scoring and institutional consultancy telemetry.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://masterieltsai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>masterieltsai.com</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Mock Test Papers</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedBook(19); scrollToTests(); }} className="hover:text-slate-900 cursor-pointer">Cambridge 19 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(20); scrollToTests(); }} className="hover:text-slate-900 cursor-pointer">Cambridge 20 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(18); scrollToTests(); }} className="hover:text-slate-900 cursor-pointer">Cambridge 18 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(21); scrollToTests(); }} className="hover:text-slate-900 cursor-pointer">Cambridge 21 Academic</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Consultancy Lab</h4>
              <ul className="space-y-2 text-xs">
                {onOpenConsultancy && (
                  <li><button onClick={onOpenConsultancy} className="hover:text-indigo-600 cursor-pointer font-medium">Director Lab Portal</button></li>
                )}
                {onOpenTerminal && (
                  <li><button onClick={onOpenTerminal} className="hover:text-slate-900 cursor-pointer">Pair Station PC</button></li>
                )}
                {onOpenSuperAdmin && adminUser?.role === 'super_admin' && (
                  <li><button onClick={onOpenSuperAdmin} className="hover:text-slate-900 cursor-pointer">Super Admin</button></li>
                )}
                <li>
                  <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                    Full AI Prep Platform ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-5 sm:pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500 text-center sm:text-left">
            <p>© {new Date().getFullYear()} MOCK TEST from Master IELTS AI (<a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:underline text-slate-700">masterieltsai.com</a>). Built by Subash Bhandari &amp; Rohan Aacharya.</p>
            <p>IELTS is a registered trademark of Cambridge University Press &amp; Assessment, IDP, and the British Council.</p>
          </div>
        </div>
      </footer>
        </>
      )}

      {/* Candidate Name Check-In Modal when clicking ANY test */}
      {isCheckInModalOpen && selectedTestForModal && (
        <CandidateCheckInModal
          isOpen={isCheckInModalOpen}
          test={selectedTestForModal}
          initialCandidateName={candidateSession?.candidateName}
          initialConsultancyId={candidateSession?.consultancyId}
          onClose={() => setIsCheckInModalOpen(false)}
          onConfirm={handleConfirmCandidate}
        />
      )}
    </div>
  );
};
