'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IoPlay, IoStatsChart, IoBook, IoVideocam, IoMic, IoStar, IoCheckmarkCircle, IoArrowForward, IoPeople, IoGlobe, IoFlash } from 'react-icons/io5'

const HeroSectionPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedNumbers, setAnimatedNumbers] = useState({
    students: 0,
    success: 0,
    lessons: 0
  })

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Mohamed',
      role: 'Software Developer',
      text: 'From beginner to fluent in 6 months! EnglishMaster made learning enjoyable and effective.',
      avatar: 'SM',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Business Manager',
      text: 'The personalized lessons and speaking practice transformed my professional communication.',
      avatar: 'AH',
      rating: 5
    },
    {
      name: 'Lina Mahmoud',
      role: 'Medical Student',
      text: 'Perfect for busy schedules. I improved my English while studying for my degree.',
      avatar: 'LM',
      rating: 5
    }
  ]

  // Features
  const features = [
    {
      icon: IoBook,
      title: 'Personalized Learning',
      description: 'AI-powered lessons adapt to your level and learning style'
    },
    {
      icon: IoVideocam,
      title: 'Interactive Videos',
      description: 'Engaging video lessons with native speakers and real scenarios'
    },
    {
      icon: IoMic,
      title: 'Speaking Practice',
      description: 'AI feedback on your pronunciation and fluency'
    },
    {
      icon: IoStatsChart,
      title: 'Progress Tracking',
      description: 'Detailed analytics and milestones to track your improvement'
    }
  ]

  // Learning Paths
  const learningPaths = [
    {
      level: 'Beginner',
      title: 'Start from Scratch',
      description: 'Build foundation with basic vocabulary and grammar',
      color: 'from-green-500 to-emerald-600',
      lessons: 45,
      duration: '8 weeks'
    },
    {
      level: 'Intermediate',
      title: 'Build Fluency',
      description: 'Master conversations and complex sentences',
      color: 'from-blue-500 to-cyan-600',
      lessons: 60,
      duration: '12 weeks'
    },
    {
      level: 'Advanced',
      title: 'Master English',
      description: 'Excel in professional and academic contexts',
      color: 'from-purple-500 to-indigo-600',
      lessons: 75,
      duration: '16 weeks'
    }
    ,
    {
      level: 'Advanced',
      title: 'Master English',
      description: 'Excel in professional and academic contexts',
      color: 'from-purple-500 to-indigo-600',
      lessons: 75,
      duration: '16 weeks'
    }
  ]

  // Animate numbers
  useEffect(() => {
    const targets = { students: 10000, success: 95, lessons: 500 }
    const duration = 2000
    const steps = 60
    const stepValues = {}
    
    Object.keys(targets).forEach(key => {
      stepValues[key] = targets[key] / steps
    })

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setAnimatedNumbers({
        students: Math.min(Math.floor(stepValues.students * currentStep), targets.students),
        success: Math.min(Math.floor(stepValues.success * currentStep), targets.success),
        lessons: Math.min(Math.floor(stepValues.lessons * currentStep), targets.lessons)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                <IoFlash className="w-4 h-4 text-yellow-400" />
                <span>Join 10,000+ successful learners</span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Master English
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Like Never Before
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                AI-powered platform that adapts to your learning style. 
                <span className="block">Speak confidently in weeks, not years.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link 
                  href="/assessment"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                >
                  <IoPlay className="w-6 h-6" />
                  Start Free Assessment
                  <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/learn"
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
                >
                  Explore Platform
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircle className="w-4 h-4 text-green-400" />
                  <span>14-Day Free Trial</span>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Demo */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <IoVideocam className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Live Speaking Practice</div>
                      <div className="text-sm text-gray-600">AI-powered real-time feedback</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="text-green-400 font-mono text-sm">
                      {">"} Hello! How can I help you improve your English today?
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-left flex items-center gap-3">
                      <IoMic className="w-5 h-5" />
                      Start Speaking Exercise
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center gap-3">
                      <IoBook className="w-5 h-5" />
                      Vocabulary Practice
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                🎯 Personalized
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce delay-1000">
                ⚡ AI Powered
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0 V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white" />
            <path d="M0,0 V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white" />
            <path d="M0,0 V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {animatedNumbers.students.toLocaleString()}+
              </div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <IoPeople className="w-5 h-5 text-blue-600" />
                Active Students
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {animatedNumbers.success}%
              </div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <IoCheckmarkCircle className="w-5 h-5 text-green-600" />
                Success Rate
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {animatedNumbers.lessons}+
              </div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <IoBook className="w-5 h-5 text-purple-600" />
                Interactive Lessons
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why EnglishMaster Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with proven teaching methods to deliver results 3x faster than traditional learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group hover:transform hover:scale-105 duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Start Your Journey
            </h2>
            <p className="text-xl text-gray-600">Choose your path to English mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div key={index} className="relative group">
                <div className={`bg-gradient-to-br ${path.color} text-white rounded-2xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-300 h-full`}>
                  <div className="mb-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {path.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{path.title}</h3>
                  <p className="text-white/90 mb-6">{path.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Lessons</span>
                      <span className="font-semibold">{path.lessons}+</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Duration</span>
                      <span className="font-semibold">{path.duration}</span>
                    </div>
                  </div>

                  <Link 
                    href="/assessment"
                    className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Start Path
                    <IoArrowForward className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-400">See what our students have achieved</p>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="font-bold text-xl">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-300">{testimonials[currentTestimonial].role}</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <IoStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-200 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your English?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who achieved fluency faster than they ever thought possible
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/assessment"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              Take Level Test
            </Link>
          </div>
          <p className="text-blue-200 mt-4 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}

export default HeroSectionPage