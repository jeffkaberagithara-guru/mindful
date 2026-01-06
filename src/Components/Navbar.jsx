import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaMoon, FaSun, FaPhoneAlt } from 'react-icons/fa';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';
import { CrisisModal } from './CrisisButton.jsx';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Resources', path: '/resources', icon: '📚' },
    { name: 'Find Therapist', path: '/find-therapist', icon: '👨‍⚕️' },
    { name: 'Learn More', path: '/learn-more', icon: '🧠' },
    { name: 'Crisis Help', path: '/crisis', icon: '🆘' },
    { name: 'Mood Tracker', path: '/tools/mood-tracker', icon: '📊' },
    { name: 'Assessment', path: '/tools/assessment', icon: '📝' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 supports-[backdrop-filter]:bg-[#020617]/90">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                <span className="text-white font-bold text-xl">M</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                MindShift
              </span>
              <span className="text-xs text-gray-400 -mt-1">
                Mental Wellness Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-center px-4">
            {navLinks.slice(0, 5).map((link) => (
              link.path === '/crisis' ? (
                <button
                  key={link.name}
                  onClick={() => setIsCrisisOpen(true)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 font-medium text-gray-300 hover:bg-white/10 hover:text-blue-400 cursor-pointer`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm whitespace-nowrap">{link.name}</span>
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${isActive(link.path)
                    ? 'bg-white/10 text-white shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-blue-400'
                    }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm whitespace-nowrap">{link.name}</span>
                  {isActive(link.path) && (
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </Link>
              )
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-105 w-9 h-9 border border-gray-700 bg-gray-800 text-purple-400 shadow-sm hover:shadow-md hover:border-purple-300`}
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsCrisisOpen(true)}
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-105 gap-1.5 px-3 py-2 bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-red-500/30 whitespace-nowrap"
              title="Emergency Help"
            >
              <FaPhoneAlt className="w-3 h-3" />
              <span className="text-sm">Emergency</span>
            </button>

            <Link
              to="/tools/mood-tracker"
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-105 px-3 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-blue-500/30 whitespace-nowrap"
            >
              <span className="text-sm">Check-in</span>
            </Link>

            <Link
              to="/settings"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-105 gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-gray-200 shadow-sm hover:shadow-md"
              title="User Profile"
            >
              <div className="w-7 h-7 rounded-full bg-linear-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white">
                <FaUser className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm hidden xl:inline">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer p-2 hover:bg-gray-800 text-gray-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/5 py-3 animate-slideDown bg-[#020617]/98 backdrop-blur-xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isActive(link.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium text-sm">{link.name}</span>
                  {isActive(link.path) && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}

              <div className="flex gap-2 pt-3 mt-2 border-t border-gray-800 px-4">
                <button
                  onClick={toggleTheme}
                  className="flex-1 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer gap-2 p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300"
                >
                  {theme === 'light' ? (
                    <>
                      <FaMoon className="w-4 h-4" />
                      <span className="text-sm">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <FaSun className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Light Mode</span>
                    </>
                  )}
                </button>

                <Link
                  to="/settings"
                  className="flex-1 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer gap-2 p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <CrisisModal isOpen={isCrisisOpen} onClose={() => setIsCrisisOpen(false)} />
    </nav>
  );
}