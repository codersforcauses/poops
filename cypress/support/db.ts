import { emulators } from '../../firebase/firebase.json'

Cypress.Commands.add('clearDb', () => {
  cy.request(
    'PUT',
    `http://localhost:${emulators.hub.port}/functions/disableBackgroundTriggers`
  )

  cy.request(
    'DELETE',
    `http://localhost:${emulators.firestore.port}/emulator/v1/projects/poops-9dbf6/databases/(default)/documents`
  )

  cy.request(
    'PUT',
    `http://localhost:${emulators.hub.port}/functions/enableBackgroundTriggers`
  )
})

export {}
