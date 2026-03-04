// app/auth/layout.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

export const metadata: Metadata = {
  title: {
    template: '%s | EnglishMaster',
    default: 'الدخول والحساب | EnglishMaster'
  },
  description: 'سجّل الدخول أو أنشئ حسابًا لبدء خطة التدريب اليومية باللغة العربية.'
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <header className="relative py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
            <IoArrowBack className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
            EnglishMaster
          </Link>
        </div>
      </header>
      
      <main className="relative pb-10">
        {children}
      </main>
    </div>
  );
}