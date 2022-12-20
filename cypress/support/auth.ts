// https://github.com/akauppi/GroundLevel-firebase-es/blob/master/packages/app/cypress/support/auth.js

import { signInWithCustomToken, updateProfile } from '@firebase/auth'
import { Auth } from 'firebase/auth'

/**
 * Clears firebase auth state since Cypress does not clear IndexedDB between sessions.
 */
Cypress.Commands.add('clearAuthState', () => {
  const prom = new Promise((resolve, reject) => {
    const req = indexedDB.deleteDatabase('firebaseLocalStorageDb')
    req.onsuccess = resolve
    req.onerror = reject
  })

  cy.wrap(prom)
})

/**
 * Sign in as a certain user to Firebase Auth emulation.
 * Creates the user ad-hoc, with fields (if given) 'uid', 'displayName' and 'photoURL'.
 */
Cypress.Commands.add('login', ({ uid, displayName, photoURL }) => {
  if (!uid) throw new Error('No uid provided')

  cy.log(`Logging with as '${uid}'...`)

  /**
   * Sign in with the uid.
   * @param auth the auth handle
   * @returns promise containing the current user
   */
  const promGen = async (auth: Auth) => {
    // Create a user based on the provided token (only '.uid' is used by Firebase)
    const { user: currentUser } = await signInWithCustomToken(
      auth,
      JSON.stringify({ uid })
    )
    assert(currentUser.uid === uid)

    // Set profile
    await updateProfile(currentUser, { displayName, photoURL })

    return currentUser
  }

  firebaseAuthChainable().then(
    (auth) => promGen(auth) // can return Promise for 'then'
  )
})

/**
 * Provide the auth handle that the app has to Cypress.
 *
 * Creating our own auth handle does not work as the app will have no knowledge we logged in.
 * We cannot simply import the auth handle since they are basically on separate servers.
 * @returns promise containing the auth handle
 */
const firebaseAuthChainable = () => {
  // Wait for browser side to initialise Firebase
  cy.visit('/')

  // Grab Firebase auth handle from browser side
  return cy
    .window()
    .its('Firebase')
    .then(([auth]) => auth)
}
