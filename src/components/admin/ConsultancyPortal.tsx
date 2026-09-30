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
  LogOut
} from 'lucide-react';
import type {
  Consultancy,
  LabStation,
  ConsultancyStudent,
  SavedAIReport
} from '../../types/consultancy';
import type { IELTSMockTest } from '../../types/ielts';
import { ConsultancyService } from '../../services/consultancyService';
import { AIDiagnosticReportModal } from '../results/AIDiagnosticReportModal';

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

  const [activeTab, setActiveTab] = useState<'monitor' | 'terminals' | 'students' | 'ai-reports'>('monitor');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchStudent, setSearchStudent] = useState('');

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
    module: 'reading' | 'listening';
    testTitle: string;
    correctCount: number;
    totalQuestions: number;
    timeTakenSeconds: number;
  } | null>(null);

  // Reload local state from service
  const reloadAll = () => {
    setConsultancy(ConsultancyService.getConsultancyById(consultancyId));
    setStations(ConsultancyService.getStations(consultancyId));
    setStudents(ConsultancyService.getStudents(consultancyId));
    setAiReports(ConsultancyService.getReports(consultancyId));
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
      } else if (event.type === 'REPORT_ADDED') {
        setAiReports(ConsultancyService.getReports(consultancyId));
        setStudents(ConsultancyService.getStudents(consultancyId));
      }
    });

    const interval = setInterval(() => {
      setStations(ConsultancyService.getStations(consultancyId));
      setAiReports(ConsultancyService.getReports(consultancyId));
    }, 4000);

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
    const url = `${window.location.origin}/?mode=terminal&consultancy=${consultancy.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
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
    }

    setShowAssignModal(false);
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
      <header className="border-b border-slate-200 bg-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3.5">
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
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-1.5 overflow-x-auto">
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
          </div>
        )}

        {/* ================= TAB 2: CONNECT MULTIPLE COMPUTERS ================= */}
        {activeTab === 'terminals' && (
          <div className="space-y-6">
            {/* Quick Connect Guide Banner */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-blue-600" />
                    <span>How to Connect Multiple Computers for Students</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    You can link all 10 to 50 computers in your consultancy lab. Once a computer connects, it pairs automatically with this dashboard.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddStationModal(true)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Station</span>
                </button>
              </div>

              {/* Step by Step */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900">Open Terminal Link on Student PC</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Open the browser on any computer in your lab and paste your custom pairing link.
                  </p>
                  <button
                    onClick={copyLabPairingLink}
                    className="text-blue-600 hover:underline text-xs font-semibold block pt-1 cursor-pointer"
                  >
                    Copy Lab Station Link
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900">Enter PC Number, Branch Code & Password</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    No student name needed! Students simply enter Branch Code: <strong className="text-blue-700 font-mono">{consultancy.branchCode || consultancy.accessCode}</strong>, PC Number, and Password: <strong className="text-blue-700 font-mono">{consultancy.examPassword || '1234'}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900">Instant Synchronized Telemetry</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    The PC locks into official examination kiosk mode and streams progress to this monitor live.
                  </p>
                </div>
              </div>
            </div>

            {/* Stations Registry Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">
                  Configured Lab Terminals ({stations.length} / {consultancy.computerLimit} PCs)
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {consultancy.computerLimit - stations.length} license slots available
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Station Name</th>
                      <th className="px-6 py-3 font-semibold">Current Status</th>
                      <th className="px-6 py-3 font-semibold">Assigned Candidate</th>
                      <th className="px-6 py-3 font-semibold">Last Heartbeat</th>
                      <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stations.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <Laptop className="w-4 h-4 text-blue-600" />
                          <span>{st.name}</span>
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                              st.status === 'in_progress'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : st.status === 'paused'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {st.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-slate-700">
                          {st.currentCandidate?.name || '—'}
                        </td>
                        <td className="px-6 py-3 font-mono text-slate-500 text-xs">
                          {new Date(st.lastHeartbeat).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onOpenTerminal(st.name)}
                              className="p-1 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded transition cursor-pointer"
                              title="Test Launch this Station Terminal"
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
                              className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition cursor-pointer"
                              title="Delete Station"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
    </div>
  );
};

export default ConsultancyPortal;
