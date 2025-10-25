import HeaderPages from '@/src/components/header/HeaderPages'
import React from 'react'
 
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPages />
      <main className="flex-1">
        {children}
      </main>
      {/* <FooterPages /> */}
    </div>
  )
}