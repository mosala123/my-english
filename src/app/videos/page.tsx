import Link from 'next/link'
import { IoVideocamOutline, IoTime, IoPlay, IoBookOutline, IoStatsChart, IoArrowBack, IoFlame, IoSparkles } from 'react-icons/io5'

// ─── Data ─────────────────────────────────────────────────
const videos = [
  {
    id: 1, title: 'طلب في مطعم', subtitle: 'Ordering at a Restaurant',
    desc: 'تعلم كيف تطلب الطعام وتتكلم مع النادل بإنجليزي طبيعي.',
    level: 'A1', duration: '3:45', views: '12K', xp: 30,
    category: 'حياة يومية',
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
    tag: 'للمبتدئين',
  },
  {
    id: 2, title: 'التقديم لوظيفة', subtitle: 'Job Interview',
    desc: 'أبرز العبارات المهمة في مقابلات العمل الإنجليزية.',
    level: 'B1', duration: '6:10', views: '8K', xp: 55,
    category: 'عمل',
    thumbnail: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&q=80',
    tag: 'الأكثر مشاهدة',
  },
  {
    id: 3, title: 'عرض تقديمي قصير', subtitle: 'Business Presentation',
    desc: 'كيف تبدأ وتنهي عرضك بثقة وتربط أفكارك بشكل احترافي.',
    level: 'B2', duration: '8:00', views: '5K', xp: 70,
    category: 'عمل',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&q=80',
    tag: null,
  },
  {
    id: 4, title: 'في المطار', subtitle: 'At the Airport',
    desc: 'تسجيل الأمتعة، الجوازات، والتعامل مع موظفي المطار.',
    level: 'A2', duration: '4:50', views: '9K', xp: 40,
    category: 'سفر',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80',
    tag: null,
  },
  {
    id: 5, title: 'مكالمة عمل', subtitle: 'Business Call',
    desc: 'عبارات التليفون المهنية وكيف تدير محادثة تليفونية بإنجليزي.',
    level: 'B1', duration: '5:30', views: '7K', xp: 50,
    category: 'عمل',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80',
    tag: null,
  },
  {
    id: 6, title: 'في الطبيب', subtitle: 'Doctor Visit',
    desc: 'كيف تصف أعراضك وتفهم تعليمات الطبيب باللغة الإنجليزية.',
    level: 'A2', duration: '4:15', views: '6K', xp: 40,
    category: 'صحة',
    thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80',
    tag: 'جديد',
  },
  {
    id: 7, title: 'نقاش أكاديمي', subtitle: 'Academic Discussion',
    desc: 'كيف تعبر عن رأيك وتناقش وتوافق أو تختلف بأسلوب أكاديمي.',
    level: 'C1', duration: '9:20', views: '3K', xp: 80,
    category: 'أكاديمي',
    thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80',
    tag: 'متقدم',
  },
  {
    id: 8, title: 'التسوق والمساومة', subtitle: 'Shopping',
    desc: 'السؤال عن الأسعار والمقاسات والألوان والتفاوض.',
    level: 'A1', duration: '3:20', views: '11K', xp: 30,
    category: 'حياة يومية',
    thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80',
    tag: null,
  },
  {
    id: 9, title: 'مقابلة تلفزيونية', subtitle: 'TV Interview',
    desc: 'استمع لمقابلة حقيقية وافهم كيف يتحدث المتحدثون الأصليون.',
    level: 'C1', duration: '11:00', views: '2K', xp: 90,
    category: 'أكاديمي',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
    tag: 'تحدي',
  },
]

const categories = ['الكل', 'حياة يومية', 'عمل', 'سفر', 'صحة', 'أكاديمي']

const levels = [
  { label: 'A1', desc: 'مبتدئ',   color: { bg:'#dcfce7', text:'#15803d', border:'#bbf7d0' } },
  { label: 'A2', desc: 'أساسي',   color: { bg:'#d1fae5', text:'#065f46', border:'#a7f3d0' } },
  { label: 'B1', desc: 'متوسط',   color: { bg:'#dbeafe', text:'#1d4ed8', border:'#bfdbfe' } },
  { label: 'B2', desc: 'فوق المتوسط', color: { bg:'#ede9fe', text:'#6d28d9', border:'#ddd6fe' } },
  { label: 'C1', desc: 'متقدم',   color: { bg:'#fce7f3', text:'#9d174d', border:'#fbcfe8' } },
]

function getLevelStyle(level: string) {
  return levels.find(l => l.label === level)?.color ?? { bg:'#f1f5f9', text:'#475569', border:'#e2e8f0' }
}

