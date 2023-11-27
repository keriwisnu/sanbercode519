

describe('Verify LUMA Create User Functionality', () => {
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/create/')
    
  })

  it('success create user', () => {
    // cy.get('a[href*="https://magento.softwaretestingboard.com/customer/account/create/"]').click()
    cy.get('#firstname').type('Dian')
    cy.get('#lastname').type('Matondang')
    cy.get('#email_address').type('dianmatondang012@gmail.com')
    cy.get('#password').type('Dianfilia123#')
    cy.get('#password-confirmation').type('Dianfilia123#')
    cy.get('.action.submit.primary').click()
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })

  it('using the same email', () => {
    // create user failed due to using the same email
    cy.get('#firstname').type('Agung')
    cy.get('#lastname').type('Matondang')
    cy.get('#email_address').type('dianmatondang012@gmail.com')
    cy.get('#password').type('Agungmtd123#')
    cy.get('#password-confirmation').type('Agungmtd123#')
    cy.get('.action.submit.primary').click()
    cy.get('.message-error').should('contain', 'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })

  it('weak password', () => {
    // create user failed due to a weak password
    cy.get('#firstname').type('Agung')
    cy.get('#lastname').type('Matondang')
    cy.get('#email_address').type('dianmatondang112@gmail.com')
    cy.get('#password').type('Agungmtd')
    cy.get('#password-confirmation').type('Agungmtd')
    cy.get('.action.submit.primary').click()
    cy.get('#password-error').should('contain', 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })

  it('different password length', () => {
    // create user failed due to a weak password
    cy.get('#firstname').type('Agung')
    cy.get('#lastname').type('Matondang')
    cy.get('#email_address').type('dianmatondang112@gmail.com')
    cy.get('#password').type('Agungmtd123#')
    cy.get('#password-confirmation').type('Agungmtd')
    cy.get('.action.submit.primary').click()
    cy.get('#password-confirmation-error').should('contain', 'Please enter the same value again.')
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })


})


