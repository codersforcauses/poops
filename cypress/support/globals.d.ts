import { AuthProvider } from 'firebase/auth'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login natively into Firebase emulator
       * @param redirectPath path to redirect to after login
       * @param credentials an object containing the fields email and password
       * @example cy.loginNative('/', {email: 'test@test.com', password: 'test123'})
       */
      loginNative(
        redirectPath?: string,
        credentials?: { email: string; password: string }
      ): void
      /**
       * Custom command to login externally into Firebase emulator using
       * Google, Facebook, Microsoft, etc...
       * @param redirectPath path to redirect to after login
       * @param provider an AuthProvider instance
       * @example cy.loginExternal('/', new GoogleAuthProvider())
       */
      loginExternal(redirectPath?: string, provider?: AuthProvider): void
    }
  }
}
