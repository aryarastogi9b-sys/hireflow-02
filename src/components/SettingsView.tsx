import React, { useState } from 'react';
import {
  Settings,
  Cpu,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Sliders,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { resetToDemoData } = useApp();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [strictMode, setStrictMode] = useState(true);
  const [temperature, setTemperature] = useState('0.1');

  const handleReset = () => {
    resetToDemoData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">System & AI Engine Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure Gemini 3.8 Flash inference parameters, verification strictness, and system policies.
        </p>
      </div>

      {/* Model & Runtime Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Active AI Engine</h3>
              <p className="text-xs text-slate-400">Powered by Google DeepMind's Gemini API</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            gemini-3.8-flash (Online)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-850 rounded-lg border border-slate-750">
            <span className="text-slate-400 block mb-1 font-semibold">SDK Implementation</span>
            <span className="text-white font-mono">@google/genai (v0.1.3)</span>
          </div>
          <div className="p-3 bg-slate-850 rounded-lg border border-slate-750">
            <span className="text-slate-400 block mb-1 font-semibold">Execution Layer</span>
            <span className="text-white font-mono">Full-Stack Server Proxy (/api/*)</span>
          </div>
        </div>
      </div>

      {/* Hallucination Prevention & Principles */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Zero-Extrapolation & Policy Rules
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-850 rounded-lg border border-slate-750 flex items-start justify-between gap-3">
            <div>
              <span className="font-bold text-white block">Strict Evidence Citation Policy</span>
              <p className="text-slate-400 mt-0.5">
                The engine is forbidden from assuming candidate abilities. Any requirement lacking direct resume proof is labeled "Not found in provided evidence."
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold shrink-0">
              Enforced
            </span>
          </div>

          <div className="p-3.5 bg-slate-850 rounded-lg border border-slate-750 flex items-start justify-between gap-3">
            <div>
              <span className="font-bold text-white block">Human Authority Mandate</span>
              <p className="text-slate-400 mt-0.5">
                The system prohibits autonomous hire or reject decisions. Final recommendations must be manually logged and signed by human recruiters.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold shrink-0">
              Mandatory
            </span>
          </div>
        </div>
      </div>

      {/* Demo Seed Reset */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-400" />
          Reset Demo Data
        </h3>
        <p className="text-xs text-slate-400">
          Reinitialize the workspace with the default hackathon demo state (4 active jobs, Elena Rostova, Jonathan Vance, Alex Rivera, Dr. Priya Sharma, interview transcripts, and audit trail).
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            Restore Demo Data Seed
          </button>
          {resetSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4" /> Demo data restored successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
