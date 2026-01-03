import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBrain, FaHeartbeat, FaUsers, FaQuestionCircle, FaArrowRight, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

export default function LearnMore() {
  const [activeTab, setActiveTab] = useState('mental-health');

  const mentalHealthTopics = [
    {
      id: 'anxiety',
      title: 'Understanding Anxiety',
      icon: '😰',
      description: 'Learn about anxiety disorders, symptoms, and effective coping strategies.',
      color: 'from-blue-50 to-blue-100',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'depression',
      title: 'Managing Depression',
      icon: '😔',
      description: 'Information on depression symptoms, treatments, and recovery pathways.',
      color: 'from-purple-50 to-purple-100',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'stress',
      title: 'Stress Management',
      icon: '😓',
      description: 'Techniques to manage daily stress and build resilience.',
      color: 'from-orange-50 to-orange-100',
      badgeColor: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'self-care',
      title: 'Self-Care Practices',
      icon: '🧘',
      description: 'Essential self-care routines for mental and emotional wellbeing.',
      color: 'from-green-50 to-green-100',
      badgeColor: 'bg-green-100 text-green-700'
    }
  ];

  const resources = [
    {
      category: 'Articles',
      items: [
        { title: 'The Science of Mindfulness', readTime: '5 min', icon: <FaBrain /> },
        { title: 'Building Emotional Resilience', readTime: '8 min', icon: <FaHeartbeat /> },
        { title: 'Sleep & Mental Health Connection', readTime: '6 min', icon: <FaLightbulb /> }
      ]
    },
    {
      category: 'Guides',
      items: [
        { title: 'Anxiety First Aid Kit', readTime: '10 min', icon: <FaHandsHelping /> },
        { title: 'Depression Recovery Roadmap', readTime: '12 min', icon: <FaBook /> },
        { title: 'Building Support Networks', readTime: '7 min', icon: <FaUsers /> }
      ]
    }
  ];

  const faqs = [
    {
      question: 'What is mental health?',
      answer: 'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act.'
    },
    {
      question: 'When should I seek professional help?',
      answer: 'Consider seeking help when symptoms interfere with daily life, relationships, or work for more than two weeks.'
    },
    {
      question: 'Are therapy sessions confidential?',
      answer: 'Yes, therapy sessions are confidential. Therapists are bound by law to protect your privacy.'
    },
    {
      question: 'How do I know if therapy is working?',
      answer: 'Signs of progress include improved coping skills, better relationships, and reduced distressing symptoms.'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border dark:border-gray-700 transition-colors">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Educational Resources</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Mental Health
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                Education Hub
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Evidence-based information, resources, and guides to support your mental wellness journey.
              Knowledge is power in mental health.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#topics" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 px-6 py-3">
                <FaBook className="w-5 h-5 mr-2" />
                Explore Topics
              </a>
              <Link to="/resources" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 focus:ring-gray-300 px-6 py-3">
                <FaArrowRight className="w-5 h-5 mr-2" />
                All Resources
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30 bg-white dark:bg-gray-900 border-b dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {[
              { id: 'mental-health', label: 'Mental Health 101', icon: '🧠' },
              { id: 'conditions', label: 'Common Conditions', icon: '📋' },
              { id: 'treatments', label: 'Treatments', icon: '💊' },
              { id: 'self-help', label: 'Self-Help', icon: '🛠️' },
              { id: 'faq', label: 'FAQ', icon: '❓' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer gap-2 px-6 py-4 border-b-2 whitespace-nowrap ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-semibold'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Topics Grid */}
        <section id="topics" className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Essential Topics</h2>
              <p className="text-gray-600 dark:text-gray-400">Explore fundamental mental health concepts</p>
            </div>
            <Link to="/resources" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-2">
              View all topics
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentalHealthTopics.map((topic) => (
              <div
                key={topic.id}
                className={`bg-linear-to-br ${topic.color} dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{topic.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${topic.badgeColor} dark:bg-gray-600 dark:text-gray-200`}>
                    Learn More
                  </span>
                  <FaArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Featured Resources
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resources.map((category) => (
              <div key={category.category} className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    {category.category === 'Articles' ? <FaBook /> : <FaHandsHelping />}
                  </div>
                  {category.category}
                </h3>

                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.readTime} read</p>
                        </div>
                      </div>
                      <FaArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
            <FaQuestionCircle className="w-8 h-8 text-indigo-600" />
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-open:text-indigo-600 dark:group-open:text-indigo-400">
                      {faq.question}
                    </h3>
                    <span className="text-gray-400 group-open:hidden">+</span>
                    <span className="text-indigo-600 dark:text-indigo-400 hidden group-open:inline">−</span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
            <p className="text-lg opacity-90 mb-8">
              Access our complete library of mental health resources and educational materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/resources"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100"
              >
                Browse All Resources
              </Link>
              <Link
                to="/tools/assessment"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10"
              >
                Take Self-Assessment
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}