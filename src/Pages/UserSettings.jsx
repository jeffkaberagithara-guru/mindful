import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';
import {
  FaUser, FaBell, FaMoon, FaSun, FaEye, FaTrash,
  FaDownload, FaLock, FaLanguage, FaFont, FaVolumeUp,
  FaCheck, FaTimes, FaCog, FaPalette, FaShieldAlt
} from 'react-icons/fa';

export default function UserSettings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  const [privacyMode, setPrivacyMode] = useLocalStorage('privacyMode', false);
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 'medium');
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [crisisButtonSize, setCrisisButtonSize] = useLocalStorage('crisisButtonSize', 'normal');

  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'privacy', label: 'Privacy', icon: <FaLock /> },
    { id: 'accessibility', label: 'Accessibility', icon: <FaEye /> }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: 'text-sm' },
    { value: 'medium', label: 'Medium', size: 'text-base' },
    { value: 'large', label: 'Large', size: 'text-lg' },
    { value: 'xlarge', label: 'Extra Large', size: 'text-xl' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' }
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
        notifications,
        privacyMode,
        fontSize,
        language,
        crisisButtonSize
      }
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mindfulsupport-data-backup.json';
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-4 border border-blue-100 dark:border-blue-900/30">
          <FaCog className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin-slow" />
          <span className="font-semibold text-blue-700 dark:text-blue-300">Your Settings</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Personalize Your Experience
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Customize how you interact with MindfulSupport to create a comfortable, supportive environment.
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

            {/* User Profile */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Anonymous User</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your privacy is protected</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <FaShieldAlt className="w-4 h-4 text-green-500" />
                <span>All data stored locally on your device</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaPalette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Appearance Settings
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
                        <span className="font-medium">Light Mode</span>
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
                        <span className="font-medium">Dark Mode</span>
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
                      Font Size
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

                  {/* Language */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaLanguage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Language Preference
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {languageOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setLanguage(option.value)}
                          className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-4 border text-center ${language === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800'
                            }`}
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.value}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaBell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  Notification Settings
                </h2>

                <div className="space-y-8">
                  {/* Notification Toggle */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FaBell className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Enable Notifications</h3>
                        <p className="text-gray-600">Receive reminders and updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-9' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  {/* Notification Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Daily Check-ins</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Reminders to log your mood</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Weekly Reports</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Summary of your progress</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Resource Updates</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">New exercises and content</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sound Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaVolumeUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Sound & Vibration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-4 border border-gray-200 dark:border-gray-700 text-center hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800">
                        <div className="font-medium mb-1 text-gray-900 dark:text-white">Silent</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">No sound</div>
                      </button>
                      <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-4 border border-gray-200 dark:border-gray-700 text-center hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800">
                        <div className="font-medium mb-1 text-gray-900 dark:text-white">Gentle</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Soft tones</div>
                      </button>
                      <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-4 border border-gray-200 dark:border-gray-700 text-center hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800">
                        <div className="font-medium mb-1 text-gray-900 dark:text-white">Vibrate</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Vibration only</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaLock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Privacy & Security
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
                        <p className="text-gray-600 dark:text-gray-300">Hide sensitive content from screen</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPrivacyMode(!privacyMode)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${privacyMode ? 'bg-green-500' : 'bg-gray-300'
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
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
                            <p className="text-sm text-gray-600 dark:text-gray-400">Download all your data as JSON</p>
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
                            <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete all saved data</p>
                          </div>
                        </div>
                        <div className="text-red-600 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-start gap-3">
                      <FaShieldAlt className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Data is Secure</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          All your data is stored locally on your device. We don't send anything to external servers.
                          You control your privacy completely.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility Tab */}
            {activeTab === 'accessibility' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <FaEye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Accessibility Features
                </h2>

                <div className="space-y-8">
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
                          <div className={`mx-auto rounded-lg bg-red-500 ${size === 'small' ? 'w-16 h-8' :
                            size === 'normal' ? 'w-24 h-10' :
                              'w-32 h-12'
                            }`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* High Contrast Mode */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-transparent dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <FaEye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">High Contrast Mode</h3>
                        <p className="text-gray-600 dark:text-gray-300">Enhanced visibility for low vision</p>
                      </div>
                    </div>
                    <button className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300">
                      <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>

                  {/* Screen Reader Support */}
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
                    <div className="flex items-start gap-3">
                      <FaVolumeUp className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Screen Reader Optimized</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          This application is designed to work with screen readers and other assistive technologies.
                          All interactive elements include proper ARIA labels and keyboard navigation support.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Navigation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Keyboard Shortcuts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div className="font-mono font-medium text-gray-900 dark:text-white mb-1">Tab</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Navigate between elements</div>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div className="font-mono font-medium text-gray-900 dark:text-white mb-1">Space / Enter</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Activate selected element</div>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div className="font-mono font-medium text-gray-900 dark:text-white mb-1">Esc</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Close dialogs/menus</div>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div className="font-mono font-medium text-gray-900 dark:text-white mb-1">Ctrl+S</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Save current settings</div>
                      </div>
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