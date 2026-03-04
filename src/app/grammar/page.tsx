import Link from 'next/link'
import { IoArrowBack, IoCheckmarkCircle, IoBookOutline, IoFlash, IoTime, IoTrophy, IoSparkles } from 'react-icons/io5'

// ─── Data ─────────────────────────────────────────────────
const lessons = [
  {
    id: 1,
    title: 'المضارع البسيط',
    subtitle: 'Simple Present',
    desc: 'استخدامه مع العادات اليومية والحقائق الثابتة.',
    detail: 'نضيف s أو es للفعل مع he/she/it. مثال: She works every day.',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&q=80',
    emoji: '📅',
    level: 'A1',
    minutes: 8,
    tag: 'الأساسيات',
    examples: ['She reads every morning.', 'They play football on weekends.'],
    color: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' }
  },
  {
    id: 2,
    title: 'الماضي البسيط',
    subtitle: 'Simple Past',
    desc: 'سرد أحداث انتهت في الماضي بوقت محدد.',
    detail: 'نضيف ed للأفعال المنتظمة. الأفعال الشاذة لها صيغة خاصة.',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&q=80',
    emoji: '⏮️',
    level: 'A2',
    minutes: 10,
    tag: null,
    examples: ['He visited Paris last year.', 'She went to the market yesterday.'],
    color: { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' }
  },
  {
    id: 3,
    title: 'المستقبل',
    subtitle: 'Will / Going to',
    desc: 'التخطيط والوعود والقرارات اللحظية.',
    detail: 'will للقرارات اللحظية والوعود. going to للخطط المسبقة.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
    emoji: '🚀',
    level: 'B1',
    minutes: 12,
    tag: 'مهم',
    examples: ["I'll call you later.", "We're going to travel next month."],
    color: { bg: '#ede9fe', text: '#6d28d9', border: '#ddd6fe' }
  },
  {
    id: 4,
    title: 'روابط الجمل',
    subtitle: 'Conjunctions',
    desc: 'ربط الأفكار بـ because, although, however.',
    detail: 'because للسبب، although للتناقض، however للتحول في الفكرة.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80',
    emoji: '🔗',
    level: 'B1',
    minutes: 10,
    tag: null,
    examples: ['I was tired, however I finished.', 'Although it rained, we went out.'],
    color: { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' }
  },
  {
    id: 5,
    title: 'المبني للمجهول',
    subtitle: 'Passive Voice',
    desc: 'التركيز على الفعل لا على الفاعل.',
    detail: 'نستخدم be + past participle. مثال: The report was written by Ahmed.',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80',
    emoji: '🔄',
    level: 'B2',
    minutes: 14,
    tag: 'متقدم',
    examples: ['The car was repaired.', 'Mistakes were made.'],
    color: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' }
  },
  {
    id: 6,
    title: 'الجمل الشرطية',
    subtitle: 'Conditionals',
    desc: 'If الأولى والثانية والثالثة بالتفصيل.',
    detail: 'First: حقيقي. Second: خيالي. Third: ماضي افتراضي.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80',
    emoji: '🤔',
    level: 'B2',
    minutes: 15,
    tag: 'متقدم',
    examples: ['If I had time, I would travel.', 'If it rains, I will stay home.'],
    color: { bg: '#fefce8', text: '#a16207', border: '#fef08a' }
  },
]

const tips = [
  { icon: '🎯', text: 'ركّز على جودة الجملة مش عدد الجمل — جملة صح تساوي عشرة جمل غلط.' },
  { icon: '🔁', text: 'كرر القاعدة في سياقات مختلفة — مش بس في التمارين.' },
  { icon: '✍️', text: 'اكتب 3 جمل من عندك بعد كل قاعدة عشان تثبتها في دماغك.' },
]

export default function GrammarPage() {
  const totalMinutes = lessons.reduce((s, l) => s + l.minutes, 0)

  return (
    <div
      className="min-h-screen py-10"
      style={{ background: 'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily: "'Tajawal',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        .lesson-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); border: 1.5px solid #e2e8f0; }
        .lesson-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(37,99,235,0.12) !important; border-color: #93c5fd !important; }
        .lesson-card:hover .lesson-img { transform: scale(1.06); }
        .lesson-img { transition: transform 0.4s ease; }
        .tip-card { transition: all 0.2s ease; border: 1.5px solid #e2e8f0; }
        .tip-card:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(15,23,42,0.08); }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ─── Hero ─── */}
        <section
          className="rounded-3xl p-8 lg:p-10 text-right relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', boxShadow: '0 24px 60px rgba(15,23,42,0.2)' }}
        >
          <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, background:'rgba(14,165,233,0.15)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, background:'rgba(139,92,246,0.12)', borderRadius:'50%', filter:'blur(50px)', pointerEvents:'none' }} />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div
                className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', color:'#7dd3fc' }}
              >
                <IoBookOutline className="w-4 h-4" /> قواعد اللغة
              </div>

              <h1
                className="font-extrabold text-white mb-3 leading-tight"
                style={{ fontSize:'clamp(1.8rem,4vw,2.6rem)' }}
              >
                القواعد بطريقة تطبيقية
                <span
                  className="block mt-1"
                  style={{ background:'linear-gradient(135deg,#38bdf8,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}
                >
                  افهم ثم طبّق فوراً
                </span>
              </h1>

              <p className="text-slate-400 leading-7" style={{ maxWidth:440 }}>
                كل قاعدة معها <strong className="text-slate-200">سؤال مباشر</strong> وأمثلة حقيقية —
                عشان تثبت الفهم مش بس تحفظه.
              </p>

              <div className="flex flex-wrap gap-5 mt-6">
                {[
                  { icon: IoBookOutline, text: `${lessons.length} قاعدة`,       color:'#38bdf8' },
                  { icon: IoTime,        text: `${totalMinutes} دقيقة`,          color:'#a78bfa' },
                  { icon: IoFlash,       text: 'اختبار سريع بعد كل قاعدة',      color:'#fbbf24' },
                  { icon: IoTrophy,      text: '4 مستويات من A1 لـ B2',          color:'#6ee7b7' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                    <Icon className="w-4 h-4" />{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image grid */}
            <div className="hidden lg:grid grid-cols-2 gap-2 flex-shrink-0" style={{ width:220 }}>
              {lessons.slice(0,4).map((l, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ height:80 }}>
                  <img src={l.image} alt={l.title} className="w-full h-full object-cover opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Lessons Grid ─── */}
        <section>
          <div className="text-right mb-6">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">اختر القاعدة</p>
            <h2 className="text-xl font-extrabold text-slate-900">
              دروس القواعد
              <span className="text-sm font-semibold text-slate-400 mr-2">({lessons.length} درس)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lessons.map(lesson => (
              <Link
                key={lesson.id}
                href={`/practice/exercise/${lesson.id}`}
                className="lesson-card bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ boxShadow:'0 2px 8px rgba(15,23,42,0.05)' }}
              >
                {/* Image */}
                <div className="overflow-hidden relative" style={{ height:140 }}>
                  <img src={lesson.image} alt={lesson.title} className="lesson-img w-full h-full object-cover" />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 30%, rgba(15,23,42,0.65))' }} />

                  {/* Level badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full border"
                      style={{ background: lesson.color.bg, color: lesson.color.text, borderColor: lesson.color.border }}
                    >
                      {lesson.level}
                    </span>
                  </div>

                  {/* Tag */}
                  {lesson.tag && (
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        {lesson.tag}
                      </span>
                    </div>
                  )}

                  {/* Bottom info */}
                  <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <IoTime className="w-3 h-3" />{lesson.minutes} دقيقة
                    </span>
                    <span className="text-2xl">{lesson.emoji}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1 text-right">
                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-0.5">{lesson.subtitle}</p>
                    <h3 className="font-extrabold text-slate-900 text-base mb-1">{lesson.title}</h3>
                    <p className="text-xs text-slate-500 leading-5">{lesson.desc}</p>
                  </div>

                  {/* Examples */}
                  <div
                    className="rounded-xl p-3 space-y-1"
                    style={{ background:'#f8faff', border:'1px solid #e2e8f0' }}
                    dir="ltr"
                  >
                    {lesson.examples.map((ex, i) => (
                      <p key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <IoCheckmarkCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {ex}
                      </p>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1.5 text-sm font-bold mt-auto"
                    style={{ color:'#2563eb' }}
                  >
                    اختبار سريع <IoArrowBack className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Tips Section ─── */}
        <section>
          <div className="text-right mb-5">
            <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-1">نصائح التعلم</p>
            <h2 className="text-xl font-extrabold text-slate-900">كيف تستفيد أكتر</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="tip-card bg-white rounded-2xl p-5 text-right">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <p className="text-sm text-slate-600 leading-7">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="pb-4">
          <div
            className="rounded-3xl p-7 relative overflow-hidden"
            style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow:'0 20px 50px rgba(15,23,42,0.18)' }}
          >
            <div style={{ position:'absolute', top:-40, left:-40, width:180, height:180, background:'rgba(139,92,246,0.2)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 text-right">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <IoSparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-sm font-bold">نصيحة ذهبية</span>
                </div>
                <p className="text-white font-bold text-base">ركّز على جودة الجملة مش عدد الجمل.</p>
                <p className="text-slate-400 text-sm mt-1">جملة صح تساوي عشرة جمل غلط.</p>
              </div>
              <Link
                href="/practice"
                className="flex-shrink-0 inline-flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm"
                style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 20px rgba(37,99,235,0.3)' }}
              >
                <IoFlash className="w-4 h-4" />
                ابدأ التدريب
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}