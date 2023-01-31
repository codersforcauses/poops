/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth, functions } from '../main'
import { REGION } from '../config'

const WHITELISTED_DOMAINS = ['poops.org']

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

        break
      }
    }
  })
