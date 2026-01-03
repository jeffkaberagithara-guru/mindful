import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const specialtiesOptions = [
  'Anxiety', 'Depression', 'Trauma', 'Stress', 'Relationship Issues',
  'Grief', 'LGBTQ+', 'ADHD', 'OCD', 'Eating Disorders', 'Addiction',
  'PTSD', 'Bipolar Disorder', 'Autism', 'Personality Disorders'
];

const insuranceOptions = [
  'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare',
  'Medicare', 'Medicaid', 'Kaiser Permanente'
];

const approachOptions = [
  'Cognitive Behavioral Therapy (CBT)', 'Dialectical Behavior Therapy (DBT)',
  'Psychodynamic Therapy', 'Humanistic Therapy', 'Family Systems Therapy',
  'Mindfulness-Based Therapy', 'Trauma-Informed Therapy'
];

export default function TherapistFilter({ filters, onFilterChange, onClearFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFilterChange(category, newValues);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 bg-primary-600 text-white p-4 rounded-full shadow-xl"
      >
        <FaFilter className="w-6 h-6" />
      </button>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-[min(20rem,80vw)] bg-white dark:bg-gray-800 shadow-xl transition-colors">
            <div className="h-full overflow-y-auto">
              <FilterContent
                filters={filters}
                onFilterChange={onFilterChange}
                handleCheckboxChange={handleCheckboxChange} // ADD THIS
                onClose={() => setIsOpen(false)}
                onClearFilters={onClearFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64">
        <FilterContent
          filters={filters}
          onFilterChange={onFilterChange}
          handleCheckboxChange={handleCheckboxChange} // ADD THIS
          onClearFilters={onClearFilters}
        />
      </div>
    </>
  );
}

function FilterContent({ filters, onFilterChange, handleCheckboxChange, onClose, onClearFilters }) {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 300]);
  const [virtualOnly, setVirtualOnly] = useState(filters.virtualOnly || false);
  const [acceptsInsurance, setAcceptsInsurance] = useState(filters.acceptsInsurance || false);
  const [newClients, setNewClients] = useState(filters.newClients || false);

  const applyFilters = () => {
    onFilterChange('priceRange', priceRange);
    onFilterChange('virtualOnly', virtualOnly);
    onFilterChange('acceptsInsurance', acceptsInsurance);
    onFilterChange('newClients', newClients);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Therapists</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">${priceRange[0]}</span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Max: ${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={virtualOnly}
            onChange={(e) => setVirtualOnly(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-gray-700 dark:text-gray-300">Virtual Sessions Only</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptsInsurance}
            onChange={(e) => setAcceptsInsurance(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Accepts Insurance</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={newClients}
            onChange={(e) => setNewClients(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Accepting New Clients</span>
        </label>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Specialties</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {specialtiesOptions.map((specialty) => (
            <label key={specialty} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.specialties || []).includes(specialty)}
                onChange={() => handleCheckboxChange('specialties', specialty)} // NOW THIS WORKS
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Insurance */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Insurance</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {insuranceOptions.map((insurance) => (
            <label key={insurance} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.insurance || []).includes(insurance)}
                onChange={() => handleCheckboxChange('insurance', insurance)} // NOW THIS WORKS
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{insurance}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Approach */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Therapeutic Approach</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {approachOptions.map((approach) => (
            <label key={approach} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.approaches || []).includes(approach)}
                onChange={() => handleCheckboxChange('approaches', approach)} // NOW THIS WORKS
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{approach}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => {
            applyFilters();
            if (onClose) onClose();
          }}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer w-full bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 px-6 py-3"
        >
          Apply Filters
        </button>

        <button
          onClick={() => {
            onClearFilters();
            if (onClose) onClose();
          }}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 focus:ring-gray-300 px-6 py-3"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}