import user from '../fixtures/auth-user.json'

describe('The Firestore Nuke', () => {
  before(() => {
    cy.clearAuthState()
  })

  it('clears the firestore db', () => {
    cy.login(user)
    cy.clearDb()
    cy.visit('/visit')
  })
})

export {}