function getTagStyle(tag: string) {
  if (tag === 'الأكثر مشاهدة') return { bg:'#fff7ed', color:'#c2410c', border:'#fed7aa' }
  if (tag === 'جديد')           return { bg:'#f0fdf4', color:'#15803d', border:'#bbf7d0' }
  if (tag === 'متقدم')          return { bg:'#fdf4ff', color:'#7e22ce', border:'#e9d5ff' }
  if (tag === 'تحدي')           return { bg:'#fff1f2', color:'#be123c', border:'#fecdd3' }
  return                               { bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe' }
}

// ─── Page ─────────────────────────────────────────────────
export default function VideosPage() {
  const totalVideos = videos.length
  const totalMinutes = videos.reduce((s, v) => {
    const [m, sec] = v.duration.split(':').map(Number)
    return s + m + Math.round(sec / 60)
  }, 0)

  return (
    <div
      className="min-h-screen py-10"
      style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');
        .video-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); border:1.5px solid #e2e8f0; }
        .video-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(37,99,235,0.12) !important; border-color:#93c5fd !important; }
        .video-card:hover .vid-thumb { transform:scale(1.06); }
        .vid-thumb { transition:transform 0.4s ease; }
        .play-btn { transition:all 0.2s ease; }
        .video-card:hover .play-btn { transform:scale(1.1); opacity:1 !important; }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ─── Hero ─── */}
        <section
          className="rounded-3xl p-8 lg:p-10 text-right relative overflow-hidden"
          style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', boxShadow:'0 24px 60px rgba(15,23,42,0.2)' }}
        >
          <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, background:'rgba(14,165,233,0.15)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, background:'rgba(236,72,153,0.1)', borderRadius:'50%', filter:'blur(50px)', pointerEvents:'none' }} />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', color:'#7dd3fc' }}>
                <IoVideocamOutline className="w-4 h-4" /> فيديوهات تدريبية
              </div>

              <h1 className="font-extrabold text-white mb-3 leading-tight" style={{ fontSize:'clamp(1.8rem,4vw,2.6rem)' }}>
                اتعلم من مواقف حقيقية
                <span className="block mt-1" style={{ background:'linear-gradient(135deg,#38bdf8,#f472b6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  شاهد ثم اختبر فهمك فوراً
                </span>
              </h1>

              <p className="text-slate-400 leading-7" style={{ maxWidth:440 }}>
                كل فيديو معه <strong className="text-slate-200">اختبار فهم ونص مكتوب</strong> للمراجعة — بالمستوى اللي يناسبك.
              </p>

              <div className="flex flex-wrap gap-5 mt-6">
                {[
                  { icon: IoVideocamOutline, text:`${totalVideos} فيديو`,        color:'#38bdf8' },
                  { icon: IoTime,            text:`${totalMinutes}+ دقيقة`,      color:'#f472b6' },
                  { icon: IoBookOutline,     text:'نص مكتوب لكل فيديو',          color:'#6ee7b7' },
                  { icon: IoStatsChart,      text:'5 مستويات',                   color:'#fbbf24' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                    <Icon className="w-4 h-4" />{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Collage */}
            <div className="hidden lg:grid grid-cols-2 gap-2 flex-shrink-0" style={{ width:220 }}>
              {videos.slice(0,4).map((v,i) => (
                <div key={i} className="rounded-xl overflow-hidden relative" style={{ height:80 }}>
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IoPlay className="w-5 h-5 text-white opacity-80" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Level Filter Badges ─── */}
        <section>
          <div className="text-right mb-4">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">المستويات المتاحة</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {levels.map(l => (
              <div key={l.label} className="flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-sm" style={{ background: l.color.bg, color: l.color.text, borderColor: l.color.border }}>
                {l.label}
                <span className="font-medium opacity-70 text-xs">{l.desc}</span>
                <span className="text-xs opacity-60">({videos.filter(v => v.level === l.label).length} فيديو)</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Videos Grid ─── */}
        <section>
          <div className="text-right mb-6">
            <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">كل الفيديوهات</p>
            <h2 className="text-xl font-extrabold text-slate-900">
              مكتبة الفيديوهات
              <span className="text-sm font-semibold text-slate-400 mr-2">({videos.length} فيديو)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map(video => {
              const ls = getLevelStyle(video.level)
              return (
                <Link
                  key={video.id}
                  href={`/videos/play/${video.id}`}
                  className="video-card bg-white rounded-2xl overflow-hidden flex flex-col"
                  style={{ boxShadow:'0 2px 8px rgba(15,23,42,0.05)' }}
                >
                  {/* Thumbnail */}
                  <div className="overflow-hidden relative" style={{ height:150 }}>
                    <img src={video.thumbnail} alt={video.title} className="vid-thumb w-full h-full object-cover" />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 30%, rgba(15,23,42,0.7))' }} />

                    {/* Play button */}
                    <div className="play-btn absolute inset-0 flex items-center justify-center opacity-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background:'rgba(37,99,235,0.9)', backdropFilter:'blur(4px)' }}>
                        <IoPlay className="w-5 h-5 text-white mr-[-2px]" />
                      </div>
                    </div>

                    {/* Level badge */}
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>
                        {video.level}
                      </span>
                    </div>

                    {/* Tag */}
                    {video.tag && (
                      <div className="absolute top-3 left-3">
                        {(() => { const ts = getTagStyle(video.tag!); return (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>
                            {video.tag}
                          </span>
                        )})()}
                      </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
                      <span className="text-white/70 text-xs flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        <IoTime className="w-3 h-3" />{video.duration}
                      </span>
                      <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                        <IoFlame className="w-3 h-3" />{video.xp} XP
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1 text-right">
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-0.5">{video.subtitle}</p>
                      <h3 className="font-extrabold text-slate-900 text-base mb-1">{video.title}</h3>
                      <p className="text-xs text-slate-500 leading-5">{video.desc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{video.category}</span>
                      <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color:'#2563eb' }}>
                        شاهد الآن <IoArrowBack className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ─── Tip Banner ─── */}
        <section className="pb-4">
          <div className="rounded-3xl p-7 relative overflow-hidden"
            style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow:'0 20px 50px rgba(15,23,42,0.18)' }}>
            <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, background:'rgba(244,114,182,0.15)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 text-right">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <IoSparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-300 text-sm font-bold">نصيحة للمشاهدة الفعّالة</span>
                </div>
                <p className="text-white font-bold">شوف الفيديو مرتين: مرة بالترجمة ومرة بدونها.</p>
                <p className="text-slate-400 text-sm mt-1">المرة الثانية بدون ترجمة هي اللي بتطور فهمك فعلاً.</p>
              </div>
              <Link href="/videos/play/1"
                className="flex-shrink-0 inline-flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm"
                style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 20px rgba(37,99,235,0.3)' }}>
                <IoPlay className="w-4 h-4" /> ابدأ المشاهدة
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}