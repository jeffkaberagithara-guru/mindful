import { FaHeartbeat, FaUserMd, FaBrain, FaHandsHelping } from 'react-icons/fa';
import ResourceCard from '../components/ResourceCard';
import MoodTracker from '../components/MoodTracker';

export default function Home() {
  const features = [
    {
      icon: <FaHeartbeat className="w-8 h-8" />,
      title: "Mood Check-in",
      description: "Track your emotional wellbeing with our gentle, daily check-in tool.",
      link: "/resources/mood-tracker",
      color: "blue"
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "Self-Assessment",
      description: "Anonymous screening tools to understand your mental health.",
      link: "/resources/assessment",
      color: "green"
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: "Find a Counselor",
      description: "Connect with licensed therapists in your area or online.",
      link: "/find-therapist",
      color: "purple"
    },
    {
      icon: <FaHandsHelping className="w-8 h-8" />,
      title: "Crisis Support",
      description: "Immediate, confidential support when you need it most.",
      link: "/crisis",
      color: "orange"
    }
  ];

  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-50 via-white to-calm-mist py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary-700">Free & Anonymous</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your mental health
              <span className="block text-primary-600">matters here</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              A safe, private space where you can find support without judgment or pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Check in with yourself
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                I need help now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find the Support You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our range of tools and resources designed to support your mental wellbeing journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ResourceCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Mood Tracker Section */}
      <section className="py-20 bg-linear-to-r from-primary-50/50 to-calm-mist/50">
        <div className="container mx-auto px-4">
          <MoodTracker />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10k+', label: 'People Helped' },
              { number: '24/7', label: 'Support Available' },
              { number: '100%', label: 'Anonymous' },
              { number: '50+', label: 'Expert Partners' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}