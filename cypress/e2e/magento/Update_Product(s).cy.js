const qty_breathe = "2"
const qty_0 = "0"
const qty_minus = "-"
const qty_plus = "+"
describe('Update Product - Edit Size', () => {
    it('edit the size of the products in the cart', () => {
      cy.visit('')
      cy.login()
      cy.Choose_Product()
      cy.get('.showcart').click()
      cy.get('#ui-id-1').should('be.visible')
      cy .get('.toggle').click()
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
  })
  describe('Update Product - Edit Color', () => {
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
  })
  describe('Update Product - Edit Qty',()=>{
        it.only('edit the qty of the products in the cart', () => {
          cy.visit('')
          cy.login()
          cy.Choose_Product()
          cy.get('.showcart').click()
          cy.get('#ui-id-1').should('be.visible')
          cy.get('.product-item-details > .actions > .primary').click()
          cy.get('.base').should('have.text', 'Breathe-Easy Tank')
          cy.wait(8000)
          cy.get('#qty').clear().type(qty_breathe)
          cy.wait(5000)
          cy.get('#product-updatecart-button').click()
          cy.wait(8000)
          cy.get('.message-success').should('contain.text', 'Breathe-Easy Tank was updated in your shopping cart.')
          })
  })
  describe('Update Product - Delete',()=>{
          it('Delete a product when there is only 1 product in the cart', () => {
            cy.visit('')
            cy.login()
            cy.get('.showcart').click()
            cy.get('#ui-id-1').should('be.visible')
            cy.get(':nth-child(1) > :nth-child(1) > .product-item-details > .actions > .secondary > .action').click()
            cy.get('body > div.modals-wrapper > aside.modal-popup.confirm._show > div.modal-inner-wrap').should('be.visible')//pop up confirmation
            cy.get('.action-primary').click() //klik button Oke
            cy.wait(5000)
            cy.get('.showcart').click()
            cy.get('#ui-id-1').should('include.text', 'You have no items in your shopping cart.')
            //cy.get('/html/body/div[2]/header/div[2]/div[1]/a/span[2]/span[1]').should('not.be.visible')//verify qty's product on cart
            }) 
          })
          describe('Update Product - Unselecting Products Size',()=>{
            it('edit the product in the cart by unselecting the product size', () => {
              cy.visit('')
              cy.login()
              cy.Choose_Product()
              cy.get('.showcart').click()
              cy.get('#ui-id-1').should('be.visible')
              cy.get('.product-item-details > .actions > .primary').click()
              cy.get('.base').should('have.text', 'Breathe-Easy Tank')
              cy.wait(8000)
              cy.get('#option-label-size-143-item-167').click()//unselecting a size
              cy.wait(5000)
              cy.get('#product-updatecart-button').click()
              cy.wait(8000)
              cy.xpath('//*[@id="super_attribute[143]-error"]').should('contain.text','This is a required field.')
              })
            })
            describe('Update Product - Edit Unselecting Products Color',()=>{
              it('edit the product in the cart by unselecting the product color', () => {
                cy.visit('')
                cy.login()
                cy.Choose_Product()
                cy.get('.showcart').click()
                cy.get('#ui-id-1').should('be.visible')
                cy.get('.product-item-details > .actions > .primary').click()
                cy.get('.base').should('have.text', 'Breathe-Easy Tank')
                cy.wait(8000)
                cy.get('#option-label-color-93-item-57').click()//unselecting a color
                cy.wait(5000)
                cy.get('#product-updatecart-button').click()
                cy.wait(8000)
                cy.xpath('//*[@id="super_attribute[93]-error"]').should('contain.text','This is a required field.')
                })
              })
