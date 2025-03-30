
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/jobs')
    }, 1000)
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">Access your job search dashboard</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="btn btn-outline"
            >
              {isLoading ? <span className="loading loading-spinner"></span> : null}
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}