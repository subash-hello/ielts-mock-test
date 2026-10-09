import React, { useState, useEffect } from 'react';
import {
  Lock,
  Building2,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import type { Consultancy, AdminUser } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface DirectorLoginViewProps {
  consultancy: Consultancy;
  onSuccess: (user: AdminUser, targetConsultancy: Consultancy) => void;
  onBackToHub: () => void;
}

export const DirectorLoginView: React.FC<DirectorLoginViewProps> = ({
  consultancy,
  onSuccess,
  onBackToHub,
}) => {
  const [identifier, setIdentifier] = useState(
    consultancy.branchCode || consultancy.accessCode || consultancy.adminEmail || consultancy.id
  );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showSwitchBranch, setShowSwitchBranch] = useState(false);
  const [allBranches, setAllBranches] = useState<Consultancy[]>(() => ConsultancyService.getConsultancies());

  useEffect(() => {
    ConsultancyService.syncFromBackend().then(() => {
      setAllBranches(ConsultancyService.getConsultancies());
    }).catch(() => {});

    const unsub = ConsultancyService.subscribe((event) => {
      if (
        event.type === 'CONSULTANCY_UPDATED' ||
        event.type === 'CONSULTANCY_CREATED' ||
        event.type === 'CONSULTANCY_DELETED' ||
        event.type === 'STORAGE_SYNC' ||
        event.type === 'WINDOW_FOCUSED'
      ) {
        setAllBranches(ConsultancyService.getConsultancies());
      }
    });

    return () => unsub();
  }, []);

  const handleSelectBranch = (b: Consultancy) => {
    setIdentifier(b.branchCode || b.accessCode || b.adminEmail || b.id);
    setShowSwitchBranch(false);
    setError(null);
  };

  const currentBranch = allBranches.find(
    (b) =>
      b.id.toLowerCase() === identifier.trim().toLowerCase() ||
      b.branchCode?.toLowerCase() === identifier.trim().toLowerCase() ||
      b.accessCode?.toLowerCase() === identifier.trim().toLowerCase() ||
      b.adminEmail?.toLowerCase() === identifier.trim().toLowerCase()
  ) || consultancy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // First check super admin credentials
      const superCheck = ConsultancyService.authenticateAdmin(identifier, password);
      if (superCheck.success && superCheck.user?.role === 'super_admin') {
        setIsLoading(false);
        if (!rememberMe) {
          // kept in storage by service, or can be cleared on unload
        }
        onSuccess(superCheck.user, currentBranch);
        return;
      }

      // Check director password for target consultancy
      const res = ConsultancyService.verifyDirectorPassword(identifier, password);
      setIsLoading(false);

      if (res.success && res.user && res.consultancy) {
        onSuccess(res.user, res.consultancy);
      } else {
        setError(res.error || 'Incorrect Director Password. Please try again.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 200);
  };

  const branchCodeForKiosk = currentBranch.branchCode || currentBranch.accessCode || currentBranch.id;

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30 select-none">
      {/* Top Header Chrome */}
      <header className="bg-[#0F1E33] text-[#FAF8F3] px-4 sm:px-6 py-3 border-b border-[#5B6B82]/30 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C9A24B] text-[#0F1E33] flex items-center justify-center font-serif font-black text-lg shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                  Master IELTS AI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/30">
                  Director Portal
                </span>
              </div>
              <p className="text-[11px] text-[#5B6B82] hidden sm:block">
                Laboratory Invigilation & Exam Control Administration
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToHub}
            className="btn-texture px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Directory</span>
          </button>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div
          className={`paper-card max-w-md w-full p-6 sm:p-8 space-y-6 shadow-md border border-[#5B6B82]/20 transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {/* Card Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#0F1E33] text-[#C9A24B] flex items-center justify-center mx-auto shadow-xs border border-[#C9A24B]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-[#0F1E33] tracking-tight">
              Director Authentication
            </h1>
            <p className="text-xs text-[#5B6B82] leading-relaxed">
              Enter your director administrator password to access live workstations, exam launch console, and student results.
            </p>
          </div>

          {/* Current Branch Banner */}
          <div className="p-3.5 bg-slate-50 border border-[#5B6B82]/20 rounded-xl space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <div>
                  <span className="font-display font-bold text-xs text-[#0F1E33] block">
                    {currentBranch.name}
                  </span>
                  <span className="text-[11px] text-[#5B6B82]">
                    {currentBranch.branch || 'Main Branch'} · Branch Code:{' '}
                    <span className="font-mono font-bold text-[#0F1E33]">
                      {currentBranch.branchCode || currentBranch.accessCode}
                    </span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSwitchBranch(!showSwitchBranch)}
                className="text-[11px] font-semibold text-[#0F1E33] hover:text-[#C9A24B] hover:underline shrink-0"
              >
                {showSwitchBranch ? 'Close' : 'Switch'}
              </button>
            </div>

            {/* Branch Quick Switch Dropdown */}
            {showSwitchBranch && (
              <div className="pt-2 border-t border-[#5B6B82]/15 space-y-1 max-h-40 overflow-y-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B82] block mb-1">
                  Select Registered Branch:
                </span>
                {allBranches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleSelectBranch(b)}
                    className={`w-full text-left p-1.5 rounded text-xs flex items-center justify-between hover:bg-white transition ${
                      b.id === currentBranch.id ? 'bg-white font-bold text-[#0F1E33] border border-[#C9A24B]' : 'text-slate-700'
                    }`}
                  >
                    <span>{b.name} ({b.branch || 'Central'})</span>
                    <span className="font-mono text-[10px] text-[#5B6B82]">{b.branchCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Branch Code / Email input */}
            <div>
              <label className="block font-semibold text-[#0F1E33] mb-1">
                Branch Code or Director Email *
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. kiec-1, director@apexglobal.edu.np"
                className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] placeholder-[#5B6B82]/40 focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            {/* Director Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#0F1E33]">
                  Director Password *
                </label>
                <span className="text-[10px] text-[#5B6B82]">
                  Set at branch creation
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5B6B82] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Director Password"
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] placeholder-[#5B6B82]/40 focus:outline-none focus:border-[#C9A24B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82] hover:text-[#0F1E33] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-[#5B6B82] mt-1 leading-normal">
                Notice: Student exam session PINs cannot be used to unlock the director portal.
              </p>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#5B6B82]/30 text-[#0F1E33] focus:ring-[#C9A24B]"
                />
                <span>Remember session on this computer</span>
              </label>
              <span className="text-[11px] font-semibold text-[#2E7D4F] flex items-center gap-1">
                <span>●</span> Secure Session
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="btn-texture w-full py-2.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-bold rounded-lg shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 transition"
            >
              <span>{isLoading ? 'Verifying Director Password...' : 'Unlock Director Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Student Kiosk Link Guard */}
          <div className="pt-4 border-t border-[#5B6B82]/15 text-center text-xs text-[#5B6B82]">
            <span>Are you a student taking a test? </span>
            <a
              href={`/b/${branchCodeForKiosk.toLowerCase()}`}
              className="font-bold text-[#0F1E33] hover:text-[#C9A24B] hover:underline"
            >
              Go to Student Workstation Kiosk (/b/{branchCodeForKiosk.toLowerCase()})
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#5B6B82]/15 bg-white/60 px-4 sm:px-6 py-2.5 text-center text-xs text-[#5B6B82]">
        Master IELTS AI Platform · Laboratory Control Center Security Protected
      </footer>
    </div>
  );
};

export default DirectorLoginView;
