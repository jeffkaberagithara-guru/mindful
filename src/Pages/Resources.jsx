import { FaBook, FaVideo, FaHeadphones, FaFileAlt } from 'react-icons/fa';
import ResourceCard from '../components/ResourceCard';

export default function Resources() {
  const resources = [
    {
      icon: <FaBook className="w-8 h-8" />,
      title: "Educational Articles",
      description: "Learn about mental health conditions and coping strategies.",
      link: "/resources/articles",
      color: "blue"
    },
    {
      icon: <FaVideo className="w-8 h-8" />,
      title: "Guided Meditations",
      description: "Calm your mind with breathing exercises and mindfulness practices.",
      link: "/resources/meditations",
      color: "green"
    },
    {
      icon: <FaHeadphones className="w-8 h-8" />,
      title: "Podcasts & Audio",
      description: "Listen to expert discussions and personal stories.",
      link: "/resources/audio",
      color: "purple"
    },
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      title: "Worksheets & Guides",
      description: "Downloadable tools for self-reflection and growth.",
      link: "/resources/worksheets",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mental Health Resources</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Explore our collection of tools, articles, and guides to support your mental wellbeing journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>

          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
}