import React, { useState } from 'react';
import {
  Sparkles,
  Briefcase,
  FileText,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobOpening, StructuredRequirements } from '../types';
import { analyzeJobDescription } from '../utils/aiClient';

export const CreateJobView: React.FC = () => {
  const { addJob, setCurrentView } = useApp();

  // Form states
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [experienceRequired, setExperienceRequired] = useState('3–5 years');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [employmentType, setEmploymentType] = useState<JobOpening['employmentType']>('Full-time');
  const [description, setDescription] = useState('');

  // AI Extraction state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedRequirements, setExtractedRequirements] = useState<StructuredRequirements | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // New item inputs for manual editing
  const [newRequiredSkill, setNewRequiredSkill] = useState('');
  const [newPreferredSkill, setNewPreferredSkill] = useState('');
  const [newExperience, setNewExperience] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newAreaCategory, setNewAreaCategory] = useState('');
  const [newAreaDesc, setNewAreaDesc] = useState('');

  const handleSampleJD = (type: 'backend' | 'ml' | 'frontend') => {
    if (type === 'backend') {
      setTitle('Senior Distributed Backend Engineer');
      setDepartment('Core Infrastructure');
      setExperienceRequired('4–7 years');
      setLocation('San Francisco, CA / Remote');
      setEmploymentType('Full-time');
      setDescription(`Role Summary:
We are seeking an experienced Senior Backend Engineer to design, build, and scale our next-generation distributed transaction services. You will architect high-throughput Kafka streaming pipelines and optimize PostgreSQL database clusters.

Key Responsibilities:
- Design and deploy resilient async microservices in Python (FastAPI/asyncio) and Go.
- Architect high-throughput event processing pipelines with Kafka and Redis distributed caching.
- Optimize complex SQL queries, index structures, and connection pools in PostgreSQL.
- Lead system architecture reviews and establish SLA/SLO observability benchmarks.

Required Qualifications:
- 4+ years building production-grade distributed backend services.
- Deep expertise in Python (FastAPI/asyncio) and SQL optimization.
- Proven experience with distributed consensus, concurrency control, and idempotency patterns.
- Strong grounding in REST and gRPC API contract design.

Preferred Qualifications:
- Experience with Kubernetes orchestration, Helm charts, and container networking.
- Hands-on deployment of Redis cluster caching and distributed rate-limiters.
- AWS or GCP cloud infrastructure architecture.`);
    } else if (type === 'ml') {
      setTitle('Senior GenAI / LLM Systems Engineer');
      setDepartment('Applied AI Lab');
      setExperienceRequired('3–5 years');
      setLocation('New York, NY / Remote');
      setEmploymentType('Full-time');
      setDescription(`Role Summary:
Join our Applied AI team to build high-accuracy retrieval-augmented generation (RAG) platforms and automated hallucination evaluation frameworks.

Key Responsibilities:
- Architect low-latency RAG pipelines with vector databases (Qdrant, pgvector).
- Fine-tune open source foundation models with LoRA/QLoRA for domain-specific information extraction.
- Implement strict factual consistency and groundedness evaluation metrics.
- Deploy scalable model inference servers with vLLM and TensorRT.

Required Skills:
- Advanced Python and PyTorch proficiency.
- Hands-on experience developing and deploying enterprise RAG pipelines.
- Vector database indexing and embedding model tuning.
- Rigorous statistical evaluation methodology.

Preferred:
- Experience with FastAPI, Docker, and Kubernetes GPU scheduling.`);
    } else {
      setTitle('Full-Stack Platform Engineer');
      setDepartment('Product Engineering');
      setExperienceRequired('3–6 years');
      setLocation('Remote');
      setEmploymentType('Full-time');
      setDescription(`Role Summary:
We are looking for a versatile Full-Stack Engineer to build customer-facing recruitment portals and interactive data visualizers.

Responsibilities:
- Build accessible, responsive interfaces using React, TypeScript, and Tailwind CSS.
- Develop secure Node.js / Express backend endpoints and database schemas.
- Implement automated unit and end-to-end testing with Jest and Playwright.

Requirements:
- Strong proficiency in TypeScript, React, and Node.js.
- Experience with relational databases and RESTful API development.`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setDescription(text);
        if (!title) {
          setTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      }
    };
    reader.readAsText(file);
  };

  const handleAnalyzeJD = async () => {
    if (!description.trim()) {
      setAnalysisError('Please enter or paste a Job Description first.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const result = await analyzeJobDescription(title || 'Open Position', department, description);
      setExtractedRequirements({
        requiredSkills: result.requiredSkills || [],
        preferredSkills: result.preferredSkills || [],
        experienceRequirements: result.experienceRequirements || [],
        responsibilities: result.responsibilities || [],
        evaluationAreas: result.evaluationAreas || []
      });
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Failed to analyze job description.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveJob = () => {
    if (!title.trim() || !description.trim()) {
      setAnalysisError('Please provide both a Job Title and Description.');
      return;
    }

    const defaultRequirements: StructuredRequirements = extractedRequirements || {
      requiredSkills: ['General Engineering Competency', 'Communication'],
      preferredSkills: ['Cloud Experience'],
      experienceRequirements: [experienceRequired],
      responsibilities: ['Execute role responsibilities'],
      evaluationAreas: [{ category: 'Role Competency', description: 'Evaluation based on job description.' }]
    };

    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      title,
      department,
      experienceRequired,
      location,
      employmentType,
      description,
      createdAt: new Date().toISOString(),
      status: 'Active',
      candidateCount: 0,
      structuredRequirements: defaultRequirements
    };

    addJob(newJob);
    setCurrentView('jobs');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('jobs')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Jobs
        </button>
        <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
          AI-Powered JD Parser
        </span>
      </div>

      {/* Main Input Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Create New Job Opening</h2>
          <p className="text-xs text-slate-400 mt-1">
            Provide the job details and description. HireFlow's Gemini engine will extract structured,
            verifiable requirements into editable cards.
          </p>
        </div>

        {/* Quick Sample Fill */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-850 rounded-lg border border-slate-750">
          <span className="text-xs text-slate-400 font-medium">Quick Demo JDs:</span>
          <button
            type="button"
            onClick={() => handleSampleJD('backend')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-medium cursor-pointer"
          >
            Distributed Backend JD
          </button>
          <button
            type="button"
            onClick={() => handleSampleJD('ml')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-medium cursor-pointer"
          >
            GenAI / RAG Engineer JD
          </button>
          <button
            type="button"
            onClick={() => handleSampleJD('frontend')}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-medium cursor-pointer"
          >
            Full-Stack JD
          </button>
        </div>

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Job Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Senior Backend Engineer"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department</label>
            <input
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              placeholder="e.g. Core Engineering"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Experience Required</label>
            <input
              type="text"
              value={experienceRequired}
              onChange={e => setExperienceRequired(e.target.value)}
              placeholder="e.g. 3–5 years"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA (Hybrid)"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Employment Type</label>
            <select
              value={employmentType}
              onChange={e => setEmploymentType(e.target.value as JobOpening['employmentType'])}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* File Upload Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Upload JD File (PDF, DOCX, TXT)
            </label>
            <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>Choose Document to Load</span>
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Job Description Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Job Description (Paste or Review) *
          </label>
          <textarea
            rows={8}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
          />
        </div>

        {analysisError && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{analysisError}</span>
          </div>
        )}

        {/* Trigger AI Extraction */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Click below to extract structured requirements with Gemini 3.8 Flash.
          </p>
          <button
            type="button"
            disabled={isAnalyzing || !description.trim()}
            onClick={handleAnalyzeJD}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing JD with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                Analyze JD with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extracted Structured Requirements Display (Editable Cards) */}
      {extractedRequirements && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                AI Extraction Complete
              </div>
              <h3 className="text-base font-bold text-white">Structured Job Requirements (Editable Cards)</h3>
              <p className="text-xs text-slate-400">
                Review and customize the extracted skills, responsibilities, and evaluation areas below before activating.
              </p>
            </div>
            <button
              onClick={handleSaveJob}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer transition-colors"
            >
              Save & Activate Job Opening
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Required Skills Card */}
            <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Required Skills ({extractedRequirements.requiredSkills.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedRequirements.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        setExtractedRequirements(prev =>
                          prev
                            ? {
                                ...prev,
                                requiredSkills: prev.requiredSkills.filter((_, i) => i !== idx)
                              }
                            : null
                        )
                      }
                      className="hover:text-rose-400 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {/* Add required skill */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <input
                  type="text"
                  placeholder="Add required skill..."
                  value={newRequiredSkill}
                  onChange={e => setNewRequiredSkill(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newRequiredSkill.trim()) {
                      e.preventDefault();
                      setExtractedRequirements(prev =>
                        prev
                          ? { ...prev, requiredSkills: [...prev.requiredSkills, newRequiredSkill.trim()] }
                          : null
                      );
                      setNewRequiredSkill('');
                    }
                  }}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newRequiredSkill.trim()) {
                      setExtractedRequirements(prev =>
                        prev
                          ? { ...prev, requiredSkills: [...prev.requiredSkills, newRequiredSkill.trim()] }
                          : null
                      );
                      setNewRequiredSkill('');
                    }
                  }}
                  className="px-2 py-1 bg-slate-750 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Preferred Skills Card */}
            <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  Preferred Skills ({extractedRequirements.preferredSkills.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedRequirements.preferredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        setExtractedRequirements(prev =>
                          prev
                            ? {
                                ...prev,
                                preferredSkills: prev.preferredSkills.filter((_, i) => i !== idx)
                              }
                            : null
                        )
                      }
                      className="hover:text-rose-400 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {/* Add preferred skill */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <input
                  type="text"
                  placeholder="Add preferred skill..."
                  value={newPreferredSkill}
                  onChange={e => setNewPreferredSkill(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newPreferredSkill.trim()) {
                      e.preventDefault();
                      setExtractedRequirements(prev =>
                        prev
                          ? { ...prev, preferredSkills: [...prev.preferredSkills, newPreferredSkill.trim()] }
                          : null
                      );
                      setNewPreferredSkill('');
                    }
                  }}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPreferredSkill.trim()) {
                      setExtractedRequirements(prev =>
                        prev
                          ? { ...prev, preferredSkills: [...prev.preferredSkills, newPreferredSkill.trim()] }
                          : null
                      );
                      setNewPreferredSkill('');
                    }
                  }}
                  className="px-2 py-1 bg-slate-750 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Experience Requirements Card */}
            <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Experience Requirements ({extractedRequirements.experienceRequirements.length})
              </span>
              <ul className="space-y-1.5">
                {extractedRequirements.experienceRequirements.map((exp, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/80 p-2 rounded border border-slate-700"
                  >
                    <span>{exp}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setExtractedRequirements(prev =>
                          prev
                            ? {
                                ...prev,
                                experienceRequirements: prev.experienceRequirements.filter((_, i) => i !== idx)
                              }
                            : null
                        )
                      }
                      className="text-slate-400 hover:text-rose-400 ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <input
                  type="text"
                  placeholder="Add experience requirement..."
                  value={newExperience}
                  onChange={e => setNewExperience(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newExperience.trim()) {
                      setExtractedRequirements(prev =>
                        prev
                          ? {
                              ...prev,
                              experienceRequirements: [...prev.experienceRequirements, newExperience.trim()]
                            }
                          : null
                      );
                      setNewExperience('');
                    }
                  }}
                  className="px-2 py-1 bg-slate-750 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsibilities Card */}
            <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Responsibilities ({extractedRequirements.responsibilities.length})
              </span>
              <ul className="space-y-1.5">
                {extractedRequirements.responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/80 p-2 rounded border border-slate-700"
                  >
                    <span>{resp}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setExtractedRequirements(prev =>
                          prev
                            ? {
                                ...prev,
                                responsibilities: prev.responsibilities.filter((_, i) => i !== idx)
                              }
                            : null
                        )
                      }
                      className="text-slate-400 hover:text-rose-400 ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <input
                  type="text"
                  placeholder="Add responsibility..."
                  value={newResponsibility}
                  onChange={e => setNewResponsibility(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newResponsibility.trim()) {
                      setExtractedRequirements(prev =>
                        prev
                          ? {
                              ...prev,
                              responsibilities: [...prev.responsibilities, newResponsibility.trim()]
                            }
                          : null
                      );
                      setNewResponsibility('');
                    }
                  }}
                  className="px-2 py-1 bg-slate-750 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Structured Evaluation Areas */}
          <div className="p-4 bg-slate-850 rounded-xl border border-slate-750 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Structured Evaluation Categories
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extractedRequirements.evaluationAreas.map((area, idx) => (
                <div key={idx} className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span>{area.category}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setExtractedRequirements(prev =>
                            prev
                              ? {
                                  ...prev,
                                  evaluationAreas: prev.evaluationAreas.filter((_, i) => i !== idx)
                                }
                              : null
                          )
                        }
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Evaluation Area */}
            <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Category Name (e.g. System Design)"
                value={newAreaCategory}
                onChange={e => setNewAreaCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none sm:w-1/3"
              />
              <input
                type="text"
                placeholder="Description of what to evaluate..."
                value={newAreaDesc}
                onChange={e => setNewAreaDesc(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (newAreaCategory.trim() && newAreaDesc.trim()) {
                    setExtractedRequirements(prev =>
                      prev
                        ? {
                            ...prev,
                            evaluationAreas: [
                              ...prev.evaluationAreas,
                              { category: newAreaCategory.trim(), description: newAreaDesc.trim() }
                            ]
                          }
                        : null
                    );
                    setNewAreaCategory('');
                    setNewAreaDesc('');
                  }
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold shrink-0"
              >
                Add Category
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSaveJob}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer transition-colors"
            >
              Activate Job Opening
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
