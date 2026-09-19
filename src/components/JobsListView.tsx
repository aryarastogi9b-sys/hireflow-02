import React from 'react';
import { Briefcase, Plus, Users, MapPin, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JobsListView: React.FC = () => {
  const { jobs, selectedJobId, setSelectedJobId, candidates, setCurrentView } = useApp();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Active Job Openings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage roles, review structured requirements, and inspect candidate pipelines.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('create-job')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create New Job Opening
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {jobs.map(job => {
          const isSelected = job.id === selectedJobId;
          const candidateCount = candidates.filter(c => c.jobId === job.id).length;

          return (
            <div
              key={job.id}
              className={`bg-slate-900 rounded-xl border transition-all p-5 flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      {job.department}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{job.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                    {job.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {job.experienceRequired}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    {candidateCount} Candidates
                  </span>
                </div>

                {/* Structured Requirements Chips */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Extracted Required Skills ({job.structuredRequirements?.requiredSkills?.length || 0})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(job.structuredRequirements?.requiredSkills || []).slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] border border-slate-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {(job.structuredRequirements?.requiredSkills?.length || 0) > 4 && (
                      <span className="px-2 py-0.5 rounded bg-slate-850 text-slate-400 text-[11px]">
                        +{(job.structuredRequirements?.requiredSkills?.length || 0) - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Evaluation Areas Preview */}
                <div className="mt-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wide">
                    Evaluation Areas ({job.structuredRequirements?.evaluationAreas?.length || 0})
                  </p>
                  <div className="space-y-1">
                    {(job.structuredRequirements?.evaluationAreas || []).slice(0, 2).map((area, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-200">{area.category}:</span>
                        <span className="text-slate-400 truncate">{area.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedJobId(job.id);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? '✓ Active Role' : 'Set as Active Role'}
                </button>

                <button
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setCurrentView('candidates');
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  View Pipeline ({candidateCount}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
