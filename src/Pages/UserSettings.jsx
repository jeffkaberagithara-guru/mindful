import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';
import {
  FaUser, FaBell, FaMoon, FaSun, FaEye, FaTrash,
  FaDownload, FaLock, FaPalette, FaShieldAlt,
  FaUniversalAccess, FaFont, FaCheck
} from 'react-icons/fa';

export default function UserSettings() {
  // Appearance
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 'medium');

  // Accessibility
  const [crisisButtonSize, setCrisisButtonSize] = useLocalStorage('crisisButtonSize', 'normal');
  const [reduceMotion, setReduceMotion] = useLocalStorage('reduceMotion', false);
  const [dyslexiaFont, setDyslexiaFont] = useLocalStorage('dyslexiaFont', false);
  const [highContrast, setHighContrast] = useLocalStorage('highContrast', false);

  // Privacy
  const [privacyMode, setPrivacyMode] = useLocalStorage('privacyMode', false);

  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'accessibility', label: 'Accessibility', icon: <FaUniversalAccess /> },
    { id: 'privacy', label: 'Privacy', icon: <FaLock /> }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: 'text-sm' },
    { value: 'medium', label: 'Medium', size: 'text-base' },
    { value: 'large', label: 'Large', size: 'text-lg' },
    { value: 'xlarge', label: 'Extra Large', size: 'text-xl' }
  ];

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all your saved data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      moodHistory: localStorage.getItem('moodHistory'),
      assessmentHistory: localStorage.getItem('assessmentHistory'),
      settings: {
        theme,
        privacyMode,
        fontSize,
        crisisButtonSize,
        reduceMotion,
        dyslexiaFont,
        highContrast
      }
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mindshift-data-backup.json';
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-4 border border-blue-100 dark:border-blue-900/30">
          <FaUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-blue-700 dark:text-blue-300">User Profile</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Settings & Preferences
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Customize your experience to work best for you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sticky top-24 transition-colors duration-300">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer gap-3 w-full px-4 py-3 ${activeTab === tab.id
                    ? 'bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <FaCheck className="w-4 h-4 ml-auto text-green-500" />
                  )}
                </button>
              ))}
            </div>

            {/* User Info */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Anonymous User</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Local Session</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <FaShieldAlt className="w-4 h-4 text-green-500" />
                <span>Data stored locally</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 min-h-[400px]">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaPalette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Appearance
                </h2>

                <div className="space-y-8">
                  {/* Theme */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex-1 flex-col gap-3 p-6 border-2 ${theme === 'light'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                          }`}
                      >
                        <FaSun className="w-8 h-8 text-yellow-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Light Mode</span>
                        {theme === 'light' && (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex-1 flex-col gap-3 p-6 border-2 ${theme === 'dark'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                          }`}
                      >
                        <FaMoon className="w-8 h-8 text-indigo-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
                        {theme === 'dark' && (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaFont className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Text Size
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {fontSizeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFontSize(option.value)}
                          className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-4 border text-center ${fontSize === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800'
                            } ${option.size}`}
                        >
                          <div className="font-medium mb-1">{option.label}</div>
                          <div className="text-sm text-gray-500">Aa</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility Tab */}
            {activeTab === 'accessibility' && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaUniversalAccess className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Accessibility Features
                </h2>

                <div className="space-y-6">
                  {/* Reduce Motion */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <FaEye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Reduce Motion</h3>
                        <p className="text-gray-600 dark:text-gray-300">Minimize animations and movement</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setReduceMotion(!reduceMotion)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${reduceMotion ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${reduceMotion ? 'translate-x-9' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Dyslexia Font */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <FaFont className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Dyslexia Friendly Font</h3>
                        <p className="text-gray-600 dark:text-gray-300">Use a font designed for better readability</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDyslexiaFont(!dyslexiaFont)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${dyslexiaFont ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${dyslexiaFont ? 'translate-x-9' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FaMoon className="w-6 h-6 text-gray-800 dark:text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">High Contrast</h3>
                        <p className="text-gray-600 dark:text-gray-300">Increase contrast for better visibility</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-9' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Crisis Button Size */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Crisis Button Size</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['small', 'normal', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setCrisisButtonSize(size)}
                          className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-4 border text-center ${crisisButtonSize === size
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-gray-900 dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                          <div className="font-medium capitalize mb-2">{size}</div>
                          <div className={`mx-auto rounded-lg bg-red-500 ${size === 'small' ? 'w-10 h-6' :
                            size === 'normal' ? 'w-16 h-8' :
                              'w-24 h-10'
                            }`}></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaLock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Privacy & Data
                </h2>

                <div className="space-y-8">
                  {/* Privacy Mode */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-transparent dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <FaLock className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Privacy Mode</h3>
                        <p className="text-gray-600 dark:text-gray-300">Hide sensitive content from screen (Mock)</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPrivacyMode(!privacyMode)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${privacyMode ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${privacyMode ? 'translate-x-9' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  {/* Data Management */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manage Your Data</h3>
                    <div className="space-y-4">
                      <button
                        onClick={exportData}
                        className="inline-flex items-center justify-between font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer w-full p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <FaDownload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900 dark:text-white">Export Your Data</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Download JSON backup</p>
                          </div>
                        </div>
                        <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </button>

                      <button
                        onClick={clearAllData}
                        className="inline-flex items-center justify-between font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer w-full p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300 dark:hover:border-red-500 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <FaTrash className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900 dark:text-white">Clear All Data</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete everything</p>
                          </div>
                        </div>
                        <div className="text-red-600 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}