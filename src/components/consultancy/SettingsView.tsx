import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  RefreshCw
} from 'lucide-react';
import type { Consultancy } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface SettingsViewProps {
  consultancy: Consultancy;
  onRefresh: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  consultancy,
  onRefresh,
}) => {
  const [name, setName] = useState(consultancy.name);
  const [branch, setBranch] = useState(consultancy.branch || '');
  const [adminEmail, setAdminEmail] = useState(consultancy.adminEmail || '');
  const [phone, setPhone] = useState(consultancy.phone || '');

  // Passwords (Rule 4: masked by default with show/hide eye toggle)
  const [examPassword, setExamPassword] = useState(consultancy.examPassword || '1234');
  const [showExamPassword, setShowExamPassword] = useState(false);

  const [adminPassword, setAdminPassword] = useState(consultancy.adminPassword || 'admin123');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    ConsultancyService.updateConsultancy(consultancy.id, {
      name: name.trim(),
      branch: branch.trim(),
      adminEmail: adminEmail.trim(),
      phone: phone.trim(),
      examPassword: examPassword.trim(),
      adminPassword: adminPassword.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    onRefresh();
  };

  const handleGenerateNewExamPassword = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setExamPassword(randomCode);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="border-b border-[#5B6B82]/15 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
          Configuration & Credentials
        </span>
        <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
          Branch Settings
        </h1>
        <p className="text-xs text-[#5B6B82]">
          Manage branch credentials, exam session PINs, and laboratory profile
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Branch Profile */}
        <div className="paper-card p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E33] border-b border-[#5B6B82]/10 pb-2">
            Branch Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0F1E33] mb-1">
                Consultancy Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0F1E33] mb-1">
                Branch Location
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. Lalitpur"
                className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0F1E33] mb-1">
                Director Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0F1E33] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>
          </div>
        </div>

        {/* Security & Password Rotation (Rule 4: Masked by default with eye toggle) */}
        <div className="paper-card p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E33] border-b border-[#5B6B82]/10 pb-2">
            Security & Passwords
          </h2>

          <div className="space-y-4 text-xs">
            {/* Exam Session Password Rotation */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-[#0F1E33]">
                  Exam Session Password (PIN)
                </label>
                <button
                  type="button"
                  onClick={handleGenerateNewExamPassword}
                  className="text-[11px] text-[#C9A24B] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Rotate PIN</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showExamPassword ? 'text' : 'password'}
                  value={examPassword}
                  onChange={(e) => setExamPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] pr-10 focus:outline-none focus:border-[#C9A24B]"
                />
                <button
                  type="button"
                  onClick={() => setShowExamPassword(!showExamPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82] hover:text-[#0F1E33]"
                >
                  {showExamPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-[#5B6B82] mt-1">
                Used to unlock student PCs on this branch's login link.
              </p>
            </div>

            {/* Admin Management Password */}
            <div>
              <label className="block font-semibold text-[#0F1E33] mb-1">
                Invigilator / Director Portal Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] pr-10 focus:outline-none focus:border-[#C9A24B]"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82] hover:text-[#0F1E33]"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          {savedSuccess && (
            <span className="text-xs text-[#2E7D4F] font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> Changes saved successfully.
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="btn-texture px-6 py-2.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-bold shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
