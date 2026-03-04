// app/auth/login/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  IoMail,
  IoLockClosed,
  IoArrowForward,
  IoEye,
  IoEyeOff,
  IoLogoGoogle,
  IoLogoGithub,
  IoLogoApple,
  IoFingerPrint,
  IoPeople,
  IoBook,
  IoTrophy,
  IoStar,
  IoTime,
  IoRocket,
  IoHappy,
  IoShield,
  IoKey
} from 'react-icons/io5'

// صور من Unsplash
const backgroundImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80'
]

const testimonialImages = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108777-766d1c0a769d?w=200&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80'
]

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [selectedBg, setSelectedBg] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [savedEmail, setSavedEmail] = useState('')

  // تحميل البريد الإلكتروني المحفوظ
  useEffect(() => {
    const remembered = localStorage.getItem('rememberedUser')
    if (remembered) {
      setSavedEmail(remembered)
      setFormData(prev => ({ ...prev, email: remembered }))
    }
  }, [])

  // التحقق من صحة البريد الإلكتروني
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // التحقق من المدخلات
    const newErrors = {
      email: !formData.email ? 'البريد الإلكتروني مطلوب' : 
             !validateEmail(formData.email) ? 'البريد الإلكتروني غير صحيح' : '',
      password: !formData.password ? 'كلمة المرور مطلوبة' : ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error)) {
      return
    }

    setIsLoading(true)

    // تسجيل الدخول الفوري
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.email === formData.email) {
        if (rememberMe) {
          localStorage.setItem('rememberedUser', formData.email)
        } else {
          localStorage.removeItem('rememberedUser')
        }
      } else {
        const newUser = {
          id: Date.now(),
          name: 'مستخدم جديد',
          email: formData.email,
          joinDate: new Date().toISOString(),
          level: 'A1',
          goal: 'تحسين المحادثة',
          bio: 'متعلم جديد في رحلة تعلم الإنجليزية 🌟',
          location: 'القاهرة، مصر',
          job: 'طالب',
          website: 'https://englishmaster.com',
          stats: {
            totalExercises: 0,
            totalHours: 0,
            bestSkill: 'لم يتم تحديد بعد',
            xp: 0
          }
        }
        localStorage.setItem('user', JSON.stringify(newUser))
        if (rememberMe) {
          localStorage.setItem('rememberedUser', formData.email)
        }
      }
    } else {
      const newUser = {
        id: Date.now(),
        name: formData.email.split('@')[0],
        email: formData.email,
        joinDate: new Date().toISOString(),
        level: 'A1',
        goal: 'تحسين المحادثة',
        bio: 'متعلم جديد في رحلة تعلم الإنجليزية 🌟',
        location: 'القاهرة، مصر',
        job: 'طالب',
        website: 'https://englishmaster.com',
        stats: {
          totalExercises: 0,
          totalHours: 0,
          bestSkill: 'لم يتم تحديد بعد',
          xp: 0
        }
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      if (rememberMe) {
        localStorage.setItem('rememberedUser', formData.email)
      }
    }

    setIsLoading(false)
    router.push('/profile')
  }

  return (
    <div className="min-h-screen w-full flex relative">
      
      {/* الجزء الأيسر - صور ومحتوى ترويجي (يظهر فقط على الديسكتوب) */}
      <div className="hidden lg:block lg:w-1/2 min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
        {/* صورة خلفية */}
        <img 
          src={backgroundImages[selectedBg]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* طبقة تدرج */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-900/90"></div>

        {/* المحتوى الترويجي */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white">
          
          {/* شعار متحرك */}
          <div className="mb-12 text-center">
            <div className="inline-block p-1 bg-white/10 rounded-3xl backdrop-blur-sm mb-6">
              <div className="px-6 py-2 bg-white/20 rounded-2xl">
                <span className="text-sm font-bold tracking-wider">✨ أرحب من 10,000 متعلم</span>
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">أهلاً بعودتك!</h2>
            <p className="text-2xl font-bold text-indigo-200 mb-4">تابع رحلة تعلمك من حيث ما وقفت</p>
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

          {/* آراء المستخدمين */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonialImages[0]}
                  alt="User"
                  className="w-16 h-16 rounded-2xl border-2 border-white"
                />
                <div>
                  <h3 className="font-bold text-lg">أحمد محمد</h3>
                  <p className="text-white/70 text-sm">مهندس برمجيات</p>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                "بفضل المنصة دي، قدرت أحسن مستوايا في 3 شهور ونطقت قبول في منحة أوروبا. شكراً!"
              </p>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <IoStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* إحصائيات */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: IoPeople, value: '10k+', label: 'متعلم نشط' },
              { icon: IoTime, value: '5M+', label: 'دقيقة تعلم' },
              { icon: IoTrophy, value: '95%', label: 'تقييم إيجابي' }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-indigo-300" />
                  <div className="text-xl font-black">{item.value}</div>
                  <div className="text-xs text-white/70">{item.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* الجزء الأيمن - الفورم (عرض كامل على الموبايل، 50% على الديسكتوب) */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-gray-50 to-indigo-50 overflow-y-auto">
        <div className="w-full max-w-lg">
          
          {/* اللوجو */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mx-auto mb-4 shadow-xl transform hover:-rotate-3 transition-transform">
                <span className="text-3xl font-black text-white">E</span>
              </div>
            </Link>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">أهلاً بعودتك! 👋</h1>
            <p className="text-gray-600">سجل دخولك واستكمل رحلة تعلمك</p>
          </div>

          {/* خيارات الدخول السريع */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: IoLogoGoogle, color: 'text-red-500', bg: 'bg-red-50', label: 'Google' },
              { icon: IoLogoGithub, color: 'text-gray-900', bg: 'bg-gray-100', label: 'GitHub' },
              { icon: IoLogoApple, color: 'text-gray-900', bg: 'bg-gray-100', label: 'Apple' }
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-2 py-3 px-2 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all group"
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
            {/* البريد الإلكتروني مع اقتراح المحفوظ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mr-1">
                البريد الإلكتروني
              </label>
              <div className="relative group">
                <IoMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 bg-white border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-left`}
                  placeholder="ahmed@example.com"
                  dir="ltr"
                />
              </div>

              {savedEmail && !formData.email && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, email: savedEmail }))}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                >
                  <IoFingerPrint className="w-3.5 h-3.5" />
                  استخدام البريد المحفوظ: {savedEmail}
                </button>
              )}

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
                <IoLockClosed className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-10 py-3 bg-white border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-left`}
                  placeholder="••••••••"
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 mr-1">{errors.password}</p>
              )}
            </div>

            {/* تذكرني + نسيت كلمة المرور */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                تذكرني
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <IoArrowForward className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* رابط إنشاء حساب */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              ليس لديك حساب؟{' '}
              <Link href="/auth/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
                أنشئ حسابك من هنا
              </Link>
            </p>
          </div>

          {/* مميزات سريعة */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: IoShield, value: 'آمن', label: 'حماية كاملة' },
              { icon: IoBook, value: '200+', label: 'درس' },
              { icon: IoRocket, value: 'سريع', label: 'تقدم فوري' }
            ].map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-xl shadow-sm">
                <item.icon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <div className="text-sm font-black text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <IoKey className="w-4 h-4" />
            <span>بياناتك مشفرة وآمنة دائمًا</span>
          </div>
        </div>
      </div>
    </div>
  )
}
