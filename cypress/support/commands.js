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
var Login = require('../fixtures/data_login.json') 
var { email, password } = Login;

Cypress.Commands.add('login', () => {
    cy.get('.panel > .header > .authorization-link').click()
    cy.get('#email').type(email)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(password)
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
    cy.wait(20000)
    cy.get(':nth-child(2) > .greet > .logged-in').should('have.text','Welcome, Nelly Testing!')
})
Cypress.Commands.add('Choose_Product', () => {
    cy.get(':nth-child(2) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
    cy.wait(5000)
    cy.get('.base').should('have.text', 'Breathe-Easy Tank')
    cy.get('#option-label-size-143-item-167').click()//choose a size
    cy.get('#option-label-color-93-item-57').click()//choose pink color
    cy.get('#product-addtocart-button').click()
    cy.wait(10000)
    cy.get('.message-success').should('contain.text', 'You added Breathe-Easy Tank to your shopping cart.')
})
