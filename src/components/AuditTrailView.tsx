import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  FileCheck,
  MessageSquare,
  UserCheck,
  ExternalLink,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuditTrailView: React.FC = () => {
  const { auditTrail, candidates, setSelectedCandidateId, setCurrentView } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('All');

  const filteredLogs = auditTrail.filter(log => {
    const candName = log.candidateName || '';
    const rationale = log.modelRationale || '';
    const req = log.requirementAffected || '';
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rationale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'All' || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const getActionBadge = (action: string) => {
    if (action.includes('Human Sign-off') || action.includes('Decision')) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          Human Sign-Off
        </span>
      );
    }
    if (action.includes('Interview')) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
          Interview Analysis
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
        Resume Evidence Map
      </span>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            Zero-Black-Box Verification
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Evidence Verification Audit Trail
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full provenance log linking every extracted requirement claim, transcript check, and human decision.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search audit trail by candidate or keyword..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Action Type:</span>
          <select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none"
          >
            <option value="All">All Actions</option>
            <option value="Requirement Evidence Mapped">Evidence Mapped</option>
            <option value="Interview Verification Completed">Interview Verification</option>
            <option value="Recruiter Human Sign-off Recorded">Human Sign-off</option>
          </select>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="space-y-3">
        {filteredLogs.map(log => {
          const matchedCandidate = candidates.find(
            c => (c.name || '').toLowerCase() === (log.candidateName || '').toLowerCase()
          );

          return (
            <div
              key={log.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-750 transition-all space-y-2.5"
            >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {getActionBadge(log.action)}
                <span className="text-xs font-bold text-white">{log.candidateName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">{log.action}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Target and Excerpt */}
            <div className="p-3 bg-slate-850 rounded-lg border border-slate-750 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="text-emerald-400">Target: {log.requirementAffected || 'General Qualification'}</span>
                <span className="font-mono text-slate-400 text-[10px]">{log.aiModel}</span>
              </div>
              <p className="text-slate-200 italic font-mono text-[11px] leading-relaxed">
                "{log.evidenceExcerpt}"
              </p>
            </div>

            {/* Reason */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div>
                <strong className="text-slate-300 font-medium">Rationale: </strong>
                <span>{log.modelRationale}</span>
              </div>

              {matchedCandidate && (
                <button
                  onClick={() => {
                    setSelectedCandidateId(matchedCandidate.id);
                    setCurrentView('candidate-profile');
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 cursor-pointer shrink-0 ml-4"
                >
                  Inspect <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        );
      })}

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No logs match your filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
