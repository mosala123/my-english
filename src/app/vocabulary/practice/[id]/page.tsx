'use client'
import { useState } from 'react'
import Link from 'next/link'
import { IoArrowBack, IoArrowForward, IoCheckmarkCircle, IoCloseCircle, IoBookOutline } from 'react-icons/io5'

// ─── Types ────────────────────────────────────────────────
export interface QuizOption  { id: string; text: string; correct: boolean }
export interface VocabQuestion {
  id: string
  sentence: string
  highlightWord: string
  contextImage?: string
  explanation: string
  options: QuizOption[]
}
export interface PracticePackMeta { id: string | number; title: string; level: string; image: string }

// ─── Default Data ─────────────────────────────────────────
const defaultPack: PracticePackMeta = {
  id: 1,
  title: 'الحياة اليومية',
  level: 'A1-A2',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
}

const defaultQuestions: VocabQuestion[] = [
  {
    id: 'q1',
    sentence: 'The meeting was postponed to Monday.',
    highlightWord: 'postponed',
    contextImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80',
    explanation: 'postpone = يؤجل. نستخدمها لما حاجة كانت هتحصل بس اتأخرت لوقت تاني.',
    options: [
      { id: 'a', text: 'تم إلغاء الاجتماع',  correct: false },
      { id: 'b', text: 'تم تأجيل الاجتماع',  correct: true  },
      { id: 'c', text: 'تم نقل الاجتماع',    correct: false },
      { id: 'd', text: 'تم تأكيد الاجتماع',  correct: false },
    ]
  },
  {
    id: 'q2',
    sentence: 'She commutes to work by train every morning.',
    highlightWord: 'commutes',
    contextImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80',
    explanation: 'commute = يتنقل يومياً للعمل. مختلف عن travel اللي بتعني سفر عام.',
    options: [
      { id: 'a', text: 'تسافر للعمل أسبوعياً', correct: false },
      { id: 'b', text: 'تعمل من البيت',         correct: false },
      { id: 'c', text: 'تتنقل للعمل يومياً',    correct: true  },
      { id: 'd', text: 'تأخرت عن العمل',        correct: false },
    ]
  },
  {
    id: 'q3',
    sentence: 'The store offers a generous discount on weekends.',
    highlightWord: 'discount',
    contextImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80',
    explanation: 'discount = خصم على السعر. مختلف عن sale اللي ممكن تعني تخفيضات موسمية.',
    options: [
      { id: 'a', text: 'منتجات جديدة',  correct: false },
      { id: 'b', text: 'خصم على السعر', correct: true  },
      { id: 'c', text: 'هدية مجانية',   correct: false },
      { id: 'd', text: 'ضريبة إضافية',  correct: false },
    ]
  },
  {
    id: 'q4',
    sentence: 'He was exhausted after the long hike.',
    highlightWord: 'exhausted',
    contextImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80',
    explanation: 'exhausted = منهك/تعبان جداً. أقوى من tired، بتعبر عن تعب شديد.',
    options: [
      { id: 'a', text: 'كان سعيداً جداً',   correct: false },
      { id: 'b', text: 'كان تعبان نوعاً ما', correct: false },
      { id: 'c', text: 'كان منهكاً تماماً',  correct: true  },
      { id: 'd', text: 'كان جائعاً',         correct: false },
    ]
  },
  {
    id: 'q5',
    sentence: 'The new policy will affect all employees.',
    highlightWord: 'affect',
    contextImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80',
    explanation: 'affect = يؤثر على. لا تخلطها مع effect اللي هي اسم بمعنى "تأثير".',
    options: [
      { id: 'a', text: 'ستشمل الموظفين الجدد فقط', correct: false },
      { id: 'b', text: 'ستلغي حقوق الموظفين',       correct: false },
      { id: 'c', text: 'ستُطبَّق العام القادم',      correct: false },
      { id: 'd', text: 'ستؤثر على جميع الموظفين',   correct: true  },
    ]
  },
]

