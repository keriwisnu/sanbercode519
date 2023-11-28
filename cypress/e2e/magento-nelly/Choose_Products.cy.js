describe('choose product', () => {
    it('choose product', () => {
      cy.visit('')
      cy.login_data()
      cy.get(':nth-child(2) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
      cy.wait(5000)
      cy.get('.base').should('have.text', 'Breathe-Easy Tank')
      cy.get('#option-label-size-143-item-167').click()//choose a size
      cy.get('#option-label-color-93-item-57').click()//choose pink color
      cy.get('#product-addtocart-button').click()
      cy.wait(5000)
      cy.get('.message-success').should('contain.text', 'You added Breathe-Easy Tank to your shopping cart.')
    })
  })