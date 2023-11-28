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