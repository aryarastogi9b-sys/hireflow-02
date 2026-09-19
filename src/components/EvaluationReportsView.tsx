import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  Printer,
  Download,
  Clock,
  ArrowRight,
  Loader2,
  FileCheck,
  AlertCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EvaluationReport } from '../types';
import { generateEvaluationReport } from '../utils/aiClient';

export const EvaluationReportsView: React.FC = () => {
  const {
    candidates,
    jobs,
    selectedCandidateId,
    setSelectedCandidateId,
    evidenceMaps,
    interviews,
    reports,
    saveEvaluationReport,
    updateHumanDecision,
    setCurrentView
  } = useApp();

  const candidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];
  const job = jobs.find(j => j.id === candidate?.jobId) || jobs[0];
  const evidenceItems = (candidate ? evidenceMaps[candidate.id] : []) || [];
  const interviewSession = candidate ? interviews[candidate.id] : undefined;
  const existingReport = candidate ? reports[candidate.id] : undefined;

  const [recruiterNotes, setRecruiterNotes] = useState(existingReport?.recruiterNotes || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [humanDecision, setHumanDecision] = useState<EvaluationReport['humanDecisionStatus']>(
    existingReport?.humanDecisionStatus || 'Pending Review'
  );
  const [decisionNotes, setDecisionNotes] = useState(existingReport?.recruiterNotes || '');
  const [signedSuccess, setSignedSuccess] = useState(false);

  // Sync state when selected candidate changes
  React.useEffect(() => {
    if (candidate) {
      const report = reports[candidate.id];
      if (report) {
        setRecruiterNotes(report.recruiterNotes || '');
        setHumanDecision(report.humanDecisionStatus || 'Pending Review');
        setDecisionNotes(report.recruiterNotes || '');
      } else {
        setRecruiterNotes('');
        setHumanDecision('Pending Review');
        setDecisionNotes('');
      }
    }
  }, [selectedCandidateId, reports]);

  const handleGenerateReport = async () => {
    if (!candidate || !job) return;
    setIsGenerating(true);
    try {
      const partialReport = await generateEvaluationReport(
        candidate,
        job.title,
        evidenceItems,
        interviewSession?.analysisResult,
        recruiterNotes
      );

      const fullReport: EvaluationReport = {
        id: `rep-${Date.now()}`,
        candidateId: candidate.id,
        jobId: job.id,
        generatedAt: new Date().toISOString(),
        executiveSummary: partialReport.executiveSummary || 'Executive summary compiled from candidate evidence citations.',
        requirementCoverage: partialReport.requirementCoverage || {
          total: evidenceItems.length,
          evidenceFound: evidenceItems.filter(e => e.status === 'Evidence Found').length,
          partiallySupported: evidenceItems.filter(e => e.status === 'Partially Supported').length,
          missing: evidenceItems.filter(e => e.status === 'Missing').length,
          requiresValidation: evidenceItems.filter(e => e.status === 'Requires Validation').length
        },
        verifiedCompetencies: partialReport.verifiedCompetencies || [],
        unansweredOrInconclusiveAreas: partialReport.unansweredOrInconclusiveAreas || [],
        keyStrengths: partialReport.keyStrengths || [],
        potentialRisksOrGaps: partialReport.potentialRisksOrGaps || [],
        suggestedNextRoundQuestions: partialReport.suggestedNextRoundQuestions || [],
        recruiterNotes: recruiterNotes,
        humanDecisionStatus: humanDecision,
        auditSummary: partialReport.auditSummary || `Synthesized from ${evidenceItems.length} verified requirement evidence records.`
      };

      saveEvaluationReport(fullReport);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRecordDecision = () => {
    if (!candidate) return;
    updateHumanDecision(candidate.id, humanDecision, decisionNotes);
    setSignedSuccess(true);
    setTimeout(() => setSignedSuccess(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <FileText className="w-4 h-4" />
            Transparent Evaluation Reports
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Comprehensive Candidate Evaluation Dossier
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured evidence synthesis linking resume records, transcript validations, and human recruiter sign-off.
          </p>
        </div>

        {/* Candidate Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2">
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
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Human In The Loop Principle Banner */}
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-emerald-300 block mb-0.5">
            Core Mandate: Human Recruiters Remain Responsible for Hiring Decisions
          </span>
          <p className="text-slate-300 leading-relaxed">
            HireFlow synthesizes evidence, cross-checks claims, and highlights discrepancies. It does NOT make autonomous 'Hire' or 'Reject' recommendations. The evaluation workflow ends with a verified human hiring committee decision and audit rationale.
          </p>
        </div>
      </div>

      {/* Main Grid: Controls & Report Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Synthesis Controls & Recruiter Sign-Off */}
        <div className="space-y-6">
          {/* Generate / Re-synthesize Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Synthesize Evaluation
            </h3>
            <p className="text-xs text-slate-400">
              Combine {evidenceItems.length} requirement checks and{' '}
              {interviewSession ? 'interview transcript findings' : 'initial resume screen'}.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Recruiter Context & Debrief Notes
              </label>
              <textarea
                rows={4}
                value={recruiterNotes}
                onChange={e => setRecruiterNotes(e.target.value)}
                placeholder="Add qualitative notes from hiring manager or committee debrief..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Synthesizing Report with Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  {existingReport ? 'Re-Synthesize Report' : 'Generate Evaluation Report'}
                </>
              )}
            </button>
          </div>

          {/* Human Hiring Decision Panel */}
          <div className="bg-slate-900 border border-emerald-900/40 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <UserCheck className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white">Human Hiring Committee Sign-Off</h3>
            </div>
            <p className="text-xs text-slate-400">
              Select the final human disposition for {candidate?.name}. This logs an immutable audit trail entry.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Decision Disposition</label>
              <select
                value={humanDecision}
                onChange={e => setHumanDecision(e.target.value as EvaluationReport['humanDecisionStatus'])}
                className="w-full bg-slate-800 border border-slate-750 rounded-lg p-2 text-xs text-white font-medium focus:outline-none focus:border-emerald-500"
              >
                <option value="Pending Review">Pending Review</option>
                <option value="Reviewed - Proceed">Reviewed - Proceed to Next Stage / Offer</option>
                <option value="Reviewed - Hold">Reviewed - Hold / Strong Consideration</option>
                <option value="Needs Additional Validation">Needs Additional Technical Validation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Committee Rationale / Notes</label>
              <textarea
                rows={3}
                value={decisionNotes}
                onChange={e => setDecisionNotes(e.target.value)}
                placeholder="Log specific justification for committee sign-off..."
                className="w-full bg-slate-800 border border-slate-750 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleRecordDecision}
              className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
              Record Human Decision & Sign-Off
            </button>

            {signedSuccess && (
              <p className="text-xs text-emerald-400 font-semibold text-center animate-pulse">
                ✓ Decision recorded and logged to audit trail!
              </p>
            )}
          </div>
        </div>

        {/* Right 2 Columns: Full Synthesized Report View */}
        <div className="lg:col-span-2 space-y-6">
          {existingReport ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              {/* Report Title & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Evaluation Dossier
                  </span>
                  <h3 className="text-lg font-bold text-white">{candidate?.name}</h3>
                  <p className="text-xs text-slate-400">
                    {job?.title} • {job?.department}
                  </p>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <UserCheck className="w-3.5 h-3.5" />
                    {existingReport.humanDecisionStatus}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Generated {new Date(existingReport.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Executive Assessment
                </h4>
                <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 text-xs text-slate-200 leading-relaxed">
                  {existingReport.executiveSummary}
                </div>
              </div>

              {/* Requirement Coverage Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Evidence Coverage Breakdown
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-center">
                    <span className="text-xl font-bold text-emerald-400 block">
                      {existingReport.requirementCoverage?.evidenceFound ?? 0}
                    </span>
                    <span className="text-[11px] text-emerald-300 font-medium">Evidence Found</span>
                  </div>
                  <div className="p-3 bg-blue-950/20 border border-blue-900/30 rounded-xl text-center">
                    <span className="text-xl font-bold text-blue-400 block">
                      {existingReport.requirementCoverage?.partiallySupported ?? 0}
                    </span>
                    <span className="text-[11px] text-blue-300 font-medium">Partially Supported</span>
                  </div>
                  <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-xl text-center">
                    <span className="text-xl font-bold text-amber-400 block">
                      {existingReport.requirementCoverage?.requiresValidation ?? 0}
                    </span>
                    <span className="text-[11px] text-amber-300 font-medium">Requires Validation</span>
                  </div>
                  <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl text-center">
                    <span className="text-xl font-bold text-rose-400 block">
                      {existingReport.requirementCoverage?.missing ?? 0}
                    </span>
                    <span className="text-[11px] text-rose-300 font-medium">Missing Evidence</span>
                  </div>
                </div>
              </div>

              {/* Verified Competencies vs Potential Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Verified Competencies */}
                <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Competencies
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(existingReport.verifiedCompetencies || []).map((c: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Strengths */}
                <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Key Strengths Backed by Evidence
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(existingReport.keyStrengths || []).map((s: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-400 mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risks / Gaps */}
                <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Identified Gaps & Risks
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(existingReport.potentialRisksOrGaps || []).map((g: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unanswered Areas */}
                <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Unanswered or Inconclusive Areas
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(existingReport.unansweredOrInconclusiveAreas || []).map((a: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Round Questions */}
              {(existingReport.suggestedNextRoundQuestions || []).length > 0 && (
                <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Suggested Next-Round Inquiries
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {existingReport.suggestedNextRoundQuestions.map((q: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span className="italic">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Audit Summary Footnote */}
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Provenance: {existingReport.auditSummary}</span>
                <button
                  onClick={() => setCurrentView('audit-trail')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  View Audit Trail <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Evaluation Report Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Synthesize candidate evidence against {job?.title} requirements to produce a structured evaluation report with human sign-off.
              </p>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Generate Report Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
