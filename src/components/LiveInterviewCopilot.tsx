import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  Send,
  Loader2,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Shield,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { CandidateProfile, JobOpening, InterviewQuestion, LiveAnswerEvaluation } from '../types';
import { evaluateLiveAnswerWithAi } from '../utils/aiClient';
import { useApp } from '../context/AppContext';

interface LiveInterviewCopilotProps {
  candidate: CandidateProfile;
  job: JobOpening;
  questions: InterviewQuestion[];
  interviewerName: string;
  onAppendToTranscript: (entryText: string) => void;
  onSwitchToTranscript: () => void;
}

export const LiveInterviewCopilot: React.FC<LiveInterviewCopilotProps> = ({
  candidate,
  job,
  questions,
  interviewerName,
  onAppendToTranscript,
  onSwitchToTranscript
}) => {
  const { blindMode, getAnonymizedCandidateName } = useApp();
  const candidateDisplayName = getAnonymizedCandidateName(candidate.id, candidate.name);

  // Timer states
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Active question state
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(
    questions.length > 0 ? questions[0] : null
  );
  const [customQuestion, setCustomQuestion] = useState('');
  const [candidateNotes, setCandidateNotes] = useState('');

  // Evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [liveEvaluation, setLiveEvaluation] = useState<LiveAnswerEvaluation | null>(null);
  const [committedCount, setCommittedCount] = useState(0);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!timerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds]);

  // Sync when questions prop changes
  useEffect(() => {
    if (!selectedQuestion && questions.length > 0) {
      setSelectedQuestion(questions[0]);
    }
  }, [questions]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEvaluateLiveAnswer = async () => {
    if (!candidateNotes.trim()) return;
    setIsEvaluating(true);
    setLiveEvaluation(null);

    const activeQText = selectedQuestion ? selectedQuestion.question : customQuestion || 'General Architectural Inquiry';
    const activeReq = selectedQuestion ? selectedQuestion.targetedRequirement : 'Technical Competency Verification';

    try {
      const evaluation = await evaluateLiveAnswerWithAi(
        candidateDisplayName,
        activeReq,
        activeQText,
        candidateNotes
      );
      setLiveEvaluation(evaluation);
    } catch (err) {
      console.error('Failed to evaluate live answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCommitToTranscript = () => {
    if (!candidateNotes.trim()) return;

    const timeStr = formatTime(seconds);
    const activeQText = selectedQuestion ? selectedQuestion.question : customQuestion || 'General Technical Question';
    const activeReq = selectedQuestion ? selectedQuestion.targetedRequirement : 'Competency Check';

    let entry = `[${timeStr}] ${interviewerName}: ${activeQText}\nTarget: ${activeReq}\n${candidateDisplayName}: ${candidateNotes}`;

    if (liveEvaluation) {
      entry += `\n[Live AI Analysis: ${liveEvaluation.requirementSatisfied} (${liveEvaluation.technicalDepthRating} Depth) - ${liveEvaluation.observations}]`;
    }
    entry += '\n\n';

    onAppendToTranscript(entry);
    setCandidateNotes('');
    setLiveEvaluation(null);
    setCommittedCount(c => c + 1);
  };

  return (
    <div className="space-y-6">
      {/* Active Session Header & Stopwatch */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Live Technical Copilot Active
            </span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs text-slate-300 font-medium">
              Interviewer: {interviewerName}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Live Call with {candidateDisplayName}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Role: <strong className="text-slate-200">{job.title}</strong> • Ask targeted questions, log live notes, and get instant technical depth evaluations.
          </p>
        </div>

        {/* Stopwatch & Counter */}
        <div className="flex items-center gap-3 bg-slate-850 border border-slate-750 p-2.5 rounded-xl shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-base font-bold text-white tracking-wider">
              {formatTime(seconds)}
            </span>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={() => setTimerActive(!timerActive)}
              className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                timerActive
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
              title={timerActive ? 'Pause Interview Timer' : 'Start Interview Timer'}
            >
              {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                setTimerActive(false);
                setSeconds(0);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs cursor-pointer transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {committedCount > 0 && (
            <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
              {committedCount} logged
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Target Question Selector (cols 1-5) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Question Queue ({questions.length})
            </h4>
            <span className="text-[11px] text-slate-400">Click to load</span>
          </div>

          {questions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-850 rounded-lg">
              No pre-generated questions found. Use custom prompt below or generate questions in Tab 1.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {questions.map(q => {
                const isCurrent = selectedQuestion?.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestion(q);
                      setCustomQuestion('');
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                        : 'bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {q.targetedRequirement}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          q.severity === 'Missing'
                            ? 'bg-rose-500/20 text-rose-300'
                            : q.severity === 'Partial'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-sky-500/20 text-sky-300'
                        }`}
                      >
                        {q.severity} Gap
                      </span>
                    </div>
                    <p className={`font-medium leading-relaxed ${isCurrent ? 'text-white font-semibold' : 'text-slate-300'}`}>
                      "{q.question}"
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Question input if interviewer wants to ask something spontaneous */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Or Ask Custom In-the-Moment Question:
            </span>
            <input
              type="text"
              value={customQuestion}
              onChange={e => {
                setCustomQuestion(e.target.value);
                setSelectedQuestion(null);
              }}
              placeholder="e.g. Can you explain your rollback procedure for failed database migrations?"
              className="w-full bg-slate-850 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Answer Logger & Gemini Evaluation Copilot (cols 6-12) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Question Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Currently Asking Candidate
              </span>
              {selectedQuestion && (
                <span className="text-slate-400 text-[11px]">
                  Target: <strong className="text-slate-200">{selectedQuestion.targetedRequirement}</strong>
                </span>
              )}
            </div>

            <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-750">
              <p className="text-sm font-semibold text-white leading-relaxed">
                "{selectedQuestion ? selectedQuestion.question : customQuestion || 'Select a question from the queue on the left'}"
              </p>
              {selectedQuestion?.expectedEvidenceProof && (
                <p className="text-xs text-slate-400 mt-2 italic">
                  Look for: {selectedQuestion.expectedEvidenceProof}
                </p>
              )}
            </div>

            {/* Candidate Response / Notes Textarea */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Candidate Spoken Response / Interviewer Notes:
                </label>
                <span className="text-[11px] text-slate-500">
                  Type verbatim claims or quick shorthand bullet points
                </span>
              </div>
              <textarea
                value={candidateNotes}
                onChange={e => setCandidateNotes(e.target.value)}
                placeholder="Candidate explains: 'We implemented Redis distributed locks using Redlock algorithm with renewal heartbeats in Python asyncio to prevent lock timeouts during slow writes...'"
                rows={5}
                className="w-full bg-slate-850 border border-slate-750 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono resize-none"
              />
            </div>

            {/* Evaluation & Commit Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleEvaluateLiveAnswer}
                disabled={isEvaluating || !candidateNotes.trim()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Analyzing Depth...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                    Evaluate Response in Real-Time
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCommitToTranscript}
                  disabled={!candidateNotes.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log to Transcript</span>
                </button>
                <button
                  onClick={onSwitchToTranscript}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 cursor-pointer"
                >
                  View Full Transcript
                </button>
              </div>
            </div>
          </div>

          {/* REAL-TIME AI EVALUATION CARD */}
          {liveEvaluation && (
            <div className="bg-slate-900 border border-indigo-500/40 rounded-xl p-5 shadow-sm space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    Real-Time Assessment Feedback
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      liveEvaluation.requirementSatisfied === 'Demonstrated'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : liveEvaluation.requirementSatisfied === 'Partially Demonstrated'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {liveEvaluation.requirementSatisfied}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    Depth: {liveEvaluation.technicalDepthRating}
                  </span>
                </div>
              </div>

              {/* Observation */}
              <div className="p-3 bg-slate-850 rounded-lg border border-slate-750 text-xs text-slate-200 leading-relaxed">
                <strong className="text-slate-400 font-semibold block mb-0.5">Verification Notes:</strong>
                {liveEvaluation.observations}
              </div>

              {/* Instant Next Probe for Interviewer */}
              <div className="p-3.5 bg-amber-950/20 border border-amber-700/30 rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <QuestionIcon className="w-3.5 h-3.5 text-amber-400" />
                  Recommended Immediate Follow-up Probe:
                </div>
                <p className="text-xs text-slate-200 italic font-medium leading-relaxed">
                  "{liveEvaluation.recommendedFollowUpProbe}"
                </p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => {
                      setCustomQuestion(liveEvaluation.recommendedFollowUpProbe);
                      setSelectedQuestion(null);
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline"
                  >
                    Adopt this follow-up probe & ask now →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
