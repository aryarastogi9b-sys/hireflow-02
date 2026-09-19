import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Loader2,
  UserCheck,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AiSearchResult } from '../types';
import { searchCandidatesWithAi } from '../utils/aiClient';

export const AiSearchView: React.FC = () => {
  const { candidates, jobs, setSelectedCandidateId, setCurrentView, setSelectedJobId } = useApp();

  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AiSearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const sampleQueries = [
    'Which candidate has the most relevant Kafka experience?',
    'Show candidates with production Python experience.',
    'Who has experience with vector databases and RAG?',
    'Which candidates are missing required skills or experience?'
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await searchCandidatesWithAi(searchQuery, candidates, jobs);
      const matches: AiSearchResult[] = response.matches || (Array.isArray(response) ? response : []);
      setResults(matches);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
          <Sparkles className="w-4 h-4" />
          Natural Language Semantic Search
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          AI Candidate Search & Evidence Query
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Ask conversational recruiting questions across all resumes. Answers cite specific evidence quotes and verification status.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. Which candidate has the most relevant Kafka and distributed locks experience?"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0 inline-flex items-center gap-2 shadow-md"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Querying Resumes...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Search Resumes
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-2">
            Try natural recruiter prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSearch(q)}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors cursor-pointer text-left font-medium"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Evaluation Results ({results.length})
            </h3>
            <span className="text-xs text-slate-400">Query: "{query}"</span>
          </div>

          <div className="space-y-4">
            {results.map((res, idx) => {
              const matchedCand = candidates.find(c => c.id === res.candidateId);
              const relevance = res.relevance || res.matchScore || 'Match';

              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3.5 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {matchedCand ? matchedCand.name : res.candidateId}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            relevance.toLowerCase().includes('strong') || relevance.toLowerCase().includes('high')
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : relevance.toLowerCase().includes('moderate')
                              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {relevance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Role: {jobs.find(j => j.id === matchedCand?.jobId)?.title || 'Engineering'}
                      </p>
                    </div>

                    {matchedCand && (
                      <button
                        onClick={() => {
                          setSelectedCandidateId(matchedCand.id);
                          setSelectedJobId(matchedCand.jobId);
                          setCurrentView('candidate-profile');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer transition-colors"
                      >
                        Inspect Dossier <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Evidence Quotes */}
                  {(res.evidenceQuotes || []).length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                        Cited Evidence from Resume:
                      </span>
                      <div className="space-y-1.5">
                        {(res.evidenceQuotes || []).map((quote: string, qIdx: number) => (
                          <div
                            key={qIdx}
                            className="p-3 bg-slate-850 rounded-lg border border-slate-750 text-xs text-slate-200 italic leading-relaxed font-mono"
                          >
                            "{quote}"
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary match reasoning */}
                  <div className="text-xs text-slate-300 flex items-start gap-2 pt-1">
                    <strong className="text-slate-400 font-semibold shrink-0">Analysis:</strong>
                    <span>{res.matchExplanation}</span>
                  </div>

                  {/* Missing elements if any */}
                  {res.missingCriteria && res.missingCriteria.length > 0 && (
                    <div className="p-2.5 bg-rose-950/20 rounded-lg border border-rose-900/30 text-xs text-rose-300 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                      <div>
                        <strong className="font-semibold text-rose-300">Missing Elements: </strong>
                        <span>{res.missingCriteria.join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {results.length === 0 && !isSearching && (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
                <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-300">No candidates matched the query</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try asking about different technologies (e.g., Python, Kafka, SQL, Docker, RAG).
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
