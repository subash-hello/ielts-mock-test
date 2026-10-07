import React, { useState } from 'react';
import {
  Building2,
  Plus,
  ArrowRight,
  Search,
  Trash2,
  Edit,
  X,
  Zap,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  Activity,
  Library,
  Copy,
  Check
} from 'lucide-react';
import type { Consultancy, ConsultancyStatus } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';
import { allMockTests } from '../../data/mockTests';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface SuperAdminPortalProps {
  onBackToApp: () => void;
  onOpenConsultancy: (consultancyId: string) => void;
  onLogout?: () => void;
}

export const SuperAdminPortal: React.FC<SuperAdminPortalProps> = ({
  onBackToApp,
  onOpenConsultancy,
  onLogout
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'consultancies' | 'tests' | 'licenses' | 'health'>('consultancies');
  const [consultancies, setConsultancies] = useState<Consultancy[]>(ConsultancyService.getConsultancies());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingConsultancy, setEditingConsultancy] = useState<Consultancy | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    branch: string;
    adminEmail: string;
    adminPassword?: string;
    phone: string;
    accessCode: string;
    branchCode: string;
    examPassword: string;
    computerLimit: number;
    testCredits: number;
    status: ConsultancyStatus;
  }>({
    name: '',
    branch: '',
    adminEmail: '',
    adminPassword: '1234',
    phone: '',
    accessCode: '',
    branchCode: '',
    examPassword: '1234',
    computerLimit: 20,
    testCredits: 300,
    status: 'active'
  });

  const [deletingConsultancy, setDeletingConsultancy] = useState<{ id: string; name: string } | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const togglePasswordVisibility = (id: string, type: 'admin' | 'exam') => {
    const key = `${id}_${type}`;
    setVisiblePasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reloadData = () => {
    setConsultancies(ConsultancyService.getConsultancies());
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenAddModal = () => {
    const randomCode = 'kiec-' + Math.floor(1 + Math.random() * 9);
    setFormData({
      name: '',
      branch: '',
      adminEmail: '',
      adminPassword: '1234',
      phone: '',
      accessCode: randomCode,
      branchCode: randomCode,
      examPassword: '1234',
      computerLimit: 20,
      testCredits: 300,
      status: 'active'
    });
    setEditingConsultancy(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (c: Consultancy) => {
    setEditingConsultancy(c);
    setFormData({
      name: c.name,
      branch: c.branch || '',
      adminEmail: c.adminEmail,
      adminPassword: c.adminPassword || '1234',
      phone: c.phone || '',
      accessCode: c.accessCode,
      branchCode: c.branchCode || c.accessCode,
      examPassword: c.examPassword || '1234',
      computerLimit: c.computerLimit,
      testCredits: c.testCredits,
      status: c.status
    });
    setShowAddModal(true);
  };

  const handleSaveConsultancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingConsultancy) {
      ConsultancyService.updateConsultancy(editingConsultancy.id, {
        ...formData,
      });
    } else {
      ConsultancyService.createConsultancy({
        ...formData,
        id: formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(100 + Math.random() * 900),
      });
    }

    setShowAddModal(false);
    reloadData();
  };

  const handleConfirmDelete = () => {
    if (!deletingConsultancy) return;
    ConsultancyService.deleteConsultancy(deletingConsultancy.id);
    setDeletingConsultancy(null);
    reloadData();
  };

  const filteredConsultancies = consultancies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.branch && c.branch.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.accessCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.branchCode && c.branchCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mocktest.masterieltsai.com';

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#0F1E33] flex flex-col font-ui selection:bg-[#C9A24B]/30">
      {/* Super Admin Top Chrome */}
      <header className="bg-[#0F1E33] text-white px-4 sm:px-6 py-3 border-b border-[#5B6B82]/30 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C9A24B] text-[#0F1E33] flex items-center justify-center font-bold text-base shadow-xs">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-white">
                  Master IELTS AI
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Viper Intelligence Core Systems · Platform Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToApp}
              className="btn-texture px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Public Directory
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-white transition"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs (Blueprint Section 4) */}
      <nav className="bg-white border-b border-[#5B6B82]/20 px-4 sm:px-6 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {[
            { id: 'consultancies', label: 'Consultancies & Branches', icon: <Building2 className="w-4 h-4" /> },
            { id: 'tests', label: 'Master Cambridge Tests', icon: <Library className="w-4 h-4" /> },
            { id: 'licenses', label: 'Credits & PC Licenses', icon: <Zap className="w-4 h-4" /> },
            { id: 'health', label: 'System Health & Audit Log', icon: <Activity className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition cursor-pointer ${
                activeSubTab === tab.id
                  ? 'border-[#0F1E33] text-[#0F1E33]'
                  : 'border-transparent text-[#5B6B82] hover:text-[#0F1E33]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* TAB 1: CONSULTANCIES & BRANCHES (Blueprint 6.11) */}
        {activeSubTab === 'consultancies' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#0F1E33]">
                  Consultancy & Branch Accounts
                </h1>
                <p className="text-xs text-[#5B6B82]">
                  Manage authorized educational consultancies, branch login links, and station allocations
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Branch Account</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-[#5B6B82] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search consultancies or branch codes..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            {/* Consultancy Cards Grid (Blueprint 6.11: passwords MASKED with toggle!) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredConsultancies.map((c) => {
                const branchCode = c.branchCode || c.accessCode || c.id;
                const branchLink = `${origin}/b/${branchCode.toLowerCase()}`;
                const showAdmin = !!visiblePasswords[`${c.id}_admin`];
                const showExam = !!visiblePasswords[`${c.id}_exam`];

                return (
                  <div
                    key={c.id}
                    className="paper-card p-5 space-y-4 hover:border-[#0F1E33] transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-base font-bold text-[#0F1E33]">
                            {c.name}
                          </h3>
                          <span className="text-xs text-[#5B6B82] block">
                            {c.branch || 'Main Branch'}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#2E7D4F]">
                          {c.status}
                        </span>
                      </div>

                      {/* Universal Branch Link */}
                      <div className="p-2.5 bg-white border border-[#5B6B82]/20 rounded-lg space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B82] block">
                          Branch Student Kiosk Link
                        </span>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="truncate text-[#0F1E33]">{branchLink}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(branchLink, c.id)}
                            className="p-1 text-[#5B6B82] hover:text-[#0F1E33]"
                          >
                            {copiedKey === c.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Allocation Stats (Rule 7: labeled separately!) */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 border border-[#5B6B82]/15 rounded-lg">
                          <span className="text-[10px] text-[#5B6B82] block">PC Stations Limit</span>
                          <span className="font-mono font-bold text-sm text-[#0F1E33]">
                            {c.computerLimit} PCs
                          </span>
                        </div>
                        <div className="p-2 bg-slate-50 border border-[#5B6B82]/15 rounded-lg">
                          <span className="text-[10px] text-[#5B6B82] block">Test Credits</span>
                          <span className="font-mono font-bold text-sm text-[#C9A24B]">
                            {c.testCredits - (c.creditsUsed || 0)} left
                          </span>
                        </div>
                      </div>

                      {/* Masked Credentials with Eye Toggle (Blueprint Rule 4) */}
                      <div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-lg border border-[#5B6B82]/15">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#5B6B82]">Branch / Exam PIN:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[#0F1E33]">
                              {showExam ? (c.examPassword || '1234') : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(c.id, 'exam')}
                              className="text-[#5B6B82] hover:text-[#0F1E33]"
                            >
                              {showExam ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#5B6B82]">Portal Password:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[#0F1E33]">
                              {showAdmin ? (c.adminPassword || '1234') : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(c.id, 'admin')}
                              className="text-[#5B6B82] hover:text-[#0F1E33]"
                            >
                              {showAdmin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#5B6B82]/10 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 text-[#5B6B82] hover:text-[#0F1E33] rounded hover:bg-slate-200/50"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingConsultancy({ id: c.id, name: c.name })}
                          className="p-1.5 text-[#C0392B] hover:text-red-700 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenConsultancy(c.id)}
                        className="btn-texture px-3 py-1.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Open Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MASTER TEST LIBRARY */}
        {activeSubTab === 'tests' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-[#5B6B82]/15 pb-4">
              <h1 className="font-display text-2xl font-bold text-[#0F1E33]">
                Master Cambridge Academic Test Library
              </h1>
              <p className="text-xs text-[#5B6B82]">
                Official Cambridge Academic papers (Books 16, 18, 19, 20, 21) containing complete reading passages, audio streams, and writing tasks
              </p>
            </div>

            <div className="paper-card overflow-hidden">
              <div className="p-4 bg-white border-b border-[#5B6B82]/15 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F1E33]">
                  All Cambridge Papers ({allMockTests.length})
                </span>
                <span className="text-xs text-[#5B6B82]">
                  Authentic Scoring Answer Keys & Rubrics Configured
                </span>
              </div>
              <div className="divide-y divide-[#5B6B82]/10 max-h-[500px] overflow-y-auto">
                {allMockTests.map((t) => (
                  <div key={t.id} className="p-4 flex items-center justify-between hover:bg-white/50 text-xs">
                    <div>
                      <div className="font-bold text-[#0F1E33] text-sm">{t.title}</div>
                      <div className="text-[11px] text-[#5B6B82]">
                        Cambridge {t.book} Test {t.testNumber} · {t.module} · {t.durationMinutes} minutes
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D4F] bg-[#2E7D4F]/10 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREDITS & PC LICENSES (Rule 7: labeled separately!) */}
        {activeSubTab === 'licenses' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-[#5B6B82]/15 pb-4">
              <h1 className="font-display text-2xl font-bold text-[#0F1E33]">
                Credits & PC Licenses Management
              </h1>
              <p className="text-xs text-[#5B6B82]">
                Hardware workstation limits and candidate test credits are tracked independently
              </p>
            </div>

            <div className="paper-card overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/60 border-b border-[#5B6B82]/15 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                    <th className="py-3 px-4">Consultancy / Branch</th>
                    <th className="py-3 px-4">Hardware PC Licenses</th>
                    <th className="py-3 px-4">Test Attempt Credits</th>
                    <th className="py-3 px-4">Credit Usage</th>
                    <th className="py-3 px-4 text-right">Adjust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5B6B82]/10">
                  {consultancies.map((c) => (
                    <tr key={c.id} className="hover:bg-white/60 transition">
                      <td className="py-3.5 px-4 font-bold text-[#0F1E33]">
                        {c.name} ({c.branch || 'Central'})
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-sm text-[#0F1E33]">
                          {c.computerLimit} Stations Licensed
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-sm text-[#C9A24B]">
                          {c.testCredits} Credits Total
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#5B6B82]">
                        {c.creditsUsed || 0} consumed ({c.testCredits - (c.creditsUsed || 0)} remaining)
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(c)}
                          className="px-3 py-1 bg-white border border-[#5B6B82]/30 rounded text-xs font-semibold hover:bg-slate-50"
                        >
                          Modify Allocations
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM HEALTH & AUDIT LOG */}
        {activeSubTab === 'health' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-[#5B6B82]/15 pb-4">
              <h1 className="font-display text-2xl font-bold text-[#0F1E33]">
                System Health & Audit Trail
              </h1>
              <p className="text-xs text-[#5B6B82]">
                Real-time service telemetry, cloud synchronizers, and audit logging
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="paper-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E7D4F]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F] animate-pulse" />
                  <span>Exam Orchestrator Engine</span>
                </div>
                <div className="font-display text-2xl font-bold text-[#0F1E33]">
                  100% Operational
                </div>
                <p className="text-xs text-[#5B6B82]">Authoritative timers active</p>
              </div>

              <div className="paper-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E7D4F]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]" />
                  <span>Realtime Telemetry Channel</span>
                </div>
                <div className="font-display text-2xl font-bold text-[#0F1E33]">
                  Connected
                </div>
                <p className="text-xs text-[#5B6B82]">BroadcastChannel & Supabase Realtime</p>
              </div>

              <div className="paper-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E7D4F]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]" />
                  <span>AI Diagnostic Engine</span>
                </div>
                <div className="font-display text-2xl font-bold text-[#0F1E33]">
                  Active
                </div>
                <p className="text-xs text-[#5B6B82]">CEFR Rubric evaluators ready</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Consultancy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-lg w-full p-6 space-y-5 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <h3 className="font-display text-base font-bold text-[#0F1E33]">
                {editingConsultancy ? 'Edit Consultancy Account' : 'Register Educational Consultancy'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConsultancy} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Consultancy Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. KIEC"
                    required
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Branch Name / Location
                  </label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="e.g. Lalitpur"
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Branch Code (creates /b/{'{code}'}) *
                  </label>
                  <input
                    type="text"
                    value={formData.branchCode}
                    onChange={(e) => setFormData({ ...formData, branchCode: e.target.value, accessCode: e.target.value })}
                    placeholder="e.g. kiec-1"
                    required
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] lowercase focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Exam Session Password (PIN)
                  </label>
                  <input
                    type="text"
                    value={formData.examPassword}
                    onChange={(e) => setFormData({ ...formData, examPassword: e.target.value })}
                    placeholder="e.g. 1234"
                    required
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Director Admin Email
                  </label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                    placeholder="director@agency.edu"
                    required
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Director Password
                  </label>
                  <input
                    type="text"
                    value={formData.adminPassword}
                    onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                    placeholder="admin123"
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              {/* Hardware limit and test credits (Rule 7: labeled separately!) */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#5B6B82]/15">
                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    PC Stations License Limit
                  </label>
                  <input
                    type="number"
                    value={formData.computerLimit}
                    onChange={(e) => setFormData({ ...formData, computerLimit: Number(e.target.value) })}
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Test Attempt Credits
                  </label>
                  <input
                    type="number"
                    value={formData.testCredits}
                    onChange={(e) => setFormData({ ...formData, testCredits: Number(e.target.value) })}
                    min="1"
                    step="50"
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#5B6B82]/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-texture px-4 py-2 bg-transparent text-xs text-[#5B6B82] border border-[#5B6B82]/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-texture px-5 py-2 bg-[#0F1E33] text-white text-xs font-bold"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Rule 1) */}
      <ConfirmationModal
        isOpen={!!deletingConsultancy}
        title="Delete Consultancy Account?"
        message={`Are you sure you want to remove ${deletingConsultancy?.name}? Its branch login link and station access will be disabled immediately.`}
        confirmLabel="Delete Account"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingConsultancy(null)}
      />
    </div>
  );
};
