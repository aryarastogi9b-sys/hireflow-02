import React, { useState } from 'react';
import {
  GitCompare,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Briefcase,
  Users,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Scale,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EvidenceStatus } from '../types';
import { CandidateComparisonMatrix } from './CandidateComparisonMatrix';

export const EvidenceComparisonView: React.FC = () => {
  const {
    candidates,
    jobs,
    selectedCandidateId,
    setSelectedCandidateId,
    selectedJobId,
    setSelectedJobId,
    evidenceMaps,
    blindMode,
    getAnonymizedCandidateName
  } = useApp();

  const [comparisonMode, setComparisonMode] = useState<'single' | 'matrix'>('single');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const candidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];
  const job = jobs.find(j => j.id === (candidate ? candidate.jobId : selectedJobId)) || jobs[0];
  const evidenceItems = (candidate ? evidenceMaps[candidate.id] : []) || [];

  const filteredItems = evidenceItems.filter(item => {
    if (activeFilter === 'All') return true;
    return item.status === activeFilter;
  });

  const getStatusPill = (status: EvidenceStatus) => {
    switch (status) {
      case 'Evidence Found':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Evidence Found
          </span>
        );
      case 'Partially Supported':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Partially Supported
          </span>
        );
      case 'Requires Validation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            Requires Validation
          </span>
        );
      case 'Missing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Missing Evidence
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <GitCompare className="w-4 h-4" />
            Dual-Column Verification Visualizer
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Evidence-Based Requirement Matching
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent side-by-side alignment comparing target job specifications against candidate evidence claims.
          </p>
        </div>

        {/* View Mode Toggle: Single Profile vs Finalist Benchmark Matrix */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-sm shrink-0">
          <button
            onClick={() => setComparisonMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              comparisonMode === 'single'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Single Profile</span>
          </button>
          <button
            onClick={() => setComparisonMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              comparisonMode === 'matrix'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Finalist Benchmark Matrix</span>
          </button>
        </div>
      </div>

      {comparisonMode === 'matrix' ? (
        <CandidateComparisonMatrix />
      ) : (
        <div className="space-y-6">
          {/* Candidate & Role Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Position:</span>
              <strong className="text-white">{job.title}</strong>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{job.department}</span>
            </div>

            {/* Candidate Selector */}
            <div className="flex items-center gap-2 bg-slate-850 border border-slate-750 px-2.5 py-1.5 rounded-lg">
              <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-400 font-medium">Candidate:</span>
              <select
                value={candidate?.id}
                onChange={e => setSelectedCandidateId(e.target.value)}
                className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
              >
                {candidates.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {getAnonymizedCandidateName(c.id, c.name)} ({jobs.find(j => j.id === c.jobId)?.title || 'Role'})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Evidence Found', 'Partially Supported', 'Requires Validation', 'Missing'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    activeFilter === filter
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

      {/* Visual Side-by-Side Comparison Stream */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Left Box: JOB REQUIREMENT (cols 1-5) */}
              <div className="lg:col-span-5 bg-slate-850 p-4 rounded-xl border border-slate-750">
                <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-semibold mb-1">
                  <span>Job Requirement</span>
                  <span className="text-emerald-400 font-mono text-[10px]">{item.category}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">{item.requirement}</h4>
                <p className="text-xs text-slate-400 mt-1.5">
                  Criterion extracted from official job posting.
                </p>
              </div>

              {/* Middle: Connection Arrow & Status (cols 6-7) */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 lg:py-0 text-center">
                <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 mb-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex lg:hidden items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 mb-2">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div>{getStatusPill(item.status)}</div>
              </div>

              {/* Right Box: CANDIDATE EVIDENCE (cols 8-12) */}
              <div className="lg:col-span-5 bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-semibold">
                  <span>Candidate Evidence Quote</span>
                  <span className="text-emerald-400 lowercase font-mono text-[10px]">{item.source}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 italic leading-relaxed">
                  {item.evidenceQuote === 'Not found in provided evidence.' ? (
                    <span className="text-rose-400 not-italic">"Not found in provided evidence."</span>
                  ) : (
                    `"${item.evidenceQuote}"`
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-slate-400 font-medium">Why this status: </strong>
                  <span>{item.explanation}</span>
                </div>
              </div>
            </div>

            {/* Validation Question Footer */}
            {item.validationQuestion && (
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-blue-200 bg-blue-950/20 p-2.5 rounded-lg border border-blue-800/25">
                <span className="font-semibold text-blue-400 shrink-0">Follow-up Probe:</span>
                <span className="italic">{item.validationQuestion}</span>
              </div>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
            <GitCompare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No items match the "{activeFilter}" filter</p>
            <p className="text-xs text-slate-500 mt-1">Try switching candidate or filter criteria.</p>
          </div>
        )}
      </div>
        </div>
      )}
    </div>
  );
};
