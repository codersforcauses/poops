import { getApp, getApps, initializeApp } from 'firebase/app' // no compat for new SDK
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore'

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

const poopsRef = collection(database, 'Users')
const visitRef = collection(
  database,
  'User',
  'USERID',
  'Adam',
  'Visits',
  'VisitId'
)

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

export const writeUserData = async (props: User) => {
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
  await addDoc(poopsRef, data)
}

export const getVisitData = async () => {
  const querySnapshot = await getDocs(poopsRef)
  const visitData: Visit[] = []
  let i = 0
  querySnapshot.forEach((doc) => {
    console.log(i)
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
  await setDoc(doc(poopsRef, id), props)
}
