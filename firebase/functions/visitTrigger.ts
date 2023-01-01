import { firestore, app } from './main'
import { getFirestore, DocumentData } from 'firebase-admin/firestore'
import { UserStat } from '../../src/types/types'
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
    const oldVisit = change.before.exists ? change.before.data() : null
    const newVisit = change.after.exists ? change.after.data() : null

    // relevant visit fields have not changed so can just exit.
    if (!visitChanged(oldVisit, newVisit)) {
      return null
    }

    // require oldStats to append to newStats
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()
    const oldStats: UserStat = userDoc.data()?.stats

    // updating the doc in firestore
    const newStats = getUpdatedUserStats(oldStats, oldVisit, newVisit)
    return userRef.update({
      stats: newStats
    })
  })

const visitChanged = (
  oldVisit?: DocumentData | null,
  newVisit?: DocumentData | null
) => {
  // visit was added or deleted, so has changed
  if (oldVisit == null || newVisit == null) return true

  // visit was updated
  // so checking if relevant visit fields have changed.
  if (oldVisit.commuteDist !== newVisit.commuteDist) return true
  if (oldVisit.walkDist !== newVisit.walkDist) return true
  if (oldVisit.duration.hours !== newVisit.duration.hours) return true
  if (oldVisit.duration.minutes !== newVisit.duration.minutes) return true

  return false
}

const getUpdatedUserStats = (
  oldStats: UserStat,
  oldVisit?: DocumentData | null,
  newVisit?: DocumentData | null
) => {
  // appending the oldStats to the newStats first.
  const newStats: UserStat = oldStats

  // The values of oldVisit and newVisit can be used to determine what
  // operation was done on the visit subcollection
  if (newVisit && oldVisit) {
    // visit was updated
    newStats.numHours +=
      newVisit.duration.hours +
      newVisit.duration.minutes / 60 -
      (oldVisit.duration.hours + oldVisit.duration.minutes / 60)
    newStats.commutedDist += newVisit.commuteDist - oldVisit.commuteDist
    newStats.walkedDist += newVisit.walkDist - oldVisit.walkDist
  } else if (oldVisit) {
    // visit was deleted
    newStats.numVisits -= 1
    newStats.numHours -=
      oldVisit.duration.hours + oldVisit.duration.minutes / 60
    newStats.commutedDist -= oldVisit.commuteDist
    newStats.walkedDist -= oldVisit.walkDist
  } else if (newVisit) {
    // visit was added
    newStats.numVisits += 1
    newStats.numHours +=
      newVisit.duration.hours + newVisit.duration.minutes / 60
    newStats.commutedDist += newVisit.commuteDist
    newStats.walkedDist += newVisit.walkDist
  }

  return newStats
}
