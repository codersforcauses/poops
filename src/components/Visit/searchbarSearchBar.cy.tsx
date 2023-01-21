import React from 'react'
import SearchBar from './searchbar'

describe('<SearchBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SearchBar />)
  })
})