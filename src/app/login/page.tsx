'use client'

import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from "axios"
import { Session } from "next-auth"

interface BackendUserResponse {
  message: string;
  email: string;
  user_id: number;
}

export default function Login() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  useEffect(() => {
    const storeUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        setDebugInfo("Session found, attempting to store user...");
        try {

          const userData = await storeUserInDB(session);


          if (userData && userData.user_id) {
            await update({
              ...session,
              user: {
                ...session.user,
                backendId: userData.user_id
              }
            });
          }

          setDebugInfo("User stored successfully, redirecting...");
          router.push('/jobs');
        } catch (err) {
          setError("Failed to store user data. Please try again.");
          console.error("User storage error:", err);
        }
      }
    };

    if (status === "authenticated") {
      storeUser();
    }
  }, [session, status, router, update]);


  const storeUserInDB = async (session: Session): Promise<BackendUserResponse> => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const endpoint = `${API_URL}/auth/google`;

    console.log(`Attempting to store user at: ${endpoint}`);
    console.log("User data:", {
      name: session?.user?.name,
      email: session?.user?.email
    });

    try {
      const response = await axios.post<BackendUserResponse>(endpoint, {
        name: session?.user?.name,
        email: session?.user?.email
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 8000,
        withCredentials: false
      });

      console.log("Backend response:", response.data);
      setDebugInfo(`Backend response status: ${response.status}`);


      if (response.data.user_id) {
        localStorage.setItem('backendUserId', response.data.user_id.toString());
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Server error response:", error.response.data);
        console.error("Status code:", error.response.status);
        setDebugInfo(`Error status: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response was received

        setDebugInfo("No response from server - check if backend is running");
      } else {
        console.error("Request setup error:", error.message);
        setDebugInfo(`Request error: ${error.message}`);
      }
      throw error;
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log("Starting Google sign-in process...");
      await signIn('google', { redirect: false })
    } catch (error: any) {
      console.error('Login error:', error)
      setError("Login failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-primary text-3xl font-bold">Apptit</span>
          <h1 className="text-3xl font-bold mt-6 text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to access Job Listings</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* {debugInfo && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
                Debug info: {debugInfo}
              </div>
            )} */}

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center w-full py-3 px-4 rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              {!isLoading && (
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              {isLoading ? "Loading..." : "Continue with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
