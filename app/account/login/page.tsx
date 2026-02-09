'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

export default function AccountLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneDigits, setPhoneDigits] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)

  useEffect(() => {
    if (!auth) return
    if (!recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          'recaptcha-container-login',
          {
            size: 'invisible',
            callback: () => {},
            'expired-callback': () => {
              setError('Verification expired. Please try again.')
            },
          }
        )
      } catch (err: any) {
        setError(err.message || 'Failed to initialize. Refresh and try again.')
      }
    }
    return () => {
      try {
        recaptchaVerifierRef.current?.clear()
      } catch {}
      recaptchaVerifierRef.current = null
    }
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneDigits(e.target.value.replace(/\D/g, '').slice(0, 10))
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (!recaptchaVerifierRef.current) {
        throw new Error('Verification not ready. Please refresh the page.')
      }
      if (phoneDigits.length !== 10) {
        throw new Error('Please enter a valid 10-digit mobile number.')
      }
      const formattedPhone = '+91' + phoneDigits
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current
      )
      setConfirmationResult(confirmation)
      setStep('otp')
    } catch (err: any) {
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Enter a valid 10-digit Indian number.')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.')
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (!confirmationResult) {
        throw new Error('Session expired. Please start again.')
      }
      const userCredential = await confirmationResult.confirm(otp)
      const idToken = await userCredential.user.getIdToken(true)
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.')
      }
      router.push('/account')
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please check and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF] pt-28 pb-16">
      <div id="recaptcha-container-login" className="hidden" />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-black mb-2"
          style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
        >
          {step === 'phone' ? 'Login with mobile' : 'Enter OTP'}
        </h1>
        <p className="text-gray-600 mb-6">
          {step === 'phone'
            ? 'Enter your 10-digit mobile number to receive a one-time password.'
            : `Code sent to +91 ${phoneDigits}. Enter it below.`}
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneDigits}
                    onChange={handlePhoneChange}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                    maxLength={10}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-center text-2xl tracking-widest"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep('phone')
                  setOtp('')
                  setError(null)
                  setConfirmationResult(null)
                }}
                className="w-full text-sm text-gray-600 underline hover:text-black"
              >
                Use a different number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
