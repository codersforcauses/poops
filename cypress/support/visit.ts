import { Visit } from 'cypress/types'

Cypress.Commands.add('addVisit', (visit: Visit) => {
  cy.visit('/visit/set')
  cy.get('#visitTypeInput').select(visit.type)
  cy.get('#commuteDistInput').type(`${visit.commuteDist}`)
  cy.get('#commuteMethodInput').type(`${visit.commuteMethod}{enter}`)
  cy.get('#startTimeInput').type(visit.startTime)
  cy.get('#hours').select(`${visit.durationHours}`)
  cy.get('#minutes').select(`${visit.durationMinutes}`)
  cy.get('#walkDistInput').type(`${visit.walkDist}`)
  cy.get('#notesInput').type(`${visit.notes}`)
  cy.get('#clientNameInput').type(`${visit.clientName}{enter}`) // last cos the element might not load in time
  cy.get('title').should('contain', 'Visit')
})

export {}
