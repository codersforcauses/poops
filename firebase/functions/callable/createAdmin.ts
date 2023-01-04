import { functions } from '../main'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const auth = getAuth()
const firestore = getFirestore()

export const createAdmin = functions
  .region('australia-southeast1')
  .https.onRequest(async (req, res) => {
    const userId = '<USER_ID>'
    const role = 'admin'

    const claims: Record<string, boolean> = {}
    claims[role] = true

    await auth.setCustomUserClaims(userId, claims)

    const userRecord = await auth.getUser(userId)
    const data = { role: 'admin', by: 'none' }
    await firestore
      .collection('roles')
      .doc(userRecord.email || userId)
      .set(data)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ status: 'success' }))
  })
