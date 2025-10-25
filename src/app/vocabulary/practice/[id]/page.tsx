'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { IoArrowBack, IoCheckmarkCircle, IoCloseCircle, IoVolumeHigh, IoRefresh } from 'react-icons/io5'

const PracticeSinglePage = () => {
  const params = useParams()
  const wordId = parseInt(params.id as string)
  
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])

  // بيانات الكلمة
  const words = [
    {
      id: 1,
      word: 'accommodate',
      definition: 'to provide with a place to live or to be stored in',
      example: 'The hotel can accommodate up to 500 guests.',
      pronunciation: '/əˈkɒm.ə.deɪt/',
      level: 'intermediate',
      synonyms: ['house', 'lodge', 'hold']
    },
    {
      id: 2,
      word: 'benevolent',
      definition: 'kind and helpful',
      example: 'She was a benevolent woman who volunteered at the shelter.',
      pronunciation: '/bəˈnev.əl.ənt/',
      level: 'advanced',
      synonyms: ['kind', 'compassionate', 'generous']
    },
    {
      id: 3,
      word: 'convenient',
      definition: 'suitable for your purposes and needs and causing the least difficulty',
      example: 'The grocery store is in a convenient location.',
      pronunciation: '/kənˈviː.ni.ənt/',
      level: 'beginner',
      synonyms: ['suitable', 'handy', 'appropriate']
    },
    {
      id: 4,
      word: 'diligent',
      definition: 'careful and using a lot of effort',
      example: 'She is a diligent student who always completes her homework.',
      pronunciation: '/ˈdɪl.ɪ.dʒənt/',
      level: 'intermediate',
      synonyms: ['hard-working', 'conscientious', 'meticulous']
    },
    {
      id: 5,
      word: 'ecstatic',
      definition: 'extremely happy',
      example: 'He was ecstatic when he heard the good news.',
      pronunciation: '/ekˈstæt.ɪk/',
      level: 'intermediate',
      synonyms: ['overjoyed', 'thrilled', 'elated']
    },
    {
      id: 6,
      word: 'fluctuate',
      definition: 'to change, especially continuously and between one level or thing and another',
      example: 'Vegetable prices fluctuate according to the season.',
      pronunciation: '/ˈflʌk.tʃu.eɪt/',
      level: 'advanced',
      synonyms: ['vary', 'change', 'shift']
    }
  ]

  const word = words.find(w => w.id === wordId)

  if (!word) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Word not found</h2>
          <Link href="/vocabulary" className="text-blue-600 hover:text-blue-700">
            Back to Vocabulary
          </Link>
        </div>
      </div>
    )
  }

  // التمارين
  const exercises = [
    {
      type: 'definition',
      question: `What does "${word.word}" mean?`,
      options: [
        word.definition,
        'To make something worse',
        'To refuse or reject',
        'To move quickly'
      ],
      correctAnswer: word.definition
    },
    {
      type: 'synonym',
      question: `Which word is a synonym of "${word.word}"?`,
      options: [
        word.synonyms[0],
        'angry',
        'confused',
        'tired'
      ],
      correctAnswer: word.synonyms[0]
    },
    {
      type: 'fill',
      question: 'Fill in the blank:',
      sentence: word.example.replace(word.word, '_____'),
      options: [
        word.word,
        'example',
        'different',
        'another'
      ],
      correctAnswer: word.word
    },
    {
      type: 'usage',
      question: `Which sentence uses "${word.word}" correctly?`,
      options: [
        word.example,
        `The ${word.word} is very tall.`,
        `I ${word.word} to the store yesterday.`,
        `She ${word.word} a beautiful song.`
      ],
      correctAnswer: word.example
    }
  ]

  const currentEx = exercises[currentExercise]

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(word.word)
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    setShowResult(true)
    
    if (answer === currentEx.correctAnswer) {
      setScore(prev => prev + 1)
      setCompletedExercises(prev => [...prev, currentExercise])
    }
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentExercise(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompletedExercises([])
  }

  const isLastExercise = currentExercise === exercises.length - 1
  const isCorrect = selectedAnswer === currentEx.correctAnswer

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/vocabulary"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <IoArrowBack className="w-5 h-5" />
            Back to Vocabulary
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{word.word}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-600">{word.pronunciation}</span>
                  <button
                    onClick={playPronunciation}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <IoVolumeHigh className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700 mb-2">{word.definition}</p>
                <p className="text-sm text-gray-600 italic">"{word.example}"</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                word.level === 'beginner' ? 'bg-green-100 text-green-800' :
                word.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {word.level}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Exercise {currentExercise + 1} of {exercises.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                Score: {score}/{exercises.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Exercise Card */}
        {!isLastExercise || !showResult ? (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {currentEx.type === 'definition' ? 'Definition' :
                 currentEx.type === 'synonym' ? 'Synonym' :
                 currentEx.type === 'fill' ? 'Fill in the Blank' :
                 'Usage'}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentEx.question}</h2>
              {currentEx.sentence && (
                <p className="text-lg text-gray-700 mb-4">"{currentEx.sentence}"</p>
              )}
            </div>

            <div className="space-y-3">
              {currentEx.options.map((option, index) => {
                const isSelected = selectedAnswer === option
                const isCorrectOption = option === currentEx.correctAnswer
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      !showResult
                        ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                        : isSelected && isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isSelected && !isCorrect
                        ? 'border-red-500 bg-red-50'
                        : isCorrectOption
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-medium">{option}</span>
                      {showResult && isSelected && (
                        isCorrect ? (
                          <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <IoCloseCircle className="w-6 h-6 text-red-600" />
                        )
                      )}
                      {showResult && !isSelected && isCorrectOption && (
                        <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '✓ Correct! Well done!' : '✗ Incorrect. Try to remember this.'}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-gray-700 mt-2">
                    The correct answer is: <strong>{currentEx.correctAnswer}</strong>
                  </p>
                )}
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {isLastExercise ? 'View Results' : 'Next Exercise'}
              </button>
            )}
          </div>
        ) : (
          // Results Screen
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                score >= exercises.length * 0.8 ? 'bg-green-100' :
                score >= exercises.length * 0.5 ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                <span className="text-4xl">
                  {score >= exercises.length * 0.8 ? '🎉' :
                   score >= exercises.length * 0.5 ? '👍' : '📚'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Complete!</h2>
              <p className="text-gray-600 mb-6">
                You scored {score} out of {exercises.length}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{exercises.length - score}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((score / exercises.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <IoRefresh className="w-5 h-5" />
                Practice Again
              </button>
              <Link
                href="/vocabulary"
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                Back to Vocabulary
              </Link>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-3">💡 Study Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Try to understand the word in context, not just memorize the definition</li>
            <li>• Create your own sentences using this word</li>
            <li>• Practice pronunciation multiple times</li>
            <li>• Review this word tomorrow and next week for better retention</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PracticeSinglePage