import { NextApiRequest, NextApiResponse } from 'next'
import { UserRecord } from 'firebase-admin/auth'

import { auth, firestore } from '@/lib/temp/firebase/admin/init'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, roles } = JSON.parse(req.body)
  const claims: Record<string, boolean> = { ...roles }
  try {
    const userRecord: UserRecord = await auth.getUserByEmail(email)
    // See the UserRecord reference doc for the contents of userRecord.
    await auth.setCustomUserClaims(userRecord.uid, {
      ...userRecord.customClaims,
      ...claims
    })
    // const userRecord: UserRecord = await auth.getUser(userId)
    const doc: Record<string, boolean> = { ...roles, by: 'none' }
    await firestore
      .collection('roles')
      .doc(userRecord.email || userRecord.uid)
      .set(doc)

    res.status(200).send({ message: 'Success' })
    res.end()
  } catch (error) {
    res.status(405).send(error)
    res.end()
  }
}

export default handler
