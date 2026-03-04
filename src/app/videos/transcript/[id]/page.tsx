'use client'
import { useState } from 'react'
import Link from 'next/link'
import { IoArrowBack, IoArrowForward, IoCheckmarkCircle, IoCloseCircle, IoBookOutline, IoFlame } from 'react-icons/io5'

// ─── Data ─────────────────────────────────────────────────
const transcriptsData: Record<string, {
  title: string; level: string; thumbnail: string
  transcript: { time: string; text: string; highlight?: string }[]
  questions: { id: string; text: string; options: { id: string; text: string; correct: boolean }[]; explanation: string }[]
}> = {
  '1': {
    title:'طلب في مطعم', level:'A1',
    thumbnail:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    transcript:[
      { time:'0:05', text:"Waiter: Good evening! Are you ready to order?", highlight:'ready to order' },
      { time:'0:10', text:"Customer: Yes, I'd like the grilled chicken, please.", highlight:"I'd like" },
      { time:'0:15', text:"Waiter: Excellent choice! Anything to drink?", highlight:'Anything to drink' },
      { time:'0:20', text:"Customer: Just water, thank you.", highlight:'Just water' },
      { time:'0:30', text:"Customer: Can I have the bill, please?", highlight:'Can I have the bill' },
      { time:'0:35', text:"Waiter: Of course! Here you go.", highlight:'Here you go' },
    ],
    questions:[
      {
        id:'q1', text:'ماذا طلب الزبون للشرب؟',
        explanation:'قال الزبون "Just water" — فقط ماء.',
        options:[
          { id:'a', text:'عصير',         correct:false },
          { id:'b', text:'ماء فقط',      correct:true  },
          { id:'c', text:'قهوة',         correct:false },
          { id:'d', text:'لم يطلب شيئاً', correct:false },
        ]
      },
      {
        id:'q2', text:'ما معنى "Can I have the bill"؟',
        explanation:'"Can I have the bill" = هل يمكنني الحصول على الفاتورة؟',
        options:[
          { id:'a', text:'هل يمكنني الطلب مرة أخرى؟', correct:false },
          { id:'b', text:'هل الطعام جيد؟',              correct:false },
          { id:'c', text:'هل يمكنني الحصول على الفاتورة؟', correct:true },
          { id:'d', text:'هل يمكنني تغيير الطلب؟',     correct:false },
        ]
      },
      {
        id:'q3', text:'كيف قال الزبون أنه يريد الدجاج؟',
        explanation:"I'd like = أود / أريد — هذه الصيغة أكثر أدباً من I want.",
        options:[
          { id:'a', text:'I want chicken',          correct:false },
          { id:'b', text:"I'd like the grilled chicken", correct:true },
          { id:'c', text:'Give me chicken',          correct:false },
          { id:'d', text:'Chicken please',           correct:false },
        ]
      },
    ]
  },
  '2': {
    title:'التقديم لوظيفة', level:'B1',
    thumbnail:'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
    transcript:[
      { time:'0:10', text:"Interviewer: Tell me about yourself.", highlight:'Tell me about yourself' },
      { time:'0:20', text:"Candidate: I have five years of experience in marketing.", highlight:'years of experience' },
      { time:'0:30', text:"Interviewer: What are your strengths?", highlight:'strengths' },
      { time:'0:40', text:"Candidate: I'm a team player and I'm very organized.", highlight:'team player' },
      { time:'0:55', text:"Interviewer: Where do you see yourself in five years?", highlight:'five years' },
      { time:'1:05', text:"Candidate: I hope to grow with this company.", highlight:'grow with' },
    ],
    questions:[
      {
        id:'q1', text:'كم سنة خبرة لدى المتقدم؟',
        explanation:'قال "I have five years of experience" = لدي خمس سنوات خبرة.',
        options:[
          { id:'a', text:'سنتان',    correct:false },
          { id:'b', text:'ثلاث سنوات', correct:false },
          { id:'c', text:'خمس سنوات', correct:true  },
          { id:'d', text:'عشر سنوات', correct:false },
        ]
      },
      {
        id:'q2', text:'ما معنى "team player"؟',
        explanation:'"team player" = شخص يعمل بروح الفريق ويتعاون مع الآخرين.',
        options:[
          { id:'a', text:'لاعب كرة قدم',             correct:false },
          { id:'b', text:'شخص يعمل بمفرده',           correct:false },
          { id:'c', text:'شخص يعمل بروح الفريق',       correct:true  },
          { id:'d', text:'شخص يحب الألعاب',           correct:false },
        ]
      },
    ]
  },
}

const defaultTranscript = transcriptsData['1']

function getLevelStyle(level: string) {
  if (level === 'A1') return { bg:'#dcfce7', color:'#15803d', border:'#bbf7d0' }
  if (level === 'A2') return { bg:'#d1fae5', color:'#065f46', border:'#a7f3d0' }
  if (level === 'B1') return { bg:'#dbeafe', color:'#1d4ed8', border:'#bfdbfe' }
  if (level === 'B2') return { bg:'#ede9fe', color:'#6d28d9', border:'#ddd6fe' }
  return { bg:'#fce7f3', color:'#9d174d', border:'#fbcfe8' }
}

