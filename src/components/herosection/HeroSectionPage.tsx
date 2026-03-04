// app/components/HeroSectionPage.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  IoCheckmarkCircle,
  IoPlay,
  IoBook,
  IoMic,
  IoStatsChart,
  IoVideocam,
  IoArrowBack,
  IoTime,
  IoTrophy,
  IoSparkles,
  IoFlame,
  IoRocket,
  IoPeople,
  IoCalendar,
  IoGlobe,
  IoEar,
  IoChatbubbles,
  IoDocumentText,
  IoBusiness,
  IoSchool,
  IoBarChart,
  IoMedal,
  IoHeart,
  IoStar,
  IoHappy,
  IoThumbsUp,
  IoRibbon,
  IoGift,
  IoWallet,
  IoAirplane,
  IoRestaurant,
  IoCart,
  IoPhonePortrait,
  IoLaptop,
  IoNewspaper,
  IoMusicalNotes,
  IoFilm,
  IoGameController,
  IoTv,
  IoWifi,
  IoCloudUpload,
  IoDownload,
  IoShareSocial,
  IoLockClosed,
  IoKey,
  IoShield,
  IoWarning,
  IoInformation,
  IoHelp,
  IoBulb,
  IoRocketSharp
} from 'react-icons/io5'

const selfTestTracks = [
  {
    icon: IoMic,
    title: 'اختبار التحدث',
    description: 'سجّل إجابتك واحصل على تقييم مباشر للنطق والطلاقة.',
    href: '/speaking',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    tag: 'الأكثر شعبية',
    stats: { questions: 15, time: '5 دقائق', level: 'A1-C1' }
  },
  {
    icon: IoBook,
    title: 'اختبار المفردات',
    description: 'أسئلة قصيرة تقيس حصيلتك وتوضح الكلمات التي تحتاج مراجعة.',
    href: '/vocabulary',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag: null,
    stats: { questions: 20, time: '4 دقائق', level: 'A1-B2' }
  },
  {
    icon: IoStatsChart,
    title: 'اختبار القواعد',
    description: 'تحديات سريعة في الأزمنة والتركيب مع تصحيح فوري.',
    href: '/grammar',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    tag: null,
    stats: { questions: 25, time: '6 دقائق', level: 'A1-C1' }
  },
  {
    icon: IoVideocam,
    title: 'فهم الفيديو',
    description: 'شاهد مقطع قصير ثم اختبر فهمك بأسئلة عملية.',
    href: '/videos',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    tag: 'جديد',
    stats: { questions: 10, time: '3 دقائق', level: 'A2-B2' }
  }
]

// مسارات إضافية
const moreTracks = [
  {
    icon: IoEar,
    title: 'الاستماع',
    description: 'استمع لمحادثات حقيقية وأجب على أسئلة الفهم.',
    href: '/listening',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    tag: 'مكثف',
    stats: { questions: 20, time: '7 دقائق', level: 'A1-C1' }
  },
  {
    icon: IoChatbubbles,
    title: 'محادثة تفاعلية',
    description: 'تحدث مع الذكاء الاصطناعي في مواقف حياتية حقيقية.',
    href: '/conversation',
    color: 'from-indigo-500 to-purple-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    tag: 'مميز',
    stats: { questions: 'غير محدود', time: 'حسب رغبتك', level: 'A2-C1' }
  },
  {
    icon: IoDocumentText,
    title: 'القراءة',
    description: 'اقرأ نصوص متنوعة واختبر فهمك للتفاصيل والأفكار.',
    href: '/reading',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    tag: null,
    stats: { questions: 15, time: '8 دقائق', level: 'A1-C1' }
  },
  {
    icon: IoBusiness,
    title: 'الإنجليزية للأعمال',
    description: 'مصطلحات ومحادثات مهنية لسوق العمل.',
    href: '/business',
    color: 'from-slate-700 to-gray-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    tag: 'احترافي',
    stats: { questions: 20, time: '10 دقائق', level: 'B1-C1' }
  }
]

