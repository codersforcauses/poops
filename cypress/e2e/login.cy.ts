import { GoogleAuthProvider } from 'firebase/auth'

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

describe('Test Google Login', () => {
  before(() => {
    cy.loginExternal('/login', new GoogleAuthProvider())
  })
  it('checks if Google login works', () => {
    cy.get('title').should('contain', 'Home')
    cy.visit('/visit')
    cy.get('title').should('contain', 'Visits')
  })
})

export {}
