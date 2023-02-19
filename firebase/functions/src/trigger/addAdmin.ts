import { auth, functions, firestore } from '../main'
import { REGION } from '../config'
import { Timestamp } from 'firebase-admin/firestore'

const WHITELISTED_DOMAINS = ['poopswa.org.au']

interface Role {
  role: string
  createdAt: Timestamp
}

/**
 * Trigger to automatically assign admin role if email matches whitelisted
 * domains.
 */
export const addAdmin = functions
  .region(REGION)
  .auth.user()
  .onCreate(async (user) => {
    const userId = user.uid
    const role = 'admin'

    for (const domain of WHITELISTED_DOMAINS) {
      if (user.email && user.email.endsWith(domain) && user.emailVerified) {
        const claims: Record<string, boolean> = {}
        claims[role] = true
        await auth.setCustomUserClaims(userId, claims)

        const newRole: Role = { role: 'Admin', createdAt: Timestamp.now() }
        await firestore.collection('roles').doc(userId).set(newRole)

        break
      }
    }
  })
