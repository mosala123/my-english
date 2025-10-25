'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { IoSearch, IoBookmark, IoBookmarkOutline, IoCheckmarkCircle, IoPlay, IoTime } from 'react-icons/io5'

const GrammarPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  // التصنيفات والمستويات
  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'a1', name: 'Beginner (A1)' },
    { id: 'a2', name: 'Elementary (A2)' },
    { id: 'b1', name: 'Intermediate (B1)' },
    { id: 'b2', name: 'Upper Intermediate (B2)' },
    { id: 'c1', name: 'Advanced (C1)' }
  ]

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'tenses', name: 'Tenses' },
    { id: 'verbs', name: 'Verbs' },
    { id: 'nouns', name: 'Nouns & Articles' },
    { id: 'adjectives', name: 'Adjectives & Adverbs' },
    { id: 'prepositions', name: 'Prepositions' },
    { id: 'conditionals', name: 'Conditionals' },
    { id: 'reported', name: 'Reported Speech' }
  ]

  // دروس القواعد
  const grammarLessons = [
    {
      id: 1,
      title: 'Present Simple Tense',
      description: 'Learn how to talk about habits, routines, and general truths',
      level: 'a1',
      category: 'tenses',
      duration: '15 min',
      points: 20,
      concepts: ['Formation', 'Uses', 'Time expressions'],
      examples: [
        'I work every day.',
        'She lives in London.',
        'The sun rises in the east.'
      ]
    },
    {
      id: 2,
      title: 'Present Continuous',
      description: 'Talk about actions happening now and temporary situations',
      level: 'a2',
      category: 'tenses',
      duration: '18 min',
      points: 25,
      concepts: ['Current actions', 'Temporary situations', 'Future arrangements'],
      examples: [
        'I am studying English now.',
        'They are staying with friends this week.',
        'She is meeting her boss tomorrow.'
      ]
    },
    {
      id: 3,
      title: 'Past Simple vs Present Perfect',
      description: 'Understand the difference between these commonly confused tenses',
      level: 'b1',
      category: 'tenses',
      duration: '25 min',
      points: 35,
      concepts: ['Finished time vs unfinished time', 'Specific vs general past'],
      examples: [
        'I visited Paris last year. (Past Simple)',
        'I have visited Paris three times. (Present Perfect)'
      ]
    },
    {
      id: 4,
      title: 'Conditional Sentences',
      description: 'Master if-clauses and their different types',
      level: 'b2',
      category: 'conditionals',
      duration: '30 min',
      points: 40,
      concepts: ['Zero Conditional', 'First Conditional', 'Second Conditional', 'Third Conditional'],
      examples: [
        'If it rains, we cancel the picnic. (Zero)',
        'If it rains, we will cancel the picnic. (First)',
        'If it rained, we would cancel the picnic. (Second)'
      ]
    },
    {
      id: 5,
      title: 'Reported Speech',
      description: 'Learn how to report what someone else said',
      level: 'b2',
      category: 'reported',
      duration: '28 min',
      points: 38,
      concepts: ['Tense changes', 'Pronoun changes', 'Time expressions'],
      examples: [
        'Direct: "I am happy." → Reported: He said he was happy.',
        'Direct: "We will come." → Reported: They said they would come.'
      ]
    },
    {
      id: 6,
      title: 'Modal Verbs',
      description: 'Master can, could, may, might, must, should, and would',
      level: 'b1',
      category: 'verbs',
      duration: '22 min',
      points: 30,
      concepts: ['Ability', 'Permission', 'Obligation', 'Possibility'],
      examples: [
        'I can speak English. (ability)',
        'You must wear a seatbelt. (obligation)',
        'It might rain later. (possibility)'
      ]
    }
  ]

  const toggleCompleteLesson = (lessonId: number) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const filteredLessons = grammarLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || lesson.level === selectedLevel
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLevelColor = (level: string) => {
    const colors = {
      a1: 'bg-green-100 text-green-800',
      a2: 'bg-blue-100 text-blue-800',
      b1: 'bg-yellow-100 text-yellow-800',
      b2: 'bg-orange-100 text-orange-800',
      c1: 'bg-purple-100 text-purple-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Grammar Lessons</h1>
              <p className="text-gray-600">Master English grammar from beginner to advanced</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {completedLessons.length}/{grammarLessons.length}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {Math.round((completedLessons.length / grammarLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedLessons.length / grammarLessons.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search grammar topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Level Filter */}
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel === level.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLessons.map(lesson => {
            const isCompleted = completedLessons.includes(lesson.id)
            
            return (
              <div key={lesson.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                
                {/* Lesson Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{lesson.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                        {lesson.level.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{lesson.description}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleCompleteLesson(lesson.id)}
                    className={`ml-4 p-2 rounded-lg transition-colors ${
                      isCompleted 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <IoCheckmarkCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Lesson Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IoTime className="w-4 h-4" />
                    {lesson.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{lesson.points} XP</span>
                  </div>
                </div>

                {/* Concepts Covered */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Concepts Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.concepts.map((concept, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                  <div className="space-y-1">
                    {lesson.examples.map((example, index) => (
                      <p key={index} className="text-sm text-gray-600 italic">
                        {example}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Link 
                    href={`/grammar/lessons/${lesson.id}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <IoPlay className="w-4 h-4" />
                    Start Lesson
                  </Link>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="capitalize">{categories.find(c => c.id === lesson.category)?.name}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
            <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedLevel('all')
                setSelectedCategory('all')
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grammar Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {levels.filter(level => level.id !== 'all').map(level => {
              const levelLessons = grammarLessons.filter(l => l.level === level.id)
              const completedLevelLessons = levelLessons.filter(l => completedLessons.includes(l.id))
              const progress = levelLessons.length > 0 ? (completedLevelLessons.length / levelLessons.length) * 100 : 0
              
              return (
                <div key={level.id} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {completedLevelLessons.length}/{levelLessons.length}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">{level.name}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getLevelColor(level.id).split(' ')[0]}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrammarPage