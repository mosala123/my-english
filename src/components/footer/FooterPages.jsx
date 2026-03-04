import React from 'react'
import Link from 'next/link'
import {
  IoBook,
  IoStatsChart,
  IoGlobe,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoArrowForward,
  IoHeart,
  IoStar
} from 'react-icons/io5'

const FooterPages = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    learning: [
      { name: 'بنك المفردات', href: '/vocabulary' },
      { name: 'دروس القواعد', href: '/grammar' },
      { name: 'تدريب الفيديو', href: '/videos' },
      { name: 'تدريب المحادثة', href: '/speaking' },
      { name: 'اختبار المستوى', href: '/assessment' },
      { name: 'مسارات التعلم', href: '/learn' },
      { name: 'تمارين عملية', href: '/practice' }
    ],
    support: [
      { name: 'مركز المساعدة', href: '/help' },
      { name: 'تواصل معنا', href: '/contact' },
      { name: 'الأسئلة الشائعة', href: '/faq' },
      { name: 'مجتمع المتعلمين', href: '/community' },
      { name: 'موارد للمعلمين', href: '/teachers' },
      { name: 'المدونة', href: '/blog' },
      { name: 'حالة الخدمة', href: '/status' }
    ],
    company: [
      { name: 'من نحن', href: '/about' },
      { name: 'رسالتنا', href: '/mission' },
      { name: 'الوظائف', href: '/careers' },
      { name: 'المركز الصحفي', href: '/press' },
      { name: 'سياسة الخصوصية', href: '/privacy' },
      { name: 'شروط الاستخدام', href: '/terms' },
      { name: 'سياسة الكوكيز', href: '/cookies' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: IoLogoFacebook, href: 'https://facebook.com/englishmaster', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: IoLogoTwitter, href: 'https://twitter.com/englishmaster', color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: IoLogoInstagram, href: 'https://instagram.com/englishmaster', color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: IoLogoLinkedin, href: 'https://linkedin.com/company/englishmaster', color: 'hover:bg-blue-700' },
    { name: 'YouTube', icon: IoLogoYoutube, href: 'https://youtube.com/englishmaster', color: 'hover:bg-red-600' }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6 group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">EM</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  EnglishMaster
                </span>
                <p className="text-blue-300 text-sm">تعلّم بالاختبار والتطبيق</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة تركّز على التدريب العملي بدل المحتوى النظري الطويل: اختبارات سريعة،
              مراجعة فورية، ومتابعة واضحة لمستواك.
            </p>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">تابعنا</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:text-white transition-colors ${social.color}`}
                      title={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <IoBook className="w-5 h-5 text-blue-400" />
              مصادر التعلم
            </h3>
            <ul className="space-y-3">
              {footerLinks.learning.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
                    <IoArrowForward className="w-3 h-3 text-blue-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <IoStatsChart className="w-5 h-5 text-green-400" />
              الدعم
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
                    <IoArrowForward className="w-3 h-3 text-green-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <IoGlobe className="w-5 h-5 text-cyan-400" />
              الشركة
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
                    <IoArrowForward className="w-3 h-3 text-cyan-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center lg:text-right">
              <p>{currentYear} &copy; EnglishMaster. جميع الحقوق محفوظة.</p>
              <p className="mt-1 flex items-center justify-center lg:justify-start gap-1">
                صُنع بـ <IoHeart className="w-4 h-4 text-red-500" /> لدعم متعلمي اللغة
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">الشروط</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">الكوكيز</Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">خريطة الموقع</Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-gray-400 text-sm flex items-center gap-1">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </span>
                تقييم المتعلمين
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-gray-400 text-sm">متعلمين نشطين</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-gray-400 text-sm">معدل إنجاز</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterPages
