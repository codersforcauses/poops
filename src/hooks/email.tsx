import { addDoc, collection } from 'firebase/firestore'

import { db } from '@/components/Firebase/init'

interface IAttachment {
  filename: string
  path: string
}

interface IMessage {
  subject: string
  text: string
  html?: string
  attachments?: IAttachment[]
}

const sendEmail = async (message: IMessage) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'mail'), {
    to: process.env.NEXT_PUBLIC_FIREBASE_INCIDENT_EMAIL,
    message: message
  })
}

export default sendEmail
