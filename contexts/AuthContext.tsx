'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged, getIdToken, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

const AUTH_LOGIN_TIMESTAMP_KEY = 'auth_login_timestamp'
const SESSION_DAYS = 15
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000

interface AuthState {
  isAuthenticated: boolean
  uid: string | null
  phone: string | null
  user: User | null
}

interface AuthContextType extends AuthState {
  loading: boolean
  getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    uid: null,
    phone: null,
    user: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(AUTH_LOGIN_TIMESTAMP_KEY)
        }
        setAuthState({
          isAuthenticated: false,
          uid: null,
          phone: null,
          user: null,
        })
      } else {
        if (typeof window !== 'undefined') {
          let timestamp = localStorage.getItem(AUTH_LOGIN_TIMESTAMP_KEY)
          if (!timestamp) {
            timestamp = String(Date.now())
            localStorage.setItem(AUTH_LOGIN_TIMESTAMP_KEY, timestamp)
          }
          const loginTime = parseInt(timestamp, 10)
          if (Date.now() - loginTime >= SESSION_MS) {
            localStorage.removeItem(AUTH_LOGIN_TIMESTAMP_KEY)
            await signOut(auth)
            return
          }
        }
        setAuthState({
          isAuthenticated: true,
          uid: user.uid,
          phone: user.phoneNumber,
          user,
        })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getIdTokenAsync = async (): Promise<string | null> => {
    if (!authState.user) return null
    if (typeof window !== 'undefined') {
      const timestamp = localStorage.getItem(AUTH_LOGIN_TIMESTAMP_KEY)
      if (timestamp) {
        const loginTime = parseInt(timestamp, 10)
        if (Date.now() - loginTime >= SESSION_MS) {
          localStorage.removeItem(AUTH_LOGIN_TIMESTAMP_KEY)
          await signOut(auth)
          return null
        }
      }
    }
    try {
      return await getIdToken(authState.user)
    } catch (error) {
      console.error('Error getting ID token:', error)
      return null
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loading,
        getIdToken: getIdTokenAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
