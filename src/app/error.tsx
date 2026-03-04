'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 text-right">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">حدث خطأ غير متوقع</h2>
        <p className="text-slate-600 mb-5">حاول إعادة المحاولة. لو استمرت المشكلة ارجع للصفحة الرئيسية.</p>
        <button onClick={() => reset()} className="w-full bg-blue-700 text-white rounded-xl py-2.5 font-semibold hover:bg-blue-800 transition-colors">
          إعادة المحاولة
        </button>
      </div>
    </div>
  )
}
