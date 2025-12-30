import { useState } from 'react';
import { FaPhoneAlt, FaComment, FaTimes } from 'react-icons/fa';

function CrisisModal({ isOpen, onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl max-w-[min(28rem,calc(100vw-2rem))] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Need Help Now?</h2>
              <p className="text-gray-600 mt-2">You're not alone. Help is available 24/7.</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
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
              <div key={index} className={`p-4 rounded-xl ${resource.color} bg-opacity-10 border border-opacity-20`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${resource.color} rounded-lg text-white`}>
                    <resource.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone}`}
                          className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          <FaPhoneAlt className="w-4 h-4" />
                          Call {resource.phone}
                        </a>
                      )}
                      {resource.text && (
                        <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                          {resource.text}
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Available {resource.hours}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Local Resources Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> If you're in immediate danger, please call your local emergency services.
              In the US and Canada, that's 911.
            </p>
          </div>

          {/* Additional Help */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">Other Ways to Get Help</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Go to the nearest hospital emergency room</li>
              <li>• Contact a trusted friend or family member</li>
              <li>• Reach out to your therapist or doctor</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl">
          <p className="text-sm text-gray-500 text-center">
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
        className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-red-500 to-orange-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label="Emergency help"
      >
        <FaPhoneAlt className="w-6 h-6" />
        <span className="sr-only">Emergency Help</span>
      </button>

      <CrisisModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}