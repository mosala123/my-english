'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { IoMic, IoMicOff, IoPlay, IoStop, IoVolumeHigh, IoCheckmarkCircle, IoTime } from 'react-icons/io5'

const SpeakingPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(0)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  // تمارين التحدث
  const speakingExercises = [
    {
      id: 1,
      title: 'Self Introduction',
      description: 'Practice introducing yourself in English',
      level: 'Beginner',
      duration: '2 minutes',
      prompt: 'Please introduce yourself. Talk about your name, where you are from, your job or studies, and your hobbies.',
      tips: [
        'Speak clearly and at a moderate pace',
        'Use simple sentences',
        'Practice common phrases like "My name is..." and "I am from..."'
      ],
      sampleResponse: 'Hello, my name is Alex. I am from Cairo, Egypt. I am a software developer. In my free time, I enjoy reading books and playing football.'
    },
    {
      id: 2,
      title: 'Describing Your Day',
      description: 'Practice talking about your daily routine',
      level: 'Elementary',
      duration: '3 minutes',
      prompt: 'Describe your typical day from morning until evening. What do you usually do?',
      tips: [
        'Use present simple tense',
        'Include time expressions like "in the morning", "after work"',
        'Describe both work and leisure activities'
      ],
      sampleResponse: 'I usually wake up at 7 AM. After breakfast, I go to work. In the evening, I often watch TV or meet friends.'
    },
    {
      id: 3,
      title: 'Giving Opinions',
      description: 'Practice expressing your opinions on various topics',
      level: 'Intermediate',
      duration: '4 minutes',
      prompt: 'What is your opinion about remote work? Do you think it is better than working in an office?',
      tips: [
        'Use opinion phrases like "In my opinion", "I believe that"',
        'Provide reasons for your opinion',
        'Consider both advantages and disadvantages'
      ],
      sampleResponse: 'In my opinion, remote work has both advantages and disadvantages. On one hand, it offers flexibility...'
    },
    {
      id: 4,
      title: 'Business Presentation',
      description: 'Practice presenting a business idea',
      level: 'Advanced',
      duration: '5 minutes',
      prompt: 'Present a new product or service idea for a company. Explain its features and benefits.',
      tips: [
        'Structure your presentation clearly',
        'Use persuasive language',
        'Maintain professional tone',
        'Practice transitions between ideas'
      ],
      sampleResponse: 'Good morning everyone. Today, I would like to present our new mobile application that helps people learn languages...'
    }
  ]

  // بدء التسجيل
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setRecordedAudio(audioBlob)
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioUrl(audioUrl)
        generateFeedback()
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please allow microphone access to use speaking practice.')
    }
  }

  // إيقاف التسجيل
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  // تشغيل التسجيل
  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // إيقاف التشغيل
  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  // توليد feedback (محاكاة)
  const generateFeedback = () => {
    const exercises = [
      "Good job! Your pronunciation is clear. Try to speak a bit slower for better clarity.",
      "Excellent vocabulary usage! Work on your sentence rhythm and intonation.",
      "Great content! Practice using more linking words to connect your ideas.",
      "Good fluency! Focus on correcting the pronunciation of specific words."
    ]
    const randomFeedback = exercises[Math.floor(Math.random() * exercises.length)]
    setFeedback(randomFeedback)
    setShowFeedback(true)
  }

  // عندما ينتهي التشغيل
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setIsPlaying(false)
      audio.addEventListener('ended', handleEnded)
      return () => audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  const currentExercise = speakingExercises[selectedExercise]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Speaking Practice</h1>
          <p className="text-gray-600">Improve your English speaking skills with interactive exercises</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Exercises List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Speaking Exercises</h2>
              <div className="space-y-3">
                {speakingExercises.map((exercise, index) => (
                  <button
                    key={exercise.id}
                    onClick={() => {
                      setSelectedExercise(index)
                      setShowFeedback(false)
                      setRecordedAudio(null)
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedExercise === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        exercise.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        exercise.level === 'Elementary' ? 'bg-blue-100 text-blue-800' :
                        exercise.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {exercise.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <IoTime className="w-3 h-3" />
                        {exercise.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-xl p-6 mt-6">
              <h3 className="font-semibold text-blue-900 mb-3">💡 Speaking Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Practice regularly, even for short periods</li>
                <li>• Don't worry about making mistakes</li>
                <li>• Record yourself and listen back</li>
                <li>• Focus on clarity, not speed</li>
                <li>• Use gestures to help with rhythm</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Exercise Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Current Exercise */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{currentExercise.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IoTime className="w-4 h-4" />
                  {currentExercise.duration}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {currentExercise.prompt}
                </p>
              </div>

              {/* Tips */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Tips:</h3>
                <ul className="space-y-1">
                  {currentExercise.tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <IoCheckmarkCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Response */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Sample Response:</h3>
                <p className="text-gray-600 italic bg-yellow-50 p-4 rounded-lg">
                  "{currentExercise.sampleResponse}"
                </p>
              </div>

              {/* Recording Controls */}
              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="flex items-center gap-4">
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                      >
                        <IoMic className="w-5 h-5" />
                        Start Recording
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                      >
                        <IoMicOff className="w-5 h-5" />
                        Stop Recording
                      </button>
                    )}

                    {recordedAudio && (
                      <>
                        {!isPlaying ? (
                          <button
                            onClick={playRecording}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                          >
                            <IoPlay className="w-5 h-5" />
                            Play Back
                          </button>
                        ) : (
                          <button
                            onClick={stopPlaying}
                            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                          >
                            <IoStop className="w-5 h-5" />
                            Stop
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {isRecording && (
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Recording...</span>
                    </div>
                  )}
                </div>

                {/* Audio Player (Hidden) */}
                <audio ref={audioRef} src={audioUrl} className="hidden" />
              </div>
            </div>

            {/* Feedback Section */}
            {showFeedback && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <IoVolumeHigh className="w-5 h-5" />
                  AI Feedback
                </h3>
                <p className="text-green-800">{feedback}</p>
                <div className="mt-4 flex gap-2">
                  <button className="text-sm text-green-700 hover:text-green-800 font-medium">
                    Practice Again
                  </button>
                  <span className="text-green-600">•</span>
                  <button className="text-sm text-green-700 hover:text-green-800 font-medium">
                    Save Recording
                  </button>
                </div>
              </div>
            )}

            {/* Progress Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Speaking Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">Exercises Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">45</div>
                  <div className="text-sm text-gray-600">Minutes Practiced</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">8.2</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">7</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpeakingPage