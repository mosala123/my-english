import Link from 'next/link'
import { IoPlay, IoBookOutline, IoArrowBack, IoTime, IoFlame, IoCheckmarkCircle, IoStatsChart } from 'react-icons/io5'

// ─── Data ─────────────────────────────────────────────────
const videosData: Record<string, {
  title: string; subtitle: string; level: string; duration: string; xp: number
  category: string; thumbnail: string; desc: string
  keyPhrases: { phrase: string; translation: string }[]
  nextId?: number
}> = {
  '1': {
    title:'طلب في مطعم', subtitle:'Ordering at a Restaurant',
    level:'A1', duration:'3:45', xp:30, category:'حياة يومية',
    thumbnail:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    desc:'تعلم كيف تطلب الطعام وتتكلم مع النادل بإنجليزي طبيعي.',
    keyPhrases:[
      { phrase:"I'd like to order...", translation:'أود أن أطلب...' },
      { phrase:"What do you recommend?", translation:'ماذا توصي؟' },
      { phrase:"Can I have the bill, please?", translation:'هل يمكنني الحصول على الفاتورة؟' },
      { phrase:"Is this dish spicy?", translation:'هل هذا الطبق حار؟' },
    ],
    nextId: 2
  },
  '2': {
    title:'التقديم لوظيفة', subtitle:'Job Interview',
    level:'B1', duration:'6:10', xp:55, category:'عمل',
    thumbnail:'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
    desc:'أبرز العبارات المهمة في مقابلات العمل الإنجليزية.',
    keyPhrases:[
      { phrase:"I have experience in...", translation:'لدي خبرة في...' },
      { phrase:"My greatest strength is...", translation:'أبرز نقاط قوتي...' },
      { phrase:"I'm a team player.", translation:'أنا شخص يعمل بروح الفريق.' },
      { phrase:"I'm eager to learn.", translation:'أنا متحمس للتعلم.' },
    ],
    nextId: 3
  },
  '3': {
    title:'عرض تقديمي قصير', subtitle:'Business Presentation',
    level:'B2', duration:'8:00', xp:70, category:'عمل',
    thumbnail:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    desc:'كيف تبدأ وتنهي عرضك بثقة وتربط أفكارك بشكل احترافي.',
    keyPhrases:[
      { phrase:"Let me start by saying...", translation:'دعوني أبدأ بقول...' },
      { phrase:"Moving on to the next point...", translation:'بالانتقال للنقطة التالية...' },
      { phrase:"To summarize...", translation:'بالتلخيص...' },
      { phrase:"I'd be happy to take questions.", translation:'يسعدني الإجابة على أسئلتكم.' },
    ],
    nextId: 4
  },
  '4': {
    title:'في المطار', subtitle:'At the Airport',
    level:'A2', duration:'4:50', xp:40, category:'سفر',
    thumbnail:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    desc:'تسجيل الأمتعة، الجوازات، والتعامل مع موظفي المطار.',
    keyPhrases:[
      { phrase:"I'd like to check in.", translation:'أريد تسجيل الوصول.' },
      { phrase:"My luggage is overweight.", translation:'أمتعتي ثقيلة الوزن.' },
      { phrase:"Which gate is my flight?", translation:'ما هو بوابة رحلتي؟' },
      { phrase:"Is the flight on time?", translation:'هل الرحلة في الموعد؟' },
    ],
    nextId: 5
  },
}

const defaultVideo = videosData['1']

function getLevelStyle(level: string) {
  if (level === 'A1') return { bg:'#dcfce7', color:'#15803d', border:'#bbf7d0' }
  if (level === 'A2') return { bg:'#d1fae5', color:'#065f46', border:'#a7f3d0' }
  if (level === 'B1') return { bg:'#dbeafe', color:'#1d4ed8', border:'#bfdbfe' }
  if (level === 'B2') return { bg:'#ede9fe', color:'#6d28d9', border:'#ddd6fe' }
  return { bg:'#fce7f3', color:'#9d174d', border:'#fbcfe8' }
}

export default function VideoPlayPage({ params }: { params: { id: string } }) {
  const video = videosData[params.id] ?? defaultVideo
  const ls = getLevelStyle(video.level)

  return (
    <div className="min-h-screen py-10"
      style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/videos" className="hover:text-blue-600 font-bold transition-colors flex items-center gap-1">
            <IoArrowBack className="w-4 h-4" /> الفيديوهات
          </Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{video.title}</span>
        </div>

        {/* ─── Video Player ─── */}
        <div className="rounded-3xl overflow-hidden" style={{ boxShadow:'0 20px 50px rgba(15,23,42,0.2)' }}>
          <div className="relative aspect-video bg-slate-900">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60" />
            <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.5)' }} />

            {/* Big Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                style={{ background:'rgba(37,99,235,0.9)', boxShadow:'0 12px 40px rgba(37,99,235,0.4)', backdropFilter:'blur(4px)' }}
              >
                <IoPlay className="w-8 h-8 text-white ml-1" />
              </div>
            </div>

            {/* Top bar */}
            <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <span className="px-2 py-1 rounded-full font-bold border text-xs" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>
                  {video.level}
                </span>
                <span className="bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <IoTime className="w-3 h-3" />{video.duration}
                </span>
              </div>
              <span className="text-amber-400 font-bold text-xs flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <IoFlame className="w-3 h-3" />{video.xp} XP
              </span>
            </div>

            {/* Bottom gradient */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
            <div className="absolute bottom-4 right-4">
              <p className="text-xs text-white/60">{video.subtitle}</p>
              <h2 className="text-white font-extrabold text-lg">{video.title}</h2>
            </div>
          </div>
        </div>

        {/* ─── Info + Actions ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Description */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 text-right" style={{ border:'1.5px solid #e2e8f0' }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>{video.level}</span>
                <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">{video.category}</span>
              </div>
            </div>
            <h1 className="font-extrabold text-slate-900 text-xl mb-1">{video.title}</h1>
            <p className="text-xs text-slate-400 mb-3">{video.subtitle}</p>
            <p className="text-slate-600 text-sm leading-7">{video.desc}</p>

            <div className="flex gap-3 mt-5">
              <Link href={`/videos/transcript/${params.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 text-white py-3 rounded-2xl font-bold text-sm"
                style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 20px rgba(37,99,235,0.25)' }}>
                <IoBookOutline className="w-4 h-4" /> النص والاختبار
              </Link>
              {video.nextId && (
                <Link href={`/videos/play/${video.nextId}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm border-2 border-slate-200 text-slate-700 bg-white">
                  الفيديو التالي <IoArrowBack className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Key Phrases */}
          <div className="bg-white rounded-2xl p-5 text-right" style={{ border:'1.5px solid #e2e8f0' }}>
            <div className="flex items-center gap-2 mb-4">
              <IoStatsChart className="w-4 h-4 text-blue-500" />
              <h3 className="font-extrabold text-slate-900 text-sm">عبارات مهمة</h3>
            </div>
            <div className="space-y-3">
              {video.keyPhrases.map((kp, i) => (
                <div key={i} className="rounded-xl p-3" style={{ background:'#f8faff', border:'1px solid #e2e8f0' }}>
                  <p className="font-bold text-blue-700 text-xs mb-0.5" dir="ltr">{kp.phrase}</p>
                  <p className="text-slate-500 text-xs">{kp.translation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
