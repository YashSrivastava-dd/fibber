import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb, isAdminInitialized, getInitError } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // Check if Firebase Admin is initialized
  if (!isAdminInitialized() || !adminAuth || !adminDb) {
    const error = getInitError()
    console.error('Firebase Admin not initialized:', error)
    return NextResponse.json(
      { 
        error: 'Firebase Admin not configured. Please check FIREBASE_SERVICE_ACCOUNT_KEY in .env.local',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }

  try {
    // Get Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
        { status: 401 }
      )
    }

    const idToken = authHeader.split('Bearer ')[1]

    // Verify Firebase token
    let decodedToken
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken)
    } catch (error: any) {
      console.error('Token verification error:', error)
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      )
    }

    const firebaseUid = decodedToken.uid
    const phone = decodedToken.phone_number

    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Invalid token: No UID found' },
        { status: 400 }
      )
    }

    // Generate system email (stable per user doc)
    const systemEmail = `${firebaseUid}@fiberisefit.com`

    // Use phone number as the primary document ID when available so that
    // the same phone maps to the same user document across platforms.
    const userDocId = phone || firebaseUid

    // Get or create user in Firestore
    const userRef = adminDb.collection('users').doc(userDocId)
    const userDoc = await userRef.get()

    const now = new Date()

    if (userDoc.exists) {
      // Update existing user
      await userRef.update({
        phone: phone || null,
        systemEmail,
        updatedAt: now,
      })
    } else {
      // Create new user
      await userRef.set({
        firebaseUid,
        phone: phone || null,
        systemEmail,
        createdAt: now,
        updatedAt: now,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in /api/user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
