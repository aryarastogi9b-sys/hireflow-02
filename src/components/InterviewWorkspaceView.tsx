import React, { useState } from 'react';
import {
  MessageSquareCode,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Users,
  Briefcase,
  HelpCircle,
  Clock,
  ArrowRight,
  Loader2,
  FileCheck,
  ShieldAlert,
  ChevronDown,
  Radio,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterviewQuestion, InterviewSession, InterviewRequirementAnalysis } from '../types';
import { generateInterviewQuestions, analyzeInterviewNotes } from '../utils/aiClient';
import { LiveInterviewCopilot } from './LiveInterviewCopilot';

export const InterviewWorkspaceView: React.FC = () => {
  const {
    candidates,
    jobs,
    selectedCandidateId,
    setSelectedCandidateId,
    evidenceMaps,
    saveInterviewSession,
    interviews,
    setCurrentView,
    blindMode,
    getAnonymizedCandidateName
  } = useApp();

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'questions' | 'live' | 'transcript'>('questions');

  const candidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];
  const job = jobs.find(j => j.id === candidate?.jobId) || jobs[0];
  const evidenceItems = (candidate ? evidenceMaps[candidate.id] : []) || [];
  const existingInterview = candidate ? interviews[candidate.id] : undefined;

  // Question generation states
  const [questions, setQuestions] = useState<InterviewQuestion[]>(existingInterview?.generatedQuestions || []);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Transcript analysis states
  const [transcriptNotes, setTranscriptNotes] = useState(existingInterview?.transcriptOrNotes || '');
  const [interviewerName, setInterviewerName] = useState(existingInterview?.interviewer || 'Marcus Brody (Hiring Manager)');
  const [isAnalyzingTranscript, setIsAnalyzingTranscript] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<InterviewSession['analysisResult']>(existingInterview?.analysisResult);

  // Synchronize when candidate changes
  React.useEffect(() => {
    if (candidate) {
      const interview = interviews[candidate.id];
      if (interview) {
        setQuestions(interview.generatedQuestions || []);
        setTranscriptNotes(interview.transcriptOrNotes || '');
        setInterviewerName(interview.interviewer || 'Marcus Brody (Hiring Manager)');
        setAnalysisResult(interview.analysisResult);
      } else {
        setQuestions([]);
        setTranscriptNotes('');
        setAnalysisResult(undefined);
      }
    }
  }, [selectedCandidateId, interviews]);

  const handleGenerateQuestions = async () => {
    if (!candidate || !job) return;
    setIsGeneratingQuestions(true);
    try {
      const generated = await generateInterviewQuestions(candidate, evidenceItems, job.title);
      setQuestions(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleSampleTranscript = (type: 'comprehensive' | 'contradictory') => {
    if (type === 'comprehensive') {
      setTranscriptNotes(`INTERVIEW TRANSCRIPT / NOTES
Interviewer: Marcus Brody (Hiring Manager) & Sarah Lin (Staff Engineer)
Candidate: Elena Rostova
Position: Senior Distributed Backend Engineer
Date: September 18, 2026

[00:02:15] Marcus: Elena, thanks for joining. I noticed on your resume you mentioned working with Redis caching and distributed locks. Can you elaborate on how you handled lock timeouts and Redis cluster split-brain scenarios?
Elena: In our payment settlement microservice, we initially ran into issues with standard Redis keys expiring while long database transactions were committing. To solve this, we implemented Redlock with renewal heartbeats in Python asyncio. For split-brain protection, we ran Redis Sentinel with strict quorum checks and fell back to pessimistic locking in PostgreSQL with SELECT ... FOR UPDATE when Redis cluster health degraded.

[00:08:40] Sarah: In the job description, we place heavy emphasis on Kafka partition lag monitoring and idempotency. How did you verify consumers never double-processed events?
Elena: We decoupled message consumption from database persistence. Every incoming event carries a deterministic UUID v5 generated from the payload hash. We insert this ID into an 'idempotency_keys' table inside the same ACID transaction as the state mutation. If a duplicate arrives due to Kafka rebalancing, the unique constraint catches it cleanly and returns the existing state without re-executing.

[00:15:30] Marcus: What about gRPC vs REST? How did you approach internal vs external API contracts?
Elena: We established protobuf schema repositories with Buf for internal services. External partner integrations stayed on OpenAPI 3.0 REST with strict Pydantic v2 schemas.`);
    } else {
      setTranscriptNotes(`INTERVIEW TRANSCRIPT / NOTES
Interviewer: Marcus Brody (Hiring Manager)
Candidate: Candidate Interview
Position: Senior Distributed Backend Engineer

[00:05:00] Marcus: You listed 'Kafka Streaming Pipelines' as a core skill on your resume. Could you describe how you configured partition keys and consumer group rebalances?
Candidate: Well, Kafka was installed by our DevOps team on the cluster. I mostly just pushed JSON messages to a topic using an existing Python helper library someone else built. I didn't actually configure the cluster, partition strategies, or handle consumer group rebalancing directly.

[00:12:00] Marcus: On your resume you claim you optimized PostgreSQL queries cutting latency by 60%. Can you walk me through an EXPLAIN ANALYZE output you tuned?
Candidate: To be honest, that 60% metric was the overall team's target. My colleague added the B-tree indices and connection poolers, while I updated the ORM filter query.`);
    }
  };

  const handleAnalyzeTranscript = async () => {
    if (!transcriptNotes.trim()) return;
    setIsAnalyzingTranscript(true);
    try {
      const result = await analyzeInterviewNotes(
        transcriptNotes,
        evidenceItems,
        job.structuredRequirements,
        candidate.name
      );
      setAnalysisResult(result);

      // Save to application context
      const sessionObj: InterviewSession = {
        id: `int-${Date.now()}`,
        candidateId: candidate.id,
        jobId: job.id,
        interviewer: interviewerName,
        date: new Date().toISOString(),
        transcriptOrNotes: transcriptNotes,
        generatedQuestions: questions,
        analysisResult: result
      };
      saveInterviewSession(sessionObj);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzingTranscript(false);
    }
  };

  const handleAppendToTranscript = (entryText: string) => {
    setTranscriptNotes(prev => {
      const updated = (prev ? prev + '\n' : '') + entryText;
      if (candidate) {
        saveInterviewSession({
          id: existingInterview?.id || `interview-${Date.now()}`,
          candidateId: candidate.id,
          jobId: job.id,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          interviewer: interviewerName,
          transcriptOrNotes: updated,
          generatedQuestions: questions,
          analysisResult: analysisResult
        });
      }
      return updated;
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <MessageSquareCode className="w-4 h-4" />
            Interview Preparation & Real-Time Copilot
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            AI Interview Intelligence Workspace
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Formulate personalized questions targeted at resume gaps, run live interview evaluations, and analyze transcripts.
          </p>
        </div>

        {/* Candidate Selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl">
          <Users className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
          <span className="text-xs text-slate-400 font-medium">Candidate:</span>
          <select
            value={candidate?.id}
            onChange={e => setSelectedCandidateId(e.target.value)}
            className="bg-slate-800 text-xs text-white font-semibold rounded px-2.5 py-1 focus:outline-none cursor-pointer border border-slate-700"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {getAnonymizedCandidateName(c.id, c.name)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3-Step Interview Workflow Tabs */}
      <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-sm gap-1 flex-wrap">
        <button
          onClick={() => setActiveWorkspaceTab('questions')}
          className={`flex-1 min-w-[160px] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeWorkspaceTab === 'questions'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>1. Question Generator</span>
          {questions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-400/30">
              {questions.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('live')}
          className={`flex-1 min-w-[160px] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
            activeWorkspaceTab === 'live'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>2. Live Interview Copilot</span>
          <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-200 border border-indigo-400/30 font-bold uppercase tracking-wider">
            Real-Time
          </span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('transcript')}
          className={`flex-1 min-w-[160px] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeWorkspaceTab === 'transcript'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>3. Transcript & Notes Analysis</span>
          {analysisResult && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-1" />
          )}
        </button>
      </div>

      {/* TAB 2: LIVE INTERVIEW COPILOT */}
      {activeWorkspaceTab === 'live' && candidate && job && (
        <LiveInterviewCopilot
          candidate={candidate}
          job={job}
          questions={questions}
          interviewerName={interviewerName}
          onAppendToTranscript={handleAppendToTranscript}
          onSwitchToTranscript={() => setActiveWorkspaceTab('transcript')}
        />
      )}

      {/* TAB 1: Personalized Interview Questions Generator */}
      {activeWorkspaceTab === 'questions' && (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Targeted Interview Questions</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted inquiries based on missing evidence, unverified claims, and specific project details.
            </p>
          </div>

          <button
            onClick={handleGenerateQuestions}
            disabled={isGeneratingQuestions}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            {isGeneratingQuestions ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Generate Questions with AI
              </>
            )}
          </button>
        </div>

        {/* Questions Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, idx) => (
            <div
              key={q.id || idx}
              className="bg-slate-850 p-4 rounded-xl border border-slate-750 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {q.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                    {q.targetedRequirement}
                  </span>
                </div>

                <p className="text-xs font-bold text-white leading-relaxed">
                  "{q.question}"
                </p>

                <div className="mt-2.5 p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-400 font-medium">Why Ask: </span>
                    <span>{q.rationale}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-medium">What to Listen For: </span>
                    <span className="italic">{q.expectedEvidenceProof}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    q.severity === 'Missing'
                      ? 'bg-rose-500/20 text-rose-300'
                      : q.severity === 'Partial'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-sky-500/20 text-sky-300'
                  }`}
                >
                  {q.severity} Gap
                </span>

                <button
                  onClick={() => setActiveWorkspaceTab('live')}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Launch in Live Copilot</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {questions.length === 0 && (
            <div className="md:col-span-2 p-8 text-center bg-slate-850/50 rounded-xl border border-dashed border-slate-750">
              <Sparkles className="w-6 h-6 text-slate-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-300">No questions generated yet</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click "Generate Questions with AI" to formulate questions for {candidate ? getAnonymizedCandidateName(candidate.id, candidate.name) : 'the candidate'}.
              </p>
            </div>
          )}
        </div>
      </div>
      )}

      {/* TAB 3: Part 2: Interview Notes & Transcript Analysis */}
      {activeWorkspaceTab === 'transcript' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Interview Transcript & Notes Analysis</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Paste recruiter notes or recorded interview transcripts. Gemini will cross-verify claims and detect discrepancies.
              </p>
            </div>

            {/* Quick Demo Transcripts */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sample Transcript:</span>
              <button
                onClick={() => handleSampleTranscript('comprehensive')}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-medium cursor-pointer"
              >
                Verified Deep-Dive
              </button>
              <button
                onClick={() => handleSampleTranscript('contradictory')}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 font-medium cursor-pointer"
              >
                Resume Contradiction
              </button>
            </div>
          </div>

        {/* Input Textarea & Interviewer info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Interviewer(s)</label>
              <input
                type="text"
                value={interviewerName}
                onChange={e => setInterviewerName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="p-3 bg-slate-850 rounded-lg border border-slate-750 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Analysis Scope:</p>
              <p>• Cross-checks resume claims</p>
              <p>• Surfaces new verified skills</p>
              <p>• Identifies remaining gaps</p>
              <p>• Formulates follow-ups</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Paste Transcript or Live Recruiter Notes
            </label>
            <textarea
              rows={8}
              value={transcriptNotes}
              onChange={e => setTranscriptNotes(e.target.value)}
              placeholder="Paste interview dialogue, bulleted interviewer notes, or QA transcript..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAnalyzeTranscript}
            disabled={isAnalyzingTranscript || !transcriptNotes.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            {isAnalyzingTranscript ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Analyzing Transcript & Cross-Checking Claims...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Analyze Interview Notes & Update Evidence
              </>
            )}
          </button>
        </div>

        {/* Analysis Output Section */}
        {analysisResult && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Interview Analysis Findings
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evidence updates and verification findings extracted directly from transcript.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('reports')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                Proceed to Evaluation Report <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Findings Summary */}
            <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 text-xs text-slate-200 leading-relaxed">
              <strong className="text-emerald-400 block mb-1 font-semibold">Executive Assessment:</strong>
              {analysisResult.summary}
            </div>

            {/* Findings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Requirements Addressed */}
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Requirements Addressed in Interview ({(analysisResult.requirementsAddressed || []).length})
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {(analysisResult.requirementsAddressed || []).map((item: InterviewRequirementAnalysis, idx: number) => (
                    <li key={idx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{item.requirement}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          {item.verifiedStatus}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{item.candidateAnswerSummary}</p>
                      {item.notes && <p className="text-slate-400 text-[10px] italic">Notes: {item.notes}</p>}
                    </li>
                  ))}
                  {(analysisResult.requirementsAddressed || []).length === 0 && (
                    <li className="text-slate-500 italic">No specific requirements demonstrated in transcript.</li>
                  )}
                </ul>
              </div>

              {/* Remaining Gaps & Follow-Up Questions */}
              <div className="space-y-4">
                {/* Remaining Gaps */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Remaining Gaps & Missing Evidence ({(analysisResult.remainingGaps || []).length})
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(analysisResult.remainingGaps || []).map((gap: string, idx: number) => (
                      <li key={idx} className="p-2 bg-slate-900 rounded border border-slate-800 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                    {(analysisResult.remainingGaps || []).length === 0 && (
                      <li className="text-emerald-400 italic p-2 bg-emerald-950/20 rounded border border-emerald-800/30">
                        ✓ All evaluated requirement areas covered in interview.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Follow Up Questions */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Recommended Follow-Up Inquiries ({(analysisResult.followUpQuestions || []).length})
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(analysisResult.followUpQuestions || []).map((q: string, idx: number) => (
                      <li key={idx} className="p-2 bg-slate-900 rounded border border-slate-800 flex items-start gap-2">
                        <span className="text-teal-400 mt-0.5">•</span>
                        <span className="italic">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};
