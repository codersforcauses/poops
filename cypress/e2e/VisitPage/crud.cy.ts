import user from '../../fixtures/auth-user.json'

describe('CRUD Visits', () => {
  before(() => {
    cy.clearAuthState()
    cy.clearDb()
    cy.visit('/login')
    cy.login(user)
    cy.visit('/visit')
    // populate db with contacts
  })

  it('creates', () => {
    cy.fixture('VISIT_MOCK_DATA.json').then((visits) => {
      cy.addVisit(visits[0])
      // visits.forEach((visit: Visit) => {
      //   console.log(visit)
      // })
    })

    // cy.get("[data-cy='add-visit']").click()
    // cy.location().should(({ pathname }) => expect(pathname).to.eq('/visit/set'))
    // cy.get('#visitTypeInput').select('Vet')
    // cy.get('#commuteDistInput').type('1234')
    // cy.get('#commuteMethodInput').type('Bus{enter}')
    // cy.get('#startTimeInput').type('2022-04-21T11:51')
    // cy.get('#hours').select('2')
    // cy.get('#minutes').select('30')
    // cy.get('#walkDistInput').type('123')
    // cy.get('#notesInput').type('Played in the lake')
    // cy.get('#clientNameInput').type('John Smith{enter}')
    // cy.get('button[type="submit"]').click()
  })

  // it('updates', () => {
  //   // pre-populate visits
  //   before(() => {})
  // })

  // it('deletes', () => {
  //   // pre-populate visits
  //   before(() => {})
  // })
})

export {}
