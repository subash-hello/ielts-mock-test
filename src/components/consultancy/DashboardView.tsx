import React, { useState } from 'react';
import {
  Monitor,
  Rocket,
  QrCode,
  Users,
  Send,
  X,
  PenTool
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import type { TestResult } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { formatTimeSpent, formatRelativeTime } from '../../utils/formatters';

interface DashboardViewProps {
  consultancy: Consultancy;
  stations: LabStation[];
  results: TestResult[];
  onOpenLaunchModeA: () => void;
  onOpenLaunchModeB: () => void;
  onOpenPrintQRs: () => void;
  onOpenPairNewPC: () => void;
  onNavigateToResults?: (filter?: 'all' | 'published' | 'submitted' | 'writing_pending') => void;
  onRefresh: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  consultancy,
  stations,
  results,
  onOpenLaunchModeA,
  onOpenLaunchModeB,
  onOpenPrintQRs,
  onOpenPairNewPC,
  onNavigateToResults,
  onRefresh,
}) => {
  const [selectedStation, setSelectedStation] = useState<LabStation | null>(null);
  const [stationMessage, setStationMessage] = useState('');
  const [messageSentFeedback, setMessageSentFeedback] = useState(false);

  // Compute live lab stats (Blueprint 6.6)
  // An active station heartbeat is within last 45 seconds
  const now = Date.now();
  const getStationLiveState = (st: LabStation): 'in_exam' | 'idle' | 'offline' => {
    const lastHb = st.lastHeartbeat ? new Date(st.lastHeartbeat).getTime() : 0;
    const isRecent = now - lastHb < 45000;

    if (!isRecent) return 'offline';
    if (st.status === 'in_progress' || st.status === 'paused') return 'in_exam';
    return 'idle';
  };

  let inExamCount = 0;
  let idleCount = 0;
  let offlineCount = 0;

  stations.forEach((st) => {
    const state = getStationLiveState(st);
    if (state === 'in_exam') inExamCount++;
    else if (state === 'idle') idleCount++;
    else offlineCount++;
  });

  const connectedCount = inExamCount + idleCount;

  // Compute Today metrics
  const totalSubmissions = results.length;
  const pendingResults = results.filter((r) => !r.isPublished).length;
  const isWritingTest = (r: TestResult) => r.module === 'writing' || !!r.writingSubmission;
  const isUngradedWriting = (r: TestResult) =>
    isWritingTest(r) && (!r.writingSubmission?.overallWritingBand || r.writingSubmission.overallWritingBand === 0);
  const pendingWritingResults = results.filter(isUngradedWriting);

  const scoredResults = results.filter((r) => r.bandScore > 0);
  const avgBand =
    scoredResults.length > 0
      ? (scoredResults.reduce((acc, r) => acc + r.bandScore, 0) / scoredResults.length).toFixed(1)
      : '—';

  // Handle station messaging
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStation || !stationMessage.trim()) return;

    ConsultancyService.sendStationCommand(
      consultancy.id,
      selectedStation.id,
      'BROADCAST_MESSAGE',
      stationMessage.trim()
    );

    setMessageSentFeedback(true);
    setStationMessage('');
    setTimeout(() => setMessageSentFeedback(false), 2500);
  };

  const handleExtendTime = (mins: number) => {
    if (!selectedStation) return;
    ConsultancyService.sendStationCommand(
      consultancy.id,
      selectedStation.id,
      'EXTEND_TIME',
      mins
    );
    alert(`Extended time by ${mins} minutes for ${selectedStation.name}.`);
    onRefresh();
  };

  const handleReleaseStation = () => {
    if (!selectedStation) return;
    if (window.confirm(`Release and reset station ${selectedStation.name}? Any ongoing test will be concluded.`)) {
      ConsultancyService.resetStation(consultancy.id, selectedStation.name);
      setSelectedStation(null);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#5B6B82]/15">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33]">
            {consultancy.name} · Dashboard
          </h1>
          <p className="text-xs text-[#5B6B82] mt-0.5">
            Invigilator overview and active computer lab status
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenLaunchModeA}
            className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-xs font-semibold shadow-xs flex items-center gap-2"
          >
            <Rocket className="w-4 h-4 text-[#C9A24B]" />
            <span>Launch Test</span>
          </button>
        </div>
      </div>

      {/* Pending Writing Evaluation Direct Alert Banner */}
      {pendingWritingResults.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-amber-950">
                  {pendingWritingResults.length} Writing Assessment{pendingWritingResults.length > 1 ? 's' : ''} Awaiting Examiner Evaluation
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-amber-200 text-amber-900 animate-pulse">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-amber-900 mt-0.5">
                Students have submitted Task 1 &amp; Task 2 essays. Official IELTS band scores must be evaluated and awarded manually by the examiner before publication.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToResults?.('writing_pending')}
            className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-bold shrink-0 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Grade Writing Now →</span>
          </button>
        </div>
      )}

      {/* ZONE 1: LAB STATUS (Blueprint 6.6) */}
      <div className="paper-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#5B6B82]/10 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E33]">
              Lab Status
            </h2>
            <span className="text-xs text-[#5B6B82]">
              ({stations.length} configured stations)
            </span>
          </div>

          <div className="text-xs font-semibold text-[#0F1E33] flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]" />
              <span>{connectedCount} connected</span>
            </span>
            <span>·</span>
            <span className="text-[#2E7D4F]">{inExamCount} in exam</span>
            <span>·</span>
            <span className="text-[#C9A24B]">{idleCount} idle</span>
            <span>·</span>
            <span className="text-[#5B6B82]">{offlineCount} offline</span>
          </div>
        </div>

        {/* PC Tiles Grid */}
        {stations.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-sm text-[#5B6B82]">
              No PCs paired yet — scan the desk QR on each lab PC to connect it.
            </p>
            <button
              type="button"
              onClick={onOpenPairNewPC}
              className="btn-texture px-4 py-2 bg-[#0F1E33] text-[#FAF8F3] text-xs font-semibold"
            >
              Pair New PC →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
            {stations.map((st) => {
              const liveState = getStationLiveState(st);
              const candName = st.currentCandidate?.name || '—';
              const remaining = st.remainingSeconds ? formatTimeSpent(st.remainingSeconds) : null;

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStation(st)}
                  className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between min-h-[110px] cursor-pointer group ${
                    liveState === 'in_exam'
                      ? 'border-[#2E7D4F]/40 bg-[#2E7D4F]/5 hover:border-[#2E7D4F] ring-1 ring-[#2E7D4F]/20'
                      : liveState === 'idle'
                      ? 'border-[#C9A24B]/40 bg-[#C9A24B]/5 hover:border-[#C9A24B]'
                      : 'border-[#5B6B82]/20 bg-slate-100/60 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#0F1E33]">
                      {st.name}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        liveState === 'in_exam'
                          ? 'bg-[#2E7D4F] ring-2 ring-[#2E7D4F]/30 animate-pulse'
                          : liveState === 'idle'
                          ? 'bg-[#C9A24B]'
                          : 'bg-slate-400'
                      }`}
                      title={liveState}
                    />
                  </div>

                  <div className="mt-2 space-y-0.5">
                    {liveState === 'in_exam' ? (
                      <>
                        <div className="text-xs font-bold text-[#0F1E33] truncate">
                          {candName}
                        </div>
                        <div className="text-[11px] font-mono text-[#2E7D4F]">
                          {remaining || 'In Exam'}
                        </div>
                      </>
                    ) : liveState === 'idle' ? (
                      <>
                        <div className="text-xs font-semibold text-[#5B6B82]">
                          idle
                        </div>
                        <div className="text-[11px] text-[#C9A24B]">
                          ready to launch
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs font-semibold text-slate-500">
                          offline
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {formatRelativeTime(st.lastHeartbeat)}
                        </div>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="text-right pt-2 border-t border-[#5B6B82]/10">
          <span className="text-[11px] text-[#5B6B82]">
            Offline PCs are never silently dropped — click any tile to view history or message.
          </span>
        </div>
      </div>

      {/* ZONE 2: TODAY (Blueprint 6.6) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="paper-card p-5 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B82]">
            Submissions
          </span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E33]">
            {totalSubmissions}
          </div>
          <p className="text-[11px] text-[#5B6B82]">Completed exam papers</p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToResults?.('writing_pending')}
          className={`paper-card p-5 space-y-1 text-left transition cursor-pointer ${
            pendingWritingResults.length > 0
              ? 'border-2 border-amber-400 bg-amber-50/50 hover:bg-amber-100/70 shadow-xs'
              : 'hover:border-[#C9A24B]'
          }`}
          title="Click to view writing submissions awaiting manual grading"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Pending Writing
            </span>
            {pendingWritingResults.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-amber-900">
            {pendingWritingResults.length}
          </div>
          <p className="text-[11px] text-amber-800">
            {pendingWritingResults.length > 0 ? 'Needs manual examiner band' : 'All writing evaluated'}
          </p>
        </button>

        <div className="paper-card p-5 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B82]">
            Average Band
          </span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#C9A24B]">
            {avgBand}
          </div>
          <p className="text-[11px] text-[#5B6B82]">Scored academic candidates</p>
        </div>

        <div className="paper-card p-5 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B82]">
            Results Pending
          </span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#2E7D4F]">
            {pendingResults}
          </div>
          <p className="text-[11px] text-[#5B6B82]">Awaiting director release</p>
        </div>
      </div>

      {/* ZONE 3: QUICK ACTIONS (Blueprint 6.6) */}
      <div className="paper-card p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1E33]">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={onOpenPairNewPC}
            className="btn-texture p-4 bg-white hover:bg-slate-50 border border-[#5B6B82]/20 text-[#0F1E33] flex items-center justify-between shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F1E33]/5 text-[#0F1E33] flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Pair New PC</div>
                <div className="text-[11px] text-[#5B6B82]">Connect station in &lt;30s</div>
              </div>
            </div>
            <span className="text-[#5B6B82] group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            type="button"
            onClick={onOpenPrintQRs}
            className="btn-texture p-4 bg-white hover:bg-slate-50 border border-[#5B6B82]/20 text-[#0F1E33] flex items-center justify-between shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Print Desk QRs</div>
                <div className="text-[11px] text-[#5B6B82]">1-click sheet generation</div>
              </div>
            </div>
            <span className="text-[#5B6B82] group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            type="button"
            onClick={onOpenLaunchModeB}
            className="btn-texture p-4 bg-white hover:bg-slate-50 border border-[#5B6B82]/20 text-[#0F1E33] flex items-center justify-between shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2E7D4F]/10 text-[#2E7D4F] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Assign Test</div>
                <div className="text-[11px] text-[#5B6B82]">Per-student assignment</div>
              </div>
            </div>
            <span className="text-[#5B6B82] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Station Details Drawer / Modal */}
      {selectedStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-5 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-[#0F1E33]" />
                <h3 className="font-display text-lg font-bold text-[#0F1E33]">
                  Station {selectedStation.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStation(null)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#5B6B82]/10">
                <span className="text-[#5B6B82]">Status</span>
                <span className="font-bold uppercase text-[#0F1E33]">
                  {getStationLiveState(selectedStation)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#5B6B82]/10">
                <span className="text-[#5B6B82]">Candidate</span>
                <span className="font-bold text-[#0F1E33]">
                  {selectedStation.currentCandidate?.name || 'No candidate checked in'}
                </span>
              </div>

              {selectedStation.testTitle && (
                <div className="flex items-center justify-between py-1 border-b border-[#5B6B82]/10">
                  <span className="text-[#5B6B82]">Test Running</span>
                  <span className="font-bold text-[#0F1E33] truncate max-w-[200px]">
                    {selectedStation.testTitle}
                  </span>
                </div>
              )}

              {selectedStation.remainingSeconds !== undefined && (
                <div className="flex items-center justify-between py-1 border-b border-[#5B6B82]/10">
                  <span className="text-[#5B6B82]">Time Remaining</span>
                  <span className="font-mono font-bold text-[#2E7D4F]">
                    {formatTimeSpent(selectedStation.remainingSeconds)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-1">
                <span className="text-[#5B6B82]">Last Seen</span>
                <span className="font-mono text-[#5B6B82]">
                  {formatRelativeTime(selectedStation.lastHeartbeat)}
                </span>
              </div>
            </div>

            {/* Invigilator Actions: Message station */}
            <form onSubmit={handleSendMessage} className="space-y-2 pt-2 border-t border-[#5B6B82]/15">
              <label className="block text-xs font-semibold text-[#0F1E33]">
                Send Message to Station
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={stationMessage}
                  onChange={(e) => setStationMessage(e.target.value)}
                  placeholder="e.g. 5 minutes left"
                  className="flex-1 px-3 py-2 bg-white border border-[#5B6B82]/30 rounded-[10px] text-xs focus:outline-none focus:border-[#C9A24B]"
                />
                <button
                  type="submit"
                  disabled={!stationMessage.trim()}
                  className="btn-texture px-3 py-2 bg-[#0F1E33] text-white text-xs font-semibold disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {messageSentFeedback && (
                <p className="text-[11px] text-[#2E7D4F] font-semibold animate-in fade-in">
                  ✓ Message transmitted to station screen.
                </p>
              )}
            </form>

            {/* Extend Time / Reset Actions */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#5B6B82]/15">
              <button
                type="button"
                onClick={() => handleExtendTime(5)}
                className="btn-texture px-3 py-1.5 bg-white border border-[#5B6B82]/30 text-[#0F1E33] text-xs font-semibold hover:bg-slate-50"
              >
                +5m Time
              </button>
              <button
                type="button"
                onClick={handleReleaseStation}
                className="btn-texture px-3 py-1.5 bg-[#C0392B]/10 hover:bg-[#C0392B]/20 text-[#C0392B] text-xs font-semibold"
              >
                Release Station
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
