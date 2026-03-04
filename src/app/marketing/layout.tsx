import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'EnglishMaster - نسخة عربية',
    template: '%s | EnglishMaster'
  },
  description: 'صفحات تعريفية عربية للمنصة.'
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
