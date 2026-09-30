import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Headphones,
  Award,
  CheckCircle,
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
  FileCheck
} from 'lucide-react';
import type { IELTSMockTest, IELTSModule, TestResult } from '../../types/ielts';
import type { CandidateSession, AdminUser } from '../../types/consultancy';
import { allMockTests } from '../../data/mockTests';
import { CandidateCheckInModal } from '../exam/CandidateCheckInModal';

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
    }
  ) => void;
  pastResults: TestResult[];
  onViewResults: (result: TestResult) => void;
  onOpenSuperAdmin?: () => void;
  onOpenConsultancy?: () => void;
  onOpenTerminal?: () => void;
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
  candidateSession,
  adminUser,
  onLogout
}) => {
  const [selectedBook, setSelectedBook] = useState<number>(19);
  const [moduleFilter, setModuleFilter] = useState<'all' | IELTSModule>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSoundTesting, setIsSoundTesting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Candidate Name Check-In Modal state when clicking ANY test
  const [selectedTestForModal, setSelectedTestForModal] = useState<IELTSMockTest | null>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);

  const handleTestClick = (test: IELTSMockTest) => {
    setSelectedTestForModal(test);
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
      onStartTest(selectedTestForModal, candidate);
    }
  };

  const books = [18, 19, 20, 21];

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      if (test.book !== selectedBook) return false;
      if (moduleFilter !== 'all' && test.module !== moduleFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = test.title.toLowerCase().includes(query);
        const matchesModule = test.module.toLowerCase().includes(query);
        if (!matchesTitle && !matchesModule) return false;
      }
      return true;
    });
  }, [tests, selectedBook, moduleFilter, searchQuery]);

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
    const el = document.getElementById('test-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="min-h-screen bg-[#070709] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[25%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[150px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      {/* 1. Clean Top Status Bar */}
      <div className="bg-[#0b0c10] border-b border-white/10 text-[11px] font-medium py-2 px-4 text-center z-40 relative flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">
            Computer-Delivered IELTS (CD-IELTS) Simulator • <strong className="text-white">Cambridge Academic 18–21</strong>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <a
            href="https://masterieltsai.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition flex items-center gap-1"
          >
            <span>Visit masterieltsai.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <span className="text-slate-400">Study Abroad Consultancy Lab Network</span>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="bg-[#070709]/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand: MOCK TEST from Master IELTS AI */}
          <a href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shadow-md border border-white/15 bg-white/5 p-1 group-hover:border-purple-400/40 transition">
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
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  MOCK TEST
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  Cambridge 18–21
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
                from{' '}
                <a
                  href="https://masterieltsai.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-indigo-400 hover:text-cyan-300 font-semibold underline decoration-indigo-500/40 hover:decoration-cyan-400 transition"
                >
                  Master IELTS AI
                </a>
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-300">
            <a href="#test-catalog" className="text-white hover:text-cyan-400 transition flex items-center gap-1.5">
              <span>Mock Tests</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-600 text-white font-black">32 PAPERS</span>
            </a>
            <a href="#cd-features" className="hover:text-white transition">CD-IELTS Format</a>
            <a href="#consultancy-lab" className="hover:text-white transition">Consultancy Network</a>
            <a href="#creators" className="hover:text-white transition">Creators</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Check Button */}
            <button
              onClick={testAudio}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isSoundTesting
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15'
              }`}
              title="Test audio tone before the Listening exam"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{isSoundTesting ? 'Playing 440Hz...' : 'Sound Test'}</span>
            </button>

            {/* Candidate Session Pill */}
            {candidateSession && (
              <div className="hidden md:flex items-center gap-2 bg-violet-950/40 border border-violet-500/30 px-3 py-2 rounded-xl text-xs">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-white truncate max-w-[120px]">{candidateSession.candidateName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-violet-300 truncate max-w-[100px]">{candidateSession.consultancyName}</span>
              </div>
            )}

            {/* Admin Session Pill */}
            {adminUser && (
              <div className="hidden md:flex items-center gap-2 bg-blue-950/40 border border-blue-500/30 px-3 py-2 rounded-xl text-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-blue-200 truncate max-w-[120px]">{adminUser.name || adminUser.email}</span>
              </div>
            )}

            {/* Consultancy Portal Login */}
            {onOpenConsultancy && (
              <button
                onClick={onOpenConsultancy}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 transition cursor-pointer"
                title="Consultancy Director & Lab Portal"
              >
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Consultancy Portal</span>
                <span className="sm:hidden">Portal</span>
              </button>
            )}

            {/* Super Admin */}
            {adminUser?.role === 'super_admin' && onOpenSuperAdmin && (
              <button
                onClick={onOpenSuperAdmin}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition cursor-pointer"
                title="Super Admin Dashboard"
              >
                <Cpu className="w-4 h-4 text-purple-400" />
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={scrollToTests}
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Select Test</span>
            </button>

            {/* Sign Out Button */}
            {(candidateSession || adminUser) && onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Active Candidate Session Banner */}
      {candidateSession && (
        <div className="bg-violet-950/40 border-b border-violet-500/30 px-4 py-2.5 text-xs z-30 relative">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Connected Station: <strong className="text-white">{candidateSession.stationName}</strong></span>
              <span className="text-slate-600">•</span>
              <span>Test Centre: <strong className="text-white">{candidateSession.consultancyName}</strong></span>
              <span className="text-slate-600">•</span>
              <span>Candidate: <strong className="text-white">{candidateSession.candidateName}</strong></span>
              <span className="text-slate-600">•</span>
              <span>ID: <strong className="font-mono text-cyan-300">{candidateSession.candidateId}</strong></span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-[11px] font-bold text-red-400 hover:text-red-300 underline cursor-pointer"
              >
                Disconnect Station
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Hero Section (Clean, Authoritative, Authentic) */}
      <section className="relative z-10 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Official Cambridge Academic 18–21 Papers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Official IELTS Academic{' '}
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Mock Tests
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Take full-length Reading and Listening practice tests under authentic Computer-Delivered IELTS (CD-IELTS) exam conditions. Experience official timed sections, side-by-side reading passages, listening audio players, and instant band score calculation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2 justify-center lg:justify-start">
                <button
                  onClick={scrollToTests}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-violet-600/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Browse All 32 Tests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenConsultancy && (
                  <button
                    onClick={onOpenConsultancy}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Consultancy Lab Portal</span>
                  </button>
                )}

                <button
                  onClick={testAudio}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-violet-400" />
                  <span>Check Audio</span>
                </button>
              </div>

              {/* True Features / Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">32 Papers</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Cambridge 18, 19, 20 &amp; 21</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">CD-IELTS</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Official Exam Layout</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">Band 9.0</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Official Raw Conversion</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">Live Sync</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Consultancy Telemetry</p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Exam Screen Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[460px] rounded-2xl border border-white/15 bg-[#0f1117] p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white">IELTS Academic Reading</span>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold">59:14 remaining</span>
                </div>

                {/* Simulated Screen Body */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                    <span>Cambridge 19 • Test 1</span>
                    <span className="text-violet-300 font-mono">Passage 1: How Tennis Rackets Have Changed</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                      <span className="text-slate-400 block font-semibold">Reading Passage</span>
                      <p className="text-slate-300 text-[10px] line-clamp-3">
                        In 1874, Major Walter Wingfield patented a game he called Sphairistike, which soon became lawn tennis...
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                      <span className="text-slate-400 block font-semibold">Questions 1–7</span>
                      <p className="text-cyan-300 text-[10px] font-mono">
                        TRUE / FALSE / NOT GIVEN
                      </p>
                      <div className="flex gap-1 pt-1">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">Q1 Answered</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold">Q2 Flagged</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Palette preview */}
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
                      Question Palette (40 Questions)
                    </span>
                    <div className="grid grid-cols-10 gap-1 text-center font-mono text-[9px]">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className={`py-0.5 rounded ${
                            i < 12
                              ? 'bg-blue-600 text-white font-bold'
                              : i === 12
                              ? 'bg-amber-500 text-black font-bold'
                              : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 text-[11px]">Standard CD-IELTS Environment</span>
                  <button
                    onClick={scrollToTests}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition cursor-pointer"
                  >
                    Start Practice Paper →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cambridge Academic Mock Test Catalog (#test-catalog) - PLACED DIRECTLY UNDER HERO */}
      <section id="test-catalog" className="relative z-10 py-16 bg-white/[0.015] border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-2">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cambridge Academic Papers Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Select Your <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Examination Paper</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Choose any paper from Cambridge 18, 19, 20, or 21. Enter candidate details to begin the exam session and record your score.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tests (e.g. Test 1, Reading)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition"
              />
            </div>
          </div>

          {/* Book & Module Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Book Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Book:</span>
              {books.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBook(b)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedBook === b
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-600/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  Cambridge {b}
                </button>
              ))}
            </div>

            {/* Module Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModuleFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  moduleFilter === 'all'
                    ? 'bg-white text-black'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                All Papers
              </button>
              <button
                onClick={() => setModuleFilter('reading')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  moduleFilter === 'reading'
                    ? 'bg-amber-500 text-black shadow-xs'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reading (60m)</span>
              </button>
              <button
                onClick={() => setModuleFilter('listening')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  moduleFilter === 'listening'
                    ? 'bg-emerald-500 text-black shadow-xs'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listening (30m)</span>
              </button>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTests.map((test) => {
              const isReading = test.module === 'reading';
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
                  className="rounded-2xl p-5 border border-white/10 bg-[#0e1017] hover:border-violet-500/50 hover:bg-[#12141e] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 relative shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/10 text-white font-mono">
                        BOOK {test.book}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          isReading
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isReading ? <BookOpen className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                        <span>{test.module}</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {test.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{test.durationMinutes} Mins</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{totalQ} Questions</span>
                      </span>
                    </div>

                    {pastAttempt && (
                      <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                        <span className="text-emerald-300 font-medium text-[11px]">Last Score</span>
                        <span className="font-mono font-black text-emerald-400 text-xs">
                          Band {pastAttempt.bandScore.toFixed(1)} ({pastAttempt.correctCount}/{pastAttempt.totalQuestions})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">Cambridge Rubric</span>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer"
                    >
                      <span>Take Test</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Authentic CD-IELTS Exam Features (#cd-features) */}
      <section id="cd-features" className="relative z-10 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-3">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" /> True-to-Life Testing Environment
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
              Standard Computer-Delivered <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">CD-IELTS Features</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Our mock test engine is designed to mirror the exact test day experience at official British Council and IDP test centres.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Side-by-Side Reading View</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Academic reading passages appear on the left with questions on the right. Highlight text, take notes, and adjust column split widths just like in the real CD-IELTS examination.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Authentic Listening Player</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Section-by-section continuous audio playback with authentic British, Australian, and North American accents, interactive map labeling, and multiple-choice questions.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Interactive 40-Question Palette</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review answered questions, unanswered questions, and flagged questions at a single glance. Jump to any question instantly across all 3 passages or 4 audio sections.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Official Cambridge Band 9.0 Scale</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated raw score to IELTS Band conversion calibrated against official Cambridge Assessment criteria for both Reading (Academic) and Listening modules.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Strict Countdown Timer &amp; 10m Warning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real exam clock with hide/show options during testing and an automatic flashing warning during the final 10 minutes to help candidates master pacing.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Consultancy Lab Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Candidate scores and session logs synchronize in real time to the education consultancy portal for director review, mock test rankings, and student reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Consultancy & Computer Lab Integration (#consultancy-lab) */}
      <section id="consultancy-lab" className="relative z-10 py-20 bg-white/[0.015] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0e17] via-[#090a10] to-[#070709] p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5" /> For Education Consultancies &amp; Institutes
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Turn Your Computer Lab into an Official IELTS Testing Center
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our consultancy telemetry platform enables study abroad agencies and IELTS preparation centres to host authenticated mock examinations on any physical PC. Each terminal pairs with your centre PIN, tracks candidate names and IDs, and produces institutional score reports.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Station pairing (PC-01 to PC-30)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Live invigilator monitor screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Candidate name &amp; ID check-in modal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant PDF diagnostic score reports</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  {onOpenConsultancy && (
                    <button
                      onClick={onOpenConsultancy}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Open Consultancy Director Portal</span>
                    </button>
                  )}

                  {onOpenTerminal && (
                    <button
                      onClick={onOpenTerminal}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition cursor-pointer flex items-center gap-2"
                    >
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <span>Launch Student Kiosk Station</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lab Telemetry Graphic */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/50 p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Apex Global Education Lab
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">PIN: APX-2026</span>
                </div>

                <div className="space-y-2">
                  {[
                    { pc: 'PC-01', user: 'Bibek Thapa', test: 'Cam 19 Test 1 Reading', band: 'Band 7.5', status: 'Completed' },
                    { pc: 'PC-02', user: 'Anjali Sharma', test: 'Cam 19 Test 2 Listening', band: 'Band 8.0', status: 'Completed' },
                    { pc: 'PC-03', user: 'Candidate #04', test: 'Cam 20 Test 1 Reading', band: '34m remaining', status: 'In Exam' }
                  ].map((row, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-violet-300 font-bold text-[11px]">{row.pc}</span>
                          <span className="text-white font-medium text-xs">{row.user}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{row.test}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${row.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                          {row.band}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-white/10">
                  Scores synchronized live to consultancy portal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Previous Candidate Results (if any exist) */}
      {pastResults.length > 0 && (
        <section className="relative z-10 py-12 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">
                  Your Recent Mock Test Attempts &amp; Band Scores
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {pastResults.length} test result(s) stored on this device
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 divide-y divide-white/10 bg-[#0c0e14] overflow-hidden text-xs">
              {pastResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center">
                      {result.bandScore.toFixed(1)}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Cambridge {result.book} Test {result.testNumber} ({result.module.toUpperCase()})
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Raw Score: {result.correctCount} / {result.totalQuestions} • Completed on{' '}
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onViewResults(result)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold rounded-xl transition cursor-pointer self-start sm:self-auto"
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
      <section id="creators" className="relative z-10 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Engineering Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Meet the <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Creators</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Built by the developers behind Master IELTS AI to bring authentic Cambridge examination practice to students and consultancies worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Subash Bhandari */}
            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] hover:border-violet-500/40 transition">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Subash Bhandari</h3>
                  <p className="text-xs font-semibold text-cyan-400">Full Stack Engineer &amp; AI Specialist</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Lead engineer behind Master IELTS AI and the CD-IELTS examination engine. Focused on educational technology, exam simulations, and high-precision evaluation systems.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:subashbhandari2008@gmail.com" className="hover:text-white transition">
                  subashbhandari2008@gmail.com
                </a>
              </div>
            </div>

            {/* Rohan Aacharya */}
            <div className="rounded-2xl p-6 border border-white/10 bg-[#0d0f15] hover:border-cyan-500/40 transition">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Rohan Aacharya</h3>
                  <p className="text-xs font-semibold text-cyan-400">Software Architect &amp; Product Designer</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Co-creator designing seamless candidate experiences, responsive exam interfaces, and institutional telemetry workflows for education consultancies.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  masterieltsai.com Core Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section (#faq) */}
      <section id="faq" className="relative z-10 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Frequently Asked <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">Everything you need to know about taking mock tests on this platform.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-xl border border-white/10 bg-[#0c0e14] overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white pr-4">{f.q}</span>
                    <div className={`w-6 h-6 rounded bg-white/5 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Clean Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#040406] py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-white/15 bg-white/5 p-1">
                  <img
                    src="/images/masterieltsai-icon.png"
                    alt="Master IELTS AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-white uppercase tracking-tight">
                    MOCK TEST
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium leading-none">
                    from Master IELTS AI
                  </span>
                </div>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
                Official Computer-Delivered IELTS (CD-IELTS) practice portal. Full-length Cambridge Academic 18–21 tests with real-time scoring and institutional consultancy telemetry.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://masterieltsai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>masterieltsai.com</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Mock Test Papers</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedBook(19); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 19 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(20); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 20 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(18); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 18 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(21); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 21 Academic</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Consultancy Lab</h4>
              <ul className="space-y-2 text-xs">
                {onOpenConsultancy && (
                  <li><button onClick={onOpenConsultancy} className="hover:text-white cursor-pointer text-cyan-400">Director Lab Portal</button></li>
                )}
                {onOpenTerminal && (
                  <li><button onClick={onOpenTerminal} className="hover:text-white cursor-pointer">Pair Station PC</button></li>
                )}
                {onOpenSuperAdmin && adminUser?.role === 'super_admin' && (
                  <li><button onClick={onOpenSuperAdmin} className="hover:text-white cursor-pointer">Super Admin</button></li>
                )}
                <li>
                  <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:text-white">
                    Full AI Prep Platform ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} MOCK TEST from Master IELTS AI (<a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:underline text-slate-400">masterieltsai.com</a>). Built by Subash Bhandari &amp; Rohan Aacharya.</p>
            <p>IELTS is a registered trademark of Cambridge University Press &amp; Assessment, IDP, and the British Council.</p>
          </div>
        </div>
      </footer>

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
