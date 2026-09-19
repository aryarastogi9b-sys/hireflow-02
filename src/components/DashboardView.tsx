import React from 'react';
import {
  Briefcase,
  Users,
  MessageSquareCode,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Search,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView: React.FC = () => {
  const { jobs, candidates, evidenceMaps, setCurrentView, setSelectedCandidateId, setSelectedJobId } = useApp();

  // Metric calculations
  const totalActiveJobs = jobs.filter(j => j.status === 'Active').length;
  const totalCandidates = candidates.length;
  const interviewsCompleted = candidates.filter(
    c => c.status === 'Report Generated' || c.status === 'Interview Workspace'
  ).length;
  const needsReview = candidates.filter(c => c.status === 'Needs Review' || c.status === 'Evidence Mapped').length;

  // Compute aggregate evidence status counts
  let totalFound = 0;
  let totalPartial = 0;
  let totalMissing = 0;
  let totalRequiresValidation = 0;

  Object.values(evidenceMaps).forEach(items => {
    items.forEach(i => {
      if (i.status === 'Evidence Found') totalFound++;
      if (i.status === 'Partially Supported') totalPartial++;
      if (i.status === 'Missing') totalMissing++;
      if (i.status === 'Requires Validation') totalRequiresValidation++;
    });
  });

  const totalEvidencePoints = totalFound + totalPartial + totalMissing + totalRequiresValidation || 1;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome & Guiding Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-slate-800 p-6 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Recruitment Intelligence Platform
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Evidence-Driven Hiring for Modern Talent Teams
          </h2>
          <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
            HireFlow maps candidate resume evidence directly against structured job requirements,
            generates tailored interview questions, verifies claims in interview transcripts, and equips human
            recruiters with transparent evaluation reports.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-slate-200">Evidence</span>
              <span className="text-slate-500">→</span>
              <span className="font-medium text-slate-200">Analysis</span>
              <span className="text-slate-500">→</span>
              <span className="font-medium text-slate-200">Validation</span>
              <span className="text-slate-500">→</span>
              <span className="font-semibold text-emerald-400">Human Decision</span>
            </div>
            <span className="text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
              Zero autonomous hire/reject decisions
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Jobs */}
        <div
          onClick={() => setCurrentView('jobs')}
          className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Active Jobs</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">{totalActiveJobs}</span>
            <span className="text-xs text-emerald-400 flex items-center font-medium group-hover:underline">
              View roles <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Across 4 departments</p>
        </div>

        {/* Total Candidates */}
        <div
          onClick={() => setCurrentView('candidates')}
          className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Candidates Ingested</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">{totalCandidates}</span>
            <span className="text-xs text-teal-400 flex items-center font-medium group-hover:underline">
              All candidates <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Resumes parsed & verified</p>
        </div>

        {/* Interviews Completed */}
        <div
          onClick={() => setCurrentView('interview-workspace')}
          className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Interviews Handled</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <MessageSquareCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">{interviewsCompleted}</span>
            <span className="text-xs text-blue-400 flex items-center font-medium group-hover:underline">
              Workspace <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Transcripts analyzed with AI</p>
        </div>

        {/* Needs Review */}
        <div
          onClick={() => setCurrentView('candidates')}
          className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Needs Human Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-amber-400 tracking-tight">{needsReview}</span>
            <span className="text-xs text-amber-400 flex items-center font-medium group-hover:underline">
              Review queue <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Evidence validation pending</p>
        </div>
      </div>

      {/* Middle Row: Evidence Status Distribution & Quick Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Status Breakdown Chart */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Evidence Verification Distribution</h3>
              <p className="text-xs text-slate-400">
                Aggregated requirement matching across all mapped candidates
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {totalEvidencePoints} Total Points
            </span>
          </div>

          {/* Stacked Bar Visual */}
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5 p-0.5">
            <div
              style={{ width: `${(totalFound / totalEvidencePoints) * 100}%` }}
              className="bg-emerald-500 h-full rounded-l-full transition-all"
              title={`Evidence Found: ${totalFound}`}
            />
            <div
              style={{ width: `${(totalPartial / totalEvidencePoints) * 100}%` }}
              className="bg-amber-500 h-full transition-all"
              title={`Partially Supported: ${totalPartial}`}
            />
            <div
              style={{ width: `${(totalRequiresValidation / totalEvidencePoints) * 100}%` }}
              className="bg-sky-500 h-full transition-all"
              title={`Requires Validation: ${totalRequiresValidation}`}
            />
            <div
              style={{ width: `${(totalMissing / totalEvidencePoints) * 100}%` }}
              className="bg-rose-500 h-full rounded-r-full transition-all"
              title={`Missing: ${totalMissing}`}
            />
          </div>

          {/* Legend with counts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Evidence Found
              </div>
              <p className="mt-1 text-xl font-bold text-white">{totalFound}</p>
              <p className="text-[11px] text-slate-400">Direct proof in resume</p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Partially Supported
              </div>
              <p className="mt-1 text-xl font-bold text-white">{totalPartial}</p>
              <p className="text-[11px] text-slate-400">Conceptual or limited</p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                Requires Validation
              </div>
              <p className="mt-1 text-xl font-bold text-white">{totalRequiresValidation}</p>
              <p className="text-[11px] text-slate-400">Claimed keyword only</p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Missing Evidence
              </div>
              <p className="mt-1 text-xl font-bold text-white">{totalMissing}</p>
              <p className="text-[11px] text-slate-400">Not found in profile</p>
            </div>
          </div>
        </div>

        {/* Quick Launch Cards */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Start a Workflow</h3>
            <p className="text-xs text-slate-400">Jump straight into an AI-accelerated recruiter task</p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => setCurrentView('create-job')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">Create New Job</span>
                    <p className="text-[10px] text-slate-400">AI extracts requirements from JD</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
              </button>

              <button
                onClick={() => setCurrentView('candidate-upload')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">Upload Resumes</span>
                    <p className="text-[10px] text-slate-400">Strict zero-hallucination parsing</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400" />
              </button>

              <button
                onClick={() => setCurrentView('ai-search')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">AI Candidate Search</span>
                    <p className="text-[10px] text-slate-400">Conversational semantic matching</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Audit Log Active
            </span>
            <button
              onClick={() => setCurrentView('audit-trail')}
              className="text-emerald-400 hover:underline text-[11px] font-medium"
            >
              View Trail →
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Pipeline Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Active Candidate Pipeline</h3>
            <p className="text-xs text-slate-400">Candidates currently undergoing evidence analysis and interview validation</p>
          </div>
          <button
            onClick={() => setCurrentView('candidates')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            View All ({candidates.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-850/60 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Applied Position</th>
                <th className="py-3 px-4">Evidence Status</th>
                <th className="py-3 px-4">Pipeline Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {candidates.map(candidate => {
                const job = jobs.find(j => j.id === candidate.jobId);
                const matchRate = candidate.evidenceMatchRate;

                return (
                  <tr key={candidate.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{candidate.name}</div>
                      <div className="text-[11px] text-slate-400">{candidate.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200">{job?.title || 'General Engineering'}</span>
                      <div className="text-[11px] text-slate-400">{job?.department || 'Engineering'}</div>
                    </td>
                    <td className="py-3 px-4">
                      {matchRate ? (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span className="font-medium text-emerald-400">{matchRate.found} Found</span>
                          </div>
                          {matchRate.requiresValidation > 0 && (
                            <div className="flex items-center gap-1 text-[11px]">
                              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                              <span className="text-sky-400">{matchRate.requiresValidation} Validate</span>
                            </div>
                          )}
                          {matchRate.missing > 0 && (
                            <div className="flex items-center gap-1 text-[11px]">
                              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                              <span className="text-rose-400">{matchRate.missing} Missing</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Processing evidence...</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          candidate.status === 'Report Generated'
                            ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                            : candidate.status === 'Interview Workspace'
                            ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                            : candidate.status === 'Evidence Mapped'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedCandidateId(candidate.id);
                            setSelectedJobId(candidate.jobId);
                            setCurrentView('candidate-profile');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Profile & Map
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCandidateId(candidate.id);
                            setSelectedJobId(candidate.jobId);
                            setCurrentView('evidence-match');
                          }}
                          className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Match View
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
  );
};
