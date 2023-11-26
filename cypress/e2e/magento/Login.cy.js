const data_login = require('../../fixtures/data_login.json')
const { email, password } = data_login;

describe('login', () => {
  it('login with valid data', () => {
    cy.visit('')
    cy.get('.panel > .header > .authorization-link > a').click()
    cy.wait(5000)
    cy.get('.base').should('have.text', 'Customer Login')
    cy.get('#email').type(data_login.email)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(data_login.password)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2 > span').click()
    cy.get(':nth-child(2) > .greet > .logged-in').should('have.text','Welcome, Nelly Testing!')
  })
})