import user from '../../fixtures/auth-user.json'

describe('The Home Page', () => {
  before(() => {
    cy.clearAuthState()
  })

  it('successfully loads', () => {
    cy.login(user)
    cy.visit('/')
    cy.get('title').should('contain', 'Home')
  })
})

export {}
