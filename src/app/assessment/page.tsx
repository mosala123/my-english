import Link from 'next/link'
import { IoArrowForward, IoCheckmarkCircle, IoSchool } from 'react-icons/io5'

const stages = [
  { level: 'A1', title: 'مبتدئ', text: 'تفهم كلمات وجمل يومية قصيرة.' },
  { level: 'A2', title: 'أساسي', text: 'تتعامل مع مواقف بسيطة في الحياة اليومية.' },
  { level: 'B1', title: 'متوسط', text: 'تشرح أفكارك وتشارك في محادثات أطول.' },
  { level: 'B2', title: 'فوق المتوسط', text: 'تتحدث بثقة في الدراسة والعمل.' },
  { level: 'C1', title: 'متقدم', text: 'استخدام مرن ودقيق للغة في أغلب السياقات.' }
]

export default function AssessmentPage() {
  return (
    <div className="page-bg min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <section className="surface-card p-6 lg:p-8 text-right reveal-up">
          <div className="inline-flex items-center gap-2 text-sm text-sky-800 bg-sky-100 px-3 py-1 rounded-full mb-3">
            <IoSchool className="w-4 h-4" />
            اختبار تحديد المستوى
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">ابدأ من المستوى الصح</h1>
          <p className="text-slate-600 leading-8 mb-6">
            الاختبار هنا عملي وسريع. بعد النتيجة بتاخد خطة تدريب واضحة على حسب نقاط القوة والضعف.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Link href="/learn" className="px-5 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors inline-flex items-center justify-center gap-2">
              عرض الخطة
              <IoArrowForward className="w-4 h-4" />
            </Link>
            <Link href="/practice" className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors inline-flex items-center justify-center">
              ادخل التمارين
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((item, idx) => (
            <article key={item.level} className="surface-card p-4 text-right reveal-up" style={{ animationDelay: `${idx * 70}ms` }}>
              <div className="text-xs text-blue-700 font-bold mb-1">{item.level}</div>
              <h2 className="font-bold text-slate-900 mb-2">{item.title}</h2>
              <p className="text-sm text-slate-600 leading-6">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="surface-card-strong p-5 text-right text-slate-100 soft-float">
          <h3 className="font-bold text-lg mb-3">ماذا يحدث بعد الاختبار؟</h3>
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="inline-flex items-center gap-2"><IoCheckmarkCircle className="text-emerald-400" /> تحليل مستوى فوري</li>
            <li className="inline-flex items-center gap-2"><IoCheckmarkCircle className="text-emerald-400" /> خطة 7 أيام قابلة للتنفيذ</li>
            <li className="inline-flex items-center gap-2"><IoCheckmarkCircle className="text-emerald-400" /> تمارين متابعة على المهارات الأضعف</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
