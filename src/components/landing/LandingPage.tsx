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
  ShieldCheck,
  Search,
  BarChart3,
  GraduationCap,
  Check,
  HelpCircle,
  LogOut
} from 'lucide-react';
import type { IELTSMockTest, IELTSModule, TestResult } from '../../types/ielts';
import type { CandidateSession, AdminUser } from '../../types/consultancy';
import { allMockTests } from '../../data/mockTests';

interface LandingPageProps {
  tests?: IELTSMockTest[];
  onStartTest: (test: IELTSMockTest) => void;
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
  const [selectedBook, setSelectedBook] = useState<number>(18);
  const [moduleFilter, setModuleFilter] = useState<'all' | IELTSModule>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSoundTesting, setIsSoundTesting] = useState(false);

  const books = [18, 19, 20, 21];

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      if (test.book !== selectedBook) return false;
      if (moduleFilter !== 'all' && test.module !== moduleFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = test.title.toLowerCase().includes(query);
        const matchesSection = test.sections.some(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            (s.subtitle && s.subtitle.toLowerCase().includes(query))
        );
        if (!matchesTitle && !matchesSection) return false;
      }
      return true;
    });
  }, [tests, selectedBook, moduleFilter, searchQuery]);

  const testAudio = () => {
    setIsSoundTesting(true);
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime); // 440 Hz standard tone
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      setIsSoundTesting(false);
    }, 800);
  };

  const scrollToTests = () => {
    const el = document.getElementById('test-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* 1. Official Top Notice Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-[11px] font-medium py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Official Cambridge IELTS Academic Computer-Delivered Examination Simulation</span>
        <span className="text-slate-500 hidden sm:inline">•</span>
        <span className="text-slate-400 hidden sm:inline">Certified for Study Abroad Consultancies & Language Institutes</span>
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg shadow-sm tracking-tight">
              IELTS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 tracking-tight leading-tight">
                  Academic CD-IELTS Portal
                </span>
                <span className="hidden md:inline-flex text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Cambridge 18–21
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                British Council & IDP Computer-Delivered Simulation
              </p>
            </div>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Check Button */}
            <button
              onClick={testAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isSoundTesting
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
              }`}
              title="Click to test your headphones before the Listening exam"
            >
              <Volume2 className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">{isSoundTesting ? 'Tone 440Hz...' : 'Audio Test'}</span>
            </button>

            {/* Candidate Session Profile */}
            {candidateSession && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
                <Laptop className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold text-slate-900">{candidateSession.stationName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 truncate max-w-[130px]">{candidateSession.consultancyName}</span>
              </div>
            )}

            {/* Admin Session Profile */}
            {adminUser && (
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold text-blue-900 truncate max-w-[140px]">{adminUser.name || adminUser.email}</span>
              </div>
            )}

            {/* Consultancy Portal link (if Admin) */}
            {adminUser && onOpenConsultancy && (
              <button
                onClick={onOpenConsultancy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
                title="Manage lab computers, student batches and AI reports"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Lab Portal</span>
              </button>
            )}

            {/* Super Admin */}
            {adminUser?.role === 'super_admin' && onOpenSuperAdmin && (
              <button
                onClick={onOpenSuperAdmin}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 bg-white transition cursor-pointer shadow-xs"
                title="Super Admin: Manage Consultancies & Lab Quotas"
              >
                <Cpu className="w-4 h-4 text-slate-700" />
              </button>
            )}

            {/* Sign Out Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 bg-white hover:bg-red-50 text-red-600 hover:border-red-200 transition cursor-pointer shadow-xs"
                title="Sign out and return to login screen"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Active Candidate Session Banner */}
      {candidateSession && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-blue-950 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Connected Workstation: <strong>{candidateSession.stationName}</strong></span>
              <span className="text-blue-300">•</span>
              <span>Test Centre: <strong>{candidateSession.consultancyName}</strong> (Branch: {candidateSession.branchCode})</span>
              <span className="text-blue-300">•</span>
              <span>Candidate ID: <strong className="font-mono">{candidateSession.candidateId}</strong></span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-[11px] font-bold text-red-600 hover:text-red-800 underline cursor-pointer"
              >
                Sign Out / Switch PC
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                <span>Official Computer-Delivered IELTS Standards</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Authentic IELTS Academic Mock Testing for Candidates & Consultancies
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Experience the identical computer-delivered interface used in actual British Council and IDP test centers. Complete full-length Cambridge 18–21 Reading and Listening papers under authentic timed conditions with instant official 9.0 Band Score diagnostics.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={scrollToTests}
                  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Browse Exam Papers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenConsultancy && (
                  <button
                    onClick={onOpenConsultancy}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Consultancy Lab Portal</span>
                  </button>
                )}

                {onOpenTerminal && (
                  <button
                    onClick={onOpenTerminal}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition flex items-center gap-2 cursor-pointer"
                  >
                    <Laptop className="w-4 h-4 text-slate-600" />
                    <span>Pair Student PC</span>
                  </button>
                )}
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <div className="text-xl font-extrabold text-slate-900">4 Books</div>
                  <div className="text-xs text-slate-500 font-medium">Cambridge 18 – 21</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <div className="text-xl font-extrabold text-slate-900">32 Tests</div>
                  <div className="text-xs text-slate-500 font-medium">Reading & Listening</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <div className="text-xl font-extrabold text-slate-900">1,280 Qs</div>
                  <div className="text-xs text-slate-500 font-medium">Full Explanations</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <div className="text-xl font-extrabold text-emerald-600">Band 9.0</div>
                  <div className="text-xs text-slate-500 font-medium">Instant Conversion</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Simulator Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-600 ml-2 font-bold">
                      CD-IELTS Workspace
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Live Simulator
                  </span>
                </div>

                {/* Simulated Header */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Candidate:</span>
                    <span className="font-mono text-slate-600">PC-01 (Apex Global)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    <span>58:42 Left</span>
                  </div>
                </div>

                {/* Simulated Split Screen Preview */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-1.5">
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-red-600" />
                      <span>Passage 1: Urban Architecture</span>
                    </div>
                    <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-4">
                      Throughout the early 21st century, architectural engineers turned to sustainable biophilic building concepts to decrease carbon emissions in major metropolis areas...
                    </p>
                    <div className="bg-yellow-100 text-yellow-900 px-1.5 py-0.5 rounded text-[9px] inline-block font-mono">
                      Highlighter Active
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-2">
                    <div className="font-bold text-slate-800">Questions 1–6</div>
                    <div className="space-y-1 text-[10px]">
                      <div className="flex items-center gap-1 text-slate-700">
                        <span className="font-bold text-blue-600">Q1.</span>
                        <span className="truncate">Biophilic structures...</span>
                      </div>
                      <div className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-600 flex justify-between">
                        <span>A) TRUE</span>
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div className="p-1 rounded bg-white border border-slate-200 text-slate-400">
                        <span>B) FALSE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Palette Indicator */}
                <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Question Navigation:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <span
                        key={num}
                        className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                          num === 1
                            ? 'bg-slate-900 text-white'
                            : num <= 3
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {num}
                      </span>
                    ))}
                    <span className="text-slate-400">...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three Pillars of the Platform */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Designed Exactly for the Actual Testing Experience
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Everything in this platform replicates official British Council & IDP standards so students perform with total confidence on test day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                100% Authentic CBT Screen
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard split-screen passage viewing, live text highlighter, candidate notes, question review palette, and accessibility controls (font sizes & contrast modes).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Educational Consultancy Lab Hub
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turn your institute's classroom computers into synchronized student terminals. Invigilate up to 50 workstations simultaneously with live telemetry and remote controls.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Official Band 9.0 Conversion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raw scores out of 40 are instantly translated to official Academic IELTS Band scores with diagnostic breakdowns, mistake explanations, and printable result reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Exam Catalog Section */}
      <section id="test-catalog" className="py-12 bg-white flex-1 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-red-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Cambridge Examination Papers Library
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Select an official Cambridge edition and module to launch your timed test simulation.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search passage, topic, or test..."
                className="w-full bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white text-slate-900 pl-9 pr-3 py-2 rounded-xl text-xs outline-none transition"
              />
            </div>
          </div>

          {/* Book Selector Tabs & Module Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Cambridge Books */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {books.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBook(b)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                    selectedBook === b
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>Cambridge {b}</span>
                  {b === 18 && (
                    <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                      Complete
                    </span>
                  )}
                  {b === 21 && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      Preview
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Module Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setModuleFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  moduleFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                All Papers ({tests.filter((t) => t.book === selectedBook).length})
              </button>
              <button
                onClick={() => setModuleFilter('reading')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  moduleFilter === 'reading'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                <span>Reading (60m)</span>
              </button>
              <button
                onClick={() => setModuleFilter('listening')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  moduleFilter === 'listening'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                <span>Listening (35m)</span>
              </button>
            </div>
          </div>

          {/* Test Cards Grid */}
          {filteredTests.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-700 text-sm">No exam papers found</h3>
              <p className="text-xs text-slate-500">
                Try adjusting your search criteria or switch to another Cambridge book edition.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTests.map((test) => {
                const isReading = test.module === 'reading';
                const pastAttempt = pastResults.find((r) => r.testId === test.id);

                return (
                  <div
                    key={test.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
                  >
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isReading
                              ? 'text-red-700 bg-red-50 border border-red-200'
                              : 'text-blue-700 bg-blue-50 border border-blue-200'
                          }`}
                        >
                          {isReading ? 'Academic Reading' : 'Academic Listening'}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {test.durationMinutes} mins
                        </span>
                      </div>

                      {/* Title & Info */}
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        Test {test.testNumber}
                      </h3>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                        {test.title}
                      </p>

                      {/* Sections List */}
                      <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 flex-1">
                        <div className="font-semibold text-slate-700 text-[11px] mb-1">
                          {isReading ? 'Reading Passages:' : 'Listening Sections:'}
                        </div>
                        {test.sections.slice(0, 3).map((sec, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] truncate">
                            <span className="text-slate-400 font-mono">{idx + 1}.</span>
                            <span className="truncate text-slate-600">
                              {sec.subtitle || sec.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Past Attempt Status */}
                      {pastAttempt && (
                        <div className="mb-3 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs flex items-center justify-between text-emerald-900">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">Band {pastAttempt.bandScore.toFixed(1)}</span>
                          </div>
                          <button
                            onClick={() => onViewResults(pastAttempt)}
                            className="text-[11px] underline font-medium hover:text-emerald-950 cursor-pointer"
                          >
                            View Result
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Launch Exam CTA */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                      <button
                        onClick={() => onStartTest(test)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                          isReading
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isReading ? (
                          <BookOpen className="w-3.5 h-3.5" />
                        ) : (
                          <Headphones className="w-3.5 h-3.5" />
                        )}
                        <span>Launch Test ({test.durationMinutes}m)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. Educational Consultancy Lab Suite Callout */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Educational Consultancy & Language Lab Suite</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Deliver Mock Tests Across Multiple Classroom Terminals
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Equip your IELTS training institute with live invigilator monitoring. Connect 10 to 50 student computers instantly using your center's <strong>Branch Code</strong> and desk <strong>PC Number</strong>. Teachers can remotely start, pause, or collect exams while tracking candidate pace in real-time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>No student registration needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Teacher invigilator radar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Instant printable scorecards</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                {onOpenConsultancy && (
                  <button
                    onClick={onOpenConsultancy}
                    className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Open Consultancy Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {onOpenTerminal && (
                  <button
                    onClick={onOpenTerminal}
                    className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Laptop className="w-4 h-4 text-blue-600" />
                    <span>Launch Student PC Kiosk</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Past Candidate History (if any exist) */}
      {pastResults.length > 0 && (
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Your Recent Examination Attempts & Band Scores
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {pastResults.length} session(s) saved on this computer
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden text-xs">
              {pastResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {result.bandScore.toFixed(1)}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Cambridge {result.book} Test {result.testNumber} ({result.module.toUpperCase()})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        {result.correctCount} / {result.totalQuestions} correct • Taken on{' '}
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onViewResults(result)}
                    className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold rounded-lg transition cursor-pointer self-start sm:self-auto shadow-xs"
                  >
                    View Diagnostic Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Institutional Footer */}
      <footer className="bg-white text-slate-600 py-10 border-t border-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                IELTS
              </div>
              <div>
                <span className="font-bold text-slate-900">
                  Cambridge Academic Computer-Delivered Examination Simulation
                </span>
                <p className="text-[11px] text-slate-500">
                  Standardized testing software for educational consultancies and candidates
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={scrollToTests}
                className="hover:text-slate-900 cursor-pointer"
              >
                Test Catalog
              </button>
              {onOpenConsultancy && (
                <button
                  onClick={onOpenConsultancy}
                  className="hover:text-slate-900 cursor-pointer text-blue-600"
                >
                  Consultancy Login
                </button>
              )}
              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Student PC Setup
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} Cambridge Academic CD-IELTS Simulation System. All test materials referenced from Cambridge English Practice Tests.
            </p>
            <p>
              Designed for study abroad consultancies, language academies, and IDP/British Council candidates.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
