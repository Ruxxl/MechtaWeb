const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'zvhg5x',
  recordKey: "669d0d79-961c-4577-b3f8-6f558677bbee",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: process.env.BASE_URL || 'https://mechta.kz',
    },
    defaultCommandTimeout: 10000
  }
});