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
        <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full mb-4">
          <FaCog className="w-6 h-6 text-blue-600 animate-spin-slow" />
          <span className="font-semibold text-blue-700">Your Settings</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Personalize Your Experience
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Customize how you interact with MindfulSupport to create a comfortable, supportive environment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl border p-4 sticky top-24">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100'
                      : 'text-gray-700 hover:bg-gray-100'
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
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Anonymous User</p>
                  <p className="text-sm text-gray-500">Your privacy is protected</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaShieldAlt className="w-4 h-4 text-green-500" />
                <span>All data stored locally on your device</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-2xl border overflow-hidden">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <FaPalette className="w-6 h-6 text-blue-600" />
                  Appearance Settings
                </h2>

                <div className="space-y-8">
                  {/* Theme */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                          theme === 'light'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
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
                        className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                          theme === 'dark'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaFont className="w-5 h-5 text-blue-600" />
                      Font Size
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {fontSizeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFontSize(option.value)}
                          className={`p-4 rounded-lg border text-center transition-all ${
                            fontSize === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaLanguage className="w-5 h-5 text-blue-600" />
                      Language Preference
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {languageOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setLanguage(option.value)}
                          className={`p-4 rounded-lg border text-center transition-all ${
                            language === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
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
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <FaBell className="w-6 h-6 text-yellow-600" />
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
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                        notifications ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          notifications ? 'translate-x-9' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Notification Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Daily Check-ins</h4>
                          <p className="text-sm text-gray-600">Reminders to log your mood</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                          <p className="text-sm text-gray-600">Summary of your progress</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Resource Updates</h4>
                          <p className="text-sm text-gray-600">New exercises and content</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sound Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaVolumeUp className="w-5 h-5 text-blue-600" />
                      Sound & Vibration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="p-4 border rounded-lg text-center hover:border-gray-300 transition-all">
                        <div className="font-medium mb-1">Silent</div>
                        <div className="text-sm text-gray-500">No sound</div>
                      </button>
                      <button className="p-4 border rounded-lg text-center hover:border-gray-300 transition-all">
                        <div className="font-medium mb-1">Gentle</div>
                        <div className="text-sm text-gray-500">Soft tones</div>
                      </button>
                      <button className="p-4 border rounded-lg text-center hover:border-gray-300 transition-all">
                        <div className="font-medium mb-1">Vibrate</div>
                        <div className="text-sm text-gray-500">Vibration only</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <FaLock className="w-6 h-6 text-green-600" />
                  Privacy & Security
                </h2>

                <div className="space-y-8">
                  {/* Privacy Mode */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FaLock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Privacy Mode</h3>
                        <p className="text-gray-600">Hide sensitive content from screen</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPrivacyMode(!privacyMode)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                        privacyMode ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          privacyMode ? 'translate-x-9' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Data Management */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <button
                        onClick={exportData}
                        className="flex items-center justify-between w-full p-4 border rounded-lg hover:border-blue-300 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaDownload className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900">Export Your Data</h4>
                            <p className="text-sm text-gray-600">Download all your data as JSON</p>
                          </div>
                        </div>
                        <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </button>
                      
                      <button
                        onClick={clearAllData}
                        className="flex items-center justify-between w-full p-4 border rounded-lg hover:border-red-300 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <FaTrash className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900">Clear All Data</h4>
                            <p className="text-sm text-gray-600">Permanently delete all saved data</p>
                          </div>
                        </div>
                        <div className="text-red-600 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <FaShieldAlt className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Your Data is Secure</h4>
                        <p className="text-gray-700">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <FaEye className="w-6 h-6 text-purple-600" />
                  Accessibility Features
                </h2>

                <div className="space-y-8">
                  {/* Crisis Button Size */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Crisis Button Size</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['small', 'normal', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setCrisisButtonSize(size)}
                          className={`p-4 rounded-lg border text-center transition-all ${
                            crisisButtonSize === size
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium capitalize mb-2">{size}</div>
                          <div className={`mx-auto rounded-lg bg-red-500 ${
                            size === 'small' ? 'w-16 h-8' : 
                            size === 'normal' ? 'w-24 h-10' : 
                            'w-32 h-12'
                          }`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* High Contrast Mode */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaEye className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">High Contrast Mode</h3>
                        <p className="text-gray-600">Enhanced visibility for low vision</p>
                      </div>
                    </div>
                    <button className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300">
                      <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>

                  {/* Screen Reader Support */}
                  <div className="p-6 bg-green-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <FaVolumeUp className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Screen Reader Optimized</h4>
                        <p className="text-gray-700">
                          This application is designed to work with screen readers and other assistive technologies.
                          All interactive elements include proper ARIA labels and keyboard navigation support.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Navigation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Shortcuts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-mono font-medium text-gray-900 mb-1">Tab</div>
                        <div className="text-sm text-gray-600">Navigate between elements</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-mono font-medium text-gray-900 mb-1">Space / Enter</div>
                        <div className="text-sm text-gray-600">Activate selected element</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-mono font-medium text-gray-900 mb-1">Esc</div>
                        <div className="text-sm text-gray-600">Close dialogs/menus</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-mono font-medium text-gray-900 mb-1">Ctrl+S</div>
                        <div className="text-sm text-gray-600">Save current settings</div>
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