import user from '../../fixtures/auth-user.json'

beforeEach(() => {
  cy.clearAuthState()
})

describe('Launch login page', () => {
  it('checks login page elements', () => {
    cy.visit('/login')
    cy.get('[alt="POOPS logo"]').should('be.visible')
    cy.get('title').should('contain', 'Login')
    cy.get('button').should('contain', 'Google')
    cy.get('button').should('contain', 'Facebook')
    cy.get('button').should('contain', 'Microsoft')
  })
})

describe('Test Login Redirect', () => {
  it('checks login works', () => {
    cy.login(user)
    cy.visit('/login')
    cy.get('title').should('contain', 'Home')
    cy.visit('/visit')
    cy.get('title').should('contain', 'Visit')
  })
})

export {}
