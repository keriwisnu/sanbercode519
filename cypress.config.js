const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
  },
});
