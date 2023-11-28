import updateProduct from "../../support/pageObject/UpdateProduct"
const qty_breathe = "2"
const qty_0 = "0"
const qty_minus = "-"
const qty_plus = "+"
describe('Update Product - Edit Size', () => {
  it('edit the size of the products in the cart', () => {
    cy.visit('')
    cy.login()
    cy.Choose_Product()
    updateProduct.clickCart();
    updateProduct.dropdownCart();
    updateProduct.toogle();
    cy.get('.content > .product > :nth-child(2) > span').should('have.text',"S")
    updateProduct.iconEdit();
    cy.get('.base').should('have.text', 'Breathe-Easy Tank')
    cy.get('#option-label-size-143-item-168').click()//size M
    cy.wait(5000)
    updateProduct.buttonEdit();
    cy.wait(5000)
    cy.get('.message-success').should('contain.text', 'Breathe-Easy Tank was updated in your shopping cart.')
    updateProduct.logoLUMA();
    cy.wait(5000)
    updateProduct.clickCart();
    updateProduct.dropdownCart();
    updateProduct.toogle();
    cy.get('.content > .product > :nth-child(2) > span').should('have.text',"M")
    })
  })
  describe('Update Product - Unselecting Products Size',()=>{
  it('edit the product in the cart by unselecting the product size', () => {
    cy.visit('')
    cy.clearCookies()
    cy.login()
    cy.wait(10000)
    // cy.Choose_Product()
    updateProduct.clickCart();
    updateProduct.dropdownCart();
    cy.get('.product-item-details > .actions > .primary').click()
    updateProduct.verifyProduct();
    cy.wait(8000)
    cy.get('#option-label-size-143-item-168').click()//size M/unselecting a size
    cy.wait(10000)
    updateProduct.buttonEdit();
    cy.wait(20000)
    cy.xpath('//*[@id="super_attribute[143]-error"]').should('contain.text','This is a required field.')
    })
  })
describe('Update Product - Edit Color', () => {
    it('edit the color of the products in the cart', () => {
      cy.visit('')
      cy.clearCookies()
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
describe('Update Product - Edit Unselecting Products Color',()=>{
  it('edit the product in the cart by unselecting the product color', () => {
    cy.visit('')
    cy.login()
    cy.clearCookies()
    updateProduct.clickCart();
    updateProduct.dropdownCart();
    cy.wait(5000)
    cy.get('.product-item-details > .actions > .primary').click()
    cy.get('.base').should('have.text', 'Breathe-Easy Tank')
    cy.wait(15000)
    cy.get('#option-label-color-93-item-59').click()//White Color//unselecting a color
    cy.wait(10000)
    cy.get('#product-updatecart-button').click()
    cy.wait(20000)
    cy.xpath('//*[@id="super_attribute[93]-error"]').should('contain.text','This is a required field.')
    })
  })
  describe('Update Product - Edit Qty',()=>{
        it('edit the qty of the products in the cart', () => {
          cy.visit('')
          cy.login()
          updateProduct.clickCart();
          updateProduct.dropdownCart();
          updateProduct.iconEdit();
          updateProduct.verifyProduct();
          cy.wait(8000)
          updateProduct.inputQty();
          cy.wait(5000)
          updateProduct.buttonEdit();
          cy.wait(15000)
          cy.get('.message-success').should('contain.text', 'Breathe-Easy Tank was updated in your shopping cart.')
          })
  })
              describe('Update Product - Input Qty 0 ',()=>{
                it('edit the products in the cart by providing input qty 0', () => {
                  cy.visit('')
                  cy.login()
                  updateProduct.clickCart();
                  updateProduct.dropdownCart();
                  updateProduct.iconEdit();
                  updateProduct.verifyProduct();
                  cy.wait(8000)
                  updateProduct.inputQty0();
                  cy.wait(5000)
                  updateProduct.buttonEdit();
                  cy.wait(10000)
                  updateProduct.messageQty0();
                  })
                })
                describe('Update Product - Input Qty with symbol + or -',()=>{
                  it('edit the products in the cart by providing input qty with symbol + or - ', () => {
                    cy.visit('')
                    cy.login()
                    updateProduct.clickCart();
                    updateProduct.dropdownCart();
                    cy.get('.product-item-details > .actions > .primary').click()
                    updateProduct.verifyProduct();
                    cy.wait(8000)
                    updateProduct.inputQtyPlus();
                    cy.wait(5000)
                    updateProduct.buttonEdit();
                    cy.wait(15000)
                    updateProduct.messageErrorQtySymbol();
                    cy.wait(8000)
                    updateProduct.inputQtyMinus();
                    cy.wait(5000)
                    updateProduct.buttonEdit();
                    cy.wait(15000)
                    updateProduct.messageErrorQtySymbol();
                    })
                  })
                  describe('Update Product - Delete',()=>{
                    it('Delete a product when there is only 1 product in the cart', () => {
                      cy.visit('')
                      cy.login()
                      updateProduct.clickCart();
                      updateProduct.dropdownCart();
                      updateProduct.iconDelete();
                      updateProduct.popupConfrimDelete();
                      updateProduct.buttonOkeDelete();
                      cy.wait(5000)
                      updateProduct.clickCart
                      updateProduct.cartEmpty
                      }) 
                    })