// app/components/ProtectedRoute.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    // التحقق من وجود المستخدم في localStorage
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
    }
  }, [router])

  return <>{children}</>
}

export default ProtectedRoute