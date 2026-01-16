import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate Firebase config
const isConfigValid = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  )
}

// Initialize Firebase
let app: FirebaseApp
if (getApps().length === 0) {
  if (!isConfigValid()) {
    console.error('Firebase configuration is missing. Please check your environment variables.')
    throw new Error(
      'Firebase configuration is incomplete. Please set all NEXT_PUBLIC_FIREBASE_* environment variables.'
    )
  }
  try {
    app = initializeApp(firebaseConfig)
    console.log('✅ Firebase initialized successfully')
    console.log('📱 Project ID:', firebaseConfig.projectId)
    console.log('🔑 Auth Domain:', firebaseConfig.authDomain)
  } catch (error) {
    console.error('❌ Firebase initialization error:', error)
    throw new Error('Failed to initialize Firebase. Please check your configuration.')
  }
} else {
  app = getApps()[0]
}

// Initialize Auth
export const auth = getAuth(app)

export default app
