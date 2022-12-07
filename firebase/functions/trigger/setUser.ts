import { functions } from '../main'
import { getAuth, Auth, UserRecord } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

const auth: Auth = getAuth()
const db: Firestore = getFirestore()

const roleIsValid = (role: string) => {
  // To be adapted with your own list of roles
  const validRoles = ['user', 'admin']
  return validRoles.includes(role)
}

export const setUser = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    try {
      if (!user.email) {
        throw new Error('User has no email')
      }
      const userDoc = await db.collection('roles').doc(user.email).get()
      if (!userDoc.exists) {
        await auth.revokeRefreshTokens(user.uid)
        await auth.deleteUser(user.uid)
        throw new Error('User has no role')
      }
      const role = userDoc.data()?.role
      if (typeof role !== 'string' || !roleIsValid(role)) {
        throw new Error('Invalid role')
      }
      await auth.setCustomUserClaims(user.uid, { role })
    } catch (error) {
      console.log(error)
    }
  })
