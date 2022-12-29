import { firestore, app } from './main'
import { getFirestore } from 'firebase-admin/firestore'
const db = getFirestore(app)

export const addVisit = firestore
  .document('users/{userId}/visits/{visitId}')
  .onCreate(async (snap, context) => {
    const newVisit = snap.data()
    const userId = context.params.userId
    const userRef = db.collection('users').doc(userId)

    // getting old user stats
    const userDoc = await userRef.get()
    const oldStats = userDoc.data()?.stats

    // updating user stats with new visit data
    await userRef.update({
      stats: {
        numVisits: oldStats.numVisits + 1,
        numHours: oldStats.numHours + newVisit.duration.hours,
        commutedDist: oldStats.commutedDist + newVisit.commuteDist,
        walkedDist: oldStats.walkedDist + newVisit.walkDist
      }
    })
    return null
  })
