import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaPhoneAlt, FaComment, FaTimes } from 'react-icons/fa';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

export function CrisisModal({ isOpen, onClose }) {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      text: 'TEXT 988',
      description: 'Free, confidential support 24/7',
      hours: '24/7',
      icon: FaPhoneAlt,
      color: 'bg-blue-500'
    },
    {
      name: 'Crisis Text Line',
      phone: null,
      text: 'HOME to 741741',
      description: 'Free, 24/7 text support',
      hours: '24/7',
      icon: FaComment,
      color: 'bg-green-500'
    },
    {
      name: 'The Trevor Project (LGBTQ+)',
      phone: '1-866-488-7386',
      text: 'START to 678678',
      description: 'Crisis intervention for LGBTQ youth',
      hours: '24/7',
      icon: FaPhoneAlt,
      color: 'bg-purple-500'
    },
    {
      name: 'Veterans Crisis Line',
      phone: '1-800-273-8255',
      text: '838255',
      description: 'Support for veterans and their families',
      hours: '24/7',
      icon: FaPhoneAlt,
      color: 'bg-red-500'
    }
  ];

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200 mt-12 sm:mt-0">

        {/* Close Button - Floats top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5 drop-shadow-md" />
        </button>

        {/* Header */}
        <div className="shrink-0 bg-linear-to-r from-red-600 to-orange-600 p-6 pt-8 pb-8 rounded-t-2xl z-10 text-white relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

          <h2 className="text-3xl font-bold flex items-center gap-3 relative z-10">
            <FaPhoneAlt className="w-6 h-6" />
            Help is Here
          </h2>
          <p className="text-red-50 mt-2 font-medium text-lg relative z-10">You are not alone. 24/7 Support.</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 overscroll-contain">
          <div className="space-y-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div className={`shrink-0 p-3 rounded-xl ${resource.color} bg-opacity-10 text-gray-900 dark:text-white`}>
                    <resource.icon className={`w-6 h-6 ${resource.color.replace('bg-', 'text-')}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{resource.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-4">{resource.description}</p>

                    <div className="flex flex-wrap gap-3">
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone}`}
                          className="flex-1 min-w-30 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                        >
                          <FaPhoneAlt className="w-4 h-4" />
                          <span className="text-lg whitespace-nowrap">{resource.phone}</span>
                        </a>
                      )}
                      {resource.text && (
                        <a
                          href={`sms:${resource.phone || ''}?body=${resource.text}`}
                          className="flex-1 min-w-30 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-[0.98] transition-all"
                        >
                          <FaComment className="w-4 h-4" />
                          <span className="whitespace-nowrap">{resource.text}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Immediate Danger?
            </h4>
            <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
              If you or someone else is in immediate danger, please call <strong>911</strong> (or your local emergency number) or go to the nearest emergency room immediately.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-700 text-center rounded-b-2xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Confidential • Free • Available 24/7
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function CrisisButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [crisisButtonSize] = useLocalStorage('crisisButtonSize', 'normal');

  const buttonSizes = {
    small: 'p-3',
    normal: 'p-4',
    large: 'p-5 scale-110'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    normal: 'w-6 h-6',
    large: 'w-7 h-7'
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/30 active:scale-95 cursor-pointer hover:scale-110 hover:-translate-y-1 bg-linear-to-r from-red-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-red-500/40 ${buttonSizes[crisisButtonSize] || buttonSizes.normal}`}
        aria-label="Emergency help"
      >
        <FaPhoneAlt className={iconSizes[crisisButtonSize] || iconSizes.normal} />
        <span className="sr-only">Emergency Help</span>
      </button>

      <CrisisModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}