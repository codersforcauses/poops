declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in to Firebase emulator.
     * Creates a user if does not exist.
     * @param userInfo user object in format `{ uid: string, displayName?: string, photoURL?: string }`
     * @example cy.signAs({ uid: 'johndoe', displayName: 'John Doe', photoURL: 'https://i.imgur.com/APWoca9.png' })
     */
    login({
      uid,
      displayName,
      photoURL
    }: {
      uid: string
      displayName?: string
      photoURL?: string
    }): void

    /**
     * Clears firebase auth state since Cypress does not clear IndexedDB between sessions.
     * @example cy.clearAuthState()
     */
    clearAuthState(): Chainable<unknown>

    /**
     * Sends a request to the firestore emulator to clear it
     */
    clearDb(): Chainable<unknown>

    /**
     * Fills the visit form
     * @param visit The visit data
     */
    addVisit(visit: Visit): Chainable<unknown>
  }
}
