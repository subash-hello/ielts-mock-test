import React, { useState } from 'react';
import {
  Laptop,
  Building2,
  Lock,
  Mail,
  Key,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Monitor,
  AlertCircle
} from 'lucide-react';
import type { AdminUser, CandidateSession } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface UnifiedAuthViewProps {
  initialTab?: 'candidate' | 'admin';
  initialBranchCode?: string;
  initialPcNumber?: string;
  onCandidateLogin: (session: CandidateSession) => void;
  onAdminLogin: (user: AdminUser) => void;
  authMessage?: string | null;
}

export const UnifiedAuthView: React.FC<UnifiedAuthViewProps> = ({
  initialTab = 'candidate',
  initialBranchCode = 'APEX-2026',
  initialPcNumber = 'PC-01',
  onCandidateLogin,
  onAdminLogin,
  authMessage
}) => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'admin'>(initialTab);

  // Candidate fields (No name required!)
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
      const candidateName = matched?.currentCandidate?.name || `Candidate ${res.stationName}`;
      const candidateId = matched?.currentCandidate?.candidateId || '00' + Math.floor(1000 + Math.random() * 9000);
      const targetBand = matched?.currentCandidate?.targetBand || 7.5;

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
      {/* Top Banner */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
            IELTS
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-slate-900">
              Cambridge Academic Computer-Delivered Examination System
            </h1>
            <p className="text-xs text-slate-500">
              Official Secure Authentication Gateway
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">Protected Examination Environment</span>
        </div>
      </header>

      {/* Main Authentication Box */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-slate-200 max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          {/* Lock Icon & Title */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center mx-auto text-red-600 shadow-xs">
              <Lock className="w-6 h-6" />
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
          <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Official Computer-Delivered IELTS Simulation Platform
          </div>
        </div>
      </main>
    </div>
  );
};
