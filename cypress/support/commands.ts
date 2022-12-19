/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Cypress.Commands.addAll({
//   loginNative(
//     redirectPath = '/',
//     credentials = {
//       email: Cypress.env('EMAIL') as string,
//       password: Cypress.env('PASSWORD') as string
//     }
//   ) {
//     cy.session([credentials.email, credentials.password], () => {
//       loginNatively(credentials)
//     })

//     cy.visit(redirectPath)
//   },
//   loginExternal(redirectPath = '/', provider: AuthProvider) {
//     cy.session([provider.providerId], () => {
//       loginExternally(provider)
//     })

//     cy.visit(redirectPath)
//   }
// })

export {}
