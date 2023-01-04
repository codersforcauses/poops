import { App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
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
