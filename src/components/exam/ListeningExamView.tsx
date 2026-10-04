import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Upload,
  AlertCircle,
  ChevronDown,
  Check,
  X,
  ZoomIn,
  MapPin
} from 'lucide-react';
import type { CandidateAnswers, ExamSettings, IELTSMockTest, IELTSQuestionGroup } from '../../types/ielts';

interface ListeningExamViewProps {
  test: IELTSMockTest;
  currentQuestion: number;
  answers: CandidateAnswers;
  onAnswerChange: (qNum: number, value: string | string[]) => void;
  settings: ExamSettings;
  activePartIndex: number;
  onSelectPart: (index: number) => void;
  onSelectQuestion: (qNum: number) => void;
  volume: number;
}

export const ListeningExamView: React.FC<ListeningExamViewProps> = ({
  test,
  currentQuestion,
  answers,
  onAnswerChange,
  settings,
  activePartIndex,
  onSelectPart: _onSelectPart,
  onSelectQuestion,
  volume
}) => {
  const activeSection = test.sections[activePartIndex] || test.sections[0];

  // Build candidate fallback sources for current part
  const getAudioSources = (): string[] => {
    const list: string[] = [];
    const secNum = activeSection?.sectionNumber || activePartIndex + 1;
    const book = test.book;
    const testNum = test.testNumber;

    // 1. Same-origin local static asset served by Vite (instant, 0 latency, 100% reliable)
    if (book === 19) {
      list.push(`/audio/cam19-test${testNum}-part${secNum}.m4a`);
      list.push(`/audio/cam19-test${testNum}-part${secNum}.mp3`);
    } else {
      list.push(`/audio/cam${book}-test${testNum}-part${secNum}.mp3`);
      list.push(`/audio/cam18-test${((testNum - 1) % 4) + 1}-part${secNum}.mp3`);
    }

    // 2. Specific audioUrl configured on section or test
    if (activeSection?.audioUrl) list.push(activeSection.audioUrl);
    if (test.audioUrl) list.push(test.audioUrl);

    // 3. Supabase Storage CDN (Public bucket with Access-Control-Allow-Origin: *)
    if (book === 19) {
      list.push(
        `https://fqwdzxaprsefutccdqns.supabase.co/storage/v1/object/public/ielts-mock-tests/audio/cam19-test${testNum}-part${secNum}.m4a`
      );
    } else {
      list.push(
        `https://fqwdzxaprsefutccdqns.supabase.co/storage/v1/object/public/ielts-mock-tests/audio/cam${book}-test${testNum}-part${secNum}.mp3`
      );
    }

    // 4. Remote upstream fallback
    if (book === 19) {
      list.push(
        `https://ieltstrainingonline.com/wp-content/uploads/2024/07/cam19-test${testNum}-part${secNum}.m4a`
      );
    } else if (book === 20) {
      list.push(
        `https://ieltstrainingonline.com/wp-content/uploads/2025/07/cam20-test${testNum}-part${secNum}.MP3`
      );
    } else if (book === 21) {
      list.push(
        `https://ieltstrainingonline.com/wp-content/uploads/2026/07/cam21-test${testNum}-part${secNum}.MP3`
      );
    } else {
      list.push(
        `https://ieltstrainingonline.com/wp-content/uploads/2023/06/cam18-test${((testNum - 1) % 4) + 1}-part${secNum}.mp3`
      );
    }

    return Array.from(new Set(list.filter((u) => typeof u === 'string' && u.trim().length > 0)));
  };

  const initialSources = getAudioSources();
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1800);
  const [audioSrc, setAudioSrc] = useState<string>(initialSources[0] || '');
  const [audioError, setAudioError] = useState<string | null>(null);
  const [zoomMap, setZoomMap] = useState<{ url: string; title: string } | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mainPaneRef = useRef<HTMLDivElement | null>(null);

  // Unconditionally stop all audio immediately
  const stopAllAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch (err) {
        console.warn('Audio pause error:', err);
      }
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn('Speech cancel error:', err);
      }
    }
    setIsPlaying(false);
  };

  // Switch audio track when part changes or test changes
  useEffect(() => {
    stopAllAudio();
    setCandidateIndex(0);
    const sources = getAudioSources();
    const primarySrc = sources[0] || '';
    setAudioSrc(primarySrc);
    setAudioError(null);
    if (audioRef.current) {
      audioRef.current.src = primarySrc;
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
    setCurrentTime(0);
  }, [activePartIndex, test.id, test.book, test.testNumber]);

  // Handle source fallback
  const advanceToNextSource = (shouldPlay: boolean = true) => {
    const sources = getAudioSources();
    const nextIdx = candidateIndex + 1;
    if (nextIdx < sources.length) {
      setCandidateIndex(nextIdx);
      setAudioSrc(sources[nextIdx]);
      if (audioRef.current) {
        audioRef.current.src = sources[nextIdx];
        audioRef.current.load();
        if (shouldPlay) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setAudioError(null);
            })
            .catch(() => {
              advanceToNextSource(shouldPlay);
            });
        }
      }
    } else {
      setIsPlaying(false);
      setAudioError('Audio playback stream unavailable. Use "Upload MP3" to load recording.');
    }
  };

  // Auto-scroll to active question
  useEffect(() => {
    const el = document.getElementById(`listening-q-box-${currentQuestion}`);
    if (el && mainPaneRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentQuestion]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Toggle playback
  const togglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
      return;
    }

    setAudioError(null);

    if (audioRef.current) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      const sources = getAudioSources();
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        const initial = sources[candidateIndex] || sources[0];
        audioRef.current.src = initial;
        setAudioSrc(initial);
      }

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioError(null);
          })
          .catch((err: any) => {
            console.warn('Audio play failed, advancing to fallback source...', err);
            advanceToNextSource(true);
          });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Handle custom audio file load
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopAllAudio();
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setAudioError(null);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  // Helper to parse word limit rules
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

  // Render Note / Form / Table Cloze Completion
  const renderNoteContent = (group: IELTSQuestionGroup) => {
    if (group.clozeTemplate) {
      const rawLines = group.clozeTemplate.trim().split('\n');

      return (
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-900 leading-loose font-sans max-w-3xl">
          {rawLines.map((rawLine, lIdx) => {
            const line = rawLine.trim();

            if (!line) {
              return <div key={lIdx} className="h-1.5" />;
            }

            const hasPlaceholder = /(\{\{\s*\d+\s*\}\}|\[\s*\d+\s*\])/.test(line);

            if (!hasPlaceholder) {
              const isBullet = line.startsWith('–') || line.startsWith('-') || line.startsWith('•') || line.startsWith('●') || line.startsWith('*');
              const cleanLine = line.replace(/^[–\-•●*]\s*/, '').trim();

              // Check if it's the main heading (first non-empty line or matches summaryTitle)
              const isMainTitle = lIdx === 0 || cleanLine === group.summaryTitle;
              if (isMainTitle) {
                return (
                  <h3 key={lIdx} className="font-bold text-slate-900 text-base sm:text-lg pt-1 pb-0.5">
                    {cleanLine}
                  </h3>
                );
              }

              // Check if it's a section header (e.g. "Tiny Engineers (ages 4-5)")
              const isAgeGroup = /^(Tiny|Junior|Senior|Young|Level|Ages?|Part|Stage)/i.test(cleanLine) || cleanLine.includes('(ages');
              if (isAgeGroup) {
                return (
                  <h4 key={lIdx} className="font-bold text-slate-900 text-sm sm:text-base pt-3 pb-0.5">
                    {cleanLine}
                  </h4>
                );
              }

              // Subsection or label (e.g. "Activities", "Activities:", "Cost:", "Schedule:", "Location:", "Parking:")
              if (cleanLine.endsWith(':') || cleanLine.toLowerCase() === 'activities') {
                return (
                  <div key={lIdx} className="font-medium text-slate-800 text-xs sm:text-sm pt-1">
                    {cleanLine}
                  </div>
                );
              }

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-baseline gap-2 pl-3 sm:pl-4 text-slate-800">
                    <span className="text-slate-500 select-none">•</span>
                    <span>{cleanLine}</span>
                  </div>
                );
              }

              return (
                <div key={lIdx} className="font-semibold text-slate-900">
                  {cleanLine}
                </div>
              );
            }

            // Line with placeholders
            const isBullet = line.startsWith('–') || line.startsWith('-') || line.startsWith('•') || line.startsWith('●') || line.startsWith('*');
            const cleanContent = line.replace(/^[–\-•●*]\s*/, '').trim();
            const parts = cleanContent.split(/(\{\{\s*\d+\s*\}\}|\[\s*\d+\s*\])/g);

            return (
              <div
                key={lIdx}
                className={`flex flex-wrap items-center gap-1.5 leading-loose ${
                  isBullet ? 'pl-3 sm:pl-4' : ''
                }`}
              >
                {isBullet && (
                  <span className="text-slate-500 font-bold select-none mr-0.5">•</span>
                )}
                {parts.map((part, pIdx) => {
                  const match = part.match(/(?:\{\{\s*(\d+)\s*\}\}|\[\s*(\d+)\s*\])/);
                  if (match) {
                    const qNum = parseInt(match[1] || match[2], 10);
                    const val = (answers[qNum] as string) || '';
                    const isSelected = currentQuestion === qNum;

                    return (
                      <span key={pIdx} className="inline-flex items-center align-middle mx-1 my-0.5">
                        {/* Authentic CD-IELTS Question Number Badge */}
                        <span
                          onClick={() => onSelectQuestion(qNum)}
                          className={`inline-flex items-center justify-center font-bold text-xs px-2 py-0.5 border rounded-xs select-none cursor-pointer transition ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : val
                              ? 'border-slate-700 bg-slate-100 text-slate-900 font-bold'
                              : 'border-slate-500 bg-white text-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {qNum}
                        </span>

                        {/* Authentic CD-IELTS Input Box */}
                        <div className="relative inline-flex items-center ml-1">
                          <input
                            id={`listening-q-box-${qNum}`}
                            type="text"
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            className={`h-7.5 px-2 rounded-xs border text-xs sm:text-sm text-slate-900 font-medium outline-none bg-white transition w-36 sm:w-44 ${
                              isSelected
                                ? 'border-slate-900 ring-1 ring-slate-900'
                                : 'border-slate-300 hover:border-slate-500'
                            }`}
                          />

                          {/* Live Word Count Alert */}
                          {(() => {
                            const limit = parseWordLimit(group.wordLimitRule);
                            const words = countWords(val);
                            if (limit && words > limit) {
                              return (
                                <span className="absolute -top-5 right-0 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1 py-0.2 rounded shadow-2xs whitespace-nowrap select-none">
                                  ⚠️ {words}/{limit}w
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </span>
                    );
                  }

                  return (
                    <span key={pIdx} className="text-slate-800 font-medium text-xs sm:text-sm">
                      {part}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }

    // Fallback if no clozeTemplate: render authentic inline note prompts rather than wide cards
    let lastPrefix = '';
    return (
      <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-loose max-w-3xl">
        {group.summaryTitle && (
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
            {group.summaryTitle}
          </h3>
        )}

        {group.questions.map((q) => {
          const qNum = q.questionNumber;
          const val = (answers[qNum] as string) || '';
          const isSelected = currentQuestion === qNum;

          // Check for category prefix like "Junior Engineers (ages 6–8):"
          let promptText = q.prompt;
          let prefix = '';
          const prefixMatch = promptText.match(/^([^:]+):\s*(.*)$/);
          if (prefixMatch && prefixMatch[1].length < 40 && !prefixMatch[1].includes('[')) {
            prefix = prefixMatch[1].trim();
            promptText = prefixMatch[2].trim();
          }

          const showNewPrefix = prefix && prefix !== lastPrefix;
          if (prefix) lastPrefix = prefix;

          const parts = promptText.split(/(\[\s*\d+\s*\]|\{\{\s*\d+\s*\}\}|_{2,})/);

          return (
            <React.Fragment key={qNum}>
              {showNewPrefix && (
                <h4 className="font-bold text-slate-900 text-sm sm:text-base pt-3 pb-0.5">
                  {prefix}
                </h4>
              )}

              <div
                id={`listening-q-box-${qNum}`}
                className="flex flex-wrap items-center gap-1.5 pl-3 sm:pl-4"
              >
                <span className="text-slate-500 font-bold select-none mr-0.5">•</span>

                {parts.length > 1 ? (
                  parts.map((p, pIdx) => {
                    const isBlank = /^(?:\[\s*\d+\s*\]|\{\{\s*\d+\s*\}\}|_{2,})$/.test(p.trim());
                    if (isBlank) {
                      return (
                        <span key={pIdx} className="inline-flex items-center align-middle mx-1 my-0.5">
                          <span
                            onClick={() => onSelectQuestion(qNum)}
                            className={`inline-flex items-center justify-center font-bold text-xs px-2 py-0.5 border rounded-xs select-none cursor-pointer transition ${
                              isSelected
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : val
                                ? 'border-slate-700 bg-slate-100 text-slate-900 font-bold'
                                : 'border-slate-500 bg-white text-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {qNum}
                          </span>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            className={`ml-1 h-7.5 px-2 rounded-xs border text-xs sm:text-sm text-slate-900 font-medium outline-none bg-white transition w-36 sm:w-44 ${
                              isSelected
                                ? 'border-slate-900 ring-1 ring-slate-900'
                                : 'border-slate-300 hover:border-slate-500'
                            }`}
                          />
                        </span>
                      );
                    }
                    return (
                      <span key={pIdx} className="text-slate-800 font-medium">
                        {p}
                      </span>
                    );
                  })
                ) : (
                  <>
                    <span className="text-slate-800 font-medium">{promptText}</span>
                    <span className="inline-flex items-center align-middle mx-1 my-0.5">
                      <span
                        onClick={() => onSelectQuestion(qNum)}
                        className={`inline-flex items-center justify-center font-bold text-xs px-2 py-0.5 border rounded-xs select-none cursor-pointer transition ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : val
                            ? 'border-slate-700 bg-slate-100 text-slate-900 font-bold'
                            : 'border-slate-500 bg-white text-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {qNum}
                      </span>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => onAnswerChange(qNum, e.target.value)}
                        onFocus={() => onSelectQuestion(qNum)}
                        className={`ml-1 h-7.5 px-2 rounded-xs border text-xs sm:text-sm text-slate-900 font-medium outline-none bg-white transition w-36 sm:w-44 ${
                          isSelected
                            ? 'border-slate-900 ring-1 ring-slate-900'
                            : 'border-slate-300 hover:border-slate-500'
                        }`}
                      />
                    </span>
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // Helper to parse option text cleanly without duplicate letters or non-breaking spaces
  const parseOptionItem = (opt: string, fallbackIdx: number = 0) => {
    const clean = opt.replace(/\u00a0/g, ' ').trim();
    const match = clean.match(/^([A-Za-z])[.):\s-]+(.*)$/);
    if (match) {
      return {
        letter: match[1].toUpperCase(),
        text: match[2].trim(),
      };
    }
    return {
      letter: String.fromCharCode(65 + fallbackIdx),
      text: clean,
    };
  };

  // Render Multiple Choice / Multi-Select
  const renderMultipleChoice = (group: IELTSQuestionGroup) => {
    const isMultiGroup =
      group.type === 'multiple_choice_multi' ||
      group.instructions.toLowerCase().includes('two letters') ||
      group.instructions.toLowerCase().includes('three letters');

    if (isMultiGroup) {
      const qNums = group.questions.map((q) => q.questionNumber);
      const maxSelections = qNums.length;

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

      const rawPrompt = group.questions[0]?.prompt || group.instructions;
      const cleanPrompt = rawPrompt
        .replace(/\s*\((First|Second|Third|1st|2nd|3rd)\s*choice\)/gi, '')
        .replace(/\[\s*\d+\s*\]/g, '')
        .trim();

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
          id={`listening-q-box-${qNums[0]}`}
          className={`p-5 rounded-xl border transition ${
            isAnySelected
              ? 'border-red-500 bg-red-50/20 ring-2 ring-red-400/40 shadow-xs'
              : 'border-slate-200 bg-white'
          }`}
        >
          {qNums.slice(1).map((qn) => (
            <span key={qn} id={`listening-q-box-${qn}`} className="sr-only" />
          ))}

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

          <div className="font-semibold text-slate-900 text-sm leading-relaxed mb-4">
            {cleanPrompt}
          </div>

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
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                      isChecked
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-400 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded shrink-0 ${
                      isChecked
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {letter}
                  </span>

                  <span className="text-xs sm:text-[13px] leading-relaxed flex-1">
                    {text}
                  </span>

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
    }

    return (
      <div className="space-y-5">
        {group.questions.map((q) => {
          const qNum = q.questionNumber;
          const currentAns = answers[qNum] as string;
          const isSelected = currentQuestion === qNum;

          return (
            <div
              id={`listening-q-box-${qNum}`}
              key={qNum}
              onClick={() => onSelectQuestion(qNum)}
              className={`p-4 rounded-xl border transition ${
                isSelected
                  ? 'border-red-500 bg-red-50/20 ring-2 ring-red-400/40 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-3">
                <span
                  className={`font-mono font-bold text-xs px-2 py-0.5 rounded select-none shrink-0 ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : currentAns
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {qNum}
                </span>
                <p className="font-semibold text-slate-900 text-xs sm:text-sm leading-relaxed">
                  {q.prompt.replace(/\[\s*\d+\s*\]/, '').trim()}
                </p>
              </div>

              {q.options && (
                <div className="space-y-2 pl-7">
                  {q.options.map((opt, oIdx) => {
                    const { letter, text } = parseOptionItem(opt, oIdx);
                    const isChecked = currentAns === letter;

                    return (
                      <div
                        key={letter}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnswerChange(qNum, letter);
                        }}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs sm:text-[13px] cursor-pointer transition select-none ${
                          isChecked
                            ? 'border-slate-900 bg-slate-100 text-slate-950 font-medium shadow-2xs ring-1 ring-slate-900/10'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                            isChecked
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-400 bg-white text-slate-600'
                          }`}
                        >
                          {letter}
                        </div>
                        <span className="leading-relaxed flex-1">
                          {text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render Map / Plan / Diagram Labelling
  // Render Official CD-IELTS Map / Plan / Diagram Labelling
  const renderMapLabelling = (group: IELTSQuestionGroup) => {
    // 1. Resolve official map image and diagram title
    let mapImage = group.imageUrl;
    let diagramTitle = group.diagramTitle || group.title || 'Plan / Map Reference';

    const cleanSearchStr = (
      (group.title || '') + ' ' +
      (group.diagramTitle || '') + ' ' +
      (activeSection.subtitle || '') + ' ' +
      (group.instructions || '')
    ).toLowerCase();

    if (!mapImage) {
      if (cleanSearchStr.includes('stevenson') || test.id.includes('cambridge-16-test-1')) {
        mapImage = '/images/cambridge16-test1-stevensons-site.png';
        diagramTitle = "Plan of Stevenson's site";
      } else if (cleanSearchStr.includes('farley') || test.id.includes('cambridge-19-test-1')) {
        mapImage = '/images/maps/cam19-test1-farley-house.jpg';
        diagramTitle = 'Farley House and Grounds';
      } else if (cleanSearchStr.includes('housing') || cleanSearchStr.includes('residential') || test.id.includes('cambridge-18-test-2')) {
        mapImage = '/images/maps/cam18-test2-housing-development.jpg';
        diagramTitle = 'New Housing Development Plan';
      } else if (cleanSearchStr.includes('melby') || cleanSearchStr.includes('coal') || test.id.includes('cambridge-21-test-2')) {
        mapImage = '/images/maps/cam21-test2-melby-coal-mine.png';
        diagramTitle = 'Melby Coal Mine';
      }
    }

    // 2. Extract clean single-character letters (A, B, C, D, ...)
    const rawOptions =
      group.options && group.options.length > 0
        ? group.options
        : group.questions[0]?.options && group.questions[0].options.length > 0
        ? group.questions[0].options
        : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    const availableLetters = Array.from(
      new Set(
        rawOptions.map((opt, idx) => {
          const match = opt.trim().match(/^([A-Z])/i);
          return match ? match[1].toUpperCase() : String.fromCharCode(65 + idx);
        })
      )
    ).sort();

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Official IELTS Map / Diagram Graphic */}
          <div className="lg:col-span-6 bg-white border border-slate-300 rounded-lg p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {diagramTitle}
              </h4>
              {mapImage && (
                <button
                  type="button"
                  onClick={() => setZoomMap({ url: mapImage!, title: diagramTitle })}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded hover:bg-slate-100 transition shadow-2xs cursor-pointer"
                  title="Enlarge diagram"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
                  <span>Enlarge Map</span>
                </button>
              )}
            </div>

            <div className="relative border border-slate-200 rounded overflow-hidden bg-white flex items-center justify-center min-h-[260px]">
              {mapImage ? (
                <img
                  src={mapImage}
                  alt={diagramTitle}
                  className="w-full h-auto max-h-[520px] object-contain mx-auto select-none"
                />
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-xs text-slate-600">{diagramTitle}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Official CD-IELTS Radio Selection Matrix Table */}
          <div className="lg:col-span-6 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 bg-white text-xs sm:text-sm select-none shadow-xs rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-300">
                  <th className="py-2.5 px-3 border-r border-slate-300 text-left font-bold text-slate-700 w-40 sm:w-48">
                    {/* Empty corner cell */}
                  </th>
                  {availableLetters.map((l) => (
                    <th
                      key={l}
                      className="py-2.5 px-1 sm:px-2 border-r last:border-r-0 border-slate-300 text-center font-bold text-slate-900 min-w-[28px] sm:min-w-[34px]"
                    >
                      {l}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {group.questions.map((q) => {
                  const qNum = q.questionNumber;
                  const currentVal = ((answers[qNum] as string) || '').trim().toUpperCase();
                  const isSelected = currentQuestion === qNum;
                  const cleanPrompt = q.prompt
                    .replace(/\[\s*\d+\s*\]/, '')
                    .replace(/[…._-]+/g, '')
                    .trim();

                  return (
                    <tr
                      key={qNum}
                      id={`listening-q-box-${qNum}`}
                      onClick={() => onSelectQuestion(qNum)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/60'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Question Number & Location Label */}
                      <td className="py-2.5 px-3 border-r border-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`inline-flex items-center justify-center font-bold text-xs px-2 py-0.5 border rounded-xs select-none ${
                              isSelected
                                ? 'bg-red-600 text-white border-red-700'
                                : currentVal
                                ? 'bg-blue-600 text-white border-blue-700'
                                : 'bg-white text-slate-900 border-slate-800'
                            }`}
                          >
                            {qNum}
                          </span>
                          <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                            {cleanPrompt}
                          </span>
                        </div>
                      </td>

                      {/* Radio Selection Buttons for Each Letter Column */}
                      {availableLetters.map((l) => {
                        const isChecked = currentVal === l;

                        return (
                          <td
                            key={l}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectQuestion(qNum);
                              onAnswerChange(qNum, currentVal === l ? '' : l);
                            }}
                            className={`py-2 px-1 sm:px-2 border-r last:border-r-0 border-slate-300 text-center cursor-pointer transition-colors ${
                              isChecked ? 'bg-blue-100/40' : 'hover:bg-slate-100/60'
                            }`}
                            title={`Question ${qNum}: ${l}`}
                          >
                            <div className="flex items-center justify-center">
                              <div
                                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'border-slate-900 bg-white ring-2 ring-slate-900/20'
                                    : 'border-slate-400 bg-white hover:border-slate-700'
                                }`}
                              >
                                {isChecked && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fullscreen / Lightbox Modal for Enlarge View */}
        {zoomMap && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 animate-in fade-in"
            onClick={() => setZoomMap(null)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {zoomMap.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomMap(null)}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 overflow-auto flex items-center justify-center bg-white flex-1">
                <img
                  src={zoomMap.url}
                  alt={zoomMap.title}
                  className="max-w-full max-h-[75vh] object-contain shadow-sm border border-slate-200 rounded"
                />
              </div>

              <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
                <span>Official Cambridge Examination Graphic</span>
                <button
                  type="button"
                  onClick={() => setZoomMap(null)}
                  className="px-3 py-1 bg-slate-800 text-white font-semibold rounded hover:bg-slate-900 transition cursor-pointer"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Matching with Dropdown Selectors
  const renderDropdownMatching = (group: IELTSQuestionGroup) => {
    // Extract shared options
    const sharedOptions: string[] =
      group.options && group.options.length > 0
        ? group.options
        : group.questions[0]?.options && group.questions[0].options.length > 0
        ? group.questions[0].options
        : [];

    const getOptionLetter = (opt: string, fallbackIdx: number): string => {
      const clean = opt.replace(/\u00a0/g, ' ').trim();
      if (/^[A-Za-z]$/.test(clean)) return clean.toUpperCase();
      const match = clean.match(/^([A-Za-z])[.):\s-]+(.*)$/);
      return match ? match[1].toUpperCase() : String.fromCharCode(65 + fallbackIdx);
    };

    const getOptionText = (opt: string): string => {
      const clean = opt.replace(/\u00a0/g, ' ').trim();
      if (/^[A-Za-z]$/.test(clean)) return `Option ${clean.toUpperCase()}`;
      const match = clean.match(/^([A-Za-z])[.):\s-]+(.*)$/);
      return match ? match[2].trim() : clean;
    };

    const boxTitle =
      group.summaryTitle ||
      (group.instructions.toLowerCase().includes('people')
        ? 'List of People'
        : group.instructions.toLowerCase().includes('expert')
        ? 'List of Experts'
        : 'Options Box');

    return (
      <div className="space-y-5">
        {/* Options Reference Box at top */}
        {sharedOptions.length > 0 && (
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-2.5">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 flex items-center justify-between">
              <span>{boxTitle}</span>
              <span className="text-[11px] text-slate-500 font-normal">Choose from the list below</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {sharedOptions.map((opt, idx) => {
                const letter = getOptionLetter(opt, idx);
                const text = getOptionText(opt);
                const isSelectedForCurrent =
                  (answers[currentQuestion] as string)?.trim().toUpperCase() === letter;

                return (
                  <div
                    key={idx}
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
                    className={`flex items-start gap-2 p-2 rounded-lg border transition cursor-pointer select-none ${
                      isSelectedForCurrent
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded font-mono font-black text-xs flex items-center justify-center shrink-0 ${
                        isSelectedForCurrent ? 'bg-white/20 text-white' : 'bg-slate-900 text-white'
                      }`}
                    >
                      {letter}
                    </span>
                    <span
                      className={`font-medium leading-tight text-xs ${
                        isSelectedForCurrent ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Questions with Dropdowns */}
        <div className="space-y-3">
          {group.questions.map((q) => {
            const qNum = q.questionNumber;
            const val = (answers[qNum] as string) || '';
            const isSelected = currentQuestion === qNum;
            const cleanPrompt = q.prompt.replace(/\[\s*\d+\s*\]/, '').replace(/[…._-]+/g, '').trim();

            return (
              <div
                key={qNum}
                id={`listening-q-box-${qNum}`}
                onClick={() => onSelectQuestion(qNum)}
                className={`p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-red-500 bg-red-50/20'
                    : val
                    ? 'border-slate-300 bg-white'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold text-xs px-2.5 py-1 rounded select-none shrink-0 ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : val
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {qNum}
                  </span>
                  <span className="font-bold text-sm text-slate-900">
                    {cleanPrompt}
                  </span>
                </div>

                {/* Dropdown Select Menu */}
                <div className="relative w-full sm:w-80">
                  <select
                    value={val}
                    onChange={(e) => onAnswerChange(qNum, e.target.value)}
                    onFocus={() => onSelectQuestion(qNum)}
                    className={`w-full h-10 pl-3 pr-8 rounded-lg border text-xs font-semibold outline-none cursor-pointer appearance-none truncate ${
                      isSelected
                        ? 'border-red-600 ring-2 ring-red-200 bg-white font-bold'
                        : val
                        ? 'border-slate-800 bg-white font-bold text-slate-900'
                        : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <option value="">
                      -- Select option (A–{String.fromCharCode(64 + Math.max(sharedOptions.length, 5))}) --
                    </option>
                    {sharedOptions.map((opt, idx) => {
                      const letter = getOptionLetter(opt, idx);
                      const text = getOptionText(opt);
                      return (
                        <option key={letter} value={letter}>
                          {letter}. {text}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden cd-ielts-font bg-white">
      {/* Official Audio Control Bar (Full-Width, Clean, Non-intrusive) */}
      <div className="bg-[#fafafa] border-b border-[#e5e5e5] px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs select-none">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-8 h-8 rounded flex items-center justify-center text-white transition cursor-pointer shadow-xs ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700'
            }`}
            title={isPlaying ? 'Pause Audio' : 'Play Official Recording'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {/* Audio Status & Time */}
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span className="font-bold text-slate-900 text-xs">
              Part {activeSection.sectionNumber || activePartIndex + 1} Recording
            </span>
            <span className="text-slate-400">|</span>
            <div className="font-mono text-xs text-slate-600">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Scrubber */}
          <div className="hidden sm:block w-36 md:w-56 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Right Tools: Restart & Upload MP3 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
              setCurrentTime(0);
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-slate-700 font-medium transition cursor-pointer"
            title="Restart track from beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-slate-700 font-medium transition cursor-pointer"
            title="Upload custom MP3 audio file"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Audio</span>
          </button>
        </div>
      </div>

      {/* Hidden Audio Element & File Input */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          console.warn('Audio tag encountered error, advancing to next source...');
          advanceToNextSource(isPlaying);
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Audio Error Alert if present */}
      {audioError && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{audioError}</span>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="font-bold underline text-amber-800 hover:text-amber-950 cursor-pointer"
          >
            Choose local file
          </button>
        </div>
      )}

      {/* 3. Main Full-Width Exam Workspace */}
      <div
        ref={mainPaneRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-14 py-4 sm:py-8 bg-white"
      >
        <div className="max-w-5xl space-y-6">
          {/* Question Groups */}
          {activeSection.questionGroups.map((group) => {
            const isMap =
              group.type === 'diagram_labelling' ||
              group.type === 'map_labelling' ||
              group.instructions.toLowerCase().includes('label the map') ||
              group.instructions.toLowerCase().includes('label the plan') ||
              group.instructions.toLowerCase().includes('stevenson') ||
              group.title.toLowerCase().includes('map') ||
              group.title.toLowerCase().includes('plan') ||
              group.id.includes('c16-l1-qg3') ||
              !!group.imageUrl;

            const isMatching =
              (group.type as string) === 'matching' ||
              group.type === 'matching_features' ||
              group.type === 'matching_information' ||
              ((group.instructions.toLowerCase().includes('from the box') ||
                group.instructions.toLowerCase().includes('answers from the box')) &&
                group.questions.length > 2);

            const isCloze =
              group.type === 'form_completion' ||
              group.type === 'table_completion' ||
              group.type === 'sentence_completion' ||
              group.type === 'summary_completion' ||
              group.type === 'short_answer' ||
              !!group.clozeTemplate;

            return (
              <div
                key={group.id}
                className={`space-y-4 ${settings.fontSize === 'large' ? 'text-base' : 'text-sm'}`}
              >
                {/* Official CD-IELTS Header with Question Range & Badge */}
                <div className="border-b border-slate-300 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base select-none">
                      {group.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full select-none">
                      Practice this section only
                    </span>
                  </div>
                </div>

                {/* Instructions Text directly on white canvas */}
                <div className="text-xs sm:text-sm text-slate-800 space-y-1 mb-4">
                  <p className="font-normal text-slate-800">
                    {group.instructions.replace(/\b(ONE WORD AND\/OR A NUMBER|ONE WORD ONLY|NO MORE THAN [A-Z\s]+ WORDS?)\b/gi, '').trim()}
                  </p>
                  {group.wordLimitRule && (
                    <p className="font-bold text-slate-900">
                      Write {group.wordLimitRule} for each answer.
                    </p>
                  )}
                </div>

                {/* Content Renderer */}
                {isMap
                  ? renderMapLabelling(group)
                  : isMatching
                  ? renderDropdownMatching(group)
                  : isCloze
                  ? renderNoteContent(group)
                  : renderMultipleChoice(group)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
