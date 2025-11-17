import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, LeafIcon, RecycleIcon, SunIcon, UserIcon, CloudIcon } from './icons';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const DesktopNavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-brand-blue-dark bg-brand-blue-light'
          : 'text-gray-600 hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span className="ml-2">{label}</span>
  </NavLink>
);

const MobileNavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-colors ${
        isActive
          ? 'text-brand-blue bg-brand-blue-light rounded-lg'
          : 'text-gray-500 hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span className="mt-1">{label}</span>
  </NavLink>
);


interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <LeafIcon className="h-8 w-8 text-brand-blue" />
              <span className="ml-2 text-xl font-bold text-gray-800">EcoGuia Fortaleza</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <DesktopNavItem to="/" icon={<HomeIcon className="h-5 w-5" />} label="Início" />
              <DesktopNavItem to="/jardinagem" icon={<LeafIcon className="h-5 w-5" />} label="Jardinagem" />
              <DesktopNavItem to="/descarte" icon={<RecycleIcon className="h-5 w-5" />} label="Descarte" />
              <DesktopNavItem to="/clima" icon={<CloudIcon className="h-5 w-5" />} label="Clima" />
            </div>
          </div>
          
          {/* Desktop Profile & Logout */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
                <NavLink
                    to="/perfil"
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Perfil
                </NavLink>
                <button
                  onClick={onLogout}
                  className="ml-4 text-gray-500 hover:text-gray-700"
                  title="Sair"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
            </div>
          </div>
          
          {/* Mobile Logout Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              title="Sair"
              aria-label="Sair da conta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <nav className="md:hidden flex items-center justify-around px-2 pb-2 space-x-1 border-t border-gray-100 mt-px">
        <MobileNavItem to="/" icon={<HomeIcon className="h-5 w-5" />} label="Início" />
        <MobileNavItem to="/jardinagem" icon={<LeafIcon className="h-5 w-5" />} label="Jardinagem" />
        <MobileNavItem to="/descarte" icon={<RecycleIcon className="h-5 w-5" />} label="Descarte" />
        <MobileNavItem to="/clima" icon={<CloudIcon className="h-5 w-5" />} label="Clima" />
        <MobileNavItem to="/perfil" icon={<UserIcon className="h-5 w-5" />} label="Perfil" />
      </nav>
    </header>
  );
};

export default Header;