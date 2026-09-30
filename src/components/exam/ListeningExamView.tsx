import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Upload,
  AlertCircle,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import type { CandidateAnswers, ExamSettings, IELTSMockTest, IELTSQuestionGroup } from '../../types/ielts';
import { ListeningMapDiagram } from './ListeningMapDiagram';

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
  onSelectPart,
  onSelectQuestion,
  volume
}) => {
  const activeSection = test.sections[activePartIndex] || test.sections[0];
  const qStart = activePartIndex * 10 + 1;
  const qEnd = (activePartIndex + 1) * 10;

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
        <div className="space-y-3 text-sm text-slate-800 leading-relaxed font-sans">
          {rawLines.map((rawLine, lIdx) => {
            const line = rawLine.trim();

            if (!line) {
              return <div key={lIdx} className="h-2" />;
            }

            // Detect Subheadings
            const isHeading =
              line.startsWith('### ') ||
              line.startsWith('**') ||
              (line.endsWith(':') && !line.includes('{{')) ||
              (!line.includes('{{') && line.length < 50 && /^[A-Z]/.test(line) && !line.startsWith('–') && !line.startsWith('-') && !line.startsWith('•') && !line.startsWith('●'));

            if (isHeading && !line.includes('{{')) {
              const cleanTitle = line.replace(/^###\s*/, '').replace(/\*\*/g, '');
              return (
                <h4
                  key={lIdx}
                  className="font-bold text-slate-900 text-base mt-5 mb-2 pb-1 border-b border-slate-200"
                >
                  {cleanTitle}
                </h4>
              );
            }

            const hasPlaceholder = /\{\{\s*\d+\s*\}\}/.test(line);

            if (!hasPlaceholder) {
              const isBullet = line.startsWith('–') || line.startsWith('-') || line.startsWith('•') || line.startsWith('●');
              return (
                <p
                  key={lIdx}
                  className={`${isBullet ? 'pl-4 text-slate-800 font-medium' : 'text-slate-900 font-semibold'}`}
                >
                  {line}
                </p>
              );
            }

            // Line with {{N}} placeholders
            const parts = line.split(/(\{\{\s*\d+\s*\}\})/g);
            const isBullet = line.startsWith('–') || line.startsWith('-') || line.startsWith('•') || line.startsWith('●');

            return (
              <div
                key={lIdx}
                className={`flex flex-wrap items-center gap-1.5 leading-loose ${
                  isBullet ? 'pl-4' : ''
                }`}
              >
                {parts.map((part, pIdx) => {
                  const match = part.match(/\{\{\s*(\d+)\s*\}\}/);
                  if (match) {
                    const qNum = parseInt(match[1], 10);
                    const val = (answers[qNum] as string) || '';
                    const isSelected = currentQuestion === qNum;

                    return (
                      <span key={pIdx} className="inline-flex items-center gap-1.5 align-middle my-1">
                        {/* Authentic CD-IELTS Question Number Badge */}
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

                        {/* Authentic CD-IELTS Input Box */}
                        <div className="relative inline-flex items-center gap-1">
                          <input
                            id={`listening-q-box-${qNum}`}
                            type="text"
                            value={val}
                            onChange={(e) => onAnswerChange(qNum, e.target.value)}
                            onFocus={() => onSelectQuestion(qNum)}
                            className={`h-8 px-2.5 rounded-xs border bg-white text-sm text-slate-900 font-medium outline-none transition w-44 sm:w-56 inline-flex items-center align-middle ${
                              isSelected
                                ? 'border-red-600 ring-1 ring-red-500 bg-white'
                                : 'border-slate-400 hover:border-slate-600 bg-white'
                            }`}
                          />

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
    }

    // Fallback if no clozeTemplate
    return (
      <div className="space-y-4">
        {group.questions.map((q) => {
          const qNum = q.questionNumber;
          const val = (answers[qNum] as string) || '';
          const isSelected = currentQuestion === qNum;

          return (
            <div
              id={`listening-q-box-${qNum}`}
              key={qNum}
              onClick={() => onSelectQuestion(qNum)}
              className={`p-3.5 rounded border transition flex flex-wrap items-center gap-3 ${
                isSelected
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span
                className={`font-bold text-xs px-2 py-0.5 rounded-xs select-none ${
                  isSelected
                    ? 'bg-red-600 text-white'
                    : val
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {qNum}
              </span>
              <span className="text-sm font-semibold text-slate-800 flex-1">
                {q.prompt.replace(/\[\s*\d+\s*\]/, '').trim()}
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onAnswerChange(qNum, e.target.value)}
                  onFocus={() => onSelectQuestion(qNum)}
                  className={`h-8 px-2.5 rounded-xs border text-sm text-slate-900 font-medium w-48 sm:w-60 outline-none ${
                    isSelected
                      ? 'border-red-600 ring-1 ring-red-500 bg-white'
                      : 'border-slate-400 bg-white'
                  }`}
                />

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
            </div>
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
  const renderMapLabelling = (group: IELTSQuestionGroup) => {
    // Collect all answered letters for the map pins
    const answeredLetters: Record<string, number> = {};
    group.questions.forEach((q) => {
      const a = answers[q.questionNumber];
      if (typeof a === 'string' && a.trim()) {
        answeredLetters[a.trim().toUpperCase()] = q.questionNumber;
      }
    });

    // Available letters (e.g. A to H or A to I)
    const availableLetters =
      group.options && group.options.length > 0
        ? group.options
        : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    return (
      <div className="space-y-6">
        {/* Visual Map / Plan Diagram */}
        <ListeningMapDiagram
          title={group.diagramTitle || group.title || test.title}
          imageUrl={group.imageUrl}
          options={availableLetters}
          selectedLetter={answers[currentQuestion] as string}
          onSelectLetter={(letter) => {
            onAnswerChange(currentQuestion, letter);
          }}
          answeredLetters={answeredLetters}
        />

        {/* Questions with Dropdowns & Quick Selectors */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-200 flex items-center justify-between">
            <span>
              Questions {group.questions[0]?.questionNumber}–{group.questions[group.questions.length - 1]?.questionNumber}
            </span>
            <span className="text-slate-500 font-normal">Choose letter for each location</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  className={`p-3.5 rounded-xl border transition flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-red-500 bg-red-50/20 shadow-xs'
                      : val
                      ? 'border-slate-300 bg-white'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-bold text-xs px-2.5 py-1 rounded select-none ${
                          isSelected
                            ? 'bg-red-600 text-white'
                            : val
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {qNum}
                      </span>
                      <span className="font-bold text-sm text-slate-900">
                        {cleanPrompt}
                      </span>
                    </div>

                    {/* Official Dropdown Selector */}
                    <div className="relative">
                      <select
                        value={val}
                        onChange={(e) => onAnswerChange(qNum, e.target.value)}
                        onFocus={() => onSelectQuestion(qNum)}
                        className={`h-9 pl-3 pr-8 rounded-lg border text-xs font-extrabold outline-none cursor-pointer appearance-none ${
                          isSelected
                            ? 'border-red-600 ring-2 ring-red-200 bg-white text-red-950'
                            : val
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <option value="">-- Letter --</option>
                        {availableLetters.map((l) => (
                          <option key={l} value={l}>
                            Letter {l}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Letter Buttons for direct clicking */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 flex-wrap">
                    <span className="text-[10px] text-slate-400 mr-1 font-semibold">Select:</span>
                    {availableLetters.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectQuestion(qNum);
                          onAnswerChange(qNum, l);
                        }}
                        className={`w-7 h-7 rounded text-xs font-mono font-bold transition cursor-pointer ${
                          val === l
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
      const match = opt.match(/^([A-I])[\.\s]/);
      return match ? match[1] : String.fromCharCode(65 + fallbackIdx);
    };

    const getOptionText = (opt: string): string => {
      return opt.replace(/^[A-I][\.\s]+/, '').trim();
    };

    return (
      <div className="space-y-5">
        {/* Options Reference Box at top */}
        {sharedOptions.length > 0 && (
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-2.5">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 flex items-center justify-between">
              <span>Options Box</span>
              <span className="text-[11px] text-slate-500 font-normal">Choose from the list below</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {sharedOptions.map((opt, idx) => {
                const letter = getOptionLetter(opt, idx);
                const text = getOptionText(opt);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded font-mono font-black text-xs bg-slate-900 text-white flex items-center justify-center shrink-0">
                      {letter}
                    </span>
                    <span className="text-slate-700 font-medium leading-tight">
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
      {/* 1. Official CD-IELTS Part Navigation Sub-Header (Full-Width) */}
      <div className="bg-[#f2f2f2] border-b border-[#cfcfcf] px-6 py-2 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          {test.sections.map((sec, idx) => {
            const isActive = idx === activePartIndex;
            const partQStart = idx * 10 + 1;
            const partQEnd = (idx + 1) * 10;

            return (
              <button
                key={idx}
                onClick={() => onSelectPart(idx)}
                className={`px-5 py-2 font-bold transition rounded-t-md text-xs cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 border-t-3 border-red-600 shadow-xs'
                    : 'text-slate-600 hover:text-black hover:bg-slate-200'
                }`}
              >
                Part {sec.sectionNumber || idx + 1} (Q {partQStart} – {partQEnd})
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-500 italic hidden md:block">
          Official Computer-Delivered IELTS Listening Simulator
        </div>
      </div>

      {/* 2. Official Audio Control Bar (Full-Width, Clean, Non-intrusive) */}
      <div className="bg-[#fafafa] border-b border-[#e5e5e5] px-6 py-2 flex items-center justify-between text-xs select-none">
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
        className="flex-1 overflow-y-auto px-6 md:px-14 py-8 bg-white"
      >
        <div className="max-w-4xl space-y-8">
          {/* Part Header */}
          <div className="border-b border-slate-300 pb-4">
            <span className="text-xs uppercase font-extrabold text-red-600 tracking-wider">
              Listening Part {activeSection.sectionNumber || activePartIndex + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              {activeSection.subtitle || `Questions ${qStart} – ${qEnd}`}
            </h2>
            <p className="text-xs text-slate-600 italic mt-1 font-sans">
              You should answer Questions {qStart} – {qEnd} while listening. The recording will only be played once.
            </p>
          </div>

          {/* Question Groups */}
          {activeSection.questionGroups.map((group) => {
            const isMap =
              group.type === 'diagram_labelling' ||
              group.type === 'map_labelling' ||
              group.instructions.toLowerCase().includes('label the map') ||
              group.instructions.toLowerCase().includes('label the plan') ||
              group.title.toLowerCase().includes('map');

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
                {/* Instructions */}
                <div className="bg-[#f8f9fa] border border-slate-300 p-4 rounded text-xs">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    {group.title}
                  </h3>
                  <p className="text-slate-700 font-medium">
                    {group.instructions}
                  </p>
                  {group.wordLimitRule && (
                    <span className="inline-block mt-2 bg-white text-slate-900 border border-slate-300 px-2 py-0.5 rounded-xs font-bold text-[11px]">
                      {group.wordLimitRule}
                    </span>
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
