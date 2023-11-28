import updateProduct from "../../support/pageObject/UpdateProduct"
describe('Search product', () => {
    beforeEach('login', () => {
        cy.wait(3000)
        cy.visit('')
        cy.wait(3000)
        cy.login('terusbelajar@gmail.com', '123@5H')
    })
    it('Search using valid keywords', () => {
        cy.visit('')
        cy.get('#search').type('tank')
        cy.get('.action.search').click()
        cy.url().should('include', '/search')
        cy.get('.search-results').contains('Tank')
    })
    it('search should suggest corrections for misspelled keywords', () => {
        cy.visit('')
        const misspelledKeyword = 'jcket';

        cy.get('#search').type('misspelledKeyword')
        cy.get('.action.search').click()
        cy.url().should('include', '/search')
        cy.get('.search-suggestions').should('exist')
        cy.get('.search-suggestions').contains('jacket').should('exist')
        cy.get('.search-suggestions').contains('jacket').click()
        cy.url().should('include', '/search')
        cy.get('.search-results').contains('jacket').should('exist')
    })
    it('search should apply filters and display relevant results', () => {
        cy.visit('')
        cy.get('.category-filter').select('tank')
        cy.get('.price.filter').select(10 - 100)
        const keyword = 'jacket'
        cy.get('#search').type('keyword')
        cy.get('.action.search').click()
        cy.url().should('include', '/search')
        cy.get('.applied-filters').should('contain.text', 'Category: tank')
        cy.get('.applied-filters').should('contain.text', 'Price Range: $10-$100')
        cy.get('.search-results').should('exist')
        cy.get('.search-results').each(($result) => {
            cy.wrap($result).find('.category').should('contain.text', 'Electronics')
            cy.wrap($result).find('.price').should('be.within', 10, 100)
        })
    })
    it('sort products in ascending and descending order by price', () => {
        cy.visit('')
        cy.get('.sort-dropdown').select('price:low to high')
        cy.get('.product-price').then(($prices) => {
            const prices = $prices.map((index, element) => Cypress.$(element).text().replace('$', parseFloat));
            const sortedPrices = [...prices].sort((a, b) => a - b)

            expect(prices.get()).to.deep.equal(sortedPrices)
        })
        cy.get('.sort-dropdown').select('price:high to low')
        cy.get('.product-price').then(($prices) => {
            const prices = $prices.map((index, element) => Cypress.$(element).text().replace('$', parseFloat));
            const sortedPrices = [...prices].sort((a, b) => b - a)

            expect(prices.get()).to.deep.equal(sortedPrices)
        })
    })
    it('compare selected products', () => {
        cy.visit('')
        cy.get('.product:first').as('firstProduct');
        cy.get('@firstProduct').find('.compare-checkbox').check()
        cy.wait(2000)
        cy.get('.product:eq(1)').as('secondProduct');
        cy.get('@secondProduct').find('.compare-checkbox').check();
        cy.get('.compare-button').click();
        cy.url().should('include', '/comparison')
        cy.get('.comparison-product').should('have.length', 2)
        cy.get('@firstProduct').within(() => {
            const productName = cy.get('.product-name').text('tank-women');
            const productPrice = cy.get('.product-price').text('$100');
            cy.get('.comparison-product').contains(productName).should('exist');
            cy.get('.comparison-product').contains(productPrice).should('exist');
        })
        cy.get('@secondProduct').within(() => {
            const productName = cy.get('.product-name').text('Jacket');
            const productPrice = cy.get('.product-price').text('$39');
            cy.get('.comparison-product').contains(productName).should('exist');
            cy.get('.comparison-product').contains(productPrice).should('exist');
        })
    })
    describe('Update Product - Edit Size', () => {
        it('edit the size of the products in the cart', () => {
            cy.visit('')
            cy.login_data()
            cy.Choose_Product()
            updateProduct.clickCart();
            updateProduct.dropdownCart();
            updateProduct.toogle();
            cy.get('.content > .product > :nth-child(2) > span').should('have.text', "S")
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
            cy.get('.content > .product > :nth-child(2) > span').should('have.text', "M")
        })
    })

    it("Checkout - New Address - Flat Rate", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('.new-address-popup > .action > span').click() //add new address instead using the saved address
        cy.wait(500)
        //get data to input from fixture
        cy.fixture('shipping.json').then((shipping) => {
            cy.get('input[name="street[0]"]').type(shipping.address)
            cy.get('input[name="city"]').type(shipping.city)
            cy.get('select[name="region_id"]').select('Alaska')
            cy.get('input[name="postcode"]').type(shipping.zip)
            cy.get('select[name="country_id"]').select('United States')
            cy.get('input[name="telephone"]').type(shipping.phone)
            cy.get('#shipping-save-in-address-book').uncheck()
            cy.get('button.action-save-address').contains('Ship here').click()
            cy.wait(500)
        })
        cy.get('input[type="radio"][value="flatrate_flatrate"]').check() //choose the flat rate shipping options
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Alaska') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - New Address - Best Way", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('.new-address-popup > .action > span').click() //add new address instead using the saved address
        cy.wait(500)
        //get data to input from fixture
        cy.fixture('shipping.json').then((shipping) => {
            cy.get('input[name="street[0]"]').type(shipping.address)
            cy.get('input[name="city"]').type(shipping.city)
            cy.get('select[name="region_id"]').select('Alaska')
            cy.get('input[name="postcode"]').type(shipping.zip)
            cy.get('select[name="country_id"]').select('United States')
            cy.get('input[name="telephone"]').type(shipping.phone)
            cy.get('#shipping-save-in-address-book').uncheck()
            cy.get('button.action-save-address').contains('Ship here').click()
            cy.wait(500)
        })
        cy.wait(500)
        cy.get('input[type="radio"][value="tablerate_bestway"]').check() //choose the best way shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Alaska') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - Saved Address - Best Way", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('input[type="radio"][value="tablerate_bestway"]').check() //choose the best way shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Texas') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - Saved Address - Flat Rate", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('input[type="radio"][value="flatrate_flatrate"]').check() //choose the flat rate shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Texas') //check using new address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    it("Checkout - Add New Address but using Saved Address - Choose Flat Rate but switch to Best Way", () => {
        //checkout process until order successfully submitted
        cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping')
        cy.wait(3000)
        cy.get('.new-address-popup > .action > span').click() //add new address instead using the saved address
        cy.wait(500)
        //get data to input from fixture
        cy.fixture('shipping.json').then((shipping) => {
            cy.get('input[name="street[0]"]').type(shipping.address)
            cy.get('input[name="city"]').type(shipping.city)
            cy.get('select[name="region_id"]').select('Alaska')
            cy.get('input[name="postcode"]').type(shipping.zip)
            cy.get('select[name="country_id"]').select('United States')
            cy.get('input[name="telephone"]').type(shipping.phone)
            cy.get('#shipping-save-in-address-book').uncheck()
            cy.get('button.action-save-address').contains('Ship here').click()
            cy.wait(500)
        })
        cy.get('button.action.action-select-shipping-item').contains('Ship Here').click() //change to use the saved address
        cy.wait(500)
        cy.get('input[type="radio"][value="flatrate_flatrate"]').check() //choose the flat rate shipping options
        cy.wait(500)
        cy.get('input[type="radio"][value="tablerate_bestway"]').check() //choose the best way shipping options
        cy.get('button[type="submit"]').contains('Next').click()
        cy.wait(3000)
        cy.url().should("include", "/checkout/#payment")
        cy.get('.payment-group > .step-title').should('exist').and('contain', 'Payment Method')
        cy.get('.shipping-information-content').should('exist').and('contain', 'Texas') //check using saved address
        cy.get('.opc-block-summary').should('exist').and('contain', 'Order Summary') //check the order summary exist
        cy.get('.sub > .mark').should('exist').and('have.text', 'Cart Subtotal')
        cy.get('button[type="submit"]').contains('Place Order').click()
        cy.wait(3000)
        cy.url().should("include", "success") //order success page
        cy.get(".base").should("contain.text", "Thank you for your purchase!")
        cy.get('.order-number').should('exist')
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action > span').should('exist').and('have.text', 'Continue Shopping')
    })

    //login
    describe('Verify Login Functionality', () => {
        it('passes', () => {
            cy.visit('https://magento.softwaretestingboard.com/')
            cy.get('.panel > .header > .authorization-link > a').click()
            cy.get('#email').type('testqakjd21@gmail.com')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Rahasia@123')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
            cy.url().should('include', 'https://magento.softwaretestingboard.com/')
        })

        it('Failed Login - wrong format email', () => {
            cy.visit('https://magento.softwaretestingboard.com/')
            cy.get('.panel > .header > .authorization-link > a').click()
            cy.get('#email').type('testqa')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Rahasia@123')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
            cy.get('#email-error').should('contain', 'Please enter a valid email address (Ex: johndoe@domain.com).')
        })

        it('Email has not been entered', () => {
            cy.visit('https://magento.softwaretestingboard.com/')
            cy.get('.panel > .header > .authorization-link > a').click()
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Rahasia@123')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
            cy.get('#email-error').should('contain', 'This is a required field.')
        })

        it('Password has not been entered', () => {
            cy.visit('https://magento.softwaretestingboard.com/')
            cy.get('.panel > .header > .authorization-link > a').click()
            cy.get('#email').type('testqakjd21@gmail.com')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
            cy.get('#pass-error').should('contain', 'This is a required field.')
        })

        it('Email and password has not registered', () => {
            cy.visit('https://magento.softwaretestingboard.com/')
            cy.get('.panel > .header > .authorization-link > a').click()
            cy.get('#email').type('testqadks12@gmail.com')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('12345')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
            cy.get('.message-error > div').should('contain.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
        })

    })
    //selectproduct
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
            cy.get('.message-success > div').should('contain.text', 'You added Breathe-Easy Tank to your shopping cart.')
            cy.wait(2000)
        })
    })
})