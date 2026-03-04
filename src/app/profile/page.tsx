// app/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  IoPerson,
  IoMail,
  IoCalendar,
  IoBarChart,
  IoCheckmarkCircle,
  IoArrowForward,
  IoTrophy,
  IoFlame,
  IoTime,
  IoBook,
  IoMic,
  IoStatsChart,
  IoLogOut,
  IoSettings,
  IoMedal,
  IoRocket,
  IoHappy,
  IoStar,
  IoWarning,
  IoImages,
  IoCamera,
  IoPencil,
  IoLockClosed,
  IoGlobe,
  IoHeadset,
  IoVideocam,
  IoDocumentText,
  IoChatbubbles,
  IoBusiness,
  IoSchool,
  IoGameController,
  IoMusicalNotes,
  IoFilm,
  IoHeart,
  IoShare,
  IoDownload,
  IoPrint,
  IoFlag,
  IoLocation,
  IoBriefcase,
  IoGitBranch
} from 'react-icons/io5'
import ProtectedRoute from '../../components/ProtectedRoute'

// صور من Unsplash للعرض
const coverImages = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80',
  'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200&q=80',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80',
  'https://images.unsplash.com/photo-1557682260-96773eb01377?w=1200&q=80'
]

const avatarImages = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108777-766d1c0a769d?w=200&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80'
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCover, setSelectedCover] = useState(0)
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [showImageSelector, setShowImageSelector] = useState<'cover' | 'avatar' | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    level: '',
    goal: '',
    bio: '',
    location: '',
    job: '',
    website: ''
  })

  useEffect(() => {
    // جلب بيانات المستخدم من localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setEditForm({
        name: parsed.name || 'مستخدم جديد',
        level: parsed.level || 'A1',
        goal: parsed.goal || 'تحسين المحادثة',
        bio: parsed.bio || 'متعلم شغوف باللغة الإنجليزية 🌟',
        location: parsed.location || 'القاهرة، مصر',
        job: parsed.job || 'طالب / محترف',
        website: parsed.website || 'https://englishmaster.com'
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      ...editForm,
      coverImage: coverImages[selectedCover],
      avatarImage: avatarImages[selectedAvatar]
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
    setShowImageSelector(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    )
  }

  // بيانات موسعة للعرض
  const stats = [
    { label: 'إجمالي التمارين', value: '247', icon: IoBook, color: 'text-blue-500', bg: 'bg-blue-50', change: '+12%' },
    { label: 'ساعات التعلم', value: '89h', icon: IoTime, color: 'text-amber-500', bg: 'bg-amber-50', change: '+5h' },
    { label: 'المستوى الحالي', value: user.level || 'B1', icon: IoBarChart, color: 'text-purple-500', bg: 'bg-purple-50', change: 'من A2' },
    { label: 'نقاط XP', value: '2,450', icon: IoFlame, color: 'text-orange-500', bg: 'bg-orange-50', change: '+350' },
    { label: 'أيام متتالية', value: '12', icon: IoHappy, color: 'text-green-500', bg: 'bg-green-50', change: '🔥' },
    { label: 'إنجازات', value: '8', icon: IoTrophy, color: 'text-yellow-500', bg: 'bg-yellow-50', change: '+2' }
  ]

  const achievements = [
    { title: 'أول تسجيل', icon: IoMic, unlocked: true, date: '2024-01-15', image: '🏆' },
    { title: '10 أيام متتالية', icon: IoFlame, unlocked: true, date: '2024-02-01', image: '🔥' },
    { title: '50 كلمة', icon: IoBook, unlocked: true, date: '2024-02-10', image: '📚' },
    { title: 'محادثة كاملة', icon: IoChatbubbles, unlocked: true, date: '2024-02-15', image: '💬' },
    { title: 'مقابلة عمل', icon: IoBusiness, unlocked: false, progress: 60, image: '💼' },
    { title: 'سفر للخارج', icon: IoGlobe, unlocked: false, progress: 30, image: '✈️' }
  ]

  const recentActivities = [
    { action: 'أكملت تمرين القواعد - المضارع البسيط', time: 'منذ ساعتين', xp: 50, type: 'grammar' },
    { action: 'تعلمت 10 كلمات جديدة - حزمة السفر', time: 'منذ 5 ساعات', xp: 30, type: 'vocabulary' },
    { action: 'سجلت محادثة - التعريف عن النفس', time: 'أمس', xp: 70, type: 'speaking' },
    { action: 'اجتزت اختبار المستوى A2', time: 'منذ يومين', xp: 100, type: 'test' },
    { action: 'شاهدت فيديو تعليمي', time: 'منذ 3 أيام', xp: 40, type: 'video' }
  ]

  const recommendedTasks = [
    {
      title: 'تمرين المحادثة',
      description: 'تحدث عن رحلتك المفضلة بالتفصيل',
      time: '3 دقائق',
      xp: 40,
      icon: IoMic,
      color: 'violet',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80'
    },
    {
      title: 'اختبار القواعد',
      description: 'المضارع التام - 10 أسئلة تفاعلية',
      time: '5 دقائق',
      xp: 60,
      icon: IoStatsChart,
      color: 'emerald',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80'
    },
    {
      title: 'كلمات جديدة',
      description: 'مصطلحات العمل والمقابلات',
      time: '4 دقائق',
      xp: 35,
      icon: IoBook,
      color: 'amber',
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&q=80'
    },
    {
      title: 'استماع',
      description: 'مقطع صوتي عن السفر مع أسئلة',
      time: '6 دقائق',
      xp: 50,
      icon: IoHeadset,
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80'
    }
  ]

  const skillLevels = [
    { skill: 'الاستماع', level: 75, color: 'blue', icon: IoHeadset },
    { skill: 'القراءة', level: 82, color: 'green', icon: IoDocumentText },
    { skill: 'المحادثة', level: 68, color: 'purple', icon: IoMic },
    { skill: 'الكتابة', level: 70, color: 'orange', icon: IoPencil },
    { skill: 'القواعد', level: 65, color: 'red', icon: IoStatsChart },
    { skill: 'المفردات', level: 78, color: 'indigo', icon: IoBook }
  ]

  const learningPaths = [
    {
      title: 'الإنجليزية للمبتدئين',
      progress: 100,
      lessons: 24,
      image: 'https://images.unsplash.com/photo-1503676260728-5176ea92c340?w=400&q=80',
      completed: true
    },
    {
      title: 'الإنجليزية للأعمال',
      progress: 65,
      lessons: 18,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
      completed: false
    },
    {
      title: 'محادثات متقدمة',
      progress: 30,
      lessons: 12,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
      completed: false
    }
  ]

  const badges = [
    { name: 'المبتدئ الذهبي', icon: '🥇', color: 'from-yellow-400 to-amber-500' },
    { name: 'المثابرة', icon: '🔥', color: 'from-orange-400 to-red-500' },
    { name: 'سريع التعلم', icon: '⚡', color: 'from-blue-400 to-cyan-500' },
    { name: 'المحادث الماهر', icon: '💬', color: 'from-purple-400 to-pink-500' }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        
        {/* صورة الغلاف - عرض كامل */}
        <div className="relative w-full h-80 overflow-hidden">
          <img 
            src={coverImages[selectedCover]} 
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* زر تغيير صورة الغلاف */}
          <button 
            onClick={() => setShowImageSelector('cover')}
            className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 border border-white/30"
          >
            <IoCamera className="w-5 h-5" />
            تغيير الصورة
          </button>

          {/* معلومات سريعة على الغلاف */}
          <div className="absolute bottom-4 right-4 flex gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white">
              <span className="text-sm opacity-90">المستوى</span>
              <div className="font-bold text-xl">{user.level}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white">
              <span className="text-sm opacity-90">XP</span>
              <div className="font-bold text-xl">2,450</div>
            </div>
          </div>
        </div>

        {/* محتوى البروفايل */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          
          {/* بطاقة البروفايل الرئيسية */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-sm bg-white/90">
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* الصورة الشخصية */}
              <div className="relative -mt-24">
                <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-2xl overflow-hidden">
                  <img 
                    src={avatarImages[selectedAvatar]} 
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={() => setShowImageSelector('avatar')}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-xl text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <IoCamera className="w-5 h-5" />
                </button>
              </div>

              {/* المعلومات الشخصية */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{editForm.name}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <IoLocation className="w-4 h-4" />
                        {editForm.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <IoBriefcase className="w-4 h-4" />
                        {editForm.job}
                      </span>
                      <span className="flex items-center gap-1">
                        <IoGlobe className="w-4 h-4" />
                        <a href={editForm.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                          الموقع الشخصي
                        </a>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <IoSettings className="w-4 h-4" />
                      تعديل الملف
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-red-50 text-red-600 px-6 py-2 rounded-xl hover:bg-red-100 transition-all flex items-center gap-2"
                    >
                      <IoLogOut className="w-4 h-4" />
                      تسجيل خروج
                    </button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 mt-4 text-lg leading-relaxed border-r-4 border-blue-500 pr-4">
                  {editForm.bio}
                </p>

                {/* الأهداف */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    🎯 الهدف: {editForm.goal}
                  </span>
                  <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                    📅 عضو منذ: {new Date(user.joinDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Selector Modal */}
          {showImageSelector && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6">
                <h3 className="text-xl font-bold mb-4">
                  اختر {showImageSelector === 'cover' ? 'صورة غلاف' : 'صورة شخصية'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {(showImageSelector === 'cover' ? coverImages : avatarImages).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => showImageSelector === 'cover' ? setSelectedCover(idx) : setSelectedAvatar(idx)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                        (showImageSelector === 'cover' ? selectedCover === idx : selectedAvatar === idx)
                          ? 'border-blue-500 scale-105' 
                          : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-32 object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowImageSelector(null)}
                    className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Profile Form */}
          {isEditing && (
            <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-blue-200">
              <h3 className="font-bold text-xl mb-4">تعديل الملف الشخصي</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المستوى</label>
                  <select
                    value={editForm.level}
                    onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="A1">A1 - مبتدئ</option>
                    <option value="A2">A2 - أساسي</option>
                    <option value="B1">B1 - متوسط</option>
                    <option value="B2">B2 - فوق المتوسط</option>
                    <option value="C1">C1 - متقدم</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الهدف</label>
                  <input
                    type="text"
                    value={editForm.goal}
                    onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوظيفة</label>
                  <input
                    type="text"
                    value={editForm.job}
                    onChange={(e) => setEditForm({ ...editForm, job: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الموقع الإلكتروني</label>
                  <input
                    type="url"
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">نبذة عني</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  حفظ التغييرات
                </button>
              </div>
            </div>
          )}

          {/* Stats Grid - عرض كامل */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  <div className="text-xs text-green-600 mt-1">{stat.change}</div>
                </div>
              )
            })}
          </div>

          {/* Main Content Grid - عرض كامل */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* القائمة الجانبية */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* الشارات */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <IoMedal className="w-5 h-5 text-yellow-500" />
                  الشارات
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, idx) => (
                    <div
                      key={idx}
                      className={`bg-gradient-to-br ${badge.color} p-4 rounded-xl text-white text-center transform hover:scale-105 transition-all`}
                    >
                      <span className="text-3xl mb-2 block">{badge.icon}</span>
                      <span className="text-xs font-bold">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* مستويات المهارات */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <IoBarChart className="w-5 h-5 text-purple-500" />
                  مستويات المهارات
                </h3>
                <div className="space-y-4">
                  {skillLevels.map((skill, idx) => {
                    const Icon = skill.icon
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Icon className={`w-4 h-4 text-${skill.color}-500`} />
                            {skill.skill}
                          </span>
                          <span className="text-sm font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-${skill.color}-500 rounded-full`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* الإحصائيات السريعة */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
                <h3 className="font-bold text-lg mb-4">تقدمك اليوم</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>التمارين المكتملة</span>
                    <span className="font-bold">12/15</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span>الوقت المستغرق</span>
                    <span className="font-bold">45 دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>النقاط اليوم</span>
                    <span className="font-bold">+350 XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* المحتوى الرئيسي */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tabs */}
              <div className="bg-white rounded-2xl p-2 shadow-lg flex flex-wrap gap-2">
                {['overview', 'achievements', 'tasks', 'paths', 'activity'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'overview' && 'نظرة عامة'}
                    {tab === 'achievements' && 'الإنجازات'}
                    {tab === 'tasks' && 'المهام'}
                    {tab === 'paths' && 'مسارات التعلم'}
                    {tab === 'activity' && 'النشاطات'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <>
                  {/* المهام المقترحة */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <IoRocket className="w-5 h-5 text-blue-500" />
                      مهام مقترحة لك
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedTasks.map((task, idx) => {
                        const Icon = task.icon
                        return (
                          <div
                            key={idx}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer hover:shadow-xl transition-all"
                          >
                            <img src={task.image} alt={task.title} className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 p-4 text-white">
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 bg-${task.color}-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold">{task.time}</span>
                              </div>
                              <h4 className="font-bold mb-1">{task.title}</h4>
                              <p className="text-sm text-white/80 mb-2">{task.description}</p>
                              <span className="text-amber-400 text-sm font-bold flex items-center gap-1">
                                <IoFlame className="w-4 h-4" />
                                +{task.xp} XP
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* النشاطات الأخيرة */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <IoTime className="w-5 h-5 text-amber-500" />
                      آخر النشاطات
                    </h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            activity.type === 'grammar' ? 'bg-purple-100 text-purple-600' :
                            activity.type === 'vocabulary' ? 'bg-green-100 text-green-600' :
                            activity.type === 'speaking' ? 'bg-blue-100 text-blue-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {activity.type === 'grammar' && <IoStatsChart className="w-5 h-5" />}
                            {activity.type === 'vocabulary' && <IoBook className="w-5 h-5" />}
                            {activity.type === 'speaking' && <IoMic className="w-5 h-5" />}
                            {activity.type === 'test' && <IoCheckmarkCircle className="w-5 h-5" />}
                            {activity.type === 'video' && <IoVideocam className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                          <span className="text-amber-600 font-bold flex items-center gap-1">
                            <IoFlame className="w-4 h-4" />
                            +{activity.xp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'achievements' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <IoTrophy className="w-5 h-5 text-yellow-500" />
                    إنجازاتي
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-2xl p-4 text-center border-2 transition-all ${
                          ach.unlocked ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50' : 'border-gray-200 opacity-50'
                        }`}
                      >
                        <span className="text-4xl mb-2 block">{ach.image}</span>
                        <h4 className="font-bold text-sm mb-1">{ach.title}</h4>
                        {ach.unlocked ? (
                          <p className="text-xs text-gray-500">{ach.date}</p>
                        ) : (
                          <div className="mt-2">
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${ach.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{ach.progress}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'paths' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <IoGitBranch className="w-5 h-5 text-green-500" />
                    مسارات التعلم
                  </h3>
                  <div className="space-y-4">
                    {learningPaths.map((path, idx) => (
                      <div key={idx} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all">
                        <img src={path.image} alt={path.title} className="w-24 h-24 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold">{path.title}</h4>
                            {path.completed && (
                              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold">
                                مكتمل ✓
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span>{path.lessons} درس</span>
                            <span>{path.progress}% مكتمل</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${path.completed ? 'bg-green-500' : 'bg-blue-500'} rounded-full`}
                              style={{ width: `${path.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <IoStatsChart className="w-5 h-5 text-blue-500" />
                    سجل النشاطات
                  </h3>
                  <div className="space-y-6">
                    {['هذا الأسبوع', 'الأسبوع الماضي', 'قبل أسبوعين'].map((period, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-sm text-gray-500 mb-3">{period}</h4>
                        <div className="space-y-3">
                          {recentActivities.slice(0, 2).map((activity, actIdx) => (
                            <div key={actIdx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <IoCheckmarkCircle className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.action}</p>
                                <p className="text-sm text-gray-500">{activity.time}</p>
                              </div>
                              <span className="text-amber-600 font-bold">+{activity.xp} XP</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action - عرض كامل */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden mb-5 pb-5">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black mb-2">واصل التقدم! 🚀</h3>
                <p className="text-blue-100">أنت على بعد تمرين واحد من تحقيق هدفك اليومي</p>
              </div>
              <Link
                href="/practice"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                ابدأ التمرين الآن
                <IoArrowForward className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
