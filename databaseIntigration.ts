import { getApp, getApps, initializeApp } from 'firebase/app' // no compat for new SDK
import { addDoc, collection, getFirestore } from 'firebase/firestore'

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
const poopsref = collection(database, 'Users')

export async function writeUserData(
  fname: string,
  lname: string,
  pname: string,
  date: string,
  distance: string
) {
  await addDoc(poopsref, {
    firstName: fname,
    lastName: lname,
    petName: pname,
    dateTime: date,
    distanceWalked: distance
  })
}
