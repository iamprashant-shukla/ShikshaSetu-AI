import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, MessageCircle, BarChart3, Database, Bell, Sparkles } from 'lucide-react';

const Header = () => {
  const navItems = [
    { to: '/chat', label: 'AI Assistant', icon: MessageCircle },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/dashboard', label: 'Analytics', icon: BarChart3 },
    { to: '/sources', label: 'Data Sources', icon: Database },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-[#1E3A5F]/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with Link to Landing Page */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#1E3A5F] to-[#1E3A5F]/80 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37]" />
            </div>
            <div>
              <Link to="/" className="block">
                <h1 className="text-base md:text-xl font-bold bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/80 bg-clip-text text-transparent cursor-pointer">
                  ShikshaSetu AI
                </h1>
                <p className="text-[10px] md:text-xs text-gray-600 cursor-pointer hidden sm:block">Department of Higher Education</p>
              </Link>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl font-medium transition-all text-xs md:text-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/90 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-[#D4AF37]/10 hover:text-[#1E3A5F]'
                  }`
                }
              >
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center space-x-1">
            {navItems.map(({ to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/90 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-[#D4AF37]/10'
                  }`
                }
                title={to}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </NavLink>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Stats */}
            <div className="flex items-center space-x-3 bg-[#1E3A5F]/5 border border-[#D4AF37]/20 rounded-xl px-3 py-2">
              <div className="text-center">
                <p className="text-xs font-bold text-[#1E3A5F]">6</p>
                <p className="text-[10px] text-gray-600">Sources</p>
              </div>
              <div className="w-px h-6 bg-[#D4AF37]/30"></div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#D4AF37]">₹88K</p>
                <p className="text-[10px] text-gray-600">Budget</p>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 hover:text-[#1E3A5F] cursor-pointer transition-colors" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
