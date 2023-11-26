// describe('choose product', () => {
//   it ('positive - check all menu per cateogry', () =>{
//     cy.visit('')
//     // cy.login()
//     //#validate category
//     cy.get('#ui-id-3').click()
//     cy.wait(100)
//     cy.get('#ui-id-4').click()
//     cy.get('#ui-id-11').trigger('mouseover').click()
//     cy.get('#ui-id-12').trigger('mouseover').click()
//     cy.get('#ui-id-13').trigger('mouseover').click()
//     cy.get('#ui-id-14').trigger('mouseover').click()
//     cy.wait(100)
//     cy.get('#ui-id-13').trigger('mouseover').click()
//     cy.get('#ui-id-14').trigger('mouseover').click()
//   })
// })

//done
// describe('negative - select product', () => {
//   beforeEach('login',() => {
//     cy.visit('')
//     cy.wait(2000)
//     cy.login2('idlytogame@gmail.com','K3ri,wisnu')
//   })
//   it('negative - ignore product color', () => {
//     cy.wait(1000)
//     cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
//     cy.get('#option-label-size-143-item-166').click()
//     cy.get('#product-addtocart-button').click()
//     cy.xpath('//*[@id="super_attribute[93]-error"]').should('contain.text','This is a required field.')
//     cy.wait(1000)
//   })
//   it('negative - ignore product size', () => {
//     cy.wait(1000)
//     cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
//     cy.get('#option-label-color-93-item-57').click()
//     cy.get('#product-addtocart-button').click()
//     cy.xpath('//*[@id="product-options-wrapper"]/div/div/div[1]').should('contain.text','This is a required field.')
//     cy.wait(1000)
//   })
//   it('negative - ignore quantity', () => {
//     cy.wait(1000)
//     cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
//     cy.get('#option-label-size-143-item-166').click()
//     cy.wait(500)
//     cy.get('#option-label-color-93-item-57').click()
//     cy.wait(500)
//     cy.get('#qty').clear().type(0)
//     cy.get('#product-addtocart-button').click()
//     cy.xpath('//*[@id="qty-error"]').should('contain.text','Please enter a quantity greater than 0')
//     cy.wait(1000)
//     cy.get('#qty').clear()
//     cy.get('#product-addtocart-button').click()
//     cy.xpath('//*[@id="qty-error"]').should('contain.text','Please enter a valid number in this field.')
//     cy.wait(1000)
//   })
// }) 

// done
describe('add whistlist', () => {
  it('negative - add whistlist', () => {
    cy.visit('')
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[1]').click()
    cy.wait(5000)
    cy.get('.message-error > div').should('contain.text','You must login or register to add items to your wishlist.')
    cy.wait(1000)
  })
  it('positive - add whistlist', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(500)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(500)
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[1]').click()
    cy.xpath('//*[@id="maincontent"]/div[1]/div[2]/div/div/div').should('contain.text','Breathe-Easy Tank has been added to your Wish List. Click here to continue shopping.')
    cy.wait(1000)
  })
})

// //done
describe('add review', () => {
  it('negative - add review', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#tab-label-reviews-title').click()
    cy.wait(1000)
    cy.get('.actions-primary > .action > span').click()
    cy.wait(500)
    cy.xpath('//*[@id="summary_field-error"]').should('contain.text','This is a required field.')
    cy.wait(500)
    cy.xpath('//*[@id="review_field-error"]').should('contain.text','This is a required field.')
  })
  it('positive - add review', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#tab-label-reviews-title').click()
    cy.get('#Rating_5').click({ force: true });
    cy.get('#summary_field').type('this is good item')
    cy.get('#review_field').type('this breathe-easy tank was so freakin good')
    cy.get('.actions-primary > .action').click()
    cy.wait(1000)
    cy.xpath('//*[@id="maincontent"]/div[1]/div[2]/div/div/div').should('contain.text','You submitted your review for moderation.')
    cy.wait(1000)
  })
})

//done
describe('positive - select product', () => {
  it('positive - select product', () => {
    cy.visit('')
    cy.login1()
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(100)
    cy.get('#option-label-size-143-item-167').click()
    cy.wait(100)
    cy.get('#option-label-size-143-item-168').click()
    cy.wait(100)
    cy.get('#option-label-size-143-item-169').click()
    cy.wait(100)
    cy.get('#option-label-size-143-item-170').click()
    cy.wait(100)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(100)
    cy.get('#option-label-color-93-item-59').click()
    cy.wait(100)
    cy.get('#option-label-color-93-item-60').click()
    cy.wait(100)
    cy.get('#product-addtocart-button > span').click()
    cy.get('.message-success > div').should('contain.text','You added Breathe-Easy Tank to your shopping cart.')
  })
})


//search button

//add to compare
