import { functions } from '../main'
import { getAuth, Auth, UserRecord } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

const auth: Auth = getAuth()
const firestore: Firestore = getFirestore()

export const createAdmin = functions
  .region('australia-southeast1')
  .https.onRequest(async (req, res) => {
    const userId = '<USER_ID>'
    const role = 'admin'

    const claims: Record<string, boolean> = {}
    claims[role] = true

    await auth.setCustomUserClaims(userId, claims)

    const userRecord: UserRecord = await auth.getUser(userId)
    const data = { role: 'admin', by: 'none' }
    await firestore
      .collection('roles')
      .doc(userRecord.email || userId)
      .set(data)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ status: 'success' }))
  })
