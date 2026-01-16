'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged, getIdToken } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

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
      if (user) {
        setAuthState({
          isAuthenticated: true,
          uid: user.uid,
          phone: user.phoneNumber,
          user,
        })
      } else {
        setAuthState({
          isAuthenticated: false,
          uid: null,
          phone: null,
          user: null,
        })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getIdTokenAsync = async (): Promise<string | null> => {
    if (!authState.user) return null
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
