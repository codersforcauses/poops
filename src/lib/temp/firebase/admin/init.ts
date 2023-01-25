import { App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
}

// Use emulator if running in development and emualtor is running
if (process.env.NEXT_PUBLIC_EMULATOR === 'true') {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099'
  process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
}

const app: App = !getApps().length
  ? initializeApp({
      credential: cert(firebaseAdminConfig),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  : getApps()[0]

console.log('Firebase Admin initialized')

const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, app as default, firestore }
