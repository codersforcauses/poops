import { NextApiRequest, NextApiResponse } from 'next'

import { auth, firestore } from '@/lib/temp/firebase/admin/init'

interface Message {
  message: {
    subject: string;
    text: string;
    html: string;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = {
    to: process.env.INCIDENT_EMAIL,
    message: JSON.parse(req.body) as Message}
  try {
    await firestore.collection('mail').add(email)
    res.status(200).send({ message: 'Success' })
    res.end()
  } catch (error) {
    res.status(405).send(error)
    res.end()
  }
}

export default handler
