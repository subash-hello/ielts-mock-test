import React, { useState } from 'react';
import {
  Laptop,
  Building2,
  Lock,
  Mail,
  Key,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Monitor,
  AlertCircle,
  User
} from 'lucide-react';
import type { AdminUser, CandidateSession } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface UnifiedAuthViewProps {
  initialTab?: 'candidate' | 'admin';
  initialBranchCode?: string;
  initialPcNumber?: string;
  onCandidateLogin: (session: CandidateSession) => void;
  onAdminLogin: (user: AdminUser) => void;
  onBackToHub?: () => void;
  authMessage?: string | null;
}

export const UnifiedAuthView: React.FC<UnifiedAuthViewProps> = ({
  initialTab = 'candidate',
  initialBranchCode = 'APEX-2026',
  initialPcNumber = 'PC-01',
  onCandidateLogin,
  onAdminLogin,
  onBackToHub,
  authMessage
}) => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'admin'>(initialTab);

  // Candidate fields
  const [candidateFullName, setCandidateFullName] = useState<string>(() => {
    return localStorage.getItem('ielts_candidate_name') || '';
  });
  const [branchCode, setBranchCode] = useState(initialBranchCode);
  const [pcNumber, setPcNumber] = useState(initialPcNumber);
  const [examPassword, setExamPassword] = useState('');
  const [showExamPassword, setShowExamPassword] = useState(false);

  // Admin fields (Email & Password)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    try {
      localStorage.removeItem('ielts_terminal_pass');
    } catch {}
    setExamPassword('');
  }, []);

  // Handle Candidate Form Submit
  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = ConsultancyService.verifyTerminalLogin(branchCode, pcNumber, examPassword);
      setIsLoading(false);

      if (!res.success || !res.consultancy || !res.stationName) {
        setErrorMessage(res.error || 'Authentication failed. Please verify branch code, PC number, and password.');
        return;
      }

      // Add station to consultancy lab
      ConsultancyService.addStation(res.consultancy.id, res.stationName);

      // Check if station already has pre-assigned candidate
      const stations = ConsultancyService.getStations(res.consultancy.id);
      const matched = stations.find((s) => s.name.toUpperCase() === res.stationName?.toUpperCase());
      const candidateName = candidateFullName.trim() || matched?.currentCandidate?.name || `Candidate ${res.stationName}`;
      const candidateId = matched?.currentCandidate?.candidateId || '00' + Math.floor(1000 + Math.random() * 9000);
      const targetBand = matched?.currentCandidate?.targetBand || 7.5;

      if (candidateFullName.trim()) {
        localStorage.setItem('ielts_candidate_name', candidateFullName.trim());
      }

      const session: CandidateSession = {
        stationName: res.stationName,
        branchCode: res.consultancy.branchCode || res.consultancy.accessCode,
        consultancyId: res.consultancy.id,
        consultancyName: res.consultancy.name,
        candidateName,
        candidateId,
        targetBand,
        loggedInAt: new Date().toISOString()
      };

      ConsultancyService.setCurrentCandidateSession(session);
      onCandidateLogin(session);
    }, 200);
  };

  // Handle Admin Form Submit
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = ConsultancyService.authenticateAdmin(adminEmail, adminPassword);
      setIsLoading(false);

      if (res.success && res.user) {
        ConsultancyService.setCurrentAdmin(res.user);
        onAdminLogin(res.user);
      } else {
        setErrorMessage(res.error || 'Invalid administrator email address or password.');
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Top Banner with Master IELTS AI Logo */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between shadow-xs gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1 shadow-xs shrink-0">
            <img
              src="/images/masterieltsai-icon.png"
              alt="Master IELTS AI"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm text-slate-900 tracking-tight uppercase">
                MOCK TEST
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                from{' '}
                <a
                  href="https://masterieltsai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Master IELTS AI
                </a>
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Cambridge Academic Computer-Delivered Examination Gateway
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Protected Examination Environment</span>
          </div>
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Tests</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Authentication Box */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6">
        <div className="bg-white border border-slate-200 max-w-md w-full p-4 sm:p-8 rounded-2xl shadow-sm space-y-5 sm:space-y-6">
          {/* Logo & Title */}
          <div className="text-center space-y-2.5">
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1.5 shadow-sm mb-2">
                <img
                  src="/images/masterieltsai-icon.png"
                  alt="Master IELTS AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  MOCK TEST
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  from{' '}
                  <a
                    href="https://masterieltsai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Master IELTS AI
                  </a>
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Examination System Login
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Authentication required. Please sign in as a student workstation or consultancy administrator.
              </p>
            </div>
          </div>

          {/* Flash Alert Message if passed */}
          {authMessage && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{authMessage}</span>
            </div>
          )}

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('candidate');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'candidate'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-blue-600" />
              <span>Candidate Workstation</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              <span>Admin & Teacher</span>
            </button>
          </div>

          {/* TAB 1: CANDIDATE LOGIN (BRANCH, PC, PASSWORD) */}
          {activeTab === 'candidate' && (
            <form onSubmit={handleCandidateSubmit} className="space-y-4 text-xs">
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3 text-slate-700 text-xs leading-relaxed">
                <span className="font-semibold text-blue-900 block mb-0.5">Lab Station Check-In:</span>
                Students do not need an account. Enter the <strong>Branch Code</strong>, your desk <strong>PC Number</strong>, and the <strong>Session Password</strong> provided by your teacher.
              </div>

              {/* 0. Candidate Full Name */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Candidate Full Name (Optional / Check-in)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={candidateFullName}
                    onChange={(e) => setCandidateFullName(e.target.value)}
                    placeholder="e.g. Sujan Sharma"
                    className="w-full bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 font-semibold text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-xs"
                  />
                </div>
              </div>

              {/* 1. Branch Code */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Consultancy Branch Code *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value.toUpperCase())}
                    placeholder="e.g. APEX-2026"
                    className="w-full bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono font-bold text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-xs uppercase"
                  />
                </div>
              </div>

              {/* 2. PC Number */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Computer / Desk Number *
                </label>
                <div className="relative">
                  <Monitor className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pcNumber}
                    onChange={(e) => setPcNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. PC-01, PC-05"
                    className="w-full bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 font-bold text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-xs uppercase"
                  />
                </div>
              </div>

              {/* 3. Password */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Examination Session Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showExamPassword ? 'text' : 'password'}
                    required
                    value={examPassword}
                    onChange={(e) => setExamPassword(e.target.value)}
                    placeholder="Enter exam password"
                    className="w-full bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-900 pl-10 pr-10 py-2.5 rounded-lg outline-none text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowExamPassword(!showExamPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showExamPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>



              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying Terminal...' : 'Sign In to Candidate Station'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: ADMIN & CONSULTANCY LOGIN (EMAIL & PASSWORD) */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 text-xs leading-relaxed">
                <span className="font-semibold text-slate-900 block mb-0.5">Administrative Access:</span>
                Sign in with your authorized educational consultancy director email or platform administrator account.
              </div>

              {/* Email */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Administrator Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="e.g. admin@example.com"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 pl-10 pr-10 py-2.5 rounded-lg outline-none text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            MOCK TEST from Master IELTS AI •{' '}
            <a
              href="https://masterieltsai.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 font-semibold hover:underline"
            >
              masterieltsai.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
