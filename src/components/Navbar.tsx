import React from 'react';
import { Briefcase, RotateCcw, ShieldCheck, Sparkles, UserCheck, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    jobs,
    selectedJobId,
    setSelectedJobId,
    resetToDemoData,
    blindMode,
    toggleBlindMode
  } = useApp();

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return { title: 'Recruitment Intelligence Dashboard', desc: 'Real-time overview of candidate evidence, open roles, and verification pipeline.' };
      case 'jobs':
        return { title: 'Job Openings & Requirements', desc: 'Manage open positions and structured requirements analyzed from Job Descriptions.' };
      case 'create-job':
        return { title: 'Create Job & AI Requirement Extractor', desc: 'Paste or upload a JD to extract required skills, responsibilities, and evaluation areas.' };
      case 'candidates':
        return { title: 'Candidate Pipeline', desc: 'Review candidate evidence profiles, verify qualifications, and manage review queues.' };
      case 'candidate-upload':
        return { title: 'Candidate Resume Ingestion', desc: 'Upload candidate resumes (PDF, DOCX, TXT) for factual, hallucination-free extraction.' };
      case 'candidate-profile':
        return { title: 'Candidate Evidence Profile', desc: 'Comprehensive candidate dossier with verified requirement evidence mapping.' };
      case 'evidence-match':
        return { title: 'Evidence-Based Requirement Matching', desc: 'Side-by-side visual comparison of job requirements vs candidate evidence.' };
      case 'interview-workspace':
        return { title: 'AI Interview Workspace', desc: 'Generate targeted questions, analyze interview transcripts, and verify live claims.' };
      case 'reports':
        return { title: 'Structured Evaluation Reports', desc: 'Transparent evidence synthesis for final human hiring committee decisions.' };
      case 'ai-search':
        return { title: 'Natural Language Candidate Search', desc: 'Query candidates using conversational technical requirements and get direct evidence quotes.' };
      case 'audit-trail':
        return { title: 'AI Evidence Audit Trail', desc: 'Full transparency log tracking all evidence excerpts and AI model rationales.' };
      case 'settings':
        return { title: 'System & Engine Settings', desc: 'Configure Gemini API parameters, evaluation weights, and platform policies.' };
      default:
        return { title: 'HireFlow Intelligence', desc: 'Evidence-based recruitment workflow.' };
    }
  };

  const { title, desc } = getTitle();

  return (
    <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 py-3.5 sticky top-0 z-20 flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* View Title */}
      <div>
        <h1 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
          {title}
        </h1>
        <p className="text-xs text-slate-400 max-w-xl truncate">{desc}</p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Active Job Selector */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
          <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px] text-slate-400 shrink-0">Active Role:</span>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer max-w-[190px] truncate"
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id} className="bg-slate-900 text-slate-200">
                {j.title}
              </option>
            ))}
          </select>
        </div>

        {/* Bias Shield / Blind Screening Toggle */}
        <button
          onClick={toggleBlindMode}
          title={blindMode ? 'Disable Blind Screening Mode' : 'Enable Blind Screening (Anonymize names, photos, & schools to eliminate bias)'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
            blindMode
              ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 shadow-sm shadow-purple-500/15'
              : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-300'
          }`}
        >
          {blindMode ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-purple-400" />
              <span>Bias Shield: ON</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Bias Shield</span>
            </>
          )}
        </button>

        {/* Human Authority Banner */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-950/40 border border-indigo-700/40 rounded-lg text-[11px] text-indigo-300 font-medium">
          <UserCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Human Decision Mandate</span>
        </div>

        {/* Demo Data Reset */}
        <button
          onClick={resetToDemoData}
          title="Reset to clean startup demo data"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-slate-400" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>
      </div>
    </header>
  );
};
