import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Building2,
  Award,
  ArrowRight,
  X,
  BookOpen,
  Headphones,
  Clock,
  CheckCircle,
  AlertCircle,
  Hash
} from 'lucide-react';
import type { IELTSMockTest } from '../../types/ielts';
import type { Consultancy } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface CandidateCheckInModalProps {
  isOpen: boolean;
  test: IELTSMockTest | null;
  onClose: () => void;
  onConfirm: (candidate: {
    name: string;
    candidateId: string;
    targetBand: number;
    consultancyId: string;
    consultancyName: string;
    phone?: string;
    email?: string;
  }) => void;
  initialCandidateName?: string;
  initialConsultancyId?: string;
}

export const CandidateCheckInModal: React.FC<CandidateCheckInModalProps> = ({
  isOpen,
  test,
  onClose,
  onConfirm,
  initialCandidateName = '',
  initialConsultancyId
}) => {
  const consultancies: Consultancy[] = ConsultancyService.getConsultancies();

  const [fullName, setFullName] = useState<string>(() => {
    return (
      initialCandidateName ||
      localStorage.getItem('ielts_candidate_name') ||
      ''
    );
  });

  const [selectedCid, setSelectedCid] = useState<string>(() => {
    if (initialConsultancyId) {
      return initialConsultancyId;
    }
    const saved = localStorage.getItem('ielts_candidate_consultancy_id');
    if (saved && consultancies.some((c) => c.id === saved)) {
      return saved;
    }
    return consultancies[0]?.id || 'apex-global';
  });

  const [candidateId, setCandidateId] = useState<string>(() => {
    const saved = localStorage.getItem('ielts_candidate_id');
    if (saved) return saved;
    return '00' + Math.floor(1000 + Math.random() * 9000);
  });

  const [targetBand, setTargetBand] = useState<number>(() => {
    const saved = localStorage.getItem('ielts_candidate_target_band');
    return saved ? Number(saved) : 7.5;
  });

  const [phone, setPhone] = useState<string>(() => {
    return localStorage.getItem('ielts_candidate_phone') || '';
  });

  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus name input when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isOpen]);

  // Sync initial values if changed
  useEffect(() => {
    if (initialCandidateName) {
      setFullName(initialCandidateName);
    }
  }, [initialCandidateName]);

  useEffect(() => {
    if (initialConsultancyId && consultancies.some((c) => c.id === initialConsultancyId)) {
      setSelectedCid(initialConsultancyId);
    }
  }, [initialConsultancyId]);

  if (!isOpen || !test) return null;

  const isReading = test.module === 'reading';
  const selectedConsultancy = consultancies.find((c) => c.id === selectedCid) || consultancies[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    if (!cleanName) {
      setError('Please enter your full name to proceed with the examination.');
      inputRef.current?.focus();
      return;
    }

    // Persist details for future test sessions
    localStorage.setItem('ielts_candidate_name', cleanName);
    localStorage.setItem('ielts_candidate_consultancy_id', selectedCid);
    localStorage.setItem('ielts_candidate_id', candidateId.trim());
    localStorage.setItem('ielts_candidate_target_band', String(targetBand));
    if (phone.trim()) {
      localStorage.setItem('ielts_candidate_phone', phone.trim());
    }

    onConfirm({
      name: cleanName,
      candidateId: candidateId.trim(),
      targetBand,
      consultancyId: selectedConsultancy?.id || 'apex-global',
      consultancyName: selectedConsultancy?.name || 'IELTS Partner',
      phone: phone.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in">
      <div
        className="bg-white border border-slate-200 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header with Test Identity */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-start justify-between relative shrink-0">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center bg-white p-0.5 shrink-0">
                <img
                  src="/images/masterieltsai-icon.png"
                  alt="Master IELTS AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-extrabold text-slate-200 uppercase tracking-tight">
                MOCK TEST <span className="font-normal text-slate-400 lowercase">from</span> Master IELTS AI
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider">
              {isReading ? <BookOpen className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
              <span>Cambridge IELTS {test.book} • Test {test.testNumber}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Candidate Examination Check-In
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300">
              Please enter your details. Your scores and diagnostic report will be transmitted to your consultancy.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Test Summary Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{test.title}</span>
          </div>
          <div className="flex items-center gap-1 font-mono font-medium text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{test.durationMinutes} mins</span>
          </div>
        </div>

        {/* 3. Check-In Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 text-xs overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Student Full Name (Required) */}
          <div className="space-y-1.5">
            <label className="text-slate-800 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Candidate Full Name</span>
              <span className="text-red-500 font-black">*</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Sujan Sharma"
              className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm font-semibold px-3.5 py-2.5 rounded-xl outline-none shadow-xs transition"
            />
            <p className="text-[11px] text-slate-500">
              This name will be printed on your official IELTS diagnostic evaluation scorecard.
            </p>
          </div>

          {/* Consultancy Portal Selection */}
          <div className="space-y-1.5">
            <label className="text-slate-800 font-bold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Consultancy / Institute Portal</span>
              <span className="text-red-500 font-black">*</span>
            </label>
            <select
              value={selectedCid}
              onChange={(e) => setSelectedCid(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 text-xs font-semibold px-3 py-2.5 rounded-xl outline-none shadow-xs transition cursor-pointer"
            >
              {consultancies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.branch ? `(${c.branch})` : ''}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              All results and CEFR band diagnostics will immediately appear in this consultancy's portal.
            </p>
          </div>

          {/* Candidate ID & Target Band */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold flex items-center gap-1 text-[11px]">
                <Hash className="w-3 h-3 text-slate-400" />
                <span>Candidate ID</span>
              </label>
              <input
                type="text"
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 text-slate-900 font-mono text-xs px-3 py-2 rounded-lg outline-none"
                placeholder="004819"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold flex items-center gap-1 text-[11px]">
                <Award className="w-3 h-3 text-slate-400" />
                <span>Target Band</span>
              </label>
              <select
                value={targetBand}
                onChange={(e) => setTargetBand(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 focus:border-blue-600 text-slate-900 text-xs px-3 py-2 rounded-lg outline-none font-bold text-blue-700"
              >
                <option value={6.0}>Band 6.0 (Competent)</option>
                <option value={6.5}>Band 6.5 (Competent +)</option>
                <option value={7.0}>Band 7.0 (Good User)</option>
                <option value={7.5}>Band 7.5 (Good User +)</option>
                <option value={8.0}>Band 8.0 (Very Good)</option>
                <option value={8.5}>Band 8.5 (Expert)</option>
                <option value={9.0}>Band 9.0 (Expert Native)</option>
              </select>
            </div>
          </div>

          {/* Optional Contact Phone */}
          <div className="space-y-1.5">
            <label className="text-slate-600 font-medium text-[11px] block">
              Phone / Mobile (Optional for SMS scorecard notification)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 98XXXXXXXX"
              className="w-full bg-white border border-slate-200 focus:border-blue-600 text-slate-800 text-xs px-3 py-2 rounded-lg outline-none"
            />
          </div>

          {/* Reassurance Notice */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-[11px] text-emerald-950 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              Upon completion, your raw score, estimated IELTS band, and AI diagnostic report will be instantly archived in the <strong>{selectedConsultancy?.name || 'consultancy'}</strong> administrative dashboard.
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md text-xs"
            >
              <span>Start Examination</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
