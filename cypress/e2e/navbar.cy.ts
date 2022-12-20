describe('The Navbar', () => {
  it('checks the buttons', () => {
    cy.visit('/')
    cy.get('nav[id=top-navigation]').should('be.visible')
    cy.get('nav[id=bottom-navigation]').should('be.visible')

    const pageHrefs = ['/', '/visit', '/contact']

    pageHrefs.forEach((val) => {
      cy.get('nav[id=bottom-navigation]').within(() => {
        cy.get(`[href="${val}"]`).should('exist')
      })
    })
  })
})

export {}
