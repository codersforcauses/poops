describe('Launch login page', () => {
  it('check login page elements', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[alt="POOPS logo"]').should('be.visible')
    cy.get('title').should('contain', 'Login')
    cy.get('button').should('contain', 'Google')
    cy.get('button').should('contain', 'Facebook')
    cy.get('button').should('contain', 'Twitter')
  })
})

// describe('Login with google test', () => {
//   const username = "yodacypresstesting@gmail.com"
//   const password = "yodaCypressTesting*18"

//   it('clicking "Continue with Google" navigates to google auth page', () => {
//     cy.contains('Continue with Google').click()
//   })
// })

// describe('Check google auth page', () => {
//   it('checks if the google auth page is loaded', () => {
//     cy.get('title').should('contain', 'Google')
//   })
// })

export {}
