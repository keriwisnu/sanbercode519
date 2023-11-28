const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com/',
    env: {
      //untuk membuat variabel
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 3500,
    
  },
});
