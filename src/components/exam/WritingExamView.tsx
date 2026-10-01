import React, { useState, useRef, useEffect } from 'react';
import {
  PenTool,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertCircle,
  Type
} from 'lucide-react';
import type { IELTSMockTest, ExamSettings } from '../../types/ielts';

interface WritingExamViewProps {
  test: IELTSMockTest;
  settings: ExamSettings;
  onSubmitWriting: (submission: { task1Essay: string; task1WordCount: number; task2Essay: string; task2WordCount: number }) => void;
}

export const WritingExamView: React.FC<WritingExamViewProps> = ({
  test,
  settings,
  onSubmitWriting
}) => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');

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

  const countWords = (text: string) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  const task1Words = countWords(task1Text);
  const task2Words = countWords(task2Text);

  const handleSubmit = () => {
    onSubmitWriting({
      task1Essay: task1Text,
      task1WordCount: task1Words,
      task2Essay: task2Text,
      task2WordCount: task2Words,
    });
  };

  // Safely extract prompts and content assuming section 0 is Task 1 and section 1 is Task 2
  const task1Section = test.sections[0];
  const task2Section = test.sections[1];

  const task1Prompt = task1Section?.questionGroups?.[0]?.questions?.[0]?.prompt || '';
  const task1Content = task1Section?.passageContent || '';

  const task2Prompt = task2Section?.questionGroups?.[0]?.questions?.[0]?.prompt || '';
  const task2Content = task2Section?.passageContent || '';

  const fontSizeClass = settings.fontSize === 'large' ? 'text-lg' : 'text-base';
  
  // Contrast classes for the writing view (assuming standard is white/slate, etc.)
  const contrastClasses = 
    settings.contrast === 'inverted' 
      ? 'bg-slate-900 text-white' 
      : settings.contrast === 'yellow-on-black'
      ? 'bg-black text-yellow-400'
      : 'bg-white text-slate-900';
      
  const paneClasses = settings.contrast === 'inverted' || settings.contrast === 'yellow-on-black' 
    ? 'border-gray-700' 
    : 'bg-white border-slate-200';

  const renderTask1Instructions = () => (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          WRITING TASK 1
        </h2>
        <p className="font-semibold text-slate-700">You should spend about 20 minutes on this task.</p>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-medium whitespace-pre-wrap">{task1Prompt}</p>
      </div>

      {task1Content && (
        <div 
          className="prose max-w-none prose-slate"
          dangerouslySetInnerHTML={{ __html: task1Content }}
        />
      )}

      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg mt-6">
        <p className="font-semibold text-indigo-900 flex items-center gap-2">
          <Type className="w-4 h-4" />
          You should write at least 150 words.
        </p>
      </div>
    </div>
  );

  const renderTask2Instructions = () => (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          WRITING TASK 2
        </h2>
        <p className="font-semibold text-slate-700">You should spend about 40 minutes on this task.</p>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-medium whitespace-pre-wrap">{task2Prompt}</p>
      </div>
      
      {task2Content && (
        <div 
          className="prose max-w-none prose-slate"
          dangerouslySetInnerHTML={{ __html: task2Content }}
        />
      )}

      <div className="space-y-3 mt-6">
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
          <p className="font-medium text-slate-700 italic">
            Give reasons for your answer and include any relevant examples from your own knowledge or experience.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
          <p className="font-semibold text-indigo-900 flex items-center gap-2">
            <Type className="w-4 h-4" />
            You should write at least 250 words.
          </p>
        </div>
      </div>
    </div>
  );

  const renderWordCount = (current: number, min: number) => {
    const isMeeting = current >= min;
    return (
      <div className={`flex items-center gap-2 font-semibold text-sm ${isMeeting ? 'text-green-600' : 'text-red-500'}`}>
        {isMeeting ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
        <span>
          Word count: {current} / {min} minimum
        </span>
      </div>
    );
  };

  const mainLayoutStyle = isMobile 
    ? { flexDirection: 'column' as const } 
    : { flexDirection: 'row' as const };

  return (
    <div className={`flex flex-col h-full ${contrastClasses} ${fontSizeClass}`}>
      {/* Top Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          onClick={() => setActiveTab(1)}
          className={`px-6 py-4 font-bold text-sm md:text-base flex-1 md:flex-none transition-colors border-b-2 ${
            activeTab === 1
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          WRITING TASK 1
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-6 py-4 font-bold text-sm md:text-base flex-1 md:flex-none transition-colors border-b-2 ${
            activeTab === 2
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          WRITING TASK 2
        </button>
      </div>

      {/* Main Split Content */}
      <div 
        ref={containerRef} 
        className="flex-1 flex overflow-hidden relative"
        style={mainLayoutStyle}
      >
        {/* Left Panel: Instructions */}
        <div 
          className={`overflow-y-auto p-6 md:p-8 ${paneClasses}`}
          style={isMobile ? { flex: 1 } : { width: `${leftWidthPercent}%` }}
        >
          {activeTab === 1 ? renderTask1Instructions() : renderTask2Instructions()}
        </div>

        {/* Resizer Handle */}
        {!isMobile && (
          <div
            className="w-1.5 bg-slate-200 hover:bg-indigo-400 cursor-col-resize transition-colors flex flex-col justify-center items-center group relative z-10"
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="h-8 w-1 rounded-full bg-slate-400 group-hover:bg-white" />
          </div>
        )}

        {/* Right Panel: Writing Area */}
        <div 
          className={`flex flex-col ${paneClasses} border-t md:border-t-0`}
          style={isMobile ? { flex: 1.5 } : { width: `${100 - leftWidthPercent}%` }}
        >
          <div className="flex-1 p-4 md:p-6 flex flex-col h-full bg-slate-50">
            <div className="flex justify-between items-center mb-3">
              <label className="font-bold text-slate-700 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-indigo-500" />
                Your Response
              </label>
              {activeTab === 1 ? renderWordCount(task1Words, 150) : renderWordCount(task2Words, 250)}
            </div>
            
            {activeTab === 1 ? (
              <textarea
                value={task1Text}
                onChange={(e) => setTask1Text(e.target.value)}
                placeholder="Start typing your response for Task 1 here..."
                className={`flex-1 w-full resize-none rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4 md:p-6 leading-relaxed ${settings.contrast === 'inverted' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white'}`}
                spellCheck="false"
              />
            ) : (
              <textarea
                value={task2Text}
                onChange={(e) => setTask2Text(e.target.value)}
                placeholder="Start typing your response for Task 2 here..."
                className={`flex-1 w-full resize-none rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4 md:p-6 leading-relaxed ${settings.contrast === 'inverted' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white'}`}
                spellCheck="false"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-slate-200 bg-white p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium">Task 1 (Min 150)</span>
            <span className={`font-bold ${task1Words >= 150 ? 'text-green-600' : 'text-red-500'}`}>
              {task1Words} words
            </span>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium">Task 2 (Min 250)</span>
            <span className={`font-bold ${task2Words >= 250 ? 'text-green-600' : 'text-red-500'}`}>
              {task2Words} words
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          Submit Writing Test
        </button>
      </div>
    </div>
  );
};