export default function TranscriptPage({ params }: { params: { id: string } }) {
  const data = transcriptsData[params.id] ?? defaultTranscript
  const ls = getLevelStyle(data.level)

  const [answers,  setAnswers]  = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = submitted
    ? data.questions.filter(q => data.questions.find(dq => dq.id === q.id)?.options.find(o => o.id === answers[q.id])?.correct).length
    : 0
  const scorePercent = submitted ? Math.round((score / data.questions.length) * 100) : 0

  function handleSelect(qId: string, oId: string) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qId]: oId }))
  }

  return (
    <div className="min-h-screen py-10"
      style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}</style>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/videos" className="hover:text-blue-600 font-bold transition-colors flex items-center gap-1">
            <IoArrowForward className="w-4 h-4" /> الفيديوهات
          </Link>
          <span>/</span>
          <Link href={`/videos/play/${params.id}`} className="hover:text-blue-600 transition-colors">{data.title}</Link>
          <span>/</span>
          <span className="text-slate-600">النص والاختبار</span>
        </div>

        {/* ─── Transcript ─── */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ border:'1.5px solid #e2e8f0', boxShadow:'0 8px 24px rgba(15,23,42,0.06)' }}>
          {/* Header image */}
          <div className="relative" style={{ height:120 }}>
            <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover opacity-50" />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.8))' }} />
            <div className="absolute inset-0 flex items-center px-6">
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>{data.level}</span>
                  <span className="text-white/60 text-xs"><IoBookOutline className="w-3 h-3 inline mr-1" />نص الفيديو</span>
                </div>
                <h1 className="font-extrabold text-white text-xl">{data.title}</h1>
              </div>
            </div>
          </div>

          {/* Transcript lines */}
          <div className="p-6 space-y-3" dir="ltr">
            {data.transcript.map((line, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xs text-slate-400 font-mono mt-1 flex-shrink-0 w-10">{line.time}</span>
                <p className="text-slate-700 text-sm leading-7">
                  {line.highlight
                    ? line.text.split(line.highlight).map((part, j, arr) => (
                        <span key={j}>{part}{j < arr.length-1 && (
                          <span className="font-bold px-1 rounded" style={{ background:'rgba(37,99,235,0.1)', color:'#2563eb' }}>{line.highlight}</span>
                        )}</span>
                      ))
                    : line.text
                  }
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Questions ─── */}
        <div className="rounded-3xl overflow-hidden" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow:'0 20px 50px rgba(15,23,42,0.2)' }}>
          <div className="px-6 pt-6 pb-2 flex items-center justify-between">
            <span className="text-slate-400 text-sm">{data.questions.length} أسئلة</span>
            <h2 className="font-extrabold text-white text-lg">اختبار الفهم</h2>
          </div>

          <div className="px-6 pb-6 space-y-5 mt-4">
            {data.questions.map((q, qi) => {
              const selectedId = answers[q.id]
              const isAnswered = !!selectedId
              const selectedCorrect = q.options.find(o => o.id === selectedId)?.correct

              return (
                <div key={q.id} className="rounded-2xl overflow-hidden" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-5 py-4 border-b border-white/5">
                    <p className="text-white font-bold text-sm text-right">
                      <span className="text-slate-500 ml-2">{qi+1}.</span> {q.text}
                    </p>
                  </div>
                  <div className="p-4 grid grid-cols-1 gap-2">
                    {q.options.map(opt => {
                      const isSelected = selectedId === opt.id
                      let style: React.CSSProperties = { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#cbd5e1', cursor: submitted ? 'default':'pointer' }
                      if (submitted) {
                        if (opt.correct)       style = { ...style, background:'rgba(16,185,129,0.2)',  border:'1px solid #10b981', color:'#6ee7b7' }
                        else if (isSelected)   style = { ...style, background:'rgba(239,68,68,0.15)',  border:'1px solid #ef4444', color:'#fca5a5' }
                      } else if (isSelected)   style = { ...style, background:'rgba(37,99,235,0.25)',  border:'1px solid #3b82f6', color:'white'   }

                      return (
                        <button key={opt.id} onClick={() => handleSelect(q.id, opt.id)}
                          className="text-right rounded-xl px-4 py-2.5 font-bold text-xs flex items-center justify-between transition-all duration-150"
                          style={style}
                        >
                          <span>{opt.text}</span>
                          {submitted && opt.correct             && <IoCheckmarkCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                          {submitted && isSelected && !opt.correct && <IoCloseCircle    className="w-4 h-4 text-red-400    flex-shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                  {submitted && (
                    <div className="mx-4 mb-4 rounded-xl px-4 py-3 text-xs" style={{ background: selectedCorrect ? 'rgba(16,185,129,0.1)':'rgba(239,68,68,0.08)', border:`1px solid ${selectedCorrect ? '#10b981':'#ef4444'}`, color: selectedCorrect ? '#6ee7b7':'#fca5a5' }}>
                      {selectedCorrect ? '🎉 ' : '❌ '}{q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Submit / Score */}
          <div className="px-6 pb-6">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(answers).length < data.questions.length}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 24px rgba(37,99,235,0.25)' }}
              >
                تحقق من الإجابات ({Object.keys(answers).length}/{data.questions.length})
              </button>
            ) : (
              <div className="rounded-2xl p-5 text-center" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-3xl mb-2">{scorePercent >= 80 ? '🏆' : scorePercent >= 50 ? '💪' : '📖'}</div>
                <div className="font-extrabold text-2xl text-white mb-1">{score}/{data.questions.length}</div>
                <div className="text-slate-400 text-sm mb-3">{scorePercent}% إجابات صحيحة</div>
                <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-bold mb-4">
                  <IoFlame className="w-4 h-4" /> +{Math.round(scorePercent / 10) * 5} XP مكتسبة
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setAnswers({}); setSubmitted(false) }} className="flex-1 py-2.5 rounded-xl font-bold text-sm border border-white/20 text-slate-300">
                    حاول مرة تانية
                  </button>
                  <Link href="/videos" className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm text-center" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)' }}>
                    فيديوهات تانية
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <Link href={`/videos/play/${params.id}`} className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors py-2">
          <IoArrowBack className="w-4 h-4" /> الرجوع للفيديو
        </Link>

      </div>
    </div>
  )
}
