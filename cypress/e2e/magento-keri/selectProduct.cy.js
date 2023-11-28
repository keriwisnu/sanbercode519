describe('negative - select product', () => {
  beforeEach('login',() => {
    cy.wait(2000)
    cy.visit('')
    cy.wait(2000)
    cy.login2('idlytogame@gmail.com','K3ri,wisnu')
  })
  it('negative - ignore product color', () => {
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(500)
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(500)
    cy.get('#product-addtocart-button').click()
    cy.wait(5000)
    cy.xpath('//*[@id="super_attribute[93]-error"]').should('contain.text','This is a required field.')
    cy.wait(2000)
  })
  it('negative - ignore product size', () => {
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(500)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(5000)
    cy.get('#product-addtocart-button').click()
    cy.xpath('//*[@id="product-options-wrapper"]/div/div/div[1]').should('contain.text','This is a required field.')
    cy.wait(2000)
  })
  it('negative - ignore quantity', () => {
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(500)
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(500)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(500)
    cy.get('#qty').clear().type(0)
    cy.get('#product-addtocart-button').click()
    cy.wait(5000)
    cy.xpath('//*[@id="qty-error"]').should('contain.text','Please enter a quantity greater than 0')
    cy.wait(1000)
    cy.get('#qty').clear()
    cy.get('#product-addtocart-button').click()
    cy.xpath('//*[@id="qty-error"]').should('contain.text','Please enter a valid number in this field.')
    cy.wait(2000)
  })
})


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
    cy.wait(2000)
  })
})
 
describe('verify searchbar', () => {
  it('negative - verifify searchbar, minimum search query lenght 3', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login2('idlytogame@gmail.com','K3ri,wisnu')
    cy.wait(1000)
    cy.get('#search').type('x{enter}')
    cy.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[2]/div')
    .invoke('text')
    .then(text => {
      expect(text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
        .to.contains('Minimum Search query length is 3')
    })
  })
  it('positive - verifify searchbar no item found', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get('#search').type('xxx{enter}')
    cy.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[2]/div').should('contains.text','Your search returned no results.')
    cy.wait(2000)
  })
  it('positive - verifify searchbar item found', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get('#search').type('Jacket{enter}')
    cy.get(':nth-child(1) > .product-item-info > .details > .name > .product-item-link')
    .invoke('text')
    .then(text => { 
      expect(text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
        .to.contains('Adrienne Trek Jacket')
    })
    cy.wait(2000)
  })
})

describe('add whistlist', () => {
  it('negative - add whistlist', () => {
    cy.visit('')
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(2000)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(2000)
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[1]').click()
    cy.wait(2000)
    cy.get('.message-error > div').should('contain.text','You must login or register to add items to your wishlist.')
    cy.wait(2000)
  })
  it('positive - add whistlist', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(2000)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(2000)
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[1]').click()
    cy.log('cek proses')
    cy.wait(2000)
    cy.xpath('//*[@id="maincontent"]/div[1]/div[2]/div/div/div').should('contain.text','Breathe-Easy Tank has been added to your Wish List. Click here to continue shopping.')
    cy.wait(2000)
  })
})

describe('add review', () => {
  it('negative - add review', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login2('idlytogame@gmail.com','K3ri,wisnu')
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(1000)
    cy.get('#tab-label-reviews-title').click()
    cy.wait(1000)
    cy.get('.actions-primary > .action > span').click()
    cy.wait(1000)
    cy.xpath('//*[@id="summary_field-error"]').should('contain.text','This is a required field.')
    cy.wait(1000)
    cy.xpath('//*[@id="review_field-error"]').should('contain.text','This is a required field.')
    cy.wait(2000)
  })
  it('positive - add review', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.wait(1000)
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(1000)
    cy.get('#tab-label-reviews-title').click()
    cy.wait(1000)
    cy.get('#Rating_5').click({ force: true });
    cy.wait(1000)
    cy.get('#summary_field').type('this is good item')
    cy.wait(1000)
    cy.get('#review_field').type('this breathe-easy tank was so freakin good')
    cy.wait(1000)
    cy.get('.actions-primary > .action').click()
    cy.wait(1000)
    cy.xpath('//*[@id="maincontent"]/div[1]/div[2]/div/div/div').should('contain.text','You submitted your review for moderation.')
    cy.wait(2000)
  })
})

describe('add to compare', () => {
  it('positive - add compare', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login1()
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(2000)
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[2]').click()
    cy.wait(2000)
    cy.get('.message-success > div')
    .invoke('text')
    .then(text => { 
      expect(text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
        .to.contains('You added product Breathe-Easy Tank to the comparison list')
    })
    cy.wait(2000)
    cy.get('.message-success > div > a').click()
    cy.get('.page-title-wrapper').should('contain.text','Compare Products')
    cy.wait(2000)
  })
  it('negative - add compare', () => {
    cy.visit('')
    cy.wait(1000)
    cy.login2('idlytogame@gmail.com','K3ri,wisnu')
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.wait(2000)
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[2]').click()
    cy.wait(2000)
    cy.get('.message-success > div > a').click()
    cy.wait(2000)
    cy.get('.product > .action').click()
    cy.wait(2000)
    cy.get('.action-primary > span').click()
    cy.wait(2000)
    cy.get('.column > .message > div').should('contain.text','You have no items to compare')
    cy.wait(2000)
  })
})