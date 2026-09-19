import { CandidateProfile, JobOpening, RequirementEvidenceItem, InterviewQuestion, InterviewSession, EvaluationReport } from '../types';

export async function analyzeJobDescription(title: string, department: string, jobDescription: string) {
  const response = await fetch('/api/ai/analyze-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, department, jobDescription }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to analyze job' }));
    throw new Error(err.error || 'Failed to analyze job');
  }
  return response.json();
}

export async function parseResumeTextOrFile(resumeText: string, fileData?: string, mimeType?: string) {
  const response = await fetch('/api/ai/parse-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, fileData, mimeType }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to parse resume' }));
    throw new Error(err.error || 'Failed to parse resume');
  }
  return response.json();
}

export async function mapCandidateEvidence(candidateProfile: CandidateProfile, jobRequirements: any): Promise<RequirementEvidenceItem[]> {
  const response = await fetch('/api/ai/map-evidence', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateProfile, jobRequirements }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to map candidate evidence' }));
    throw new Error(err.error || 'Failed to map candidate evidence');
  }
  return response.json();
}

export async function generateInterviewQuestions(
  candidateProfile: CandidateProfile,
  evidenceMap: RequirementEvidenceItem[],
  jobTitle: string
): Promise<InterviewQuestion[]> {
  const response = await fetch('/api/ai/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateProfile, evidenceMap, jobTitle }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to generate questions' }));
    throw new Error(err.error || 'Failed to generate questions');
  }
  return response.json();
}

export async function analyzeInterviewNotes(
  transcriptOrNotes: string,
  evidenceMap: RequirementEvidenceItem[],
  jobRequirements: any,
  candidateName: string
) {
  const response = await fetch('/api/ai/analyze-interview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcriptOrNotes, evidenceMap, jobRequirements, candidateName }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to analyze interview' }));
    throw new Error(err.error || 'Failed to analyze interview');
  }
  return response.json();
}

export async function generateEvaluationReport(
  candidateProfile: CandidateProfile,
  jobTitle: string,
  evidenceMap: RequirementEvidenceItem[],
  interviewAnalysis: any,
  recruiterNotes: string
): Promise<Partial<EvaluationReport>> {
  const response = await fetch('/api/ai/generate-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateProfile, jobTitle, evidenceMap, interviewAnalysis, recruiterNotes }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to generate report' }));
    throw new Error(err.error || 'Failed to generate report');
  }
  return response.json();
}

export async function naturalLanguageSearch(query: string, candidates: CandidateProfile[], jobs: JobOpening[]) {
  const response = await fetch('/api/ai/natural-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, candidates, jobs }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to execute AI search' }));
    throw new Error(err.error || 'Failed to execute AI search');
  }
  return response.json();
}

export const searchCandidatesWithAi = naturalLanguageSearch;

export async function compareCandidatesWithAi(
  roleTitle: string,
  requirements: any,
  candidates: any[]
) {
  const response = await fetch('/api/candidates/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roleTitle, requirements, candidates }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to compare candidates' }));
    throw new Error(err.error || 'Failed to compare candidates');
  }
  return response.json();
}

export async function evaluateLiveAnswerWithAi(
  candidateName: string,
  targetRequirement: string,
  question: string,
  candidateAnswer: string
) {
  const response = await fetch('/api/interview/evaluate-live-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateName, targetRequirement, question, candidateAnswer }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to evaluate live answer' }));
    throw new Error(err.error || 'Failed to evaluate live answer');
  }
  return response.json();
}