// مسارات إضافية - الصف الثاني
const additionalTracks = [
  {
    icon: IoSchool,
    title: 'الاختبارات الأكاديمية',
    description: 'نماذج IELTS وTOEFL مع تصحيح وتقييم.',
    href: '/academic',
    color: 'from-blue-800 to-indigo-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag: 'متقدم',
    stats: { questions: 40, time: '20 دقيقة', level: 'B2-C2' }
  },
  {
    icon: IoAirplane,
    title: 'السفر والسياحة',
    description: 'مواقف السفر: مطار، فندق، مطعم، تسوق.',
    href: '/travel',
    color: 'from-sky-500 to-cyan-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    tag: 'عملي',
    stats: { questions: 25, time: '6 دقائق', level: 'A1-B1' }
  },
  {
    icon: IoRestaurant,
    title: 'المواقف اليومية',
    description: 'مطعم، مستشفى، بنك، سوبرماركت.',
    href: '/daily',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    tag: null,
    stats: { questions: 30, time: '8 دقائق', level: 'A1-B1' }
  },
  {
    icon: IoPhonePortrait,
    title: 'المكالمات الهاتفية',
    description: 'تحدث على الهاتف في مواقف رسمية وغير رسمية.',
    href: '/phone',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    tag: 'جديد',
    stats: { questions: 15, time: '5 دقائق', level: 'A2-B2' }
  }
]

// مسارات الصف الثالث
const advancedTracks = [
  {
    icon: IoLaptop,
    title: 'التكنولوجيا',
    description: 'مصطلحات تقنية ومناقشات حول الذكاء الاصطناعي.',
    href: '/technology',
    color: 'from-cyan-600 to-blue-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    tag: 'حديث',
    stats: { questions: 20, time: '7 دقائق', level: 'B1-C1' }
  },
  {
    icon: IoNewspaper,
    title: 'الأخبار',
    description: 'اقرأ واستمع لأهم الأخبار العالمية.',
    href: '/news',
    color: 'from-red-500 to-rose-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    tag: 'متنوع',
    stats: { questions: 15, time: '6 دقائق', level: 'B1-C1' }
  },
  {
    icon: IoMusicalNotes,
    title: 'الأغاني',
    description: 'تعلم من خلال كلمات الأغاني المفضلة.',
    href: '/music',
    color: 'from-fuchsia-500 to-pink-500',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-200',
    iconBg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-600',
    tag: 'ممتع',
    stats: { questions: 12, time: '4 دقائق', level: 'A2-B2' }
  },
  {
    icon: IoFilm,
    title: 'الأفلام',
    description: 'مشاهد من أفلام مشهورة مع تمارين تفاعلية.',
    href: '/movies',
    color: 'from-violet-600 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    tag: 'شيق',
    stats: { questions: 10, time: '5 دقائق', level: 'A2-C1' }
  }
]

const quickStats = [
  { label: 'تمارين جاهزة يوميًا', value: '30+', icon: IoFlame, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'مدة التمرين السريع', value: '5 دقائق', icon: IoTime, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'نسبة تركيز على التطبيق', value: '100%', icon: IoRocket, color: 'text-violet-500', bg: 'bg-violet-50' },
  { label: 'متحدثين أصليين', value: '50+', icon: IoPeople, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'دروس مسجلة', value: '200+', icon: IoVideocam, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'مستخدمين نشطين', value: '10k+', icon: IoHappy, color: 'text-pink-500', bg: 'bg-pink-50' }
]

const quizOptions = [
  { text: 'go', correct: false },
  { text: 'goes', correct: true },
  { text: 'going', correct: false },
  { text: 'gone', correct: false }
]

const dailyChallenges = [
  {
    title: 'تحدي اليوم',
    description: 'تحدث عن نفسك لمدة دقيقتين',
    icon: IoMic,
    xp: 50,
    time: '2 دقيقة',
    level: 'سهل'
  },
  {
    title: 'كلمة اليوم',
    description: '"Persistent" - استخدمها في جملة',
    icon: IoBook,
    xp: 30,
    time: '1 دقيقة',
    level: 'متوسط'
  },
  {
    title: 'قاعدة اليوم',
    description: 'المضارع التام - Present Perfect',
    icon: IoStatsChart,
    xp: 40,
    time: '3 دقائق',
    level: 'متوسط'
  }
]

const achievements = [
  { title: 'أول تسجيل', icon: IoMic, unlocked: true, progress: 100 },
  { title: '10 أيام متتالية', icon: IoFlame, unlocked: false, progress: 60 },
  { title: '100 كلمة', icon: IoBook, unlocked: true, progress: 100 },
  { title: 'مقابلة عمل', icon: IoBusiness, unlocked: false, progress: 30 }
]

