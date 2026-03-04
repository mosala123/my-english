'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  IoArrowBack,
  IoCalendarOutline,
  IoFlash,
  IoCheckmarkCircle,
  IoLockClosed,
  IoMic,
  IoBook,
  IoStatsChart,
  IoVideocam,
  IoTrophy,
  IoTime,
  IoFlame,
  IoChevronDown,
  IoChevronUp,
  IoPlay,
  IoSparkles,
  IoRocket
} from 'react-icons/io5'

const weeklyPlan = [
  {
    day: 'اليوم 1',
    task: 'مفردات أساسية + اختبار 10 أسئلة',
    icon: IoBook,
    color: 'blue',
    duration: '15 دقيقة',
    xp: 50,
    tip: 'ابدأ بـ 10 كلمات جديدة في مجال واحد (مثلاً: العمل أو السفر). الاختبار بعدها مباشرة يرسّخ الحفظ.',
    status: 'done'
  },
  {
    day: 'اليوم 2',
    task: 'قاعدة المضارع + تطبيق مباشر',
    icon: IoStatsChart,
    color: 'violet',
    duration: '20 دقيقة',
    xp: 60,
    tip: 'اقرأ القاعدة في 5 دقائق، ثم طبّق فوراً في 8 جمل. التطبيق الفوري أهم من الشرح.',
    status: 'done'
  },
  {
    day: 'اليوم 3',
    task: 'فيديو قصير + أسئلة فهم',
    icon: IoVideocam,
    color: 'amber',
    duration: '15 دقيقة',
    xp: 55,
    tip: 'اختار فيديو من 2-3 دقائق. شوفه مرتين: مرة بالترجمة ومرة بدونها، ثم أجب على الأسئلة.',
    status: 'active'
  },
  {
    day: 'اليوم 4',
    task: 'محادثة صوتية لمدة 7 دقائق',
    icon: IoMic,
    color: 'emerald',
    duration: '10 دقيقة',
    xp: 70,
    tip: 'سجّل نفسك وأنت تتكلم عن يومك بالإنجليزي. لا تتوقف حتى لو غلطت، الاستمرارية أهم من الدقة.',
    status: 'locked'
  },
  {
    day: 'اليوم 5',
    task: 'مراجعة أخطاء الأسبوع',
    icon: IoFlame,
    color: 'orange',
    duration: '10 دقيقة',
    xp: 40,
    tip: 'راجع الأسئلة اللي غلطت فيها في الأيام السابقة. التكرار الذكي للأخطاء هو سر التحسن السريع.',
    status: 'locked'
  },
  {
    day: 'اليوم 6',
    task: 'اختبار شامل قصير',
    icon: IoTrophy,
    color: 'cyan',
    duration: '20 دقيقة',
    xp: 80,
    tip: 'اختبار من 15 سؤال يغطي كل ما تعلمته. النتيجة ستحدد نقطة البداية للأسبوع التالي.',
    status: 'locked'
  },
  {
    day: 'اليوم 7',
    task: 'إعادة تقييم وتحديث الخطة',
    icon: IoRocket,
    color: 'pink',
    duration: '10 دقيقة',
    xp: 30,
    tip: 'بناءً على نتائج الأسبوع، حدّد نقاط ضعفك وعدّل خطة الأسبوع القادم. المرونة هي سر الاستمرار.',
    status: 'locked'
  }
]

const levelTips = [
  { level: 'A1–A2', tip: 'ركّز على 5 كلمات يوميًا فقط وجملة واحدة. الكم الصغير المنتظم أفضل من الكم الكبير المتقطع.', icon: '🌱' },
  { level: 'B1–B2', tip: 'ابدأ تستخدم الإنجليزي في مواقف حقيقية: وصف يومك، كتابة رسالة، مشاهدة مسلسل بدون ترجمة.', icon: '🚀' },
  { level: 'C1+', tip: 'اقرأ مقالات أو استمع لـ podcasts في مجال تخصصك. التعلم بالمحتوى الحقيقي أسرع بكثير.', icon: '🏆' }
]

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-600',   border: 'border-blue-200',   light: 'bg-blue-50'   },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-200', light: 'bg-violet-50' },
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-600',  border: 'border-amber-200',  light: 'bg-amber-50'  },
  emerald:{ bg: 'bg-emerald-100',text: 'text-emerald-600',border: 'border-emerald-200',light: 'bg-emerald-50'},
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', light: 'bg-orange-50' },
  cyan:   { bg: 'bg-cyan-100',   text: 'text-cyan-600',   border: 'border-cyan-200',   light: 'bg-cyan-50'   },
  pink:   { bg: 'bg-pink-100',   text: 'text-pink-600',   border: 'border-pink-200',   light: 'bg-pink-50'   }
}

export default function LearnPage() {
  const [expandedDay, setExpandedDay] = useState<number | null>(2)
  const doneCount = weeklyPlan.filter(d => d.status === 'done').length
  const totalXP = weeklyPlan.filter(d => d.status === 'done').reduce((s, d) => s + d.xp, 0)

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background: 'linear-gradient(160deg, #f8faff 0%, #eef4ff 40%, #f0faf8 100%)',
        fontFamily: "'Tajawal', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: var(--progress-w); }
        }

        .fade-up { animation: fadeUp 0.55s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.55s 0.08s ease forwards; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.55s 0.16s ease forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.55s 0.24s ease forwards; opacity: 0; }

        .day-card {
          transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
          border: 1.5px solid #e2e8f0;
        }
        .day-card:hover:not(.locked-card) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,99,235,0.1);
          border-color: #bfdbfe;
        }
        .locked-card { opacity: 0.55; cursor: not-allowed; }

        .progress-bar-inner {
          --progress-w: ${Math.round((doneCount / weeklyPlan.length) * 100)}%;
          animation: progressFill 1s 0.4s ease forwards;
          width: 0%;
        }

        .tip-card {
          transition: all 0.22s ease;
          border: 1.5px solid #e2e8f0;
        }
        .tip-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(15,23,42,0.08);
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ═══ HERO CARD ═══ */}
        <section
          className="rounded-3xl p-8 lg:p-10 text-right fade-up relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
            boxShadow: '0 24px 60px rgba(15,23,42,0.2)'
          }}
        >
          {/* Blob */}
          <div style={{
            position:'absolute', top:-60, left:-60, width:260, height:260,
            background:'rgba(14,165,233,0.15)', borderRadius:'50%', filter:'blur(50px)', pointerEvents:'none'
          }} />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', color:'#7dd3fc' }}
              >
                <IoFlash className="w-4 h-4 text-amber-400" />
                خطة تعلم عملية — 7 أيام قابلة للتكرار
              </div>

              <h1
                className="font-extrabold text-white mb-3 leading-tight"
                style={{ fontSize:'clamp(1.7rem, 4vw, 2.6rem)' }}
              >
                رحلة 7 أيام
                <span
                  className="block"
                  style={{
                    background:'linear-gradient(135deg, #38bdf8, #6ee7b7)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
                  }}
                >
                  خطوات صغيرة = تقدم ثابت
                </span>
              </h1>
              <p className="text-slate-400 leading-7 text-base" style={{ maxWidth:480 }}>
                كل يوم له مهمة واحدة واضحة. مش محتاج ساعات — <strong className="text-slate-200">15 دقيقة كفاية</strong> لو اتعملت صح.
              </p>
            </div>

            {/* Stats mini */}
            <div className="flex gap-4 lg:flex-col lg:items-end">
              <div
                className="text-center px-5 py-4 rounded-2xl"
                style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="font-extrabold text-2xl mb-0.5"
                  style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#38bdf8' }}
                >
                  {doneCount}/7
                </div>
                <div className="text-slate-400 text-xs">أيام مكتملة</div>
              </div>
              <div
                className="text-center px-5 py-4 rounded-2xl"
                style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="font-extrabold text-2xl mb-0.5"
                  style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#6ee7b7' }}
                >
                  {totalXP}
                </div>
                <div className="text-slate-400 text-xs">XP مكتسبة</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 relative">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>التقدم الأسبوعي</span>
              <span>{Math.round((doneCount / weeklyPlan.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background:'rgba(255,255,255,0.1)' }}>
              <div
                className="progress-bar-inner h-2 rounded-full"
                style={{ background:'linear-gradient(90deg, #38bdf8, #6ee7b7)' }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 24px rgba(14,165,233,0.3)' }}
            >
              <IoPlay className="w-4 h-4" />
              ابدأ التنفيذ الآن
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all"
              style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#cbd5e1' }}
            >
              اختبر مستواك أولاً
              <IoArrowBack className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ═══ WEEKLY PLAN ═══ */}
        <section className="fade-up-1">
          <div className="text-right mb-5">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">الخطة التفصيلية</p>
            <h2 className="text-xl font-extrabold text-slate-900">خطة الأسبوع — يوم بيوم</h2>
            <p className="text-slate-500 text-sm mt-1">اضغط على أي يوم لتشوف التفاصيل والنصيحة.</p>
          </div>

          <div className="space-y-3">
            {weeklyPlan.map((item, idx) => {
              const Icon = item.icon
              const c = colorMap[item.color]
              const isOpen = expandedDay === idx
              const isLocked = item.status === 'locked'
              const isDone = item.status === 'done'

              return (
                <article
                  key={item.day}
                  className={`day-card bg-white rounded-2xl overflow-hidden ${isLocked ? 'locked-card' : ''}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <button
                    className="w-full text-right px-5 py-4 flex items-center gap-4"
                    onClick={() => !isLocked && setExpandedDay(isOpen ? null : idx)}
                    disabled={isLocked}
                  >
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}>
                      {isDone
                        ? <IoCheckmarkCircle className="w-6 h-6 text-emerald-500" />
                        : isLocked
                        ? <IoLockClosed className="w-5 h-5 text-slate-400" />
                        : <Icon className="w-6 h-6" />
                      }
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-bold ${c.text}`}>{item.day}</span>
                        {item.status === 'active' && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">الآن</span>
                        )}
                        {isDone && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">✓ مكتمل</span>
                        )}
                      </div>
                      <p className="font-bold text-slate-800 text-sm">{item.task}</p>
                    </div>

                    {/* Meta */}
                    <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400 flex-shrink-0">
                      <span className="flex items-center gap-1"><IoTime className="w-3.5 h-3.5" />{item.duration}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-500"><IoFlame className="w-3.5 h-3.5" />{item.xp} XP</span>
                    </div>

                    {!isLocked && (
                      <div className="text-slate-400 flex-shrink-0">
                        {isOpen ? <IoChevronUp className="w-4 h-4" /> : <IoChevronDown className="w-4 h-4" />}
                      </div>
                    )}
                  </button>

                  {/* Expanded */}
                  {isOpen && !isLocked && (
                    <div
                      className={`px-5 pb-5 pt-1 ${c.light} border-t ${c.border}`}
                    >
                      <div className="flex items-start gap-3">
                        <IoSparkles className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.text}`} />
                        <p className="text-sm text-slate-600 leading-7">{item.tip}</p>
                      </div>
                      <div className="mt-3 flex gap-2 justify-end">
                        <Link
                          href={`/practice?day=${idx + 1}`}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl text-white transition-all hover:-translate-y-0.5`}
                          style={{ background: `linear-gradient(135deg, #2563eb, #0ea5e9)` }}
                        >
                          <IoPlay className="w-3.5 h-3.5" />
                          ابدأ اليوم
                        </Link>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        {/* ═══ LEVEL TIPS ═══ */}
        <section className="fade-up-2">
          <div className="text-right mb-5">
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">نصائح حسب المستوى</p>
            <h2 className="text-xl font-extrabold text-slate-900">كيف تتعلم بذكاء — لكل مستوى</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {levelTips.map((tip) => (
              <div key={tip.level} className="tip-card bg-white rounded-2xl p-5 text-right">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <div
                  className="inline-block text-xs font-extrabold px-3 py-1 rounded-full mb-3"
                  style={{ background:'#f0f9ff', color:'#0369a1', border:'1px solid #bae6fd' }}
                >
                  {tip.level}
                </div>
                <p className="text-sm text-slate-600 leading-7">{tip.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ BOTTOM CTA ═══ */}
        <section className="fade-up-3 pb-4">
          <div
            className="rounded-3xl p-8 text-center relative overflow-hidden"
            style={{
              background:'linear-gradient(135deg, #eff6ff, #f0fdfa)',
              border:'1.5px solid #bfdbfe'
            }}
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-extrabold text-slate-900 text-xl mb-2">جاهز تبدأ؟</h3>
            <p className="text-slate-500 text-sm mb-5">لو مش عارف مستواك، ابدأ باختبار المستوى الأول.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm"
                style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 20px rgba(37,99,235,0.25)' }}
              >
                <IoFlash className="w-4 h-4" />
                اختبار تحديد المستوى
              </Link>
              <Link
                href="/vocabulary"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border-2 border-slate-200 text-slate-700 bg-white hover:border-blue-300 transition-all"
              >
                <IoBook className="w-4 h-4" />
                ابدأ بالمفردات
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}