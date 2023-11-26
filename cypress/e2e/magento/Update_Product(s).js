const qty_breathe = "2"
describe('Update Product', () => {
    it('edit the size of the products in the cart', () => {
      cy.visit('')
      cy.login()
      cy.Choose_Product()
      cy.get('.showcart').click()
      cy.get('#ui-id-1').should('be.visible')
      cy.get('.toggle').click()
      cy.get('.content > .product > :nth-child(2) > span').should('have.text',"S")
      cy.get('.product-item-details > .actions > .primary').click()
      cy.get('.base').should('have.text', 'Breathe-Easy Tank')
      cy.get('#option-label-size-143-item-168').click()//size M
      cy.wait(5000)
      cy.get('#product-updatecart-button').click()
      cy.wait(5000)
      cy.get('.message-success').should('contain.text', 'Breathe-Easy Tank was updated in your shopping cart.')
      cy.get('.logo > img').click()
      cy.wait(5000)
      cy.get('.showcart').click()
      cy.get('#ui-id-1').should('be.visible')
      cy.get('.toggle').click()
      cy.get('.content > .product > :nth-child(2) > span').should('have.text',"M")
      })
      it('edit the color of the products in the cart', () => {
        cy.visit('')
        cy.login()
        cy.get('.showcart').click()
        cy.get('#ui-id-1').should('be.visible')
        cy.get('.toggle').click()
        cy.get('.product > :nth-child(4) > span').should('have.text',"Purple")
        cy.get('.product-item-details > .actions > .primary').click()
        cy.get('.base').should('have.text', 'Breathe-Easy Tank')
        cy.get('#option-label-color-93-item-59').click()//White Color
        cy.wait(5000)
        cy.get('#product-updatecart-button').click()
        cy.get('.message-success').should('contain.text', 'Breathe-Easy Tank was updated in your shopping cart.')
        cy.get('.logo > img').click()
        cy.wait(5000)
        cy.get('.showcart').click()
        cy.get('#ui-id-1').should('be.visible')
        cy.get('.toggle').click()
        cy.get('.product > :nth-child(4) > span').should('have.text',"White")
        })
        it('edit the qty of the products in the cart', () => {
            cy.visit('')
            cy.login()
            cy.get('.showcart').click()
            cy.get('#ui-id-1').should('be.visible')
            cy.get('#cart-item-482286-qty').clear().type(qty_breathe)
            cy.get('#update-cart-item-482286').click()
            cy.get('.count').should('include.text', '2')
            })
    })