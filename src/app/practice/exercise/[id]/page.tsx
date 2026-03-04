'use client'
import { useState } from 'react'
import Link from 'next/link'
import { IoArrowBack, IoArrowForward, IoCheckmarkCircle, IoCloseCircle, IoTime, IoFlame, IoTrophy } from 'react-icons/io5'

// ─── Data ─────────────────────────────────────────────────
const exercisesData: Record<string, {
  title: string
  subtitle: string
  level: string
  duration: string
  xp: number
  image: string
  questions: {
    id: string
    text: string
    highlightWord?: string
    type: 'mcq'
    options: { id: string; text: string; correct: boolean }[]
    explanation: string
  }[]
}> = {
  '1': {
    title: 'اختبار سريع — الأزمنة',
    subtitle: 'Simple Tenses',
    level: 'A2',
    duration: '5 دقائق',
    xp: 30,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80',
    questions: [
      {
        id: 'q1', type: 'mcq',
        text: 'She ___ to work every day.',
        highlightWord: '___',
        explanation: 'نستخدم goes لأن الفاعل she مفرد — نضيف s أو es في المضارع البسيط.',
        options: [
          { id: 'a', text: 'go',    correct: false },
          { id: 'b', text: 'goes',  correct: true  },
          { id: 'c', text: 'going', correct: false },
          { id: 'd', text: 'gone',  correct: false },
        ]
      },
      {
        id: 'q2', type: 'mcq',
        text: 'They ___ football last Saturday.',
        highlightWord: '___',
        explanation: 'played هي صيغة الماضي البسيط للفعل play — نضيف ed للأفعال المنتظمة.',
        options: [
          { id: 'a', text: 'play',    correct: false },
          { id: 'b', text: 'plays',   correct: false },
          { id: 'c', text: 'played',  correct: true  },
          { id: 'd', text: 'playing', correct: false },
        ]
      },
      {
        id: 'q3', type: 'mcq',
        text: 'I ___ visit my family next weekend.',
        highlightWord: '___',
        explanation: 'will للقرارات والوعود اللحظية في المستقبل.',
        options: [
          { id: 'a', text: 'will',  correct: true  },
          { id: 'b', text: 'going', correct: false },
          { id: 'c', text: 'was',   correct: false },
          { id: 'd', text: 'did',   correct: false },
        ]
      },
      {
        id: 'q4', type: 'mcq',
        text: 'The train ___ at 8 AM every morning.',
        highlightWord: '___',
        explanation: 'departs مضارع بسيط لأن الجملة عن جدول منتظم وثابت.',
        options: [
          { id: 'a', text: 'departed',  correct: false },
          { id: 'b', text: 'departing', correct: false },
          { id: 'c', text: 'departs',   correct: true  },
          { id: 'd', text: 'will depart', correct: false },
        ]
      },
      {
        id: 'q5', type: 'mcq',
        text: 'We ___ the project before the deadline yesterday.',
        highlightWord: '___',
        explanation: 'finished ماضي بسيط — كلمة yesterday دليل واضح على استخدام الماضي.',
        options: [
          { id: 'a', text: 'finish',    correct: false },
          { id: 'b', text: 'finishes',  correct: false },
          { id: 'c', text: 'finishing', correct: false },
          { id: 'd', text: 'finished',  correct: true  },
        ]
      },
    ]
  },
  '2': {
    title: 'اختبار سريع — المفردات اليومية',
    subtitle: 'Daily Vocabulary',
    level: 'B1',
    duration: '7 دقائق',
    xp: 40,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    questions: [
      {
        id: 'q1', type: 'mcq',
        text: 'The meeting was postponed to next week.',
        highlightWord: 'postponed',
        explanation: 'postpone = يؤجل. تستخدمها لما حاجة كانت هتحصل بس اتأخرت لوقت تاني.',
        options: [
          { id: 'a', text: 'تم إلغاؤه',   correct: false },
          { id: 'b', text: 'تم تأجيله',   correct: true  },
          { id: 'c', text: 'تم حضوره',    correct: false },
          { id: 'd', text: 'تم إلغاء حضوره', correct: false },
        ]
      },
      {
        id: 'q2', type: 'mcq',
        text: 'She commutes to work by train every morning.',
        highlightWord: 'commutes',
        explanation: 'commute = يتنقل يومياً للعمل. مختلف عن travel اللي معناها سفر عام.',
        options: [
          { id: 'a', text: 'تعمل من البيت',      correct: false },
          { id: 'b', text: 'تتنقل يومياً للعمل',  correct: true  },
          { id: 'c', text: 'تسافر للخارج',         correct: false },
          { id: 'd', text: 'تتأخر عن العمل',       correct: false },
        ]
      },
      {
        id: 'q3', type: 'mcq',
        text: 'The store offers a generous discount on weekends.',
        highlightWord: 'discount',
        explanation: 'discount = خصم على السعر. مختلف عن sale اللي ممكن تكون تخفيضات موسمية عامة.',
        options: [
          { id: 'a', text: 'ضريبة إضافية', correct: false },
          { id: 'b', text: 'منتجات مجانية', correct: false },
          { id: 'c', text: 'خصم على السعر', correct: true  },
          { id: 'd', text: 'عروض خاصة للأعضاء', correct: false },
        ]
      },
    ]
  },
  '3': {
    title: 'اختبار سريع — الجمل المركبة',
    subtitle: 'Complex Sentences',
    level: 'B2',
    duration: '10 دقائق',
    xp: 55,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    questions: [
      {
        id: 'q1', type: 'mcq',
        text: '___ it was raining heavily, they decided to go out.',
        highlightWord: '___',
        explanation: 'Although = بالرغم من — تستخدمها لربط فكرتين متعارضتين.',
        options: [
          { id: 'a', text: 'Because',  correct: false },
          { id: 'b', text: 'Although', correct: true  },
          { id: 'c', text: 'Since',    correct: false },
          { id: 'd', text: 'So',       correct: false },
        ]
      },
      {
        id: 'q2', type: 'mcq',
        text: 'I was tired; ___, I finished all the work.',
        highlightWord: '___',
        explanation: 'However = مع ذلك / بالرغم من ذلك — يربط جملتين متعارضتين بعد فاصلة منقوطة.',
        options: [
          { id: 'a', text: 'therefore', correct: false },
          { id: 'b', text: 'because',   correct: false },
          { id: 'c', text: 'however',   correct: true  },
          { id: 'd', text: 'although',  correct: false },
        ]
      },
      {
        id: 'q3', type: 'mcq',
        text: 'She studied hard ___ she wanted to pass the exam.',
        highlightWord: '___',
        explanation: 'because = لأن — يربط الجملة بسببها.',
        options: [
          { id: 'a', text: 'although', correct: false },
          { id: 'b', text: 'however',  correct: false },
          { id: 'c', text: 'despite',  correct: false },
          { id: 'd', text: 'because',  correct: true  },
        ]
      },
    ]
  }
}

