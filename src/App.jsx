import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SearchInterface from './components/SearchInterface';
import AIChat from './components/AIChat';
import Dashboard from './components/Dashboard';
import DataSources from './components/DataSources';
import PolicyDetail from './components/PolicyDetail';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchInterface />} />
          <Route path="/sources" element={<DataSources />} />
          <Route path="/policy/:id" element={<PolicyDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
