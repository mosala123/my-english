import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 text-right">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">الصفحة غير موجودة</h1>
        <p className="text-slate-600 mb-5">الرابط غير صحيح أو الصفحة اتحذفت.</p>
        <Link href="/" className="inline-flex w-full justify-center bg-blue-700 text-white rounded-xl py-2.5 font-semibold hover:bg-blue-800 transition-colors">
          الرجوع للرئيسية
        </Link>
      </div>
    </div>
  )
}
