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

describe('Click Me', () => {
  it('clicking "Me" navigates to the user page', () => {
    cy.contains('Me').click()
    cy.url().should('include', '/me')
    //cy.contains('Back').click()
  })
})

describe('Click edit', () => {
  it('clicking "edit" button allows for editing of the profile page', () => {
    cy.get('svg')
      .should('have.class', 'm-auto flex h-7 w-7 cursor-pointer')
      //.find('path[d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"]')
      .find('path')
      .first()
      .click({force: true})
    

    cy.url().should('include', '/me')
  })
})


export {}