import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  GitCompare,
  MessageSquareCode,
  FileText,
  Sparkles,
  ShieldCheck,
  Settings,
  PlusCircle,
  FileUp,
  Cpu
} from 'lucide-react';
import { useApp, AppView } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const navItems: { id: AppView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'evidence-match', label: 'Evidence Matching', icon: GitCompare },
    { id: 'interview-workspace', label: 'Interview Workspace', icon: MessageSquareCode },
    { id: 'reports', label: 'Evaluation Reports', icon: FileText },
    { id: 'ai-search', label: 'AI Search', icon: Sparkles },
    { id: 'audit-trail', label: 'Audit Trail', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <Cpu className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-white">HireFlow</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Recruitment Intelligence</p>
          </div>
        </div>

        {/* Guiding Principle Tag */}
        <div className="mt-3.5 px-2.5 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700/60 text-[11px] text-slate-300 flex items-center justify-between">
          <span className="text-slate-400">Core Engine:</span>
          <span className="font-semibold text-emerald-400">Evidence → Human</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="px-3 pt-3 pb-2 space-y-1.5">
        <button
          onClick={() => setCurrentView('create-job')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Create Job</span>
        </button>
        <button
          onClick={() => setCurrentView('candidate-upload')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
        >
          <FileUp className="w-3.5 h-3.5 text-slate-400" />
          <span>Upload Resumes</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Workflows
        </p>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (item.id === 'jobs' && currentView === 'create-job') ||
            (item.id === 'candidates' && (currentView === 'candidate-upload' || currentView === 'candidate-profile'));

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === 'reports' && (
                <span className="px-1.5 py-0.5 text-[9px] font-medium bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  Human Sign-off
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
        <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Gemini 3.8 Flash
            </span>
            <span className="text-[10px] text-slate-400">Zero Hallucination</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 leading-tight">
            Strict source-grounded evidence analysis.
          </p>
        </div>
      </div>
    </aside>
  );
};
