import React, { useState } from 'react';
import {
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  X,
  Radio
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';
import { formatTimeSpent } from '../../utils/formatters';

interface LiveMonitorViewProps {
  consultancy: Consultancy;
  stations: LabStation[];
  onRefresh: () => void;
}

export const LiveMonitorView: React.FC<LiveMonitorViewProps> = ({
  consultancy,
  stations,
  onRefresh,
}) => {
  const [selectedStation, setSelectedStation] = useState<LabStation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  // Invigilator actions
  const handleExtendTime = (st: LabStation | 'all', minutes: number) => {
    if (st === 'all') {
      if (window.confirm(`Extend time by ${minutes} minutes for ALL active student stations?`)) {
        ConsultancyService.broadcastStationCommand(consultancy.id, 'EXTEND_TIME', minutes);
        alert(`Extended ${minutes} minutes across all stations.`);
        onRefresh();
      }
    } else {
      ConsultancyService.sendStationCommand(consultancy.id, st.id, 'EXTEND_TIME', minutes);
      alert(`Extended ${minutes} minutes for ${st.name}.`);
      onRefresh();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStation || !messageText.trim()) return;

    ConsultancyService.sendStationCommand(
      consultancy.id,
      selectedStation.id,
      'BROADCAST_MESSAGE',
      messageText.trim()
    );

    setSentNotice(true);
    setMessageText('');
    setTimeout(() => setSentNotice(false), 2500);
  };

  const handleForceSubmit = (st: LabStation) => {
    if (window.confirm(`Force submit exam on ${st.name} for ${st.currentCandidate?.name || 'Candidate'}? Answers will be scored as-is.`)) {
      ConsultancyService.sendStationCommand(consultancy.id, st.id, 'FORCE_SUBMIT');
      setSelectedStation(null);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Mission Control Header */}
      <div className="p-6 rounded-2xl bg-[#0F1E33] text-white border border-[#5B6B82]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Mission Control · Live Invigilator Telemetry</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            Real-Time Station Monitor
          </h1>
          <p className="text-xs text-slate-300">
            Authoritative clock source · Live answer count · Disconnect anomaly detection
          </p>
        </div>

        {/* Global Invigilator Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleExtendTime('all', 5)}
            className="btn-texture px-3.5 py-2 bg-[#FAF8F3]/10 hover:bg-[#FAF8F3]/20 text-white text-xs font-semibold border border-white/20"
          >
            +5m for All
          </button>
          <button
            type="button"
            onClick={() => handleExtendTime('all', 10)}
            className="btn-texture px-3.5 py-2 bg-[#C9A24B] hover:bg-[#B8923A] text-[#0F1E33] text-xs font-bold"
          >
            +10m for All
          </button>
        </div>
      </div>

      {/* PC Stations Live Progress Bar Tiles Grid (Blueprint 6.8) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((st) => {
          const now = Date.now();
          const lastHb = st.lastHeartbeat ? new Date(st.lastHeartbeat).getTime() : 0;
          const isRecent = now - lastHb < 45000;
          const diffMinutes = Math.floor((now - lastHb) / 60000);

          const answered = st.answeredCount || 0;
          const totalQ = st.totalQuestions || 40;
          const pct = Math.min(100, Math.round((answered / totalQ) * 100));

          // Anomaly checks
          const hasInactivityAnomaly = isRecent && diffMinutes >= 5 && st.status === 'in_progress';
          const isEarlySubmit = st.status === 'submitted';

          return (
            <div
              key={st.id}
              className="p-5 rounded-xl bg-[#0F1E33] text-white border border-[#5B6B82]/30 space-y-4 shadow-md transition hover:border-[#C9A24B]/50"
            >
              {/* Header: Station & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black text-[#C9A24B]">
                    {st.name}
                  </span>
                  <span className="text-xs text-slate-300">
                    {st.currentCandidate?.name || '—'}
                  </span>
                </div>

                {/* Status Badge */}
                {st.status === 'in_progress' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>In Exam</span>
                  </span>
                ) : st.status === 'paused' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                    Paused
                  </span>
                ) : st.status === 'submitted' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                    Submitted
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-slate-400">Idle</span>
                )}
              </div>

              {/* Progress Bar (Blueprint 6.8: answered 27/40) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {st.testTitle || 'Mock Examination'}
                  </span>
                  <span className="font-mono font-bold text-white">
                    {answered}/{totalQ} answered ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#C9A24B] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Anomaly Tags (Blueprint 6.8) */}
              {hasInactivityAnomaly && (
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/40 text-[11px] text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>No activity 5 min (possible disconnect)</span>
                </div>
              )}

              {isEarlySubmit && (
                <div className="p-2 rounded bg-cyan-950/60 border border-cyan-500/40 text-[11px] text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Submitted early</span>
                </div>
              )}

              {/* Footer: Time Left & Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>
                    {st.remainingSeconds !== undefined
                      ? formatTimeSpent(st.remainingSeconds)
                      : '—'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedStation(st)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Send message to this PC"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExtendTime(st, 5)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[#C9A24B] font-mono text-[11px] font-bold transition"
                    title="+5 minutes"
                  >
                    +5m
                  </button>
                  <button
                    type="button"
                    onClick={() => handleForceSubmit(st)}
                    className="px-2 py-1 rounded bg-red-950/60 hover:bg-red-900/80 text-red-300 text-[11px] font-bold transition"
                    title="Force Submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Single PC Modal */}
      {selectedStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <h3 className="font-display text-base font-bold text-[#0F1E33]">
                Message Station {selectedStation.name}
              </h3>
              <button
                onClick={() => setSelectedStation(null)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1E33] mb-1">
                  Transmitted message (appears on student screen)
                </label>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="e.g. 5 minutes left — please verify your answers"
                  autoFocus
                  required
                  className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs text-[#0F1E33] focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              {sentNotice && (
                <p className="text-xs text-[#2E7D4F] font-bold">
                  ✓ Message transmitted to station screen.
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStation(null)}
                  className="btn-texture px-4 py-2 bg-transparent text-xs text-[#5B6B82] border border-[#5B6B82]/30"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-texture px-4 py-2 bg-[#0F1E33] text-white text-xs font-bold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
