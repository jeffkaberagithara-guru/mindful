import { useState } from 'react';
import TherapistCard from '../components/TherapistCard.jsx';
import TherapistFilter from '../components/TherapistFilter.jsx';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaStar, FaVideo, FaUserCheck } from 'react-icons/fa';

export default function FindTherapist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialties: [],
    insurance: [],
    approaches: [],
    priceRange: [0, 300],
    virtualOnly: false,
    acceptsInsurance: false,
    newClients: true,
    search: ''
  });

  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      credentials: 'PhD, LCSW',
      specialties: ['Anxiety', 'Depression', 'Trauma', 'Stress'],
      location: 'New York, NY',
      acceptsInsurance: true,
      virtualAvailable: true,
      rating: 4.8,
      price: 150,
      languages: ['English', 'Spanish'],
      bio: 'Specialized in cognitive behavioral therapy with 12+ years of experience helping clients overcome anxiety and depression.',
      approaches: ['Cognitive Behavioral Therapy (CBT)', 'Mindfulness-Based Therapy', 'Trauma-Informed Therapy'],
      photoUrl: null
    },
    {
      id: 2,
      name: 'Michael Chen',
      credentials: 'LMFT',
      specialties: ['Relationship Issues', 'Family Therapy', 'Couples Counseling'],
      location: 'Los Angeles, CA',
      acceptsInsurance: true,
      virtualAvailable: true,
      rating: 4.6,
      price: 120,
      languages: ['English', 'Mandarin'],
      bio: 'Focused on family systems and relationship counseling with a compassionate, culturally-sensitive approach.',
      approaches: ['Family Systems Therapy', 'Humanistic Therapy', 'Gottman Method'],
      photoUrl: null
    },
    {
      id: 3,
      name: 'Dr. Maya Patel',
      credentials: 'PsyD, Clinical Psychologist',
      specialties: ['PTSD', 'Trauma', 'Anxiety', 'LGBTQ+'],
      location: 'Chicago, IL',
      acceptsInsurance: false,
      virtualAvailable: true,
      rating: 4.9,
      price: 180,
      languages: ['English', 'Hindi', 'Gujarati'],
      bio: 'Trauma-informed therapist specializing in PTSD and LGBTQ+ mental health with 8+ years of experience.',
      approaches: ['EMDR', 'Trauma-Informed Therapy', 'Acceptance and Commitment Therapy (ACT)'],
      photoUrl: null
    },
    {
      id: 4,
      name: 'James Wilson',
      credentials: 'LCSW-R',
      specialties: ['Addiction', 'Depression', 'Life Transitions'],
      location: 'Remote Only',
      acceptsInsurance: true,
      virtualAvailable: true,
      rating: 4.7,
      price: 135,
      languages: ['English'],
      bio: 'Specializing in addiction recovery and life transition support with a holistic approach to wellness.',
      approaches: ['Motivational Interviewing', 'Cognitive Behavioral Therapy (CBT)', 'Mindfulness'],
      photoUrl: null
    },
    {
      id: 5,
      name: 'Dr. Elena Rodriguez',
      credentials: 'PhD, Clinical Psychologist',
      specialties: ['Eating Disorders', 'Body Image', 'Anxiety'],
      location: 'Miami, FL',
      acceptsInsurance: true,
      virtualAvailable: false,
      rating: 4.8,
      price: 160,
      languages: ['English', 'Spanish'],
      bio: 'Eating disorder specialist with 15+ years experience in evidence-based treatment approaches.',
      approaches: ['Cognitive Behavioral Therapy (CBT)', 'Dialectical Behavior Therapy (DBT)', 'Family-Based Therapy'],
      photoUrl: null
    },
    {
      id: 6,
      name: 'Alex Morgan',
      credentials: 'LMHC, Art Therapist',
      specialties: ['Trauma', 'Children & Teens', 'Creative Arts'],
      location: 'Portland, OR',
      acceptsInsurance: false,
      virtualAvailable: true,
      rating: 4.5,
      price: 110,
      languages: ['English'],
      bio: 'Creative arts therapist specializing in trauma work with children and adolescents.',
      approaches: ['Art Therapy', 'Play Therapy', 'Trauma-Focused CBT'],
      photoUrl: null
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      specialties: [],
      insurance: [],
      approaches: [],
      priceRange: [0, 300],
      virtualOnly: false,
      acceptsInsurance: false,
      newClients: true,
      search: ''
    });
  };

  const filteredTherapists = therapists.filter(therapist => {
    // Search filter
    if (filters.search && !therapist.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !therapist.specialties.some(s => s.toLowerCase().includes(filters.search.toLowerCase()))) {
      return false;
    }

    // Specialties filter
    if (filters.specialties.length > 0 && !filters.specialties.some(s => therapist.specialties.includes(s))) {
      return false;
    }

    // Virtual only filter
    if (filters.virtualOnly && !therapist.virtualAvailable) {
      return false;
    }

    // Insurance filter
    if (filters.acceptsInsurance && !therapist.acceptsInsurance) {
      return false;
    }

    // Price filter
    if (therapist.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Therapist</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with licensed mental health professionals who understand your needs.
              Start your healing journey today.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange('search', e.target.value);
                  }}
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent md:pr-40"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="mt-4 w-full md:mt-0 md:absolute md:right-3 md:top-1/2 md:transform md:-translate-y-1/2 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaFilter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">{therapists.length}+</div>
                <div className="text-sm text-gray-600">Verified Therapists</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Booking Available</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Confidential</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-pink-600">50+</div>
                <div className="text-sm text-gray-600">Specialties Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <TherapistFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />

              {/* Quick Tips */}
              <div className="mt-8 p-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaUserCheck className="w-5 h-5 text-blue-600" />
                  Finding the Right Fit
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Look for therapists with expertise in your specific concerns</li>
                  <li>• Consider virtual vs in-person preferences</li>
                  <li>• Check insurance acceptance if needed</li>
                  <li>• Read therapist bios and approach styles</li>
                  <li>• Don't hesitate to schedule a consultation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Therapist Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Therapists
                </h2>
                <p className="text-gray-600">
                  {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''} match your criteria
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Multiple locations</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <FaVideo className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">Virtual available</span>
                </div>
              </div>
            </div>

            {/* Therapists Grid */}
            <div className="space-y-6">
              {filteredTherapists.length > 0 ? (
                filteredTherapists.map(therapist => (
                  <TherapistCard
                    key={therapist.id}
                    therapist={therapist}
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <FaSearch className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No therapists match your filters
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria or clear filters to see all available therapists.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* How It Works */}
            <div className="mt-16 pt-12 border-t">
              <h3 className="text-2xl font-bold text-center mb-10">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Browse & Filter</h4>
                  <p className="text-gray-600">Find therapists by specialty, location, insurance, and approach.</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">View Profiles</h4>
                  <p className="text-gray-600">Read detailed bios, credentials, and therapeutic approaches.</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center text-2xl font-bold text-pink-600">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Book Session</h4>
                  <p className="text-gray-600">Schedule a consultation or regular sessions directly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}