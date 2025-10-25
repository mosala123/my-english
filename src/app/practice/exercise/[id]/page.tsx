'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoArrowBack, IoTime, IoStar, IoVolumeHigh, IoCheckmarkCircle, IoCloseCircle, IoPlay, IoPause, IoRefresh } from 'react-icons/io5'

const ExercisePage = () => {
  const params = useParams()
  const router = useRouter()
  const exerciseId = params.id as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)

  // بيانات التمرين
  const exerciseData = {
    id: exerciseId,
    title: 'Daily Conversation Practice',
    type: 'speaking',
    level: 'Beginner',
    duration: '5-7 min',
    description: 'Practice common everyday conversations with instant feedback',
    totalQuestions: 5,
    xp: 25,
    questions: [
      {
        id: 1,
        type: 'speaking',
        question: 'Introduce yourself. Say your name, where you are from, and what you do.',
        audioUrl: '/audio/intro.mp3',
        correctAnswer: 'self_introduction',
        tips: ['Speak clearly and slowly', 'Use simple sentences', 'Practice common phrases']
      },
      {
        id: 2,
        type: 'listening',
        question: 'Listen to the conversation and answer: Where are they going?',
        audioUrl: '/audio/conversation1.mp3',
        options: ['To the cinema', 'To a restaurant', 'To the park', 'To the mall'],
        correctAnswer: 'To a restaurant',
        transcript: 'A: "I\'m hungry, let\'s get something to eat." B: "Good idea! There\'s a new Italian restaurant nearby."'
      },
      {
        id: 3,
        type: 'vocabulary',
        question: 'Choose the correct word to complete the sentence: "I need to _____ a hotel for my trip."',
        options: ['book', 'booking', 'booked', 'books'],
        correctAnswer: 'book',
        explanation: 'We use the base form of the verb after "to"'
      },
      {
        id: 4,
        type: 'speaking',
        question: 'Describe what you see in this picture. Talk about the people, place, and activities.',
        imageUrl: '/images/street-scene.jpg',
        correctAnswer: 'picture_description',
        tips: ['Start with the main subject', 'Describe from left to right', 'Use present continuous tense']
      },
      {
        id: 5,
        type: 'grammar',
        question: 'Choose the correct sentence:',
        options: [
          'She don\'t like coffee.',
          'She doesn\'t likes coffee.', 
          'She doesn\'t like coffee.',
          'She not like coffee.'
        ],
        correctAnswer: 'She doesn\'t like coffee.',
        explanation: 'With "she/he/it", we use "doesn\'t" + base verb'
      }
    ]
  }

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, showResults])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers, answer]
    setUserAnswers(newAnswers)

    // Check if answer is correct
    const currentQ = exerciseData.questions[currentQuestion]
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1)
    }

    if (currentQuestion < exerciseData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const playAudio = (url: string) => {
    // Simulate audio playback
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const restartExercise = () => {
    setCurrentQuestion(0)
    setUserAnswers([])
    setShowResults(false)
    setTimeLeft(300)
    setScore(0)
  }

  const currentQuestionData = exerciseData.questions[currentQuestion]

  if (showResults) {
    const percentage = (score / exerciseData.questions.length) * 100
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <IoArrowBack className="w-5 h-5" />
              Back to Practice
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            
            {/* Result Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {percentage >= 70 ? (
                <IoCheckmarkCircle className="w-10 h-10 text-green-600" />
              ) : (
                <IoCloseCircle className="w-10 h-10 text-red-600" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Exercise Complete!</h1>
            
            {/* Score Circle */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={percentage >= 70 ? "#10b981" : "#ef4444"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${percentage * 2.827} 282.7`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{score}/{exerciseData.questions.length}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
              </div>
            </div>

            {/* Performance Message */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {percentage >= 90 ? 'Excellent! 🎉' : 
                 percentage >= 70 ? 'Good Job! 👍' : 
                 'Keep Practicing! 💪'}
              </h3>
              <p className="text-gray-600">
                {percentage >= 90 ? 'You mastered this exercise!' :
                 percentage >= 70 ? 'You\'re making great progress!' :
                 'Practice makes perfect. Try again!'}
              </p>
            </div>

            {/* XP Earned */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <IoStar className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-blue-700">+{exerciseData.xp} XP Earned</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartExercise}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <IoRefresh className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href="/practice"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Back to Practice
              </Link>
              <Link
                href="/learn"
                className="flex items-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IoArrowBack className="w-5 h-5" />
            Back
          </button>

          {/* Timer */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <IoTime className="w-4 h-4 text-gray-600" />
            <span className="font-mono font-semibold text-gray-900">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {exerciseData.questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestion) / exerciseData.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion) / exerciseData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{exerciseData.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {exerciseData.level}
                </span>
                <span>•</span>
                <span>{exerciseData.type}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">XP</div>
              <div className="font-semibold text-blue-600">+{exerciseData.xp}</div>
            </div>
          </div>

          {/* Current Question */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestionData.question}
            </h2>

            {/* Audio Player */}
            {currentQuestionData.audioUrl && (
              <div className="mb-4">
                <button
                  onClick={() => playAudio(currentQuestionData.audioUrl!)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <IoPause className="w-4 h-4" /> : <IoPlay className="w-4 h-4" />}
                  <IoVolumeHigh className="w-4 h-4" />
                  {isPlaying ? 'Playing...' : 'Play Audio'}
                </button>
              </div>
            )}

            {/* Image */}
            {currentQuestionData.imageUrl && (
              <div className="mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Image: {currentQuestionData.question}</span>
                </div>
              </div>
            )}

            {/* Transcript */}
            {currentQuestionData.transcript && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Transcript:</h4>
                <p className="text-gray-700 italic">{currentQuestionData.transcript}</p>
              </div>
            )}

            {/* Multiple Choice Options */}
            {currentQuestionData.options && (
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Speaking Exercise */}
            {currentQuestionData.type === 'speaking' && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
                  <ul className="text-blue-800 space-y-1">
                    {currentQuestionData.tips?.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleAnswer(currentQuestionData.correctAnswer)}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  I've Finished Speaking
                </button>
              </div>
            )}
          </div>

          {/* Tips for all questions */}
          {currentQuestionData.explanation && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-1">💡 Remember:</h4>
              <p className="text-yellow-800 text-sm">{currentQuestionData.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-600">
            Click your answer to continue
          </div>

          <button
            onClick={() => handleAnswer('skip')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExercisePage