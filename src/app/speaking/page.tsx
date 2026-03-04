// app/speaking/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  IoMic, IoArrowBack, IoTime, IoFlame, IoSparkles,
  IoStatsChart, IoCheckmarkCircle, IoTrophy, IoPlay
} from 'react-icons/io5'
import { tasks, levels } from './data'

// دوال مساعدة
function getLevelStyle(level: string) {
  return levels.find(l => l.label === level)?.color ?? { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' }
}

function getTagStyle(tag: string) {
  if (tag === 'للمبتدئين') return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' }
  if (tag === 'الأكثر شعبية') return { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' }
  if (tag === 'تحدي') return { bg: '#fff1f2', color: '#be123c', border: '#fecdd3' }
  if (tag === 'متقدم') return { bg: '#fdf4ff', color: '#7e22ce', border: '#e9d5ff' }
  if (tag === 'جديد') return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' }
  return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' }
}

const heroStats = [
  { icon: IoMic, value: `${tasks.length} مهمة`, color: '#38bdf8' },
  { icon: IoStatsChart, value: '5 مستويات', color: '#a78bfa' },
  { icon: IoTrophy, value: 'تقييم ذاتي فوري', color: '#fbbf24' },
  { icon: IoFlame, value: 'نقاط XP لكل مهمة', color: '#6ee7b7' },
]

export default function SpeakingPage() {
  const router = useRouter()

  const handleStartExercise = (taskId: number) => {
    router.push(`/speaking/${taskId}`)
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{ background: 'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily: "'Tajawal', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');
        .task-card { 
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
          border: 1.5px solid #e2e8f0; 
          cursor: pointer;
        }
        .task-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.12) !important; 
          border-color: #93c5fd !important; 
        }
        .task-card:hover .task-img { 
          transform: scale(1.06); 
        }
        .task-img { 
          transition: transform 0.4s ease; 
        }
        .mic-pulse { 
          animation: mic-ping 2s ease-in-out infinite; 
        }
        @keyframes mic-ping { 
          0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); } 
          50% { box-shadow: 0 0 0 12px rgba(14, 165, 233, 0); } 
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Section */}
        <section
          className="rounded-3xl p-8 lg:p-10 text-right relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', boxShadow: '0 24px 60px rgba(15,23,42,0.2)' }}
        >
          <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'rgba(14,165,233,0.15)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, background: 'rgba(139,92,246,0.12)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', color: '#7dd3fc' }}>
                <IoMic className="w-4 h-4" /> محادثة ونطق
              </div>

              <h1 className="font-extrabold text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
                اختبر نطقك وطلاقتك
                <span className="block mt-1" style={{ background: 'linear-gradient(135deg,#38bdf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  تكلّم وتحسّن كل يوم
                </span>
              </h1>

              <p className="text-slate-400 leading-7" style={{ maxWidth: 440 }}>
                مهام قصيرة مع <strong className="text-slate-200">نصائح مباشرة وتقييم ذاتي</strong> —
                لأن التحسن الحقيقي يبدأ بالكلام مش بالحفظ.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                {heroStats.map(({ icon: Icon, value, color }) => (
                  <div key={value} className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                    <Icon className="w-4 h-4" />{value}
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Mic */}
            <div className="hidden lg:flex flex-col items-center gap-4 flex-shrink-0">
              <div className="mic-pulse w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563eb,#0ea5e9)' }}>
                <IoMic className="w-9 h-9 text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">جاهز للتسجيل؟</p>
                <p className="text-slate-400 text-xs">اضغط على أي مهمة</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2" style={{ width: 180 }}>
                {tasks.slice(0, 4).map((t, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ height: 70 }}>
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Level Badges */}
        <section>
          <div className="flex flex-wrap gap-3">
            {levels.map(l => (
              <div key={l.label} className="flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-sm"
                style={{ background: l.color.bg, color: l.color.text, borderColor: l.color.border }}>
                {l.label}
                <span className="font-medium opacity-70 text-xs">{l.desc}</span>
                <span className="text-xs opacity-60">({tasks.filter(t => t.level === l.label).length} مهمة)</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks Grid */}
        <section>
          <div className="text-right mb-6">
            <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-1">اختر مهمتك</p>
            <h2 className="text-xl font-extrabold text-slate-900">
              مهام التحدث
              <span className="text-sm font-semibold text-slate-400 mr-2">({tasks.length} مهمة)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map(task => {
              const ls = getLevelStyle(task.level)
              return (
                <div
                  key={task.id}
                  onClick={() => handleStartExercise(task.id)}
                  className="task-card bg-white rounded-2xl overflow-hidden flex flex-col"
                  style={{ boxShadow: '0 2px 8px rgba(15,23,42,0.05)' }}
                >
                  {/* Image */}
                  <div className="overflow-hidden relative" style={{ height: 140 }}>
                    <img src={task.image} alt={task.title} className="task-img w-full h-full object-cover" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(15,23,42,0.7))' }} />

                    {/* Level */}
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full border"
                        style={{ background: ls.bg, color: ls.text, borderColor: ls.border }}>
                        {task.level}
                      </span>
                    </div>

                    {/* Tag */}
                    {task.tag && (
                      <div className="absolute top-3 left-3">
                        {(() => {
                          const ts = getTagStyle(task.tag!); return (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full border"
                              style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>
                              {task.tag}
                            </span>
                          )
                        })()}
                      </div>
                    )}

                    {/* Bottom */}
                    <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
                      <span className="text-white/70 text-xs flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        <IoTime className="w-3 h-3" />{task.duration}
                      </span>
                      <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                        <IoFlame className="w-3 h-3" />{task.xp} XP
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1 text-right">
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-0.5">{task.subtitle}</p>
                      <h3 className="font-extrabold text-slate-900 text-base mb-1">{task.title}</h3>
                      <p className="text-xs text-slate-500 leading-5">{task.hint}</p>
                    </div>

                    {/* Tips */}
                    <div className="rounded-xl p-3 space-y-1" style={{ background: '#f8faff', border: '1px solid #e2e8f0' }}>
                      {task.tips.map((tip, i) => (
                        <p key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                          <IoCheckmarkCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {tip}
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{task.category}</span>
                      <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: '#7c3aed' }}>
                        ابدأ المهمة <IoArrowBack className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tips Banner */}
        <section>
          <div className="text-right mb-5">
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">نصائح التحدث</p>
            <h2 className="text-xl font-extrabold text-slate-900">كيف تتحسن أسرع</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: '🎙️', tip: 'سجّل نفسك واستمع للتسجيل — الاستماع لنفسك هو أسرع طريقة لاكتشاف الأخطاء.' },
              { emoji: '⏱️', tip: 'لا تتوقف لما تغلط — الاستمرارية أهم من الدقة في مرحلة التعلم.' },
              { emoji: '🔁', tip: 'كرر كل مهمة 3 مرات — المرة الثالثة ستكون أفضل بكتير من الأولى.' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-right" style={{ border: '1.5px solid #e2e8f0', transition: 'all 0.2s ease' }}>
                <div className="text-3xl mb-3">{t.emoji}</div>
                <p className="text-sm text-slate-600 leading-7">{t.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-4">
          <div className="rounded-3xl p-7 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow: '0 20px 50px rgba(15,23,42,0.18)' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'rgba(139,92,246,0.2)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 text-right">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <IoSparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-300 text-sm font-bold">ابدأ من المستوى المناسب</span>
                </div>
                <p className="text-white font-bold">مش عارف مستواك؟ اعمل اختبار تحديد المستوى أولاً.</p>
                <p className="text-slate-400 text-sm mt-1">5 دقائق كافية لتحديد نقطة بدايتك الصحيحة.</p>
              </div>
              <Link href="/assessment"
                className="flex-shrink-0 inline-flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', boxShadow: '0 8px 20px rgba(124,58,237,0.3)' }}>
                <IoPlay className="w-4 h-4" /> اختبر مستواك
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
