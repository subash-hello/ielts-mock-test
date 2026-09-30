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
  BarChart3,
  Check,
  LogOut,
  User,
  Sparkles,
  Brain,
  Target,
  Zap,
  FileText,
  MessageSquare,
  Mic,
  PenTool,
  ChevronDown,
  Quote,
  Code,
  Terminal,
  Globe,
  Mail
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
  const [activeModuleTab, setActiveModuleTab] = useState<'speaking' | 'writing' | 'reading' | 'listening'>('reading');
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

  // Audio Test Tone generator
  const testAudio = () => {
    if (typeof window === 'undefined') return;
    try {
      setIsSoundTesting(true);
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // 440Hz A4 tone
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
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
      q: 'How accurate is the AI scoring compared to real IELTS examiners?',
      a: 'MasterIELTS AI utilizes Google Gemini AI trained precisely on official Cambridge Assessment & IELTS band descriptor rubrics. In rigorous benchmark comparisons with senior examiners, our score prediction has over 97% concordance on task achievement, cohesion, lexical resource, and grammatical accuracy.'
    },
    {
      q: 'Are the Reading and Listening mock tests identical to official Cambridge exams?',
      a: 'Yes. All mock tests in Cambridge 18, 19, 20, and 21 are authentic full-length papers containing all 40 questions per test. The listening papers include high-fidelity authentic audio tracks and interactive map labeling, while reading includes full academic passages with split-screen layout and live highlighters.'
    },
    {
      q: 'How does the Consultancy & Student Lab Portal work?',
      a: 'When students start any test, they enter their name and candidate ID. Their live responses, timers, and finished band score reports instantly synchronize to the consultancy director dashboard, allowing overseas education consultancies to monitor entire computer labs in real-time.'
    },
    {
      q: 'Can students take mock tests on individual computers or mobile devices?',
      a: 'Yes. MasterIELTS AI is responsive across desktop, tablet, and mobile. For the authentic exam day experience, we recommend using a desktop or laptop to replicate the British Council and IDP Computer-Delivered IELTS environment.'
    },
    {
      q: 'What is included in the free plan vs. the Pro plans?',
      a: 'All Cambridge Academic mock test simulations and instant automated band score conversions are fully accessible. Pro plans unlock 1-on-1 simulated AI examiner sessions, advanced voice analysis, in-depth PDF diagnostic reports, and customized study schedules.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-violet-600/12 blur-[140px]" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-600/12 blur-[160px]" />
      </div>

      {/* 1. MasterIELTS AI Live Notice Ribbon */}
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10 text-[11px] font-medium py-2 px-4 text-center z-40 relative flex items-center justify-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300">
          Official <strong className="text-white">MasterIELTS AI</strong> Examination Platform • Powered by Google Gemini AI & Cambridge Academic 18–21 Standards
        </span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="text-cyan-400 font-semibold hidden md:inline">
          Live Telemetry Enabled for Study Abroad Consultancies
        </span>
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="bg-[#030303]/85 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Identity */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border border-white/15 bg-white/5 group-hover:border-purple-400/40 transition-all duration-300 p-1">
              <img
                src="/images/masterieltsai-logo.png"
                alt="MasterIELTS AI Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if image path has issue
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">MasterIELTS</span>
                  <span className="ml-1 text-white font-extrabold">AI</span>
                </span>
                <span className="hidden md:inline-flex text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  Cambridge 18–21
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                masterieltsai.com • AI Mock Test Engine
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#modules" className="hover:text-white transition">Modules</a>
            <a href="#test-catalog" className="text-white hover:text-cyan-400 transition flex items-center gap-1.5">
              <span>Mock Tests</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-600 text-white font-black">32 TESTS</span>
            </a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#creators" className="hover:text-white transition">Meet Creators</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Audio Test Button */}
            <button
              onClick={testAudio}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isSoundTesting
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15'
              }`}
              title="Test audio output before the Listening exam"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{isSoundTesting ? 'Tone 440Hz...' : 'Audio Test'}</span>
            </button>

            {/* Candidate Session Badge */}
            {candidateSession ? (
              <div className="hidden sm:flex items-center gap-2 bg-violet-950/40 border border-violet-500/30 px-3 py-2 rounded-xl text-xs">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-white truncate max-w-[130px]">{candidateSession.candidateName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-violet-300 truncate max-w-[120px]">{candidateSession.consultancyName}</span>
              </div>
            ) : null}

            {/* Admin Session Badge */}
            {adminUser && (
              <div className="hidden sm:flex items-center gap-2 bg-blue-950/40 border border-blue-500/30 px-3 py-2 rounded-xl text-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-blue-200 truncate max-w-[140px]">{adminUser.name || adminUser.email}</span>
              </div>
            )}

            {/* Consultancy Portal link (if Admin) */}
            {adminUser && onOpenConsultancy && (
              <button
                onClick={onOpenConsultancy}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Lab Portal</span>
              </button>
            )}

            {/* Consultancy Staff / Admin Sign In Button if not logged in */}
            {!adminUser && !candidateSession && onOpenConsultancy && (
              <button
                onClick={onOpenConsultancy}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 transition cursor-pointer"
                title="Consultancy Director & Invigilator Portal Login"
              >
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Consultancy Login</span>
                <span className="sm:hidden">Login</span>
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

            {/* Primary CTA */}
            <button
              onClick={scrollToTests}
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-violet-600 to-accent-bright hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started</span>
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
              <span>Candidate ID: <strong className="font-mono text-cyan-300">{candidateSession.candidateId}</strong></span>
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

      {/* 3. Hero Section (masterieltsai.com Style) */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Gen Cambridge Academic IELTS Simulator</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-white">
                Master IELTS with{' '}
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Practice Speaking, Writing, Reading &amp; Listening with real-time AI feedback. Take authentic full-length Cambridge 18–21 mock tests in the official CD-IELTS computer interface and elevate your band score to 8.0+.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                <button
                  onClick={scrollToTests}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-extrabold text-base shadow-xl shadow-violet-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {onOpenConsultancy && (
                  <button
                    onClick={onOpenConsultancy}
                    className="px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-bold text-base shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <span>Consultancy Lab Portal</span>
                  </button>
                )}

                {onOpenTerminal && (
                  <button
                    onClick={onOpenTerminal}
                    className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Laptop className="w-5 h-5 text-violet-400" />
                    <span>Pair Student PC</span>
                  </button>
                )}
              </div>

              {/* Key Trust Stats (masterieltsai.com) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">500K+</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Active Students</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">2.5</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Avg Band Improvement</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">10M+</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Questions Answered</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">98%</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Right Visual / Simulator Preview Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 opacity-25 blur-2xl group-hover:opacity-40 transition duration-500" />
                <div className="relative rounded-3xl border border-white/15 bg-[#0b0c10]/90 backdrop-blur-xl overflow-hidden shadow-2xl p-6 space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-violet-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">MasterIELTS AI Exam Engine</h4>
                        <p className="text-[10px] text-slate-400">Authentic CD-IELTS Simulation</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      LIVE AI
                    </span>
                  </div>

                  {/* Simulator Graphic / Feature illustration */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[11px] text-slate-300 ml-1">Cambridge 19 Part 2</span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 font-bold">58:42 Left</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-200">Listening Map Labelling</span>
                        </div>
                        <span className="text-[11px] font-mono text-violet-300 font-bold">Farley House</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-200">Multi-Select Scoring</span>
                        </div>
                        <span className="text-[11px] font-mono text-cyan-300 font-bold">Q21–22 Validated</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-amber-400" />
                          <span className="text-slate-200">Consultancy Telemetry</span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">Synced Live</span>
                      </div>
                    </div>
                  </div>

                  {/* Predicted Band Score bar */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Estimated Diagnostic</span>
                      <span className="text-xl font-black text-white font-mono">Band 8.0 <span className="text-xs text-emerald-400 font-sans font-bold">(Expert)</span></span>
                    </div>
                    <button
                      onClick={scrollToTests}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition cursor-pointer"
                    >
                      Try Paper Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI-Powered Features (Why Choose MasterIELTS AI) */}
      <section id="features" className="relative z-10 py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Why Choose MasterIELTS AI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              AI-Powered <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
              Everything you need to achieve your dream IELTS band score, powered by cutting-edge artificial intelligence and official Cambridge materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">AI-Powered Scoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Get instant, accurate band score predictions using Google Gemini AI that evaluates your responses against official IELTS examiner criteria.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-600/30 mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">Personalized Study Plans</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                AI analyzes your strengths and weaknesses across Reading, Listening, Writing, and Speaking to create a customized preparation schedule.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-pink-500/40 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-600/30 mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">Real-Time Feedback</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Receive instant corrections on grammar, lexical resource, and pronunciation as you practice full papers and simulated speaking tests.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">Authentic Exam Simulation</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Take full-length Cambridge 18–21 papers in the identical British Council &amp; IDP Computer-Delivered IELTS split-screen workspace.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/30 mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">Consultancy Lab Telemetry</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Every test session streams live to the consultancy portal, providing directors with station heartbeats, student records, and class rankings.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30 mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">24/7 AI IELTS Tutor</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Chat with an intelligent AI IELTS tutor anytime to clarify passage logic, analyze answer keys, and receive model band 9 essays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Practice All IELTS Modules (Interactive Showcase matching masterieltsai.com) */}
      <section id="modules" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Practice All <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">IELTS Modules</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Comprehensive preparation for every section of the IELTS exam with official standards.
            </p>
          </div>

          {/* Module Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveModuleTab('speaking')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeModuleTab === 'speaking'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <Mic className="w-4 h-4 text-pink-400" />
              <span>Speaking</span>
            </button>
            <button
              onClick={() => setActiveModuleTab('writing')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeModuleTab === 'writing'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <PenTool className="w-4 h-4 text-cyan-400" />
              <span>Writing</span>
            </button>
            <button
              onClick={() => setActiveModuleTab('reading')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeModuleTab === 'reading'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Reading (Cambridge 18–21)</span>
            </button>
            <button
              onClick={() => setActiveModuleTab('listening')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeModuleTab === 'listening'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Listening (Audio &amp; Maps)</span>
            </button>
          </div>

          {/* Module Tab Content Showcase */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center glass-card rounded-3xl p-8 lg:p-12 border border-white/15">
            <div>
              {activeModuleTab === 'reading' && (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-4">
                    <BookOpen className="w-4 h-4" /> Academic Reading Module
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    Authentic Cambridge Reading Simulation
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                    Complete 3 full passages under standard 60-minute countdown. Use interactive text highlighting, review flags, and instant validation across all 40 questions.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['Passage-splitter dual pane layout', 'True / False / Not Given & Yes / No / Not Given', 'Interactive Headings & Summary Completion', 'Multi-choice multi-select with automatic Box assignment'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs text-slate-200 font-semibold">
                        <div className="w-5 h-5 rounded-full bg-violet-600/40 flex items-center justify-center shrink-0 text-white">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToTests}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs shadow-lg hover:shadow-amber-600/30 transition cursor-pointer"
                  >
                    Browse Reading Papers
                  </button>
                </>
              )}

              {activeModuleTab === 'listening' && (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
                    <Headphones className="w-4 h-4" /> Academic Listening Module
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    High-Fidelity Audio &amp; Interactive Map Plans
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                    Experience all 4 parts of Cambridge 18–21 listening with authentic native audio, interactive map diagram pin labeling, and single/multi-choice questions.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['Official 4-part audio recordings with scrubber & volume', 'Interactive Map & Plan Labelling with pin zoom', 'Form, table, and flowchart completion', 'Order-independent multi-choice answer validation'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs text-slate-200 font-semibold">
                        <div className="w-5 h-5 rounded-full bg-emerald-600/40 flex items-center justify-center shrink-0 text-white">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToTests}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg hover:shadow-emerald-600/30 transition cursor-pointer"
                  >
                    Browse Listening Papers
                  </button>
                </>
              )}

              {activeModuleTab === 'speaking' && (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold mb-4">
                    <Mic className="w-4 h-4" /> IELTS Speaking Examiner
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    AI Examiner Voice Simulation
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                    Practice with an AI examiner simulating real IELTS Speaking Part 1, 2 &amp; 3 tests. Get instant feedback on fluency, pronunciation, grammar, and vocabulary.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['Real-time voice recognition & pronunciation scoring', 'Part 2 Cue card prep timer and speech recording', 'Instant Band 9 sample responses & vocabulary enhancers', 'Examiner feedback on filler words & hesitations'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs text-slate-200 font-semibold">
                        <div className="w-5 h-5 rounded-full bg-pink-600/40 flex items-center justify-center shrink-0 text-white">
                          <Check className="w-3 h-3 text-pink-400" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://masterieltsai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs shadow-lg hover:shadow-pink-600/30 transition cursor-pointer"
                  >
                    <span>Try AI Speaking on masterieltsai.com</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </>
              )}

              {activeModuleTab === 'writing' && (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-4">
                    <PenTool className="w-4 h-4" /> Academic Writing Module
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    Task 1 &amp; Task 2 AI Evaluation
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                    Submit essays or task 1 report descriptions for instant line-by-line examiner scoring across Task Response, Coherence &amp; Cohesion, Lexical Resource, and Grammatical Range.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['Instant Band 9 model rewrite suggestions', 'Live word count tracker and timing warning', 'Common error highlighting & sentence structure variety', 'Rubric breakdown aligned with IDP/British Council standards'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs text-slate-200 font-semibold">
                        <div className="w-5 h-5 rounded-full bg-cyan-600/40 flex items-center justify-center shrink-0 text-white">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://masterieltsai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-lg hover:shadow-cyan-600/30 transition cursor-pointer"
                  >
                    <span>Practice Writing on masterieltsai.com</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </>
              )}
            </div>

            {/* Right Live Preview Box */}
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  {activeModuleTab.toUpperCase()} BENCHMARK PREVIEW
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                  Cambridge 19
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Task Achievement / Accuracy</span>
                    <span className="font-mono text-cyan-400 font-bold">8.5 / 9.0</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Coherence &amp; Structure</span>
                    <span className="font-mono text-cyan-400 font-bold">8.0 / 9.0</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Lexical Resource</span>
                    <span className="font-mono text-cyan-400 font-bold">8.5 / 9.0</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Grammatical Range</span>
                    <span className="font-mono text-cyan-400 font-bold">8.0 / 9.0</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-[89%]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Predicted Band Score</span>
                <span className="text-2xl font-black font-mono bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  8.0+
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cambridge Academic Mock Test Catalog (#test-catalog) */}
      <section id="test-catalog" className="relative z-10 py-24 bg-white/[0.02] border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-3">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full-Length Cambridge Practice Tests</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Cambridge Academic <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Mock Exam Papers</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Choose any paper from Cambridge 18, 19, 20, or 21. Enter candidate details to synchronize results in real-time to your consultancy dashboard.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tests, topics..."
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
                <span>Listening (35m)</span>
              </button>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTests.map((test) => {
              const isReading = test.module === 'reading';
              const totalQ = test.sections.reduce(
                (acc, s) =>
                  acc + s.questionGroups.reduce((gAcc, g) => gAcc + (g.questions?.length || 0), 0),
                0
              );

              return (
                <div
                  key={test.id}
                  onClick={() => handleTestClick(test)}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-violet-500/50 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 relative shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/10 text-white font-mono">
                        CAMBRIDGE {test.book}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isReading
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isReading ? <BookOpen className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                        <span>{test.module}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
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
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">Band 9.0 Scale</span>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all"
                    >
                      <span>Start Test</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. How It Works (matching masterieltsai.com) */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              How It <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-slate-400 text-base max-w-lg mx-auto">
              Get your dream band score in four simple, guided steps powered by artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select Exam Paper',
                desc: 'Pick any authentic paper across Cambridge 18, 19, 20, or 21 in Reading or Listening.'
              },
              {
                step: '02',
                title: 'Check-In Student',
                desc: 'Enter candidate name, student ID, and target band. Your session pairs to your consultancy.'
              },
              {
                step: '03',
                title: 'CD-IELTS Simulation',
                desc: 'Take the full exam under official timed conditions with audio tracks, map labelling, and split views.'
              },
              {
                step: '04',
                title: 'Instant Band 9.0 Report',
                desc: 'Receive immediate diagnostic scores and explanations synchronized to the institutional portal.'
              }
            ].map((s) => (
              <div key={s.step} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-all">
                <span className="text-2xl font-black font-mono text-cyan-400 mb-2 block">
                  {s.step}
                </span>
                <h4 className="text-base font-extrabold text-white mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Simple, Premium Pricing (masterieltsai.com Plans) */}
      <section id="pricing" className="relative z-10 py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Simple, Premium <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              Choose the plan that fits your preparation timeline. Unlock full AI feedback and Cambridge mock tests.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Plan 1 */}
            <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md inline-block mb-4">
                  7 Days Access
                </span>
                <h3 className="text-xl font-bold text-white mb-1">Weekly Lite</h3>
                <p className="text-xs text-slate-400 mb-6">Perfect for quick revision &amp; final mock test runs</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white font-mono">Rs. 299</span>
                  <span className="text-xs text-slate-400">/ total access</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-6 mb-6">
                {['7 days full system access', 'Unlimited Cambridge mock tests', 'Instant Band 9.0 conversion', 'Audio tracks & map labeling', 'Consultancy portal syncing'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTests}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition cursor-pointer"
              >
                Start Practice
              </button>
            </div>

            {/* Plan 2 - Most Popular */}
            <div className="glass-card rounded-3xl p-7 border-2 border-violet-500/60 bg-gradient-to-b from-violet-950/30 to-black/60 shadow-2xl shadow-violet-600/20 flex flex-col justify-between relative scale-105">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                MOST POPULAR
              </div>
              <div>
                <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest bg-violet-500/20 px-3 py-1 rounded-md inline-block mb-4 mt-2">
                  30 Days Access
                </span>
                <h3 className="text-xl font-bold text-white mb-1">Monthly Pro</h3>
                <p className="text-xs text-slate-300 mb-6">Most popular choice for comprehensive preparation</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white font-mono">Rs. 999</span>
                  <span className="text-xs text-slate-400">/ total access</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-200 border-t border-white/15 pt-6 mb-6">
                {[
                  '30 days full system access',
                  'Unlimited Cambridge 18–21 tests',
                  'AI IELTS Tutor interactive chat',
                  'Vocabulary trainer & model essays',
                  'Consultancy live telemetry sync',
                  'Priority support & study plan generator'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTests}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-violet-600/40 transition cursor-pointer"
              >
                Get Pro Access
              </button>
            </div>

            {/* Plan 3 */}
            <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md inline-block mb-4">
                  45 Days Access
                </span>
                <h3 className="text-xl font-bold text-white mb-1">Ultimate Prep</h3>
                <p className="text-xs text-slate-400 mb-6">Best value package for detailed, steady learning</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white font-mono">Rs. 1,499</span>
                  <span className="text-xs text-slate-400">/ total access</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-6 mb-6">
                {[
                  '45 days full system access',
                  'Everything in Monthly Pro',
                  '1-on-1 simulated AI sessions',
                  'Official PDF diagnostic reports',
                  'Multi-station lab terminal keys',
                  'Early access to Cambridge 22'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTests}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition cursor-pointer"
              >
                Get Ultimate Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Student Success Stories (Testimonials matching masterieltsai.com) */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Student <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-slate-400 text-sm">Join thousands who achieved their dream IELTS scores.</p>
          </div>

          <div className="glass-card rounded-3xl p-8 lg:p-10 border border-white/15 relative">
            <Quote className="w-10 h-10 text-violet-500/40 mb-4" />
            <p className="text-lg lg:text-xl text-slate-200 leading-relaxed mb-8 italic font-serif">
              “MasterIELTS AI helped me improve from Band 6.0 to 8.0 in just 2 months. Practicing with full Cambridge 18 and 19 mock tests in the exact British Council computer interface made test day completely stress-free!”
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black">
                  PS
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Priya Sharma</p>
                  <p className="text-xs text-slate-400">Enrolled via Apex Global Consultancy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <p className="text-[10px] text-rose-300 font-bold uppercase">Before</p>
                  <p className="text-base font-black font-mono text-rose-400">Band 6.0</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <div className="text-center px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <p className="text-[10px] text-emerald-300 font-bold uppercase">After</p>
                  <p className="text-base font-black font-mono text-emerald-400">Band 8.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Meet the Creators (matching masterieltsai.com) */}
      <section id="creators" className="relative z-10 py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Meet the Creators
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Built by <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Engineers</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              We are a team of passionate developers aiming to make high-quality IELTS preparation accessible to everyone through the power of Artificial Intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Subash Bhandari */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 hover:border-violet-500/40 transition-all duration-300 relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Subash Bhandari</h3>
                  <p className="text-xs font-bold text-cyan-400 mt-0.5">Full Stack Engineer &amp; AI Specialist</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-sans mb-4">
                Passionate about building scalable educational web applications, integrating Gemini AI models, and empowering students worldwide to ace international exams.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:subashbhandari2008@gmail.com" className="hover:text-white transition">
                  subashbhandari2008@gmail.com
                </a>
              </div>
            </div>

            {/* Rohan Aacharya */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Terminal className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Rohan Aacharya</h3>
                  <p className="text-xs font-bold text-cyan-400 mt-0.5">Software Architect &amp; Product Designer</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-sans mb-4">
                Dedicated to creating intuitive user experiences, robust test engine architectures, and multi-tenant consultancy management systems.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>masterieltsai.com Core Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section id="faq" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-slate-400 text-sm">Everything you need to know about MasterIELTS AI.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white pr-4">{f.q}</span>
                    <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. Final CTA Banner (masterieltsai.com) */}
      <section className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-10 lg:p-14 text-center bg-gradient-to-r from-violet-900/60 via-indigo-900/40 to-cyan-900/60 border border-white/20 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Start your journey today</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Ready to Ace Your IELTS?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
              Join 500,000+ students who have improved their IELTS scores with AI-powered preparation. Start taking Cambridge mock tests for free.
            </p>
            <button
              onClick={scrollToTests}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 13. Past Candidate History (if any saved results exist) */}
      {pastResults.length > 0 && (
        <section className="relative z-10 py-12 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">
                  Your Recent Examination Attempts &amp; Band Scores
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                {pastResults.length} session(s) saved on this computer
              </span>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden text-xs">
              {pastResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {result.bandScore.toFixed(1)}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Cambridge {result.book} Test {result.testNumber} ({result.module.toUpperCase()})
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        {result.correctCount} / {result.totalQuestions} correct • Taken on{' '}
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onViewResults(result)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold rounded-xl transition cursor-pointer self-start sm:self-auto"
                  >
                    View Diagnostic Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 14. MasterIELTS AI Institutional Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020204] py-14 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center border border-white/15 bg-white/5 p-1">
                  <img
                    src="/images/masterieltsai-logo.png"
                    alt="MasterIELTS AI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-black text-white">
                  MasterIELTS <span className="text-cyan-400">AI</span>
                </span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
                AI-powered IELTS preparation platform. Master all 4 modules with real-time AI examiner feedback, personalized study plans, and official Cambridge Academic mock tests.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://masterieltsai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="Visit masterieltsai.com"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="mailto:subashbhandari2008@gmail.com"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
                  title="Contact Support"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Mock Tests</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedBook(19); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 19 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(20); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 20 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(18); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 18 Academic</button></li>
                <li><button onClick={() => { setSelectedBook(21); scrollToTests(); }} className="hover:text-white cursor-pointer">Cambridge 21 Academic</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Consultancy</h4>
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
                <li><a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:text-white">Institutional Licensing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Creators &amp; Contact</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-white font-semibold">Subash Bhandari</span> (AI Specialist)</li>
                <li><span className="text-white font-semibold">Rohan Aacharya</span> (Architect)</li>
                <li><a href="mailto:subashbhandari2008@gmail.com" className="text-cyan-400 hover:underline">subashbhandari2008@gmail.com</a></li>
                <li><a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="hover:text-white">masterieltsai.com</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} MasterIELTS AI (masterieltsai.com). All rights reserved.</p>
            <p>Certified for educational consultancies, language academies, and global candidates.</p>
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
