import React, { useState, useRef, useEffect } from 'react';
import {
  Highlighter,
  Edit3,
  X,
  Check,
  Trash2,
  StickyNote,
  ChevronDown,
  Type
} from 'lucide-react';
import type { CandidateAnswers, ExamSettings, IELTSMockTest, IELTSQuestionGroup } from '../../types/ielts';

interface ReadingExamViewProps {
  test: IELTSMockTest;
  currentQuestion: number;
  answers: CandidateAnswers;
  onAnswerChange: (qNum: number, value: string | string[]) => void;
  settings: ExamSettings;
  activePassageIndex: number;
  onSelectPassage: (index: number) => void;
  onSelectQuestion: (qNum: number) => void;
}

export const ReadingExamView: React.FC<ReadingExamViewProps> = ({
  test,
  currentQuestion,
  answers,
  onAnswerChange,
  settings,
  activePassageIndex,
  onSelectPassage,
  onSelectQuestion
}) => {
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const passagePaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  // Input mode: 'select' (dropdown) vs 'type' (direct text) per question
  const [inputModes, setInputModes] = useState<Record<number, 'select' | 'type'>>({});

  // Text selection popover state (Highlight / Note options)
  const [selectionPopover, setSelectionPopover] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
    savedRange?: Range;
  }>({ visible: false, x: 0, y: 0, text: '' });

  // Floating Note Modal for creating / editing notes
  const [noteModal, setNoteModal] = useState<{
    visible: boolean;
    highlightId: string;
    passageExcerpt: string;
    currentNote: string;
    savedRange?: Range;
  }>({ visible: false, highlightId: '', passageExcerpt: '', currentNote: '' });

  // Popover when clicking an existing highlight
  const [highlightClickPopover, setHighlightClickPopover] = useState<{
    visible: boolean;
    x: number;
    y: number;
    highlightEl: HTMLElement | null;
    highlightId: string;
  }>({ visible: false, x: 0, y: 0, highlightEl: null, highlightId: '' });

  // Persistent notes dictionary { [highlightId]: noteText }
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [highlightCount, setHighlightCount] = useState<number>(0);

  const activeSection = test.sections[activePassageIndex] || test.sections[0];
  const [mobileReadingTab, setMobileReadingTab] = useState<'passage' | 'questions'>('passage');
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to selected question in right pane
  useEffect(() => {
    if (isMobile) {
      setMobileReadingTab('questions');
    }
    const el = document.getElementById(`q-box-${currentQuestion}`);
    if (el && rightPaneRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentQuestion, isMobile]);

  // Update highlight count whenever passage changes
  const updateHighlightCount = () => {
    setTimeout(() => {
      if (passagePaneRef.current) {
        const count = passagePaneRef.current.querySelectorAll('.ielts-highlight').length;
        setHighlightCount(count);
      }
    }, 60);
  };

  useEffect(() => {
    setSelectionPopover({ visible: false, x: 0, y: 0, text: '' });
    setHighlightClickPopover({ visible: false, x: 0, y: 0, highlightEl: null, highlightId: '' });
    updateHighlightCount();
  }, [activePassageIndex, test.id]);

  // Drag resizer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
      if (newPercent >= 25 && newPercent <= 75) {
        setLeftWidthPercent(newPercent);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Handle text selection in passage
  const handlePassageMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setSelectionPopover((prev) => ({ ...prev, visible: false }));
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (passagePaneRef.current && passagePaneRef.current.contains(range.commonAncestorContainer)) {
        setSelectionPopover({
          visible: true,
          x: Math.max(30, rect.left + rect.width / 2),
          y: Math.max(10, rect.top - 44),
          text: selection.toString(),
          savedRange: range.cloneRange()
        });
      }
    } catch {
      setSelectionPopover((prev) => ({ ...prev, visible: false }));
    }
  };

  // Apply yellow highlight
  const applyHighlight = () => {
    const range = selectionPopover.savedRange || window.getSelection()?.getRangeAt(0);
    if (!range) return;
    const highlightId = `hl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const mark = document.createElement('mark');
    mark.className = 'ielts-highlight';
    mark.setAttribute('data-highlight-id', highlightId);
    mark.textContent = range.toString();

    try {
      range.deleteContents();
      range.insertNode(mark);
      window.getSelection()?.removeAllRanges();
      setSelectionPopover({ visible: false, x: 0, y: 0, text: '' });
      updateHighlightCount();
    } catch (err) {
      console.warn('Highlight insertion error:', err);
    }
  };

  // Open note modal from selection
  const openNoteModal = () => {
    const range = selectionPopover.savedRange || window.getSelection()?.getRangeAt(0);
    const text = selectionPopover.text;
    const highlightId = `hl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setNoteModal({
      visible: true,
      highlightId,
      passageExcerpt: text,
      currentNote: '',
      savedRange: range ? range.cloneRange() : undefined
    });
    setSelectionPopover({ visible: false, x: 0, y: 0, text: '' });
  };

  // Save note & attach sticky badge
  const handleSaveNote = (noteText: string) => {
    if (!noteModal.highlightId) return;
    const id = noteModal.highlightId;

    const existingMark = passagePaneRef.current?.querySelector(`[data-highlight-id="${id}"]`) as HTMLElement | null;

    if (existingMark) {
      if (noteText.trim()) {
        existingMark.classList.add('with-note');
        let badge = existingMark.querySelector('.ielts-note-badge') as HTMLElement | null;
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'ielts-note-badge';
          badge.textContent = '📝';
          badge.title = 'View note';
          existingMark.appendChild(badge);
        }
      } else {
        existingMark.classList.remove('with-note');
        const badge = existingMark.querySelector('.ielts-note-badge');
        if (badge) badge.remove();
      }
    } else if (noteModal.savedRange) {
      const mark = document.createElement('mark');
      mark.className = `ielts-highlight ${noteText.trim() ? 'with-note' : ''}`;
      mark.setAttribute('data-highlight-id', id);
      mark.textContent = noteModal.passageExcerpt;
      if (noteText.trim()) {
        const badge = document.createElement('span');
        badge.className = 'ielts-note-badge';
        badge.textContent = '📝';
        badge.title = 'View note';
        mark.appendChild(badge);
      }
      try {
        noteModal.savedRange.deleteContents();
        noteModal.savedRange.insertNode(mark);
        window.getSelection()?.removeAllRanges();
      } catch (err) {
        console.warn('Note mark insertion error:', err);
      }
    }

    setNotesMap((prev) => ({
      ...prev,
      [id]: noteText.trim()
    }));
    setNoteModal({ visible: false, highlightId: '', passageExcerpt: '', currentNote: '' });
    updateHighlightCount();
  };

  // Handle clicking on an existing highlight in the passage
  const handlePassageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const markEl = target.closest('.ielts-highlight') as HTMLElement | null;

    if (markEl) {
      e.stopPropagation();
      const highlightId = markEl.getAttribute('data-highlight-id') || '';
      const rect = markEl.getBoundingClientRect();
      setHighlightClickPopover({
        visible: true,
        x: Math.max(30, rect.left + rect.width / 2),
        y: Math.max(10, rect.top - 46),
        highlightEl: markEl,
        highlightId
      });
    } else {
      if (highlightClickPopover.visible) {
        setHighlightClickPopover((prev) => ({ ...prev, visible: false }));
      }
    }
  };

  // Remove a single highlight
  const removeHighlight = (markEl: HTMLElement, id: string) => {
    const parent = markEl.parentNode;
    if (!parent) return;
    const noteBadge = markEl.querySelector('.ielts-note-badge');
    if (noteBadge) noteBadge.remove();
    while (markEl.firstChild) {
      parent.insertBefore(markEl.firstChild, markEl);
    }
    parent.removeChild(markEl);
    parent.normalize();

    setNotesMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setHighlightClickPopover({ visible: false, x: 0, y: 0, highlightEl: null, highlightId: '' });
    updateHighlightCount();
  };

  // Clear all highlights in current passage
  const clearAllHighlights = () => {
    if (!passagePaneRef.current) return;
    const marks = passagePaneRef.current.querySelectorAll('.ielts-highlight');
    marks.forEach((m) => {
      const parent = m.parentNode;
      if (!parent) return;
      const noteBadge = m.querySelector('.ielts-note-badge');
      if (noteBadge) noteBadge.remove();
      while (m.firstChild) {
        parent.insertBefore(m.firstChild, m);
      }
      parent.removeChild(m);
      parent.normalize();
    });
    setNotesMap({});
    setHighlightClickPopover({ visible: false, x: 0, y: 0, highlightEl: null, highlightId: '' });
    updateHighlightCount();
  };

  // Word limit parsing & counting helpers
  const parseWordLimit = (rule?: string): number | null => {
    if (!rule) return null;
    const r = rule.toLowerCase();
    if (r.includes('one word') || r.includes('1 word')) return 1;
    if (r.includes('two word') || r.includes('2 word')) return 2;
    if (r.includes('three word') || r.includes('3 word')) return 3;
    return null;
  };

  const countWords = (text: string): number => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Helper to parse blank positions inside question prompt
  const parseReadingBlankPrompt = (prompt: string, qNum: number) => {
    let prefix = '';
    let restOfPrompt = prompt;

    // Check for category prefix: e.g. "Intensive farming: ..." or "Family and early life: •"
    const colonIdx = prompt.indexOf(':');
    const bracketIdx = prompt.indexOf('[');
    if (colonIdx !== -1 && (bracketIdx === -1 || colonIdx < bracketIdx) && colonIdx < 60) {
      prefix = prompt.substring(0, colonIdx).trim();
      restOfPrompt = prompt.substring(colonIdx + 1).trim();
    }

    // 1. Exact match for [ qNum ] or [qNum]
    const qNumRegex = new RegExp(`\\[\\s*${qNum}\\s*\\]`, 'i');
    if (qNumRegex.test(restOfPrompt)) {
      const parts = restOfPrompt.split(qNumRegex);
      return { hasBlank: true, prefix, before: parts[0], after: parts.slice(1).join(`[ ${qNum} ]`) };
    }

    // 2. Exact match for qNum with dots/underscores: e.g. "25……………" or "24_____"
    const qNumDotsRegex = new RegExp(`\\b${qNum}\\s*[…\\._]{2,}`, 'i');
    if (qNumDotsRegex.test(restOfPrompt)) {
      const parts = restOfPrompt.split(qNumDotsRegex);
      return { hasBlank: true, prefix, before: parts[0], after: parts.slice(1).join(`[ ${qNum} ]`) };
    }

    // 3. Any bracket [ \d+ ]
    const anyBracketRegex = /\[\s*\d+\s*\]/;
    if (anyBracketRegex.test(restOfPrompt)) {
      const parts = restOfPrompt.split(anyBracketRegex);
      return { hasBlank: true, prefix, before: parts[0], after: parts.slice(1).join('') };
    }

    // 4. Series of 2 or more dots or underscores: "……………" or "______" or "..."
    const dotsRegex = /([…\._]{2,}|\.{3,})/;
    if (dotsRegex.test(restOfPrompt)) {
      const parts = restOfPrompt.split(dotsRegex);
      return { hasBlank: true, prefix, before: parts[0], after: parts.slice(2).join('') };
    }

    // 5. Empty brackets [ ] or ( )
    const emptyBracketRegex = /\[\s*\]|\(\s*\)/;
    if (emptyBracketRegex.test(restOfPrompt)) {
      const parts = restOfPrompt.split(emptyBracketRegex);
      return { hasBlank: true, prefix, before: parts[0], after: parts.slice(1).join('') };
    }

    return { hasBlank: false, prefix, before: restOfPrompt, after: '' };
  };

  // Helper to render clean prompt text, formatting secondary question numbers
  const renderCleanPromptText = (text: string) => {
    const parts = text.split(/(\[\s*\d+\s*\]|\b\d+\s*[…\._]{2,})/g);
    return parts.map((part, idx) => {
      const numMatch = part.match(/\d+/);
      if (numMatch && (part.includes('[') || part.includes('…') || part.includes('_') || part.includes('.'))) {
        return (
          <span
            key={idx}
            className="inline-block bg-slate-100 text-slate-600 font-mono font-bold text-[11px] px-1.5 py-0.5 rounded border border-slate-300 mx-1 align-baseline select-none"
          >
            [{numMatch[0]}]
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Render continuous narrative Cloze Template (official CD-IELTS Reading style)
  const renderClozeTemplate = (group: IELTSQuestionGroup) => {
    if (!group.clozeTemplate) return null;
    const lines = group.clozeTemplate.split('\n');
    const groupOptions = group.options || group.questions.find((q) => q.options && q.options.length > 0)?.options;

    return (
      <div className="bg-[#fcfcfc] border border-slate-300 rounded-lg p-5 space-y-3.5 leading-relaxed">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-2" />;
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
          const parts = line.split(/(\{\{\s*\d+\s*\}\}|\[\s*\d+\s*\])/g);

          return (
            <div
              key={lIdx}
              className={`flex flex-wrap items-center gap-1.5 leading-loose text-xs sm:text-sm text-slate-900 ${
                isBullet ? 'pl-4' : ''
              }`}
            >
              {parts.map((part, pIdx) => {
                const match = part.match(/(?:\{\{|\b\[)\s*(\d+)\s*(?:\}\}|\])/);
                if (match) {
                  const qNum = parseInt(match[1], 10);
                  const qObj = group.questions.find((q) => q.questionNumber === qNum);
                  const qOptions = qObj?.options || groupOptions;
                  const val = (answers[qNum] as string) || '';
                  const isSelected = currentQuestion === qNum;
                  const isTypeMode = inputModes[qNum] === 'type' || !qOptions || qOptions.length === 0;

                  return (
                    <span key={pIdx} className="inline-flex items-center gap-1.5 align-middle my-1">
                      {/* Question Number Badge */}
                      <span
                        onClick={() => onSelectQuestion(qNum)}
                        className={`inline-flex items-center justify-center font-bold text-xs px-2 py-0.5 rounded-xs select-none cursor-pointer transition ${
                          isSelected
                            ? 'bg-red-600 text-white ring-2 ring-red-300'
                            : val
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        }`}
                      >
                        {qNum}
                      </span>

                      {/* Dropdown Menu or Text Input */}
                      {!isTypeMode && qOptions ? (
                        <div className="relative inline-flex items-center gap-1">
                          <select
                            id={`reading-input-${qNum}`}
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            className={`h-8 pl-2 pr-7 rounded-xs border text-xs sm:text-sm font-semibold transition outline-none cursor-pointer bg-white ${
                              isSelected
                                ? 'border-red-600 ring-1 ring-red-500 text-slate-950 shadow-inner'
                                : val
                                ? 'border-slate-500 text-slate-900'
                                : 'border-slate-400 hover:border-slate-500 text-slate-700'
                            }`}
                          >
                            <option value="">[ Select Option ▼ ]</option>
                            {qOptions.map((opt) => {
                              const optMatch = opt.match(/^([A-Z])[\.\s]+(.*)$/);
                              const letter = optMatch ? optMatch[1] : opt.charAt(0);
                              const text = optMatch ? optMatch[2] : opt;
                              return (
                                <option key={opt} value={letter}>
                                  {letter} – {text}
                                </option>
                              );
                            })}
                          </select>

                          {val && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAnswerChange(qNum, '');
                              }}
                              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                              title="Clear answer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInputModes((prev) => ({ ...prev, [qNum]: 'type' }));
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer text-[10px] flex items-center gap-0.5 border border-slate-200"
                            title="Switch to typing"
                          >
                            <Type className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative inline-flex items-center gap-1">
                          <input
                            id={`reading-input-${qNum}`}
                            type="text"
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                onSelectQuestion(qNum + 1);
                              }
                            }}
                            className={`h-8 px-2.5 rounded-xs border bg-white text-xs sm:text-sm text-slate-900 font-semibold outline-none transition w-36 sm:w-48 inline-flex items-center align-middle ${
                              isSelected
                                ? 'border-red-600 ring-1 ring-red-500 bg-white'
                                : val
                                ? 'border-slate-500 bg-white'
                                : 'border-slate-400 hover:border-slate-600 bg-white'
                            }`}
                          />
                          {val && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAnswerChange(qNum, '');
                              }}
                              className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                              title="Clear answer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {qOptions && qOptions.length > 0 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInputModes((prev) => ({ ...prev, [qNum]: 'select' }));
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer text-[10px] flex items-center gap-0.5 border border-slate-200"
                              title="Switch to dropdown selection"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          )}

                          {/* Live Word Count Alert */}
                          {(() => {
                            const limit = parseWordLimit(group.wordLimitRule);
                            const words = countWords(val);
                            if (limit && words > limit) {
                              return (
                                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1 py-0.5 rounded animate-pulse whitespace-nowrap select-none">
                                  ⚠️ {words}/{limit}w
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      )}
                    </span>
                  );
                }

                return (
                  <span key={pIdx} className="text-slate-800 font-medium">
                    {part}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Render individual fill-in-the-blank questions seamlessly inline
  const renderCompletionQuestions = (group: IELTSQuestionGroup) => {
    // Extract options list if provided (e.g. word bank for summary completion)
    const optionsList = group.options || group.questions.find((q) => q.options && q.options.length > 0)?.options;

    return (
      <div className="space-y-4">
        {/* Word Bank / Options Reference Card */}
        {optionsList && optionsList.length > 0 && (
          <div className="bg-[#f8fafc] border border-slate-300 rounded-lg p-3.5 my-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Options / List of Words:</span>
              <span className="text-[11px] font-normal text-slate-500">
                Click any option to insert into active question
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {optionsList.map((opt) => {
                const match = opt.match(/^([A-Z])[\.\s]+(.*)$/);
                const letter = match ? match[1] : opt.charAt(0);
                const text = match ? match[2] : opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      if (currentQuestion) {
                        onAnswerChange(currentQuestion, text || letter);
                      }
                    }}
                    className="text-left px-2.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 transition flex items-center gap-2 cursor-pointer group shadow-2xs"
                    title={`Click to insert into Question ${currentQuestion}`}
                  >
                    <span className="font-bold text-xs bg-slate-900 text-white w-5 h-5 rounded-xs flex items-center justify-center shrink-0">
                      {letter}
                    </span>
                    <span className="text-xs text-slate-800 font-medium group-hover:text-slate-950 truncate">
                      {text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Questions list with authentic inline cloze inputs */}
        <div className="space-y-3.5">
          {group.questions.map((q) => {
            const qNum = q.questionNumber;
            const isSelected = qNum === currentQuestion;
            const val = (answers[qNum] as string) || '';
            const { hasBlank, prefix, before, after } = parseReadingBlankPrompt(q.prompt, qNum);

            if (hasBlank) {
              const isTypeMode = inputModes[qNum] === 'type' || !optionsList || optionsList.length === 0;

              return (
                <div
                  id={`q-box-${qNum}`}
                  key={qNum}
                  onClick={() => onSelectQuestion(qNum)}
                  className={`p-3.5 rounded-lg border transition ${
                    isSelected
                      ? 'border-red-500 bg-red-50/20 ring-1 ring-red-400/40'
                      : val
                      ? 'border-slate-300 bg-white'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Category prefix if available */}
                  {prefix && (
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                      <span>{prefix}</span>
                    </div>
                  )}

                  {/* Flow sentence with inline dropdown or input directly in the blank */}
                  <div className="text-slate-900 text-xs sm:text-sm font-medium leading-loose">
                    {renderCleanPromptText(before)}
                    <span className="inline-flex items-center gap-1.5 mx-1.5 align-middle">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectQuestion(qNum);
                        }}
                        className={`font-mono font-bold text-xs px-2 py-0.5 rounded-xs select-none cursor-pointer transition ${
                          isSelected
                            ? 'bg-red-600 text-white ring-2 ring-red-300'
                            : val
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        }`}
                      >
                        {qNum}
                      </span>

                      {!isTypeMode && optionsList ? (
                        <div className="relative inline-flex items-center gap-1">
                          <select
                            id={`reading-input-${qNum}`}
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            className={`h-8 pl-2 pr-7 rounded-xs border text-xs sm:text-sm font-semibold transition outline-none cursor-pointer bg-white ${
                              isSelected
                                ? 'border-red-600 ring-1 ring-red-500 text-slate-950 shadow-inner'
                                : val
                                ? 'border-slate-500 text-slate-900'
                                : 'border-slate-400 hover:border-slate-500 text-slate-700'
                            }`}
                          >
                            <option value="">[ Select Option ▼ ]</option>
                            {optionsList.map((opt) => {
                              const match = opt.match(/^([A-Z])[\.\s]+(.*)$/);
                              const letter = match ? match[1] : opt.charAt(0);
                              const text = match ? match[2] : opt;
                              return (
                                <option key={opt} value={letter}>
                                  {letter} – {text}
                                </option>
                              );
                            })}
                          </select>

                          {val && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAnswerChange(qNum, '');
                              }}
                              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                              title="Clear answer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInputModes((prev) => ({ ...prev, [qNum]: 'type' }));
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer text-[10px] flex items-center gap-0.5 border border-slate-200"
                            title="Switch to direct typing"
                          >
                            <Type className="w-3 h-3" />
                            <span className="hidden sm:inline">Type</span>
                          </button>
                        </div>
                      ) : (
                        <div className="relative inline-flex items-center gap-1">
                          <input
                            id={`reading-input-${qNum}`}
                            type="text"
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                onSelectQuestion(qNum + 1);
                              }
                            }}
                            placeholder=""
                            className={`h-8 px-2.5 rounded-xs border text-xs sm:text-sm font-semibold transition outline-none bg-white w-36 sm:w-48 ${
                              isSelected
                                ? 'border-red-600 ring-1 ring-red-500 text-slate-950 shadow-inner'
                                : val
                                ? 'border-slate-500 text-slate-900'
                                : 'border-slate-400 hover:border-slate-500 text-slate-900'
                            }`}
                          />
                          {val && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAnswerChange(qNum, '');
                              }}
                              className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                              title="Clear answer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {optionsList && optionsList.length > 0 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInputModes((prev) => ({ ...prev, [qNum]: 'select' }));
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer text-[10px] flex items-center gap-0.5 border border-slate-200"
                              title="Switch to dropdown menu"
                            >
                              <ChevronDown className="w-3 h-3" />
                              <span className="hidden sm:inline">Menu</span>
                            </button>
                          )}

                          {/* Live Word Count Alert */}
                          {(() => {
                            const limit = parseWordLimit(group.wordLimitRule);
                            const words = countWords(val);
                            if (limit && words > limit) {
                              return (
                                <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-xs inline-flex items-center gap-1 animate-pulse select-none">
                                  ⚠️ {words} words (Limit: {limit})
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      )}
                    </span>
                    {renderCleanPromptText(after)}
                  </div>
                </div>
              );
            }

            // Fallback for short answer or non-templated prompt
            return (
              <div
                id={`q-box-${qNum}`}
                key={qNum}
                onClick={() => onSelectQuestion(qNum)}
                className={`p-3.5 rounded-lg border transition ${
                  isSelected
                    ? 'border-red-500 bg-red-50/20 ring-1 ring-red-400/40'
                    : val
                    ? 'border-slate-300 bg-white'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5 mb-2.5">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded-xs select-none transition ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : val
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {qNum}
                  </span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm leading-relaxed">
                    {q.prompt}
                  </span>
                </div>
                <div className="mt-2 ml-7 flex flex-wrap items-center gap-2">
                  <div className="relative w-full max-w-md">
                    <input
                      id={`reading-input-${qNum}`}
                      type="text"
                      value={val}
                      onChange={(e) => onAnswerChange(qNum, e.target.value)}
                      onFocus={() => onSelectQuestion(qNum)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSelectQuestion(qNum + 1);
                        }
                      }}
                      placeholder="Type answer here..."
                      className="w-full h-8 px-2.5 border border-slate-400 focus:border-red-600 rounded-xs bg-white text-xs sm:text-sm font-semibold text-slate-900 outline-none shadow-inner"
                    />
                    {val && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnswerChange(qNum, '');
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                        title="Clear"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Live Word Count Alert */}
                  {(() => {
                    const limit = parseWordLimit(group.wordLimitRule);
                    const words = countWords(val);
                    if (limit && words > limit) {
                      return (
                        <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded inline-flex items-center gap-1 animate-pulse">
                          ⚠️ {words} words typed (Rule: max {limit} words)
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper to parse option text cleanly without duplicate letters or non-breaking spaces
  const parseOptionItem = (opt: string, fallbackIdx: number = 0) => {
    const clean = opt.replace(/\u00a0/g, ' ').trim();
    if (/^[A-Za-z]$/.test(clean)) {
      const letter = clean.toUpperCase();
      return { letter, text: `Option ${letter}` };
    }
    const match = clean.match(/^([A-Za-z])[.):\s-]+(.*)$/);
    if (match) {
      const letter = match[1].toUpperCase();
      const text = match[2].trim();
      return {
        letter,
        text: text || `Option ${letter}`,
      };
    }
    return {
      letter: String.fromCharCode(65 + fallbackIdx),
      text: clean,
    };
  };

  // Helper to extract shared matching options (features, people, etc.)
  const getGroupMatchingOptions = (group: IELTSQuestionGroup): string[] => {
    if (group.options && group.options.length > 0) {
      return group.options;
    }
    const qWithOpts = group.questions.find((q) => q.options && q.options.length > 0);
    if (qWithOpts && qWithOpts.options && qWithOpts.options.length > 0) {
      return qWithOpts.options;
    }
    return [];
  };

  // Helper to get matching box title
  const getMatchingBoxTitle = (group: IELTSQuestionGroup): string => {
    if (group.summaryTitle) return group.summaryTitle;
    const inst = (group.instructions || '').toLowerCase();
    const title = (group.title || '').toLowerCase();
    if (inst.includes('people') || inst.includes('person') || title.includes('people')) return 'List of People';
    if (inst.includes('expert') || title.includes('expert')) return 'List of Experts';
    if (inst.includes('researcher') || title.includes('researcher') || inst.includes('scientist')) return 'List of Researchers';
    if (inst.includes('concept')) return 'List of Concepts';
    if (inst.includes('finding')) return 'List of Findings';
    if (inst.includes('statement') || inst.includes('description')) return 'List of Descriptions';
    if (inst.includes('feature') || title.includes('feature')) return 'List of Features';
    return 'List of Options';
  };

  // Helper to infer paragraph letters for matching_information without word options
  const getParagraphOptions = (group: IELTSQuestionGroup): string[] => {
    if (group.paragraphOptions && group.paragraphOptions.length > 0) {
      return group.paragraphOptions;
    }
    const match = group.instructions.match(/([A-Z])[\s–-]+([A-Z])/);
    if (match) {
      const startCode = match[1].charCodeAt(0);
      const endCode = match[2].charCodeAt(0);
      if (startCode >= 65 && endCode <= 90 && endCode >= startCode && endCode - startCode < 15) {
        const letters: string[] = [];
        for (let c = startCode; c <= endCode; c++) {
          letters.push(String.fromCharCode(c));
        }
        return letters;
      }
    }
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  };


  // Render unified multi-select questions (e.g. Choose TWO letters, A-E)
  const renderMultiChoiceQuestions = (group: IELTSQuestionGroup) => {
    const qNums = group.questions.map((q) => q.questionNumber);
    const maxSelections = qNums.length;

    // Collect current active selections from answers for this question group
    const currentSelections: string[] = [];
    qNums.forEach((qn) => {
      const a = answers[qn];
      if (typeof a === 'string' && a.trim()) {
        const upper = a.trim().toUpperCase();
        if (!currentSelections.includes(upper)) {
          currentSelections.push(upper);
        }
      } else if (Array.isArray(a)) {
        a.forEach((item) => {
          if (item) {
            const upper = item.trim().toUpperCase();
            if (!currentSelections.includes(upper)) {
              currentSelections.push(upper);
            }
          }
        });
      }
    });

    // Extract clean stem prompt (strip "(First choice)", "(Second choice)", etc.)
    const rawPrompt = group.questions[0]?.prompt || group.instructions;
    const cleanPrompt = rawPrompt
      .replace(/\s*\((First|Second|Third|1st|2nd|3rd)\s*choice\)/gi, '')
      .replace(/\[\s*\d+\s*\]/g, '')
      .trim();

    // All options from the first question with options
    const optionsList =
      group.questions.find((q) => q.options && q.options.length > 0)?.options || [];

    const handleToggle = (letter: string) => {
      let newSelections = [...currentSelections];
      if (newSelections.includes(letter)) {
        newSelections = newSelections.filter((l) => l !== letter);
      } else {
        if (newSelections.length >= maxSelections) {
          newSelections = [...newSelections.slice(1), letter];
        } else {
          newSelections.push(letter);
        }
      }

      // Assign letters in order to questions in this group
      qNums.forEach((qn, idx) => {
        onAnswerChange(qn, newSelections[idx] || '');
      });

      if (newSelections.length > 0 && newSelections.length <= qNums.length) {
        onSelectQuestion(qNums[newSelections.length - 1]);
      } else {
        onSelectQuestion(qNums[0]);
      }
    };

    const isAnySelected = qNums.includes(currentQuestion);

    return (
      <div
        id={`q-box-${qNums[0]}`}
        className={`p-5 rounded-xl border transition ${
          isAnySelected
            ? 'border-red-500 bg-red-50/20 ring-2 ring-red-400/40 shadow-xs'
            : 'border-slate-200 bg-white'
        }`}
      >
        {/* Anchor spans for secondary questions in this group */}
        {qNums.slice(1).map((qn) => (
          <span key={qn} id={`q-box-${qn}`} className="sr-only" />
        ))}

        {/* Target Question Number Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-200 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Questions:
            </span>
            <div className="flex items-center gap-2">
              {qNums.map((qn, idx) => {
                const isCurrent = currentQuestion === qn;
                const assigned = currentSelections[idx] || '';
                return (
                  <button
                    key={qn}
                    type="button"
                    onClick={() => onSelectQuestion(qn)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border transition cursor-pointer ${
                      isCurrent
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : assigned
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span>Q{qn}:</span>
                    {assigned ? (
                      <span className="font-mono text-sm underline decoration-2">{assigned}</span>
                    ) : (
                      <span className="text-slate-400 font-normal italic">Empty</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">
              {currentSelections.length} of {maxSelections} selected
            </span>
            {currentSelections.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  qNums.forEach((qn) => onAnswerChange(qn, ''));
                  onSelectQuestion(qNums[0]);
                }}
                className="text-slate-400 hover:text-red-600 cursor-pointer text-xs ml-1 flex items-center gap-1"
                title="Clear choices"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Question prompt statement */}
        <div className="font-semibold text-slate-900 text-sm leading-relaxed mb-4">
          {cleanPrompt}
        </div>

        {/* Options List with Checkboxes */}
        <div className="space-y-2.5">
          {optionsList.map((opt, oIdx) => {
            const { letter, text } = parseOptionItem(opt, oIdx);
            const isChecked = currentSelections.includes(letter);
            const slotIndex = currentSelections.indexOf(letter);

            return (
              <div
                key={letter}
                onClick={() => handleToggle(letter)}
                className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition select-none ${
                  isChecked
                    ? 'border-slate-900 bg-slate-100 text-slate-950 font-medium shadow-2xs ring-1 ring-slate-900/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800'
                }`}
              >
                {/* Checkbox Icon */}
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                    isChecked
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-400 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                {/* Letter indicator */}
                <span
                  className={`font-mono font-bold text-xs px-2 py-0.5 rounded shrink-0 ${
                    isChecked
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {letter}
                </span>

                {/* Option description */}
                <span className="text-xs sm:text-[13px] leading-relaxed flex-1">
                  {text}
                </span>

                {/* Slot Indicator badge */}
                {isChecked && slotIndex >= 0 && slotIndex < qNums.length && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 shrink-0">
                    Box {qNums[slotIndex]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden cd-ielts-font bg-white">
      {/* Passage Selector Sub-Header */}
      <div className="bg-[#f2f2f2] border-b border-[#cfcfcf] px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 flex items-center justify-between text-xs select-none overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {test.sections.map((sec, idx) => {
            const isActive = idx === activePassageIndex;
            const qStart = idx === 0 ? 1 : idx === 1 ? 14 : 27;
            const qEnd = idx === 0 ? 13 : idx === 1 ? 26 : 40;

            return (
              <button
                key={idx}
                onClick={() => onSelectPassage(idx)}
                className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 font-bold transition rounded-t-md text-xs cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-950 border-t-3 border-red-600 shadow-xs'
                    : 'text-slate-600 hover:text-black hover:bg-slate-200'
                }`}
              >
                Passage {sec.sectionNumber}{' '}
                <span className="hidden sm:inline font-normal opacity-70">
                  (Q {qStart} – {qEnd})
                </span>
              </button>
            );
          })}
        </div>

        {/* Center / Right tools: Layout ratio presets & Highlight counter */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Split Ratio Presets */}
          <div className="hidden md:flex items-center gap-1 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] font-semibold text-slate-600">
            <span className="text-slate-500 mr-0.5">Split:</span>
            <button
              type="button"
              onClick={() => setLeftWidthPercent(50)}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                leftWidthPercent === 50 ? 'bg-slate-200 text-slate-900 font-bold' : 'hover:bg-slate-100'
              }`}
              title="50:50 Balanced Split"
            >
              50:50
            </button>
            <button
              type="button"
              onClick={() => setLeftWidthPercent(60)}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                leftWidthPercent === 60 ? 'bg-slate-200 text-slate-900 font-bold' : 'hover:bg-slate-100'
              }`}
              title="60:40 Wider Passage"
            >
              60:40
            </button>
            <button
              type="button"
              onClick={() => setLeftWidthPercent(40)}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                leftWidthPercent === 40 ? 'bg-slate-200 text-slate-900 font-bold' : 'hover:bg-slate-100'
              }`}
              title="40:60 Wider Questions"
            >
              40:60
            </button>
          </div>

          {/* Highlights & Notes Badge */}
          {highlightCount > 0 && (
            <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-300 px-2 py-0.5 rounded text-[11px] text-yellow-900 font-medium shrink-0">
              <Highlighter className="w-3.5 h-3.5 text-yellow-600" />
              <span>{highlightCount} Highlight{highlightCount > 1 ? 's' : ''}</span>
              <button
                type="button"
                onClick={clearAllHighlights}
                className="ml-1 font-bold underline hover:text-red-700 cursor-pointer"
                title="Remove all highlights from current passage"
              >
                Clear
              </button>
            </div>
          )}

          <div className="text-[11px] text-slate-500 italic hidden lg:block">
            Select text to highlight or add notes
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher (Passage vs Questions) */}
      <div className="md:hidden bg-slate-200 border-b border-slate-300 p-1 flex items-center justify-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setMobileReadingTab('passage')}
          className={`flex-1 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
            mobileReadingTab === 'passage'
              ? 'bg-white text-slate-900 shadow-xs border-b-2 border-red-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📖 Passage {activeSection.sectionNumber}
        </button>
        <button
          type="button"
          onClick={() => setMobileReadingTab('questions')}
          className={`flex-1 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
            mobileReadingTab === 'questions'
              ? 'bg-white text-slate-900 shadow-xs border-b-2 border-red-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ✍️ Questions ({activeSection.sectionNumber === 1 ? '1–13' : activeSection.sectionNumber === 2 ? '14–26' : '27–40'})
        </button>
      </div>

      {/* Main Split Screen Area */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Reading Passage */}
        <div
          ref={passagePaneRef}
          style={isMobile ? undefined : { width: `${leftWidthPercent}%` }}
          onMouseUp={handlePassageMouseUp}
          onClick={handlePassageClick}
          className={`h-full overflow-y-auto p-4 sm:p-6 md:p-8 border-r border-[#cfcfcf] bg-white relative select-text w-full md:w-auto ${
            mobileReadingTab === 'passage' ? 'block' : 'hidden md:block'
          }`}
        >
          <div
            className={`max-w-2xl mx-auto passage-body text-slate-800 ${
              settings.fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-[15.5px] leading-relaxed'
            }`}
          >
            {/* Passage Header */}
            <div className="border-b border-slate-200 pb-4 mb-6 font-sans">
              <span className="text-xs uppercase font-extrabold text-red-600 tracking-wider">
                Reading Passage {activeSection.sectionNumber}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1 leading-snug">
                {activeSection.subtitle || activeSection.title}
              </h2>
              <p className="text-xs text-slate-500 italic mt-2">
                You should spend about 20 minutes on Questions{' '}
                {activeSection.sectionNumber === 1
                  ? '1–13'
                  : activeSection.sectionNumber === 2
                  ? '14–26'
                  : '27–40'}
                , which are based on Reading Passage {activeSection.sectionNumber} below.
              </p>
            </div>

            {/* Passage HTML Content */}
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: activeSection.passageContent || '' }}
            />
          </div>
        </div>

        {/* Text Selection Popover */}
        {selectionPopover.visible && (
          <div
            style={{
              position: 'fixed',
              top: `${selectionPopover.y}px`,
              left: `${selectionPopover.x}px`,
              transform: 'translateX(-50%)',
              zIndex: 100
            }}
            className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-2xl text-xs border border-slate-700 animate-in fade-in"
          >
            <button
              type="button"
              onClick={applyHighlight}
              className="flex items-center gap-1 text-yellow-300 hover:text-yellow-200 font-bold px-1.5 py-0.5 transition cursor-pointer"
            >
              <Highlighter className="w-3.5 h-3.5" />
              <span>Highlight</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              type="button"
              onClick={openNoteModal}
              className="flex items-center gap-1 text-blue-300 hover:text-blue-200 font-bold px-1.5 py-0.5 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Note</span>
            </button>
          </div>
        )}

        {/* Floating Note Dialog Modal */}
        {noteModal.visible && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-slate-300 space-y-3 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                  <StickyNote className="w-4 h-4 text-amber-500" />
                  <span>Candidate Sticky Note</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNoteModal({ visible: false, highlightId: '', passageExcerpt: '', currentNote: '' })}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {noteModal.passageExcerpt && (
                <div className="text-xs bg-slate-50 border-l-3 border-amber-400 p-2.5 rounded text-slate-700 italic line-clamp-3">
                  "{noteModal.passageExcerpt}"
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Your Note:
                </label>
                <textarea
                  autoFocus
                  value={noteModal.currentNote}
                  onChange={(e) => setNoteModal((prev) => ({ ...prev, currentNote: e.target.value }))}
                  placeholder="Type notes or reference question details..."
                  rows={3}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded focus:border-red-600 focus:outline-none bg-white text-slate-900 resize-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setNoteModal({ visible: false, highlightId: '', passageExcerpt: '', currentNote: '' })}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveNote(noteModal.currentNote)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Highlight Click Popover */}
        {highlightClickPopover.visible && highlightClickPopover.highlightEl && (
          <div
            style={{
              position: 'fixed',
              top: `${highlightClickPopover.y}px`,
              left: `${highlightClickPopover.x}px`,
              transform: 'translateX(-50%)',
              zIndex: 100
            }}
            className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-2xl text-xs border border-slate-700 space-y-2 max-w-xs animate-in fade-in"
          >
            {notesMap[highlightClickPopover.highlightId] && (
              <div className="text-amber-200 border-b border-slate-700 pb-1.5 text-[11px] font-sans">
                <span className="font-bold text-amber-300">📝 Note: </span>
                {notesMap[highlightClickPopover.highlightId]}
              </div>
            )}

            <div className="flex items-center gap-2">
              {notesMap[highlightClickPopover.highlightId] ? (
                <button
                  type="button"
                  onClick={() => {
                    const id = highlightClickPopover.highlightId;
                    const text = highlightClickPopover.highlightEl?.textContent?.replace('📝', '').trim() || '';
                    const existing = notesMap[id] || '';
                    setNoteModal({
                      visible: true,
                      highlightId: id,
                      passageExcerpt: text,
                      currentNote: existing
                    });
                    setHighlightClickPopover((prev) => ({ ...prev, visible: false }));
                  }}
                  className="text-blue-300 hover:text-blue-200 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Note</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const id = highlightClickPopover.highlightId;
                    const text = highlightClickPopover.highlightEl?.textContent?.trim() || '';
                    setNoteModal({
                      visible: true,
                      highlightId: id,
                      passageExcerpt: text,
                      currentNote: ''
                    });
                    setHighlightClickPopover((prev) => ({ ...prev, visible: false }));
                  }}
                  className="text-blue-300 hover:text-blue-200 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Add Note</span>
                </button>
              )}

              <span className="text-slate-600">|</span>

              <button
                type="button"
                onClick={() => {
                  if (highlightClickPopover.highlightEl) {
                    removeHighlight(highlightClickPopover.highlightEl, highlightClickPopover.highlightId);
                  }
                }}
                className="text-red-300 hover:text-red-200 font-semibold cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove Highlight</span>
              </button>
            </div>
          </div>
        )}

        {/* Resizer Handle */}
        <div
          onMouseDown={() => setIsDragging(true)}
          className="hidden md:flex w-2.5 bg-[#e4e4e4] hover:bg-red-500 active:bg-red-600 cursor-col-resize items-center justify-center transition select-none z-10 shadow-xs"
          title="Drag to resize passage and questions"
        >
          <div className="w-0.5 h-8 bg-slate-400"></div>
        </div>

        {/* Right Pane: Questions Area */}
        <div
          ref={rightPaneRef}
          style={isMobile ? undefined : { width: `${100 - leftWidthPercent}%` }}
          className={`h-full overflow-y-auto p-3.5 sm:p-6 md:p-8 bg-[#fafafa] w-full md:w-auto ${
            mobileReadingTab === 'questions' ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-8 text-sm">
            {activeSection.questionGroups.map((group) => {
              const isCompletionGroup =
                group.type === 'sentence_completion' ||
                group.type === 'summary_completion' ||
                group.type === 'table_completion' ||
                group.type === 'form_completion' ||
                group.type === 'note_completion' ||
                group.type === 'flow_chart_completion' ||
                group.type === 'diagram_labelling' ||
                group.type === 'short_answer';

              return (
                <div
                  key={group.id}
                  className="bg-white p-6 rounded-xl border border-slate-300 shadow-xs space-y-5"
                >
                  {/* Official CD-IELTS Instruction Header */}
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                      {group.title}
                    </h3>
                    <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                      {group.instructions}
                    </p>
                    {group.wordLimitRule && (
                      <div className="inline-block mt-2 bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-1 rounded text-xs font-bold">
                        {group.wordLimitRule}
                      </div>
                    )}
                  </div>

                  {/* MATCHING HEADINGS LIST BANNER */}
                  {group.type === 'matching_headings' && (() => {
                    const headings = group.headingList || group.options || group.questions[0]?.options || [];
                    if (headings.length === 0) return null;

                    return (
                      <div className="bg-[#fafafa] border border-slate-300 rounded-lg p-4 text-xs space-y-3 my-3 shadow-2xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs">
                            List of Headings
                          </h4>
                          <span className="text-[11px] text-slate-500 font-normal">
                            Click any heading to assign to active question or choose from dropdown below
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5 text-slate-800">
                          {headings.map((hdg, hIdx) => {
                            const romanMatch = hdg.trim().match(/^([ivxIVX]+)[\.\s-]+(.*)$/);
                            const roman = romanMatch ? romanMatch[1].toLowerCase() : hdg.trim().toLowerCase();
                            const text = romanMatch ? romanMatch[2].trim() : hdg.trim();
                            const isSelectedForCurrent = answers[currentQuestion] === roman;
                            const usedByQ = group.questions.find(
                              (q) => (answers[q.questionNumber] as string)?.trim().toLowerCase() === roman
                            )?.questionNumber;

                            return (
                              <div
                                key={hIdx}
                                onClick={() => {
                                  if (currentQuestion >= group.questions[0]?.questionNumber && currentQuestion <= group.questions[group.questions.length - 1]?.questionNumber) {
                                    onAnswerChange(currentQuestion, roman);
                                  }
                                }}
                                className={`p-2.5 rounded border transition cursor-pointer flex items-baseline gap-2.5 ${
                                  isSelectedForCurrent
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                                    : usedByQ
                                    ? 'bg-slate-100 border-slate-300 text-slate-700'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900'
                                }`}
                              >
                                <span
                                  className={`font-mono font-bold text-xs uppercase px-2 py-0.5 rounded-xs shrink-0 ${
                                    isSelectedForCurrent
                                      ? 'bg-white/20 text-white'
                                      : 'bg-slate-100 text-slate-900 border border-slate-300'
                                  }`}
                                >
                                  {roman}
                                </span>
                                <span className="text-xs font-serif leading-relaxed flex-1">
                                  {text}
                                </span>
                                {usedByQ && (
                                  <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                                    isSelectedForCurrent ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                                  }`}>
                                    Question {usedByQ}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* DIAGRAM OR LABEL COMPLETION SVG SCHEMATIC */}
                  {group.type === 'diagram_labelling' && (
                    <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 text-center space-y-3">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                        {group.diagramTitle || 'Technical System Diagram'}
                      </h4>
                      {group.diagramSvg ? (
                        <div
                          className="max-w-md mx-auto overflow-hidden rounded-lg border border-slate-200 bg-white p-2"
                          dangerouslySetInnerHTML={{ __html: group.diagramSvg }}
                        />
                      ) : (
                        <div className="max-w-md mx-auto p-4 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
                          <svg viewBox="0 0 400 180" className="w-full h-auto">
                            <rect x="20" y="20" width="360" height="140" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx="80" cy="90" r="30" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
                            <text x="80" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">PUMP</text>
                            <rect x="160" y="45" width="90" height="90" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                            <text x="205" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">CHAMBER</text>
                            <rect x="290" y="60" width="80" height="60" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
                            <text x="330" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">FILTER</text>
                            <line x1="110" y1="90" x2="160" y2="90" stroke="#64748b" strokeWidth="2" />
                            <line x1="250" y1="90" x2="290" y2="90" stroke="#64748b" strokeWidth="2" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary Title Banner */}
                  {group.summaryTitle && (
                    <div className="bg-slate-100 border border-slate-300 rounded-lg px-4 py-2 font-bold text-slate-900 text-xs text-center uppercase tracking-wide">
                      {group.summaryTitle}
                    </div>
                  )}

                  {/* 1. CLOZE TEMPLATE COMPLETION (if template text provided) */}
                  {group.clozeTemplate ? (
                    renderClozeTemplate(group)
                  ) : isCompletionGroup ? (
                    /* 2. AUTHENTIC INLINE COMPLETION FOR SENTENCE, SUMMARY, NOTE, TABLE */
                    renderCompletionQuestions(group)
                  ) : group.type === 'multiple_choice_multi' ? (
                    /* 3. MULTIPLE CHOICE MULTI (e.g. Choose TWO letters) */
                    renderMultiChoiceQuestions(group)
                  ) : (
                    /* 4. MULTIPLE CHOICE, TRUE/FALSE/NOT GIVEN, MATCHING */
                    <div className="space-y-5">
                      {/* MATCHING FEATURES / OPTIONS REFERENCE BOX */}
                      {(() => {
                        const isMatchingGroup =
                          group.type === 'matching_features' ||
                          group.type === 'matching_sentence_endings' ||
                          group.type === 'matching_information';
                        if (!isMatchingGroup) return null;

                        const matchingOpts = getGroupMatchingOptions(group);
                        if (matchingOpts.length === 0) return null;

                        const boxTitle = getMatchingBoxTitle(group);

                        return (
                          <div className="bg-[#fafafa] border border-slate-300 rounded-xl p-4 text-xs space-y-3 mb-4 shadow-2xs">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                              <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs">
                                {boxTitle}
                              </h4>
                              <span className="text-[11px] text-slate-500 font-normal">
                                Click an option to assign to active question or choose from dropdown below
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {matchingOpts.map((opt, idx) => {
                                const { letter, text } = parseOptionItem(opt, idx);
                                const isSelectedForCurrent =
                                  (answers[currentQuestion] as string)?.trim().toUpperCase() === letter;
                                const usedByQ = group.questions.find(
                                  (q) => (answers[q.questionNumber] as string)?.trim().toUpperCase() === letter
                                )?.questionNumber;

                                return (
                                  <div
                                    key={letter}
                                    onClick={() => {
                                      const inRange =
                                        currentQuestion >= group.questions[0]?.questionNumber &&
                                        currentQuestion <= group.questions[group.questions.length - 1]?.questionNumber;
                                      const targetQ = inRange ? currentQuestion : group.questions[0]?.questionNumber;
                                      if (targetQ) {
                                        onSelectQuestion(targetQ);
                                        onAnswerChange(targetQ, letter);
                                      }
                                    }}
                                    className={`p-2.5 rounded-lg border transition cursor-pointer flex items-center gap-2.5 select-none ${
                                      isSelectedForCurrent
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                                        : usedByQ
                                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:border-slate-400'
                                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900'
                                    }`}
                                  >
                                    <span
                                      className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                        isSelectedForCurrent
                                          ? 'bg-white/20 text-white'
                                          : 'bg-slate-900 text-white'
                                      }`}
                                    >
                                      {letter}
                                    </span>
                                    <span className="text-xs font-medium leading-snug flex-1">
                                      {text}
                                    </span>
                                    {usedByQ && (
                                      <span
                                        className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                          isSelectedForCurrent ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                                        }`}
                                      >
                                        Q{usedByQ}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {group.questions.map((q) => {
                        const qNum = q.questionNumber;
                        const isSelected = qNum === currentQuestion;
                        const val = (answers[qNum] as string) || '';

                        return (
                          <div
                            id={`q-box-${qNum}`}
                            key={qNum}
                            onClick={() => onSelectQuestion(qNum)}
                            className={`p-4 rounded-xl border transition cursor-default ${
                              isSelected
                                ? 'border-red-500 bg-red-50/20 ring-2 ring-red-400/40 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            {/* Prompt with question badge */}
                            <div className="flex items-start gap-2.5 mb-3">
                              <span
                                className={`font-mono font-bold text-xs px-2 py-0.5 rounded transition ${
                                  isSelected
                                    ? 'bg-red-600 text-white'
                                    : val
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-200 text-slate-800'
                                }`}
                              >
                                {qNum}
                              </span>
                              <span className="font-semibold text-slate-800 text-xs sm:text-sm leading-relaxed">
                                {q.prompt}
                              </span>
                            </div>

                            {/* TRUE / FALSE / NOT GIVEN and YES / NO / NOT GIVEN */}
                            {(group.type === 'true_false_not_given' || group.type === 'yes_no_not_given') && (
                              <div className="grid grid-cols-3 gap-2 mt-2 ml-7">
                                {(group.type === 'true_false_not_given'
                                  ? ['TRUE', 'FALSE', 'NOT GIVEN']
                                  : ['YES', 'NO', 'NOT GIVEN']
                                ).map((opt) => {
                                  const isChecked = val === opt;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => onAnswerChange(qNum, opt)}
                                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                                        isChecked
                                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                                      }`}
                                    >
                                      {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                                      <span>{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* MULTIPLE CHOICE (Single) */}
                            {group.type === 'multiple_choice' && q.options && (
                              <div className="space-y-2 mt-2 ml-7">
                                {q.options.map((opt, oIdx) => {
                                  const { letter, text } = parseOptionItem(opt, oIdx);
                                  const isChecked = val === letter;

                                  return (
                                    <div
                                      key={letter}
                                      onClick={() => onAnswerChange(qNum, letter)}
                                      className={`p-2.5 rounded-lg border flex items-start gap-3 cursor-pointer transition select-none ${
                                        isChecked
                                          ? 'border-slate-900 bg-slate-100 text-slate-950 font-medium shadow-2xs ring-1 ring-slate-900/10'
                                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                                      }`}
                                    >
                                      <div
                                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition ${
                                          isChecked
                                            ? 'border-slate-900 bg-slate-900 text-white'
                                            : 'border-slate-400 bg-white text-slate-600'
                                        }`}
                                      >
                                        {letter}
                                      </div>
                                      <span className="text-xs sm:text-[13px] leading-relaxed flex-1">
                                        {text}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* MATCHING INFORMATION / MATCHING FEATURES / MATCHING SENTENCE ENDINGS */}
                            {(group.type === 'matching_information' || group.type === 'matching_features' || group.type === 'matching_sentence_endings') && (() => {
                              const matchingOpts = getGroupMatchingOptions(group);
                              const qOpts = (q.options && q.options.length > 0) ? q.options : matchingOpts;
                              const hasOptions = qOpts.length > 0;

                              if (hasOptions) {
                                const parsed = qOpts.map((opt, idx) => parseOptionItem(opt, idx));
                                const selectedOpt = parsed.find((o) => o.letter.toUpperCase() === val.trim().toUpperCase());

                                return (
                                  <div className="mt-2 ml-7 space-y-2.5">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                      {/* Dropdown Selector */}
                                      <select
                                        value={val.toUpperCase()}
                                        onChange={(e) => onAnswerChange(qNum, e.target.value)}
                                        className="w-full sm:w-auto min-w-[260px] max-w-md px-3 py-2 border border-slate-400 rounded-lg bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer shadow-2xs"
                                      >
                                        <option value="">[ Select Option ▼ ]</option>
                                        {parsed.map((opt) => (
                                          <option key={opt.letter} value={opt.letter}>
                                            {opt.letter} – {opt.text}
                                          </option>
                                        ))}
                                      </select>

                                      <span className="text-slate-400 text-xs hidden sm:inline">or click:</span>

                                      {/* Quick letter buttons */}
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        {parsed.map((opt) => {
                                          const isChecked = val.trim().toUpperCase() === opt.letter;
                                          return (
                                            <button
                                              key={opt.letter}
                                              type="button"
                                              onClick={() => onAnswerChange(qNum, opt.letter)}
                                              title={`${opt.letter}: ${opt.text}`}
                                              className={`min-w-8 h-8 px-2 rounded-lg font-bold text-xs border transition flex items-center justify-center cursor-pointer ${
                                                isChecked
                                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                                              }`}
                                            >
                                              {opt.letter}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {val && (
                                        <button
                                          type="button"
                                          onClick={() => onAnswerChange(qNum, '')}
                                          className="p-1 text-slate-400 hover:text-red-600 cursor-pointer text-xs"
                                          title="Clear answer"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>

                                    {selectedOpt ? (
                                      <div className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded border border-slate-300">
                                        <span className="font-bold text-slate-900">Selected:</span>
                                        <span className="font-bold text-red-600">{selectedOpt.letter}</span>
                                        <span>–</span>
                                        <span>{selectedOpt.text}</span>
                                      </div>
                                    ) : val ? (
                                      <div className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded border border-slate-300">
                                        <span className="font-bold text-slate-900">Selected:</span>
                                        <span className="font-bold text-red-600">{val.toUpperCase()}</span>
                                      </div>
                                    ) : null}
                                  </div>
                                );
                              }

                              // Fallback for paragraph matching (when no options list is given)
                              const paragraphLetters = getParagraphOptions(group);

                              return (
                                <div className="mt-2 ml-7 space-y-2.5">
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    {/* Dropdown Selector */}
                                    <select
                                      value={val.toUpperCase()}
                                      onChange={(e) => onAnswerChange(qNum, e.target.value)}
                                      className="px-3 py-1.5 border border-slate-400 rounded-lg bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer shadow-2xs"
                                    >
                                      <option value="">[ Select Paragraph ▼ ]</option>
                                      {paragraphLetters.map((pLetter) => (
                                        <option key={pLetter} value={pLetter}>
                                          Paragraph {pLetter}
                                        </option>
                                      ))}
                                    </select>

                                    <span className="text-slate-400 text-xs hidden sm:inline">or click:</span>

                                    {/* Quick letter buttons */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      {paragraphLetters.map((pLetter) => {
                                        const isChecked = val.trim().toUpperCase() === pLetter;
                                        return (
                                          <button
                                            key={pLetter}
                                            type="button"
                                            onClick={() => onAnswerChange(qNum, pLetter)}
                                            className={`w-8 h-8 rounded-lg font-bold text-xs border transition flex items-center justify-center cursor-pointer ${
                                              isChecked
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                                            }`}
                                          >
                                            {pLetter}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {val && (
                                      <button
                                        type="button"
                                        onClick={() => onAnswerChange(qNum, '')}
                                        className="p-1 text-slate-400 hover:text-red-600 cursor-pointer text-xs"
                                        title="Clear answer"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>

                                  {val && (
                                    <div className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded border border-slate-300">
                                      <span className="font-bold text-slate-900">Selected:</span>
                                      <span>Paragraph {val.toUpperCase()}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}

                            {/* MATCHING HEADINGS (Enhanced Dropdown with Selected Heading indicator) */}
                            {group.type === 'matching_headings' && (() => {
                              const headings = group.headingList || group.options || q.options || [];

                              return (
                                <div className="mt-2 ml-7 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={val.toLowerCase()}
                                      onChange={(e) => onAnswerChange(qNum, e.target.value)}
                                      className="w-full max-w-lg px-3 py-2 border border-slate-400 rounded-lg bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer shadow-inner"
                                    >
                                      <option value="">[ Click to Select Heading ▼ ]</option>
                                      {headings.map((hdg, hIdx) => {
                                        const romanMatch = hdg.trim().match(/^([ivxIVX]+)[\.\s-]+(.*)$/);
                                        const roman = romanMatch ? romanMatch[1].toLowerCase() : hdg.trim().toLowerCase();
                                        const text = romanMatch ? romanMatch[2].trim() : hdg.trim();
                                        const usedByQ = group.questions.find(
                                          (otherQ) =>
                                            otherQ.questionNumber !== qNum &&
                                            (answers[otherQ.questionNumber] as string)?.trim().toLowerCase() === roman
                                        )?.questionNumber;

                                        return (
                                          <option key={hIdx} value={roman}>
                                            {roman}. {text} {usedByQ ? `(Selected in Q${usedByQ})` : ''}
                                          </option>
                                        );
                                      })}
                                    </select>

                                    {val && (
                                      <button
                                        type="button"
                                        onClick={() => onAnswerChange(qNum, '')}
                                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-bold transition cursor-pointer shrink-0"
                                        title="Clear heading selection"
                                      >
                                        ✕ Clear
                                      </button>
                                    )}
                                  </div>

                                  {val && (() => {
                                    const matchedHdg = headings.find((h) => {
                                      const m = h.trim().match(/^([ivxIVX]+)[\.\s-]+(.*)$/);
                                      const r = m ? m[1].toLowerCase() : h.trim().toLowerCase();
                                      return r === val.toLowerCase();
                                    });
                                    const matchText = matchedHdg ? matchedHdg.trim() : val;

                                    return (
                                      <div className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded border border-slate-300">
                                        <span className="font-bold text-slate-900">Current Heading:</span>
                                        <span>{matchText}</span>
                                      </div>
                                    );
                                  })()}
                                </div>
                              );
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
