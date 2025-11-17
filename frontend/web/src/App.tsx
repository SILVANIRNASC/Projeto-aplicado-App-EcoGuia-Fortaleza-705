import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import GardeningPage from './pages/GardeningPage';
import DisposalPage from './pages/DisposalPage';
import ClimatePage from './pages/ClimatePage';
import ProfilePage from './pages/ProfilePage';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-brand-gray-light font-sans">
        {isAuthenticated ? (
          <div className="flex flex-col min-h-screen">
            <Header onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/jardinagem" element={<GardeningPage />} />
              <Route path="/descarte" element={<DisposalPage />} />
              <Route path="/clima" element={<ClimatePage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Chatbot />
          </div>
        ) : (
          <Routes>
            <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </div>
    </HashRouter>
  );
};

export default App;