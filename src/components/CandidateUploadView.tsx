import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  X,
  Plus,
  FileUp,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CandidateProfile, RequirementEvidenceItem } from '../types';
import { parseResumeTextOrFile, mapCandidateEvidence } from '../utils/aiClient';

export const CandidateUploadView: React.FC = () => {
  const { jobs, selectedJobId, setSelectedJobId, addCandidate, setCurrentView, setSelectedCandidateId } = useApp();

  const [resumeText, setResumeText] = useState('');
  const [candidateNameInput, setCandidateNameInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; content?: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const handleSampleResume = (type: 'senior' | 'incomplete' | 'ml' | 'frontend' | 'sre') => {
    if (type === 'senior') {
      setCandidateNameInput('Jonathan Vance');
      setResumeText(`JONATHAN VANCE
Email: j.vance.eng@cloudsystems.net | Phone: +1 (650) 412-8921 | San Francisco, CA

PROFESSIONAL SUMMARY:
Lead Distributed Systems Architect with 7 years of production experience scaling backend infrastructures. Built resilient data ingestion pipelines handling over 25,000 req/sec with Python (FastAPI/asyncio) and Apache Kafka.

SKILLS:
- Languages: Python, Go, SQL, Bash
- Databases: PostgreSQL, Redis, DynamoDB
- Distributed: Apache Kafka, RabbitMQ, gRPC, Distributed Locks, Consensus
- Infrastructure: Docker, Kubernetes, AWS ECS, Terraform

WORK EXPERIENCE:
Principal Backend Engineer | Apex FinStream (2022 - Present)
- Architected distributed ledger service in Python 3.11 with FastAPI and asyncio worker nodes, cutting p99 latency to 38ms.
- Built idempotent payment settlement pipeline preventing duplicate charge conditions during worker failovers.
- Optimized PostgreSQL connection pool via PgBouncer and wrote automated query plan diagnostic tools.

Senior Backend Engineer | DataCore Global (2018 - 2022)
- Managed Apache Kafka clusters processing 6 billion events daily with custom partition rebalance hooks.
- Designed distributed Redis caching tier with token bucket rate-limiting algorithms to protect internal APIs.

EDUCATION:
B.S. in Computer Science | Stanford University (2018)

PROJECTS:
- AsyncLock-Py: Open-source distributed redlock implementation for asyncio.

CERTIFICATIONS:
AWS Certified Solutions Architect - Professional`);
    } else if (type === 'incomplete') {
      setCandidateNameInput('Alex Rivera');
      setResumeText(`ALEX RIVERA
Email: alex.r.codes@gmail.com

SUMMARY:
Junior Software Developer with 1 year of internship experience. Looking to learn backend engineering.

SKILLS:
Python, HTML, CSS, JavaScript, SQLite

WORK EXPERIENCE:
Junior Developer Intern | TechStart Studio (June 2024 - Dec 2024)
- Built internal admin dashboards using HTML/CSS and basic Flask endpoints.
- Wrote basic SQL queries against SQLite database for user lookup.

EDUCATION:
B.A. in Digital Arts | State College (2024)

PROJECTS:
- Personal Portfolio: Static website hosted on GitHub Pages.`);
    } else if (type === 'ml') {
      setCandidateNameInput('Dr. Priya Sharma');
      setResumeText(`DR. PRIYA SHARMA
Email: priya.sharma.ml@research.ai | Seattle, WA

EXPERIENCE:
Staff Research Engineer | Frontier Intelligence (2022 - Present)
- Designed production RAG architectures using Qdrant vector database and hybrid dense/sparse retrieval.
- Developed automated factual consistency validation framework reducing hallucinations by 34%.
- Fine-tuned 7B open source LLMs with LoRA on technical legal and financial documentation.

EDUCATION:
Ph.D. in Computer Science (NLP & Information Retrieval) | Carnegie Mellon University (2022)

SKILLS:
Python, PyTorch, Vector Databases, Qdrant, Transformers, FastAPI, Docker`);
    } else if (type === 'frontend') {
      setCandidateNameInput('Zoe Sterling');
      setResumeText(`ZOE STERLING
Email: zoe.sterling.ui@designcraft.dev | New York, NY

SUMMARY:
Senior Frontend & Design Systems Engineer with 6 years experience building WCAG AAA compliant React component architectures and modern design tokens.

SKILLS:
TypeScript, React 19, Next.js, Tailwind CSS v4, Motion, Web Accessibility (WCAG AAA), Storybook, Radix UI

WORK EXPERIENCE:
Staff UI Systems Engineer | Prism Enterprise UX (2022 - Present)
- Architected multi-brand token system consumed by 90+ engineers across 8 enterprise applications.
- Enforced automated accessibility testing pipeline with axe-core, achieving 100% WCAG AAA rating with zero keyboard trap regressions.
- Decreased front-end bundle size by 32% via modular tree-shaking and dynamic component code-splitting.

EDUCATION:
B.S. in Computer Science & Human-Computer Interaction | Cornell University (2020)`);
    } else {
      setCandidateNameInput('Kasper Lindholm');
      setResumeText(`KASPER LINDHOLM
Email: kasper.lindholm.sre@cloudops.io | Austin, TX

SUMMARY:
Staff Site Reliability Engineer with 7 years of production Kubernetes, multi-region Terraform infrastructure, and eBPF network observability experience.

SKILLS:
Kubernetes, Terraform / OpenTofu, eBPF, Cilium, Prometheus, Grafana, AWS, GCP, ArgoCD, Linux Kernel

WORK EXPERIENCE:
Staff SRE | GlobalMesh Infrastructure (2021 - Present)
- Architected 14 multi-region Kubernetes clusters across AWS and GCP sustaining 99.995% uptime SLA at 90k req/sec.
- Implemented Cilium eBPF service mesh for socket-level kernel packet routing, cutting p99 latency by 5.5ms.
- Built declarative GitOps CI/CD deployment pipelines with ArgoCD and automated canary rollouts.

CERTIFICATIONS:
Certified Kubernetes Administrator (CKA), HashiCorp Certified Terraform Associate`);
    }
  };

  const handleFilesChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: { name: string; size: string; content?: string }[] = [];

    Array.from(files).forEach(file => {
      const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
      const reader = new FileReader();

      reader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          newFiles.push({ name: file.name, size: sizeStr, content: text });
          setUploadedFiles(prev => [...prev, { name: file.name, size: sizeStr, content: text }]);
          if (!resumeText) {
            setResumeText(text);
          }
        }
      };

      reader.readAsText(file);
    });
  };

  const handleIngest = async () => {
    if (!resumeText.trim() && uploadedFiles.length === 0) {
      setErrorMsg('Please paste resume text or select at least one resume file.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setProgressMessage('Ingesting resume with Gemini 3.8 Flash (zero extrapolation)...');

    try {
      const textToProcess = resumeText || uploadedFiles[0]?.content || '';
      const parsedProfile = await parseResumeTextOrFile(textToProcess);

      // Construct verified candidate profile
      const newCandId = `cand-${Date.now()}`;
      const candidateObj: CandidateProfile = {
        id: newCandId,
        jobId: selectedJob.id,
        name: candidateNameInput.trim() || parsedProfile.name || 'Candidate (Extracted)',
        email: parsedProfile.email || 'Not found in provided evidence.',
        phone: parsedProfile.phone || 'Not found in provided evidence.',
        location: parsedProfile.location || 'Not found in provided evidence.',
        education: parsedProfile.education || [],
        skills: parsedProfile.skills || [],
        workExperience: parsedProfile.workExperience || [],
        projects: parsedProfile.projects || [],
        certifications: parsedProfile.certifications || ['Not found in provided evidence.'],
        technologies: parsedProfile.technologies || parsedProfile.skills || [],
        achievements: parsedProfile.achievements || ['Not found in provided evidence.'],
        rawResumeText: textToProcess,
        status: 'Evidence Mapped',
        createdAt: new Date().toISOString()
      };

      setProgressMessage(`Mapping candidate evidence against "${selectedJob.title}" requirements...`);

      // Run AI Evidence Mapping against selected job requirements
      const evidenceItems = await mapCandidateEvidence(candidateObj, selectedJob.structuredRequirements);

      // Compute status breakdown
      const found = evidenceItems.filter(i => i.status === 'Evidence Found').length;
      const partial = evidenceItems.filter(i => i.status === 'Partially Supported').length;
      const missing = evidenceItems.filter(i => i.status === 'Missing').length;
      const requiresValidation = evidenceItems.filter(i => i.status === 'Requires Validation').length;

      candidateObj.evidenceMatchRate = {
        found,
        partial,
        missing,
        requiresValidation,
        total: evidenceItems.length
      };

      // Add to context
      addCandidate(candidateObj, evidenceItems);
      setSelectedCandidateId(newCandId);

      // Jump to profile view
      setCurrentView('candidate-profile');
    } catch (err: any) {
      console.error('Extraction error:', err);
      setErrorMsg(err.message || 'Failed to extract resume data.');
    } finally {
      setIsProcessing(false);
      setProgressMessage('');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('candidates')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Candidates
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Target Role:</span>
          <select
            value={selectedJobId}
            onChange={e => setSelectedJobId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 font-semibold rounded px-2.5 py-1 focus:outline-none"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Upload Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Candidate Resume Ingestion</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            HireFlow extracts candidates strictly from provided text. If an attribute is missing, the AI engine
            flags it as <span className="text-amber-400 font-semibold">"Not found in provided evidence"</span> rather
            than hallucinating credentials.
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-850 rounded-lg border border-slate-755">
          <span className="text-xs text-slate-400 font-medium">Quick Demo Resumes:</span>
          <button
            type="button"
            onClick={() => handleSampleResume('senior')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-medium cursor-pointer"
          >
            Senior Distributed Lead
          </button>
          <button
            type="button"
            onClick={() => handleSampleResume('ml')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-medium cursor-pointer"
          >
            Ph.D. RAG/ML
          </button>
          <button
            type="button"
            onClick={() => handleSampleResume('frontend')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-medium cursor-pointer"
          >
            Staff Frontend (Design Systems)
          </button>
          <button
            type="button"
            onClick={() => handleSampleResume('sre')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-medium cursor-pointer"
          >
            Staff SRE & eBPF
          </button>
          <button
            type="button"
            onClick={() => handleSampleResume('incomplete')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-medium cursor-pointer"
          >
            Junior (Missing Evidence)
          </button>
        </div>

        {/* Candidate Name (Optional override) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Candidate Name (Optional - Auto-extracted if empty)
          </label>
          <input
            type="text"
            placeholder="e.g. Jonathan Vance"
            value={candidateNameInput}
            onChange={e => setCandidateNameInput(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* File Drag-and-Drop Area */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Upload Resume Files (PDF, DOCX, TXT)
          </label>
          <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer bg-slate-850/50 hover:bg-slate-850 transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
              <FileUp className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-200">
                Click to browse or drop candidate resumes here
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, TXT documents</p>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFilesChosen}
              className="hidden"
            />
          </label>

          {/* Selected files list */}
          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-1.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase">Selected Files ({uploadedFiles.length})</p>
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium text-white">{file.name}</span>
                    <span className="text-slate-500">({file.size})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Raw Resume Text Option */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Or Paste Resume Content Directly
          </label>
          <textarea
            rows={10}
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder="Paste raw resume text here..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
          />
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit & Ingest Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Target Job: <span className="text-white font-medium">{selectedJob.title}</span>
          </div>

          <button
            type="button"
            disabled={isProcessing || (!resumeText.trim() && uploadedFiles.length === 0)}
            onClick={handleIngest}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{progressMessage || 'Processing Resume...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Extract Profile & Map Evidence</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
