import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  JobOpening,
  CandidateProfile,
  RequirementEvidenceItem,
  InterviewSession,
  EvaluationReport,
  AuditTrailEntry,
  StructuredRequirements
} from '../types';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_EVIDENCE_MAP,
  INITIAL_INTERVIEWS,
  INITIAL_REPORTS,
  INITIAL_AUDIT_TRAIL
} from '../data/mockData';

export type AppView =
  | 'dashboard'
  | 'jobs'
  | 'create-job'
  | 'candidates'
  | 'candidate-upload'
  | 'candidate-profile'
  | 'evidence-match'
  | 'interview-workspace'
  | 'reports'
  | 'ai-search'
  | 'audit-trail'
  | 'settings';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  selectedCandidateId: string;
  setSelectedCandidateId: (id: string) => void;
  blindMode: boolean;
  setBlindMode: (val: boolean) => void;
  toggleBlindMode: () => void;
  getAnonymizedCandidateName: (candidateId: string, realName: string) => string;
  jobs: JobOpening[];
  candidates: CandidateProfile[];
  evidenceMaps: Record<string, RequirementEvidenceItem[]>;
  interviews: Record<string, InterviewSession>;
  reports: Record<string, EvaluationReport>;
  auditTrail: AuditTrailEntry[];
  addJob: (job: JobOpening) => void;
  updateJobRequirements: (jobId: string, requirements: StructuredRequirements) => void;
  addCandidate: (candidate: CandidateProfile, evidenceItems?: RequirementEvidenceItem[]) => void;
  updateCandidateEvidence: (candidateId: string, items: RequirementEvidenceItem[]) => void;
  saveInterviewSession: (session: InterviewSession) => void;
  saveEvaluationReport: (report: EvaluationReport) => void;
  addAuditEntry: (entry: Omit<AuditTrailEntry, 'id' | 'timestamp'>) => void;
  updateHumanDecision: (candidateId: string, status: EvaluationReport['humanDecisionStatus'], notes?: string) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'hireflow_state_v2_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cand-1');

  const [blindMode, setBlindMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY_PREFIX}blind_mode`) === 'true';
    } catch {
      return false;
    }
  });

  const toggleBlindMode = () => {
    setBlindMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}blind_mode`, String(next));
      } catch {}
      return next;
    });
  };

  const getAnonymizedCandidateName = (candidateId: string, realName: string) => {
    if (!blindMode) return realName;
    const codenames: Record<string, string> = {
      'cand-1': 'Candidate Alpha-318',
      'cand-2': 'Candidate Delta-592',
      'cand-3': 'Candidate Sierra-404',
      'cand-4': 'Candidate Omega-721',
      'cand-5': 'Candidate Kappa-109',
      'cand-6': 'Candidate Theta-845',
      'cand-7': 'Candidate Zeta-612',
      'cand-8': 'Candidate Lambda-531',
      'cand-9': 'Candidate Sigma-914',
      'cand-10': 'Candidate Rho-208',
      'cand-11': 'Candidate Epsilon-370',
      'cand-12': 'Candidate Gamma-492'
    };
    if (codenames[candidateId]) return codenames[candidateId];

    const greekPhonetics = ['Echo', 'Foxtrot', 'Tango', 'Phoenix', 'Kilo', 'Nexus', 'Vortex'];
    let hash = 0;
    for (let i = 0; i < candidateId.length; i++) {
      hash = (hash << 5) - hash + candidateId.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % greekPhonetics.length;
    const num = (Math.abs(hash * 37) % 900) + 100;
    return `Candidate ${greekPhonetics[idx]}-${num}`;
  };

  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}jobs`);
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [candidates, setCandidates] = useState<CandidateProfile[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}candidates`);
      return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
    } catch {
      return INITIAL_CANDIDATES;
    }
  });

  const [evidenceMaps, setEvidenceMaps] = useState<Record<string, RequirementEvidenceItem[]>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}evidence`);
      return saved ? JSON.parse(saved) : INITIAL_EVIDENCE_MAP;
    } catch {
      return INITIAL_EVIDENCE_MAP;
    }
  });

  const [interviews, setInterviews] = useState<Record<string, InterviewSession>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}interviews`);
      return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
    } catch {
      return INITIAL_INTERVIEWS;
    }
  });

  const [reports, setReports] = useState<Record<string, EvaluationReport>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}reports`);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [auditTrail, setAuditTrail] = useState<AuditTrailEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}audit`);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_TRAIL;
    } catch {
      return INITIAL_AUDIT_TRAIL;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}jobs`, JSON.stringify(jobs));
    } catch (e) {
      console.warn('Failed saving jobs', e);
    }
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}candidates`, JSON.stringify(candidates));
    } catch (e) {
      console.warn('Failed saving candidates', e);
    }
  }, [candidates]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}evidence`, JSON.stringify(evidenceMaps));
    } catch (e) {
      console.warn('Failed saving evidence', e);
    }
  }, [evidenceMaps]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}interviews`, JSON.stringify(interviews));
    } catch (e) {
      console.warn('Failed saving interviews', e);
    }
  }, [interviews]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}reports`, JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed saving reports', e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}audit`, JSON.stringify(auditTrail));
    } catch (e) {
      console.warn('Failed saving audit', e);
    }
  }, [auditTrail]);

  const addJob = (job: JobOpening) => {
    setJobs(prev => [job, ...prev]);
    setSelectedJobId(job.id);
    addAuditEntry({
      action: 'Job Creation & Requirement Analysis',
      jobTitle: job.title,
      aiModel: 'gemini-3.8-flash',
      requirementAffected: 'Job Specification',
      evidenceExcerpt: `Parsed ${job.structuredRequirements.requiredSkills.length} required skills and ${job.structuredRequirements.evaluationAreas.length} evaluation areas.`,
      modelRationale: 'Structured requirements extracted directly from job description with high factual grounding.',
      humanReviewerNote: 'Job created and added to active pipeline.'
    });
  };

  const updateJobRequirements = (jobId: string, requirements: StructuredRequirements) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, structuredRequirements: requirements } : j))
    );
    addAuditEntry({
      action: 'Job Requirements Modified',
      aiModel: 'User Override / Human Review',
      requirementAffected: 'Structured Requirements',
      evidenceExcerpt: `Updated requirement criteria for job ${jobId}.`,
      modelRationale: 'Human recruiter customized extracted skills/areas.',
      humanReviewerNote: 'Manual review adjustment.'
    });
  };

  const addCandidate = (candidate: CandidateProfile, evidenceItems?: RequirementEvidenceItem[]) => {
    setCandidates(prev => [candidate, ...prev]);
    if (evidenceItems && evidenceItems.length > 0) {
      setEvidenceMaps(prev => ({
        ...prev,
        [candidate.id]: evidenceItems
      }));
    }
    setSelectedCandidateId(candidate.id);
    addAuditEntry({
      action: 'Candidate Resume Ingestion',
      candidateName: candidate.name,
      aiModel: 'gemini-3.8-flash',
      requirementAffected: 'Candidate Record',
      evidenceExcerpt: `Extracted profile for ${candidate.name} with ${candidate.skills.length} skills and ${candidate.workExperience.length} experience entries.`,
      modelRationale: 'Strict evidence extraction executed. Omitted sections marked as "Not found in provided evidence".',
      humanReviewerNote: 'Candidate ingested into hiring pipeline.'
    });
  };

  const updateCandidateEvidence = (candidateId: string, items: RequirementEvidenceItem[]) => {
    setEvidenceMaps(prev => ({
      ...prev,
      [candidateId]: items
    }));

    // Update candidate match metrics
    const found = items.filter(i => i.status === 'Evidence Found').length;
    const partial = items.filter(i => i.status === 'Partially Supported').length;
    const missing = items.filter(i => i.status === 'Missing').length;
    const requiresValidation = items.filter(i => i.status === 'Requires Validation').length;

    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId
          ? {
              ...c,
              status: 'Evidence Mapped',
              evidenceMatchRate: {
                found,
                partial,
                missing,
                requiresValidation,
                total: items.length
              }
            }
          : c
      )
    );
  };

  const saveInterviewSession = (session: InterviewSession) => {
    setInterviews(prev => ({
      ...prev,
      [session.candidateId]: session
    }));
    setCandidates(prev =>
      prev.map(c => (c.id === session.candidateId ? { ...c, status: 'Interview Workspace' } : c))
    );
  };

  const saveEvaluationReport = (report: EvaluationReport) => {
    setReports(prev => ({
      ...prev,
      [report.candidateId]: report
    }));
    setCandidates(prev =>
      prev.map(c => (c.id === report.candidateId ? { ...c, status: 'Report Generated' } : c))
    );
    addAuditEntry({
      action: 'Evaluation Report Generated',
      aiModel: 'gemini-3.8-flash',
      requirementAffected: 'Final Candidate Synthesis',
      evidenceExcerpt: `Coverage: ${report.requirementCoverage.evidenceFound} Found, ${report.requirementCoverage.partiallySupported} Partial, ${report.requirementCoverage.missing} Missing.`,
      modelRationale: 'Adhered strictly to HireFlow non-decision mandate. Final hiring outcome flagged for human reviewer responsibility.',
      humanReviewerNote: `Report status: ${report.humanDecisionStatus}`
    });
  };

  const addAuditEntry = (entry: Omit<AuditTrailEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditTrailEntry = {
      ...entry,
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString()
    };
    setAuditTrail(prev => [newEntry, ...prev]);
  };

  const updateHumanDecision = (
    candidateId: string,
    status: EvaluationReport['humanDecisionStatus'],
    notes?: string
  ) => {
    setReports(prev => {
      const existing = prev[candidateId];
      if (!existing) return prev;
      return {
        ...prev,
        [candidateId]: {
          ...existing,
          humanDecisionStatus: status,
          recruiterNotes: notes !== undefined ? notes : existing.recruiterNotes
        }
      };
    });

    const candidate = candidates.find(c => c.id === candidateId);
    addAuditEntry({
      action: 'Human Reviewer Decision Recorded',
      candidateName: candidate?.name || candidateId,
      aiModel: 'Human Decision Authority',
      requirementAffected: 'Hiring Decision Governance',
      evidenceExcerpt: `Human recruiter designated state: "${status}".`,
      modelRationale: 'System explicitly delegates hiring authority to human recruiter.',
      humanReviewerNote: notes || 'Updated by recruiter in evaluation report.'
    });
  };

  const resetToDemoData = () => {
    setJobs(INITIAL_JOBS);
    setCandidates(INITIAL_CANDIDATES);
    setEvidenceMaps(INITIAL_EVIDENCE_MAP);
    setInterviews(INITIAL_INTERVIEWS);
    setReports(INITIAL_REPORTS);
    setAuditTrail(INITIAL_AUDIT_TRAIL);
    setSelectedJobId('job-1');
    setSelectedCandidateId('cand-1');
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedJobId,
        setSelectedJobId,
        selectedCandidateId,
        setSelectedCandidateId,
        blindMode,
        setBlindMode,
        toggleBlindMode,
        getAnonymizedCandidateName,
        jobs,
        candidates,
        evidenceMaps,
        interviews,
        reports,
        auditTrail,
        addJob,
        updateJobRequirements,
        addCandidate,
        updateCandidateEvidence,
        saveInterviewSession,
        saveEvaluationReport,
        addAuditEntry,
        updateHumanDecision,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
