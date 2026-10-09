import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import type { Consultancy } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface DirectoryLandingViewProps {
  onSelectBranch: (branchCode: string) => void;
  onOpenResultLookup: () => void;
  onOpenSuperAdmin: () => void;
  onOpenConsultancyPortal: (cid?: string) => void;
}

export const DirectoryLandingView: React.FC<DirectoryLandingViewProps> = ({
  onSelectBranch,
  onOpenResultLookup,
  onOpenSuperAdmin,
  onOpenConsultancyPortal,
}) => {
  const [directCode, setDirectCode] = useState('');
  const [consultancies, setConsultancies] = useState<Consultancy[]>(() =>
    ConsultancyService.getConsultancies()
  );

  useEffect(() => {
    // 1. Initial local load
    setConsultancies(ConsultancyService.getConsultancies());

    // 2. Fetch authoritative branches from central Hugging Face backend
    ConsultancyService.syncFromBackend().then(() => {
      setConsultancies(ConsultancyService.getConsultancies());
    }).catch(() => {});

    // 3. Subscribe to real-time updates across tabs and sync
    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (
        event.type === 'CONSULTANCY_UPDATED' ||
        event.type === 'CONSULTANCY_CREATED' ||
        event.type === 'CONSULTANCY_DELETED' ||
        event.type === 'STORAGE_SYNC' ||
        event.type === 'WINDOW_FOCUSED'
      ) {
        setConsultancies(ConsultancyService.getConsultancies());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = directCode.trim().toLowerCase();
    if (!clean) return;
    onSelectBranch(clean);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30">
      {/* Top Header */}
      <header className="border-b border-[#5B6B82]/15 px-4 sm:px-8 py-4 bg-white/60 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F1E33] text-[#FAF8F3] flex items-center justify-center font-serif font-black text-lg shadow-xs">
              M
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-[#0F1E33]">
                Master IELTS AI
              </span>
              <span className="text-[11px] text-[#5B6B82] block -mt-0.5 font-medium">
                Official Mock Test & Laboratory Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={onOpenResultLookup}
              className="btn-texture px-3.5 py-1.5 bg-white border border-[#5B6B82]/25 text-[#0F1E33] hover:bg-slate-50 font-semibold shadow-2xs"
            >
              Verify Result
            </button>
            <button
              type="button"
              onClick={() => onOpenConsultancyPortal()}
              className="btn-texture px-3.5 py-1.5 bg-[#0F1E33] text-white hover:bg-[#1A2E4B] font-semibold shadow-xs"
            >
              Director Portal
            </button>
          </div>
        </div>
      </header>

      {/* Hero & Vision */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center space-y-10 my-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/15 text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
            <span>◆</span>
            <span>Design Blueprint v2.0 · Calm Exam Texture</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-[#0F1E33] tracking-tight max-w-2xl mx-auto leading-tight">
            Computer-Delivered IELTS Mock Test Platform
          </h1>
          <p className="text-sm sm:text-base text-[#5B6B82] max-w-xl mx-auto leading-relaxed">
            One branch link connects an entire computer lab. Zero setup, authentic Cambridge academic papers, authoritative timer synchronization, and instant AI diagnostics.
          </p>
        </div>

        {/* Quick Branch Code Entry Box */}
        <div className="paper-card p-6 sm:p-8 space-y-4 max-w-xl mx-auto w-full shadow-sm">
          <div className="text-center space-y-0.5">
            <h2 className="font-display text-lg font-bold text-[#0F1E33]">
              Enter Your Branch Code
            </h2>
            <p className="text-xs text-[#5B6B82]">
              Type your consultancy branch code to launch your lab workstation
            </p>
          </div>

          <form onSubmit={handleDirectSubmit} className="flex gap-2">
            <input
              type="text"
              value={directCode}
              onChange={(e) => setDirectCode(e.target.value)}
              placeholder="e.g. kiec-1, apex-2026, edwise-99"
              autoFocus
              className="flex-1 min-h-[48px] px-4 bg-white border border-[#5B6B82]/30 rounded-[10px] text-sm font-mono font-bold text-[#0F1E33] placeholder-[#5B6B82]/40 focus:outline-none focus:border-[#C9A24B]"
            />
            <button
              type="submit"
              disabled={!directCode.trim()}
              className="btn-texture min-h-[48px] px-6 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-sm font-bold shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Go to Branch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Branch Link Directory (Blueprint Section 4: / → Landing / branch link directory) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-2">
            <h3 className="font-display text-base font-bold text-[#0F1E33]">
              Active Partner Branches
            </h3>
            <span className="text-xs text-[#5B6B82]">
              Direct bookmarkable links (/b/{'{branch-code}'})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {consultancies.map((c) => {
              const code = (c.branchCode || c.accessCode || c.id).toLowerCase();
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectBranch(code)}
                  className="p-4 rounded-xl border border-[#5B6B82]/20 bg-white hover:border-[#0F1E33] text-left transition flex items-center justify-between group shadow-2xs cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-[#0F1E33] group-hover:text-[#C9A24B] transition-colors">
                      {c.name}
                    </div>
                    <div className="text-xs text-[#5B6B82]">
                      {c.branch || 'Branch'} · <span className="font-mono text-[#0F1E33]">/b/{code}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#5B6B82] group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-6 border-t border-[#5B6B82]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5B6B82] gap-3">
          <div>
            © 2026 Master IELTS AI · Viper Intelligence Team. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenResultLookup}
              className="hover:text-[#0F1E33] underline underline-offset-4"
            >
              Public Result Lookup
            </button>
            <button
              onClick={onOpenSuperAdmin}
              className="hover:text-[#0F1E33] underline underline-offset-4"
            >
              Super Admin
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
