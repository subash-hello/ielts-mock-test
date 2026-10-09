import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  affectedCount?: number;
  affectedLabel?: string;
  warningNote?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  isDestructive = true,
  affectedCount,
  affectedLabel = 'affected items',
  warningNote,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E33]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FAF8F3] border border-[#5B6B82]/20 rounded-xl shadow-2xl max-w-md w-full overflow-hidden p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${isDestructive ? 'bg-[#C0392B]/10 text-[#C0392B]' : 'bg-[#C9A24B]/10 text-[#C9A24B]'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#0F1E33]">{title}</h3>
              {typeof affectedCount === 'number' && (
                <span className="inline-block mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-[#0F1E33]">
                  {affectedCount} {affectedLabel}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-[#5B6B82] hover:text-[#0F1E33] p-1.5 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#5B6B82] leading-relaxed">
          {message}
        </p>

        {warningNote && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{warningNote}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#5B6B82]/15">
          <button
            type="button"
            onClick={onCancel}
            className="btn-texture px-4 py-2 text-sm text-[#5B6B82] hover:text-[#0F1E33] bg-transparent border border-[#5B6B82]/30 hover:bg-slate-200/50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`btn-texture px-5 py-2 text-sm text-white font-semibold shadow-sm ${
              isDestructive
                ? 'bg-[#C0392B] hover:bg-[#A93226]'
                : 'bg-[#0F1E33] hover:bg-[#1A2E4B]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
