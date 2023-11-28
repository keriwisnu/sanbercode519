// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const cypress = require('cypress');
var loginUser = require('../fixtures/loginUser.json') 
var { valid_email, valid_pass } = loginUser;

Cypress.Commands.add('login', () => {
    cy.get('.panel > .header > .authorization-link').click()
    cy.get('#email').type(email)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(password)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
})

Cypress.Commands.add('login', (email,pass)=> {
    cy.get('.panel > .header > .authorization-link').click()
    cy.wait(20000)
    cy.get('#email').type(loginUser.valid.valid_email)
    cy.get('#pass').type(loginUser.valid.valid_pass)
    cy.get('.action.login.primary').click()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })