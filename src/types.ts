export type EvidenceStatus = 'Evidence Found' | 'Partially Supported' | 'Missing' | 'Requires Validation';

export interface StructuredRequirements {
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequirements: string[];
  responsibilities: string[];
  evaluationAreas: {
    category: string;
    description: string;
  }[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  experienceRequired: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  createdAt: string;
  status: 'Active' | 'Draft' | 'Closed';
  structuredRequirements: StructuredRequirements;
  candidateCount?: number;
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  year?: string;
  details?: string;
}

export interface CandidateExperience {
  role: string;
  company: string;
  duration: string;
  summary: string;
  achievements: string[];
}

export interface CandidateProject {
  title: string;
  description: string;
  techStack: string[];
}

export interface CandidateProfile {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  education: CandidateEducation[];
  skills: string[];
  workExperience: CandidateExperience[];
  projects: CandidateProject[];
  certifications: string[];
  technologies: string[];
  achievements: string[];
  rawResumeText?: string;
  status: 'New' | 'Evidence Mapped' | 'Interview Workspace' | 'Report Generated' | 'Needs Review';
  createdAt: string;
  evidenceMatchRate?: {
    found: number;
    partial: number;
    missing: number;
    requiresValidation: number;
    total: number;
  };
}

export interface RequirementEvidenceItem {
  id: string;
  requirement: string;
  category: 'Required Skill' | 'Preferred Skill' | 'Experience' | 'Responsibility' | 'Evaluation Area';
  status: EvidenceStatus;
  evidenceQuote: string;
  source: string; // e.g., "Candidate Resume → Projects → Fraud Detection"
  explanation: string; // Specific reasoning why status was assigned
  validationQuestion?: string;
  interviewVerified?: boolean;
  interviewEvidence?: string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  targetedRequirement: string;
  contextFromResume: string;
  suggestedFollowUp?: string;
  rationale?: string;
  expectedEvidenceProof?: string;
  severity?: 'Missing' | 'Partial' | 'Validate' | string;
}

export interface InterviewRequirementAnalysis {
  requirement: string;
  candidateAnswerSummary: string;
  verifiedStatus: EvidenceStatus;
  notes: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  jobId: string;
  date: string;
  interviewer: string;
  transcriptOrNotes: string;
  generatedQuestions: InterviewQuestion[];
  analysisResult?: {
    summary: string;
    requirementsAddressed: InterviewRequirementAnalysis[];
    remainingGaps: string[];
    followUpQuestions: string[];
  };
}

export interface EvaluationReport {
  id: string;
  candidateId: string;
  jobId: string;
  generatedAt: string;
  executiveSummary: string;
  requirementCoverage: {
    total: number;
    evidenceFound: number;
    partiallySupported: number;
    missing: number;
    requiresValidation: number;
  };
  verifiedCompetencies: string[];
  unansweredOrInconclusiveAreas: string[];
  keyStrengths: string[];
  potentialRisksOrGaps: string[];
  suggestedNextRoundQuestions: string[];
  recruiterNotes: string;
  humanDecisionStatus: 'Pending Review' | 'Reviewed - Proceed' | 'Reviewed - Hold' | 'Needs Additional Validation';
  auditSummary: string;
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  action: string;
  candidateName?: string;
  jobTitle?: string;
  aiModel: string;
  requirementAffected?: string;
  evidenceExcerpt: string;
  modelRationale: string;
  humanReviewerNote?: string;
}

export interface AiSearchResult {
  candidateId: string;
  relevance?: 'Strong Match' | 'Moderate Match' | 'Partial Match';
  matchScore?: string;
  matchExplanation: string;
  evidenceQuotes: string[];
  missingCriteria: string[];
}

export interface CandidateComparisonPoint {
  candidateId: string;
  candidateName: string;
  strengths: string[];
  gaps: string[];
  standoutEvidence: string[];
  dimensionScores: {
    coreSkills: number;
    architectureAndScale: number;
    productionOperations: number;
    domainRelevance: number;
  };
}

export interface CandidateComparisonAnalysis {
  roleTitle: string;
  executiveSummary: string;
  candidates: CandidateComparisonPoint[];
  tradeOffAnalysis: string;
  recommendedTieBreakerQuestions: string[];
}

export interface LiveAnswerEvaluation {
  requirementSatisfied: 'Demonstrated' | 'Partially Demonstrated' | 'Insufficient Evidence';
  technicalDepthRating: 'High' | 'Medium' | 'Low';
  observations: string;
  recommendedFollowUpProbe: string;
}

