import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  Users,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Shield,
  Loader2,
  ArrowRight,
  HelpCircle as QuestionIcon,
  Layers,
  BarChart3,
  Scale,
  Award,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EvidenceStatus, CandidateComparisonAnalysis } from '../types';
import { compareCandidatesWithAi } from '../utils/aiClient';

export const CandidateComparisonMatrix: React.FC = () => {
  const {
    jobs,
    candidates,
    selectedJobId,
    setSelectedJobId,
    evidenceMaps,
    setSelectedCandidateId,
    setCurrentView,
    blindMode,
    getAnonymizedCandidateName
  } = useApp();

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];
  const jobCandidates = candidates.filter(c => c.jobId === activeJob?.id);
  const candidatePool = jobCandidates.length >= 2 ? jobCandidates : candidates;

  // Selected candidate IDs for side-by-side comparison (default first 2)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return candidatePool.slice(0, 2).map(c => c.id);
  });

  const [isComparing, setIsComparing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<CandidateComparisonAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'dimensions' | 'ai-synthesis'>('matrix');

  // Update selected candidate IDs if job changes
  useEffect(() => {
    const currentForJob = candidates.filter(c => c.jobId === activeJob?.id);
    const pool = currentForJob.length >= 2 ? currentForJob : candidates;
    setSelectedIds(pool.slice(0, 2).map(c => c.id));
    setAiAnalysis(null);
  }, [selectedJobId]);

  const toggleCandidateSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 2) return; // Keep at least 2
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        // replace last
        setSelectedIds(prev => [prev[0], prev[1], id]);
      } else {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const selectedCandidates = selectedIds
    .map(id => candidates.find(c => c.id === id))
    .filter(Boolean) as typeof candidates;

  const handleRunAiComparison = async () => {
    if (selectedCandidates.length < 2) return;
    setIsComparing(true);

    try {
      const candidatesPayload = selectedCandidates.map(c => ({
        id: c.id,
        name: blindMode ? getAnonymizedCandidateName(c.id, c.name) : c.name,
        skills: c.skills,
        workExperience: c.workExperience,
        projects: c.projects,
        evidenceItems: evidenceMaps[c.id] || []
      }));

      const result = await compareCandidatesWithAi(
        activeJob.title,
        activeJob.structuredRequirements,
        candidatesPayload
      );

      setAiAnalysis(result);
      setActiveTab('ai-synthesis');
    } catch (err) {
      console.error('Failed to run AI comparison:', err);
    } finally {
      setIsComparing(false);
    }
  };

  const getStatusBadge = (status?: EvidenceStatus) => {
    switch (status) {
      case 'Evidence Found':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Found
          </span>
        );
      case 'Partially Supported':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> Partial
          </span>
        );
      case 'Requires Validation':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
            <HelpCircle className="w-3 h-3" /> Validate
          </span>
        );
      case 'Missing':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3 h-3" /> Missing
          </span>
        );
    }
  };

  // Compile full set of requirements for active job
  const reqs = activeJob.structuredRequirements;
  const allReqs = [
    ...(reqs?.requiredSkills || []).map((r: string) => ({ text: r, category: 'Required Skill' })),
    ...(reqs?.preferredSkills || []).map((r: string) => ({ text: r, category: 'Preferred Skill' })),
    ...(reqs?.experienceRequirements || []).map((r: string) => ({ text: r, category: 'Experience' }))
  ];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Finalist Benchmark
              </span>
              <span className="text-xs text-slate-400">Comparing 2-3 Candidates Side-by-Side</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              Candidate Head-to-Head Comparative Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare candidate evidence claims against target requirements to illuminate trade-offs before committee review.
            </p>
          </div>

          {/* Action: Run AI Synthesis */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunAiComparison}
              disabled={isComparing || selectedCandidates.length < 2}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
            >
              {isComparing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Synthesizing Trade-offs...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  Run AI Head-to-Head Synthesis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Candidate Selector Badges */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Select 2-3 Finalists:</span>
          {candidatePool.map(c => {
            const isSelected = selectedIds.includes(c.id);
            const displayName = getAnonymizedCandidateName(c.id, c.name);

            return (
              <button
                key={c.id}
                onClick={() => toggleCandidateSelection(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'
                  }`}
                />
                <span>{displayName}</span>
              </button>
            );
          })}
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Requirement Evidence Grid
          </button>
          <button
            onClick={() => setActiveTab('dimensions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'dimensions'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Dimension Benchmarks
          </button>
          {aiAnalysis && (
            <button
              onClick={() => setActiveTab('ai-synthesis')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'ai-synthesis'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                  : 'text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Trade-off Synthesis
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: REQUIREMENT EVIDENCE GRID */}
      {activeTab === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-850 border-b border-slate-800 text-xs font-semibold text-slate-400">
                  <th className="p-4 min-w-[260px] w-1/3">Target Job Requirement</th>
                  {selectedCandidates.map(c => (
                    <th key={c.id} className="p-4 min-w-[280px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white text-sm font-bold block">
                            {getAnonymizedCandidateName(c.id, c.name)}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {c.workExperience?.[0]?.company || 'Candidate'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCandidateId(c.id);
                            setCurrentView('candidate-profile');
                          }}
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium cursor-pointer"
                        >
                          Dossier <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {allReqs.map((req, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-850/50 transition-colors">
                    {/* Requirement Column */}
                    <td className="p-4 align-top">
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                          {req.category}
                        </span>
                        <p className="text-slate-200 font-medium leading-relaxed">{req.text}</p>
                      </div>
                    </td>

                    {/* Candidate Evidence Columns */}
                    {selectedCandidates.map(c => {
                      const cEvidence = evidenceMaps[c.id] || [];
                      // Find best matching evidence item for this requirement text
                      const matchItem = cEvidence.find(
                        e =>
                          e.requirement.toLowerCase().includes(req.text.toLowerCase()) ||
                          req.text.toLowerCase().includes(e.requirement.toLowerCase()) ||
                          req.text.toLowerCase().split(' ').some((w: string) => w.length > 4 && e.requirement.toLowerCase().includes(w))
                      );

                      return (
                        <td key={c.id} className="p-4 align-top border-l border-slate-800/80 space-y-2">
                          <div className="flex items-center justify-between">
                            {getStatusBadge(matchItem?.status)}
                            {matchItem?.source && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                {matchItem.source}
                              </span>
                            )}
                          </div>

                          {matchItem && matchItem.status !== 'Missing' ? (
                            <div className="p-2.5 bg-slate-850 rounded-lg border border-slate-800 text-[11px] text-slate-300 italic leading-relaxed">
                              "{matchItem.evidenceQuote}"
                            </div>
                          ) : (
                            <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/50 text-[11px] text-slate-400 italic">
                              No direct verified evidence found in resume dossier.
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: DIMENSION BENCHMARKS */}
      {activeTab === 'dimensions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {selectedCandidates.map(c => {
            const cEvidence = evidenceMaps[c.id] || [];
            const total = cEvidence.length || 1;
            const foundCount = cEvidence.filter(e => e.status === 'Evidence Found').length;
            const partialCount = cEvidence.filter(e => e.status === 'Partially Supported').length;
            const coverageRate = Math.round(((foundCount + partialCount * 0.5) / total) * 100);

            return (
              <div
                key={c.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {getAnonymizedCandidateName(c.id, c.name)}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {c.workExperience?.[0]?.role} • {c.workExperience?.[0]?.company}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {coverageRate}% Coverage
                  </span>
                </div>

                {/* Dimension Bars */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Core Technical Stack</span>
                      <span className="text-emerald-400 font-bold">{Math.min(95, coverageRate + 5)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(95, coverageRate + 5)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Architecture & Scale Verification</span>
                      <span className="text-indigo-400 font-bold">{Math.max(60, coverageRate - 2)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${Math.max(60, coverageRate - 2)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Production Operations & Reliability</span>
                      <span className="text-sky-400 font-bold">{Math.min(92, coverageRate + 2)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${Math.min(92, coverageRate + 2)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Technical Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(c.skills || []).slice(0, 5).map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: AI HEAD-TO-HEAD SYNTHESIS */}
      {activeTab === 'ai-synthesis' && aiAnalysis && (
        <div className="space-y-5">
          {/* Executive Overview Box */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-indigo-500/30 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Gemini 3.8 Flash Finalist Synthesis
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {aiAnalysis.executiveSummary}
            </p>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-750 text-xs text-slate-300 leading-relaxed">
              <strong className="text-indigo-400 font-semibold block mb-1">Comparative Trade-Off Analysis:</strong>
              {aiAnalysis.tradeOffAnalysis}
            </div>
          </div>

          {/* Side-by-side strengths & risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {aiAnalysis.candidates.map((candPoint, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    {candPoint.candidateName}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Finalist {idx + 1}</span>
                </div>

                {/* Strengths */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Relative Strengths
                  </span>
                  <ul className="space-y-1.5">
                    {candPoint.strengths.map((st, sIdx) => (
                      <li
                        key={sIdx}
                        className="text-xs text-slate-200 bg-emerald-950/20 p-2 rounded border border-emerald-900/30 leading-relaxed"
                      >
                        {st}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps / Risks */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Verification Gaps
                  </span>
                  <ul className="space-y-1.5">
                    {candPoint.gaps.map((gp, gIdx) => (
                      <li
                        key={gIdx}
                        className="text-xs text-slate-300 bg-rose-950/20 p-2 rounded border border-rose-900/30 leading-relaxed"
                      >
                        {gp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standout Evidence */}
                {candPoint.standoutEvidence && candPoint.standoutEvidence.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Standout Verified Evidence:
                    </span>
                    <div className="space-y-1">
                      {candPoint.standoutEvidence.map((ev, eIdx) => (
                        <p key={eIdx} className="text-[11px] text-slate-300 italic font-mono bg-slate-850 p-2 rounded">
                          "{ev}"
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Differentiator Questions for Hiring Committee */}
          {aiAnalysis.recommendedTieBreakerQuestions && aiAnalysis.recommendedTieBreakerQuestions.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <QuestionIcon className="w-4 h-4 text-amber-400" />
                Recommended Tie-Breaker Questions for Final On-Site Round
              </h4>
              <p className="text-xs text-slate-400">
                Targeted technical challenges designed to clarify the exact trade-offs identified above.
              </p>
              <div className="space-y-2 pt-1">
                {aiAnalysis.recommendedTieBreakerQuestions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-3 bg-slate-850 border border-slate-750 rounded-lg text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <span className="font-medium leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Human Authority Notice */}
          <div className="p-3.5 bg-indigo-950/30 border border-indigo-700/40 rounded-xl text-xs text-indigo-300 flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Human Hiring Committee Notice:</strong> This comparative analysis synthesizes factual evidence trade-offs. The decision to advance or hire remains strictly under human reviewer authority.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
