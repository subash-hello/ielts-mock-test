import React, { useState, useRef, useEffect } from 'react';
import {
  PenTool,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertCircle,
  Type,
  Maximize2,
  X,
  AlertTriangle,
  Send,
  Sparkles
} from 'lucide-react';
import type { IELTSMockTest, ExamSettings } from '../../types/ielts';

interface WritingExamViewProps {
  test: IELTSMockTest;
  settings: ExamSettings;
  onSubmitWriting: (submission: {
    task1Essay: string;
    task1WordCount: number;
    task2Essay: string;
    task2WordCount: number;
  }) => void;
}

export const WritingExamView: React.FC<WritingExamViewProps> = ({
  test,
  settings,
  onSubmitWriting
}) => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Split-screen Draggable resizer
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

  const countWords = (text: string) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const task1Words = countWords(task1Text);
  const task2Words = countWords(task2Text);

  const handleOpenSubmitDialog = () => {
    setIsConfirmSubmitOpen(true);
  };

  const handleFinalSubmit = () => {
    setIsConfirmSubmitOpen(false);
    onSubmitWriting({
      task1Essay: task1Text,
      task1WordCount: task1Words,
      task2Essay: task2Text,
      task2WordCount: task2Words
    });
  };

  // Safely extract prompts and passage content (section 0 is Task 1, section 1 is Task 2)
  const task1Section = test.sections[0];
  const task2Section = test.sections[1];

  const task1Prompt =
    task1Section?.questionGroups?.[0]?.questions?.[0]?.prompt ||
    'The charts and diagrams below show the information. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.';
  const task1Content = task1Section?.passageContent || '';

  const task2Prompt =
    task2Section?.questionGroups?.[0]?.questions?.[0]?.prompt ||
    'Write about the discursive essay topic. Give reasons for your answer and include any relevant examples from your own knowledge or experience.';
  const task2Content = task2Section?.passageContent || '';

  const fontSizeClass = settings.fontSize === 'large' ? 'text-lg' : 'text-base';

  const contrastClasses =
    settings.contrast === 'inverted'
      ? 'bg-slate-900 text-white'
      : settings.contrast === 'yellow-on-black'
      ? 'bg-black text-yellow-400'
      : 'bg-white text-slate-900';

  const paneClasses =
    settings.contrast === 'inverted' || settings.contrast === 'yellow-on-black'
      ? 'border-gray-700 bg-slate-900'
      : 'bg-white border-slate-200';

  const renderTask1Instructions = () => (
    <div className="space-y-5">
      {/* Official Cambridge Section Header */}
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            WRITING TASK 1 • ACADEMIC
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Suggested: 20 minutes
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
          {test.title} — Task 1
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          You should spend about 20 minutes on this task.
        </p>
      </div>

      {/* Task 1 Prompt Box */}
      <div className="bg-slate-50 border-l-4 border-indigo-600 p-4 rounded-r-xl border border-slate-200">
        <p className="font-semibold text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
          {task1Prompt}
        </p>
      </div>

      {/* Visual Chart / Process Diagram */}
      {task1Content && (
        <div className="relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Official Examination Diagram / Visual Data
            </span>
            <button
              onClick={() => setIsZoomModalOpen(true)}
              className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title="Open full size diagram in modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Zoom Diagram</span>
            </button>
          </div>

          <div
            className="prose max-w-none prose-slate cursor-pointer"
            onClick={() => setIsZoomModalOpen(true)}
            dangerouslySetInnerHTML={{ __html: task1Content }}
          />
        </div>
      )}

      {/* Word Count Minimum Reminder */}
      <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/60 flex items-center justify-between text-xs">
        <span className="font-bold text-indigo-950 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-600" />
          You should write at least 150 words.
        </span>
        <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
          task1Words >= 150 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          Current: {task1Words} words
        </span>
      </div>
    </div>
  );

  const renderTask2Instructions = () => (
    <div className="space-y-5">
      {/* Official Cambridge Section Header */}
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            WRITING TASK 2 • ACADEMIC ESSAY
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Suggested: 40 minutes (Double Weighting)
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
          {test.title} — Task 2
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          You should spend about 40 minutes on this task. Task 2 contributes twice as much as Task 1 to your Writing band score.
        </p>
      </div>

      {/* Cambridge Official Prompt Box */}
      {task2Content ? (
        <div
          className="prose max-w-none prose-slate"
          dangerouslySetInnerHTML={{ __html: task2Content }}
        />
      ) : (
        <div className="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span className="font-extrabold text-xs uppercase tracking-wider text-slate-600">
              Official Cambridge CD-IELTS • Writing Task 2
            </span>
            <span className="text-xs font-semibold text-slate-500">Suggested: 40 Mins</span>
          </div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
            Write about the following topic:
          </p>
          <div className="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner whitespace-pre-wrap">
            {task2Prompt}
          </div>
          <div className="mt-4 space-y-1 text-xs text-slate-700">
            <p className="italic">
              Give reasons for your answer and include any relevant examples from your own knowledge or experience.
            </p>
            <p className="font-extrabold text-slate-900">Write at least 250 words.</p>
          </div>
        </div>
      )}

      {/* Word Count Minimum Reminder */}
      <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/60 flex items-center justify-between text-xs">
        <span className="font-bold text-indigo-950 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-600" />
          You should write at least 250 words.
        </span>
        <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
          task2Words >= 250 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          Current: {task2Words} words
        </span>
      </div>
    </div>
  );

  const mainLayoutStyle = isMobile
    ? { flexDirection: 'column' as const }
    : { flexDirection: 'row' as const };

  return (
    <div className={`flex flex-col h-full ${contrastClasses} ${fontSizeClass} select-none`}>
      {/* CD-IELTS Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-300 bg-[#f4f4f4] px-4 select-none">
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab(1)}
            className={`px-6 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer border-t border-x ${
              activeTab === 1
                ? 'bg-white text-slate-900 border-slate-300 shadow-xs -mb-[1px]'
                : 'bg-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Task 1</span>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                task1Words >= 150
                  ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {task1Words}w {task1Words >= 150 && '✓'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab(2)}
            className={`px-6 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer border-t border-x ${
              activeTab === 2
                ? 'bg-white text-slate-900 border-slate-300 shadow-xs -mb-[1px]'
                : 'bg-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-transparent'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Task 2 (Essay)</span>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                task2Words >= 250
                  ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {task2Words}w {task2Words >= 250 && '✓'}
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
          <span>Official CD-IELTS Writing Software Simulation</span>
        </div>
      </div>

      {/* Main Split Content */}
      <div
        ref={containerRef}
        className="flex-1 flex overflow-hidden relative"
        style={mainLayoutStyle}
      >
        {/* Left Panel: Cambridge Instructions & Visual Diagram */}
        <div
          className={`overflow-y-auto p-4 sm:p-6 md:p-8 ${paneClasses} select-text`}
          style={isMobile ? { flex: 1 } : { width: `${leftWidthPercent}%` }}
        >
          {activeTab === 1 ? renderTask1Instructions() : renderTask2Instructions()}
        </div>

        {/* Resizer Handle */}
        {!isMobile && (
          <div
            className="w-2 bg-slate-200 hover:bg-indigo-500 cursor-col-resize transition-colors flex flex-col justify-center items-center group relative z-10"
            onMouseDown={() => setIsDragging(true)}
            title="Drag to resize stimulus and writing panes"
          >
            <div className="h-10 w-1 rounded-full bg-slate-400 group-hover:bg-white" />
          </div>
        )}

        {/* Right Panel: Official CD-IELTS Textarea */}
        <div
          className={`flex flex-col ${paneClasses} border-t md:border-t-0 select-text`}
          style={isMobile ? { flex: 1.5 } : { width: `${100 - leftWidthPercent}%` }}
        >
          <div className="flex-1 p-4 md:p-6 flex flex-col h-full bg-[#fdfdfd]">
            {/* Textarea Header Bar */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200">
              <label className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-indigo-600" />
                <span>
                  {activeTab === 1 ? 'Task 1 Response' : 'Task 2 Response (Essay)'}
                </span>
              </label>

              {/* Dynamic Live Word Counter */}
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
                    (activeTab === 1 ? task1Words >= 150 : task2Words >= 250)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {(activeTab === 1 ? task1Words >= 150 : task2Words >= 250) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span>
                    Word count: {activeTab === 1 ? task1Words : task2Words}
                  </span>
                  <span className="text-[10px] font-normal text-slate-500">
                    / {activeTab === 1 ? '150 min' : '250 min'}
                  </span>
                </div>
              </div>
            </div>

            {/* Official CD-IELTS Text Box (Spellcheck Strictly Disabled) */}
            {activeTab === 1 ? (
              <textarea
                value={task1Text}
                onChange={(e) => setTask1Text(e.target.value)}
                placeholder="Type your Task 1 response here... (Describe the main features, trends, stages, and make comparisons where relevant)"
                className={`flex-1 w-full resize-none rounded-xl border border-slate-300 p-4 sm:p-5 text-sm sm:text-base leading-relaxed font-sans outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-inner transition ${
                  settings.contrast === 'inverted' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900'
                }`}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
              />
            ) : (
              <textarea
                value={task2Text}
                onChange={(e) => setTask2Text(e.target.value)}
                placeholder="Type your Task 2 essay here... (Organise into well-structured paragraphs with clear thesis, arguments, and supporting evidence)"
                className={`flex-1 w-full resize-none rounded-xl border border-slate-300 p-4 sm:p-5 text-sm sm:text-base leading-relaxed font-sans outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-inner transition ${
                  settings.contrast === 'inverted' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900'
                }`}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action / Submission Bar */}
      <div className="border-t border-slate-300 bg-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md z-20">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Task 1:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                task1Words >= 150
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {task1Words} / 150 words
            </span>
          </div>

          <div className="w-px h-4 bg-slate-300" />

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Task 2:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                task2Words >= 250
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {task2Words} / 250 words
            </span>
          </div>

          <div className="w-px h-4 bg-slate-300 hidden md:block" />

          <span className="text-slate-500 font-mono hidden md:inline">
            Total Words: <strong>{task1Words + task2Words}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setActiveTab(activeTab === 1 ? 2 : 1)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 transition cursor-pointer"
          >
            {activeTab === 1 ? 'Go to Task 2 →' : '← Back to Task 1'}
          </button>

          <button
            onClick={handleOpenSubmitDialog}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            <span>Submit Writing Paper</span>
          </button>
        </div>
      </div>

      {/* FULLSCREEN DIAGRAM ZOOM PREVIEW MODAL */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-indigo-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Writing Task 1 — Full Size Examination Diagram
                </h3>
              </div>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: task1Content }}
              />
            </div>
          </div>
        </div>
      )}

      {/* CD-IELTS SUBMISSION CONFIRMATION MODAL */}
      {isConfirmSubmitOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsConfirmSubmitOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 cursor-default text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Submit Academic Writing Paper?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your essay word counts before submitting to your test centre examiner.
                </p>
              </div>
            </div>

            {/* Word Count Audit Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-800">Task 1 Word Count:</span>
                <span className={`font-mono font-extrabold px-2 py-0.5 rounded ${
                  task1Words >= 150 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {task1Words} / 150 words {task1Words >= 150 ? '✓' : '(Under limit)'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Task 2 Word Count:</span>
                <span className={`font-mono font-extrabold px-2 py-0.5 rounded ${
                  task2Words >= 250 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {task2Words} / 250 words {task2Words >= 250 ? '✓' : '(Under limit)'}
                </span>
              </div>
            </div>

            {/* Under-limit Warning */}
            {(task1Words < 150 || task2Words < 250) && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Official Rule Reminder:</strong> Submitting fewer words than the required minimum (150 words for Task 1, 250 words for Task 2) may reduce your band score under Task Achievement / Response.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Return to Test
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm &amp; Submit Paper</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WritingExamView;
