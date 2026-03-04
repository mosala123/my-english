import Link from 'next/link'
import { IoBookOutline, IoArrowBack, IoTime, IoTrophy, IoFlame, IoStatsChart } from 'react-icons/io5'

// ─── Types ────────────────────────────────────────────────
export interface VocabPack {
  id: string | number
  title: string
  description: string
  total: number
  level: string
  minutes: number
  emoji: string
  image: string
  tag?: string
}

// ─── Default Data (يُستبدل بـ props أو DB لاحقاً) ────────
const defaultPacks: VocabPack[] = [
  {
    id: 1,
    title: 'الحياة اليومية',
    description: 'كلمات تستخدمها كل يوم في المنزل والشارع والتسوق.',
    total: 30, level: 'A1-A2', minutes: 15, emoji: '🏠',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    tag: 'الأكثر شعبية'
  },
  {
    id: 2,
    title: 'العمل والاجتماعات',
    description: 'مصطلحات المكتب والبريد الإلكتروني والعروض التقديمية.',
    total: 25, level: 'B1', minutes: 12, emoji: '💼',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  },
  {
    id: 3,
    title: 'السفر والمطار',
    description: 'كل ما تحتاجه في المطار والفندق والسياحة.',
    total: 20, level: 'A2-B1', minutes: 10, emoji: '✈️',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80',
    tag: 'جديد'
  },
  {
    id: 4,
    title: 'الدراسة الأكاديمية',
    description: 'مفردات الجامعة والأبحاث والنقاشات الأكاديمية.',
    total: 18, level: 'B2', minutes: 10, emoji: '📚',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
  },
  {
    id: 5,
    title: 'الصحة والطب',
    description: 'كلمات مهمة عند الطبيب والصيدلية ووصف الأعراض.',
    total: 22, level: 'B1', minutes: 11, emoji: '🏥',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80',
  },
  {
    id: 6,
    title: 'التكنولوجيا والإنترنت',
    description: 'مصطلحات التقنية والسوشيال ميديا والبرمجة.',
    total: 28, level: 'B2-C1', minutes: 14, emoji: '💻',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    tag: 'مميز'
  },
]

// ─── Helpers ──────────────────────────────────────────────
function getLevelStyle(level: string) {
  if (level.startsWith('A')) return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' }
  if (level.startsWith('B')) return { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' }
  return                            { bg: '#ede9fe', color: '#6d28d9', border: '#ddd6fe' }
}

function getTagStyle(tag: string) {
  if (tag === 'الأكثر شعبية') return { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' }
  if (tag === 'جديد')         return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' }
  return                             { bg: '#fefce8', color: '#a16207', border: '#fef08a' }
}

// ─── Component ────────────────────────────────────────────
export default function VocabularyPage({ packs = defaultPacks }: { packs?: VocabPack[] }) {
  const totalWords = packs.reduce((s, p) => s + p.total, 0)

  return (
    <div
      className="min-h-screen py-10"
      style={{ background: 'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily: "'Tajawal',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');
        .pack-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
        .pack-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(37,99,235,0.13) !important; border-color: #93c5fd !important; }
        .pack-card:hover .pack-img { transform: scale(1.05); }
        .pack-img { transition: transform 0.4s ease; }
        .cta-arrow { transition: gap 0.2s ease; }
        .pack-card:hover .cta-arrow { gap: 10px; }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ─── Hero ─── */}
        <section
          className="rounded-3xl p-8 lg:p-10 text-right relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', boxShadow: '0 24px 60px rgba(15,23,42,0.2)' }}
        >
          <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, background:'rgba(14,165,233,0.15)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, background:'rgba(16,185,129,0.1)', borderRadius:'50%', filter:'blur(50px)', pointerEvents:'none' }} />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-4" style={{ background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', color:'#7dd3fc' }}>
                <IoBookOutline className="w-4 h-4" /> بنك المفردات
              </div>

              <h1 className="font-extrabold text-white mb-3 leading-tight" style={{ fontSize:'clamp(1.8rem,4vw,2.6rem)' }}>
                مفردات + اختبار فوري
                <span className="block mt-1" style={{ background:'linear-gradient(135deg,#38bdf8,#6ee7b7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  تعلم بالسياق مش بالحفظ
                </span>
              </h1>

              <p className="text-slate-400 leading-7" style={{ maxWidth:440 }}>
                تعلم الكلمة في جملة حقيقية، ثم اختبر نفسك مباشرة —
                <strong className="text-slate-200"> بدون تكرار ممل</strong>.
              </p>

              <div className="flex flex-wrap gap-5 mt-6">
                {[
                  { icon: IoBookOutline, text: `${totalWords}+ كلمة`, color:'#38bdf8' },
                  { icon: IoFlame,       text: `${packs.length} موضوع`,  color:'#fbbf24' },
                  { icon: IoTrophy,      text: 'تصحيح فوري',            color:'#6ee7b7' },
                  { icon: IoStatsChart,  text: '4 مستويات',             color:'#c4b5fd' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                    <Icon className="w-4 h-4" />{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image collage */}
            <div className="hidden lg:grid grid-cols-2 gap-2 flex-shrink-0" style={{ width: 220 }}>
              {defaultPacks.slice(0,4).map((p, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ height: 80 }}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-70" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Packs Grid ─── */}
        <section>
          <div className="text-right mb-6">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">اختر موضوعك</p>
            <h2 className="text-xl font-extrabold text-slate-900">
              باكات المفردات
              <span className="text-sm font-semibold text-slate-400 mr-2">({packs.length} باك)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packs.map(pack => {
              const ls = getLevelStyle(pack.level)
              return (
                <Link
                  key={pack.id}
                  href={`/vocabulary/practice/${pack.id}`}
                  className="pack-card bg-white rounded-2xl overflow-hidden flex flex-col"
                  style={{ border:'1.5px solid #e2e8f0', boxShadow:'0 2px 8px rgba(15,23,42,0.05)' }}
                >
                  {/* Image */}
                  <div className="overflow-hidden relative" style={{ height: 140 }}>
                    <img src={pack.image} alt={pack.title} className="pack-img w-full h-full object-cover" />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.6))' }} />

                    {/* Tags overlay */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>
                        {pack.level}
                      </span>
                    </div>
                    {pack.tag && (
                      <div className="absolute top-3 left-3">
                        {(() => { const ts = getTagStyle(pack.tag!); return (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>
                            {pack.tag}
                          </span>
                        )})()}
                      </div>
                    )}

                    {/* Emoji bottom */}
                    <div className="absolute bottom-2 right-3 text-2xl">{pack.emoji}</div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1 text-right">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base mb-1">{pack.title}</h3>
                      <p className="text-xs text-slate-500 leading-5">{pack.description}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-auto">
                      <span className="flex items-center gap-1"><IoBookOutline className="w-3.5 h-3.5" />{pack.total} كلمة</span>
                      <span className="flex items-center gap-1"><IoTime className="w-3.5 h-3.5" />{pack.minutes} دقيقة</span>
                    </div>

                    <div className="cta-arrow flex items-center gap-1.5 text-sm font-bold" style={{ color:'#2563eb' }}>
                      ابدأ التدريب <IoArrowBack className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}