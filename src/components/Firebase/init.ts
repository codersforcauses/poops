/* eslint-disable no-console */
import { getApp, getApps, initializeApp } from 'firebase/app' // no compat for new SDK
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig) // Initializes app if no app exists
} else {
  app = getApp() // Uses existing app if app exists
}

export const auth = getAuth(app) //get the current firebase user
export const db = getFirestore(app) //stores reference of database instance
export default app
