'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { IoCheckmarkCircle, IoCloseCircle, IoArrowForward, IoTime, IoVolumeHigh, IoDocumentText, IoMic, IoPencil, IoPause, IoPlay } from 'react-icons/io5'

const AssessmentPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [textAnswer, setTextAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const recordingTimerRef = useRef<any>(null)

  // أسئلة متنوعة حقيقية مع Speaking و Listening
  const questions = [
    // ========== BEGINNER LEVEL (A1) ==========
    {
      id: 1,
      type: 'multiple',
      category: 'Grammar',
      question: "Complete: My name ___ Ahmed.",
      options: ["is", "am", "are", "be"],
      correct: 0,
      level: "A1",
      icon: IoPencil
    },
    {
      id: 2,
      type: 'listening',
      category: 'Listening',
      question: "Listen and choose what you hear:",
      audio: "Hello, my name is Sarah.",
      options: ["Hello, my name is Sarah.", "Hello, my name is Sally.", "Hello, your name is Sarah.", "Hi, my name is Sarah."],
      correct: 0,
      level: "A1",
      icon: IoVolumeHigh
    },
    {
      id: 3,
      type: 'multiple',
      category: 'Vocabulary',
      question: "What is the opposite of 'hot'?",
      options: ["warm", "cold", "cool", "freeze"],
      correct: 1,
      level: "A1",
      icon: IoPencil
    },
    {
      id: 4,
      type: 'speaking',
      category: 'Speaking',
      question: "Introduce yourself. Say your name and where you are from.",
      prompt: "Example: My name is Ahmed and I am from Egypt.",
      level: "A1",
      icon: IoMic,
      minSeconds: 5
    },
    
    // ========== ELEMENTARY (A2) ==========
    {
      id: 5,
      type: 'multiple',
      category: 'Grammar',
      question: "Choose the correct sentence:",
      options: [
        "She don't like coffee.",
        "She doesn't likes coffee.",
        "She doesn't like coffee.",
        "She not like coffee."
      ],
      correct: 2,
      level: "A2",
      icon: IoPencil
    },
    {
      id: 6,
      type: 'reading',
      category: 'Reading',
      passage: "Sarah works at a hospital. She is a nurse. She starts work at 7 AM and finishes at 3 PM. She likes helping people.",
      question: "What time does Sarah finish work?",
      options: ["7 AM", "3 PM", "8 AM", "5 PM"],
      correct: 1,
      level: "A2",
      icon: IoDocumentText
    },
    {
      id: 7,
      type: 'listening',
      category: 'Listening',
      question: "What is the weather like today?",
      audio: "The weather is sunny and warm today.",
      options: ["Rainy and cold", "Sunny and warm", "Cloudy and cool", "Snowy and cold"],
      correct: 1,
      level: "A2",
      icon: IoVolumeHigh
    },
    {
      id: 8,
      type: 'writing',
      category: 'Writing',
      question: "Write a simple sentence about your favorite food. (Minimum 5 words)",
      placeholder: "Example: I like pizza very much.",
      level: "A2",
      icon: IoPencil,
      minWords: 5
    },
    
    // ========== INTERMEDIATE (B1) ==========
    {
      id: 9,
      type: 'multiple',
      category: 'Grammar',
      question: "If I ___ more money, I would travel the world.",
      options: ["have", "had", "will have", "having"],
      correct: 1,
      level: "B1",
      icon: IoPencil
    },
    {
      id: 10,
      type: 'reading',
      category: 'Reading',
      passage: "Climate change is one of the most pressing issues of our time. Rising temperatures are causing ice caps to melt, leading to higher sea levels. Scientists warn that if we don't take action now, the consequences could be devastating for future generations.",
      question: "What is the main concern about climate change mentioned?",
      options: [
        "It's too expensive to fix",
        "Rising temperatures and melting ice caps",
        "Scientists disagree about it",
        "It only affects animals"
      ],
      correct: 1,
      level: "B1",
      icon: IoDocumentText
    },
    {
      id: 11,
      type: 'speaking',
      category: 'Speaking',
      question: "Talk about your daily routine. What do you do in the morning?",
      prompt: "Speak for at least 10 seconds about your morning activities.",
      level: "B1",
      icon: IoMic,
      minSeconds: 10
    },
    {
      id: 12,
      type: 'listening',
      category: 'Listening',
      question: "What does the speaker suggest?",
      audio: "I think we should meet at the coffee shop around 3 PM. It's quiet there and we can talk.",
      options: [
        "Meet at a restaurant at 2 PM",
        "Meet at the coffee shop at 3 PM",
        "Meet at home at 3 PM",
        "Call instead of meeting"
      ],
      correct: 1,
      level: "B1",
      icon: IoVolumeHigh
    },
    {
      id: 13,
      type: 'writing',
      category: 'Writing',
      question: "Describe your daily routine in 2-3 sentences.",
      placeholder: "Example: I wake up at 7 AM. Then I have breakfast and go to work...",
      level: "B1",
      icon: IoPencil,
      minWords: 15
    },
    
    // ========== UPPER INTERMEDIATE (B2) ==========
    {
      id: 14,
      type: 'multiple',
      category: 'Grammar',
      question: "By the time you arrive, I ___ dinner.",
      options: [
        "will finish",
        "will have finished",
        "finish",
        "am finishing"
      ],
      correct: 1,
      level: "B2",
      icon: IoPencil
    },
    {
      id: 15,
      type: 'reading',
      category: 'Reading',
      passage: "The proliferation of artificial intelligence in modern workplaces has sparked considerable debate. While proponents argue that AI enhances productivity and reduces human error, critics contend that it may lead to significant job displacement. Nevertheless, most experts agree that the key lies in finding a balance between technological advancement and workforce development.",
      question: "What is the main point of this passage?",
      options: [
        "AI will replace all human jobs",
        "AI is completely bad for society",
        "There's debate about AI's impact, but balance is important",
        "AI only has positive effects"
      ],
      correct: 2,
      level: "B2",
      icon: IoDocumentText
    },
    {
      id: 16,
      type: 'speaking',
      category: 'Speaking',
      question: "What is your opinion about social media? Give reasons for your answer.",
      prompt: "Speak for at least 15 seconds about the advantages and disadvantages.",
      level: "B2",
      icon: IoMic,
      minSeconds: 15
    },
    {
      id: 17,
      type: 'writing',
      category: 'Writing',
      question: "Write your opinion about social media in 3-4 sentences. Include advantages and disadvantages.",
      placeholder: "Social media has both positive and negative aspects...",
      level: "B2",
      icon: IoPencil,
      minWords: 25
    },
    
    // ========== ADVANCED (C1) ==========
    {
      id: 18,
      type: 'multiple',
      category: 'Grammar',
      question: "Had I known about the traffic, I ___ earlier.",
      options: [
        "would leave",
        "will have left",
        "would have left",
        "had left"
      ],
      correct: 2,
      level: "C1",
      icon: IoPencil
    },
    {
      id: 19,
      type: 'listening',
      category: 'Listening',
      question: "What is the speaker's main argument?",
      audio: "While technological advancement brings numerous benefits, we must not overlook its potential drawbacks. A balanced approach is essential.",
      options: [
        "Technology is always good",
        "We should stop using technology",
        "We need a balanced approach to technology",
        "Technology has no drawbacks"
      ],
      correct: 2,
      level: "C1",
      icon: IoVolumeHigh
    },
    {
      id: 20,
      type: 'speaking',
      category: 'Speaking',
      question: "Discuss the impact of globalization on local cultures. Provide examples.",
      prompt: "Speak for at least 20 seconds with specific examples and analysis.",
      level: "C1",
      icon: IoMic,
      minSeconds: 20
    },
    {
      id: 21,
      type: 'writing',
      category: 'Writing',
      question: "Discuss the impact of globalization on local cultures. Write 4-5 sentences with examples.",
      placeholder: "Globalization has profoundly affected local cultures in various ways...",
      level: "C1",
      icon: IoPencil,
      minWords: 35
    },
    
    // ========== PROFICIENT (C2) ==========
    {
      id: 22,
      type: 'multiple',
      category: 'Grammar',
      question: "Select the sentence with correct advanced structure:",
      options: [
        "Scarcely had she entered when the phone rang.",
        "Scarcely she had entered when the phone rang.",
        "She scarcely had entered when the phone rang.",
        "Scarcely she entered when the phone rang."
      ],
      correct: 0,
      level: "C2",
      icon: IoPencil
    },
    {
      id: 23,
      type: 'reading',
      category: 'Reading',
      passage: "The paradigm shift in epistemological approaches to quantum mechanics has necessitated a fundamental reassessment of deterministic causality. This reconceptualization challenges the Newtonian framework that has underpinned classical physics for centuries, suggesting instead a probabilistic interpretation of subatomic phenomena.",
      question: "What does this passage primarily discuss?",
      options: [
        "Simple physics concepts",
        "A change in how we understand quantum mechanics",
        "Newton's biography",
        "Mathematical equations"
      ],
      correct: 1,
      level: "C2",
      icon: IoDocumentText
    },
    {
      id: 24,
      type: 'speaking',
      category: 'Speaking',
      question: "Analyze the following: 'Technological advancement inevitably leads to social inequality.' Present both perspectives.",
      prompt: "Speak for at least 25 seconds presenting a nuanced analysis.",
      level: "C2",
      icon: IoMic,
      minSeconds: 25
    }
  ]

  const handleMultipleChoice = (answerIndex: number) => {
    const currentQ = questions[currentQuestion]
    const correct = answerIndex === currentQ.correct
    
    setIsCorrect(correct)
    setShowFeedback(true)
    
    const newAnswers = [...answers, {
      questionId: currentQ.id,
      type: currentQ.type,
      answer: answerIndex,
      correct: correct,
      level: currentQ.level
    }]
    setAnswers(newAnswers)

    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResults(true)
      }
    }, 1500)
  }

  const handleWritingSubmit = () => {
    const currentQ = questions[currentQuestion]
    const wordCount = textAnswer.trim().split(/\s+/).filter(w => w).length
    const meetsRequirement = wordCount >= (currentQ.minWords || 5)
    
    const newAnswers = [...answers, {
      questionId: currentQ.id,
      type: 'writing',
      answer: textAnswer,
      wordCount: wordCount,
      correct: meetsRequirement,
      level: currentQ.level
    }]
    setAnswers(newAnswers)
    setTextAnswer('')
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setHasRecorded(true)
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current)
    }
  }

  const handleSpeakingSubmit = () => {
    const currentQ = questions[currentQuestion]
    const meetsRequirement = recordingTime >= (currentQ.minSeconds || 5)
    
    const newAnswers = [...answers, {
      questionId: currentQ.id,
      type: 'speaking',
      recordingTime: recordingTime,
      correct: meetsRequirement,
      level: currentQ.level
    }]
    setAnswers(newAnswers)
    setRecordingTime(0)
    setHasRecorded(false)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const playAudio = (text: string) => {
    setIsPlayingAudio(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.onend = () => setIsPlayingAudio(false)
    speechSynthesis.speak(utterance)
  }

  const calculateDetailedResults = () => {
    const totalQuestions = answers.length
    const correctAnswers = answers.filter(a => a.correct).length
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    
    const levelPerformance: any = {}
    answers.forEach(answer => {
      if (!levelPerformance[answer.level]) {
        levelPerformance[answer.level] = { correct: 0, total: 0 }
      }
      levelPerformance[answer.level].total++
      if (answer.correct) levelPerformance[answer.level].correct++
    })

    const typePerformance: any = {}
    answers.forEach(answer => {
      const type = answer.type === 'multiple' ? 'Grammar/Vocabulary' : answer.type
      if (!typePerformance[type]) {
        typePerformance[type] = { correct: 0, total: 0 }
      }
      typePerformance[type].total++
      if (answer.correct) typePerformance[type].correct++
    })

    let level = 'A1'
    let description = 'Beginner'
    let detailedDescription = ''
    let strengths: string[] = []
    let improvements: string[] = []
    let recommendations: string[] = []

    if (percentage >= 90) {
      level = 'C2'
      description = 'Proficient'
      detailedDescription = 'You demonstrate mastery of English with near-native fluency. You can understand virtually everything with ease and express yourself spontaneously and precisely.'
      strengths = [
        'Excellent command of complex grammar structures',
        'Rich and nuanced vocabulary usage',
        'Strong reading comprehension of academic texts',
        'Ability to express subtle shades of meaning'
      ]
      improvements = [
        'Continue exposure to diverse native-level content',
        'Practice specialized vocabulary in your field',
        'Engage in debates and academic discussions'
      ]
      recommendations = [
        'Read academic journals and literature',
        'Write research papers or articles',
        'Participate in professional conferences',
        'Consider teaching or mentoring others'
      ]
    } else if (percentage >= 80) {
      level = 'C1'
      description = 'Advanced'
      detailedDescription = 'You can understand demanding, longer texts and recognize implicit meaning. You can express yourself fluently without much obvious searching for expressions.'
      strengths = [
        'Strong grasp of advanced grammar',
        'Good vocabulary range for complex topics',
        'Ability to understand implicit meanings',
        'Effective use of organizational patterns'
      ]
      improvements = [
        'Expand academic and specialized vocabulary',
        'Practice producing more sophisticated writing',
        'Work on idiomatic expressions and colloquialisms',
        'Develop argumentation and critical thinking skills'
      ]
      recommendations = [
        'Read challenging books and articles',
        'Write essays on complex topics',
        'Watch documentaries without subtitles',
        'Join advanced conversation groups',
        'Practice 45-60 minutes daily'
      ]
    } else if (percentage >= 65) {
      level = 'B2'
      description = 'Upper Intermediate'
      detailedDescription = 'You can understand the main ideas of complex text on both concrete and abstract topics. You can interact with a degree of fluency and spontaneity.'
      strengths = [
        'Good understanding of main ideas in complex texts',
        'Ability to communicate fluently in most situations',
        'Solid grasp of intermediate grammar',
        'Growing vocabulary in various domains'
      ]
      improvements = [
        'Strengthen advanced grammar structures',
        'Expand vocabulary for abstract concepts',
        'Improve writing coherence and cohesion',
        'Work on understanding implicit information',
        'Practice formal and informal registers'
      ]
      recommendations = [
        'Read news articles and opinion pieces',
        'Write longer texts (essays, reports)',
        'Watch movies and series in English',
        'Engage in discussions on various topics',
        'Practice 30-45 minutes daily'
      ]
    } else if (percentage >= 50) {
      level = 'B1'
      description = 'Intermediate'
      detailedDescription = 'You can understand the main points of clear standard input on familiar matters. You can deal with most situations likely to arise while traveling.'
      strengths = [
        'Understand main points on familiar topics',
        'Can handle most travel situations',
        'Basic grasp of common grammar structures',
        'Growing confidence in everyday communication'
      ]
      improvements = [
        'Expand vocabulary beyond basic words',
        'Practice more complex sentence structures',
        'Improve listening comprehension speed',
        'Work on writing longer, connected texts',
        'Develop ability to express opinions and reasons'
      ]
      recommendations = [
        'Read graded readers at B1 level',
        'Write short paragraphs daily',
        'Listen to podcasts for learners',
        'Practice speaking about familiar topics',
        'Study 30 minutes daily consistently'
      ]
    } else if (percentage >= 35) {
      level = 'A2'
      description = 'Elementary'
      detailedDescription = 'You can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g., personal and family information, shopping, employment).'
      strengths = [
        'Can communicate in simple, routine tasks',
        'Understand basic personal and family information',
        'Know common everyday vocabulary',
        'Can describe immediate environment'
      ]
      improvements = [
        'Build fundamental vocabulary systematically',
        'Master basic verb tenses (present, past, future)',
        'Practice forming simple questions and answers',
        'Improve pronunciation of common words',
        'Learn basic conjunctions to connect ideas'
      ]
      recommendations = [
        'Use flashcards for vocabulary building',
        'Practice basic conversations daily',
        'Read simple short texts',
        'Watch content with subtitles',
        'Study 20-30 minutes daily',
        'Focus on high-frequency words first'
      ]
    } else {
      level = 'A1'
      description = 'Beginner'
      detailedDescription = 'You can understand and use familiar everyday expressions and very basic phrases. You can introduce yourself and others and ask and answer questions about personal details.'
      strengths = [
        'Can understand basic greetings and introductions',
        'Know some common words and phrases',
        'Can recognize familiar words',
        'Beginning to form simple sentences'
      ]
      improvements = [
        'Learn the alphabet and basic pronunciation',
        'Build a foundation of 500-1000 common words',
        'Master present simple tense',
        'Practice basic sentence structure (Subject + Verb + Object)',
        'Learn numbers, days, months, colors'
      ]
      recommendations = [
        'Start with beginner apps (Duolingo, Memrise)',
        'Practice writing simple sentences daily',
        'Listen to slow, clear audio for beginners',
        'Learn 10 new words every day',
        'Study 15-20 minutes daily consistently',
        'Focus on survival English first'
      ]
    }

    // تحليل الأداء حسب المهارات
    if (typePerformance.listening && (typePerformance.listening.correct / typePerformance.listening.total) < 0.6) {
      improvements.push('Improve listening skills with daily audio practice')
    }
    if (typePerformance.reading && (typePerformance.reading.correct / typePerformance.reading.total) < 0.6) {
      improvements.push('Read more English texts regularly')
    }
    if (typePerformance.writing && (typePerformance.writing.correct / typePerformance.writing.total) < 0.6) {
      improvements.push('Practice writing exercises more frequently')
    }
    if (typePerformance.speaking && (typePerformance.speaking.correct / typePerformance.speaking.total) < 0.6) {
      improvements.push('Practice speaking out loud daily')
    }

    return {
      level,
      description,
      detailedDescription,
      percentage,
      correctAnswers,
      totalQuestions,
      strengths,
      improvements,
      recommendations,
      levelPerformance,
      typePerformance
    }
  }

  const startTest = () => {
    setTestStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <IoTime className="w-10 h-10 text-blue-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Complete English Assessment
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take this comprehensive test covering <span className="font-bold text-blue-600">Grammar, Vocabulary, Reading, Writing, Listening, and Speaking</span> to discover your true English level.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{questions.length}</div>
                <div className="text-sm text-gray-700">Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">20-25</div>
                <div className="text-sm text-gray-700">Minutes</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">6</div>
                <div className="text-sm text-gray-700">Skills</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">A1-C2</div>
                <div className="text-sm text-gray-700">Levels</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">📋 Test Includes:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <IoPencil className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Grammar</div>
                    <div className="text-sm text-gray-600">Tenses & structures</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoDocumentText className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Reading</div>
                    <div className="text-sm text-gray-600">Comprehension</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoPencil className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Writing</div>
                    <div className="text-sm text-gray-600">Expression</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoVolumeHigh className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Listening</div>
                    <div className="text-sm text-gray-600">Audio comprehension</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoMic className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Speaking</div>
                    <div className="text-sm text-gray-600">Oral expression</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoPencil className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Vocabulary</div>
                    <div className="text-sm text-gray-600">Word knowledge</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startTest}
              className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 mx-auto shadow-lg"
            >
              Start Full Assessment
              <IoArrowForward className="w-5 h-5" />
            </button>

            <p className="mt-4 text-gray-500 text-sm">
              This test will evaluate all your English skills comprehensively
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const result = calculateDetailedResults()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 pt-20 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCheckmarkCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Assessment Complete!
              </h1>
              <p className="text-gray-600">Here are your detailed results</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 mb-8 text-center">
              <div className="text-6xl font-bold mb-2">{result.level}</div>
              <div className="text-2xl opacity-90 mb-3">{result.description}</div>
              <div className="text-lg opacity-80">{result.percentage}% Overall Score</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{result.correctAnswers}</div>
                <div className="text-gray-700">Correct</div>
              </div>
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">{result.totalQuestions - result.correctAnswers}</div>
                <div className="text-gray-700">Incorrect</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{result.percentage}%</div>
                <div className="text-gray-700">Accuracy</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">📊 Your Level Explained:</h3>
              <p className="text-gray-700 leading-relaxed">{result.detailedDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <IoCheckmarkCircle className="w-5 h-5" />
                  Your Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength: string, i: number) => (
                    <li key={i} className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <IoCloseCircle className="w-5 h-5" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {result.improvements.map((improvement: string, i: number) => (
                    <li key={i} className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-600 mt-1">→</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <IoArrowForward className="w-5 h-5" />
                Personalized Recommendations
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="text-gray-700 flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-purple-900 mb-4">📈 Skills Breakdown:</h3>
              <div className="space-y-4">
                {Object.keys(result.typePerformance).map((type) => {
                  const perf = result.typePerformance[type]
                  const percentage = Math.round((perf.correct / perf.total) * 100)
                  return (
                    <div key={type}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium capitalize flex items-center gap-2">
                          {type === 'listening' && <IoVolumeHigh className="w-4 h-4" />}
                          {type === 'reading' && <IoDocumentText className="w-4 h-4" />}
                          {type === 'writing' && <IoPencil className="w-4 h-4" />}
                          {type === 'speaking' && <IoMic className="w-4 h-4" />}
                          {type === 'Grammar/Vocabulary' && <IoPencil className="w-4 h-4" />}
                          {type}
                        </span>
                        <span className="text-gray-600 font-semibold">{perf.correct}/{perf.total} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-3 shadow-inner">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            percentage >= 80 ? 'bg-green-500' : 
                            percentage >= 60 ? 'bg-blue-500' : 
                            percentage >= 40 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/learn"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Start Learning at {result.level}
                <IoArrowForward className="w-5 h-5" />
              </Link>
              <button 
                onClick={startTest}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion) / questions.length) * 100
  const Icon = currentQ.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {currentQ.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentQ.level.startsWith('A') ? 'bg-green-100 text-green-800' :
                  currentQ.level.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQ.level}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* READING with separated passage */}
          {currentQ.type === 'reading' && (
            <>
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold text-lg">
                  <IoDocumentText className="w-6 h-6" />
                  Reading Passage
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed text-base">
                    {currentQ.passage}
                  </p>
                </div>
              </div>
              
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentQ.question}
                </h2>
              </div>
            </>
          )}

          {/* LISTENING */}
          {currentQ.type === 'listening' && (
            <>
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentQ.question}
                  </h2>
                </div>
                <div className="flex justify-center mb-6">
                  <button
                    onClick={()=>playAudio(currentQ.audio)}
                    disabled={isPlayingAudio}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-3 shadow-lg disabled:opacity-50"
                  >
                    <IoVolumeHigh className="w-6 h-6" />
                    {isPlayingAudio ? 'Playing...' : 'Play Audio'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* SPEAKING */}
          {currentQ.type === 'speaking' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentQ.question}
                </h2>
                <p className="text-gray-600 italic">{currentQ.prompt}</p>
              </div>
              
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-xl border-2 border-pink-200 text-center">
                  {!isRecording && !hasRecorded && (
                    <div>
                      <IoMic className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                      <p className="text-gray-700 mb-4">Click the button below to start recording your answer</p>
                      <button
                        onClick={startRecording}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg"
                      >
                        Start Recording
                      </button>
                    </div>
                  )}
                  
                  {isRecording && (
                    <div>
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                          <IoMic className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-red-600 mb-4">Recording... {recordingTime}s</p>
                      <p className="text-gray-600 mb-4">Speak clearly into your microphone</p>
                      <button
                        onClick={stopRecording}
                        className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors"
                      >
                        Stop Recording
                      </button>
                    </div>
                  )}
                  
                  {hasRecorded && !isRecording && (
                    <div>
                      <IoCheckmarkCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <p className="text-xl font-bold text-green-700 mb-2">Recording Complete!</p>
                      <p className="text-gray-600 mb-4">Duration: {recordingTime} seconds</p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={handleSpeakingSubmit}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
                        >
                          Submit Answer
                          <IoArrowForward className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setHasRecorded(false)
                            setRecordingTime(0)
                          }}
                          className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Re-record
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* WRITING */}
          {currentQ.type === 'writing' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentQ.question}
                </h2>
              </div>
              <div className="max-w-2xl mx-auto mb-6">
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-32 resize-y text-base"
                  rows={6}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">
                    Words: {textAnswer.trim().split(/\s+/).filter(w => w).length} 
                    {currentQ.minWords && ` / ${currentQ.minWords} minimum`}
                  </span>
                  <button
                    onClick={handleWritingSubmit}
                    disabled={!textAnswer.trim() || textAnswer.trim().split(/\s+/).filter(w => w).length < (currentQ.minWords || 5)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                  >
                    Submit Answer
                    <IoArrowForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* MULTIPLE CHOICE (for non-reading questions) */}
          {(currentQ.type === 'multiple' || currentQ.type === 'listening' || currentQ.type === 'reading') && (
            <>
              {currentQ.type === 'multiple' && (
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentQ.question}
                  </h2>
                </div>
              )}
              
              <div className="space-y-3 max-w-2xl mx-auto mb-6">
                {currentQ.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleMultipleChoice(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      showFeedback && index === currentQ.correct
                        ? 'border-green-500 bg-green-50'
                        : showFeedback && index !== currentQ.correct && answers[answers.length - 1]?.answer === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          showFeedback && index === currentQ.correct
                            ? 'bg-green-200 text-green-800'
                            : showFeedback && index !== currentQ.correct && answers[answers.length - 1]?.answer === index
                            ? 'bg-red-200 text-red-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-base">{option}</span>
                      </div>
                      {showFeedback && index === currentQ.correct && (
                        <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                      )}
                      {showFeedback && index !== currentQ.correct && answers[answers.length - 1]?.answer === index && (
                        <IoCloseCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800">Excellent! That's correct!</span>
                  </>
                ) : (
                  <>
                    <IoCloseCircle className="w-6 h-6 text-red-600" />
                    <span className="font-bold text-red-800">Not quite right</span>
                  </>
                )}
              </div>
              {!isCorrect && currentQ.type !== 'speaking' && currentQ.type !== 'writing' && (
                <p className="text-gray-700 text-sm">
                  Correct answer: <strong>{currentQ.options[currentQ.correct]}</strong>
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(prev => prev - 1)
                  setShowFeedback(false)
                }
              }}
              disabled={currentQuestion === 0}
              className="text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
            >
              ← Previous
            </button>
            
            <div className="text-sm text-gray-500">
              {currentQ.type === 'writing' ? 'Write your answer' : 
               currentQ.type === 'speaking' ? 'Record your answer' : 
               'Select your answer'}
            </div>
            
            <div className="w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentPage