import { useState } from 'react';
import { FaPhoneAlt, FaComment, FaTimes } from 'react-icons/fa';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-[min(28rem,calc(100vw-2rem))] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Need Help Now?</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">You're not alone. Help is available 24/7.</p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="p-6">
          <div className="space-y-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className={`p-4 rounded-xl ${resource.color} bg-opacity-10 dark:bg-opacity-20 border border-opacity-20 dark:border-opacity-30`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${resource.color} rounded-lg text-white shadow-sm`}>
                    <resource.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{resource.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone}`}
                          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 gap-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm"
                        >
                          <FaPhoneAlt className="w-4 h-4" />
                          Call {resource.phone}
                        </a>
                      )}
                      {resource.text && (
                        <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 gap-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
                          {resource.text}
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Available {resource.hours}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Local Resources Note */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Important:</strong> If you're in immediate danger, please call your local emergency services.
              In the US and Canada, that's 911.
            </p>
          </div>

          {/* Additional Help */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Other Ways to Get Help</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Go to the nearest hospital emergency room</li>
              <li>• Contact a trusted friend or family member</li>
              <li>• Reach out to your therapist or doctor</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-6 rounded-b-2xl">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            All services are free, confidential, and available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CrisisButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 bg-linear-to-r from-red-500 to-orange-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl focus:ring-red-300"
        aria-label="Emergency help"
      >
        <FaPhoneAlt className="w-6 h-6" />
        <span className="sr-only">Emergency Help</span>
      </button>

      <CrisisModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}