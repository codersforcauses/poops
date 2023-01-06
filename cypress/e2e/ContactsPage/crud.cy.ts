import user from '../../fixtures/auth-user.json'

describe('CRUD Contacts', () => {
  before(() => {
    cy.visit('/login')
    cy.login(user)
    cy.visit('/contact')
    // populate db with contacts
  })
})

export {}
