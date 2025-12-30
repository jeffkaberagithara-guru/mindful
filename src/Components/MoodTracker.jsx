import { useState } from 'react';
import { FaSmile, FaMeh, FaFrown, FaSadTear, FaAngry } from 'react-icons/fa';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MoodTracker() {
  // Using the hook - just like useState, but persists to localStorage
  const [moodHistory, setMoodHistory] = useLocalStorage('moodHistory', []);
  const [todayMood, setTodayMood] = useState(null);
  const [note, setNote] = useState('');

  const moodOptions = [
    { id: 5, emoji: '😊', label: 'Great', icon: <FaSmile className="w-8 h-8" />, color: 'bg-green-100 text-green-700' },
    { id: 4, emoji: '🙂', label: 'Good', icon: <FaSmile className="w-8 h-8" />, color: 'bg-blue-100 text-blue-700' },
    { id: 3, emoji: '😐', label: 'Okay', icon: <FaMeh className="w-8 h-8" />, color: 'bg-yellow-100 text-yellow-700' },
    { id: 2, emoji: '😔', label: 'Not Great', icon: <FaFrown className="w-8 h-8" />, color: 'bg-orange-100 text-orange-700' },
    { id: 1, emoji: '😞', label: 'Struggling', icon: <FaSadTear className="w-8 h-8" />, color: 'bg-red-100 text-red-700' },
  ];

  const saveTodayMood = () => {
    if (!todayMood) return;

    const newEntry = {
      id: Date.now(),
      mood: todayMood,
      note: note.trim(),
      date: new Date().toISOString(),
    };

    // Update localStorage through our hook
    setMoodHistory([newEntry, ...moodHistory]);

    // Reset form
    setTodayMood(null);
    setNote('');
    
    alert('Mood saved! It will be remembered even if you close the browser.');
  };

  const clearHistory = () => {
    if (window.confirm('Clear all mood history?')) {
      setMoodHistory([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Daily Mood Tracker</h2>
      
      {/* Mood Selection */}
      <div className="mb-8">
        <p className="mb-4 text-gray-700">How are you feeling today?</p>
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setTodayMood(mood)}
              className={`p-4 rounded-lg flex flex-col items-center transition-all ${
                todayMood?.id === mood.id
                  ? `${mood.color} border-2 border-current scale-105`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Note Input */}
      <div className="mb-6">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any notes about your day (optional)..."
          className="w-full p-3 border rounded-lg"
          rows="3"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveTodayMood}
        disabled={!todayMood}
        className={`w-full py-3 rounded-lg font-medium mb-6 ${
          todayMood
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Save Today's Mood
      </button>

      {/* History Section */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Mood History</h3>
          {moodHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          )}
        </div>

        {moodHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No mood entries yet.</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {moodHistory.map((entry) => {
              const mood = moodOptions.find(m => m.id === entry.mood.id) || moodOptions[2];
              return (
                <div key={entry.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{mood.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium">{mood.label}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-600">{entry.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Privacy Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
        <p><strong>Privacy Note:</strong> All data is stored locally on your device. 
        It never leaves your browser and is not sent to any server.</p>
      </div>
    </div>
  );
}