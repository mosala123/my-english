'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { IoSearch, IoPlay, IoTime, IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

const VideoPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [savedVideos, setSavedVideos] = useState<number[]>([])

  // التصنيفات والمستويات
  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ]

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'grammar', name: 'Grammar' },
    { id: 'vocabulary', name: 'Vocabulary' },
    { id: 'pronunciation', name: 'Pronunciation' },
    { id: 'conversation', name: 'Conversation' },
    { id: 'business', name: 'Business English' },
    { id: 'travel', name: 'Travel English' }
  ]

  // فيديوهات الموقع
  const videos = [
    {
      id: 1,
      title: 'Present Perfect Tense - Complete Guide',
      description: 'Learn when and how to use the present perfect tense with clear examples and practice exercises.',
      thumbnail: '/thumbnails/present-perfect.jpg',
      duration: '15:30',
      level: 'intermediate',
      category: 'grammar',
      instructor: 'Sarah Johnson',
      views: '24K',
      uploadDate: '2 weeks ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: '50 Common Phrasal Verbs',
      description: 'Master the most frequently used phrasal verbs in everyday English conversations.',
      thumbnail: '/thumbnails/phrasal-verbs.jpg',
      duration: '22:15',
      level: 'intermediate',
      category: 'vocabulary',
      instructor: 'Mike Thompson',
      views: '18K',
      uploadDate: '1 month ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'British vs American Pronunciation',
      description: 'Learn the key differences between British and American English pronunciation.',
      thumbnail: '/thumbnails/pronunciation.jpg',
      duration: '18:45',
      level: 'beginner',
      category: 'pronunciation',
      instructor: 'Emma Wilson',
      views: '32K',
      uploadDate: '3 weeks ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Business Meeting Vocabulary',
      description: 'Essential words and phrases for participating confidently in business meetings.',
      thumbnail: '/thumbnails/business-meeting.jpg',
      duration: '25:10',
      level: 'advanced',
      category: 'business',
      instructor: 'David Chen',
      views: '12K',
      uploadDate: '2 months ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Airport and Travel English',
      description: 'Everything you need to know for smooth travel experiences in English-speaking countries.',
      thumbnail: '/thumbnails/travel-english.jpg',
      duration: '20:30',
      level: 'beginner',
      category: 'travel',
      instructor: 'Lisa Rodriguez',
      views: '28K',
      uploadDate: '1 week ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Advanced Conditionals',
      description: 'Go beyond the basics with mixed conditionals and advanced usage patterns.',
      thumbnail: '/thumbnails/conditionals.jpg',
      duration: '28:20',
      level: 'advanced',
      category: 'grammar',
      instructor: 'Professor James',
      views: '8K',
      uploadDate: '3 months ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 7,
      title: 'Everyday Conversation Practice',
      description: 'Practice real-life conversations with native speakers in various situations.',
      thumbnail: '/thumbnails/conversation.jpg',
      duration: '35:15',
      level: 'intermediate',
      category: 'conversation',
      instructor: 'Native English Team',
      views: '45K',
      uploadDate: '4 days ago',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 8,
      title: 'Idioms and Expressions',
      description: 'Learn common English idioms and expressions to sound more like a native speaker.',
      thumbnail: '/thumbnails/idioms.jpg',
      duration: '19:50',
      level: 'intermediate',
      category: 'vocabulary',
      instructor: 'Sarah Johnson',
      views: '22K',
      uploadDate: '2 weeks ago',
      youtubeId: 'dQw4w9WgXcQ'
    }
  ]

  const toggleSaveVideo = (videoId: number) => {
    setSavedVideos(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    )
  }

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || video.level === selectedLevel
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-purple-100 text-purple-800'
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Lessons</h1>
              <p className="text-gray-600">Learn English through engaging video content</p>
            </div>
            <Link 
              href="/videos/saved"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <IoBookmark className="w-5 h-5" />
              Saved Videos ({savedVideos.length})
            </Link>
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
                  placeholder="Search video lessons..."
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map(video => {
            const isSaved = savedVideos.includes(video.id)
            
            return (
              <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  {/* Thumbnail Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-2">{video.title.split(' ')[0]}</div>
                      <div className="text-sm opacity-90">Video Lesson</div>
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  
                  {/* Play Button */}
                  <Link 
                    href={`/videos/play/${video.id}`}
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center group"
                  >
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                      <IoPlay className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </Link>

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveVideo(video.id)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-colors"
                  >
                    {isSaved ? (
                      <IoBookmark className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <IoBookmarkOutline className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {video.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                      {video.level}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {video.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{video.instructor}</span>
                    <div className="flex items-center gap-4">
                      <span>{video.views} views</span>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                    <Link 
                      href={`/videos/play/${video.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-1"
                    >
                      <IoPlay className="w-4 h-4" />
                      Watch
                    </Link>
                    <Link 
                      href={`/videos/transcript/${video.id}`}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                    >
                      Transcript
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
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

        {/* Video Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Library Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{videos.length}</div>
              <div className="text-gray-600">Total Videos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {videos.filter(v => v.level === 'beginner').length}
              </div>
              <div className="text-gray-600">Beginner Videos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {videos.filter(v => v.level === 'advanced').length}
              </div>
              <div className="text-gray-600">Advanced Videos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round(videos.reduce((acc, video) => {
                  const [min, sec] = video.duration.split(':').map(Number)
                  return acc + min + sec/60
                }, 0))}
              </div>
              <div className="text-gray-600">Total Hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPage