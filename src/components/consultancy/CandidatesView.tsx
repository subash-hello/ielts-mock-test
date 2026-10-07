import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Rocket,
  Search,
  X
} from 'lucide-react';
import type { Consultancy, ConsultancyStudent } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface CandidatesViewProps {
  consultancy: Consultancy;
  students: ConsultancyStudent[];
  onOpenAssignTest: () => void;
  onRefresh: () => void;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  consultancy,
  students,
  onOpenAssignTest,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<ConsultancyStudent | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetBand, setTargetBand] = useState<string>('');

  // Delete modal state
  const [deletingStudent, setDeletingStudent] = useState<ConsultancyStudent | null>(null);
  const [alsoDeleteResults, setAlsoDeleteResults] = useState(true);

  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.candidateNumber.toLowerCase().includes(search.toLowerCase()) ||
      (s.email && s.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setPhone('');
    setTargetBand('');
    setEditingStudent(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (cand: ConsultancyStudent) => {
    setName(cand.fullName);
    setEmail(cand.email || '');
    setPhone(cand.phone || '');
    setTargetBand(cand.targetBand && cand.targetBand > 0 ? String(cand.targetBand) : '');
    setEditingStudent(cand);
    setShowAddModal(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingStudent) {
      // Edit student
      ConsultancyService.updateStudent(consultancy.id, editingStudent.id, {
        fullName: name.trim(),
        email: email.trim() || '',
        phone: phone.trim() || '',
        targetBand: targetBand ? Number(targetBand) : 0,
      });
    } else {
      // Add student
      ConsultancyService.addStudent(consultancy.id, {
        fullName: name.trim(),
        email: email.trim() || '',
        phone: phone.trim() || '',
        targetBand: targetBand ? Number(targetBand) : 0,
      });
    }

    setShowAddModal(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingStudent) return;

    // Delete candidate with cascade support for results and AI reports (QA-03)
    ConsultancyService.deleteStudent(consultancy.id, deletingStudent.id, alsoDeleteResults);

    setDeletingStudent(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Candidate Registry
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Student Candidates
          </h1>
          <p className="text-xs text-[#5B6B82]">
            {students.length} pre-registered candidates with test attempt histories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAssignTest}
            className="btn-texture px-4 py-2 bg-white hover:bg-slate-50 text-[#0F1E33] border border-[#5B6B82]/30 text-xs font-semibold shadow-2xs flex items-center gap-1.5"
            title="Open lab-wide or per-student Launch Console (Mode B)"
          >
            <Rocket className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Open Launch Console</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-[#5B6B82] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or candidate ID..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
          />
        </div>
      </div>

      {/* Candidates Table (Blueprint 6.9) */}
      <div className="paper-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/60 border-b border-[#5B6B82]/15 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Candidate ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Target Band</th>
                <th className="py-3 px-4">Tests Completed</th>
                <th className="py-3 px-4">Highest / Avg</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B6B82]/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#5B6B82]">
                    No candidates found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((cand) => (
                  <tr key={cand.id} className="hover:bg-white/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0F1E33]">
                      #{cand.candidateNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0F1E33]">{cand.fullName}</div>
                      {cand.email && (
                        <div className="text-[11px] text-[#5B6B82]">{cand.email}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {cand.targetBand > 0 ? (
                        <span className="font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                          Band {cand.targetBand}
                        </span>
                      ) : (
                        <span className="text-[#5B6B82]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {cand.testsCompletedCount} tests
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-[#2E7D4F]">
                        {cand.highestBand > 0 ? cand.highestBand.toFixed(1) : '—'}
                      </span>
                      <span className="text-[#5B6B82] ml-1.5">
                        / {cand.averageBand > 0 ? cand.averageBand.toFixed(1) : '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cand)}
                          className="p-1.5 text-[#5B6B82] hover:text-[#0F1E33] rounded hover:bg-slate-200/50"
                          title="Edit Candidate"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingStudent(cand)}
                          className="p-1.5 text-[#C0392B] hover:text-red-700 rounded hover:bg-red-50"
                          title="Delete Candidate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <h3 className="font-display text-base font-bold text-[#0F1E33]">
                {editingStudent ? 'Edit Candidate Record' : 'Register New Candidate'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#0F1E33] mb-1">
                  Candidate Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  required
                  autoFocus
                  className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0F1E33] mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0F1E33] mb-1">
                  Target Band (Optional)
                </label>
                <select
                  value={targetBand}
                  onChange={(e) => setTargetBand(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-[#C9A24B]"
                >
                  <option value="">— No Target Band (Optional) —</option>
                  <option value="6.0">Band 6.0</option>
                  <option value="6.5">Band 6.5</option>
                  <option value="7.0">Band 7.0</option>
                  <option value="7.5">Band 7.5</option>
                  <option value="8.0">Band 8.0</option>
                  <option value="8.5">Band 8.5</option>
                  <option value="9.0">Band 9.0</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#5B6B82]/10">
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
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Candidate Confirmation Modal */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3]">
            <h3 className="font-display text-lg font-bold text-[#0F1E33]">
              Delete Candidate {deletingStudent.fullName}?
            </h3>
            <p className="text-sm text-[#5B6B82] leading-relaxed">
              Are you sure you want to remove <strong className="text-[#0F1E33]">{deletingStudent.fullName}</strong> (#{deletingStudent.candidateNumber}) from the consultancy registry?
            </p>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-900">
                <input
                  type="checkbox"
                  checked={alsoDeleteResults}
                  onChange={(e) => setAlsoDeleteResults(e.target.checked)}
                  className="w-4 h-4 accent-[#0F1E33]"
                />
                <span>Also remove all historical test results and AI reports for this student?</span>
              </label>
              <p className="text-[11px] text-amber-800 pl-6">
                Recommended to maintain clean records and remove unlinked historical tests.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingStudent(null)}
                className="btn-texture px-4 py-2 bg-transparent text-xs text-[#5B6B82] border border-[#5B6B82]/30"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="btn-texture px-5 py-2 bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-bold"
              >
                Delete Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
