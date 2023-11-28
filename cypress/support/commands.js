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

<<<<<<< HEAD
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
=======
 /// <reference types="Cypress" />




var userLogin = require('../fixtures/userLogin.json') 
var { email, password } = userLogin;

//cara login 1
Cypress.Commands.add('login1', () => {
    cy.get('.panel > .header > .authorization-link').click()
    cy.wait(2000)
    cy.get('#email').type(email)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(password)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
    cy.wait(2000)
})

//cara login 2
Cypress.Commands.add('login2', (email, password) => {
    cy.get('.panel > .header > .authorization-link').click()
    cy.wait(2000)
    cy.get('#email').type(email)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(password)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2 > span').click()
    cy.wait(2000)
>>>>>>> 29f5342c5d2a639d36ffb6743e25a4545debd972
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
<<<<<<< HEAD
  })
=======
  })
>>>>>>> 29f5342c5d2a639d36ffb6743e25a4545debd972
