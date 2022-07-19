describe('Launch website', () => {
  it('visits the website', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Contact test', () => {
  it('clicking "Contact" navigates to the contact page', () => {
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
  })
})

export {}