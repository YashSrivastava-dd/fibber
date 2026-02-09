'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'

export default function AccountDashboardPage() {
  const router = useRouter()
  const { phone, uid, getIdToken } = useAuth()
  const [profile, setProfile] = useState<{
    firstName?: string
    lastName?: string
    displayName?: string
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const token = await getIdToken()
      if (!token) return
      try {
        const res = await fetch('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok || cancelled) return
        const data = await res.json()
        if (!cancelled) setProfile(data)
      } catch {
        // ignore
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [getIdToken])

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') ||
    profile?.displayName ||
    (phone ? phone.replace(/\D/g, '').slice(-10) : null) ||
    (uid ? `user-${uid.slice(0, 8)}` : null) ||
    'there'

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        My Account
      </h1>
      <p className="text-gray-600 mb-6">
        Hello {displayName}{' '}
        (not {displayName}?{' '}
        <button type="button" onClick={handleLogout} className="text-gray-900 underline font-medium hover:no-underline">
          Log out
        </button>
        ).
      </p>
      <p className="text-gray-600 leading-relaxed">
        From your account dashboard you can view your{' '}
        <Link href="/account/orders" className="text-gray-900 underline font-medium">recent orders</Link>
        , manage your{' '}
        <Link href="/account/addresses" className="text-gray-900 underline font-medium">shipping and billing addresses</Link>
        , and edit your{' '}
        <Link href="/account/details" className="text-gray-900 underline font-medium">account details</Link>.
      </p>
    </div>
  )
}
