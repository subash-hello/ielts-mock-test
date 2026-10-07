import React, { useState } from 'react';
import {
  QrCode,
  Printer,
  Copy,
  Check,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import type { Consultancy, LabStation } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';
import { formatRelativeTime } from '../../utils/formatters';

interface PcsViewProps {
  consultancy: Consultancy;
  stations: LabStation[];
  onRefresh: () => void;
}

export const PcsView: React.FC<PcsViewProps> = ({
  consultancy,
  stations,
  onRefresh,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showAddStationModal, setShowAddStationModal] = useState(false);
  const [newStationName, setNewStationName] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mocktest.masterieltsai.com';
  const branchSlug = consultancy.branchCode || consultancy.accessCode || consultancy.id;
  const universalUrl = `${origin}/b/${branchSlug}`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStationName.trim()) return;
    const clean = newStationName.trim().toUpperCase();
    const formatted = clean.startsWith('PC-') ? clean : `PC-${clean.replace(/^PC/i, '')}`;

    ConsultancyService.addStation(consultancy.id, formatted);
    setNewStationName('');
    setShowAddStationModal(false);
    onRefresh();
  };

  const handleDeleteStation = (st: LabStation) => {
    if (window.confirm(`Remove station ${st.name} from this branch?`)) {
      ConsultancyService.deleteStation(consultancy.id, st.id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5B6B82]/15 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            Lab Hardware & Desks
          </span>
          <h1 className="font-display text-2xl font-bold text-[#0F1E33] mt-0.5">
            Paired PCs & Desk QRs
          </h1>
          <p className="text-xs text-[#5B6B82]">
            Connect lab workstations in &lt;30 seconds using universal URLs, direct station links, or desk QR codes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="btn-texture px-4 py-2 bg-[#C9A24B] hover:bg-[#B8923A] text-[#0F1E33] text-xs font-bold shadow-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Desk QRs Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const nextNum = stations.length + 1;
              setNewStationName(`PC-${nextNum.toString().padStart(2, '0')}`);
              setShowAddStationModal(true);
            }}
            className="btn-texture px-4 py-2 bg-[#0F1E33] hover:bg-[#1A2E4B] text-[#FAF8F3] text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Station</span>
          </button>
        </div>
      </div>

      {/* 3 Pairing Paths Cards (Blueprint Section 7) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Path 1: Universal lab link */}
        <div className="paper-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
            <span className="w-5 h-5 rounded-full bg-[#0F1E33] text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Universal Branch Link</span>
          </div>
          <p className="text-xs text-[#5B6B82]">
            One URL for the entire lab. PC asks station name once and remembers it forever.
          </p>
          <div className="p-2.5 bg-white border border-[#5B6B82]/20 rounded-lg flex items-center justify-between text-xs font-mono">
            <span className="truncate text-[#0F1E33]">{universalUrl}</span>
            <button
              type="button"
              onClick={() => handleCopy(universalUrl, 'univ')}
              className="p-1 text-[#5B6B82] hover:text-[#0F1E33]"
              title="Copy link"
            >
              {copiedKey === 'univ' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Path 2: Per-PC direct links */}
        <div className="paper-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
            <span className="w-5 h-5 rounded-full bg-[#0F1E33] text-white flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Per-PC Direct Links</span>
          </div>
          <p className="text-xs text-[#5B6B82]">
            Zero choices, zero mistakes. Direct station URL binds PC identity; enter branch PIN once to pair.
          </p>
          <div className="p-2.5 bg-white border border-[#5B6B82]/20 rounded-lg flex items-center justify-between text-xs font-mono">
            <span className="truncate text-[#0F1E33]">{universalUrl}/pc-01</span>
            <span className="text-[10px] text-[#C9A24B] uppercase font-sans font-bold">Station Link</span>
          </div>
        </div>

        {/* Path 3: Printed desk QRs */}
        <div className="paper-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E33]">
            <span className="w-5 h-5 rounded-full bg-[#0F1E33] text-white flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Printed Desk QRs</span>
          </div>
          <p className="text-xs text-[#5B6B82]">
            Stick a QR sticker on each desk. Any laptop scans to bind that station; enter branch PIN once to authenticate.
          </p>
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="w-full btn-texture py-2 bg-white hover:bg-slate-50 border border-[#5B6B82]/20 text-[#0F1E33] text-xs font-bold flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4 text-[#C9A24B]" />
            <span>Generate QR Sheet</span>
          </button>
        </div>
      </div>

      {/* Paired Stations Table */}
      <div className="paper-card overflow-hidden space-y-0">
        <div className="p-4 bg-white border-b border-[#5B6B82]/15 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F1E33]">
            Configured Stations ({stations.length})
          </h2>
          <span className="text-[11px] text-[#5B6B82]">
            Heartbeat pinged every 15 seconds during active session
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/60 border-b border-[#5B6B82]/15 text-[#5B6B82] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Station ID</th>
                <th className="py-3 px-4">Direct Station URL</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Active Candidate</th>
                <th className="py-3 px-4">Last Seen</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B6B82]/10">
              {stations.map((st) => {
                const pcUrl = `${universalUrl}/${st.name.toLowerCase()}`;
                const now = Date.now();
                const lastHb = st.lastHeartbeat ? new Date(st.lastHeartbeat).getTime() : 0;
                const isOnline = now - lastHb < 45000;

                return (
                  <tr key={st.id} className="hover:bg-white/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#0F1E33]">
                      {st.name}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-mono text-slate-700">
                        <span className="truncate max-w-xs">{pcUrl}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(pcUrl, st.id)}
                          className="p-1 text-[#5B6B82] hover:text-[#0F1E33]"
                          title="Copy direct URL"
                        >
                          {copiedKey === st.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isOnline ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2E7D4F]">
                          <span className="w-2 h-2 rounded-full bg-[#2E7D4F] animate-pulse" />
                          <span>Connected</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#5B6B82]">Offline</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {st.currentCandidate?.name && isOnline && (st.status === 'in_progress' || st.status === 'paused') ? (
                        <span className="font-bold text-[#0F1E33]">
                          {st.currentCandidate.name}
                        </span>
                      ) : (
                        <span className="text-[#5B6B82]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[#5B6B82] font-mono text-[11px]">
                      {formatRelativeTime(st.lastHeartbeat)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteStation(st)}
                        className="p-1.5 text-[#C0392B] hover:text-red-700 rounded hover:bg-red-50"
                        title="Remove Station"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Station Modal */}
      {showAddStationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
          <div className="paper-card max-w-md w-full p-6 space-y-4 bg-[#FAF8F3]">
            <div className="flex items-center justify-between border-b border-[#5B6B82]/15 pb-3">
              <h3 className="font-display text-base font-bold text-[#0F1E33]">
                Add Lab Station
              </h3>
              <button
                type="button"
                onClick={() => setShowAddStationModal(false)}
                className="text-[#5B6B82] hover:text-[#0F1E33] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStation} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#0F1E33] mb-1">
                  Station Name
                </label>
                <input
                  type="text"
                  value={newStationName}
                  onChange={(e) => setNewStationName(e.target.value)}
                  placeholder="e.g. PC-09"
                  autoFocus
                  required
                  className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#5B6B82]/30 rounded-lg text-xs font-mono font-bold text-[#0F1E33] uppercase focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStationModal(false)}
                  className="btn-texture px-4 py-2 bg-transparent text-xs text-[#5B6B82] border border-[#5B6B82]/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-texture px-5 py-2 bg-[#0F1E33] text-white text-xs font-bold"
                >
                  Add Station
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Desk QRs Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/80 backdrop-blur-xs overflow-y-auto">
          <div className="paper-card max-w-4xl w-full p-6 sm:p-8 space-y-6 bg-white my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F1E33]">
                  Printable Desk Cards — {consultancy.name}
                </h3>
                <p className="text-xs text-[#5B6B82]">
                  Print this sheet, cut along borders, and place one card on each student exam desk.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-texture px-5 py-2.5 bg-[#0F1E33] hover:bg-[#1A2E4B] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="text-slate-400 hover:text-slate-700 p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              {stations.map((st) => {
                const targetUrl = `${universalUrl}/${st.name.toLowerCase()}`;
                const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  targetUrl
                )}`;

                return (
                  <div
                    key={st.id}
                    className="p-5 bg-white border-2 border-dashed border-[#0F1E33]/40 rounded-2xl text-center space-y-3 flex flex-col items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#C9A24B]">
                        {consultancy.name}
                      </div>
                      <div className="font-display text-2xl font-black text-[#0F1E33]">
                        {st.name}
                      </div>
                      <div className="text-[10px] text-[#5B6B82]">
                        Computer-Delivered IELTS Station
                      </div>
                    </div>

                    <div className="p-2 bg-white border border-slate-200 rounded-xl shadow-xs">
                      <img
                        src={qrSvgUrl}
                        alt={`QR Code for ${st.name}`}
                        className="w-32 h-32 object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] text-[#5B6B82] leading-tight max-w-[160px]">
                        Scan to begin mock test or visit:
                      </p>
                      <div className="text-[9px] font-mono font-bold text-[#0F1E33] break-all">
                        {targetUrl.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