const defaultExercise = exercisesData['1']

// ─── Component ────────────────────────────────────────────
export default function ExercisePage({ params }: { params: { id: string } }) {
  const exercise = exercisesData[params.id] ?? defaultExercise

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected,   setSelected]   = useState<string | null>(null)
  const [score,      setScore]       = useState(0)
  const [finished,   setFinished]    = useState(false)

  const question  = exercise.questions[currentIdx]
  const answered  = selected !== null
  const isCorrect = question?.options.find(o => o.id === selected)?.correct ?? false
  const progress  = Math.round(((currentIdx + (answered ? 1 : 0)) / exercise.questions.length) * 100)

  function handleSelect(id: string) {
    if (answered) return
    setSelected(id)
    if (question.options.find(o => o.id === id)?.correct) setScore(s => s + 1)
  }
  function handleNext() {
    if (currentIdx + 1 >= exercise.questions.length) { setFinished(true); return }
    setCurrentIdx(i => i + 1); setSelected(null)
  }
  function handleRestart() { setCurrentIdx(0); setSelected(null); setScore(0); setFinished(false) }

  const scorePercent = Math.round((score / exercise.questions.length) * 100)

  function getLevelStyle(level: string) {
    if (level.startsWith('A')) return { bg:'#dcfce7', color:'#15803d', border:'#bbf7d0' }
    if (level.startsWith('B')) return { bg:'#dbeafe', color:'#1d4ed8', border:'#bfdbfe' }
    return { bg:'#ede9fe', color:'#6d28d9', border:'#ddd6fe' }
  }
  const ls = getLevelStyle(exercise.level)

  // ─── Finished ───────────────────────────────────────────
  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center py-10 px-4"
        style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}</style>

        <div className="w-full max-w-md rounded-3xl overflow-hidden" style={{ border:'1.5px solid #e2e8f0', boxShadow:'0 24px 60px rgba(15,23,42,0.12)' }}>
          <div className="relative" style={{ height:160 }}>
            <img src={exercise.image} alt="" className="w-full h-full object-cover" />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.75))' }} />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <div className="text-5xl mb-2">{scorePercent >= 80 ? '🏆' : scorePercent >= 50 ? '💪' : '📖'}</div>
                <p className="text-white font-bold">{exercise.title}</p>
              </div>
            </div>
          </div>

          <div className="p-7 bg-white text-center">
            <h2 className="font-extrabold text-slate-900 text-2xl mb-1">انتهى التمرين!</h2>
            <p className="text-slate-400 text-sm mb-6">نتيجتك النهائية</p>

            <div className="rounded-2xl p-5 mb-6" style={{ background:'linear-gradient(135deg,#f0f9ff,#f0fdfa)', border:'1.5px solid #bfdbfe' }}>
              <div className="font-extrabold text-4xl mb-1" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {score}/{exercise.questions.length}
              </div>
              <div className="text-slate-500 text-sm mb-1">{scorePercent}% إجابات صحيحة</div>
              <div className="flex items-center justify-center gap-1 text-amber-500 text-sm font-bold mb-3">
                <IoFlame className="w-4 h-4" /> +{Math.round(exercise.xp * scorePercent / 100)} XP مكتسبة
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full" style={{ width:`${scorePercent}%`, background:'linear-gradient(90deg,#2563eb,#0ea5e9)', transition:'width 0.8s ease' }} />
              </div>
              <p className="text-xs text-slate-400 mt-3">
                {scorePercent >= 80 ? '🎉 ممتاز! خطوة للأمام.' : scorePercent >= 50 ? '👍 كويس! راجع الأسئلة اللي غلطت فيها.' : '📖 راجع القاعدة وحاول مرة تانية.'}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={handleRestart} className="w-full py-3 rounded-2xl font-bold text-white text-sm" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 20px rgba(37,99,235,0.25)' }}>
                كرر التمرين
              </button>
              <Link href="/practice" className="w-full py-3 rounded-2xl font-bold text-slate-700 text-sm border-2 border-slate-200 bg-white text-center">
                تمارين تانية
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null

  // ─── Question Screen ─────────────────────────────────────
  const parts = question.highlightWord ? question.text.split(question.highlightWord) : [question.text]

  return (
    <div className="min-h-screen py-10"
      style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}</style>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link href="/practice" className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <IoArrowForward className="w-4 h-4" /> {exercise.title}
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: ls.bg, color: ls.color, borderColor: ls.border }}>{exercise.level}</span>
            <span className="text-xs text-slate-400 font-medium">{currentIdx + 1} / {exercise.questions.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 rounded-full bg-slate-200">
          <div className="h-1.5 rounded-full transition-all duration-500" style={{ width:`${progress}%`, background:'linear-gradient(90deg,#2563eb,#0ea5e9)' }} />
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow:'0 20px 50px rgba(15,23,42,0.2)' }}>

          {/* Cover image */}
          <div className="relative" style={{ height:140 }}>
            <img src={exercise.image} alt="" className="w-full h-full object-cover opacity-50" />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent, rgba(15,23,42,0.95))' }} />
            <div className="absolute bottom-4 right-5 left-5 flex items-end justify-between">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-amber-400" /><div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="mr-1">{exercise.subtitle}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-white/60 flex items-center gap-1"><IoTime className="w-3 h-3" />{exercise.duration}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1"><IoFlame className="w-3 h-3" />{exercise.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="px-6 py-5">
            <p className="text-slate-400 text-xs mb-3 font-medium">اختر الإجابة الصحيحة:</p>
            <div className="rounded-2xl px-5 py-4 text-slate-100 text-base leading-8 font-medium" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }} dir="ltr">
              {parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && question.highlightWord && (
                    <span className="font-extrabold px-2 py-0.5 rounded mx-1" style={{ background:'rgba(14,165,233,0.25)', color:'#38bdf8', borderBottom:'2px solid #0ea5e9' }}>
                      {answered ? question.options.find(o => o.id === selected)?.text : '___'}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="px-6 pb-5 grid grid-cols-2 gap-2">
            {question.options.map(opt => {
              const isSelected = selected === opt.id
              let style: React.CSSProperties = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#cbd5e1', cursor: answered ? 'default' : 'pointer' }
              if (answered) {
                if (opt.correct)       style = { ...style, background:'rgba(16,185,129,0.2)',  border:'1px solid #10b981', color:'#6ee7b7' }
                else if (isSelected)   style = { ...style, background:'rgba(239,68,68,0.15)',  border:'1px solid #ef4444', color:'#fca5a5' }
              } else if (isSelected)   style = { ...style, background:'rgba(37,99,235,0.25)',  border:'1px solid #3b82f6', color:'white'   }

              return (
                <button key={opt.id} onClick={() => handleSelect(opt.id)}
                  className="text-center rounded-xl px-4 py-3 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-150"
                  style={style}
                >
                  {opt.text}
                  {answered && opt.correct             && <IoCheckmarkCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  {answered && isSelected && !opt.correct && <IoCloseCircle    className="w-4 h-4 text-red-400    flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {answered && (
            <div className="mx-6 mb-6 rounded-2xl px-5 py-4 text-sm leading-7" style={{ background: isCorrect ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', border:`1px solid ${isCorrect ? '#10b981' : '#ef4444'}`, color: isCorrect ? '#6ee7b7' : '#fca5a5' }}>
              <p className="font-bold">{isCorrect ? '🎉 إجابة صحيحة!' : '❌ إجابة خاطئة.'}</p>
              <p className="mt-1 text-slate-400 text-xs">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Next */}
        {answered && (
          <button onClick={handleNext} className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 24px rgba(37,99,235,0.25)' }}>
            {currentIdx + 1 >= exercise.questions.length ? 'عرض النتيجة' : 'السؤال التالي'}
            <IoArrowBack className="w-4 h-4" />
          </button>
        )}

        <Link href="/practice" className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors py-2">
          <IoArrowForward className="w-4 h-4" /> الرجوع للتمارين
        </Link>

      </div>
    </div>
  )
}
