import React, { useState } from 'react';
import {
  Building2,
  Monitor,
  Plus,
  ArrowRight,
  TrendingUp,
  Search,
  Trash2,
  Edit,
  X,
  Zap,
  Globe,
  Award,
  LogOut
} from 'lucide-react';
import type { Consultancy, ConsultancyStatus } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

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
  const [consultancies, setConsultancies] = useState<Consultancy[]>(
    ConsultancyService.getConsultancies()
  );
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

  const reloadData = () => {
    setConsultancies(ConsultancyService.getConsultancies());
  };

  const handleOpenAddModal = () => {
    const randomCode = 'PIN-' + Math.floor(1000 + Math.random() * 9000);
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
      branch: c.branch,
      adminEmail: c.adminEmail,
      adminPassword: c.adminPassword || c.examPassword || '1234',
      phone: c.phone,
      accessCode: c.accessCode,
      branchCode: c.branchCode || c.accessCode,
      examPassword: c.examPassword || '1234',
      computerLimit: c.computerLimit,
      testCredits: c.testCredits,
      status: c.status
    });
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const cleanName = formData.name.trim();
    const cleanEmail = formData.adminEmail.trim().toLowerCase();
    const cleanExamPass = (formData.examPassword || '1234').trim();
    const cleanAdminPass = (formData.adminPassword || cleanExamPass || '1234').trim();
    const cleanBranchCode = (formData.branchCode || formData.accessCode).trim().toUpperCase();

    if (editingConsultancy) {
      const updated: Consultancy = {
        ...editingConsultancy,
        ...formData,
        name: cleanName,
        adminEmail: cleanEmail,
        adminPassword: cleanAdminPass,
        examPassword: cleanExamPass,
        branchCode: cleanBranchCode,
        accessCode: cleanBranchCode
      };
      ConsultancyService.saveConsultancy(updated);
    } else {
      const id = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36).slice(-4);
      const newConsultancy: Consultancy = {
        id,
        ...formData,
        name: cleanName,
        adminEmail: cleanEmail,
        adminPassword: cleanAdminPass,
        examPassword: cleanExamPass,
        branchCode: cleanBranchCode,
        accessCode: cleanBranchCode,
        creditsUsed: 0,
        createdAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString()
      };
      ConsultancyService.saveConsultancy(newConsultancy);
    }

    setShowAddModal(false);
    reloadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to deactivate and remove ${name}?`)) {
      ConsultancyService.deleteConsultancy(id);
      reloadData();
    }
  };

  const filtered = consultancies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.accessCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAllowedPCs = consultancies.reduce((sum, c) => sum + c.computerLimit, 0);
  const totalCreditsAllocated = consultancies.reduce((sum, c) => sum + c.testCredits, 0);
  const totalCreditsUsed = consultancies.reduce((sum, c) => sum + c.creditsUsed, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Clean White Professional Header */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between sticky top-0 z-30 shadow-xs gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                IELTS Platform Super Admin
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Network Administration
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage educational consultancies, computer lab licenses, and candidate quotas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Consultancy Network Active</span>
          </div>

          <button
            onClick={onBackToApp}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
          >
            ← Exit to Main Hub
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-red-50 text-xs font-semibold text-red-600 hover:border-red-200 transition cursor-pointer shadow-xs"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-3 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Partner Consultancies</span>
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{consultancies.length}</div>
            <div className="text-xs text-emerald-600 flex items-center gap-1 mt-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>All branches operational</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Total Lab PC Licenses</span>
              <Monitor className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{totalAllowedPCs} PCs</div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              Capacity across all institutions
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Mock Tests Delivered</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{totalCreditsUsed}</div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              {totalCreditsAllocated - totalCreditsUsed} exam credits available
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Scoring Accuracy</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">99.4%</div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              Official Cambridge scale aligned
            </div>
          </div>
        </div>

        {/* Action Header & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by consultancy name, branch, or PIN..."
              className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 text-xs pl-10 pr-4 py-2.5 rounded-lg outline-none placeholder:text-slate-400 shadow-xs"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Consultancy Account</span>
          </button>
        </div>

        {/* Consultancy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-slate-200 hover:border-slate-300 p-6 rounded-xl transition duration-150 shadow-xs flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">
                        {c.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.branch}</span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      c.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Key Lab Specs */}
                <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Branch Code
                    </span>
                    <span className="font-mono font-bold text-blue-700 text-sm">
                      {c.branchCode || c.accessCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Exam Password
                    </span>
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {c.examPassword || '1234'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      PC Limit
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      {c.computerLimit} PCs
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Credits
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      {c.creditsUsed}/{c.testCredits}
                    </span>
                  </div>
                </div>

                {/* Contact info */}
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>✉ {c.adminEmail}</span>
                  <span>🔑 Admin Pass: <strong className="font-mono text-slate-800">{c.adminPassword || c.examPassword || '1234'}</strong></span>
                  <span>📞 {c.phone}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 transition cursor-pointer"
                    title="Edit account details"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete consultancy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onOpenConsultancy(c.id)}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white font-medium text-xs px-4 py-2 rounded-lg transition cursor-pointer shadow-xs"
                >
                  <span>Open Consultancy Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Onboard / Edit Consultancy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 max-w-lg w-full rounded-xl p-6 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  {editingConsultancy ? 'Edit Consultancy Account' : 'Onboard New Educational Consultancy'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Consultancy / Institute Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Global Education"
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Branch / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="e.g. Kathmandu (Bagbazar)"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Branch Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.branchCode || formData.accessCode}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setFormData({ ...formData, branchCode: val, accessCode: val });
                    }}
                    placeholder="e.g. APEX-2026"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono font-bold text-blue-700 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Candidate Exam Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.examPassword}
                    onChange={(e) => setFormData({ ...formData, examPassword: e.target.value })}
                    placeholder="e.g. 1234"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono font-bold text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    For students at PC workstations.
                  </p>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Admin Login Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.adminPassword || ''}
                    onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                    placeholder="e.g. 1234 or admin123"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono font-bold text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    For director / teacher login.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Admin Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.adminEmail}
                    onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                    placeholder="admin@consultancy.com"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+977 1 4241920"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Computer Lab Limit (PCs)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.computerLimit}
                    onChange={(e) => setFormData({ ...formData, computerLimit: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Exam Test Credits
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    value={formData.testCredits}
                    onChange={(e) => setFormData({ ...formData, testCredits: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer transition shadow-xs"
                >
                  {editingConsultancy ? 'Save Changes' : 'Activate Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPortal;