// ─── Component ────────────────────────────────────────────
export default function VocabularyPracticePage({
  pack = defaultPack,
  questions = defaultQuestions,
}: {
  pack?: PracticePackMeta
  questions?: VocabQuestion[]
}) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected,   setSelected]   = useState<string | null>(null)
  const [score,      setScore]       = useState(0)
  const [finished,   setFinished]    = useState(false)

  const question  = questions[currentIdx]
  const answered  = selected !== null
  const isCorrect = question?.options.find(o => o.id === selected)?.correct ?? false
  const progress  = Math.round(((currentIdx + (answered ? 1 : 0)) / questions.length) * 100)

  function handleSelect(id: string) {
    if (answered) return
    setSelected(id)
    if (question.options.find(o => o.id === id)?.correct) setScore(s => s + 1)
  }
  function handleNext() {
    if (currentIdx + 1 >= questions.length) { setFinished(true); return }
    setCurrentIdx(i => i + 1); setSelected(null)
  }
  function handleRestart() {
    setCurrentIdx(0); setSelected(null); setScore(0); setFinished(false)
  }

  const scorePercent = Math.round((score / questions.length) * 100)

  // ─── Finished Screen ──────────────────────────────────
  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center py-10 px-4"
        style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}</style>

        <div className="w-full max-w-md rounded-3xl overflow-hidden" style={{ border:'1.5px solid #e2e8f0', boxShadow:'0 24px 60px rgba(15,23,42,0.12)' }}>
          {/* Cover image */}
          <div className="relative" style={{ height: 160 }}>
            <img src={pack.image} alt="" className="w-full h-full object-cover" />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.7))' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">{scorePercent >= 80 ? '🏆' : scorePercent >= 50 ? '💪' : '📖'}</div>
                <p className="text-white font-bold text-lg">{pack.title}</p>
              </div>
            </div>
          </div>

          <div className="p-7 bg-white text-center">
            <h2 className="font-extrabold text-slate-900 text-2xl mb-1">انتهى التدريب!</h2>
            <p className="text-slate-400 text-sm mb-6">نتيجتك في هذا الباك</p>

            <div className="rounded-2xl p-5 mb-6" style={{ background:'linear-gradient(135deg,#f0f9ff,#f0fdfa)', border:'1.5px solid #bfdbfe' }}>
              <div className="font-extrabold text-4xl mb-1" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {score}/{questions.length}
              </div>
              <div className="text-slate-500 text-sm mb-3">{scorePercent}% إجابات صحيحة</div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full" style={{ width:`${scorePercent}%`, background:'linear-gradient(90deg,#2563eb,#0ea5e9)', transition:'width 0.8s ease' }} />
              </div>
              <p className="text-xs text-slate-400 mt-3">
                {scorePercent >= 80 ? '🎉 ممتاز! أتقنت هذا الباك.' : scorePercent >= 50 ? '👍 كويس! راجع الأسئلة اللي غلطت فيها.' : '📖 حاول مرة تانية بعد مراجعة الكلمات.'}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={handleRestart} className="w-full py-3 rounded-2xl font-bold text-white text-sm" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 20px rgba(37,99,235,0.25)' }}>
                كرر التدريب
              </button>
              <Link href="/vocabulary" className="w-full py-3 rounded-2xl font-bold text-slate-700 text-sm border-2 border-slate-200 bg-white text-center">
                باكات تانية
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null
  const parts = question.sentence.split(question.highlightWord)

  // ─── Question Screen ───────────────────────────────────
  return (
    <div className="min-h-screen py-10"
      style={{ background:'linear-gradient(160deg,#f8faff 0%,#eef4ff 40%,#f0faf8 100%)', fontFamily:"'Tajawal',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}</style>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link href="/vocabulary" className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <IoBookOutline className="w-4 h-4" />{pack.title}
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">{pack.level}</span>
            <span className="text-xs text-slate-400 font-medium">{currentIdx + 1} / {questions.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 rounded-full bg-slate-200">
          <div className="h-1.5 rounded-full transition-all duration-500" style={{ width:`${progress}%`, background:'linear-gradient(90deg,#2563eb,#0ea5e9)' }} />
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', boxShadow:'0 20px 50px rgba(15,23,42,0.2)' }}>

          {/* Context Image */}
          {question.contextImage && (
            <div className="relative" style={{ height: 160 }}>
              <img src={question.contextImage} alt="" className="w-full h-full object-cover opacity-60" />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent, rgba(15,23,42,0.9))' }} />
              <div className="absolute bottom-4 right-5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-white/60 text-xs mr-1">اختبار المفردات</span>
              </div>
            </div>
          )}

          {/* Sentence */}
          <div className="px-6 py-5">
            <p className="text-slate-400 text-xs mb-3 font-medium">اقرأ الجملة واختار الترجمة الصحيحة للكلمة المُظللة:</p>
            <div className="rounded-2xl px-5 py-4 text-slate-100 text-base leading-8 font-medium" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }} dir="ltr">
              {parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && (
                    <span className="font-extrabold px-1.5 py-0.5 rounded mx-0.5" style={{ background:'rgba(14,165,233,0.25)', color:'#38bdf8', borderBottom:'2px solid #0ea5e9' }}>
                      {question.highlightWord}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="px-6 pb-5 grid grid-cols-1 gap-2">
            {question.options.map(opt => {
              const isSelected = selected === opt.id
              let style: React.CSSProperties = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#cbd5e1', cursor: answered ? 'default' : 'pointer' }
              if (answered) {
                if (opt.correct)       style = { ...style, background:'rgba(16,185,129,0.2)',  border:'1px solid #10b981', color:'#6ee7b7' }
                else if (isSelected)   style = { ...style, background:'rgba(239,68,68,0.15)',  border:'1px solid #ef4444', color:'#fca5a5' }
              } else if (isSelected)   style = { ...style, background:'rgba(37,99,235,0.25)',  border:'1px solid #3b82f6', color:'white'   }

              return (
                <button key={opt.id} onClick={() => handleSelect(opt.id)}
                  className="text-right rounded-xl px-5 py-3 font-bold text-sm flex items-center justify-between transition-all duration-150"
                  style={style}
                >
                  <span>{opt.text}</span>
                  {answered && opt.correct             && <IoCheckmarkCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {answered && isSelected && !opt.correct && <IoCloseCircle    className="w-5 h-5 text-red-400    flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {answered && (
            <div className="mx-6 mb-6 rounded-2xl px-5 py-4 text-sm leading-7" style={{ background: isCorrect ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', border:`1px solid ${isCorrect ? '#10b981' : '#ef4444'}`, color: isCorrect ? '#6ee7b7' : '#fca5a5' }}>
              <p>{isCorrect ? '🎉 إجابة صحيحة!' : '❌ إجابة خاطئة.'}</p>
              <p className="mt-1 text-slate-400 text-xs">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Next */}
        {answered && (
          <button onClick={handleNext} className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all" style={{ background:'linear-gradient(135deg,#2563eb,#0ea5e9)', boxShadow:'0 8px 24px rgba(37,99,235,0.25)' }}>
            {currentIdx + 1 >= questions.length ? 'عرض النتيجة' : 'السؤال التالي'}
            <IoArrowBack className="w-4 h-4" />
          </button>
        )}

        <Link href="/vocabulary" className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors py-2">
          <IoArrowForward className="w-4 h-4" /> الرجوع لبنك المفردات
        </Link>

      </div>
    </div>
  )
}