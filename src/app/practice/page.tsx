'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { IoPlay, IoTime, IoStatsChart, IoBook, IoMic, IoHeadset, IoCheckmarkCircle, IoArrowForward } from 'react-icons/io5'

const PracticePage = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  // فئات التمارين
  const categories = [
    { id: 'all', name: 'All Practice', icon: IoPlay },
    { id: 'speaking', name: 'Speaking', icon: IoMic },
    { id: 'listening', name: 'Listening', icon: IoHeadset },
    { id: 'vocabulary', name: 'Vocabulary', icon: IoBook },
    { id: 'grammar', name: 'Grammar', icon: IoStatsChart }
  ]

  // التمارين
  const practiceExercises = [
    {
      id: 1,
      title: 'Daily Conversation Practice',
      description: 'Practice real-life conversations with AI feedback on pronunciation and fluency',
      category: 'speaking',
      duration: '10-15 min',
      difficulty: 'Beginner',
      completed: true,
      xp: 25,
      participants: '2.4K'
    },
    {
      id: 2,
      title: 'Vocabulary Builder Challenge',
      description: 'Learn and practice 20 new words with interactive flashcards and quizzes',
      category: 'vocabulary',
      duration: '8-12 min',
      difficulty: 'All Levels',
      completed: true,
      xp: 20,
      participants: '3.1K'
    },
    {
      id: 3,
      title: 'Grammar in Context',
      description: 'Apply grammar rules in real sentences with instant correction',
      category: 'grammar',
      duration: '15-20 min',
      difficulty: 'Intermediate',
      completed: false,
      xp: 30,
      participants: '1.8K'
    },
    {
      id: 4,
      title: 'Listening Comprehension',
      description: 'Improve your listening skills with authentic conversations and comprehension questions',
      category: 'listening',
      duration: '12-18 min',
      difficulty: 'Intermediate',
      completed: false,
      xp: 28,
      participants: '2.2K'
    },
    {
      id: 5,
      title: 'Pronunciation Workshop',
      description: 'Master difficult English sounds with voice recognition and feedback',
      category: 'speaking',
      duration: '10 min',
      difficulty: 'All Levels',
      completed: false,
      xp: 22,
      participants: '1.5K'
    },
    {
      id: 6,
      title: 'Business English Scenarios',
      description: 'Role-play common business situations like meetings and presentations',
      category: 'speaking',
      duration: '20-25 min',
      difficulty: 'Advanced',
      completed: false,
      xp: 35,
      participants: '890'
    },
    {
      id: 7,
      title: 'Phrasal Verbs Mastery',
      description: 'Learn and practice the most common phrasal verbs in context',
      category: 'vocabulary',
      duration: '15 min',
      difficulty: 'Intermediate',
      completed: false,
      xp: 25,
      participants: '2.7K'
    },
    {
      id: 8,
      title: 'Accent Training',
      description: 'Reduce your accent and sound more like a native speaker',
      category: 'speaking',
      duration: '18-22 min',
      difficulty: 'Advanced',
      completed: false,
      xp: 32,
      participants: '1.2K'
    }
  ]

  // التمارين الموصى بيها
  const recommendedExercises = [
    {
      id: 101,
      title: 'Quick Pronunciation Check',
      description: '2-minute voice assessment',
      category: 'speaking',
      xp: 10
    },
    {
      id: 102,
      title: 'Vocabulary Sprint',
      description: '5 new words in 5 minutes',
      category: 'vocabulary',
      xp: 15
    },
    {
      id: 103,
      title: 'Grammar Quick Fix',
      description: 'Common mistakes review',
      category: 'grammar',
      xp: 12
    }
  ]

  const filteredExercises = practiceExercises.filter(exercise => 
    activeCategory === 'all' || exercise.category === activeCategory
  )

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'All Levels': 'bg-blue-100 text-blue-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-purple-100 text-purple-800'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'speaking': 'bg-red-50 border-red-200',
      'listening': 'bg-blue-50 border-blue-200',
      'vocabulary': 'bg-green-50 border-green-200',
      'grammar': 'bg-purple-50 border-purple-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-50 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Center</h1>
          <p className="text-gray-600">Sharpen your English skills with interactive exercises and real-time feedback</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Practice Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Exercises Completed</span>
                  <span className="font-bold text-gray-900">12/45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '26%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total XP Earned</span>
                  <span className="font-bold text-gray-900">285</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-gray-900">7 days</span>
                </div>
              </div>
            </div>

            {/* Recommended Exercises */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Practice</h3>
              <div className="space-y-3">
                {recommendedExercises.map((exercise) => (
                  <Link
                    key={exercise.id}
                    href={`/practice/exercise/${exercise.id}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">
                          {exercise.title}
                        </div>
                        <div className="text-sm text-gray-600">{exercise.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600">+{exercise.xp} XP</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Practice Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">💡 Practice Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Practice daily, even for 10 minutes</li>
                <li>• Focus on your weak areas</li>
                <li>• Use the feedback to improve</li>
                <li>• Don't be afraid to make mistakes</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Category Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Exercises Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExercises.map((exercise) => (
                <div 
                  key={exercise.id}
                  className={`bg-white rounded-xl shadow-sm border-2 hover:shadow-md transition-all hover:scale-105 ${getCategoryColor(exercise.category)}`}
                >
                  <div className="p-6">
                    
                    {/* Exercise Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {exercise.completed && (
                            <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
                          )}
                          <h3 className="font-bold text-gray-900 text-lg">{exercise.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
                      </div>
                    </div>

                    {/* Exercise Details */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <IoTime className="w-4 h-4" />
                          {exercise.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">+{exercise.xp} XP</div>
                        <div className="text-xs text-gray-500">{exercise.participants} learners</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/practice/exercise/${exercise.id}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      {exercise.completed ? 'Practice Again' : 'Start Exercise'}
                      <IoArrowForward className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredExercises.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoStatsChart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
                <p className="text-gray-600 mb-4">Try selecting a different category</p>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Show all exercises
                </button>
              </div>
            )}

            {/* Practice Challenge */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 mt-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">7-Day Practice Challenge</h3>
                  <p className="text-purple-100">Complete one exercise daily for 7 days and earn bonus rewards!</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">3/7</div>
                    <div className="text-purple-200 text-sm">Days Completed</div>
                  </div>
                  <Link
                    href="/practice/challenge"
                    className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Join Challenge
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage