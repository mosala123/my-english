import React from 'react'
import Link from 'next/link'
import { IoStatsChart, IoTime, IoStar, IoBook, IoVideocam, IoMic, IoCheckmarkCircle } from 'react-icons/io5'

const LearnPage = () => {
  // بيانات افتراضية للمستخدم
  const userStats = {
    level: 'B1',
    progress: 65,
    streak: 12,
    xp: 2450,
    nextLevel: 'B2'
  }

  const dailyGoals = [
    { name: 'Vocabulary', target: 10, completed: 8, icon: IoBook },
    { name: 'Grammar', target: 3, completed: 2, icon: IoCheckmarkCircle },
    { name: 'Speaking', target: 5, completed: 5, icon: IoMic },
    { name: 'Listening', target: 15, completed: 10, icon: IoVideocam }
  ]

  const recommendedLessons = [
    {
      id: 1,
      title: 'Past Continuous Tense',
      description: 'Learn how to talk about ongoing past actions',
      duration: '15 min',
      level: 'B1',
      type: 'grammar',
      progress: 0
    },
    {
      id: 2,
      title: 'Business Vocabulary',
      description: 'Essential words for professional environments',
      duration: '20 min',
      level: 'B1',
      type: 'vocabulary',
      progress: 30
    },
    {
      id: 3,
      title: 'Pronunciation Practice',
      description: 'Improve your accent and clarity',
      duration: '10 min',
      level: 'B1',
      type: 'speaking',
      progress: 0
    }
  ]

  const recentAchievements = [
    { name: '7-Day Streak', icon: IoStar, date: 'Today', xp: 50 },
    { name: 'Vocabulary Master', icon: IoBook, date: '2 days ago', xp: 100 },
    { name: 'Perfect Pronunciation', icon: IoMic, date: '1 week ago', xp: 75 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Continue your English learning journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Stats & Progress */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-blue-600">Level {userStats.level}</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to {userStats.nextLevel}</span>
                  <span>{userStats.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${userStats.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <IoStatsChart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats.xp}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <IoTime className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <IoBook className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">42</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <IoStar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </div>
              </div>
            </div>

            {/* Daily Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyGoals.map((goal, index) => {
                  const Icon = goal.icon
                  const progress = (goal.completed / goal.target) * 100
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{goal.name}</h3>
                          <p className="text-sm text-gray-600">
                            {goal.completed}/{goal.target} completed
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recommended Lessons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
                <Link href="/lessons" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recommendedLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <IoTime className="w-4 h-4" />
                            {lesson.duration}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {lesson.level}
                          </span>
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/lessons/${lesson.id}`}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        {lesson.progress > 0 ? 'Continue' : 'Start'}
                      </Link>
                    </div>
                    
                    {lesson.progress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{lesson.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Achievements */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link 
                  href="/vocabulary" 
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <IoBook className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-gray-900">Vocabulary Practice</span>
                </Link>
                
                <Link 
                  href="/speaking" 
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <IoMic className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-gray-900">Speaking Exercise</span>
                </Link>
                
                <Link 
                  href="/videos" 
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <IoVideocam className="w-6 h-6 text-purple-600" />
                  <span className="font-medium text-gray-900">Video Lessons</span>
                </Link>
                
                <Link 
                  href="/assessment" 
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <IoStatsChart className="w-6 h-6 text-orange-600" />
                  <span className="font-medium text-gray-900">Level Test</span>
                </Link>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.date} • +{achievement.xp} XP</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Daily Tip */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <h3 className="font-semibold mb-2">💡 Daily Tip</h3>
              <p className="text-blue-100 text-sm">
                Practice speaking for 5 minutes every day. Consistency is more important than duration!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnPage