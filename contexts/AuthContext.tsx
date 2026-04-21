'use client'

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react'
import type { User, Auth } from 'firebase/auth'

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
  const authRef = useRef<Auth | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    async function initAuth() {
      try {
        // Dynamic import — Firebase SDK only loads when this effect runs on the client
        const { auth } = await import('@/lib/firebase/config')
        const { onAuthStateChanged, signOut } = await import('firebase/auth')
        authRef.current = auth

        unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
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
      } catch (error) {
        console.error('Failed to initialize Firebase auth:', error)
        setLoading(false)
      }
    }

    // Defer Firebase initialization to after first paint using requestIdleCallback
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(() => initAuth(), { timeout: 3000 })
    } else {
      // Fallback: still defer but use setTimeout
      setTimeout(initAuth, 100)
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const getIdTokenAsync = async (): Promise<string | null> => {
    if (!authState.user) return null
    if (typeof window !== 'undefined') {
      const timestamp = localStorage.getItem(AUTH_LOGIN_TIMESTAMP_KEY)
      if (timestamp) {
        const loginTime = parseInt(timestamp, 10)
        if (Date.now() - loginTime >= SESSION_MS) {
          localStorage.removeItem(AUTH_LOGIN_TIMESTAMP_KEY)
          if (authRef.current) {
            const { signOut } = await import('firebase/auth')
            await signOut(authRef.current)
          }
          return null
        }
      }
    }
    try {
      const { getIdToken } = await import('firebase/auth')
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
