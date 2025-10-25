'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { IoPerson, IoMail, IoLockClosed, IoNotifications, IoBook, IoStatsChart, IoTime, IoCalendar, IoCheckmarkCircle, IoPencil } from 'react-icons/io5'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  // بيانات المستخدم
  const [userData, setUserData] = useState({
    name: 'Ahmed Mohamed',
    email: 'ahmed.mohamed@example.com',
    level: 'B1 Intermediate',
    joinDate: 'January 15, 2024',
    dailyGoal: 30,
    country: 'Egypt',
    bio: 'Passionate about learning English and improving my communication skills.'
  })

  const [formData, setFormData] = useState(userData)

  // الإحصائيات
  const userStats = {
    streak: 12,
    totalXp: 2450,
    lessonsCompleted: 42,
    wordsLearned: 156,
    speakingPractice: 28,
    accuracy: 85
  }

  // الإنجازات
  const achievements = [
    { id: 1, name: '7-Day Streak', earned: true, date: '2024-01-22' },
    { id: 2, name: 'Vocabulary Master', earned: true, date: '2024-01-20' },
    { id: 3, name: 'Grammar Guru', earned: false, date: null },
    { id: 4, name: 'Speaking Star', earned: true, date: '2024-01-18' },
    { id: 5, name: 'Listening Pro', earned: false, date: null },
    { id: 6, name: '30-Day Challenge', earned: false, date: null }
  ]

  // النشاط الأخير
  const recentActivity = [
    { id: 1, action: 'Completed Grammar Lesson', details: 'Past Perfect Tense', xp: 25, time: '2 hours ago' },
    { id: 2, action: 'Learned New Words', details: '10 vocabulary words', xp: 15, time: '5 hours ago' },
    { id: 3, action: 'Speaking Practice', details: 'Self Introduction', xp: 30, time: '1 day ago' },
    { id: 4, action: 'Level Assessment', details: 'Improved to B1', xp: 50, time: '2 days ago' }
  ]

  const handleSave = () => {
    setUserData(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(userData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and track your learning progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: 'profile', name: 'Profile', icon: IoPerson },
                  { id: 'progress', name: 'Progress', icon: IoStatsChart },
                  { id: 'achievements', name: 'Achievements', icon: IoBook },
                  { id: 'settings', name: 'Settings', icon: IoLockClosed },
                  { id: 'notifications', name: 'Notifications', icon: IoNotifications }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <IoPencil className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Profile Picture & Basic Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {userData.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{userData.name}</h3>
                        <p className="text-gray-600">{userData.level}</p>
                        <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{userStats.streak}</div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{userStats.totalXp}</div>
                        <div className="text-sm text-gray-600">Total XP</div>
                      </div>
                    </div>
                  </div>

                  {/* Editable Form */}
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option>Egypt</option>
                            <option>Saudi Arabia</option>
                            <option>UAE</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancel}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <p className="text-gray-900">{userData.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                          <p className="text-gray-900">{userData.bio}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <p className="text-gray-900">{userData.country}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Daily Goal</label>
                          <p className="text-gray-900">{userData.dailyGoal} minutes per day</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <IoBook className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{userStats.lessonsCompleted}</div>
                      <div className="text-sm text-gray-600">Lessons Completed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <IoStatsChart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{userStats.wordsLearned}</div>
                      <div className="text-sm text-gray-600">Words Learned</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <IoTime className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{userStats.speakingPractice}</div>
                      <div className="text-sm text-gray-600">Speaking Sessions</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.details}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-blue-600">+{activity.xp} XP</div>
                          <div className="text-sm text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg flex items-center gap-4 ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        {achievement.earned ? (
                          <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <IoBook className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                        {achievement.earned ? (
                          <p className="text-sm text-green-600">Earned on {achievement.date}</p>
                        ) : (
                          <p className="text-sm text-gray-500">Not yet earned</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Daily Learning Goal</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>15 minutes</option>
                          <option selected>30 minutes</option>
                          <option>45 minutes</option>
                          <option>60 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Adaptive (Recommended)</option>
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">Change Password</div>
                        <div className="text-sm text-gray-600">Update your account password</div>
                      </button>
                      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  {[
                    { name: 'Email Notifications', description: 'Receive updates about your progress and new features' },
                    { name: 'Push Notifications', description: 'Get reminders for daily practice' },
                    { name: 'Weekly Reports', description: 'Receive weekly progress summaries' },
                    { name: 'New Content Alerts', description: 'Get notified when new lessons are available' }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{setting.name}</div>
                        <div className="text-sm text-gray-600">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage