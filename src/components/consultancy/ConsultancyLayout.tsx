import React from 'react';
import {
  Monitor,
  Rocket,
  Activity,
  Users,
  Award,
  Sparkles,
  Library,
  QrCode,
  Settings,
  LogOut
} from 'lucide-react';
import type { Consultancy } from '../../types/consultancy';

export type ConsultancySubTab =
  | 'dashboard'
  | 'launch'
  | 'monitor'
  | 'candidates'
  | 'results'
  | 'reports'
  | 'tests'
  | 'pcs'
  | 'settings';

interface ConsultancyLayoutProps {
  consultancy: Consultancy;
  activeTab: ConsultancySubTab;
  onTabChange: (tab: ConsultancySubTab) => void;
  onQuickLaunchClick: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const ConsultancyLayout: React.FC<ConsultancyLayoutProps> = ({
  consultancy,
  activeTab,
  onTabChange,
  onQuickLaunchClick,
  onLogout,
  children,
}) => {
  const navItems: { id: ConsultancySubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Monitor className="w-4 h-4" /> },
    { id: 'launch', label: 'Launch Console', icon: <Rocket className="w-4 h-4" /> },
    { id: 'monitor', label: 'Live Monitor', icon: <Activity className="w-4 h-4" /> },
    { id: 'candidates', label: 'Candidates', icon: <Users className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <Award className="w-4 h-4" /> },
    { id: 'reports', label: 'AI Reports', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tests', label: 'Test Library', icon: <Library className="w-4 h-4" /> },
    { id: 'pcs', label: 'Paired PCs & QRs', icon: <QrCode className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30">
      {/* Top Header Chrome */}
      <header className="bg-[#0F1E33] text-[#FAF8F3] px-4 sm:px-6 py-3 border-b border-[#5B6B82]/30 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand & Branch */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C9A24B] text-[#0F1E33] flex items-center justify-center font-bold text-base shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                  {consultancy.name}
                </span>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/30">
                  {consultancy.branch || 'Central Lab'}
                </span>
              </div>
              <p className="text-[11px] text-[#5B6B82] hidden sm:block">
                Branch Code: <span className="text-slate-300 font-mono">{consultancy.branchCode || consultancy.accessCode}</span> · Authorized Test Centre
              </p>
            </div>
          </div>

          {/* Right: Primary Launch Action & Logout */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onQuickLaunchClick}
              className="btn-texture px-4 py-2 bg-[#C9A24B] hover:bg-[#B8923A] text-[#0F1E33] text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Launch Test</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 text-[#5B6B82] hover:text-white rounded-lg transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="bg-white border-b border-[#5B6B82]/20 px-4 sm:px-6 overflow-x-auto shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'border-[#0F1E33] text-[#0F1E33]'
                    : 'border-transparent text-[#5B6B82] hover:text-[#0F1E33] hover:border-slate-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {children}
      </main>
    </div>
  );
};
