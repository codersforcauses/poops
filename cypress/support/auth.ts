/* eslint-disable no-console */

// export const signInNatively = ({
//   email,
//   password
// }: {
//   email: string
//   password: string
// }) => {
//   const signIn = signInWithEmailAndPassword(getAuth(), email, password).catch(
//     (e) => {
//       cy.log('Could not sign in natively')
//       console.error(e)
//     }
//   )

//   return cy.wrap(signIn)
// }

// export const signInExternally = (provider: AuthProvider) => {
//   const signIn = signInWithRedirect(getAuth(), provider).catch((e) => {
//     cy.log('Could not sign in externally')
//     console.error(e)
//   })

//   return cy.wrap(signIn)
// }

export {}
