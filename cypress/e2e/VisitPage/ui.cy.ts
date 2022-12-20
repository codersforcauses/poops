import user from '../../fixtures/auth-user.json'

describe('The Visit Page', () => {
  before(() => {
    cy.clearAuthState()
  })

  it('successfully loads', () => {
    cy.login(user)
    cy.visit('/')
    cy.get('title').should('contain', 'Visit')
  })
})

export {}
