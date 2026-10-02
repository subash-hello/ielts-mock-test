import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Users,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Copy,
  Check,
  Building2,
  Sparkles,
  ExternalLink,
  Trash2,
  Search,
  Key,
  Laptop,
  FileText,
  X,
  LogOut,
  Award,
  Clock,
  BookOpen,
  Headphones,
  CheckCircle2,
  Eye,
  Library,
  Send,
  PenTool,
  QrCode,
  Printer
} from 'lucide-react';
import type {
  Consultancy,
  LabStation,
  ConsultancyStudent,
  SavedAIReport
} from '../../types/consultancy';
import type { IELTSMockTest, TestResult } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { AIDiagnosticReportModal } from '../results/AIDiagnosticReportModal';
import { allFullMockTests } from '../../data/mockTests';

interface ConsultancyPortalProps {
  consultancyId: string;
  tests: IELTSMockTest[];
  onBackToHub: () => void;
  onOpenTerminal: (stationName: string) => void;
  onLogout?: () => void;
}

export const ConsultancyPortal: React.FC<ConsultancyPortalProps> = ({
  consultancyId,
  tests,
  onBackToHub,
  onOpenTerminal,
  onLogout
}) => {
  const [consultancy, setConsultancy] = useState<Consultancy | undefined>(
    ConsultancyService.getConsultancyById(consultancyId)
  );
  const [stations, setStations] = useState<LabStation[]>(
    ConsultancyService.getStations(consultancyId)
  );
  const [students, setStudents] = useState<ConsultancyStudent[]>(
    ConsultancyService.getStudents(consultancyId)
  );
  const [aiReports, setAiReports] = useState<SavedAIReport[]>(
    ConsultancyService.getReports(consultancyId)
  );
  const [testResults, setTestResults] = useState<TestResult[]>(() =>
    ConsultancyService.getResults(consultancyId)
  );

  const [activeTab, setActiveTab] = useState<'results' | 'monitor' | 'students' | 'ai-reports' | 'terminals' | 'test-library'>('results');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchStudent, setSearchStudent] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [resultModuleFilter, setResultModuleFilter] = useState<'all' | 'reading' | 'listening' | 'writing'>('all');
  const [resultBandFilter, setResultBandFilter] = useState<'all' | '7.5' | '6.5' | 'below'>('all');
  const [scorecardModalResult, setScorecardModalResult] = useState<TestResult | null>(null);
  const [copiedStationName, setCopiedStationName] = useState<string | null>(null);
  const [selectedStationForQr, setSelectedStationForQr] = useState<LabStation | null>(null);
  const [showPrintDeskCardsModal, setShowPrintDeskCardsModal] = useState(false);

  // Modals
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStationForAssign, setSelectedStationForAssign] = useState<LabStation | null>(null);
  const [assignForm, setAssignForm] = useState<{
    testId: string;
    studentName: string;
    candidateId: string;
    targetBand: number;
  }>({
    testId: tests[0]?.id || 'cambridge-19-test-1-reading',
    studentName: '',
    candidateId: '',
    targetBand: 7.0
  });

  const [showAddStationModal, setShowAddStationModal] = useState(false);
  const [newStationName, setNewStationName] = useState('');

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    targetBand: 7.0
  });

  const [aiReportModalData, setAiReportModalData] = useState<{
    visible: boolean;
    studentName: string;
    bandScore: number;
    module: 'reading' | 'listening' | 'writing';
    testTitle: string;
    correctCount: number;
    totalQuestions: number;
    timeTakenSeconds: number;
  } | null>(null);

  // Test Library state
  const [assignedTestIds, setAssignedTestIds] = useState<string[]>(() =>
    ConsultancyService.getAssignedTestIds(consultancyId)
  );

  // Active launched test for all student terminals
  const [activeLaunchedTest, setActiveLaunchedTest] = useState<{
    testId: string;
    title: string;
    launchedAt: string;
    isFullMock?: boolean;
  } | null>(() => ConsultancyService.getActiveLaunchedTest(consultancyId));

  const [selectedTestToLaunch, setSelectedTestToLaunch] = useState<string>(
    tests.find((t) => t.id === 'cambridge-16-test-1-writing')?.id || 'cambridge-16-test-1-writing'
  );

  // Writing evaluation modal state
  const [writingModalResult, setWritingModalResult] = useState<TestResult | null>(null);
  const [writingGradeForm, setWritingGradeForm] = useState<{
    task1Band: number;
    task2Band: number;
    overallWritingBand: number;
    adminFeedback: string;
  }>({
    task1Band: 6.5,
    task2Band: 6.5,
    overallWritingBand: 6.5,
    adminFeedback: ''
  });

  // Reload local state from service
  const reloadAll = () => {
    setConsultancy(ConsultancyService.getConsultancyById(consultancyId));
    setStations(ConsultancyService.getStations(consultancyId));
    setStudents(ConsultancyService.getStudents(consultancyId));
    setAiReports(ConsultancyService.getReports(consultancyId));
    setTestResults(ConsultancyService.getResults(consultancyId));
    setAssignedTestIds(ConsultancyService.getAssignedTestIds(consultancyId));
    setActiveLaunchedTest(ConsultancyService.getActiveLaunchedTest(consultancyId));
  };

  // Real-time telemetry subscription
  useEffect(() => {
    reloadAll();
    const unsubscribe = ConsultancyService.subscribe((event) => {
      if (
        event.type === 'STATION_UPDATED' ||
        event.type === 'STATION_HEARTBEAT' ||
        event.type === 'STATION_ADDED' ||
        event.type === 'STATION_DELETED'
      ) {
        setStations(ConsultancyService.getStations(consultancyId));
      } else if (
        event.type === 'REPORT_ADDED' ||
        event.type === 'RESULT_ADDED' ||
        event.type === 'RESULT_UPDATED' ||
        event.type === 'RESULT_PUBLISHED' ||
        event.type === 'RESULT_UNPUBLISHED' ||
        event.type === 'ALL_RESULTS_PUBLISHED' ||
        event.type === 'RESULT_DELETED' ||
        event.type === 'ALL_RESULTS_CLEARED' ||
        event.type === 'STUDENT_UPDATED'
      ) {
        setAiReports(ConsultancyService.getReports(consultancyId));
        setStudents(ConsultancyService.getStudents(consultancyId));
        setTestResults(ConsultancyService.getResults(consultancyId));
      } else if (event.type === 'BRANCH_TEST_LAUNCHED') {
        if (event.payload?.consultancyId === consultancyId) {
          if (event.payload.testId) {
            setActiveLaunchedTest({
              testId: event.payload.testId,
              title: event.payload.title || event.payload.testId,
              launchedAt: event.payload.launchedAt || new Date().toISOString(),
              isFullMock: event.payload.isFullMock
            });
          } else {
            setActiveLaunchedTest(null);
          }
        }
      }
    });

    const interval = setInterval(() => {
      setStations(ConsultancyService.getStations(consultancyId));
      setAiReports(ConsultancyService.getReports(consultancyId));
      setStudents(ConsultancyService.getStudents(consultancyId));
      setTestResults(ConsultancyService.getResults(consultancyId));
      setActiveLaunchedTest(ConsultancyService.getActiveLaunchedTest(consultancyId));
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [consultancyId]);

  if (!consultancy) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold">Consultancy Account Not Found</h2>
          <button
            onClick={onBackToHub}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Return to Hub
          </button>
        </div>
      </div>
    );
  }

  // Quick stats
  const activeStations = stations.filter((s) => s.status === 'in_progress');
  const pausedStations = stations.filter((s) => s.status === 'paused');
  const submittedStations = stations.filter((s) => s.status === 'submitted');
  const idleStations = stations.filter((s) => s.status === 'idle');

  const copyLabPairingLink = () => {
    if (!consultancy) return;
    const url = `${window.location.origin}/?mode=terminal&cid=${consultancy.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const copyStationLink = (stationName: string) => {
    if (!consultancy) return;
    const url = `${window.location.origin}/?mode=terminal&station=${encodeURIComponent(stationName)}&cid=${consultancy.id}`;
    navigator.clipboard.writeText(url);
    setCopiedStationName(stationName);
    setTimeout(() => setCopiedStationName(null), 2500);
  };

  const handleQuickAddBatch = (count: number) => {
    if (!consultancy) return;
    const remaining = consultancy.computerLimit - stations.length;
    if (remaining <= 0) {
      alert(`License station limit reached (${consultancy.computerLimit} PCs max). Contact support to upgrade your lab capacity.`);
      return;
    }
    const toAdd = Math.min(count, remaining);
    ConsultancyService.addStationsBatch(consultancy.id, toAdd);
    reloadAll();
  };

  const handleOpenAssignModal = (station: LabStation | null) => {
    setSelectedStationForAssign(station);
    setAssignForm({
      testId: tests[0]?.id || 'cambridge-19-test-1-reading',
      studentName: station?.currentCandidate?.name || '',
      candidateId: station?.currentCandidate?.candidateId || '00' + Math.floor(1000 + Math.random() * 9000),
      targetBand: station?.currentCandidate?.targetBand || 7.0
    });
    setShowAssignModal(true);
  };

  const handleConfirmAssign = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenTest = tests.find((t) => t.id === assignForm.testId) || tests[0];
    if (!chosenTest) return;

    const isFull = chosenTest.id.includes('full');

    if (selectedStationForAssign) {
      ConsultancyService.assignTestToStation(
        consultancy.id,
        selectedStationForAssign.id,
        chosenTest.id,
        chosenTest.title,
        chosenTest.module,
        {
          candidateId: assignForm.candidateId,
          name: assignForm.studentName || 'Candidate',
          targetBand: assignForm.targetBand
        }
      );
      // Sync branch-wide launch as well so student views immediately display Start Test
      ConsultancyService.launchTestToBranch(consultancy.id, chosenTest.id, chosenTest.title, isFull);
      setActiveLaunchedTest({
        testId: chosenTest.id,
        title: chosenTest.title,
        launchedAt: new Date().toISOString(),
        isFullMock: isFull
      });
    } else {
      idleStations.forEach((st) => {
        ConsultancyService.assignTestToStation(
          consultancy.id,
          st.id,
          chosenTest.id,
          chosenTest.title,
          chosenTest.module,
          {
            candidateId: '00' + Math.floor(1000 + Math.random() * 9000),
            name: 'Lab Candidate',
            targetBand: assignForm.targetBand
          }
        );
      });
      // Set branch active launched test so all student terminals show Start Test immediately
      ConsultancyService.launchTestToBranch(consultancy.id, chosenTest.id, chosenTest.title, isFull);
      setActiveLaunchedTest({
        testId: chosenTest.id,
        title: chosenTest.title,
        launchedAt: new Date().toISOString(),
        isFullMock: isFull
      });
    }

    setShowAssignModal(false);
    reloadAll();
  };

  const handlePublishResult = (res: TestResult) => {
    ConsultancyService.publishTestResult(consultancyId, res.testId, res.candidateId, res.completedAt);
    reloadAll();
  };

  const handleUnpublishResult = (res: TestResult) => {
    ConsultancyService.unpublishTestResult(consultancyId, res.testId, res.candidateId, res.completedAt);
    reloadAll();
  };

  const handlePublishAll = () => {
    ConsultancyService.publishAllResults(consultancyId);
    reloadAll();
  };

  const handleDeleteResult = (res: TestResult) => {
    const candidateName = res.candidateName || res.candidateId || 'Candidate';
    const testTitle = res.testTitle || res.testId;
    if (window.confirm(`Are you sure you want to delete the test result for "${candidateName}" (${testTitle})? This action cannot be undone.`)) {
      ConsultancyService.deleteTestResult(consultancyId, res.testId, res.candidateId, res.completedAt);
      if (scorecardModalResult && scorecardModalResult.testId === res.testId && scorecardModalResult.candidateId === res.candidateId) {
        setScorecardModalResult(null);
      }
      if (writingModalResult && writingModalResult.testId === res.testId && writingModalResult.candidateId === res.candidateId) {
        setWritingModalResult(null);
      }
      reloadAll();
    }
  };

  const handleClearAllResults = () => {
    if (window.confirm(`Are you sure you want to delete ALL ${testResults.length} test results? This will permanently delete candidate scores and mock test records for this consultancy.`)) {
      ConsultancyService.clearAllResults(consultancyId);
      setScorecardModalResult(null);
      setWritingModalResult(null);
      reloadAll();
    }
  };

  const handleLaunchTestToBranch = (testId: string) => {
    const fullMock = allFullMockTests.find((fm) => fm.id === testId);
    const standardTest = tests.find((t) => t.id === testId);
    const title = fullMock ? fullMock.title : standardTest ? standardTest.title : testId;
    const isFull = !!fullMock || testId.includes('full');

    ConsultancyService.launchTestToBranch(consultancyId, testId, title, isFull);
    setActiveLaunchedTest({
      testId,
      title,
      launchedAt: new Date().toISOString(),
      isFullMock: isFull
    });
    reloadAll();
  };

  const handleStopBranchTest = () => {
    ConsultancyService.launchTestToBranch(consultancyId, null);
    setActiveLaunchedTest(null);
    reloadAll();
  };

  const handleOpenWritingEvaluation = (result: TestResult) => {
    const existing = result.writingSubmission;
    const t1 = existing?.task1Band ?? 6.5;
    const t2 = existing?.task2Band ?? 6.5;
    const calcOverall = existing?.overallWritingBand ?? Math.round(((t1 + 2 * t2) / 3) * 2) / 2;

    setWritingGradeForm({
      task1Band: t1,
      task2Band: t2,
      overallWritingBand: calcOverall,
      adminFeedback: existing?.adminFeedback || ''
    });
    setWritingModalResult(result);
  };

  const handleSaveWritingGrade = (publishImmediately: boolean = false) => {
    if (!writingModalResult) return;

    ConsultancyService.gradeWritingSubmission(
      consultancyId,
      writingModalResult.testId,
      writingModalResult.candidateId || '',
      writingModalResult.completedAt,
      {
        task1Band: writingGradeForm.task1Band,
        task2Band: writingGradeForm.task2Band,
        overallWritingBand: writingGradeForm.overallWritingBand,
        adminFeedback: writingGradeForm.adminFeedback,
        reviewedBy: `${consultancy?.name || 'Academic Admin'}`
      }
    );

    if (publishImmediately) {
      ConsultancyService.publishTestResult(
        consultancyId,
        writingModalResult.testId,
        writingModalResult.candidateId,
        writingModalResult.completedAt
      );
    }

    setWritingModalResult(null);
    reloadAll();
  };

  const handleAddStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStationName.trim()) return;
    ConsultancyService.addStation(consultancy.id, newStationName.trim());
    setNewStationName('');
    setShowAddStationModal(false);
    reloadAll();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.name.trim()) return;

    const newStd: ConsultancyStudent = {
      id: 'std-' + Date.now().toString(36),
      consultancyId: consultancy.id,
      candidateNumber: '00' + Math.floor(1000 + Math.random() * 9000),
      fullName: newStudentForm.name.trim(),
      email: newStudentForm.email.trim() || `${newStudentForm.name.toLowerCase().replace(/\s+/g, '')}@student.com`,
      phone: newStudentForm.phone.trim() || '9800000000',
      targetBand: newStudentForm.targetBand,
      enrolledDate: new Date().toISOString().split('T')[0],
      testsCompletedCount: 0,
      highestBand: 0,
      averageBand: 0
    };

    ConsultancyService.saveStudent(newStd);
    setNewStudentForm({ name: '', email: '', phone: '', targetBand: 7.0 });
    setShowAddStudentModal(false);
    reloadAll();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* 1. Header with Consultancy Branding & Live Telemetry Link */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <img src="/images/masterieltsai-icon.png" alt="MasterIELTS AI" className="w-8 h-8 object-contain" />
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase font-bold tracking-wider text-violet-600">Powered by</div>
              <div className="text-xs font-black text-slate-900 leading-none">MasterIELTS AI</div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
            {consultancy.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">
                {consultancy.name}
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {consultancy.branch}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{stations.length} Lab Stations Configured</span>
              </span>
              <span>•</span>
              <span className="text-slate-600 font-medium">
                {activeStations.length} Active in Test
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* Lab Station PIN & Password Pill */}
          <button
            onClick={copyLabPairingLink}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer text-slate-700 shadow-xs"
            title="Click to copy student computer pairing link"
          >
            <Key className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-500 font-medium">Branch:</span>
            <span className="font-mono font-bold text-slate-900">{consultancy.branchCode || consultancy.accessCode}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Pass:</span>
            <span className="font-mono font-bold text-blue-700">{consultancy.examPassword || '1234'}</span>
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 ml-1" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400 ml-1" />
            )}
          </button>

          {/* Quick Terminal Launch */}
          <button
            onClick={() => onOpenTerminal(stations[0]?.name || 'PC-01')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
            title="Open Student Terminal on this screen"
          >
            <Laptop className="w-3.5 h-3.5 text-blue-600" />
            <span>Open Terminal Kiosk</span>
          </button>

          <button
            onClick={onBackToHub}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
          >
            Exit Portal
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-red-50 text-xs font-semibold text-red-600 hover:border-red-200 transition cursor-pointer shadow-xs"
              title="Sign out of Consultancy Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. Sub-Nav Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'results'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Student Test Results ({testResults.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'monitor'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Live Lab Invigilator Monitor</span>
            {activeStations.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('terminals')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'terminals'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Connect Multiple Computers ({stations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'students'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Candidates ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-reports')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'ai-reports'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Diagnostic Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('test-library')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'test-library'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Library className="w-4 h-4 text-indigo-500" />
            <span>Test Library</span>
            {assignedTestIds.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{assignedTestIds.length}</span>
            )}
          </button>
        </div>

        {/* Global Action */}
        {activeTab === 'monitor' && (
          <button
            onClick={() => handleOpenAssignModal(null)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Lab-Wide Test</span>
          </button>
        )}
      </div>

      {/* 3. Tab Contents */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* ================= BRANCH EXAM LAUNCH CONTROL (BROADCAST TO ALL STUDENT TERMINALS) ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          {activeLaunchedTest ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-emerald-50/80 border border-emerald-300 rounded-xl">
              <div className="flex items-start sm:items-center gap-3">
                <span className="relative flex h-3.5 w-3.5 mt-0.5 sm:mt-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                      Live Exam Session Active on All Student Terminals
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 font-mono">
                      Launched {new Date(activeLaunchedTest.launchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {activeLaunchedTest.title}
                  </h4>
                  <p className="text-xs text-slate-600">
                    All connected student workstations in this branch are displaying the "Start Test" button. Candidates only need to enter their name to begin.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleStopBranchTest}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>End / Stop Session</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Launch Exam Session to All Terminals
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Broadcast Test to All Student Workstations
                </h4>
                <p className="text-xs text-slate-500 max-w-xl">
                  Select an authentic Cambridge test below and click <strong>Launch Test</strong>. All connected student terminals will immediately display the "Start Test" button without seeing any other papers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <select
                  value={selectedTestToLaunch}
                  onChange={(e) => setSelectedTestToLaunch(e.target.value)}
                  className="bg-slate-50 border border-slate-300 font-bold text-slate-900 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-blue-600 focus:bg-white cursor-pointer min-w-[280px]"
                >
                  <optgroup label="Cambridge 16 Academic">
                    <option value="cambridge-16-test-1-writing">Cambridge 16 Test 1 — Writing</option>
                    <option value="cambridge-16-test-1-reading">Cambridge 16 Test 1 — Reading</option>
                    <option value="cambridge-16-test-1-listening">Cambridge 16 Test 1 — Listening</option>
                    <option value="cambridge-16-test-1-full">Cambridge 16 Test 1 — Full Mock (L+R+W)</option>
                    <option value="cambridge-16-test-2-writing">Cambridge 16 Test 2 — Writing</option>
                    <option value="cambridge-16-test-2-reading">Cambridge 16 Test 2 — Reading</option>
                    <option value="cambridge-16-test-2-listening">Cambridge 16 Test 2 — Listening</option>
                    <option value="cambridge-16-test-2-full">Cambridge 16 Test 2 — Full Mock (L+R+W)</option>
                    <option value="cambridge-16-test-3-writing">Cambridge 16 Test 3 — Writing</option>
                    <option value="cambridge-16-test-3-reading">Cambridge 16 Test 3 — Reading</option>
                    <option value="cambridge-16-test-3-listening">Cambridge 16 Test 3 — Listening</option>
                    <option value="cambridge-16-test-3-full">Cambridge 16 Test 3 — Full Mock (L+R+W)</option>
                    <option value="cambridge-16-test-4-writing">Cambridge 16 Test 4 — Writing</option>
                    <option value="cambridge-16-test-4-reading">Cambridge 16 Test 4 — Reading</option>
                    <option value="cambridge-16-test-4-listening">Cambridge 16 Test 4 — Listening</option>
                    <option value="cambridge-16-test-4-full">Cambridge 16 Test 4 — Full Mock (L+R+W)</option>
                  </optgroup>
                  <optgroup label="Cambridge 18 Academic">
                    <option value="cambridge-18-test-1-reading">Cambridge 18 Test 1 — Reading</option>
                    <option value="cambridge-18-test-1-listening">Cambridge 18 Test 1 — Listening</option>
                    <option value="cambridge-18-test-1-full">Cambridge 18 Test 1 — Full Mock</option>
                    <option value="cambridge-18-test-2-reading">Cambridge 18 Test 2 — Reading</option>
                    <option value="cambridge-18-test-2-listening">Cambridge 18 Test 2 — Listening</option>
                  </optgroup>
                  <optgroup label="Cambridge 19 Academic">
                    <option value="cambridge-19-test-1-reading">Cambridge 19 Test 1 — Reading</option>
                    <option value="cambridge-19-test-1-listening">Cambridge 19 Test 1 — Listening</option>
                    <option value="cambridge-19-test-1-full">Cambridge 19 Test 1 — Full Mock</option>
                    <option value="cambridge-19-test-2-reading">Cambridge 19 Test 2 — Reading</option>
                    <option value="cambridge-19-test-2-listening">Cambridge 19 Test 2 — Listening</option>
                  </optgroup>
                  <optgroup label="Cambridge 20 Academic">
                    <option value="cambridge-20-test-1-reading">Cambridge 20 Test 1 — Reading</option>
                    <option value="cambridge-20-test-1-listening">Cambridge 20 Test 1 — Listening</option>
                    <option value="cambridge-20-test-1-full">Cambridge 20 Test 1 — Full Mock</option>
                  </optgroup>
                  <optgroup label="Cambridge 21 Academic">
                    <option value="cambridge-21-test-1-reading">Cambridge 21 Test 1 — Reading</option>
                    <option value="cambridge-21-test-1-listening">Cambridge 21 Test 1 — Listening</option>
                    <option value="cambridge-21-test-1-full">Cambridge 21 Test 1 — Full Mock</option>
                  </optgroup>
                </select>

                <button
                  onClick={() => handleLaunchTestToBranch(selectedTestToLaunch)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Launch Test to All Terminals</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= TAB 0: STUDENT TEST RESULTS ================= */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Header / Overview card */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Live Candidate Results Center
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {consultancy.name} — Student Exam Submissions & Scorecards
                  </h3>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Every candidate who chooses {consultancy.name} has their mock exam results, raw scores, time taken, and AI diagnostics automatically synchronized here.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {testResults.filter((r) => !r.isPublished).length > 0 && (
                    <button
                      onClick={handlePublishAll}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                      title="Release all pending results to student verification portal"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish All Pending ({testResults.filter((r) => !r.isPublished).length})</span>
                    </button>
                  )}
                  {testResults.length > 0 && (
                    <button
                      onClick={handleClearAllResults}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 text-xs font-semibold rounded-xl transition cursor-pointer shadow-2xs"
                      title="Delete all test results for this consultancy"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button
                    onClick={reloadAll}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                    title="Refresh student results"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Statistics Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-semibold block">Total Tests Taken</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {testResults.length}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Across all Cambridge editions</span>
                </div>

                <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-xl">
                  <span className="text-[11px] text-blue-700 font-semibold block">Average Band Score</span>
                  <div className="text-2xl font-black text-blue-900 mt-1">
                    {testResults.length > 0
                      ? (
                          testResults.reduce((acc, r) => acc + (r.bandScore || 0), 0) / testResults.length
                        ).toFixed(1)
                      : '—'}
                  </div>
                  <span className="text-[10px] text-blue-600/80 mt-0.5 block">Target benchmark: Band 7.0</span>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-xl">
                  <span className="text-[11px] text-emerald-700 font-semibold block">Highest Band Achieved</span>
                  <div className="text-2xl font-black text-emerald-900 mt-1">
                    {testResults.length > 0
                      ? `Band ${Math.max(...testResults.map((r) => r.bandScore || 0)).toFixed(1)}`
                      : '—'}
                  </div>
                  <span className="text-[10px] text-emerald-600/80 mt-0.5 block">Top institutional score</span>
                </div>

                <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-xl">
                  <span className="text-[11px] text-amber-800 font-semibold block">High Band (7.0+) Rate</span>
                  <div className="text-2xl font-black text-amber-900 mt-1">
                    {testResults.length > 0
                      ? `${Math.round(
                          (testResults.filter((r) => r.bandScore >= 7.0).length / testResults.length) * 100
                        )}%`
                      : '0%'}
                  </div>
                  <span className="text-[10px] text-amber-700/80 mt-0.5 block">
                    {testResults.filter((r) => r.bandScore >= 7.0).length} of {testResults.length} exams
                  </span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchResult}
                  onChange={(e) => setSearchResult(e.target.value)}
                  placeholder="Search by student name, candidate ID, test title..."
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-slate-900 text-xs pl-10 pr-4 py-2 rounded-lg outline-none transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Module Filter */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-700">
                  <button
                    onClick={() => setResultModuleFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                      resultModuleFilter === 'all' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-slate-900'
                    }`}
                  >
                    All Papers
                  </button>
                  <button
                    onClick={() => setResultModuleFilter('reading')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
                      resultModuleFilter === 'reading' ? 'bg-white shadow-xs text-red-700' : 'hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3 h-3 text-red-600" />
                    <span>Reading</span>
                  </button>
                  <button
                    onClick={() => setResultModuleFilter('listening')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
                      resultModuleFilter === 'listening' ? 'bg-white shadow-xs text-blue-700' : 'hover:text-slate-900'
                    }`}
                  >
                    <Headphones className="w-3 h-3 text-blue-600" />
                    <span>Listening</span>
                  </button>
                  <button
                    onClick={() => setResultModuleFilter('writing')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
                      resultModuleFilter === 'writing' ? 'bg-white shadow-xs text-emerald-700' : 'hover:text-slate-900'
                    }`}
                  >
                    <PenTool className="w-3 h-3 text-emerald-600" />
                    <span>Writing</span>
                  </button>
                </div>

                {/* Band Score Filter */}
                <select
                  value={resultBandFilter}
                  onChange={(e) => setResultBandFilter(e.target.value as any)}
                  className="bg-white border border-slate-300 text-slate-700 text-xs px-2.5 py-1.5 rounded-lg outline-none font-semibold cursor-pointer"
                >
                  <option value="all">All Band Scores</option>
                  <option value="7.5">Band 7.5+ (Very Good)</option>
                  <option value="6.5">Band 6.5 - 7.0 (Competent)</option>
                  <option value="below">Band Below 6.5</option>
                </select>
              </div>
            </div>

            {/* Results Table */}
            {testResults.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">No exam submissions yet</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  When a student clicks on any mock test and enters their name with <strong>{consultancy.name}</strong>, their test score, band evaluation, and complete report will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Candidate Student</th>
                        <th className="px-6 py-3 font-semibold">Mock Exam Paper</th>
                        <th className="px-6 py-3 font-semibold text-center">IELTS Band</th>
                        <th className="px-6 py-3 font-semibold text-center">Score / Accuracy</th>
                        <th className="px-6 py-3 font-semibold text-center">Time Spent</th>
                        <th className="px-6 py-3 font-semibold text-center">Portal Status</th>
                        <th className="px-6 py-3 font-semibold">Completed Date</th>
                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {testResults
                        .filter((r) => {
                          if (searchResult.trim()) {
                            const query = searchResult.toLowerCase();
                            const matchName = (r.candidateName || '').toLowerCase().includes(query);
                            const matchId = (r.candidateId || '').includes(query);
                            const matchTitle = (r.testId || '').toLowerCase().includes(query);
                            if (!matchName && !matchId && !matchTitle) return false;
                          }
                          if (resultModuleFilter !== 'all' && r.module !== resultModuleFilter) return false;
                          if (resultBandFilter === '7.5' && r.bandScore < 7.5) return false;
                          if (resultBandFilter === '6.5' && (r.bandScore < 6.5 || r.bandScore >= 7.5)) return false;
                          if (resultBandFilter === 'below' && r.bandScore >= 6.5) return false;
                          return true;
                        })
                        .map((res, idx) => {
                          const isReading = res.module === 'reading';
                          const isWriting = res.module === 'writing';
                          const timeMins = Math.floor(res.timeTakenSeconds / 60);
                          const timeSecs = res.timeTakenSeconds % 60;
                          const accuracyPercent = res.totalQuestions
                            ? Math.round((res.correctCount / res.totalQuestions) * 100)
                            : 0;

                          return (
                            <tr key={idx} className="hover:bg-slate-50/80 transition">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                                    {(res.candidateName || 'C').charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 text-sm">
                                      {res.candidateName || 'Candidate'}
                                    </div>
                                    <div className="text-[11px] font-mono text-slate-500">
                                      #{res.candidateId || '00' + (idx + 1000)}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <div>
                                  <div className="font-semibold text-slate-800">
                                    Cambridge {res.book} Test {res.testNumber}
                                  </div>
                                  <span
                                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 border ${
                                      isWriting
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : isReading
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}
                                  >
                                    {isWriting ? (
                                      <PenTool className="w-2.5 h-2.5" />
                                    ) : isReading ? (
                                      <BookOpen className="w-2.5 h-2.5" />
                                    ) : (
                                      <Headphones className="w-2.5 h-2.5" />
                                    )}
                                    <span>Academic {isWriting ? 'Writing' : isReading ? 'Reading' : 'Listening'}</span>
                                  </span>
                                </div>
                              </td>

                              <td className="px-6 py-4 text-center">
                                {isWriting && (!res.writingSubmission?.overallWritingBand || res.writingSubmission.overallWritingBand === 0) ? (
                                  <span className="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-300">
                                    <PenTool className="w-3 h-3 text-amber-600" />
                                    <span>Needs Grade</span>
                                  </span>
                                ) : (
                                  <span
                                    className={`inline-flex items-center justify-center font-black text-sm px-3 py-1 rounded-xl shadow-xs border ${
                                      res.bandScore >= 7.5
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : res.bandScore >= 6.5
                                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                                        : 'bg-amber-50 text-amber-800 border-amber-300'
                                    }`}
                                  >
                                    Band {res.bandScore.toFixed(1)}
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-4 text-center">
                                {isWriting ? (
                                  <div>
                                    <div className="font-bold text-slate-900 text-xs">
                                      T1: {res.writingSubmission?.task1WordCount || 0}w • T2: {res.writingSubmission?.task2WordCount || 0}w
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-medium">
                                      {(res.writingSubmission?.task1WordCount || 0) + (res.writingSubmission?.task2WordCount || 0)} Total Words
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-bold text-slate-900 text-xs">
                                      {res.correctCount} / {res.totalQuestions || 40}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-medium">
                                      {accuracyPercent}% Correct
                                    </div>
                                  </div>
                                )}
                              </td>

                              <td className="px-6 py-4 text-center font-mono text-slate-600 text-xs">
                                <div className="flex items-center justify-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{timeMins}m {timeSecs}s</span>
                                </div>
                              </td>

                              <td className="px-6 py-4 text-center">
                                {res.isPublished ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>Published</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    <span>Pending Release</span>
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-4 text-slate-600 text-xs">
                                <div>
                                  {new Date(res.completedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {new Date(res.completedAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </td>

                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Grade Writing button */}
                                  {(isWriting || res.writingSubmission) && (
                                    <button
                                      onClick={() => handleOpenWritingEvaluation(res)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
                                      title="Review student essays and input band scores"
                                    >
                                      <PenTool className="w-3 h-3" />
                                      <span>{res.writingSubmission?.overallWritingBand ? 'Edit Grade' : 'Grade Writing'}</span>
                                    </button>
                                  )}

                                  {res.isPublished ? (
                                    <button
                                      onClick={() => handleUnpublishResult(res)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                                      title="Click to withdraw/unpublish result"
                                    >
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      <span>Published</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handlePublishResult(res)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
                                      title="Publish result so candidate can view scorecard with their Candidate ID or Name"
                                    >
                                      <Send className="w-3 h-3" />
                                      <span>Publish</span>
                                    </button>
                                  )}

                                  <button
                                    onClick={() =>
                                      setAiReportModalData({
                                        visible: true,
                                        studentName: res.candidateName || 'Candidate',
                                        bandScore: res.bandScore,
                                        module: res.module,
                                        testTitle: `Cambridge ${res.book} Test ${res.testNumber} (${res.module === 'reading' ? 'Reading' : res.module === 'writing' ? 'Writing' : 'Listening'})`,
                                        correctCount: res.correctCount,
                                        totalQuestions: res.totalQuestions || 40,
                                        timeTakenSeconds: res.timeTakenSeconds
                                      })
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
                                    title="View AI Diagnostic Evaluation"
                                  >
                                    <Sparkles className="w-3 h-3 text-amber-300" />
                                    <span>AI Report</span>
                                  </button>

                                  <button
                                    onClick={() => setScorecardModalResult(res)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition cursor-pointer"
                                    title="View answers breakdown"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Scorecard</span>
                                  </button>

                                  <button
                                    onClick={() => handleDeleteResult(res)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs"
                                    title="Delete this test result"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 1: LIVE LAB INVIGILATOR MONITOR ================= */}
        {activeTab === 'monitor' && (
          <div className="space-y-6">
            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{activeStations.length} In Progress</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>{pausedStations.length} Paused</span>
                </span>
                <span className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>{submittedStations.length} Completed</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>{idleStations.length} Idle / Ready</span>
                </span>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Station Telemetry Active (Live Synchronized)</span>
              </div>
            </div>

            {/* Live Stations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stations.map((st) => {
                const isRunning = st.status === 'in_progress';
                const isPaused = st.status === 'paused';
                const isSubmitted = st.status === 'submitted';
                const isIdle = st.status === 'idle' || st.status === 'assigned';

                const progressPercent =
                  st.totalQuestions && st.currentQuestion
                    ? Math.round((st.currentQuestion / st.totalQuestions) * 100)
                    : 0;

                const mins = st.remainingSeconds ? Math.floor(st.remainingSeconds / 60) : 0;
                const secs = st.remainingSeconds ? st.remainingSeconds % 60 : 0;
                const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

                return (
                  <div
                    key={st.id}
                    className={`bg-white border rounded-xl p-5 flex flex-col justify-between transition-all duration-150 shadow-xs ${
                      isRunning
                        ? 'border-emerald-300 ring-1 ring-emerald-200'
                        : isPaused
                        ? 'border-amber-300 ring-1 ring-amber-200'
                        : isSubmitted
                        ? 'border-blue-300'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Top Row: Station Name & Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs ${
                              isRunning
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {st.name}
                          </div>
                          <span className="font-bold text-sm text-slate-900">{st.name}</span>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            isRunning
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isPaused
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : isSubmitted
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {st.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Candidate info */}
                      {st.currentCandidate ? (
                        <div className="space-y-1 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 truncate">
                              {st.currentCandidate.name}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500">
                              #{st.currentCandidate.candidateId}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 truncate">
                            {st.testTitle || 'IELTS Mock Test'}
                          </p>

                          {/* Progress bar */}
                          {isRunning && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                                <span>Question {st.currentQuestion || 1} / 40</span>
                                <span className="font-mono text-emerald-700 font-bold">
                                  {timeFormatted} left
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 transition-all duration-300"
                                  style={{ width: `${progressPercent}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-xs text-slate-400 italic bg-slate-50 rounded-lg border border-dashed border-slate-200 mb-3">
                          Computer Ready for Candidate Check-in
                        </div>
                      )}
                    </div>

                    {/* Action Toolbar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                      {isIdle ? (
                        <button
                          onClick={() => handleOpenAssignModal(st)}
                          className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg font-semibold text-xs transition cursor-pointer text-center"
                        >
                          + Assign Exam
                        </button>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          {isRunning ? (
                            <button
                              onClick={() => ConsultancyService.pauseStation(consultancy.id, st.id)}
                              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded font-medium transition cursor-pointer flex items-center gap-1 border border-amber-200"
                              title="Pause examination"
                            >
                              <Pause className="w-3 h-3" />
                              <span>Pause</span>
                            </button>
                          ) : isPaused ? (
                            <button
                              onClick={() => ConsultancyService.resumeStation(consultancy.id, st.id)}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-medium transition cursor-pointer flex items-center gap-1 border border-emerald-200"
                              title="Resume examination"
                            >
                              <Play className="w-3 h-3" />
                              <span>Resume</span>
                            </button>
                          ) : null}

                          {!isSubmitted && (
                            <button
                              onClick={() => ConsultancyService.forceSubmitStation(consultancy.id, st.id)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded font-medium transition cursor-pointer"
                              title="Force submit test"
                            >
                              End Test
                            </button>
                          )}

                          <button
                            onClick={() => ConsultancyService.resetStation(consultancy.id, st.id)}
                            className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded transition cursor-pointer"
                            title="Reset station to Idle"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Exam Submissions in Live Monitor */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-sm text-slate-900">
                    Recent Candidate Exam Submissions
                  </h4>
                </div>
                <button
                  onClick={() => setActiveTab('results')}
                  className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  View All ({testResults.length}) →
                </button>
              </div>

              {testResults.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  No tests submitted yet. When candidates finish exams, scores and reports stream here live.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {testResults.slice(0, 3).map((res, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">
                            {res.candidateName || 'Candidate'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            #{res.candidateId || '00' + (i + 1000)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 truncate">
                          Cambridge {res.book} Test {res.testNumber} ({res.module})
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                        <span className="font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md text-xs">
                          Band {res.bandScore.toFixed(1)}
                        </span>
                        <button
                          onClick={() =>
                            setAiReportModalData({
                              visible: true,
                              studentName: res.candidateName || 'Candidate',
                              bandScore: res.bandScore,
                              module: res.module,
                              testTitle: `Cambridge ${res.book} Test ${res.testNumber}`,
                              correctCount: res.correctCount,
                              totalQuestions: res.totalQuestions || 40,
                              timeTakenSeconds: res.timeTakenSeconds
                            })
                          }
                          className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CONNECT MULTIPLE COMPUTERS ================= */}
        {activeTab === 'terminals' && (
          <div className="space-y-6">
            {/* Quick Connect & Universal Setup Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1">
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Quick Lab Setup</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                    Connect Student Computers to Your Center
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
                    Set up your physical lab in minutes. You can use the Universal Link on all computers, or copy direct links for specific stations (PC-01, PC-02...).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowPrintDeskCardsModal(true)}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs border border-slate-300"
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-600" />
                    <span>Print Desk QR Cards</span>
                  </button>
                  <button
                    onClick={() => handleQuickAddBatch(5)}
                    className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs border border-indigo-200"
                    title="Automatically create the next 5 PCs (e.g. PC-09 to PC-13)"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Quick Add 5 PCs</span>
                  </button>
                  <button
                    onClick={() => setShowAddStationModal(true)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Single PC</span>
                  </button>
                </div>
              </div>

              {/* Universal Lab Pairing URL Banner */}
              <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200 p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                      Universal Lab Setup Link (Works on ALL computers)
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="font-mono text-xs text-slate-800 font-semibold select-all break-all bg-white px-3 py-1.5 rounded-lg border border-blue-200 inline-block">
                    {window.location.origin}/?mode=terminal&amp;cid={consultancy.id}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    💡 <strong>How it works:</strong> Open this single link on any student PC. It shows a 1-tap PC selector (PC-01, PC-02...) so the computer pairs immediately without typing passwords.
                  </p>
                </div>

                <button
                  onClick={copyLabPairingLink}
                  className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                    copiedLink
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied Universal URL!' : 'Copy Universal Link'}</span>
                </button>
              </div>

              {/* 3 Simple Setup Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900">Direct Station Links</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Click <strong>"Copy Link"</strong> on any PC row below to get its dedicated URL (e.g. PC-01). Set it as the browser homepage or bookmark on that PC.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900">Universal Link (1-Tap PC Select)</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Open the Universal Link above. The screen shows all PC buttons. Tap which PC it is once, and it permanently connects.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900">Desk QR Code Cards</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Click <strong>"Print Desk QR Cards"</strong> to print station cards with QR codes and URLs to stick directly on student desks.
                  </p>
                </div>
              </div>
            </div>

            {/* Stations Registry Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Configured Lab Terminals ({stations.length} / {consultancy.computerLimit} PCs)
                  </h3>
                  <p className="text-xs text-slate-500">
                    {consultancy.computerLimit - stations.length} license slots available
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuickAddBatch(5)}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    + Add 5 More PCs
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={() => handleQuickAddBatch(10)}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    + Add 10 More PCs
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Station Name</th>
                      <th className="px-6 py-3 font-semibold">Current Status</th>
                      <th className="px-6 py-3 font-semibold">Assigned Candidate</th>
                      <th className="px-6 py-3 font-semibold">Direct Setup URL</th>
                      <th className="px-6 py-3 font-semibold">Last Heartbeat</th>
                      <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stations.map((st) => {
                      const isCopied = copiedStationName === st.name;
                      return (
                        <tr key={st.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-3 font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                              {st.name}
                            </div>
                            <span className="font-semibold text-slate-900">{st.name}</span>
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border inline-flex items-center gap-1 ${
                                st.status === 'in_progress'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : st.status === 'paused'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  st.status === 'in_progress'
                                    ? 'bg-emerald-500 animate-pulse'
                                    : st.status === 'paused'
                                    ? 'bg-amber-500'
                                    : 'bg-slate-400'
                                }`}
                              />
                              <span>{st.status.replace('_', ' ')}</span>
                            </span>
                          </td>
                          <td className="px-6 py-3 text-slate-700">
                            {st.currentCandidate?.name || '—'}
                          </td>
                          <td className="px-6 py-3 font-mono text-[11px] text-slate-500">
                            <button
                              onClick={() => copyStationLink(st.name)}
                              className={`px-2.5 py-1 rounded-lg border font-mono text-xs transition cursor-pointer flex items-center gap-1.5 ${
                                isCopied
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                              title="Copy 1-Click Link for this PC"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{isCopied ? 'Copied Link!' : `Copy Link for ${st.name}`}</span>
                            </button>
                          </td>
                          <td className="px-6 py-3 font-mono text-slate-500 text-xs">
                            {st.lastHeartbeat ? new Date(st.lastHeartbeat).toLocaleTimeString() : '—'}
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedStationForQr(st)}
                                className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition cursor-pointer border border-transparent hover:border-blue-200"
                                title="View Station QR Code & Card"
                              >
                                <QrCode className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const url = `${window.location.origin}/?mode=terminal&station=${encodeURIComponent(st.name)}&cid=${consultancy.id}`;
                                  window.open(url, '_blank');
                                }}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition cursor-pointer border border-transparent hover:border-slate-200"
                                title="Launch this PC Kiosk in New Tab"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Remove ${st.name} from lab?`)) {
                                    ConsultancyService.deleteStation(consultancy.id, st.id);
                                    reloadAll();
                                  }
                                }}
                                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer border border-transparent hover:border-red-200"
                                title="Delete Station"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: STUDENT CANDIDATE REGISTRY ================= */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Search students by name, candidate ID, phone..."
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 text-xs pl-10 pr-4 py-2.5 rounded-lg outline-none shadow-xs"
                />
              </div>

              <button
                onClick={() => setShowAddStudentModal(true)}
                className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Candidate</span>
              </button>
            </div>

            {/* Students Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Candidate ID</th>
                      <th className="px-6 py-3 font-semibold">Full Name</th>
                      <th className="px-6 py-3 font-semibold">Target Band</th>
                      <th className="px-6 py-3 font-semibold">Mocks Done</th>
                      <th className="px-6 py-3 font-semibold">Highest Band</th>
                      <th className="px-6 py-3 font-semibold">Avg Band</th>
                      <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students
                      .filter(
                        (s) =>
                          s.fullName.toLowerCase().includes(searchStudent.toLowerCase()) ||
                          s.candidateNumber.includes(searchStudent) ||
                          s.phone.includes(searchStudent)
                      )
                      .map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-3 font-mono font-bold text-slate-900">
                            #{std.candidateNumber}
                          </td>
                          <td className="px-6 py-3 font-semibold text-slate-900">
                            <div>{std.fullName}</div>
                            <div className="text-[11px] text-slate-500 font-normal">{std.email}</div>
                          </td>
                          <td className="px-6 py-3 font-bold text-blue-600">
                            Band {std.targetBand.toFixed(1)}
                          </td>
                          <td className="px-6 py-3 text-slate-700">
                            {std.testsCompletedCount} tests
                          </td>
                          <td className="px-6 py-3 font-bold text-emerald-600">
                            {std.highestBand ? `Band ${std.highestBand.toFixed(1)}` : '—'}
                          </td>
                          <td className="px-6 py-3 font-semibold text-slate-800">
                            {std.averageBand ? `Band ${std.averageBand.toFixed(1)}` : '—'}
                          </td>
                          <td className="px-6 py-3 text-right">
                            <button
                              onClick={() => {
                                handleOpenAssignModal(idleStations[0] || null);
                                setAssignForm((prev) => ({
                                  ...prev,
                                  studentName: std.fullName,
                                  candidateId: std.candidateNumber,
                                  targetBand: std.targetBand
                                }));
                              }}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded font-semibold text-xs transition cursor-pointer"
                            >
                              Assign Test
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: AI DIAGNOSTIC REPORTS ================= */}
        {activeTab === 'ai-reports' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Consultancy AI Diagnostic Center
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                Every mock test completed in your lab is analyzed by our IELTS Diagnostic Engine.
                View student weaknesses, CEFR proficiency levels, and generate official consultancy diagnostic reports ready to print or share with parents.
              </p>
            </div>

            {/* Reports List */}
            {aiReports.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 p-12 text-center rounded-xl text-slate-500 text-xs">
                No diagnostic reports generated yet. Reports appear automatically when students finish exams on lab terminals.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiReports.map((report, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-xl flex items-center justify-between shadow-xs transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">
                          {report.studentName}
                        </h4>
                        <span className="font-mono text-xs text-slate-500">
                          #{report.candidateId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{report.testTitle}</p>
                      <div className="flex items-center gap-2 mt-2 pt-1">
                        <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                          Band {report.bandScore.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-500">
                          Score: {report.correctCount} / {report.totalQuestions}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setAiReportModalData({
                          visible: true,
                          ...report
                        })
                      }
                      className="flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white font-medium text-xs px-3.5 py-2 rounded-lg transition cursor-pointer shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View AI Report</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: TEST LIBRARY ================= */}
        {activeTab === 'test-library' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Library className="w-5 h-5 text-indigo-600" />
                    Test Library — Assign Tests for Students
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                    Select which Cambridge tests your students will see in their terminal. Only the tests you enable here will appear when students log in. Each full mock test includes <strong>1 Reading (60 min)</strong> + <strong>1 Listening (35 min)</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    {assignedTestIds.length} / {tests.length} tests assigned
                  </span>
                  <button
                    onClick={() => {
                      if (assignedTestIds.length === tests.length) {
                        ConsultancyService.setAssignedTestIds(consultancyId, []);
                        setAssignedTestIds([]);
                      } else {
                        const allIds = tests.map(t => t.id);
                        ConsultancyService.setAssignedTestIds(consultancyId, allIds);
                        setAssignedTestIds(allIds);
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer transition"
                  >
                    {assignedTestIds.length === tests.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Full Mock Tests (paired reading + listening) */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Full Mock Tests (Reading + Listening Paired)
              </h3>
              <p className="text-xs text-slate-500 -mt-2">
                Selecting a full mock test enables both the reading and listening modules for that test. Students can take them as a combined real-like exam.
              </p>

              {[16, 18, 19, 20, 21].map((book) => {
                const bookFullTests = allFullMockTests.filter(f => f.book === book);
                const bookTestIds = bookFullTests.flatMap(f => [
                  f.readingTest.id,
                  f.listeningTest.id,
                  ...(f.writingTest ? [f.writingTest.id] : [])
                ]);
                const allBookSelected = bookTestIds.every(id => assignedTestIds.includes(id));
                const someBookSelected = bookTestIds.some(id => assignedTestIds.includes(id));

                return (
                  <div key={book} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                    {/* Book Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                          Cambridge {book}
                        </span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
                          {bookFullTests.length} Tests
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          let newIds = [...assignedTestIds];
                          if (allBookSelected) {
                            // Remove all book tests
                            newIds = newIds.filter(id => !bookTestIds.includes(id));
                          } else {
                            // Add all book tests
                            for (const id of bookTestIds) {
                              if (!newIds.includes(id)) newIds.push(id);
                            }
                          }
                          ConsultancyService.setAssignedTestIds(consultancyId, newIds);
                          setAssignedTestIds(newIds);
                        }}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border cursor-pointer transition ${
                          allBookSelected
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                            : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {allBookSelected ? 'Deselect Book' : 'Select All'}
                      </button>
                    </div>

                    {/* Test rows */}
                    <div className="divide-y divide-slate-100">
                      {bookFullTests.map((fullTest) => {
                        const readingSelected = assignedTestIds.includes(fullTest.readingTest.id);
                        const listeningSelected = assignedTestIds.includes(fullTest.listeningTest.id);
                        const writingSelected = fullTest.writingTest ? assignedTestIds.includes(fullTest.writingTest.id) : true;
                        const allSelected = readingSelected && listeningSelected && writingSelected;

                        return (
                          <div
                            key={fullTest.id}
                            className={`flex items-center justify-between px-4 py-3 transition ${
                              allSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                onClick={() => {
                                  let newIds = [...assignedTestIds];
                                  if (allSelected) {
                                    newIds = newIds.filter(
                                      id =>
                                        id !== fullTest.readingTest.id &&
                                        id !== fullTest.listeningTest.id &&
                                        (!fullTest.writingTest || id !== fullTest.writingTest.id)
                                    );
                                  } else {
                                    if (!newIds.includes(fullTest.readingTest.id)) newIds.push(fullTest.readingTest.id);
                                    if (!newIds.includes(fullTest.listeningTest.id)) newIds.push(fullTest.listeningTest.id);
                                    if (fullTest.writingTest && !newIds.includes(fullTest.writingTest.id)) {
                                      newIds.push(fullTest.writingTest.id);
                                    }
                                  }
                                  ConsultancyService.setAssignedTestIds(consultancyId, newIds);
                                  setAssignedTestIds(newIds);
                                }}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition ${
                                  allSelected
                                    ? 'bg-indigo-600 border-indigo-600'
                                    : someBookSelected && (readingSelected || listeningSelected || (fullTest.writingTest && assignedTestIds.includes(fullTest.writingTest.id)))
                                    ? 'bg-indigo-200 border-indigo-400'
                                    : 'border-slate-300 hover:border-indigo-400'
                                }`}
                              >
                                {allSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900">
                                  Test {fullTest.testNumber}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {fullTest.totalDurationMinutes} min total
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  let newIds = [...assignedTestIds];
                                  if (readingSelected) {
                                    newIds = newIds.filter(id => id !== fullTest.readingTest.id);
                                  } else {
                                    newIds.push(fullTest.readingTest.id);
                                  }
                                  ConsultancyService.setAssignedTestIds(consultancyId, newIds);
                                  setAssignedTestIds(newIds);
                                }}
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer transition ${
                                  readingSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold shadow-2xs'
                                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                                }`}
                                title="Click to toggle Reading module"
                              >
                                <BookOpen className="w-3 h-3" />
                                <span>Reading (60m)</span>
                                {readingSelected && <Check className="w-2.5 h-2.5 ml-0.5 text-blue-700" />}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  let newIds = [...assignedTestIds];
                                  if (listeningSelected) {
                                    newIds = newIds.filter(id => id !== fullTest.listeningTest.id);
                                  } else {
                                    newIds.push(fullTest.listeningTest.id);
                                  }
                                  ConsultancyService.setAssignedTestIds(consultancyId, newIds);
                                  setAssignedTestIds(newIds);
                                }}
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer transition ${
                                  listeningSelected
                                    ? 'bg-purple-50 text-purple-700 border-purple-300 font-bold shadow-2xs'
                                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                                }`}
                                title="Click to toggle Listening module"
                              >
                                <Headphones className="w-3 h-3" />
                                <span>Listening (35m)</span>
                                {listeningSelected && <Check className="w-2.5 h-2.5 ml-0.5 text-purple-700" />}
                              </button>
                              {fullTest.writingTest && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    let newIds = [...assignedTestIds];
                                    if (assignedTestIds.includes(fullTest.writingTest!.id)) {
                                      newIds = newIds.filter(id => id !== fullTest.writingTest!.id);
                                    } else {
                                      newIds.push(fullTest.writingTest!.id);
                                    }
                                    ConsultancyService.setAssignedTestIds(consultancyId, newIds);
                                    setAssignedTestIds(newIds);
                                  }}
                                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer transition ${
                                    assignedTestIds.includes(fullTest.writingTest.id)
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold shadow-2xs'
                                      : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                                  }`}
                                  title="Click to toggle Writing module"
                                >
                                  <PenTool className="w-3 h-3" />
                                  <span>Writing (60m)</span>
                                  {assignedTestIds.includes(fullTest.writingTest.id) && (
                                    <Check className="w-2.5 h-2.5 ml-0.5 text-emerald-700" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save confirmation */}
            {assignedTestIds.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{assignedTestIds.length} tests assigned.</span>
                  <span className="text-emerald-600">Students will only see these tests in their terminal.</span>
                </div>
              </div>
            )}
            {assignedTestIds.length === 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-2 text-xs text-amber-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-semibold">No tests assigned yet.</span>
                <span>Students will see all available tests until you assign specific ones.</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL 1: ASSIGN EXAM */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-xl p-6 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {selectedStationForAssign
                  ? `Assign Test to ${selectedStationForAssign.name}`
                  : `Launch Lab-Wide Test (${idleStations.length} Idle PCs)`}
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssign} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Select Official Mock Test *
                </label>
                <select
                  value={assignForm.testId}
                  onChange={(e) => setAssignForm({ ...assignForm, testId: e.target.value })}
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                >
                  {tests.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.module.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              {selectedStationForAssign && (
                <>
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      value={assignForm.studentName}
                      onChange={(e) => setAssignForm({ ...assignForm, studentName: e.target.value })}
                      placeholder="e.g. Sujan Sharma"
                      className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Candidate Number
                      </label>
                      <input
                        type="text"
                        value={assignForm.candidateId}
                        onChange={(e) => setAssignForm({ ...assignForm, candidateId: e.target.value })}
                        className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Target Band Score
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="5.0"
                        max="9.0"
                        value={assignForm.targetBand}
                        onChange={(e) => setAssignForm({ ...assignForm, targetBand: Number(e.target.value) })}
                        className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer shadow-xs"
                >
                  Launch Test on Terminal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD STATION */}
      {showAddStationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-xl p-6 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Lab Computer Station</h3>
              <button
                onClick={() => setShowAddStationModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStation} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Station Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={newStationName}
                  onChange={(e) => setNewStationName(e.target.value)}
                  placeholder="e.g. PC-09"
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none font-bold"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Available license capacity: {consultancy.computerLimit - stations.length} PCs
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStationModal(false)}
                  className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer shadow-xs"
                >
                  Register Station
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SINGLE STATION QR CODE & DIRECT LINK */}
      {selectedStationForQr && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold font-mono flex items-center justify-center text-xs">
                  {selectedStationForQr.name}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedStationForQr.name} Setup Card</h3>
                  <p className="text-[11px] text-slate-500">{consultancy?.name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStationForQr(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="w-48 h-48 mx-auto p-2 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    `${window.location.origin}/?mode=terminal&station=${encodeURIComponent(
                      selectedStationForQr.name
                    )}&cid=${consultancy?.id}`
                  )}`}
                  alt={`QR for ${selectedStationForQr.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[11px] text-slate-800 font-bold select-all bg-slate-50 p-2 rounded-lg border border-slate-200 break-all">
                  {window.location.origin}/?mode=terminal&amp;station={selectedStationForQr.name}&amp;cid={consultancy?.id}
                </div>
                <p className="text-[11px] text-slate-500">
                  Scan with camera or open URL on {selectedStationForQr.name} to connect instantly.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => copyStationLink(selectedStationForQr.name)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Direct URL</span>
                </button>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/?mode=terminal&station=${encodeURIComponent(
                      selectedStationForQr.name
                    )}&cid=${consultancy?.id}`;
                    window.open(url, '_blank');
                  }}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer border border-slate-300"
                  title="Open this station in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE DESK SETUP CARDS */}
      {showPrintDeskCardsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 max-w-4xl w-full rounded-2xl p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-blue-600" />
                  <span>Print Lab Station Desk Cards</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Print and place these cards on student computer desks in your testing lab.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Cards</span>
                </button>
                <button
                  onClick={() => setShowPrintDeskCardsModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto p-1">
              {stations.map((st) => {
                const stationUrl = `${window.location.origin}/?mode=terminal&station=${encodeURIComponent(
                  st.name
                )}&cid=${consultancy?.id}`;
                return (
                  <div
                    key={st.id}
                    className="p-4 rounded-xl border-2 border-slate-300 bg-white space-y-2.5 text-center shadow-xs"
                  >
                    <div className="border-b border-slate-200 pb-1.5">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        IELTS CD-MOCK TEST STATION
                      </div>
                      <div className="font-extrabold text-xs text-blue-700 truncate">{consultancy?.name}</div>
                    </div>

                    <div className="inline-block px-4 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-xl">
                      {st.name}
                    </div>

                    <div className="w-28 h-28 mx-auto bg-white p-1 border border-slate-200 rounded-lg flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                          stationUrl
                        )}`}
                        alt={`QR ${st.name}`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="text-[10px] text-slate-600 space-y-0.5 text-left bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="font-bold text-slate-800">Student Instructions:</div>
                      <div>1. Scan QR code or type URL</div>
                      <div>2. Enter your Name &amp; wait</div>
                      <div>3. Invigilator launches exam</div>
                    </div>

                    <div className="font-mono text-[9px] text-slate-500 truncate bg-slate-100 p-1 rounded">
                      {stationUrl}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD STUDENT */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-xl p-6 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Register Student Candidate</h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Full Candidate Name *
                </label>
                <input
                  type="text"
                  required
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  placeholder="e.g. Sujan Sharma"
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newStudentForm.email}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="text"
                    value={newStudentForm.phone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    placeholder="98XXXXXXXX"
                    className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Target Band Score
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="5.0"
                  max="9.0"
                  value={newStudentForm.targetBand}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, targetBand: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 p-2.5 rounded-lg outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer shadow-xs"
                >
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI DIAGNOSTIC REPORT MODAL */}
      {aiReportModalData && (
        <AIDiagnosticReportModal
          reportData={aiReportModalData}
          consultancyName={consultancy.name}
          onClose={() => setAiReportModalData(null)}
        />
      )}

      {/* SCORECARD DETAILS MODAL */}
      {scorecardModalResult && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setScorecardModalResult(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 max-w-xl w-full rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in max-h-[90vh] flex flex-col cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base">
                    Candidate Examination Scorecard
                  </span>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">
                    #{scorecardModalResult.candidateId || 'Candidate'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {scorecardModalResult.candidateName} • Cambridge {scorecardModalResult.book} Test {scorecardModalResult.testNumber} ({scorecardModalResult.module})
                </p>
              </div>

              <button
                onClick={() => setScorecardModalResult(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metric Summary Cards */}
            {scorecardModalResult.module === 'writing' || scorecardModalResult.writingSubmission ? (
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Writing Band</span>
                  <span className="text-xl font-black text-slate-900 font-mono">
                    {scorecardModalResult.writingSubmission?.overallWritingBand
                      ? `Band ${scorecardModalResult.writingSubmission.overallWritingBand.toFixed(1)}`
                      : scorecardModalResult.bandScore > 0
                      ? `Band ${scorecardModalResult.bandScore.toFixed(1)}`
                      : 'Needs Grade'}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Task 1 Words</span>
                  <span className={`text-base font-black ${
                    (scorecardModalResult.writingSubmission?.task1WordCount || 0) >= 150
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}>
                    {scorecardModalResult.writingSubmission?.task1WordCount || 0}w{' '}
                    <span className="text-[10px] font-normal text-slate-500">(Min: 150)</span>
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Task 2 Words</span>
                  <span className={`text-base font-black ${
                    (scorecardModalResult.writingSubmission?.task2WordCount || 0) >= 250
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}>
                    {scorecardModalResult.writingSubmission?.task2WordCount || 0}w{' '}
                    <span className="text-[10px] font-normal text-slate-500">(Min: 250)</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Estimated Band</span>
                  <span className="text-xl font-black text-slate-900">
                    Band {scorecardModalResult.bandScore.toFixed(1)}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Raw Accuracy</span>
                  <span className="text-xl font-black text-emerald-600">
                    {scorecardModalResult.correctCount} / {scorecardModalResult.totalQuestions || 40}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Time Spent</span>
                  <span className="text-xl font-black text-blue-600">
                    {Math.floor(scorecardModalResult.timeTakenSeconds / 60)}m
                  </span>
                </div>
              </div>
            )}

            {/* Answer Responses Preview OR Writing Submissions Preview */}
            {scorecardModalResult.module === 'writing' || scorecardModalResult.writingSubmission ? (
              <div className="flex-1 overflow-y-auto space-y-4 border border-slate-200 rounded-xl p-4 bg-slate-50/50 text-xs">
                {/* Examiner Rubric Remarks (if graded) */}
                {scorecardModalResult.writingSubmission?.overallWritingBand ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span>Evaluated Band Breakdown:</span>
                      <span>
                        T1: Band {scorecardModalResult.writingSubmission.task1Band ?? '—'} • T2: Band {scorecardModalResult.writingSubmission.task2Band ?? '—'}
                      </span>
                    </div>
                    {scorecardModalResult.writingSubmission.adminFeedback && (
                      <p className="italic text-emerald-800 text-[11px] pt-1">
                        "{scorecardModalResult.writingSubmission.adminFeedback}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between gap-2">
                    <span className="text-amber-800 font-medium">
                      This writing submission has not yet been marked by an examiner.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const target = scorecardModalResult;
                        setScorecardModalResult(null);
                        handleOpenWritingEvaluation(target);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shrink-0 cursor-pointer shadow-xs"
                    >
                      Input Band Score Now
                    </button>
                  </div>
                )}

                {/* Task 1 Preview */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                    <span className="font-bold text-slate-800">Task 1 Written Response</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {scorecardModalResult.writingSubmission?.task1WordCount || 0} words
                    </span>
                  </div>
                  <div className="max-h-36 overflow-y-auto whitespace-pre-wrap text-slate-700 font-sans text-xs leading-relaxed select-text">
                    {scorecardModalResult.writingSubmission?.task1Essay || (
                      <span className="text-slate-400 italic">No essay written for Task 1.</span>
                    )}
                  </div>
                </div>

                {/* Task 2 Preview */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                    <span className="font-bold text-slate-800">Task 2 Written Response</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {scorecardModalResult.writingSubmission?.task2WordCount || 0} words
                    </span>
                  </div>
                  <div className="max-h-44 overflow-y-auto whitespace-pre-wrap text-slate-700 font-sans text-xs leading-relaxed select-text">
                    {scorecardModalResult.writingSubmission?.task2Essay || (
                      <span className="text-slate-400 italic">No essay written for Task 2.</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                <span className="font-bold text-xs text-slate-700 block mb-2">
                  Recorded Candidate Answer Entries (40 Questions)
                </span>

                {scorecardModalResult.answers && Object.keys(scorecardModalResult.answers).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {Array.from({ length: scorecardModalResult.totalQuestions || 40 }, (_, idx) => {
                      const qNum = idx + 1;
                      const ans = scorecardModalResult.answers[qNum];
                      const ansDisplay = Array.isArray(ans) ? ans.join(', ') : ans || '—';
                      return (
                        <div
                          key={qNum}
                          className="bg-white border border-slate-200 p-2 rounded-lg text-xs"
                        >
                          <span className="font-mono text-slate-400 text-[10px] block">
                            Q{qNum}:
                          </span>
                          <span className="font-semibold text-slate-800 truncate block">
                            {ansDisplay}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400 italic">
                    Answers recorded and evaluated in diagnostic report.
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Transmitted: {new Date(scorecardModalResult.completedAt).toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                {(scorecardModalResult.module === 'writing' || scorecardModalResult.writingSubmission) && (
                  <button
                    onClick={() => {
                      const target = scorecardModalResult;
                      setScorecardModalResult(null);
                      handleOpenWritingEvaluation(target);
                    }}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Grade / Edit Writing</span>
                  </button>
                )}
                <button
                  onClick={() => handleDeleteResult(scorecardModalResult)}
                  className="px-3.5 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 rounded-lg font-semibold text-xs cursor-pointer transition flex items-center gap-1.5"
                  title="Delete this result permanently"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Result</span>
                </button>
                <button
                  onClick={() => setScorecardModalResult(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Close Scorecard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WRITING MODULE EVALUATION MODAL */}
      {writingModalResult && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in cursor-pointer"
          onClick={() => setWritingModalResult(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 max-w-3xl w-full rounded-2xl shadow-2xl space-y-4 max-h-[92vh] flex flex-col overflow-hidden cursor-default"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Writing Submission Evaluation & Scoring
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Official CD-IELTS Rubric
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-slate-900">{writingModalResult.candidateName || 'Candidate'}</strong> (#{writingModalResult.candidateId}) • Cambridge {writingModalResult.book} Test {writingModalResult.testNumber} Writing
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWritingModalResult(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Task 1 Section */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Task 1 Response (Report / Summary)</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      (writingModalResult.writingSubmission?.task1WordCount || 0) >= 150
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {writingModalResult.writingSubmission?.task1WordCount || 0} words (Min: 150)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="font-bold text-slate-700">Task 1 Band Score:</label>
                    <select
                      value={writingGradeForm.task1Band}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const newOverall = Math.round(((val + 2 * writingGradeForm.task2Band) / 3) * 2) / 2;
                        setWritingGradeForm((prev) => ({
                          ...prev,
                          task1Band: val,
                          overallWritingBand: newOverall
                        }));
                      }}
                      className="bg-slate-50 border border-slate-300 font-bold text-slate-900 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      {[0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((b) => (
                        <option key={b} value={b}>Band {b.toFixed(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-xs text-slate-800 leading-relaxed select-text">
                  {writingModalResult.writingSubmission?.task1Essay || (
                    <span className="text-slate-400 italic">No essay text provided by candidate for Task 1.</span>
                  )}
                </div>
              </div>

              {/* Task 2 Section */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Task 2 Response (Discursive Essay)</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      (writingModalResult.writingSubmission?.task2WordCount || 0) >= 250
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {writingModalResult.writingSubmission?.task2WordCount || 0} words (Min: 250)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="font-bold text-slate-700">Task 2 Band Score:</label>
                    <select
                      value={writingGradeForm.task2Band}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const newOverall = Math.round(((writingGradeForm.task1Band + 2 * val) / 3) * 2) / 2;
                        setWritingGradeForm((prev) => ({
                          ...prev,
                          task2Band: val,
                          overallWritingBand: newOverall
                        }));
                      }}
                      className="bg-slate-50 border border-slate-300 font-bold text-slate-900 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      {[0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((b) => (
                        <option key={b} value={b}>Band {b.toFixed(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-xs text-slate-800 leading-relaxed select-text">
                  {writingModalResult.writingSubmission?.task2Essay || (
                    <span className="text-slate-400 italic">No essay text provided by candidate for Task 2.</span>
                  )}
                </div>
              </div>

              {/* Overall Band & Examiner Feedback */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Calculated Overall Writing Band Score
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Official IELTS weighting: Task 2 is weighted double Task 1 ((T1 + 2×T2) / 3 rounded to nearest 0.5 band).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-emerald-800 font-mono">
                      Band {writingGradeForm.overallWritingBand.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Examiner Diagnostic Feedback & Rubric Remarks
                  </label>
                  <textarea
                    rows={3}
                    value={writingGradeForm.adminFeedback}
                    onChange={(e) => setWritingGradeForm({ ...writingGradeForm, adminFeedback: e.target.value })}
                    placeholder="e.g. Task 1 provides clear overview with accurate trend synthesis. Task 2 exhibits strong paragraph coherence and good lexical range, though complex grammatical accuracy can be polished."
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-600 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setWritingModalResult(null)}
                className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveWritingGrade(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Save Evaluation (Draft)
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveWritingGrade(true)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save & Publish Result to Candidate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultancyPortal;
