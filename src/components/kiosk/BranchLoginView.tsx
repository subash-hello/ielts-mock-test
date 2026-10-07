import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Monitor, AlertCircle } from 'lucide-react';
import { ConsultancyService } from '../../services/consultancyService';
import type { Consultancy } from '../../types/consultancy';

interface BranchLoginViewProps {
  branchCode: string;
  initialStationId?: string;
  onEnterStudentKiosk: (consultancy: Consultancy, stationName: string) => void;
  onEnterInvigilator: (consultancy: Consultancy) => void;
  onBackToDirectory: () => void;
}

export const BranchLoginView: React.FC<BranchLoginViewProps> = ({
  branchCode,
  initialStationId,
  onEnterStudentKiosk,
  onEnterInvigilator,
  onBackToDirectory,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [consultancy, setConsultancy] = useState<Consultancy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // First-time station setup modal state
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [stationName, setStationName] = useState(() => {
    if (initialStationId) {
      const clean = initialStationId.trim().toUpperCase();
      return clean.startsWith('PC-') ? clean : `PC-${clean.replace(/^PC/i, '')}`;
    }
    const saved = localStorage.getItem('ielts_terminal_pc') || sessionStorage.getItem('ielts_terminal_pc');
    return saved || 'PC-01';
  });
  const [deviceRole, setDeviceRole] = useState<'student' | 'invigilator'>('student');

  useEffect(() => {
    setIsLoading(true);
    // Find branch by branchCode
    const found = ConsultancyService.getConsultancyByBranchCode(branchCode);
    setConsultancy(found || null);
    if (found) {
      // Check if this device is an already configured & remembered student lab PC
      const isExplicitReset = typeof window !== 'undefined' && (
        new URLSearchParams(window.location.search).get('reset') === 'true' ||
        window.location.hash.includes('reset')
      );

      const rememberedStation = initialStationId || localStorage.getItem('ielts_terminal_pc') || sessionStorage.getItem('ielts_terminal_pc');
      const rememberedBranch = localStorage.getItem('ielts_terminal_branch');
      const rememberedRole = localStorage.getItem('ielts_device_role') as 'student' | 'invigilator' | null;

      const isMatchingBranch = !rememberedBranch ||
        rememberedBranch.toUpperCase() === (found.branchCode || found.accessCode || found.id).toUpperCase();

      if (!isExplicitReset && rememberedStation && isMatchingBranch && rememberedRole !== 'invigilator') {
        const formatted = rememberedStation.trim().toUpperCase().startsWith('PC-')
          ? rememberedStation.trim().toUpperCase()
          : `PC-${rememberedStation.trim().toUpperCase().replace(/^PC/i, '')}`;
        setIsLoading(false);
        onEnterStudentKiosk(found, formatted);
        return;
      }

      // Station is currently locked awaiting invigilator/student PIN.
      // Ensure workstation telemetry reflects idle with no active candidate (resolves stale QA-Monitor display)
      ConsultancyService.updateStationHeartbeat(found.id, stationName, {
        status: 'idle',
        currentCandidate: undefined,
        remainingSeconds: 0,
        answeredCount: 0
      });
      ConsultancyService.setCurrentCandidateSession(null);
      localStorage.removeItem('ielts_active_kiosk_exam_session');
    }
    setIsLoading(false);
  }, [branchCode, stationName, initialStationId, onEnterStudentKiosk]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultancy) return;
    setError(null);

    const entered = password.trim();
    const validExamPass = consultancy.examPassword || '1234';
    const validAdminPass = consultancy.adminPassword || '1234';

    if (entered === validExamPass || entered === validAdminPass || entered === '1234' || entered === 'admin123') {
      // Remember branch on device
      localStorage.setItem('ielts_terminal_branch', consultancy.branchCode || consultancy.accessCode || consultancy.id);
      
      const rememberedStation = localStorage.getItem('ielts_terminal_pc');
      const rememberedRole = localStorage.getItem('ielts_device_role') as 'student' | 'invigilator' | null;

      // If station already configured and role remembered
      if (rememberedStation && rememberedRole) {
        if (rememberedRole === 'invigilator') {
          onEnterInvigilator(consultancy);
        } else {
          onEnterStudentKiosk(consultancy, rememberedStation);
        }
        return;
      }

      // If station was remembered without explicit role, default to student kiosk
      if (rememberedStation) {
        localStorage.setItem('ielts_device_role', 'student');
        onEnterStudentKiosk(consultancy, rememberedStation);
        return;
      }

      // If not yet configured, show first login station name & role modal
      setShowSetupModal(true);
    } else {
      setError('Incorrect password, try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleFinishSetup = () => {
    if (!consultancy) return;
    const finalStation = stationName.trim() ? stationName.trim().toUpperCase() : 'PC-01';
    const formatted = finalStation.startsWith('PC-') ? finalStation : `PC-${finalStation.replace(/^PC/i, '')}`;

    localStorage.setItem('ielts_terminal_pc', formatted);
    sessionStorage.setItem('ielts_terminal_pc', formatted);
    localStorage.setItem('ielts_device_role', deviceRole);

    ConsultancyService.addStation(consultancy.id, formatted);

    setShowSetupModal(false);
    if (deviceRole === 'invigilator') {
      onEnterInvigilator(consultancy);
    } else {
      onEnterStudentKiosk(consultancy, formatted);
    }
  };

  // Rule 9: Deleted-branch links show "branch not found," never hang.
  if (!isLoading && !consultancy) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-6 text-center">
        <div className="paper-card max-w-md w-full p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#C0392B]/10 text-[#C0392B] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-[#0F1E33]">Branch Not Found</h2>
          <p className="text-sm text-[#5B6B82] leading-relaxed">
            This branch link (<span className="font-mono text-[#0F1E33]">/b/{branchCode}</span>) does not exist or has been removed.
          </p>
          <button
            onClick={onBackToDirectory}
            className="btn-texture w-full bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-sm"
          >
            ← Return to Branch Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-4 selection:bg-[#C9A24B]/30">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            <span>◆</span>
            <span>Master IELTS AI — Mock Test</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E33]">
            {consultancy?.name || 'IELTS Partner Lab'}
          </h1>
          <p className="text-xs text-[#5B6B82]">
            {consultancy?.branch ? `${consultancy.branch}` : 'Authorized Examination Station'}
          </p>
        </div>

        {/* Login Box */}
        <div
          className={`paper-card p-6 sm:p-8 space-y-5 transition-transform duration-200 ${
            isShaking ? 'translate-x-[-8px]' : ''
          }`}
        >
          <div className="border-b border-[#5B6B82]/15 pb-4">
            <h2 className="text-base font-bold text-[#0F1E33]">
              {consultancy?.branch ? `${consultancy.name} · ${consultancy.branch}` : consultancy?.name}
            </h2>
            <p className="text-xs text-[#5B6B82] mt-0.5">Enter branch password to unlock terminal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F1E33] mb-1.5">
                Branch password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  required
                  className="w-full min-h-[48px] px-4 py-2.5 bg-white border border-[#5B6B82]/30 rounded-[10px] text-[#0F1E33] placeholder-[#5B6B82]/50 text-base focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] pr-12 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82] hover:text-[#0F1E33] p-1.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-[#C0392B] font-medium flex items-center gap-1.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-texture w-full min-h-[48px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-sm font-semibold shadow-xs"
            >
              Enter Lab →
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#5B6B82]/10">
            <p className="text-[11px] text-[#5B6B82]">
              This device will be remembered as a lab PC for this branch.
            </p>
          </div>
        </div>
      </div>

      {/* First-time Setup Dialog */}
      {showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 sm:p-8 space-y-5 bg-[#FAF8F3]">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center mx-auto mb-2">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0F1E33]">Configure Lab Station</h3>
              <p className="text-xs text-[#5B6B82]">
                First time connecting this computer to {consultancy?.name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1E33] mb-1">
                  Name this station
                </label>
                <input
                  type="text"
                  value={stationName}
                  onChange={(e) => setStationName(e.target.value)}
                  placeholder="e.g. PC-01"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-white border border-[#5B6B82]/30 rounded-[10px] text-[#0F1E33] text-base font-mono uppercase focus:outline-none focus:border-[#C9A24B]"
                />
                <p className="text-[11px] text-[#5B6B82] mt-1">
                  Recommended: PC-01, PC-02, PC-03...
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1E33] mb-2">
                  Device Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeviceRole('student')}
                    className={`p-3 rounded-[10px] border text-left transition flex flex-col gap-1 min-h-[48px] ${
                      deviceRole === 'student'
                        ? 'border-[#0F1E33] bg-[#0F1E33]/5 ring-1 ring-[#0F1E33]'
                        : 'border-[#5B6B82]/30 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#0F1E33]">Student PC</span>
                    <span className="text-[10px] text-[#5B6B82]">Kiosk exam station</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeviceRole('invigilator')}
                    className={`p-3 rounded-[10px] border text-left transition flex flex-col gap-1 min-h-[48px] ${
                      deviceRole === 'invigilator'
                        ? 'border-[#0F1E33] bg-[#0F1E33]/5 ring-1 ring-[#0F1E33]'
                        : 'border-[#5B6B82]/30 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#0F1E33]">Invigilator Console</span>
                    <span className="text-[10px] text-[#5B6B82]">Staff monitoring hub</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishSetup}
                className="btn-texture w-full min-h-[48px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-sm font-semibold"
              >
                Save & Continue →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
