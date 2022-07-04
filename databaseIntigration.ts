import { getApp, getApps, initializeApp } from 'firebase/app' // no compat for new SDK
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'

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

export async function writeUserData(
  firstName: string,
  lastName: string,
  petName: string,
  date: string,
  distance: string
) {
  await addDoc(poopsRef, {
    firstName: firstName,
    lastName: lastName,
    petName: petName,
    dateTime: date,
    distanceWalked: distance
  })
}

export interface Visit {
  id: string
  firstName: string
  lastName: string
  petName: string
  date: string
  distance: string
}

// this runs twice for some reason every time the visit page is loaded
export async function getVisitData() {
  const querySnapshot = await getDocs(poopsRef)

  const visitData: Visit[] = []
  let i = 0
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    const User: Visit = {
      id: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      petName: data.petName,
      date: data.dateTime,
      distance: data.distanceWalked
    }

    visitData[i] = User
    i++
  })
  console.log(visitData)
  return visitData
}

export async function updateUserData(
  id: string,
  firstName: string,
  lastName: string,
  petName: string,
  date: string,
  distance: string
) {
  await setDoc(doc(poopsRef, id), {
    firstName: firstName,
    lastName: lastName,
    petName: petName,
    dateTime: date,
    distanceWalked: distance
  })
}