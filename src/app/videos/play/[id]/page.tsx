'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoPlay, IoPause, IoVolumeHigh, IoVolumeMute, IoExpand, IoArrowBack, IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

const VideoSinglePage = () => {
  const params = useParams()
  const router = useRouter()
  const videoId = params.id as string

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  // بيانات الفيديو (في الواقع بتكون جاية من API)
  const videoData = {
    id: videoId,
    title: 'Present Perfect Tense - Complete Guide',
    description: 'Learn when and how to use the present perfect tense with clear examples and practice exercises.',
    duration: '15:30',
    level: 'Intermediate',
    category: 'Grammar',
    instructor: 'Sarah Johnson',
    uploadDate: '2 weeks ago',
    views: '24K',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }

  // Transcript محاكاة
  const transcript = [
    { time: '0:00', text: 'Welcome to this lesson on the present perfect tense.' },
    { time: '0:15', text: 'Today we will learn when and how to use this important tense.' },
    { time: '1:30', text: 'The present perfect is formed with have/has + past participle.' },
    { time: '3:45', text: "Let's look at some examples to understand better." }
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleSave = () => {
    setIsSaved(!isSaved)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="bg-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <IoArrowBack className="w-5 h-5" />
              Back to Videos
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSave}
                className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
              >
                {isSaved ? (
                  <IoBookmark className="w-5 h-5 text-yellow-400" />
                ) : (
                  <IoBookmarkOutline className="w-5 h-5" />
                )}
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
          
          {/* Video Player - Main Content */}
          <div className="lg:col-span-3">
            
            {/* Video Container */}
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={videoData.youtubeUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-gray-800 rounded-lg p-6 mt-4">
              <h1 className="text-2xl font-bold text-white mb-2">{videoData.title}</h1>
              
              <div className="flex items-center gap-4 text-gray-300 mb-4">
                <span>{videoData.views} views</span>
                <span>•</span>
                <span>{videoData.uploadDate}</span>
                <span>•</span>
                <span className="bg-blue-600 px-2 py-1 rounded text-sm">{videoData.level}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SJ</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{videoData.instructor}</div>
                  <div className="text-gray-400">English Teacher</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{videoData.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <IoBookmark className="w-4 h-4" />
                  Add Notes
                </button>
                <Link 
                  href={`/videos/transcript/${videoId}`}
                  className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View Transcript
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Transcript Preview */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Transcript</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {transcript.map((item, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-blue-400 font-mono">{item.time}</span>
                    <span className="text-gray-300 ml-2">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Videos */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Up Next</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors">
                    <div className="w-16 h-12 bg-gray-600 rounded flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium line-clamp-2">
                        Related Video {item}
                      </div>
                      <div className="text-gray-400 text-xs">Sarah Johnson • 12K views</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Resources */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm p-2 hover:bg-gray-700 rounded transition-colors">
                  📝 Practice Exercises (PDF)
                </button>
                <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm p-2 hover:bg-gray-700 rounded transition-colors">
                  📚 Vocabulary List
                </button>
                <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm p-2 hover:bg-gray-700 rounded transition-colors">
                  🎧 Audio Version
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-gray-800 rounded-lg p-6 mx-4 mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Practice What You Learned</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href={`/grammar/lessons/related-to-${videoId}`}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              <div className="font-semibold">Grammar Quiz</div>
              <div className="text-sm opacity-90">Test your understanding</div>
            </Link>
            
            <Link 
              href={`/vocabulary/practice/related-to-${videoId}`}
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              <div className="font-semibold">Vocabulary Practice</div>
              <div className="text-sm opacity-90">Learn key words</div>
            </Link>
            
            <Link 
              href={`/speaking`}
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              <div className="font-semibold">Speaking Exercise</div>
              <div className="text-sm opacity-90">Practice pronunciation</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoSinglePage