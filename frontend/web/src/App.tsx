import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import GardeningPage from './pages/GardeningPage';
import DisposalPage from './pages/DisposalPage';
import ClimatePage from './pages/ClimatePage';
import EventosPage from './pages/EventosPage';
import ProfilePage from './pages/ProfilePage';
import Chatbot from './components/Chatbot';

// Componente auxiliar para proteger rotas e mostrar loading
const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-gray-light font-sans">
      {isAuthenticated ? (
        <div className="flex flex-col min-h-screen">
          <Header onLogout={logout} />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/jardinagem" element={<GardeningPage />} />
            <Route path="/descarte" element={<DisposalPage />} />
            <Route path="/clima" element={<ClimatePage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Chatbot />
        </div>
      ) : (
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;