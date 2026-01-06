import { FaHeartbeat, FaUserMd, FaBrain, FaHandsHelping } from 'react-icons/fa';
import ResourceCard from '../components/ResourceCard';
import MoodTracker from '../components/MoodTracker';

export default function Home() {
  const features = [
    {
      icon: <FaHeartbeat className="w-7 h-7" />,
      title: "Mood Check-in",
      description: "Track your emotional wellbeing with our gentle, daily check-in tool.",
      link: "/resources/mood-tracker",
      color: "blue"
    },
    {
      icon: <FaBrain className="w-7 h-7" />,
      title: "Self-Assessment",
      description: "Anonymous screening tools to understand your mental health.",
      link: "/resources/assessment",
      color: "green"
    },
    {
      icon: <FaUserMd className="w-7 h-7" />,
      title: "Find a Counselor",
      description: "Connect with licensed therapists in your area or online.",
      link: "/find-therapist",
      color: "purple"
    },
    {
      icon: <FaHandsHelping className="w-7 h-7" />,
      title: "Crisis Support",
      description: "Immediate, confidential support when you need it most.",
      link: "/crisis",
      color: "orange"
    }
  ];

  return (
    <div className="bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 md:py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Free & Anonymous</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your mental health
              <span className="block text-blue-600 dark:text-blue-400 mt-2">matters here</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              A safe, private space where you can find support without judgment or pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-[1.02] bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 text-base sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4">
                Check in with yourself
              </button>
              <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-[1.02] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:ring-gray-300 dark:focus:ring-gray-600 text-base sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4">
                I need help now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Find the Support You Need
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our range of tools and resources designed to support your mental wellbeing journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-linear-to-br ${feature.color === 'blue' ? 'from-blue-500 to-blue-600' : feature.color === 'green' ? 'from-green-500 to-green-600' : feature.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-orange-500 to-orange-600'} text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {feature.description}
                </p>
                <a 
                  href={feature.link}
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Tracker Section */}
      <section className="py-16 md:py-20 bg-linear-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How are you feeling today?</h2>
                  <p className="text-gray-600 dark:text-gray-300">Track your mood and see patterns over time</p>
                </div>
                <button className="mt-4 md:mt-0 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-linear-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg px-5 py-2.5 text-sm">
                  View History
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {['😢 Very Low', '😔 Low', '😐 Neutral', '🙂 Good', '😊 Great'].map((mood, index) => (
                  <button 
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    <span className="text-2xl mb-2">{mood.split(' ')[0]}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{mood.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your weekly mood trend</span>
                  <span className="text-xs text-gray-500">Last 7 days</span>
                </div>
                <div className="flex items-end h-32 gap-1">
                  {[30, 45, 60, 75, 65, 80, 90].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t-lg bg-linear-to-t from-blue-400 to-blue-500"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '10k+', label: 'People Helped' },
              { number: '24/7', label: 'Support Available' },
              { number: '100%', label: 'Anonymous' },
              { number: '50+', label: 'Expert Partners' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl p-8 md:p-10 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to start your wellness journey?
              </h2>
              <p className="text-blue-100 mb-8 text-base md:text-lg">
                Join thousands who have found support and understanding here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-[1.02] bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl text-base sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4">
                  Create Account
                </button>
                <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer hover:scale-[1.02] bg-transparent border-2 border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}