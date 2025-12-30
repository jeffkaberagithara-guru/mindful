import { useState, useCallback } from 'react';
import Question from './Question';
import Results from './Results';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FaClipboardCheck, FaChartLine } from 'react-icons/fa';

const depressionQuestions = [
  {
    id: 1,
    question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 2,
    question: "How often have you had little interest or pleasure in doing things?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 3,
    question: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 4,
    question: "How often have you felt tired or had little energy?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 5,
    question: "How often have you had poor appetite or overeaten?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  }
];

const anxietyQuestions = [
  {
    id: 6,
    question: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 7,
    question: "How often have you not been able to stop or control worrying?",
    type: 'frequency',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  }
];

export default function AssessmentTool() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentHistory, setAssessmentHistory] = useLocalStorage('assessmentHistory', []);
  const [assessmentType, setAssessmentType] = useState('depression'); // 'depression' or 'anxiety'

  const questions = assessmentType === 'depression' ? depressionQuestions : anxietyQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (questionId, answerValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerValue
    }));
  };

  // Wrap calculateScore in useCallback to prevent impure calls
  const calculateScore = useCallback(() => {
    return Object.values(answers).reduce((sum, value) => sum + (value || 0), 0);
  }, [answers]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Use a timestamp generator that only runs when needed
      const generateId = () => Date.now();
      
      const assessmentResult = {
        id: generateId(), // Call the function here
        type: assessmentType,
        score: calculateScore(),
        date: new Date().toISOString(),
        answers: { ...answers }
      };
      
      setAssessmentHistory([assessmentResult, ...assessmentHistory]);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const restartAssessment = (type = 'depression') => {
    setAssessmentType(type);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Results 
        score={calculateScore()}
        assessmentType={assessmentType}
        assessmentHistory={assessmentHistory}
        onRestart={() => restartAssessment(assessmentType)}
        onSwitchType={(type) => restartAssessment(type)}
      />
    );
  }

  return (
    <div className="card max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
          <FaClipboardCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {assessmentType === 'depression' ? 'Depression' : 'Anxiety'} Self-Assessment
          </h2>
          <p className="text-gray-600">PHQ-9 based screening tool</p>
        </div>
      </div>

      {/* Assessment Type Selector */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => restartAssessment('depression')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              assessmentType === 'depression'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Depression Assessment
          </button>
          <button
            onClick={() => restartAssessment('anxiety')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              assessmentType === 'anxiety'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Anxiety Assessment
          </button>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Disclaimer:</strong> This is not a diagnostic tool. It's a screening measure 
            to help identify symptoms that may indicate a need for professional evaluation.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      <Question 
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentQuestionIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          ← Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className={`px-6 py-3 rounded-lg font-medium ${
            !answers[currentQuestion.id]
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next →'}
        </button>
      </div>
    </div>
  );
}