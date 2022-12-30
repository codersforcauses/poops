import { firestore, app } from './main'
import { getFirestore } from 'firebase-admin/firestore'
const db = getFirestore(app)

/**
 * Trigger for any changes to the visit subcollection
 * Automatically updates the user stats when a visit is added,
 * deleted or updated.
 */
export const updateVisitTrigger = firestore
  .document('users/{userId}/visits/{visitId}')
  .onWrite(async (change, context) => {
    const userId = context.params.userId
    const userRef = db.collection('users').doc(userId)

    // getting old user stats
    const userDoc = await userRef.get()
    const oldStats = userDoc.data()?.stats

    // The values of oldVisit and newVisit can be used to determine what
    // operation was done on the visit subcollection
    const oldVisit = change.before.exists ? change.before.data() : null
    const newVisit = change.after.exists ? change.after.data() : null
    let hoursDiff = 0
    let commuteDistDiff = 0
    let walkDistDiff = 0
    let visitDiff = 0

    if (newVisit && oldVisit) {
      // visit was updated
      hoursDiff =
        newVisit.duration.hours +
        newVisit.duration.minutes / 60 -
        (oldVisit.duration.hours + oldVisit.duration.minutes / 60)
      commuteDistDiff = newVisit.commuteDist - oldVisit.commuteDist
      walkDistDiff = newVisit.walkDist - oldVisit.walkDist
    } else if (oldVisit) {
      // visit was deleted
      visitDiff -= 1
      hoursDiff -= oldVisit.duration.hours + oldVisit.duration.minutes / 60
      commuteDistDiff -= oldVisit.commuteDist
      walkDistDiff -= oldVisit.walkDist
    } else if (newVisit) {
      // visit was added
      visitDiff += 1
      hoursDiff += newVisit.duration.hours + newVisit.duration.minutes / 60
      commuteDistDiff += newVisit.commuteDist
      walkDistDiff += newVisit.walkDist
    }

    // updating user stats with any changes made to the visit subcollection
    return userRef.update({
      stats: {
        numVisits: oldStats.numVisits + visitDiff,
        numHours: oldStats.numHours + hoursDiff,
        commutedDist: oldStats.commutedDist + commuteDistDiff,
        walkedDist: oldStats.walkedDist + walkDistDiff
      }
    })
  })
