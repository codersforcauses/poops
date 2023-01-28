/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth, functions } from '../main'
import { REGION } from '../config'

const WHITELISTED_DOMAINS = 'poops.org'

/**
 * Trigger to automatically assign admin role if email matches whitelisted
 * domains.
 */
export const addAdmin = functions
  .region(REGION)
  .auth.user()
  .onCreate(async (user) => {
    const userId = user.uid
    const email = user.email
    const role = 'admin'

    if (validateEmailDomain(email, 'Add Admin')) {
      const claims: Record<string, boolean> = {}
      claims[role] = true
      await auth.setCustomUserClaims(userId, claims)
    }
  })

/**
 * Splits concatenated config strings into an array of patterns for
 * matching
 * @param {string} concatenated string of patterns to match, delimited by
 *                              spaces, commas or semi-colons, wildcards allowed
 * @return {RegExp} a regex for the patterns to match
 * @example getDelimitedConfigPattern('example.com, example.org')
 */
function getDelimitedConfigPattern(concatenated: string): RegExp {
  return new RegExp(
    concatenated
      ?.split(/[\s,;]+/)
      .map(
        // Convert '.' delimiters, and '*' wildcard to regex representing
        // valid sub-domain characters
        (value) =>
          '^' +
          value
            .trim()
            .replace(/\*\./g, '(*.)?') // replaces *s and .s with regex equiv
            .replace(/\./g, '\\.') // replaces .s with regex equiv
            .replace(/\*/g, '[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?') + // wildcard
          '$'
      )

      .filter((value) => value?.length)

      .join('|') || '[a-z0-9][a-z0-9-.]*[a-z0-9]',

    'i' // case-insensitive, non-global match
  )
}

/**
 * Called during sign-up and sign-in to stop the auth flow
 * when an incoming user's email domain is not whitelisted.
 * @param {string | undefined} email email to verify
 * @param {string} method something to do with logging idk
 * @return {void}
 */
function validateEmailDomain(
  email: string | undefined,
  method: string
): boolean {
  const emailParts = email?.trim().split('@')

  if (emailParts?.length !== 2) {
    throw new functions.auth.HttpsError(
      'permission-denied',
      'Sign in email address is invalid',
      { email }
    )
  }

  // Test against delimited whitelist domains

  const allowedDomains = getDelimitedConfigPattern(WHITELISTED_DOMAINS)

  const emailDomain = emailParts[1]

  if (
    !allowedDomains.test(emailDomain) &&
    !allowedDomains.test(email as string)
  ) {
    functions.logger.warn(
      { allowedDomains },

      `${email} ${method.toLowerCase()} blocked - see AzDO Library variable
      firebase.auth.blocking.domainWhitelist`
    )

    throw new functions.auth.HttpsError(
      'permission-denied',
      `${method} is not permitted for ${emailDomain}`,
      { email }
    )
  }

  return true
}
