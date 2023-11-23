describe('choose product', () => {
  it('Success Login', () => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.login(email,password)
  })
})