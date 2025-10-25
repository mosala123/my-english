'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoArrowBack, IoSearch, IoCopy, IoDownload, IoPlay } from 'react-icons/io5'

const TranscriptPage = () => {
  const params = useParams()
  const router = useRouter()
  const videoId = params.id as string

  const [searchTerm, setSearchTerm] = useState('')
  const [copiedLine, setCopiedLine] = useState<number | null>(null)

  // بيانات الفيديو والـ Transcript
  const videoData = {
    id: videoId,
    title: 'Present Perfect Tense - Complete Guide',
    instructor: 'Sarah Johnson',
    duration: '15:30'
  }

  // Transcript كامل
  const fullTranscript = [
    { time: '0:00', text: 'Welcome to this lesson on the present perfect tense.' },
    { time: '0:15', text: 'Today we will learn when and how to use this important tense in English.' },
    { time: '0:30', text: 'The present perfect is one of the most commonly used tenses, and understanding it will greatly improve your English.' },
    { time: '1:00', text: "Let's start with the basic structure. The present perfect is formed with have or has plus the past participle of the main verb." },
    { time: '1:30', text: "For example: 'I have visited Paris,' 'She has finished her work,' 'We have seen that movie.'" },
    { time: '2:15', text: "Now, when do we use the present perfect? There are three main situations." },
    { time: '2:30', text: "First, we use it for experiences in our lives when we don't specify exactly when they happened." },
    { time: '3:00', text: "For example: 'I have been to Japan.' This means at some point in my life, I visited Japan." },
    { time: '3:30', text: "Second, we use it for actions that started in the past and continue to the present." },
    { time: '4:00', text: "For example: 'I have lived in London for five years.' This means I started living there five years ago and I still live there now." },
    { time: '4:45', text: "Third, we use it for recent actions that have a result in the present." },
    { time: '5:15', text: "For example: 'I have lost my keys.' This means I lost them recently and now I can't find them." },
    { time: '6:00', text: "Let's practice with some more examples to make sure you understand." },
    { time: '6:30', text: "Look at this sentence: 'They have known each other since childhood.' What situation does this represent?" },
    { time: '7:15', text: "That's right! It's situation number two - an action that started in the past and continues to now." },
    { time: '8:00', text: "Now, let's talk about the difference between present perfect and simple past." },
    { time: '8:30', text: "This is where many students get confused, so pay close attention." },
    { time: '9:00', text: "We use simple past for finished actions in the past when we know exactly when they happened." },
    { time: '9:30', text: "For example: 'I visited Paris last year.' Here we specify 'last year,' so we use simple past." },
    { time: '10:15', text: "But if we say 'I have visited Paris,' we don't say when - we're just talking about the experience." },
    { time: '11:00', text: "Let's do a quick quiz. Complete this sentence: 'She _____ never _____ (see) snow.'" },
    { time: '11:45', text: "The correct answer is: 'She has never seen snow.' Good job if you got it right!" },
    { time: '12:30', text: "Now, let's look at some common time expressions used with present perfect." },
    { time: '13:00', text: "We often use words like: ever, never, already, yet, just, for, and since." },
    { time: '13:45', text: "For example: 'Have you ever been to New York?' 'I haven't finished my homework yet.'" },
    { time: '14:30', text: "Remember: 'for' is used with a period of time, while 'since' is used with a specific point in time." },
    { time: '15:00', text: "That's all for this lesson. Practice using the present perfect in your daily conversations!" },
    { time: '15:30', text: "Thank you for watching, and I'll see you in the next lesson!" }
  ]

  const copyToClipboard = async (text: string, lineIndex: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLine(lineIndex)
      setTimeout(() => setCopiedLine(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadTranscript = () => {
    const transcriptText = fullTranscript.map(line => `${line.time} - ${line.text}`).join('\n\n')
    const blob = new Blob([transcriptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transcript-${videoData.title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredTranscript = fullTranscript.filter(line =>
    line.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const jumpToTime = (time: string) => {
    // في الواقع بتكون بتشغل الفيديو من الوقت المحدد
    router.push(`/videos/play/${videoId}?t=${time}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <IoArrowBack className="w-5 h-5" />
              Back to Video
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Transcript</h1>
            <p className="text-gray-600 mt-2">
              {videoData.title} • {videoData.instructor} • {videoData.duration}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadTranscript}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoDownload className="w-4 h-4" />
              Download
            </button>
            <Link
              href={`/videos/play/${videoId}`}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <IoPlay className="w-4 h-4" />
              Watch Video
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search in transcript..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Found {filteredTranscript.length} line{filteredTranscript.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Transcript Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              {filteredTranscript.map((line, index) => (
                <div
                  key={index}
                  className="flex gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  {/* Time Stamp */}
                  <button
                    onClick={() => jumpToTime(line.time)}
                    className="flex-shrink-0 text-blue-600 hover:text-blue-700 font-mono text-sm bg-blue-50 px-2 py-1 rounded group-hover:bg-blue-100 transition-colors"
                  >
                    {line.time}
                  </button>

                  {/* Transcript Text */}
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{line.text}</p>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(line.text, index)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-gray-600"
                    title="Copy text"
                  >
                    {copiedLine === index ? (
                      <span className="text-green-600 text-sm">Copied!</span>
                    ) : (
                      <IoCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredTranscript.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try different search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Vocabulary from this Lesson</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { word: 'present perfect', meaning: 'زمن المضارع التام' },
              { word: 'past participle', meaning: 'التصريف الثالث' },
              { word: 'experiences', meaning: 'الخبرات' },
              { word: 'unfinished time', meaning: 'زمن غير محدد' },
              { word: 'time expressions', meaning: 'عبارات الوقت' },
              { word: 'structure', meaning: 'التركيب' },
              { word: 'commonly used', meaning: 'شائع الاستخدام' },
              { word: 'practice', meaning: 'الممارسة' }
            ].map((vocab, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                <div className="font-medium text-gray-900 text-sm">{vocab.word}</div>
                <div className="text-gray-600 text-xs mt-1">{vocab.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Study Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Read the transcript while watching the video to improve listening comprehension</li>
            <li>• Practice speaking by reading the transcript out loud</li>
            <li>• Use the vocabulary list to learn new words from this lesson</li>
            <li>• Copy sentences to practice writing and grammar</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TranscriptPage