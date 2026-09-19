import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Briefcase,
  FileCheck,
  ChevronRight,
  Sparkles,
  AlertCircle,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CandidatesListView: React.FC = () => {
  const { candidates, jobs, selectedJobId, setSelectedJobId, setSelectedCandidateId, setCurrentView } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [jobFilter, setJobFilter] = useState<string>('all');

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesJob = jobFilter === 'all' || c.jobId === jobFilter;

    return matchesSearch && matchesStatus && matchesJob;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Candidate Verification Pipeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Profiles with hallucination-free resume parsing, requirement evidence mapping, and interview validation.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('candidate-upload')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Upload New Resumes
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Filter candidates by name or skill..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Job Filter */}
          <select
            value={jobFilter}
            onChange={e => setJobFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none"
          >
            <option value="all">All Roles ({candidates.length})</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none"
          >
            <option value="All">All Stages</option>
            <option value="Evidence Mapped">Evidence Mapped</option>
            <option value="Interview Workspace">Interview Workspace</option>
            <option value="Report Generated">Report Generated</option>
            <option value="Needs Review">Needs Review</option>
          </select>
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCandidates.map(candidate => {
          const job = jobs.find(j => j.id === candidate.jobId);
          const rate = candidate.evidenceMatchRate;

          return (
            <div
              key={candidate.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Basic Dossier */}
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-white hover:text-emerald-400 transition-colors">
                    {candidate.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
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
                </div>

                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400 font-medium">{job?.title || 'Open Position'}</span>
                  <span>•</span>
                  <span>{candidate.location}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">{candidate.email}</span>
                </p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {candidate.skills.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-850 text-slate-300 text-[10px] border border-slate-750 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-850 text-slate-400 text-[10px]">
                      +{candidate.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Middle Column: Requirement Evidence Breakdown */}
              <div className="p-3 bg-slate-850/60 rounded-xl border border-slate-750/80 min-w-[240px]">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                  <span>Requirement Evidence</span>
                  <span className="text-slate-300 font-semibold">{rate?.total || 0} Criteria</span>
                </div>

                {rate ? (
                  <div className="space-y-1.5">
                    {/* Visual Progress Line */}
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                      <div
                        style={{ width: `${(rate.found / rate.total) * 100}%` }}
                        className="bg-emerald-500 h-full"
                        title={`Found: ${rate.found}`}
                      />
                      <div
                        style={{ width: `${(rate.partial / rate.total) * 100}%` }}
                        className="bg-amber-500 h-full"
                        title={`Partial: ${rate.partial}`}
                      />
                      <div
                        style={{ width: `${(rate.requiresValidation / rate.total) * 100}%` }}
                        className="bg-sky-500 h-full"
                        title={`Requires Validation: ${rate.requiresValidation}`}
                      />
                      <div
                        style={{ width: `${(rate.missing / rate.total) * 100}%` }}
                        className="bg-rose-500 h-full"
                        title={`Missing: ${rate.missing}`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span className="text-emerald-400 font-semibold">{rate.found} Found</span>
                      <span className="text-amber-400 font-medium">{rate.partial} Partial</span>
                      <span className="text-sky-400 font-medium">{rate.requiresValidation} Validate</span>
                      <span className="text-rose-400 font-medium">{rate.missing} Missing</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No evidence mapped yet.</p>
                )}
              </div>

              {/* Right Column: Workflow Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setSelectedCandidateId(candidate.id);
                    setSelectedJobId(candidate.jobId);
                    setCurrentView('candidate-profile');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Evidence Map
                </button>

                <button
                  onClick={() => {
                    setSelectedCandidateId(candidate.id);
                    setSelectedJobId(candidate.jobId);
                    setCurrentView('evidence-match');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Compare
                </button>

                <button
                  onClick={() => {
                    setSelectedCandidateId(candidate.id);
                    setSelectedJobId(candidate.jobId);
                    setCurrentView('interview-workspace');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Interview
                </button>
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
            <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No candidates match your filter</p>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search or uploading a new resume.</p>
          </div>
        )}
      </div>
    </div>
  );
};
