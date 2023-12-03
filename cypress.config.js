const { defineConfig } = require("cypress")

// commended because create error when running all process
// require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //baseUrl2: 'https://magento.softwaretestingboard.com/customer/account/create/' #enable when running magento-dian/register.cyjs
    baseUrl: 'https://magento.softwaretestingboard.com/',
    //commended because create error when running all process
    testIsolation: false,
    experimentalStudio: true,
    env: {
      username: "ritter@tester.com",
      password: "Sanber51",
      uneg: "testnoaddress@tester.com",
      pasneg: "Test2023!"
    },
    defaultCommandTimeout: 5500,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false
  },
})
