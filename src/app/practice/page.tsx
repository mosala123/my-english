import Link from 'next/link'
import { IoFlame, IoTime, IoArrowBack, IoBookOutline, IoMic, IoStatsChart, IoTrophy, IoSparkles, IoPlay, IoCheckmarkCircle } from 'react-icons/io5'

// ─── Data ─────────────────────────────────────────────────
const tracks = [
  {
    id: 'speaking',
    title: 'اختبار المحادثة',
    subtitle: 'Speaking',
    description: 'سجّل إجابتك واحصل على تقييم للنطق والطلاقة وبناء الجمل.',
    href: '/speaking',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&q=80',
    icon: IoMic,
    emoji: '🎙️',
    color: { bg: '#ede9fe', text: '#6d28d9', border: '#ddd6fe', glow: 'rgba(139,92,246,0.2)' },
    tag: 'الأصعب',
    xp: 70,
  },
  {
    id: 'vocabulary',
    title: 'اختبار المفردات',
    subtitle: 'Vocabulary',
    description: 'سؤال سياقي واختيار المعنى الصحيح للكلمة في جملة حقيقية.',
    href: '/vocabulary',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80',
    icon: IoBookOutline,
    emoji: '📖',
    color: { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe', glow: 'rgba(37,99,235,0.2)' },
    tag: 'الأكثر شعبية',
    xp: 50,
  },
  {
    id: 'grammar',
    title: 'اختبار القواعد',
    subtitle: 'Grammar',
    description: 'تطبيق القاعدة داخل جملة حقيقية مع تصحيح وشرح فوري.',
    href: '/grammar',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80',
    icon: IoStatsChart,
    emoji: '📝',
    color: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', glow: 'rgba(16,185,129,0.2)' },
    tag: null,
    xp: 60,
  },
]

const quickExercises = [
  {
    id: 1,
    title: 'اختبار سريع — الأزمنة',
    subtitle: 'Simple Tenses',
    duration: '5 دقائق',
    questions: 5,
    level: 'A2',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&q=80',
    xp: 30,
  },
  {
    id: 2,
    title: 'اختبار سريع — المفردات اليومية',
    subtitle: 'Daily Vocabulary',
    duration: '7 دقائق',
    questions: 7,
    level: 'B1',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    xp: 40,
  },
  {
    id: 3,
    title: 'اختبار سريع — الجمل المركبة',
    subtitle: 'Complex Sentences',
    duration: '10 دقائق',
    questions: 10,
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    xp: 55,
  },
]

const dailyStats = [
  { value: '3',    label: 'تمارين اليوم',    icon: IoFlame,   color: '#fbbf24' },
  { value: '15',   label: 'دقيقة متوسط',      icon: IoTime,    color: '#38bdf8' },
  { value: '120',  label: 'XP متاحة اليوم',  icon: IoTrophy,  color: '#6ee7b7' },
]

function getLevelStyle(level: string) {
  if (level.startsWith('A')) return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' }
  if (level.startsWith('B')) return { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' }
  return { bg: '#ede9fe', color: '#6d28d9', border: '#ddd6fe' }
}

// ─── Page ─────────────────────────────────────────────────
export default function PracticePage() {
  return (
    <div
      className="min-h-screen py-10"
      style={{ background: 'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily: "'Tajawal',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');
        .track-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); border: 1.5px solid #e2e8f0; }
        .track-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(37,99,235,0.12) !important; border-color: #93c5fd !important; }
        .track-card:hover .track-img { transform: scale(1.06); }
        .track-img { transition: transform 0.4s ease; }
        .exercise-row { transition: all 0.2s ease; border: 1.5px solid #e2e8f0; }
        .exercise-row:hover { border-color: #93c5fd; background: #f0f9ff; transform: translateX(-3px); }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ─── Hero ─── */}
        <section
          className="rounded-3xl p-8 lg:p-10 text-right relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', boxShadow: '0 24px 60px rgba(15,23,42,0.2)' }}
        >
          <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, background:'rgba(251,191,36,0.1)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, background:'rgba(14,165,233,0.12)', borderRadius:'50%', filter:'blur(50px)', pointerEvents:'none' }} />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div
                className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(251,191,36,0.15)', border:'1px solid rgba(251,191,36,0.3)', color:'#fcd34d' }}
              >
                <IoFlame className="w-4 h-4 text-amber-400" />
                مركز التدريب اليومي
              </div>

              <h1
                className="font-extrabold text-white mb-3 leading-tight"
                style={{ fontSize:'clamp(1.8rem,4vw,2.6rem)' }}
              >
                جرعة تدريب يومية مركزة
                <span
                  className="block mt-1"
                  style={{ background:'linear-gradient(135deg,#fbbf24,#f97316)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}
                >
                  حل، راجع، أعد المحاولة
                </span>
              </h1>

              <p className="text-slate-400 leading-7" style={{ maxWidth:440 }}>
                نظام التمرين مبني على <strong className="text-slate-200">التكرار الذكي</strong> — كل غلطة بتتحول لفرصة تعلم حقيقية.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm"
                  style={{ background:'linear-gradient(135deg,#f59e0b,#f97316)', boxShadow:'0 8px 24px rgba(251,191,36,0.3)' }}
                >
                  <IoPlay className="w-4 h-4" /> اختبر مستواك أولاً
                </Link>
                <Link
                  href="/practice/exercise/1"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm"
                  style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#cbd5e1' }}
                >
                  ابدأ تمرين سريع <IoArrowBack className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Daily Stats */}
            <div className="flex gap-3 lg:flex-col">
              {dailyStats.map(s => (
                <div key={s.label} className="text-center px-4 py-4 rounded-2xl flex-1 lg:flex-none" style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}>
                  <s.icon className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} />
                  <div className="font-extrabold text-xl text-white mb-0.5">{s.value}</div>
                  <div className="text-slate-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Tracks ─── */}
        <section>
          <div className="text-right mb-6">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">اختر مهارتك</p>
            <h2 className="text-xl font-extrabold text-slate-900">مسارات التدريب</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tracks.map(track => {
              const Icon = track.icon
              return (
                <Link
                  key={track.id}
                  href={track.href}
                  className="track-card bg-white rounded-2xl overflow-hidden flex flex-col"
                  style={{ boxShadow:'0 2px 8px rgba(15,23,42,0.05)' }}
                >
                  {/* Image */}
                  <div className="overflow-hidden relative" style={{ height:130 }}>
                    <img src={track.image} alt={track.title} className="track-img w-full h-full object-cover" />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 30%, rgba(15,23,42,0.65))' }} />

                    {track.tag && (
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: track.color.bg, color: track.color.text, border:`1px solid ${track.color.border}` }}>
                          {track.tag}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
                      <span className="text-white/60 text-xs font-bold flex items-center gap-1">
                        <IoFlame className="w-3 h-3 text-amber-400" />{track.xp} XP
                      </span>
                      <span className="text-2xl">{track.emoji}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1 text-right">
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-0.5">{track.subtitle}</p>
                      <h3 className="font-extrabold text-slate-900 text-base mb-1">{track.title}</h3>
                      <p className="text-xs text-slate-500 leading-5">{track.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold mt-auto" style={{ color: track.color.text }}>
                      ابدأ الاختبار <IoArrowBack className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ─── Quick Exercises ─── */}
        <section>
          <div className="text-right mb-5">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">تمارين سريعة</p>
            <h2 className="text-xl font-extrabold text-slate-900">اختبارات قصيرة — ابدأ فوراً</h2>
          </div>

          <div className="space-y-3">
            {quickExercises.map(ex => {
              const ls = getLevelStyle(ex.level)
              return (
                <Link
                  key={ex.id}
                  href={`/practice/exercise/${ex.id}`}
                  className="exercise-row bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={ex.image} alt={ex.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-right min-w-0">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{ex.subtitle}</p>
                    <h3 className="font-extrabold text-slate-900 text-sm">{ex.title}</h3>
                    <div className="flex items-center gap-3 mt-1 justify-end">
                      <span className="text-xs text-slate-400 flex items-center gap-1"><IoTime className="w-3.5 h-3.5" />{ex.duration}</span>
                      <span className="text-xs text-slate-400">{ex.questions} سؤال</span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>
                      {ex.level}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                      <IoFlame className="w-3 h-3" />{ex.xp} XP
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ─── Tip Banner ─── */}
        <section className="pb-4">
          <div
            className="rounded-3xl p-7 relative overflow-hidden"
            style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow:'0 20px 50px rgba(15,23,42,0.18)' }}
          >
            <div style={{ position:'absolute', top:-40, left:-40, width:180, height:180, background:'rgba(251,191,36,0.15)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 text-right">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <IoSparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-sm font-bold">كيف يشتغل التكرار الذكي؟</span>
                </div>
                <p className="text-white font-bold">الأسئلة اللي غلطت فيها بتتكرر تلقائياً بعد فترة قصيرة.</p>
                <div className="flex gap-4 mt-3">
                  {['حل التمرين', 'راجع غلطاتك', 'أعد المحاولة'].map((step, i) => (
                    <div key={step} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <IoCheckmarkCircle className="w-3.5 h-3.5 text-emerald-400" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/assessment"
                className="flex-shrink-0 inline-flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm"
                style={{ background:'linear-gradient(135deg,#f59e0b,#f97316)', boxShadow:'0 8px 20px rgba(251,191,36,0.3)' }}
              >
                <IoFlame className="w-4 h-4" /> اختبر مستواك
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
