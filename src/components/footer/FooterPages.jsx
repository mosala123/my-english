import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { IoBook, IoVideocam, IoMic, IoStatsChart, IoMail, IoGlobe } from 'react-icons/io5'

const FooterPages = () => {
  return (
    <div>
        

      {/* Main Footer - Updated for English Learning */}
      <footer className="bg-gray-900 text-white pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EM</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">EnglishMaster</span>
                  <p className="text-blue-300 text-sm">Learn Smart, Speak Confidently</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform your English skills with AI-powered personalized lessons, interactive practice, and real-time feedback. Start your journey to fluency today.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  {
                    name: 'Facebook',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
                    url: '#'
                  },
                  {
                    name: 'YouTube',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
                    url: '#'
                  },
                  {
                    name: 'Instagram',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.558-.749-.947-.949-2.153-.549-3.32.4-1.167 1.347-2.02 2.546-2.309 1.199-.289 2.447-.049 3.395.649.948.698 1.547 1.797 1.547 2.996 0 1.498-1.199 2.542-2.642 2.542zm7.718 0c-1.297 0-2.448-.611-3.197-1.558-.749-.947-.949-2.153-.549-3.32.4-1.167 1.347-2.02 2.546-2.309 1.199-.289 2.447-.049 3.395.649.948.698 1.547 1.797 1.547 2.996 0 1.498-1.199 2.542-2.642 2.542z" /></svg>,
                    url: '#'
                  },
                  {
                    name: 'LinkedIn',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                    url: '#'
                  }
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors hover:scale-110 transform"
                    title={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Learning Resources */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <IoBook className="w-5 h-5 text-blue-400" />
                Learning Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Vocabulary Builder', href: '/vocabulary' },
                  { name: 'Grammar Lessons', href: '/grammar' },
                  { name: 'Video Courses', href: '/videos' },
                  { name: 'Speaking Practice', href: '/speaking' },
                  { name: 'Level Assessment', href: '/assessment' },
                  { name: 'Learning Paths', href: '/learn' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <IoStatsChart className="w-5 h-5 text-green-400" />
                Support
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Help Center', href: '/help' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'FAQ', href: '/faq' },
                  { name: 'Community Forum', href: '/community' },
                  { name: 'Teaching Resources', href: '/teachers' },
                  { name: 'Blog', href: '/blog' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <IoGlobe className="w-5 h-5 text-purple-400" />
                Company
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Mission', href: '/mission' },
                  { name: 'Careers', href: '/careers' },
                  { name: 'Press Kit', href: '/press' },
                  { name: 'Privacy Policy', href: '/privacy' },
                  { name: 'Terms of Service', href: '/terms' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} EnglishMaster. All rights reserved.</p>
                <p className="mt-1">Empowering language learners worldwide</p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-gray-400 text-sm">Student Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FooterPages