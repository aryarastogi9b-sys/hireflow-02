/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { JobsListView } from './components/JobsListView';
import { CreateJobView } from './components/CreateJobView';
import { CandidatesListView } from './components/CandidatesListView';
import { CandidateUploadView } from './components/CandidateUploadView';
import { CandidateProfileView } from './components/CandidateProfileView';
import { EvidenceComparisonView } from './components/EvidenceComparisonView';
import { InterviewWorkspaceView } from './components/InterviewWorkspaceView';
import { EvaluationReportsView } from './components/EvaluationReportsView';
import { AiSearchView } from './components/AiSearchView';
import { AuditTrailView } from './components/AuditTrailView';
import { SettingsView } from './components/SettingsView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'jobs':
        return <JobsListView />;
      case 'create-job':
        return <CreateJobView />;
      case 'candidates':
        return <CandidatesListView />;
      case 'candidate-upload':
        return <CandidateUploadView />;
      case 'candidate-profile':
        return <CandidateProfileView />;
      case 'evidence-match':
        return <EvidenceComparisonView />;
      case 'interview-workspace':
        return <InterviewWorkspaceView />;
      case 'reports':
        return <EvaluationReportsView />;
      case 'ai-search':
        return <AiSearchView />;
      case 'audit-trail':
        return <AuditTrailView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950/95 scroll-smooth">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
