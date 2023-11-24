import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

let FName = FirstName()
let LName = LastName()
let email = randomEmail()
let Pass = password()
let conPass = confirmPassword()


function FirstName() {
  const randomString = Math.random().toString(36).substring(2, 10)
  const FName = "FN" + randomString
  return FName
}

function LastName() {
  const randomString = Math.random().toString(36).substring(2, 10)
  const LName = "LN" + randomString
  return LName
}

function randomEmail() {
  const randomString = Math.random().toString(36).substring(2, 10)
  const email = randomString + "@testRitter.com"
  return email
}

function password() {
  const randomString = Math.random().toString(36).substring(2, 20)
  const Pass = "Pass!" + randomString
  return Pass
}

function confirmPassword() {
  const conPass = Pass
  return conPass
}



describe("Registration", () => {
  it("Create an account", () => {
    cy.clearCookies()
    cy.visit("")
    cy.wait(500)
    cy.get(".logo > img").should("be.visible")
    cy.wait(500)
    cy.get(".panel > .header > :nth-child(3) > a").should("be.visible").click()
    cy.get("#firstname").type(FName)
    cy.get("#lastname").type(LName)
    cy.get("#email_address").type(email)
    cy.get("#password").type(Pass)
    cy.get("#password-confirmation").type(conPass)
    cy.log(FName, LName, email, Pass, conPass)
    cy.get(
      "#form-validate > .actions-toolbar > div.primary > .action > span"
    ).click()
    cy.wait(500)

  })
})

describe("Newly created account is logged in", () => {
  it("Check Login", () => {
    cy.url().should("include", "/customer/account/")
    cy.get('.message-success > div').should("contain.text", "Thank you for registering with Main Website Store.")
    cy.get(".base").should("contain.text", "My Account")
    cy.get(".block-dashboard-info > .block-title > strong").should(
      "contain.text",
      "Account Information"
    )
    cy.get(".box-content > p").should("contain.text", "FN")
    cy.get(".box-content > p").should("contain.text", "LN")
    cy.get(".box-content > p").should("contain.text", "@")
    cy.wait(500)
  })
})

describe("Select Product", () => {
  it("Select product #1 - from the Hot Items list in the Dashboard", () => {
    cy.get('img').click()
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click()
    cy.get('#option-label-size-143-item-166').click()
    cy.wait(3000)
    cy.get('#option-label-color-93-item-57').click()
    cy.wait(3000)
    cy.get('#product-addtocart-button > span').click()
    cy.wait(3000)
    cy.get('.message-success > div').should('contain.text', 'You added Breathe-Easy Tank to your shopping cart.')
    cy.wait(3000)
    cy.get('.counter-number').should('not.be.null')
  })

  it("Select product #2 - from the Header Menu", () => {
    cy.get('#ui-id-5 > :nth-child(2)').click()
    cy.get('dd > .items > :nth-child(1) > a').click()
    cy.wait(3000)
    cy.get(':nth-child(1) > .product-item-info > .details > .name > .product-item-link').click()
    cy.wait(3000)
    cy.get('#option-label-size-143-item-170').click()
    cy.wait(3000)
    cy.get('#option-label-color-93-item-50').click()
    cy.wait(3000)
    cy.get('#product-addtocart-button > span').click()
    cy.get('.message-success > div').should('contain.text', 'You added Cassius Sparring Tank to your shopping cart.')
    cy.wait(3000)
    cy.get('.counter-number').should('not.be.null')
  })
})

describe("Cart", () => {
  let initialCount
  it("Open cart and remove item", () => {
    cy.wait(500)
    cy.get('.counter-number').then((counter) => {
      initialCount = parseInt(counter.text())
      expect(initialCount).to.be.greaterThan(0)
    })
    cy.get('.showcart').click()
    cy.get(':nth-child(7) > .secondary > .action > span').click()
    cy.wait(3000)
    cy.get(':nth-child(4) > .item-actions > td > .actions-toolbar > .action-delete').click()
    cy.wait(3000)
    cy.get('.counter-number').then((counter) => {
      const updatedCount = parseInt(counter.text())
      expect(updatedCount).to.be.lessThan(initialCount)
    })
  })

  it("Add quantity of an item within the Cart", () => {
    cy.wait(3000)
    cy.get('.counter-number').then((counter) => {
      initialCount = parseInt(counter.text())
      expect(initialCount).to.be.greaterThan(0)
    })
    cy.xpath('/html/body/div[2]/main/div[3]/div/div[2]/form/div[1]/table/tbody/tr[1]/td[3]/div/div/label/input').clear().type('2')
    cy.get('.update > span').click()
    cy.wait(10000)
    cy.get('.counter-number').then((counter) => {
      const updatedCount = parseInt(counter.text())
      expect(updatedCount).to.be.greaterThan(initialCount)
    })
  })
})

describe("Checkout", () => {
  it("Proceed to checkout", () => {
    cy.wait(3000)
    cy.get('.checkout-methods-items > :nth-child(1) > .action > span').click()
    cy.wait(3000)
    cy.url().should("include", "/checkout/")
    cy.wait(3000)
  })

})