const testimonials = [
  {
    name: 'أحمد محمد',
    role: 'مهندس برمجيات',
    text: 'حرفيًا أنقذوني قبل مقابلة العمل. تدربت على المحادثات ونجحت في المقابلة!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
  },
  {
    name: 'سارة عبدالله',
    role: 'طبيبة',
    text: 'الأفضل للمصطلحات الطبية والمحادثات مع المرضى. أنصح به بشدة.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108777-766d1c0a769d?w=100&q=80'
  },
  {
    name: 'محمد علي',
    role: 'طالب',
    text: 'حسنت مستواي من A2 لـ B1 في 3 شهور فقط. شكراً!',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
  }
]

const pricingPlans = [
  {
    name: 'مجاني',
    price: '0',
    features: ['5 تمارين يوميًا', 'اختبارات محدودة', 'تقييم أساسي'],
    icon: IoGift,
    color: 'from-gray-500 to-gray-600'
  },
  {
    name: 'مميز',
    price: '99',
    features: ['تمارين غير محدودة', 'جميع الاختبارات', 'تقييم متقدم', 'شهادة إتمام'],
    icon: IoRocket,
    color: 'from-blue-500 to-purple-500',
    popular: true
  },
  {
    name: 'احترافي',
    price: '199',
    features: ['كل شيء في المميز', 'جلسات مع متحدثين أصليين', 'خطة تدريب شخصية', 'مراجعة متقدمة'],
    icon: IoTrophy,
    color: 'from-amber-500 to-orange-500'
  }
]

