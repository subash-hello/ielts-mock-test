import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ConsultancyService } from '../../services/consultancyService';
import type { ConsultancyStudent } from '../../types/consultancy';

interface StudentNameViewProps {
  stationName: string;
  consultancyName: string;
  consultancyId: string;
  onContinue: (candidate: { name: string; candidateId: string; targetBand?: number }) => void;
  onSwitchStationOrReset?: () => void;
}

export const StudentNameView: React.FC<StudentNameViewProps> = ({
  stationName,
  consultancyName,
  consultancyId,
  onContinue,
  onSwitchStationOrReset,
}) => {
  const [studentName, setStudentName] = useState('');
  const [targetBand, setTargetBand] = useState<number | undefined>(undefined);
  const [candidateId, setCandidateId] = useState<string>('');
  const [candidatesList, setCandidatesList] = useState<ConsultancyStudent[]>([]);
  const [suggestions, setSuggestions] = useState<ConsultancyStudent[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load pre-registered candidates for autocomplete
    const list = ConsultancyService.getStudents(consultancyId);
    setCandidatesList(list);

    // If station already had an active candidate session, pre-populate to avoid duplicate IDs (QA-01)
    const currentSession = ConsultancyService.getCurrentCandidateSession();
    if (currentSession?.candidateName) {
      setStudentName(currentSession.candidateName);
      setCandidateId(currentSession.candidateId);
      if (currentSession.targetBand) setTargetBand(currentSession.targetBand);
    }

    // Focus input automatically
    inputRef.current?.focus();
  }, [consultancyId]);

  // Handle typing & autocomplete matching
  const handleNameChange = (val: string) => {
    setStudentName(val);
    const clean = val.trim().toLowerCase();
    if (clean.length >= 1) {
      const matches = candidatesList.filter(
        (c) =>
          c.fullName.toLowerCase().includes(clean) ||
          c.candidateNumber.toLowerCase().includes(clean)
      );
      setSuggestions(matches.slice(0, 5));
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCandidate = (cand: ConsultancyStudent) => {
    setStudentName(cand.fullName);
    setCandidateId(cand.candidateNumber);
    setTargetBand(cand.targetBand);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = studentName.trim();
    if (!finalName) return;

    // Check if student already exists in registry to prevent duplicate candidate numbers (QA-01)
    const existing = candidatesList.find(
      (c) => c.fullName.trim().toLowerCase() === finalName.toLowerCase()
    );

    const finalId = candidateId || existing?.candidateNumber || '00' + Math.floor(1000 + Math.random() * 9000);
    const finalTargetBand = targetBand !== undefined ? targetBand : existing?.targetBand;

    onContinue({
      name: finalName,
      candidateId: finalId,
      targetBand: finalTargetBand,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-4 selection:bg-[#C9A24B]/30">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Official Examination Kiosk
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E33]">
            Welcome to your mock test
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Please identify yourself to access your testing session
          </p>
        </div>

        {/* Name Input Box */}
        <div className="paper-card p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="block text-xs font-semibold text-[#0F1E33] mb-1.5">
                Your full name
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={studentName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => {
                    if (studentName.trim().length >= 1 && suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder="e.g. Aarav Sharma"
                  required
                  autoComplete="off"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-white border border-[#5B6B82]/30 rounded-[10px] text-[#0F1E33] placeholder-[#5B6B82]/40 text-base font-medium focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition"
                />
                {candidateId && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#2E7D4F]/10 text-[#2E7D4F]">
                    <Check className="w-3.5 h-3.5" /> ID: {candidateId}
                  </span>
                )}
              </div>

              {/* Autocomplete dropdown (Blueprint 6.2: student taps their name instead of typing fully) */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#5B6B82]/20 rounded-[10px] shadow-lg overflow-hidden z-20 divide-y divide-[#5B6B82]/10 animate-in fade-in">
                  <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-[#5B6B82]">
                    Pre-registered Candidates
                  </div>
                  {suggestions.map((cand) => (
                    <button
                      key={cand.id}
                      type="button"
                      onClick={() => handleSelectCandidate(cand)}
                      className="w-full px-4 py-2.5 text-left hover:bg-[#FAF8F3] flex items-center justify-between transition min-h-[44px]"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#0F1E33]">{cand.fullName}</div>
                        <div className="text-xs text-[#5B6B82]">Candidate #{cand.candidateNumber}</div>
                      </div>
                      {cand.targetBand > 0 && (
                        <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                          Band {cand.targetBand}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!studentName.trim()}
              className="btn-texture w-full min-h-[48px] bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-sm font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Station identifier (Blueprint: small and informational; internal branch codes NOT shown to students) */}
          <div className="pt-3 border-t border-[#5B6B82]/10 flex items-center justify-between text-xs text-[#5B6B82]">
            <span>
              Station <strong className="text-[#0F1E33] font-mono">{stationName}</strong> · {consultancyName}
            </span>
            {onSwitchStationOrReset && (
              <button
                type="button"
                onClick={onSwitchStationOrReset}
                className="text-[11px] text-[#5B6B82] hover:text-[#0F1E33] underline"
              >
                Change
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
