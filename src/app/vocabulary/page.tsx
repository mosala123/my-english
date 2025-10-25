'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { IoSearch, IoBookmark, IoBookmarkOutline, IoPlay, IoVolumeHigh } from 'react-icons/io5'

const VocabularyPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [savedWords, setSavedWords] = useState<number[]>([])

  // بيانات الكلمات
  const categories = [
    { id: 'all', name: 'All Words' },
    { id: 'beginner', name: 'Beginner (A1-A2)' },
    { id: 'intermediate', name: 'Intermediate (B1-B2)' },
    { id: 'advanced', name: 'Advanced (C1-C2)' },
    { id: 'business', name: 'Business English' },
    { id: 'travel', name: 'Travel & Tourism' }
  ]

  const words = [
    {
      id: 1,
      word: 'accommodate',
      definition: 'to provide with a place to live or to be stored in',
      example: 'The hotel can accommodate up to 500 guests.',
      pronunciation: '/əˈkɒm.ə.deɪt/',
      level: 'intermediate',
      category: 'business',
      synonyms: ['house', 'lodge', 'hold']
    },
    {
      id: 2,
      word: 'benevolent',
      definition: 'kind and helpful',
      example: 'She was a benevolent woman who volunteered at the shelter.',
      pronunciation: '/bəˈnev.əl.ənt/',
      level: 'advanced',
      category: 'all',
      synonyms: ['kind', 'compassionate', 'generous']
    },
    {
      id: 3,
      word: 'convenient',
      definition: 'suitable for your purposes and needs and causing the least difficulty',
      example: 'The grocery store is in a convenient location.',
      pronunciation: '/kənˈviː.ni.ənt/',
      level: 'beginner',
      category: 'all',
      synonyms: ['suitable', 'handy', 'appropriate']
    },
    {
      id: 4,
      word: 'diligent',
      definition: 'careful and using a lot of effort',
      example: 'She is a diligent student who always completes her homework.',
      pronunciation: '/ˈdɪl.ɪ.dʒənt/',
      level: 'intermediate',
      category: 'business',
      synonyms: ['hard-working', 'conscientious', 'meticulous']
    },
    {
      id: 5,
      word: 'ecstatic',
      definition: 'extremely happy',
      example: 'He was ecstatic when he heard the good news.',
      pronunciation: '/ekˈstæt.ɪk/',
      level: 'intermediate',
      category: 'all',
      synonyms: ['overjoyed', 'thrilled', 'elated']
    },
    {
      id: 6,
      word: 'fluctuate',
      definition: 'to change, especially continuously and between one level or thing and another',
      example: 'Vegetable prices fluctuate according to the season.',
      pronunciation: '/ˈflʌk.tʃu.eɪt/',
      level: 'advanced',
      category: 'business',
      synonyms: ['vary', 'change', 'shift']
    }
  ]

  const toggleSaveWord = (wordId: number) => {
    setSavedWords(prev =>
      prev.includes(wordId)
        ? prev.filter(id => id !== wordId)
        : [...prev, wordId]
    )
  }

  const playPronunciation = (word: string) => {
    // Simulate pronunciation playback
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory || word.level === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Vocabulary</h1>
              <p className="text-gray-600">Expand your English word power</p>
            </div>
            <Link 
              href="/vocabulary/saved"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <IoBookmark className="w-5 h-5" />
              Saved Words ({savedWords.length})
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search words or definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

        {/* Words Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map(word => {
            const isSaved = savedWords.includes(word.id)
            
            return (
              <div key={word.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                
                {/* Word Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{word.word}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm">{word.pronunciation}</span>
                      <button
                        onClick={() => playPronunciation(word.word)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <IoVolumeHigh className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveWord(word.id)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {isSaved ? (
                      <IoBookmark className="w-6 h-6 text-yellow-500" />
                    ) : (
                      <IoBookmarkOutline className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Definition */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">{word.definition}</p>
                  <p className="text-sm text-gray-600 italic">
                    "{word.example}"
                  </p>
                </div>

                {/* Level Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    word.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    word.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {word.level}
                  </span>
                  
                  {/* Practice Button */}
                  <Link 
                    href={`/vocabulary/practice/${word.id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <IoPlay className="w-4 h-4" />
                    Practice
                  </Link>
                </div>

                {/* Synonyms */}
                {word.synonyms && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Synonyms:</p>
                    <div className="flex flex-wrap gap-2">
                      {word.synonyms.map((synonym, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredWords.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No words found</h3>
            <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{words.length}</div>
              <div className="text-gray-600">Total Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{savedWords.length}</div>
              <div className="text-gray-600">Saved Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {words.filter(w => w.level === 'beginner').length}
              </div>
              <div className="text-gray-600">Beginner Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {words.filter(w => w.level === 'advanced').length}
              </div>
              <div className="text-gray-600">Advanced Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabularyPage