"use client"
import React from 'react'
import Link from 'next/link'
import { IoHome, IoSearch, IoArrowBack } from 'react-icons/io5'

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        
        

        {/* Error Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Error Code */}
          <div className="mb-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
            <p className="text-gray-600">
              Oops! The page you're looking for seems to have wandered off. 
              Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <IoHome className="w-5 h-5" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <IoArrowBack className="w-5 h-5" />
              Go Back
            </button>

            <Link
              href="/learn"
              className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <IoSearch className="w-5 h-5" />
              Explore Lessons
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Popular Pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/learn" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Learn
              </Link>
              <Link href="/vocabulary" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Vocabulary
              </Link>
              <Link href="/videos" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Videos
              </Link>
              <Link href="/practice" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Practice
              </Link>
            </div>
          </div>
        </div>

        {/* Support Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Still lost?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage