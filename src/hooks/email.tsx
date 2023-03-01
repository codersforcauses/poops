import { addDoc, collection } from 'firebase/firestore'

import { db } from '@/components/Firebase/init'

interface Message {
  subject: string
  text: string
}

const sendEmail = async (message: Message) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'mail'), {
    to: process.env.NEXT_PUBLIC_FIREBASE_INCIDENT_EMAIL,
    message: message
  })
}

export default sendEmail
