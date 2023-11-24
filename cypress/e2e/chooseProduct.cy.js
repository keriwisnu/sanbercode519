// const userLogin = require('../fixtures/userLogin.json') 
// const { email, password } = userLogin;

describe('choose product', () => {
  // it('Success Login', () => {
  //   cy.visit('https://magento.softwaretestingboard.com/')
  //   cy.get('.panel > .header > .authorization-link').click()
  //   cy.login('idlytogame@gmail.com','K3ri,wisnu')
  // })
  it('choose product', () => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.login()
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(2000)
    cy.get('#option-label-size-143-item-167').click()
    cy.wait(2000)
    cy.get('#option-label-size-143-item-168').click()
    cy.wait(2000)
    cy.get('#option-label-size-143-item-169').click()
    cy.wait(2000)
    cy.get('#option-label-size-143-item-170').click()
    cy.wait(2000)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(2000)
    cy.get('#option-label-color-93-item-59').click()
    cy.wait(2000)
    cy.get('#option-label-color-93-item-60').click()
    cy.wait(2000)
    cy.get('#product-addtocart-button > span').click()
    cy.get('.message-success > div').should('contain.text','You added Breathe-Easy Tank to your shopping cart.')
  })
})

