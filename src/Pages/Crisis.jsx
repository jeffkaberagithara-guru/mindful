import { FaPhone, FaComment, FaAmbulance, FaHospital, FaUserFriends, FaShieldAlt, FaClock, FaGlobe } from 'react-icons/fa';

export default function Crisis() {
  const emergencyResources = [
    {
      category: 'Immediate Crisis Lines',
      items: [
        {
          name: 'National Suicide Prevention Lifeline',
          number: '988',
          description: 'Free, confidential support 24/7',
          icon: <FaPhone className="w-6 h-6" />,
          color: 'bg-red-500',
          hours: '24/7',
          type: 'call'
        },
        {
          name: 'Crisis Text Line',
          number: 'Text HOME to 741741',
          description: 'Free 24/7 crisis counseling via text',
          icon: <FaComment className="w-6 h-6" />,
          color: 'bg-green-500',
          hours: '24/7',
          type: 'text'
        },
        {
          name: 'Trevor Project (LGBTQ+)',
          number: '1-866-488-7386',
          description: 'Crisis intervention for LGBTQ youth',
          icon: <FaUserFriends className="w-6 h-6" />,
          color: 'bg-purple-500',
          hours: '24/7',
          type: 'call'
        }
      ]
    },
    {
      category: 'Emergency Services',
      items: [
        {
          name: 'Local Emergency Services',
          number: '911',
          description: 'Police, Fire, Ambulance',
          icon: <FaAmbulance className="w-6 h-6" />,
          color: 'bg-blue-500',
          hours: '24/7',
          type: 'call'
        },
        {
          name: 'Emergency Room',
          number: 'Go to nearest hospital',
          description: 'Immediate medical attention',
          icon: <FaHospital className="w-6 h-6" />,
          color: 'bg-orange-500',
          hours: '24/7',
          type: 'location'
        }
      ]
    }
  ];

  const internationalHelplines = [
    { country: 'Canada', number: '1-833-456-4566', service: 'Crisis Services Canada' },
    { country: 'UK', number: '116 123', service: 'Samaritans' },
    { country: 'Australia', number: '13 11 14', service: 'Lifeline Australia' },
    { country: 'New Zealand', number: '0800 543 354', service: 'Lifeline Aotearoa' }
  ];

  const safetyPlanning = [
    { step: 1, title: 'Recognize Warning Signs', description: 'Identify personal triggers and early signs of crisis' },
    { step: 2, title: 'Use Coping Strategies', description: 'Practice grounding techniques and distraction methods' },
    { step: 3, title: 'Contact Support Network', description: 'Reach out to trusted friends, family, or professionals' },
    { step: 4, title: 'Make Environment Safe', description: 'Remove access to means of self-harm' },
    { step: 5, title: 'Seek Professional Help', description: 'Contact mental health professionals or crisis services' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 via-white to-blue-50 dark:from-red-950 dark:via-gray-900 dark:to-blue-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-red-500 via-orange-500 to-red-600 dark:from-red-800 dark:via-red-700 dark:to-red-900 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
              <span className="font-medium">Immediate Support Available</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              You Are Not Alone
              <span className="block">Help Is Here</span>
            </h1>

            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto text-white dark:text-gray-200">
              Immediate, confidential crisis support available 24/7. Your safety and wellbeing are our priority.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:988"
                className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 gap-3 px-8 py-4 bg-white text-red-600 shadow-2xl hover:bg-gray-100 text-lg mx-2"
              >
                <FaPhone className="w-6 h-6" />
                Call 988 Now
              </a>
              <a
                href="tel:911"
                className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 gap-3 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg mx-2"
              >
                <FaAmbulance className="w-6 h-6" />
                Emergency: 911
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Immediate Crisis Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These services are available 24/7 and are completely confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {emergencyResources.map((section) => (
              <div key={section.category}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <FaShieldAlt className="w-5 h-5 text-red-500" />
                  {section.category}
                </h3>

                <div className="space-y-4">
                  {section.items.map((resource, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 ${resource.color} rounded-lg text-white`}>
                            {resource.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {resource.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {resource.number}
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                  <FaClock className="w-4 h-4" />
                                  {resource.hours}
                                </span>
                                {resource.type === 'call' ? (
                                  <a
                                    href={`tel:${resource.number.replace(/\D/g, '')}`}
                                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/60"
                                  >
                                    Call Now
                                  </a>
                                ) : resource.type === 'text' ? (
                                  <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/60">
                                    Text Now
                                  </button>
                                ) : (
                                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                                    Find Location
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Safety Planning */}
          <div className="mb-16">
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 rounded-2xl p-8 border dark:border-gray-700 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Safety Planning Guide
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {safetyPlanning.map((plan) => (
                  <div
                    key={plan.step}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {plan.step}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{plan.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{plan.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* International Support */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaGlobe className="w-6 h-6 text-blue-500" />
              International Crisis Lines
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Country</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Helpline Number</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Service</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {internationalHelplines.map((line, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{line.country}</td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{line.number}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{line.service}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`tel:${line.number.replace(/\D/g, '')}`}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60"
                          >
                            <FaPhone className="w-4 h-4" />
                            Call
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="space-y-6">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl transition-colors">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ In Immediate Danger?</h4>
              <ul className="text-red-700 dark:text-red-200 space-y-2">
                <li>• Call your local emergency services immediately (911 in US/Canada)</li>
                <li>• Go to the nearest hospital emergency room</li>
                <li>• Do not hesitate to ask for help from people around you</li>
                <li>• Stay with someone you trust until help arrives</li>
              </ul>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl transition-colors">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">What to Expect When Calling</h4>
              <ul className="text-blue-700 dark:text-blue-200 space-y-2">
                <li>• A trained crisis counselor will answer your call</li>
                <li>• The conversation is completely confidential</li>
                <li>• You can remain anonymous if you prefer</li>
                <li>• Counselors are there to listen, not judge</li>
                <li>• They can help you develop a safety plan</li>
              </ul>
            </div>

            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Remember: Reaching out for help is a sign of strength, not weakness.
                You deserve support, and people care about your wellbeing.
              </p>
              <div className="text-4xl">💙</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}