const HeroSectionPage = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [showAllTracks, setShowAllTracks] = useState(false)

  const allTracks = [...selfTestTracks, ...moreTracks, ...additionalTracks, ...advancedTracks]

  const filteredTracks = activeTab === 'all' 
    ? allTracks 
    : activeTab === 'popular' 
    ? allTracks.filter(t => t.tag === 'الأكثر شعبية' || t.tag === 'مميز')
    : activeTab === 'new'
    ? allTracks.filter(t => t.tag === 'جديد' || t.tag === 'حديث')
    : allTracks

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(160deg, #f8faff 0%, #eef4ff 40%, #f0faf8 100%)',
        fontFamily: "'Tajawal', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ping-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.5); }
          50% { box-shadow: 0 0 20px 5px rgba(37,99,235,0.3); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
        .animate-fade-up-delay-1 { animation: fadeUp 0.6s 0.1s ease forwards; opacity: 0; }
        .animate-fade-up-delay-2 { animation: fadeUp 0.6s 0.2s ease forwards; opacity: 0; }
        .animate-fade-up-delay-3 { animation: fadeUp 0.6s 0.3s ease forwards; opacity: 0; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slide-right { animation: slideInRight 0.5s ease forwards; }
        .pulse-glow { animation: pulse-glow 2s infinite; }

        .badge-shimmer {
          background: linear-gradient(90deg, #dbeafe, #bfdbfe, #c7d2fe, #bfdbfe, #dbeafe);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .track-card {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1.5px solid transparent;
        }
        .track-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(37,99,235,0.12);
        }

        .stat-card {
          transition: all 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(15,23,42,0.1);
        }

        .quiz-btn {
          transition: all 0.18s ease;
        }
        .quiz-btn:hover:not(:disabled) {
          transform: scale(1.02);
        }

        .glow-blue {
          box-shadow: 0 0 40px rgba(37,99,235,0.15), 0 20px 40px rgba(37,99,235,0.1);
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          pointer-events: none;
        }

        .progress-ring {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }

        .tab-active {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="hero-blob" style={{ width: 400, height: 400, background: '#bfdbfe', top: -100, right: -100 }} />
        <div className="hero-blob" style={{ width: 300, height: 300, background: '#a7f3d0', bottom: -50, left: -50 }} />
        <div className="hero-blob" style={{ width: 350, height: 350, background: '#fbcfe8', top: 200, left: 100 }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div className="text-right order-2 lg:order-1">
              {/* Badge */}
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-6 badge-shimmer text-blue-700 border border-blue-200">
                <IoTrophy className="w-4 h-4 text-amber-500" />
                أكثر من 10,000 متعلم نشط
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" style={{ animation: 'ping-slow 2s infinite' }} />
              </div>

              <h1
                className="animate-fade-up-delay-1 font-extrabold text-slate-900 leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontFamily: "'Tajawal', sans-serif" }}
              >
                اتعلم بالإنجليزي
                <span
                  className="block mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9, #7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  زي ما بتتكلم بالعربي
                </span>
              </h1>

              <p className="animate-fade-up-delay-2 text-lg text-slate-500 leading-8 mb-8" style={{ maxWidth: 480 }}>
                مش مجرد قواعد وكلمات — هنا بتتعلم ازاي تستخدم الإنجليزية في حياتك الحقيقية، مع 
                <strong className="text-slate-700"> تقييم فوري وتصحيح مباشر</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-3 sm:justify-end mb-7">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 text-white px-7 py-3.5 rounded-2xl font-bold text-base transition-all hover:shadow-2xl hover:-translate-y-0.5 pulse-glow"
                  style={{
                    background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9, #7c3aed)',
                    boxShadow: '0 8px 24px rgba(14,165,233,0.3)'
                  }}
                >
                  <IoPlay className="w-5 h-5" />
                  ابدأ اختبار المستوى (مجانًا)
                </Link>

                <Link
                  href="/practice"
                  className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 px-7 py-3.5 rounded-2xl font-bold text-base hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  تصفح التمارين
                  <IoArrowBack className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap sm:justify-end gap-5 text-sm text-slate-500">
                {[
                  { icon: IoCheckmarkCircle, color: 'text-emerald-500', text: 'تصحيح فوري' },
                  { icon: IoTime, color: 'text-amber-500', text: 'تدريبات قصيرة' },
                  { icon: IoSparkles, color: 'text-blue-500', text: 'خطة تحسين واضحة' },
                  { icon: IoPeople, color: 'text-purple-500', text: 'مجتمع متعلمين' }
                ].map(({ icon: Icon, color, text }) => (
                  <div key={text} className="inline-flex items-center gap-1.5 font-medium bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Icon className={`w-4 h-4 ${color}`} />
                    {text}
                  </div>
                ))}
              </div>

              {/* Live Users Counter */}
              <div className="mt-6 flex items-center justify-end gap-2 text-sm text-slate-500 bg-white/40 backdrop-blur-sm p-2 rounded-full w-fit mr-auto">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i}.jpg`}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      alt=""
                    />
                  ))}
                </div>
                <span className="px-2">+1,234 متعلم نشط الآن</span>
              </div>
            </div>

            {/* Right: Interactive Quiz Card */}
            <div className="order-1 lg:order-2 animate-float">
              <div
                className="rounded-3xl overflow-hidden glow-blue"
                style={{
                  background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                  border: '1px solid rgba(148,163,184,0.1)'
                }}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Grammar</span>
                    <span>السؤال 1 من 5</span>
                  </div>
                </div>

                <div className="px-6 py-5">
                  {/* Question */}
                  <div
                    className="rounded-2xl px-5 py-4 mb-4 text-slate-200 text-sm leading-7 font-medium"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    اختَر الصيغة الصحيحة:
                    <br />
                    <span className="text-cyan-300 font-bold text-lg">"She ___ to school every day."</span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {quizOptions.map((opt, i) => {
                      const isSelected = selected === i
                      const showResult = selected !== null

                      let btnStyle: React.CSSProperties = {
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#cbd5e1'
                      }
                      if (showResult && opt.correct) {
                        btnStyle = { background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#6ee7b7' }
                      } else if (showResult && isSelected && !opt.correct) {
                        btnStyle = { background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#fca5a5' }
                      }

                      return (
                        <button
                          key={opt.text}
                          className="quiz-btn rounded-xl px-4 py-2.5 text-sm font-bold text-right"
                          style={btnStyle}
                          onClick={() => setSelected(i)}
                          disabled={selected !== null}
                        >
                          {opt.text}
                          {showResult && opt.correct && ' ✓'}
                        </button>
                      )
                    })}
                  </div>

                  {/* Feedback */}
                  {selected !== null && (
                    <div
                      className="rounded-2xl px-5 py-4 text-sm leading-7 animate-slide-right"
                      style={{
                        background: quizOptions[selected].correct
                          ? 'rgba(16,185,129,0.12)'
                          : 'rgba(239,68,68,0.1)',
                        border: `1px solid ${quizOptions[selected].correct ? '#10b981' : '#ef4444'}`,
                        color: quizOptions[selected].correct ? '#6ee7b7' : '#fca5a5'
                      }}
                    >
                      {quizOptions[selected].correct
                        ? '🎉 إجابة صحيحة! راجع قاعدة المضارع البسيط ثم جرّب 5 أسئلة مشابهة.'
                        : '❌ الإجابة الصحيحة هي "goes" — للغائب المفرد نضيف s في المضارع البسيط.'}
                    </div>
                  )}

                  {/* Quick Tips */}
                  {selected === null && (
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-2">
                      <IoBulb className="w-4 h-4 text-amber-400" />
                      <span>نصيحة: في المضارع البسيط، الأفعال مع He/She/It بتنتهي بـ s</span>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: i === 0 ? 24 : 8,
                          background: i === 0 ? '#0ea5e9' : 'rgba(255,255,255,0.15)'
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-slate-500 text-xs">جلسة سريعة • 5 أسئلة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BANNER ═══ */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '10k+', label: 'متعلم نشط', icon: IoPeople },
              { number: '200+', label: 'درس تفاعلي', icon: IoBook },
              { number: '50+', label: 'متحدث أصلي', icon: IoMic },
              { number: '95%', label: 'تقييم إيجابي', icon: IoStar }
            ].map((stat, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <stat.icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-black text-slate-900">{stat.number}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DAILY CHALLENGES ═══ */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-8">
            <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">تحديات يومية</p>
            <h2 className="text-2xl font-extrabold text-slate-900">تحدي نفسك كل يوم</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyChallenges.map((challenge, i) => {
              const Icon = challenge.icon
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 border border-orange-200 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      challenge.level === 'سهل' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {challenge.level}
                    </span>
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{challenge.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <IoTime className="w-3 h-3" /> {challenge.time}
                    </span>
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <IoFlame className="w-3 h-3" /> +{challenge.xp} XP
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ TRACKS ═══ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-10">
            <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">اختر مهارتك</p>
            <h2
              className="font-extrabold text-slate-900"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontFamily: "'Tajawal', sans-serif" }}
            >
              مسارات اختبار نفسك
            </h2>
            <p className="text-slate-500 mt-2 text-base">اختَر المهارة اللي عايز تقيسها وابدأ فورًا.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-end mb-6">
            {['all', 'popular', 'new'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab ? 'tab-active' : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab === 'all' ? 'الكل' : tab === 'popular' ? 'الأكثر شعبية' : 'جديد'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(showAllTracks ? filteredTracks : filteredTracks.slice(0, 4)).map((track, i) => {
              const Icon = track.icon
              return (
                <Link
                  key={track.title}
                  href={track.href}
                  className={`track-card bg-white rounded-2xl p-6 relative group`}
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    border: '1.5px solid #e2e8f0'
                  }}
                >
                  {track.tag && (
                    <span
                      className="absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: track.tag === 'جديد' ? '#fef3c7' : 
                                   track.tag === 'مميز' ? '#ede9fe' :
                                   track.tag === 'مكثف' ? '#fee2e2' :
                                   track.tag === 'احترافي' ? '#e0f2fe' : '#ede9fe',
                        color: track.tag === 'جديد' ? '#b45309' : 
                               track.tag === 'مميز' ? '#7c3aed' :
                               track.tag === 'مكثف' ? '#b91c1c' :
                               track.tag === 'احترافي' ? '#0369a1' : '#7c3aed'
                      }}
                    >
                      {track.tag}
                    </span>
                  )}

                  <div
                    className={`w-12 h-12 rounded-2xl ${track.iconBg} ${track.iconColor} flex items-center justify-center mb-4`}
                    style={{ transition: 'all 0.25s ease' }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-extrabold text-slate-900 mb-2 text-base">{track.title}</h3>
                  <p className="text-sm text-slate-500 leading-6 mb-3">{track.description}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400 mb-3">
                    <span className="px-2 py-1 bg-slate-50 rounded-lg">🔢 {track.stats.questions}</span>
                    <span className="px-2 py-1 bg-slate-50 rounded-lg">⏱️ {track.stats.time}</span>
                    <span className="px-2 py-1 bg-slate-50 rounded-lg">📊 {track.stats.level}</span>
                  </div>

                  <div
                    className="mt-2 flex items-center gap-1 text-xs font-bold"
                    style={{ color: '#2563eb', opacity: 0, transition: 'opacity 0.2s' }}
                  >
                    ابدأ الآن <IoArrowBack className="w-3.5 h-3.5" />
                  </div>

                  <style>{`
                    .track-card:hover > div:last-child { opacity: 1 !important; }
                  `}</style>
                </Link>
              )
            })}
          </div>

          {/* Show More Button */}
          {filteredTracks.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllTracks(!showAllTracks)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                {showAllTracks ? 'عرض أقل' : `عرض المزيد (${filteredTracks.length - 4})`}
                <IoArrowBack className={`w-4 h-4 transition-transform ${showAllTracks ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-8">
            <p className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-2">إنجازاتك</p>
            <h2 className="text-2xl font-extrabold text-slate-900">تتبع تقدمك</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((ach, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center border border-slate-200">
                <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                  ach.unlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  <ach.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm mb-2">{ach.title}</h3>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${ach.unlocked ? 'bg-amber-500' : 'bg-blue-500'}`}
                    style={{ width: `${ach.progress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 mt-1">{ach.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-10">
            <p className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-2">آراء المتعلمين</p>
            <h2 className="text-2xl font-extrabold text-slate-900">ماذا يقول الآخرون</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-900">{t.name}</h3>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3 leading-6">"{t.text}"</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <IoStar key={j} className={`w-4 h-4 ${j < t.rating ? 'text-amber-400' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-10">
            <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-2">خطط الأسعار</p>
            <h2 className="text-2xl font-extrabold text-slate-900">اختر الخطة المناسبة لك</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => {
              const Icon = plan.icon
              return (
                <div
                  key={i}
                  className={`relative bg-white rounded-3xl p-8 border-2 transition-all hover:shadow-2xl ${
                    plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      الأكثر طلبًا
                    </span>
                  )}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-black">{plan.price}</span>
                    <span className="text-slate-400"> جنيه / شهر</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-sm text-slate-600 flex items-center gap-2">
                        <IoCheckmarkCircle className="w-4 h-4 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ابدأ الآن
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
              boxShadow: '0 24px 60px rgba(15,23,42,0.2)'
            }}
          >
            {quickStats.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="stat-card text-center p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div
                    className="font-extrabold mb-1"
                    style={{
                      fontSize: '2rem',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {item.value}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">{item.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
            </div>
            
            <div className="relative p-12 text-center">
              <h2 className="text-3xl font-black text-white mb-4">استعد تتكلم إنجليزي بطلاقة؟</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                انضم لأكثر من 10,000 متعلم بيطوروا مستواهم يوميًا مع تمارين تفاعلية وتقييم فوري
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  ابدأ مجانًا
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  اعرف أكثر
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">الأسئلة الشائعة</p>
            <h2 className="text-2xl font-extrabold text-slate-900">إجابات لكل أسئلتك</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'هل المنصة مجانية بالكامل؟',
                a: 'نعم! في خطة مجانية بتمارين يومية محدودة. وعندك خطط مميزة بمزايا إضافية.'
              },
              {
                q: 'أقدر أتعلم من الصفر؟',
                a: 'طبعًا، عندنا مسارات للمبتدئين من A1 حتى المتقدمين C1.'
              },
              {
                q: 'التصحيح فوري ولا بياخد وقت؟',
                a: 'التصحيح فوري 100%، بعد ما تسجل إجابتك بتشوف النتيجة على طول.'
              },
              {
                q: 'هل في تطبيق للموبايل؟',
                a: 'التطبيق تحت التطوير، بس الموقع شغال ممتاز على الموبايل.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-10">
            <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">المدونة</p>
            <h2 className="text-2xl font-extrabold text-slate-900">نصائح لتحسين الإنجليزية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'ازاي تتعلم إنجليزي في 10 دقائق يوميًا',
                desc: 'طرق بسيطة وفعالة تدمج الإنجليزية في يومك',
                image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80'
              },
              {
                title: 'أهم 100 كلمة للمبتدئين',
                desc: 'ابدأ بالكلمات الأكثر استخدامًا في المحادثات',
                image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80'
              },
              {
                title: 'نصائح لمقابلة عمل بالإنجليزي',
                desc: 'كلمات وجمل هتساعدك تنجح في المقابلة',
                image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80'
              }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all cursor-pointer group">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{post.desc}</p>
                  <span className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    اقرأ المزيد <IoArrowBack className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSectionPage