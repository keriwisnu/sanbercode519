// const UserRegistrasi = require('../../../fixtures/UserRegistrasi.json')
// const userData = require('../../../fixtures/userData.json')

// this case for positive case
describe('positive case', () => {
  beforeEach(() => {
    cy.visit('')

  })

  it('success create user', () => {
    cy.register('Dian', 'Matondang', 'dianmatondang012@gmail.com', 'Dianfilia123#', 'Dianfilia123#')
    // cy.get('#firstname').type('Dian')
    // cy.get('#lastname').type('Matondang')
    // cy.get('#email_address').type('dianmatondang012@gmail.com')
    // cy.get('#password').type('Dianfilia123#')
    // cy.get('#password-confirmation').type('Dianfilia123#')
    // cy.get('.action.submit.primary').click()
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })
})

// this case for negative case
describe('negative case', () => {
  beforeEach(() => {
    cy.visit('')
    
  })
  

  it.only('using the same email', () => {
    // create user failed due to using the same email
    cy.fixture('userData.json').then((userData) => {
      cy.get('#firstname').type(userData.firstname)
      cy.get('#lastname').type(userData.lastname)
    })

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
    // create user failed because the length of the password and confirm password are different
    cy.get('#firstname').type('Agung')
    cy.get('#lastname').type('Matondang')
    cy.get('#email_address').type('dianmatondang112@gmail.com')
    cy.get('#password').type('Agungmtd123#')
    cy.get('#password-confirmation').type('Agungmtd')
    cy.get('.action.submit.primary').click()
    cy.get('#password-confirmation-error').should('contain', 'Please enter the same value again.')
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })

  it('blank personal information', () => {
    // create user failed due to missing personal information
    cy.get('#email_address').type('dianmatondang112@gmail.com')
    cy.get('#password').type('Agungmtd')
    cy.get('#password-confirmation').type('Agungmtd')
    cy.get('.action.submit.primary').click()
    cy.get('#firstname-error').should('contain', 'This is a required field.')
    cy.get('#lastname-error').should('contain', 'This is a required field.')
    cy.url().should('include', 'https://magento.softwaretestingboard.com/customer/account/')
  })

})


