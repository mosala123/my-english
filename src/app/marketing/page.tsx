import React from 'react'
import Link from 'next/link'
import { IoCheckmarkCircle, IoPlay, IoStatsChart, IoBook, IoVideocam, IoPeople } from 'react-icons/io5'

const MarketingPage = () => {
  const features = [
    {
      icon: IoBook,
      title: 'Personalized Learning',
      description: 'Content tailored to your English level and learning goals'
    },
    {
      icon: IoVideocam,
      title: 'Interactive Videos',
      description: 'Engaging video lessons with native speakers and real-life scenarios'
    },
    {
      icon: IoStatsChart,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and insights'
    },
    {
      icon: IoPeople,
      title: 'Speaking Practice',
      description: 'Practice speaking with AI feedback and pronunciation analysis'
    }
  ]

  const levels = [
    { name: 'Beginner (A1-A2)', description: 'Start from scratch with basic vocabulary and grammar' },
    { name: 'Intermediate (B1-B2)', description: 'Build fluency with conversations and complex sentences' },
    { name: 'Advanced (C1-C2)', description: 'Master English for professional and academic purposes' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Master English
              <span className="block text-blue-200">Your Way</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Personalized English learning platform with AI-powered feedback, interactive lessons, and real progress tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/assessment" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Start Free Assessment
                <IoPlay className="w-5 h-5" />
              </Link>
              <Link 
                href="/learn" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Lessons
              </Link>
            </div>
            <p className="mt-4 text-blue-200">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EnglishMaster?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with proven teaching methods to help you learn English effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn at Your Level
            </h2>
            <p className="text-xl text-gray-600">
              From complete beginner to fluent speaker, we have the right content for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {level.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {level.description}
                </p>
                <Link 
                  href="/assessment" 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Start at this level →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have improved their English with our personalized platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/login" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              I Have an Account
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-blue-200">
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-5 h-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Video Lessons</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Practice Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MarketingPage