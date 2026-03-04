import { Metadata } from 'next'
import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'

export const metadata: Metadata = {
  title: 'حلول التعلم | EnglishMaster',
  description: 'منصة تعلم إنجليزية تعتمد على الاختبار والتطبيق اليومي.'
}

const cards = [
  { title: 'محتوى تدريبي', text: 'دروس مختصرة وتمارين مباشرة لكل مهارة.' },
  { title: 'تتبع تقدّم', text: 'لوحة بسيطة تبين نقاط القوة والضعف.' },
  { title: 'جاهز للتطوير', text: 'واجهة جاهزة تربطها لاحقًا بقاعدة بيانات.' }
]

export default function MarketingPage() {
  return (
    <div className="page-bg min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-right">
        <section className="surface-card p-6 lg:p-8 reveal-up">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">منصة تعلم إنجليزي جاهزة للعرض والتطوير</h1>
          <p className="text-slate-600 leading-8 mb-6">مناسبة كمشروع Portfolio: شكل احترافي + تجربة مستخدم واضحة + قابلية إضافة محتوى حقيقي بسهولة.</p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors">
            ابدأ النسخة التجريبية
            <IoArrowForward className="w-4 h-4" />
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, idx) => (
            <article key={card.title} className="surface-card p-5 reveal-up" style={{ animationDelay: `${idx * 70}ms` }}>
              <h2 className="font-bold text-slate-900 mb-2">{card.title}</h2>
              <p className="text-sm text-slate-600">{card.text}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
