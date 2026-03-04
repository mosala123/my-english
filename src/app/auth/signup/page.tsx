// app/auth/signup/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  IoPerson,
  IoMail,
  IoLockClosed,
  IoArrowForward,
  IoEye,
  IoEyeOff,
  IoCheckmarkCircle,
  IoLogoGoogle,
  IoLogoGithub,
  IoLogoApple,
  IoGlobe,
  IoLocation,
  IoBriefcase,
  IoChatbubbles,
  IoFlag,
  IoPeople,
  IoTrophy,
  IoBook,
  IoMic,
  IoTime,
  IoRocket,
  IoHappy
} from 'react-icons/io5'

// صور من Unsplash
const backgroundImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80'
]

const featureImages = [
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
  'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80'
]

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [selectedBg, setSelectedBg] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: 'A1',
    goal: '',
    job: '',
    location: '',
    website: '',
    bio: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  // التحقق من صحة البريد الإلكتروني
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // التحقق من قوة كلمة المرور
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreeTerms) {
      alert('يجب الموافقة على الشروط والأحكام')
      return
    }

    // التحقق من المدخلات
    const newErrors = {
      name: !formData.name ? 'الاسم مطلوب' : '',
      email: !formData.email ? 'البريد الإلكتروني مطلوب' : 
             !validateEmail(formData.email) ? 'البريد الإلكتروني غير صحيح' : '',
      password: !formData.password ? 'كلمة المرور مطلوبة' :
                formData.password.length < 8 ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error)) {
      return
    }

    setIsLoading(true)

    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      joinDate: new Date().toISOString(),
      level: formData.level || 'A1',
      goal: formData.goal || 'تحسين المحادثة',
      bio: formData.bio || 'متعلم جديد في رحلة تعلم الإنجليزية 🌟',
      location: formData.location || 'القاهرة، مصر',
      job: formData.job || 'طالب',
      website: formData.website || 'https://englishmaster.com',
      stats: {
        totalExercises: 0,
        totalHours: 0,
        bestSkill: 'لم يتم تحديد بعد',
        xp: 0
      }
    }

    localStorage.setItem('user', JSON.stringify(userData))
    setIsLoading(false)
    alert('تم إنشاء الحساب بنجاح')
    router.push('/profile')
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthText = ['ضعيفة', 'مقبولة', 'جيدة', 'قوية', 'ممتازة'][passwordStrength] || 'ضعيفة'
  const strengthColor = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-emerald-500'][passwordStrength]

  return (
    <div className="min-h-screen w-full flex relative">
      
      {/* الجزء الأيمن - الفورم (عرض كامل على الموبايل، 50% على الديسكتوب) */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50 overflow-y-auto">
        <div className="w-full max-w-lg">
          
          {/* اللوجو */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 shadow-xl transform hover:rotate-3 transition-transform">
                <span className="text-3xl font-black text-white">E</span>
              </div>
            </Link>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">مرحباً بك! 👋</h1>
            <p className="text-gray-600">أنشئ حسابك مجانًا وابدأ رحلة تعلم الإنجليزية</p>
          </div>

          {/* خيارات التسجيل السريع */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: IoLogoGoogle, color: 'text-red-500', bg: 'bg-red-50', label: 'Google' },
              { icon: IoLogoGithub, color: 'text-gray-900', bg: 'bg-gray-100', label: 'GitHub' },
              { icon: IoLogoApple, color: 'text-gray-900', bg: 'bg-gray-100', label: 'Apple' }
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-2 py-3 px-2 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* فاصل */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-sm text-gray-500">أو بالبريد الإلكتروني</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* الفورم */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* الاسم */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mr-1">
                الاسم الكامل
              </label>
              <div className="relative group">
                <IoPerson className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 bg-white border ${errors.name ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right`}
                  placeholder="  ادخل الاسم الكامل  "
                  dir="rtl"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 mr-1">{errors.name}</p>
              )}
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mr-1">
                البريد الإلكتروني
              </label>
              <div className="relative group">
                <IoMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 bg-white border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left`}
                  placeholder="text@example.com"
                  dir="ltr"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 mr-1">{errors.email}</p>
              )}
            </div>

            {/* كلمة المرور */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mr-1">
                كلمة المرور
              </label>
              <div className="relative group">
                <IoLockClosed className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-10 py-3 bg-white border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left`}
                  placeholder="ادخل كلمة المرور"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password ? (
                <p className="text-red-500 text-xs mt-1 mr-1">{errors.password}</p>
              ) : formData.password && (
                <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          passwordStrength === 0 ? 'w-0' :
                          passwordStrength === 1 ? 'w-1/5 bg-red-500' :
                          passwordStrength === 2 ? 'w-2/5 bg-orange-500' :
                          passwordStrength === 3 ? 'w-3/5 bg-yellow-500' :
                          passwordStrength === 4 ? 'w-4/5 bg-green-500' :
                          'w-full bg-emerald-500'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${strengthColor}`}>
                      {strengthText}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircle className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={formData.password.length >= 8 ? 'text-gray-700' : 'text-gray-400'}>8 أحرف</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircle className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={/[A-Z]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>حرف كبير</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircle className={`w-3 h-3 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={/[0-9]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>رقم</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCheckmarkCircle className={`w-3 h-3 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>رمز خاص</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* بيانات البروفايل (اختياري) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4">
              <h3 className="font-bold text-gray-900">بيانات البروفايل (اختياري)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المستوى الحالي</label>
                  <div className="relative">
                    <IoFlag className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="A1">A1 - مبتدئ</option>
                      <option value="A2">A2 - أساسي</option>
                      <option value="B1">B1 - متوسط</option>
                      <option value="B2">B2 - فوق المتوسط</option>
                      <option value="C1">C1 - متقدم</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الهدف</label>
                  <div className="relative">
                    <IoRocket className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      placeholder="مثال: تحسين المحادثة"
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوظيفة</label>
                  <div className="relative">
                    <IoBriefcase className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="job"
                      value={formData.job}
                      onChange={handleChange}
                      placeholder="مثال: طالب"
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                  <div className="relative">
                    <IoLocation className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="مثال: القاهرة"
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الموقع الإلكتروني</label>
                <div className="relative">
                  <IoGlobe className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    dir="ltr"
                    className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نبذة قصيرة</label>
                <div className="relative">
                  <IoChatbubbles className="absolute right-3 top-3 text-gray-400" />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="اكتب نبذة بسيطة عن نفسك..."
                    className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* شروط الاستخدام */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                أوافق على <Link href="/terms" className="text-blue-600 hover:underline">الشروط والأحكام</Link> و <Link href="/privacy" className="text-blue-600 hover:underline">سياسة الخصوصية</Link>
              </label>
            </div>

            {/* زر التسجيل */}
            <button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري إنشاء الحساب...
                </>
              ) : (
                <>
                  <span>إنشاء حساب مجاني</span>
                  <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* رابط تسجيل الدخول */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                سجل دخولك من هنا
              </Link>
            </p>
          </div>

          {/* إحصائيات سريعة */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: IoPeople, value: '10k+', label: 'متعلم' },
              { icon: IoBook, value: '200+', label: 'درس' },
              { icon: IoTrophy, value: '95%', label: 'رضا' }
            ].map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-xl shadow-sm">
                <item.icon className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-black text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* الجزء الأيسر - صور ومحتوى ترويجي (يظهر فقط على الديسكتوب) */}
      <div className="hidden lg:block lg:w-1/2 min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900">
        {/* صورة خلفية */}
        <img 
          src={backgroundImages[selectedBg]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* طبقة تدرج */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90"></div>

        {/* المحتوى الترويجي */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white">
          
          {/* شعار متحرك */}
          <div className="mb-12 text-center">
            <div className="inline-block p-1 bg-white/10 rounded-3xl backdrop-blur-sm mb-6">
              <div className="px-6 py-2 bg-white/20 rounded-2xl">
                <span className="text-sm font-bold tracking-wider">✨ منصة تعلم رقم 1 في الوطن العربي</span>
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">اتعلم إنجليزي</h2>
            <p className="text-2xl font-bold text-blue-200 mb-4">في 10 دقائق بس يوميًا</p>
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBg(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedBg === idx ? 'w-8 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* صور المميزات */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            {featureImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-white/20 rounded-2xl transform group-hover:scale-105 transition-all"></div>
                <img 
                  src={img}
                  alt={`Feature ${idx + 1}`}
                  className="relative rounded-2xl shadow-2xl border-2 border-white/30"
                />
              </div>
            ))}
          </div>

          {/* قائمة المميزات */}
          <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
            {[
              { icon: IoMic, text: 'تحدث مع تصحيح فوري' },
              { icon: IoBook, text: 'مفردات تفاعلية' },
              { icon: IoTime, text: 'تمارين قصيرة' },
              { icon: IoRocket, text: 'تتبع التقدم' }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              )
            })}
          </div>

          {/* آراء المستخدمين */}
          <div className="mt-12 text-center">
            <div className="flex justify-center -space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i}.jpg`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt=""
                />
              ))}
            </div>
            <p className="text-white/80 text-sm">
              <span className="font-bold text-white">+10,000</span> متعلم بيطوروا مستواهم يوميًا
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
