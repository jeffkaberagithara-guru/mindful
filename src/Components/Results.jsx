import { FaChartLine, FaHandsHelping, FaBook, FaUserMd, FaArrowRight, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Results({ score, assessmentType, assessmentHistory, onRestart, onSwitchType }) {
  const getSeverity = (score, type) => {
    if (type === 'depression') {
      if (score <= 4) return { level: 'Minimal', color: 'bg-green-100 text-green-700 border-green-200' };
      if (score <= 9) return { level: 'Mild', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      if (score <= 14) return { level: 'Moderate', color: 'bg-orange-100 text-orange-700 border-orange-200' };
      if (score <= 19) return { level: 'Moderately Severe', color: 'bg-red-100 text-red-700 border-red-200' };
      return { level: 'Severe', color: 'bg-red-200 text-red-800 border-red-300' };
    } else {
      if (score <= 4) return { level: 'Minimal', color: 'bg-green-100 text-green-700 border-green-200' };
      if (score <= 9) return { level: 'Mild', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      if (score <= 14) return { level: 'Moderate', color: 'bg-orange-100 text-orange-700 border-orange-200' };
      return { level: 'Severe', color: 'bg-red-100 text-red-700 border-red-200' };
    }
  };

  const getRecommendations = (severity) => {
    switch (severity) {
      case 'Minimal':
        return {
          title: 'Wellness Focus',
          description: 'Your symptoms appear minimal. Focus on maintaining good mental health habits.',
          actions: [
            { icon: <FaBook />, text: 'Explore wellness articles', link: '/learn-more' },
            { icon: <FaChartLine />, text: 'Continue tracking moods', link: '/resources' },
            { icon: <FaHandsHelping />, text: 'Practice self-care routines', link: '/resources' }
          ],
          professional: 'Consider speaking with a therapist for preventative care'
        };
      case 'Mild':
        return {
          title: 'Support Recommended',
          description: 'You may benefit from additional support and self-care strategies.',
          actions: [
            { icon: <FaBook />, text: 'Learn coping strategies', link: '/learn-more' },
            { icon: <FaChartLine />, text: 'Monitor symptoms weekly', link: '/resources' },
            { icon: <FaHandsHelping />, text: 'Try guided mindfulness', link: '/resources' }
          ],
          professional: 'Consider consulting with a mental health professional'
        };
      case 'Moderate':
        return {
          title: 'Professional Support Suggested',
          description: 'Your symptoms suggest you may benefit from professional support.',
          actions: [
            { icon: <FaUserMd />, text: 'Find a therapist', link: '/find-therapist' },
            { icon: <FaBook />, text: 'Learn about treatment options', link: '/learn-more' },
            { icon: <FaHandsHelping />, text: 'Connect with support groups', link: '/resources' }
          ],
          professional: 'Schedule an appointment with a mental health professional'
        };
      case 'Moderately Severe':
        return {
          title: 'Professional Help Recommended',
          description: 'Your symptoms suggest significant distress that would benefit from professional care.',
          actions: [
            { icon: <FaUserMd />, text: 'Find immediate therapist', link: '/find-therapist' },
            { icon: <FaHandsHelping />, text: 'Access crisis resources', link: '/crisis' },
            { icon: <FaBook />, text: 'Learn about treatment urgency', link: '/learn-more' }
          ],
          professional: 'Contact a mental health professional as soon as possible'
        };
      case 'Severe':
        return {
          title: 'Immediate Support Needed',
          description: 'Your symptoms indicate significant distress requiring prompt attention.',
          actions: [
            { icon: <FaHandsHelping />, text: 'Access crisis support now', link: '/crisis' },
            { icon: <FaUserMd />, text: 'Contact mental health professional', link: '/find-therapist' },
            { icon: <FaBook />, text: 'Emergency preparedness', link: '/crisis' }
          ],
          professional: 'Seek immediate professional help or go to nearest emergency room'
        };
      default:
        return {
          title: 'Further Evaluation Needed',
          description: 'Please consult with a mental health professional for accurate assessment.',
          actions: [
            { icon: <FaUserMd />, text: 'Find a professional', link: '/find-therapist' },
            { icon: <FaBook />, text: 'Educational resources', link: '/learn-more' }
          ],
          professional: 'Consult with a mental health professional'
        };
    }
  };

  const getScoreRange = (type) => {
    if (type === 'depression') {
      return '0-27 (PHQ-9 scale)';
    } else {
      return '0-21 (GAD-7 scale)';
    }
  };

  const severity = getSeverity(score, assessmentType);
  const recommendations = getRecommendations(severity.level);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
          <FaChartLine className="w-5 h-5" />
          <span className="font-medium">Assessment Complete</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your {assessmentType === 'depression' ? 'Depression' : 'Anxiety'} Assessment Results
        </h2>
        <p className="text-gray-600">
          Based on the {assessmentType === 'depression' ? 'PHQ-9' : 'GAD-7'} screening tool
        </p>
      </div>

      {/* Score Display */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Score Circle */}
          <div className="relative">
            <div className="w-48 h-48 rounded-full border-8 flex items-center justify-center"
              style={{
                borderColor: severity.color.split(' ')[0].replace('bg-', ''),
                borderTopColor: 'transparent',
                transform: 'rotate(45deg)'
              }}
            >
              <div className="transform -rotate-45 text-center">
                <div className="text-5xl font-bold text-gray-900">{score}</div>
                <div className="text-sm text-gray-500 mt-2">Total Score</div>
                <div className="text-xs text-gray-400 mt-1">
                  Range: {getScoreRange(assessmentType)}
                </div>
              </div>
            </div>
          </div>

          {/* Severity Info */}
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg mb-4 ${severity.color} border`}>
              <div className="w-3 h-3 rounded-full bg-current"></div>
              <span className="font-bold text-lg">{severity.level} Symptoms</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">{recommendations.title}</h3>
            <p className="text-gray-700 mb-4">{recommendations.description}</p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-blue-800 font-medium">
                <FaUserMd className="inline-block w-4 h-4 mr-2" />
                {recommendations.professional}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.actions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="card p-5 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-3 text-blue-600">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {action.icon}
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {action.text}
                </h4>
              </div>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                Learn more
                <FaArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mb-10 space-y-6">
        <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• This is a screening tool, not a diagnosis</li>
            <li>• Only a qualified mental health professional can provide a diagnosis</li>
            <li>• Your results are confidential and stored only on your device</li>
            <li>• Symptoms can change over time - consider regular check-ins</li>
          </ul>
        </div>

        <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
          <h4 className="font-semibold text-red-800 mb-2">If You're in Crisis</h4>
          <p className="text-red-700 mb-3">
            If you're having thoughts of harming yourself or others, please seek immediate help:
          </p>
          <Link
            to="/crisis"
            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer gap-2 bg-red-600 text-white px-4 py-2 hover:bg-red-700 hover:scale-105 shadow-md"
          >
            <FaHandsHelping className="w-4 h-4" />
            Access Crisis Resources
          </Link>
        </div>
      </div>

      {/* Assessment History */}
      {assessmentHistory.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Assessment History</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600">Date</th>
                    <th className="text-left py-2 text-gray-600">Type</th>
                    <th className="text-left py-2 text-gray-600">Score</th>
                    <th className="text-left py-2 text-gray-600">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentHistory.slice(0, 5).map((assessment) => (
                    <tr key={assessment.id} className="border-b border-gray-100">
                      <td className="py-3">
                        {new Date(assessment.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 capitalize">{assessment.type}</td>
                      <td className="py-3 font-medium">{assessment.score}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSeverity(assessment.score, assessment.type).color}`}>
                          {getSeverity(assessment.score, assessment.type).level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex-1 gap-2 bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 px-6 py-3"
        >
          <FaRedo className="w-4 h-4" />
          Retake This Assessment
        </button>

        <button
          onClick={() => onSwitchType(assessmentType === 'depression' ? 'anxiety' : 'depression')}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex-1 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-300 px-6 py-3"
        >
          Take {assessmentType === 'depression' ? 'Anxiety' : 'Depression'} Assessment
        </button>

        <Link
          to="/find-therapist"
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex-1 gap-2 bg-green-600 text-white px-6 py-3 hover:bg-green-700 shadow-md hover:shadow-lg hover:scale-105"
        >
          <FaUserMd className="w-4 h-4" />
          Find a Therapist
        </Link>
      </div>

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
        <p>
          Based on {assessmentType === 'depression' ? 'PHQ-9 (Patient Health Questionnaire-9)' : 'GAD-7 (Generalized Anxiety Disorder-7)'} screening tools.
          These tools are not diagnostic instruments.
        </p>
      </div>
    </div>
  );
}