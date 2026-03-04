import type { Metadata, Viewport } from 'next'
import './globals.css'
import HeaderPages from '../components/header/HeaderPages'
import FooterPages from '../components/footer/FooterPages'

export const metadata: Metadata = {
  title: {
    default: 'EnglishMaster - تعلم الإنجليزية بالاختبار',
    template: '%s | EnglishMaster'
  },
  description:
    'منصة تدريب واختبار ذاتي لتعلم الإنجليزية بالممارسة اليومية مع تصحيح فوري وتتبع للتقدم.',
  keywords: ['تعلم الانجليزية', 'اختبار انجليزي', 'مفردات', 'قواعد', 'محادثة', 'practice english'],
  alternates: {
    canonical: '/'
  }
}

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">
          انتقل للمحتوى الرئيسي
        </a>

        <HeaderPages />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <FooterPages />
      </body>
    </html>
  )
}
