import React, { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  FolderGit2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  FileText,
  MessageSquareCode,
  GitCompare,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EvidenceStatus } from '../types';
import { mapCandidateEvidence } from '../utils/aiClient';

export const CandidateProfileView: React.FC = () => {
  const {
    candidates,
    jobs,
    selectedCandidateId,
    evidenceMaps,
    updateCandidateEvidence,
    setCurrentView,
    setSelectedJobId
  } = useApp();

  const candidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];
  const job = jobs.find(j => j.id === candidate?.jobId) || jobs[0];
  const evidenceItems = (candidate ? evidenceMaps[candidate.id] : []) || [];

  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('All');
  const [isRemapping, setIsRemapping] = useState(false);

  if (!candidate) {
    return (
      <div className="p-8 text-center text-slate-400">
        Candidate not found. Please select from the candidate list.
      </div>
    );
  }

  const handleRemap = async () => {
    setIsRemapping(true);
    try {
      const items = await mapCandidateEvidence(candidate, job.structuredRequirements);
      updateCandidateEvidence(candidate.id, items);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRemapping(false);
    }
  };

  const filteredEvidence = evidenceItems.filter(item => {
    if (activeStatusFilter === 'All') return true;
    return item.status === activeStatusFilter;
  });

  const getStatusBadge = (status: EvidenceStatus) => {
    switch (status) {
      case 'Evidence Found':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Evidence Found
          </span>
        );
      case 'Partially Supported':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Partially Supported
          </span>
        );
      case 'Requires Validation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            Requires Validation
          </span>
        );
      case 'Missing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Missing Evidence
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('candidates')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Candidate Pipeline
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedJobId(candidate.jobId);
              setCurrentView('evidence-match');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5 text-emerald-400" />
            Side-by-Side Match
          </button>

          <button
            onClick={() => setCurrentView('interview-workspace')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            Open Interview Workspace
          </button>
        </div>
      </div>

      {/* Candidate Dossier Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">{candidate.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {candidate.status}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400 flex flex-wrap items-center gap-3">
              <span>Applied for: <strong className="text-slate-200">{job.title}</strong></span>
              <span>•</span>
              <span>{candidate.location}</span>
              <span>•</span>
              <span className="font-mono text-slate-300">{candidate.email}</span>
              {candidate.phone !== 'Not found in provided evidence.' && (
                <>
                  <span>•</span>
                  <span>{candidate.phone}</span>
                </>
              )}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 bg-slate-850 p-2.5 rounded-lg border border-slate-750 text-xs">
            <div className="text-center px-3 border-r border-slate-750">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Evidence Found</span>
              <span className="text-sm font-bold text-emerald-400">
                {evidenceItems.filter(i => i.status === 'Evidence Found').length}
              </span>
            </div>
            <div className="text-center px-3 border-r border-slate-750">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Validation Needed</span>
              <span className="text-sm font-bold text-sky-400">
                {evidenceItems.filter(i => i.status === 'Requires Validation').length}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Missing</span>
              <span className="text-sm font-bold text-rose-400">
                {evidenceItems.filter(i => i.status === 'Missing').length}
              </span>
            </div>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Extracted Skills & Technologies ({candidate.skills.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* REQUIREMENT EVIDENCE MAP (Primary Section) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">Requirement Evidence Map</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Zero Unexplained Scores
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Every job criterion is backed by cited resume quotes, source breadcrumbs, and explicit reasoning.
            </p>
          </div>

          {/* Action and Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRemap}
              disabled={isRemapping}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer"
            >
              {isRemapping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
              Refresh AI Mapping
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Evidence Found', 'Partially Supported', 'Requires Validation', 'Missing'].map(filter => {
            const count =
              filter === 'All'
                ? evidenceItems.length
                : evidenceItems.filter(i => i.status === filter).length;

            return (
              <button
                key={filter}
                onClick={() => setActiveStatusFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeStatusFilter === filter
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-750'
                }`}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>

        {/* Evidence Cards List */}
        <div className="space-y-3.5">
          {filteredEvidence.map(item => (
            <div
              key={item.id}
              className="bg-slate-850 rounded-xl border border-slate-750 p-4 transition-all hover:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-white">{item.requirement}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <div>{getStatusBadge(item.status)}</div>
              </div>

              {/* Evidence Quote */}
              <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1 flex items-center justify-between">
                  <span>Candidate Evidence:</span>
                  <span className="font-mono text-emerald-400 text-[10px] lowercase">{item.source}</span>
                </div>
                <p className="italic text-slate-200">
                  {item.evidenceQuote === 'Not found in provided evidence.' ? (
                    <span className="text-rose-400 not-italic">"Not found in provided evidence."</span>
                  ) : (
                    `"${item.evidenceQuote}"`
                  )}
                </p>
              </div>

              {/* Objective Explanation */}
              <div className="mt-2.5 flex items-start gap-2 text-xs text-slate-300">
                <strong className="text-slate-400 font-semibold shrink-0">Analysis Reason:</strong>
                <span className="leading-relaxed">{item.explanation}</span>
              </div>

              {/* Validation Question if applicable */}
              {item.validationQuestion && (
                <div className="mt-2.5 p-2.5 bg-blue-950/30 rounded-lg border border-blue-800/30 text-xs text-blue-200 flex items-start gap-2">
                  <strong className="text-blue-400 font-semibold shrink-0">Targeted Interview Question:</strong>
                  <span className="italic">{item.validationQuestion}</span>
                </div>
              )}
            </div>
          ))}

          {filteredEvidence.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-850 rounded-xl">
              No evidence items match the "{activeStatusFilter}" filter.
            </div>
          )}
        </div>
      </div>

      {/* Two Column Section: Work Experience & Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Experience */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            Work Experience Chronology
          </h3>

          <div className="space-y-3">
            {candidate.workExperience.map((exp, idx) => (
              <div key={idx} className="p-3 bg-slate-850 rounded-lg border border-slate-750">
                <div className="flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{exp.role}</h4>
                    <p className="text-slate-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {exp.duration}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{exp.summary}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-slate-400">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Projects & Education */}
        <div className="space-y-6">
          {/* Projects */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-teal-400" />
              Verified Projects
            </h3>

            <div className="space-y-3">
              {candidate.projects.map((proj, idx) => (
                <div key={idx} className="p-3 bg-slate-850 rounded-lg border border-slate-750">
                  <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              Education & Certifications
            </h3>

            <div className="space-y-2">
              {candidate.education.map((edu, idx) => (
                <div key={idx} className="p-2.5 bg-slate-850 rounded border border-slate-750 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{edu.degree}</span>
                    {edu.year && <span className="text-slate-400 text-[11px]">{edu.year}</span>}
                  </div>
                  <p className="text-slate-400 text-[11px]">{edu.institution}</p>
                  {edu.details && <p className="text-slate-300 text-[11px] mt-1">{edu.details}</p>}
                </div>
              ))}

              {candidate.certifications && candidate.certifications.length > 0 && (
                <div className="pt-2">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Certifications
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className={`text-xs px-2.5 py-1 rounded border ${
                          cert === 'Not found in provided evidence.'
                            ? 'bg-slate-850 text-slate-500 border-slate-800 italic'
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
