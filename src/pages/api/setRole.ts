import { NextApiRequest, NextApiResponse } from 'next'

import { auth, firestore } from '@/lib/temp/firebase/admin/init'

interface IReqBody {
  email: string
  roles: Record<string, boolean>
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, roles: claims } = JSON.parse(req.body) as IReqBody
  try {
    const userRecord = await auth.getUserByEmail(email)
    // See the UserRecord reference doc for the contents of userRecord.
    await auth.setCustomUserClaims(userRecord.uid, {
      ...userRecord.customClaims,
      ...claims
    })
    const doc: Record<string, boolean | string> = {
      ...claims,
      by: 'none'
    }
    await firestore.collection('roles').doc(userRecord.uid).set(doc)
    res.status(200).send({ message: 'Success' })
    res.end()
  } catch (error) {
    res.status(405).send(error)
    res.end()
  }
}

export default handler
