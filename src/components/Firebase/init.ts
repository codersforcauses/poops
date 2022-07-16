/* eslint-disable no-console */
import { Context, createContext } from 'react'
import { getApp, getApps, initializeApp } from 'firebase/app' // no compat for new SDK
import { getAuth } from 'firebase/auth'
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import { ContactData, User, VisitData } from '@/types/types'

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

export const auth = getAuth(app)
export const db = getFirestore(app)

let docRef: DocumentReference<DocumentData>
export let UserContext: Context<User>

export const updateVisitData = async (user: User) => {
  getCurrentUser()
  await updateDoc(docRef, 'Visits', user.visits)
}

export const updateContactData = async (user: User) => {
  getCurrentUser()
  await updateDoc(docRef, 'Contacts', user.contacts)
}

const getData = async () => {
  const userDoc = await getDoc(docRef)
  const iVisitData: VisitData[] = await userDoc.get('Visits')
  const iContactData: ContactData[] = await userDoc.get('Contacts')

  const user: User = {
    contacts: iContactData,
    visits: iVisitData
  }
  UserContext = createContext(user)
}

export async function getInitialData() {
  const uid = getCurrentUser()?.uid
  if (uid) {
    // TODO: Change to uid - Adam is used for testing
    docRef = doc(db, 'TestUsers', 'Adam')
  } else console.log('no uid')

  try {
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      getData()
    } else {
      await setDoc(docRef, {})
    }
  } catch (error) {
    console.log(error)
  }
}

const getCurrentUser = () => {
  const currentUser = auth.currentUser
  if (currentUser === null) {
    return
  }
  return currentUser
}

export default app
