/* eslint-disable no-console */

import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
  Firestore,
  initializeFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let app: FirebaseApp
let auth: Auth
let db: Firestore

const clientSide = typeof window !== 'undefined'

// Runs on the client side
if (clientSide) {
  const isEmu = process.env.NEXT_PUBLIC_EMULATOR === 'true'

  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
  db = initializeFirestore(app, { experimentalForceLongPolling: isEmu })

  // Use emulator if running in development and emualtor is running
  if (isEmu) {
    // Pass the auth to the window if Cypress is running
    if (window.Cypress) {
      window.Firebase = [auth]
    }

    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 8080)
  }

  // Enables offline support for firestore
  if (!isEmu)
    // disable persistence for emus because it desyncs with firestore when db is cleared
    enableMultiTabIndexedDbPersistence(db).catch((err) => {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
        console.log(
          'The app is already open in another browser tab and multi-tab is not enabled'
        )
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
        console.log(
          'The current browser does not support all of the features required to enable persistence'
        )
      }
    })
  // Subsequent queries will use persistence, if it was enabled successfully
}

export { auth, db }

declare global {
  interface Window {
    Cypress?: unknown
    Firebase: Auth[]
  }
}
