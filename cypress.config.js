const { defineConfig } = require("cypress");

module.exports = defineConfig({
<<<<<<< HEAD
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://magento.softwaretestingboard.com/",
    //testIsolation: false,
    experimentalStudio: true,
    env: {
      username: "ritter@tester.com",
      password: "Sanber51",
      uneg: "testnoaddress@tester.com",
      pasneg: "Test2023!"
    },

=======
  e2e: {
<<<<<<< HEAD
    baseUrl:'https://magento.softwaretestingboard.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
=======
<<<<<<< HEAD
    baseUrl: 'https://magento.softwaretestingboard.com/customer/account/create/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 6000,
    chromeWebSecurity: false
=======
    baseUrl: 'https://magento.softwaretestingboard.com/',
    env: {
      //untuk membuat variabel
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 3500,
    
>>>>>>> 3d33fdcb810d61e10b501aa54acdcf62a412f67c
>>>>>>> 422cd48f43287f80bc058662189aa01e9dfc1852
>>>>>>> 6dc7367fb558635e96a8032698256a927acbedee
  },
});
