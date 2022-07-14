import { getApp, getApps, initializeApp } from 'firebase/app' // no compat for new SDK
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore'

import { useAuth } from '@/context/AuthContext'

const firebaseConfig = {
  apikey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const database = getFirestore(app)

let uid = '0'

const poopsRef = collection(database, 'Users')
const adamRef = collection(database, 'TestUsers/Adam/Visits')

const UpdateUid = async () => {
  const { auth } = useAuth()
  const user = auth.currentUser
  if (user !== null) { uid = user.uid }
}



export interface User {
  firstName: string
  lastName: string
  petName: string
  dateTime: string
  duration: string
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
}

export interface Visit extends User {
  id: string
}

export const WriteUserData = async (props: User) => {
  const colRef = collection(database, `TestUsers/${uid}/Visits`)
  const data = {
    firstName: props.firstName,
    lastName: props.lastName,
    petName: props.petName,
    dateTime: props.dateTime,
    duration: props.duration,
    walkDist: props.walkDist,
    commuteDist: props.commuteDist,
    commuteMethod: props.commuteMethod,
    notes: props.notes
  }
  await addDoc(colRef, data)
}

export const getVisitData = async () => {
  const colRef = collection(database, `TestUsers/${uid}/Visits`)
  const querySnapshot = await getDocs(colRef)
  const visitData: Visit[] = []
  let i = 0
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    const visit: Visit = {
      id: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      petName: data.petName,
      dateTime: data.dateTime,
      duration: data.duration,
      walkDist: data.walkDist,
      commuteDist: data.commuteDist,
      commuteMethod: data.commuteMethod,
      notes: data.notes
    }

    visitData[i] = visit
    i++
  })
  return visitData
}

export const updateUserData = async (id: string, props: User) => {
  await setDoc(doc(adamRef, id), props)
}

export const deletUserData = async (id: string) => {
  await deleteDoc(doc(adamRef, id))
}

export async function getInitialData(uid: string) {
  UpdateUid()
  const docRef = doc(database, `TestUsers/${uid}`)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('lol')
  }
  else {
    await setDoc(doc(database, 'TestUsers', uid), {})
  }
}
