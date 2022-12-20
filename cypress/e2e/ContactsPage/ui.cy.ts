import user from '../../fixtures/auth-user.json'

describe('The Contacts Page', () => {
  before(() => {
    cy.clearAuthState()
  })

  it('successfully loads', () => {
    cy.login(user)
    cy.visit('/contact')
    cy.get('title').should('contain', 'Contact')
  })
})

export {}
