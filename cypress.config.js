<<<<<<< HEAD
=======
// module.exports = {
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };

>>>>>>> 29f5342c5d2a639d36ffb6743e25a4545debd972
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com/',
<<<<<<< HEAD
    env: {
      //untuk membuat variabel
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
=======
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 5500,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false
  },
});
>>>>>>> 29f5342c5d2a639d36ffb6743e25a4545debd972
