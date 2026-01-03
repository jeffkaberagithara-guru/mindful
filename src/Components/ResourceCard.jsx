import { Link } from 'react-router-dom';

export default function ResourceCard({ icon, title, description, link, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <Link to={link} className="block">
      <div className="card p-6 hover:scale-[1.02] transition-transform duration-300 h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md">
        <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4 bg-opacity-100 dark:bg-opacity-20`}>
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

        <div className="mt-auto">
          <span className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
            Learn More
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}